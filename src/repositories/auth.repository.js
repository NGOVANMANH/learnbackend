import { UserModel } from "../models/index.js";
import bcrypt from "bcrypt";
import { signRefreshToken } from "../utils/jwt.service.js";

class AuthRepository {
    login = async ({ email, password }) => {
        const user = await UserModel.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const { password, verifyToken, ...userData } = user.toObject();
                return userData;
            }
        }
        throw new Error("Wrong email or password.");
    }

    register = async ({ email, username, password }) => {
        const newUser = await UserModel.create({
            username,
            email,
            password,
        });

        const { refreshToken, ...returnUser } = newUser.toObject();

        delete returnUser.password;

        return returnUser;
    }

    refreshToken = async (email) => {
        UserModel.findOne({ email })
            .then(async (user) => {
                const refreshToken = signRefreshToken(user._id);
                const newUser = await UserModel.findByIdAndUpdate({
                    _id: user._id
                }, {
                    refreshToken
                }, {
                    new: true,
                })

                const { password, ...returnUser } = newUser.toObject();

                return returnUser;
            })
            .catch(error => {
                throw error;
            })
    }

    verifyEmail = async (email) => {
        const user = await UserModel.findOneAndUpdate({
            email,
        }, {
            isVerified: true,
            verifyToken: null,
        }, {
            new: true,
        })

        const { password, refreshToken, ...returnUser } = user.toObject();

        return returnUser;
    }
}

export default new AuthRepository();
