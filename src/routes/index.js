import userRoute from "./user.route.js";
import productRoute from "./product.route.js";
import authRoute from "./auth.route.js";

const initAppRoute = (apiRoute) => {
    apiRoute.use("/users", userRoute)
    apiRoute.use("/products", productRoute)
    apiRoute.use("/auth", authRoute)
}

export default initAppRoute;
