import { UserRepository } from "../repositories/index.js"

class UserController {
    create = (req, res) => {
        if (!req || !req.body) {
            return res.status(404).json({
                message: "Request not found!",
            })
        }

        UserRepository
            .create({ ...req.body })
            .then(newUser =>
                res.status(201).json({
                    message: "Success!",
                    data: newUser,
                })
            )
            .catch(error =>
                res.status(500).json({
                    message: error.name,
                })
            )
    }

    getById = (req, res) => {
        if (!req || !req.params || !req.params.id) {
            return res.status(404).json({
                message: "Request not found!",
            })
        }

        UserRepository
            .getById({ ...req.params })
            .then(user =>
                res.status(200).json({
                    message: "Success",
                    data: user,
                })
            )
            .catch(error =>
                res.status(500).json({
                    message: error.name,
                })
            )
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
                res.status(500).json({
                    message: error.name,
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
