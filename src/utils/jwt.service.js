import jwt from "jsonwebtoken";

const signAccessToken = (userId) => {
    const secretKey = process.env.JWT_ACCESS_SECRET;
    const accessToken = jwt.sign({
        userId
    }, secretKey, {
        expiresIn: '10m'
    });
    return accessToken;
}

const signRefreshToken = (userId) => {
    const secretKey = process.env.JWT_REFRESH_SECRET;
    const refreshToken = jwt.sign({
        userId
    }, secretKey, {
        expiresIn: '30 days'
    });
    return refreshToken;
}

const signVerifyToken = (email) => {
    const secretKey = process.env.JWT_VERIFY_SECRET;
    const verifyToken = jwt.sign({
        email
    }, secretKey, {
        expiresIn: '1h'
    });
    return verifyToken;
}

const verrifyAccessToken = (accessToken) => {
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    return decoded;
}

const verrifyRefreshToken = (refreshToken) => {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    return decoded;
}

const verifyEmailToken = (verifyToken) => {
    const decoded = jwt.verify(verifyToken, process.env.JWT_VERIFY_SECRET);
    return decoded;
}

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

export {
    signAccessToken,
    signRefreshToken,
    verrifyAccessToken,
    verrifyRefreshToken,
    handleError as handleTokenError,
    signVerifyToken,
    verifyEmailToken,
}
