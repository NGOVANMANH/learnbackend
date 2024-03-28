import { AuthRepository } from "../repositories/index.js";
import { signAccessToken, signRefreshToken, verrifyRefreshToken, verifyEmailToken, handleTokenError } from "../utils/jwt.service.js";
import { UserModel } from "../models/index.js";
import httpCode from "../utils/http.service.js";
import { sendVerificationEmail } from "../utils/email.service.js";

const sendBadRequest = (res) => {
    res.status(httpCode.badRequest.code).json({
        message: httpCode.badRequest.message,
    })
}

const handleError = (error) => {

    let errors = {};

    if (error.errors) {
        Object.keys(error.errors).map(key => {
            errors[key] = error.errors[key].properties.message;
        })
    }

    if (error.code === 11000) {
        errors.email = "Email is already exist";
    }


    return errors;
}

class AuthController {
    login = (req, res) => {
        const {
            email,
            password,
        } = req.body;

        if (!email || !password) {
            return sendBadRequest(res);
        }

        AuthRepository
            .login({ email, password })
            .then(user => {

                if (user.isVerified === false) {
                    return res.status(httpCode.accessDenied.code).json({
                        message: "Please verify your email",
                    })
                }

                const refreshToken = user.refreshToken;

                try {
                    verrifyRefreshToken(refreshToken);

                    res.status(httpCode.ok.code).json({
                        message: httpCode.ok.message,
                        data: {
                            user,
                            token: signAccessToken(user._id),
                        },
                    })
                } catch (error) {
                    UserModel.findOneAndUpdate({ _id: user._id }, { refreshToken: signRefreshToken(user._id) })
                        .then(user =>
                            res.status(httpCode.ok.code).json({
                                message: httpCode.ok.message,
                                data: {
                                    user,
                                    token: signAccessToken(user._id),
                                },
                            }))
                }
            })
            .catch(error => {
                return res.status(httpCode.notFound.code).json({
                    message: httpCode.notFound.message,
                    error: {
                        message: error.message,
                    },
                })
            })
    }

    register = (req, res) => {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return sendBadRequest(res);
        }

        AuthRepository
            .register({ username, email, password })
            .then(user => {
                sendVerificationEmail(user.email, user.verifyToken);

                return res.status(httpCode.created.code).json({
                    message: "Please verify your email before using this token",
                    data: {
                        user,
                        token: signAccessToken(user._id),
                    },
                })
            })
            .catch(error => {
                res.status(httpCode.badRequest.code).json({
                    error: handleError(error),
                })
            })
    }

    refreshToken = (req, res) => {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return sendBadRequest(res);
        }

        try {
            const payload = verrifyRefreshToken(refreshToken);

            res.status(httpCode.ok.code).json({
                message: httpCode.ok.message,
                data: {
                    token: signAccessToken(payload._id),
                },
            })

        } catch (error) {
            res.status(httpCode.unAuthorized.code).json({
                message: "Please login to get new refresh token",
                error: handleTokenError(error),
            })
        }
    }

    verifyEmail = (req, res) => {
        const { token } = req.query;
        try {
            const { email } = verifyEmailToken(token)

            AuthRepository.verifyEmail(email)
                .then(() => {
                    return res.status(httpCode.ok.code).json({
                        message: "Email verified",
                    })
                })
                .catch(error => {
                    console.log(error);
                    res.status(httpCode.internalServerError.code).json({
                        message: httpCode.internalServerError.message,
                        error: {
                            message: error.message,
                        },
                    })
                })
        } catch (error) {
            res.status(httpCode.internalServerError.code).json({
                message: "Verification failed",
                error: handleTokenError(error),
            })
        }
    }
}

export default new AuthController();
