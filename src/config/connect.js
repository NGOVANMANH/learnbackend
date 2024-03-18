import mongoose from "mongoose";

const connect = async () => {
    const uri = process.env.MONGODB_URI_LOCAL;
    await mongoose.connect(uri)
        .then(() => {
            console.log("Connect database success!");
        })
        .catch(err => {
            throw new Error("Connect database fail!")
        })
}

export default connect;
