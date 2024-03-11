import userRoute from "./user.route.js";
import productRoute from "./product.route.js";

const initAppRoute = (apiRoute) => {
    apiRoute.use("/user", userRoute)

    apiRoute.use("/product", productRoute)
}

export default initAppRoute;