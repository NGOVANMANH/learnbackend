import { UserModel } from "../models/index.js";

class UserRepository {

    create = async ({
        username,
        email,
        password,
        role,
    }) => {
        try {
            const newUser = await UserModel.create({
                username,
                email,
                password,
                role
            });

            let returnUser = newUser.toObject();
            delete returnUser.password;

            return returnUser;
        } catch (error) {
            throw error;
        }
    }

    getAll = async () => {
        try {
            const users = await UserModel.find({});

            return users.map(user => {
                const { password, ...userObject } = user.toObject();
                return userObject;
            });
        } catch (error) {
            throw error;
        }
    }

    findById = async (id) => {
        try {
            const user = await UserModel.findById(id);
            let returnUser = user.toObject();
            delete returnUser.password;
            return returnUser;
        } catch (error) {
            throw error;
        }
    }

    update = async ({ username, password }) => {

    }
}

export default new UserRepository();
