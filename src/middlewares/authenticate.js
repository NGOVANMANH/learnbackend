import { verrifyAccessToken, handleTokenError } from "../utils/jwt.service.js";
import UserRepository from "../repositories/user.repository.js";
import httpCode from "../utils/http.service.js";

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

                if (user.isVerified === false) {
                    return res.status(httpCode.accessDenied.code).json({
                        message: "Please verify your email",
                    })
                }

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
            error: handleTokenError(error),
        })
    }
}

export default authenticate;
