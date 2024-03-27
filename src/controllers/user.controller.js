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

    get = (req, res) => {

        const { page,
            offset,
            limit,
            sort_by,
            sort_order } = req.query;

        UserRepository
            .get({
                page,
                offset,
                limit,
                sort_by,
                sort_order
            })
            .then(users =>
                UserRepository.getTotalRecords()
                    .then(totalRecords => {
                        res.status(200).json({
                            message: "Success!",
                            data: users,
                            pagination: {
                                totalRecords,
                                currentPage: +page >= 0 ? +page : 0,
                                prevPage: +page > 0 ? +page - 1 : null,
                                nextPage: +page * (+limit || 5) < totalRecords ? +page + 1 : null,
                                lastPage: Math.floor(totalRecords / (+limit || 5)),
                            }
                        })
                    })
                    .catch(error => {
                        throw error;
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
