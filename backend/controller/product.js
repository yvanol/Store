const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const { upload } = require("../multer");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/shop");
const { put, del } = require("@vercel/blob"); // Import put and del from @vercel/blob
const ErrorHandler = require("../utils/ErrorHandler");
const Order = require("../model/order"); // Fixed: Changed 'order' to 'Order' to match usage

// Create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }

      const files = req.files;
      const imageUrls = [];

      // Upload each file to Vercel Blob
      for (const file of files) {
        const { url } = await put(`uploads/${Date.now()}-${file.originalname}`, file.buffer, {
          access: "public", // Or "private" if you need restricted access
          token: process.env.BLOB_READ_WRITE_TOKEN, // Use standard Vercel env var name
        });
        imageUrls.push(url);
      }

      const productData = req.body;
      productData.images = imageUrls;
      productData.shop = shop;

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);

      if (!product) {
        return next(new ErrorHandler("Product not found with this id!", 404));
      }

      // Delete images from Vercel Blob
      for (const imageUrl of product.images) {
        await del(imageUrl, { token: process.env.BLOB_READ_WRITE_TOKEN });
      }

      await Product.findByIdAndDelete(productId);

      res.status(200).json({
        success: true,
        message: "Product Deleted Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Create or update product review
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);
      if (!product) {
        return next(new ErrorHandler("Product not found!", 404));
      }

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id.toString() === req.user._id.toString()
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id.toString() === req.user._id.toString()) {
            rev.rating = rating;
            rev.comment = comment;
            rev.user = user;
          }
        });
      } else {
        product.reviews.push(review);
      }

      // Calculate average rating
      product.ratings =
        product.reviews.reduce((sum, rev) => sum + rev.rating, 0) /
        product.reviews.length;

      await product.save({ validateBeforeSave: false });

      // Update order's isReviewed status
      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviewed successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get all products for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;