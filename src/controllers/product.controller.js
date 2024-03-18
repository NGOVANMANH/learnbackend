class ProductController {
    create = (req, res) => {
        res.status(200).json({
            message: "From create"
        })
    }

    getById = (req, res) => {
        res.status(200).json({
            message: "From getById"
        })
    }

    getAll = (req, res) => {
        res.status(200).json({
            message: "From getAll"
        })
    }

    update = (req, res) => {
        res.status(200).json({
            message: "From update",
        })
    }
}

export default new ProductController();
