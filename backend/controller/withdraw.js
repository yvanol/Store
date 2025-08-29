const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const Withdraw = require("../model/withdraw");
const sendMail = require("../utils/sendMail");
const router = express.Router();

// create withdraw request --- only for seller
router.post(
  "/create-withdraw-request",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { amount } = req.body;

      // Validate amount
      if (!amount || isNaN(amount)) {
        return next(new ErrorHandler("Please enter a valid amount", 400));
      }

      const shop = await Shop.findById(req.seller._id);

      // Check sufficient balance
      if (shop.availableBalance < amount) {
        return next(new ErrorHandler("Insufficient balance", 400));
      }

      const data = {
        seller: req.seller,
        amount,
      };

      // Create withdraw record first
      const withdraw = await Withdraw.create(data);

      // Update shop balance
      shop.availableBalance = shop.availableBalance - amount;
      await shop.save();

      // Send email notification
      try {
        await sendMail({
          email: req.seller.email,
          subject: "Withdraw Request",
          message: `Hello ${req.seller.name}, Your withdraw request of ${amount}$ is processing. It will take 3-7 days to process!`,
        });
      } catch (error) {
        console.error("Failed to send email:", error.message);
      }

      res.status(201).json({
        success: true,
        withdraw,
      });

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all withdraws --- admin
router.get(
  "/get-all-withdraw-request",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });
      res.status(200).json({  // Changed from 201 to 200 for GET requests
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update withdraw request ---- admin
router.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerId } = req.body;

      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        {
          status: "succeed",
          updatedAt: Date.now(),
        },
        { new: true }
      );

      if (!withdraw) {
        return next(new ErrorHandler("Withdraw request not found", 404));
      }

      const seller = await Shop.findById(sellerId);
      if (!seller) {
        return next(new ErrorHandler("Seller not found", 404));
      }

      const transaction = {
        _id: withdraw._id,
        amount: withdraw.amount,
        updatedAt: withdraw.updatedAt,
        status: withdraw.status,
      };

      seller.transactions = [...seller.transactions, transaction];
      await seller.save();

      try {
        await sendMail({
          email: seller.email,
          subject: "Payment confirmation",
          message: `Hello ${seller.name}, Your withdraw request of ${withdraw.amount}$ is on the way. Delivery time depends on your bank's rules it usually takes 3-7 days.`,
        });
      } catch (error) {
        console.error("Failed to send email:", error.message);
      }

      res.status(200).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;