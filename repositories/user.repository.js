import { UserModel } from "../models/index.js";

class UserRepository {
    create = async ({
        username,
        email,
        password,
    }) => {
        try {
            const newUser = await UserModel.create({
                username,
                email,
                password,
            });

            return {
                ...newUser.toObject(),
            }
        } catch (error) {
            throw error;
        }
    }

    getAll = async () => {
        try {
            const users = await UserModel.find({});

            return users.map(user => user.toObject());
        } catch (error) {
            throw error;
        }
    }

    getById = async ({ id }) => {
        try {
            const user = await UserModel.findById(id);

            return user.toObject();
        } catch (error) {
            throw error;
        }
    }

    update = async ({ username, password }) => {

    }
}

export default new UserRepository();
