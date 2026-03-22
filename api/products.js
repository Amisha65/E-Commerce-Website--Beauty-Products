const { categories, products } = require("./_lib/catalog");

module.exports = (req, res) => {
    res.status(200).json({
        categories,
        products
    });
};
