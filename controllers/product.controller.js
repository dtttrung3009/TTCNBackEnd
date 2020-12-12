const Product = require("../models/product.model");

module.exports = {
  getAllProduct: async (req, res, next) => {
    const category = req.query.category ? { category: req.query.category } : {};
    const searchKeyword = req.query.searchKeyword
      ? {
          name: {
            $regex: req.query.searchKeyword,
            $options: "i", ///option i la khong phan biet chu thuong va chu hoa
          },
        }
      : {};
    ///1: asc, -1:desc
    const sortOrder = req.query.sortOrder
      ? req.query.sortOrder === "lowest"
        ? { price: 1 }
        : { price: -1 }
      : { _id: -1 };
    const products = await Product.find({ ...category, ...searchKeyword }).sort(
      sortOrder
    );
    res.send(products);
  },
  getProductById: async (req, res, next) => {
    const product = await Product.findOne({
      _id: req.params.id,
    });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({
        message: "Product not found",
      });
    }
  },
  createReviewProduct: async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    const { name, rating, comment } = req.body;
    if (product) {
      const review = {
        name,
        rating,
        comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updateProduct = await Product.save();
      res.status(201).send({
        data: updateProduct.reviews[updateProduct.reviews.length - 1],
        message: "Review saved success",
      });
    } else {
      res.status(404).send({
        message: "Product not found",
      });
    }
  },
  updateInfoProduct: async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      (product.name = req.body.name ? req.body.name : product.name),
        (product.price = req.body.price ? req.body.price : product.price);
      product.image = req.body.image ? req.body.image : product.image;
      product.brand = req.body.brand ? req.body.brand : product.brand;
      product.category = req.body.category
        ? req.body.category
        : product.category;
      product.description = req.body.description
        ? req.body.description
        : product.description;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res.status(200).send({
          message: "Update product success",
          data: updatedProduct,
        });
      }
    }
    return res.status(500).send({
      message: "Error is update product",
    });
  },
  deleteProduct: async (req, res, next) => {
    const deleteProduct = await Product.findById(req.params.id);
    if (deleteProduct) {
      await deleteProduct.remove();
      return res.status(200).send({
        message: "Delete product success",
      });
    }
    return res.status(500).send({ message: "Error when delete product" });
  },
  createProduct: async (req, res, next) => {
    const {
      name,
      price,
      image,
      brand,
      category,
      description,
      rating,
      numReviews,
    } = req.body;
    const product = new Product({
      name,
      price,
      image,
      brand,
      category,
      description,
      rating,
      numReviews,
    });
    const newProduct = await product.save();
    if (newProduct) {
      return res
        .status(201)
        .send({ message: "Create product success", data: newProduct });
    }
    return res.status(500).send({ message: "Error when create product" });
  },
};
