import { AuthRepository } from "../repositories/index.js";
import { signAccessToken } from "../utils/jwt.service.js";
import httpCode from "../utils/http.service.js";

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
            .then(user =>
                res.status(httpCode.ok.code).json({
                    message: httpCode.ok.message,
                    data: {
                        user,
                        token: signAccessToken(user._id),
                    },
                })
            )
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
            .then(user =>
                res.status(httpCode.created.code).json({
                    message: httpCode.created.message,
                    data: {
                        user,
                        token: signAccessToken(user._id),
                    },
                })
            )
            .catch(error => {
                res.status(httpCode.badRequest.code).json({
                    error: handleError(error),
                })
            })
    }
}

export default new AuthController();
