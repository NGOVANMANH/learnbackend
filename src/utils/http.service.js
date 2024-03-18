const httpCode = {
    ok: {
        code: 200,
        message: "Request successful",
    },
    created: {
        code: 201,
        message: "Resource created successfully",
    },
    badRequest: {
        code: 400,
        message: "Bad request! Please check your request",
    },
    unAuthorized: {
        code: 401,
        message: "Access to the requested resource is denied due to missing or invalid credentials",
    },
    accessDenied: {
        code: 403,
        message: "Not permitted access to the resource",
    },
    notFound: {
        code: 404,
        message: "Resource not found! The requested resource does not exist",
    },
    internalServerError: {
        code: 500,
        message: "Internal server error! Something went wrong on the server",
    },
};

export default httpCode;
