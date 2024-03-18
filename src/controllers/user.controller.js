import { UserRepository } from "../repositories/index.js";
import httpCode from "../utils/http.service.js";

const sendBadRequest = (res) => {
    res.status(httpCode.badRequest.code).json({
        message: httpCode.badRequest.message,
    })
}

const handleError = (error) => {
    console.log(error);
}

class UserController {
    create = (req, res) => {
        if (!req || !req.body) {
            return sendBadRequest(res);
        }

        UserRepository
            .create({ ...req.body })
            .then(newUser =>
                res.status(httpCode.created.code).json({
                    message: httpCode.created.message,
                    data: newUser,
                })
            )
            .catch(error =>
                res.status(500).json({
                    message: error.message,
                })
            )
    }

    findById = (req, res) => {
        if (!req || !req.params || !req.params.id) {
            return sendBadRequest(res);
        }

        const { id } = req.params;

        UserRepository
            .findById(id)
            .then(user =>
                res.status(httpCode.ok.code).json({
                    message: httpCode.ok.message,
                    data: user,
                })
            )
            .catch(error => {
                res.status(httpCode.notFound.code).json({
                    message: httpCode.notFound.message,
                })
            })
    }

    getAll = (req, res) => {
        UserRepository
            .getAll()
            .then(users =>
                res.status(200).json({
                    message: "Success!",
                    data: users,
                })
            )
            .catch(error =>
                res.status(httpCode.internalServerError.code).json({
                    message: httpCode.internalServerError.message,
                })
            )
    }

    update = (req, res) => {
        res.status(200).json({
            message: "From update",
        })
    }
}

export default new UserController();
