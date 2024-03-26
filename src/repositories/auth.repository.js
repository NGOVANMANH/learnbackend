import { UserModel } from "../models/index.js";
import bcrypt from "bcrypt";

class AuthRepository {
    login = async ({ email, password }) => {
        try {
            const user = await UserModel.findOne({ email });
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const { password, ...userData } = user.toObject();
                    return userData;
                }
            }
            throw new Error("Wrong email or password.");
        } catch (error) {
            throw error;
        }
    }

    register = async ({ email, username, password }) => {
        try {
            const newUser = await UserModel.create({
                username,
                email,
                password,
            });

            let returnUser = newUser.toObject();

            delete returnUser.password;
            delete returnUser.refreshToken;

            return returnUser;
        } catch (error) {
            throw error
        }
    }


    refreshToken = async (refreshToken) => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    }
}

export default new AuthRepository();
