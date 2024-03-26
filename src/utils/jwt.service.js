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

const verrifyAccessToken = (accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        return decoded;
    } catch (error) {
        throw error;
    }
}

const verrifyRefreshToken = (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        return decoded;
    } catch (error) {
        throw error;
    }
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
}
