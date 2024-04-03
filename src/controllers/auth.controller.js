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

                return res.status(httpCode.ok.code).json({
                    message: "Please check and verify your email",
                })
            })
            .catch(error => {
                res.status(httpCode.badRequest.code).json({
                    error: handleError(error),
                })
            })
    }

    refreshToken = (req, res) => {
        const { refreshToken, email } = req.body;
        if (!refreshToken || !email) {
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

            console.log(error)

            if (handleTokenError(error).expiredAt) {
                AuthRepository.refreshToken(email)
                    .then(user =>
                        res.status(httpCode.ok.code).json({
                            message: httpCode.ok.message,
                            data: {
                                token: signAccessToken(user._id),
                            },
                        })
                    )
                    .catch(error => {
                        console.log(error);
                        res.status(httpCode.internalServerError.code).json({
                            message: httpCode.internalServerError.message,
                            error: {
                                message: error.message,
                            },
                        })
                    })
            }
            else {
                res.status(httpCode.internalServerError.code).json({
                    message: httpCode.internalServerError.message,
                    error: handleTokenError(error),
                })
            }
        }
    }

    verifyEmail = (req, res) => {
        const { token, key } = req.query;

        try {
            const { email } = verifyEmailToken(token)

            AuthRepository.verifyEmail(email)
                .then(() => {
                    return res.send("Email verified")
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
            if (error.message === "jwt expired") {
                UserModel.deleteOne({ email: key })
                    .then(count => console.log(count))
                    .catch(error => { console.log(error) })

                return res.status(httpCode.notFound.code).json({
                    message: "Verification email is over 1 hour",
                })
            }
            res.status(httpCode.internalServerError.code).json({
                message: "Verification failed",
                error: handleTokenError(error),
            })
        }
    }
}

export default new AuthController();
