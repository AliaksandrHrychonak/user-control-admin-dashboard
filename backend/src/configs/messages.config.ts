import { registerAs } from '@nestjs/config';

export default registerAs(
    'messages',
    (): Record<string, any> => ({
        authError: {
            accessTokenUnauthorized: "Access Token UnAuthorized",
            refreshTokenUnauthorized: "Refresh Token UnAuthorized"
        },
        database: {
            error: {
                unique: "Indicates a violation of unique constraint in the database",
                foreignKey: "Signals an invalid foreign key reference",
                unknown: "Represents an unspecified database error"
            }
        },
        request: {
            error: {
                validation: "Indicates that the request data failed validation checks",
            }
        },
        success: {
            ok: "OK",
            created: "Created",
            accepted: "Accepted",
            noContent: "No Content"
        },
        redirection: {
            movePermanently: "Move Permanently",
            found: "Found",
            notModified: "Not Modified",
            temporaryRedirect: "Temporary Redirect",
            permanentRedirect: "Permanent Redirect"
        },
        clientError: {
            badRequest: "Bad Request",
            unauthorized: "Unauthorized",
            forbidden: "Forbidden",
            notFound: "Not Found",
            methodNotAllowed: "Not Allowed Method",
            notAcceptable: "Not Acceptable",
            payloadToLarge: "Payload To Large",
            uriToLarge: "Uri To Large",
            unsupportedMediaType: "Unsupported Media Type",
            unprocessableEntity: "Unprocessable Entity",
            tooManyRequest: "Too Many Request"
        },
        serverError: {
            internalServerError: "Internal Server Error",
            notImplemented: "Not Implemented",
            badGateway: "Bad Gateway",
            serviceUnavailable: "Service Unavailable",
            gatewayTimeout: "Gateway Timeout"
        },
        user: {
            list: "List User Success.",
            get: "Get User Success.",
            create: "Create User Success.",
            delete: "Delete User Success.",
            update: "Update User Success.",
            blocked: "Success blocked user",
            unblocked: "Success unblocked user",
            refresh: "Refresh token success",
            info: "Get info payload Succeed",
            profile: "Profile Success",
            updateProfile: "Update profile Succeed",
            login: "Login success.",
            signUp: "Sign up Success",
            error: {
                notFound: "User not found.",
                emailExist: "Email user used",
                mobileNumberExist: "Mobile Number user used",
                passwordExpired: "User password expired",
                passwordAttemptMax: "Password attempt user max",
                passwordNotMatch: "Password not match",
                blocked: "User blocked",
                inactivePermanent: "User inactive permanent",
                inactive: "User is inactive",
                isActiveInvalid: "User is active invalid",
                usernameExist: "Username exist",
                newPasswordMustDifference: "Old password must difference"
            }
        },

        200: "OK",

        201: "Created",
        202: "Accepted",
        204: "No Content",

        301: "Move Permanently",
        302: "Found",
        304: "Not Modified",
        307: "Temporary Redirect",
        308: "Permanent Redirect",

        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        405: "Not Allowed Method",
        406: "Not Acceptable",
        413: "Payload To Large",
        414: "Uri To Large",
        415: "Unsupported Media Type",
        422: "Unprocessable Entity",
        429: "Too Many Request",

        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Timeout"
    }),
);
