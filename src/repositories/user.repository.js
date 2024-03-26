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

    get = async ({ page,
        offset,
        limit,
        sort_by,
        sort_order }) => {
        try {
            const OFFSET = 0;
            const LIMIT = 5;

            const sortParams = ["username", "email", "role", "createdAt", "updatedAt"];

            let users = [];

            if (page) {
                if (+page >= 0)
                    users = await UserModel.find()
                        .skip((+page) * (+limit || LIMIT))
                        .limit(+limit || LIMIT);
            }
            else if (offset && limit) {
                users = await UserModel.find()
                    .skip(+offset)
                    .limit(+limit);

            }
            else {
                users = await UserModel.find();
            }

            users = users.map(user => user.toObject());

            if (sort_by) {
                let compareFn;
                let sortBy = sort_by.toLowerCase();
                if (sortParams.includes(sortBy)) {
                    compareFn = (a, b) => a[sortBy].localeCompare(b[sortBy]);
                    users = users.sort(compareFn);
                }
            }

            if (sort_order) {
                if (sort_order.toLowerCase() === "desc") {
                    users = users.reverse();
                }
            }

            return users.map(user => {
                const { password, refreshToken, ...userObject } = user;
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
            delete returnUser.refreshToken;
            return returnUser;
        } catch (error) {
            throw error;
        }
    }

    update = async ({ username, password }) => {

    }

    getTotalRecords = async () => {
        try {
            const count = await UserModel.countDocuments();
            return count;
        } catch (error) {
            throw error;
        }
    }
}

export default new UserRepository();
