import { UserModel } from "../models/index.js";
import { faker } from "@faker-js/faker";

function createRandomUser() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email()
    };
}

async function start() {
    for (let i = 0; i < 100; i++) {
        const user = createRandomUser();
        await UserModel.create({
            username: user.name,
            email: user.email,
            password: "12345678"
        });

        console.log(user.name);
    }
}

export {
    start as generateUsers,
}