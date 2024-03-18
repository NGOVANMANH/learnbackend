import { verrifyAccessToken } from "../utils/jwt.service.js";
import UserRepository from "../repositories/user.repository.js";
import httpCode from "../utils/http.service.js";

const handleError = (error) => {
    let errors = {};

    switch (error.message) {
        case "jwt expired":
            errors.token = "Token expired";
            errors.expiredAt = error.expiredAt;
            break;
        case "invalid token":
            errors.token = "Invalid token";
            break;
        case "invalid signature":
            errors.token = "Please use valid token";
            break;
        default: errors.token = "Unknow error";
    }

    return errors;
}

const authenticate = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(httpCode.unAuthorized.code).json({
            message: httpCode.unAuthorized.message,
        })
    }

    const accessToken = authorization.split(' ')[1];

    try {
        const { userId } = verrifyAccessToken(accessToken);

        UserRepository
            .findById(userId)
            .then(user => {
                if (user.role.includes('admin')) {
                    next();
                }
                else {
                    return res.status(httpCode.accessDenied.code).json({
                        message: httpCode.accessDenied.message,
                    })
                }
            }).catch(error => {
                throw error
            });

    } catch (error) {
        return res.status(httpCode.notFound.code).json({
            error: handleError(error),
        })
    }
}

export default authenticate;
