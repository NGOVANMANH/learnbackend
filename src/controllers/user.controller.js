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

        const LIMIT = 5;
        const OFFSET = 0;

        if ((page && isNaN(page)) || (limit && isNaN(limit)) || (offset && isNaN(limit))) {
            return sendBadRequest(res);
        }

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

                        const lastPage = Math.ceil(totalRecords / (+limit || 5)) - 1;
                        const currentPage = +page >= 0 && +page <= lastPage ? +page : 0
                        const prevPage = currentPage > 0 ? currentPage - 1 : null;
                        const nextPage = currentPage < lastPage ? currentPage + 1 : lastPage;

                        res.status(200).json({
                            message: "Success!",
                            data: users,
                            pagination: {
                                totalRecords,
                                currentPage,
                                prevPage,
                                nextPage,
                                lastPage
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
