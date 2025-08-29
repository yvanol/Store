"use strict";

var express = require("express");

var path = require("path");

var User = require("../model/user");

var router = express.Router();

var _require = require("../multer"),
    upload = _require.upload;

var ErrorHandler = require("../utils/ErrorHandler");

var fs = require("fs");

var jwt = require("jsonwebtoken");

var catchAsyncErrors = require("../middleware/catchAsyncErrors");

var sendToken = require("../utils/jwtToken");

var sendMail = require("../utils/sendMail");

var _require2 = require("../middleware/auth"),
    isAuthenticated = _require2.isAuthenticated;

router.post("/create-user", upload.single("file"), function _callee(req, res, next) {
  var _req$body, fullName, phoneNumber, email, password, userEmail, _filename, filePath, filename, fileUrl, user, activationToken, activationUrl;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, fullName = _req$body.fullName, phoneNumber = _req$body.phoneNumber, email = _req$body.email, password = _req$body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          userEmail = _context.sent;

          if (!userEmail) {
            _context.next = 10;
            break;
          }

          _filename = req.file.filename;
          filePath = "uploads/".concat(_filename);
          fs.unlink(filePath, function (err) {
            if (err) {
              console.log(err);
              res.status(500).json({
                message: "Error deleting file"
              });
            }
          });
          return _context.abrupt("return", next(new ErrorHandler("User already exists", 400)));

        case 10:
          filename = req.file.filename;
          fileUrl = path.join(filename);
          user = {
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            password: password,
            avatar: fileUrl
          };
          activationToken = createActivationToken(user);
          activationUrl = "http://localhost:3000/activation/".concat(activationToken);
          _context.prev = 15;
          _context.next = 18;
          return regeneratorRuntime.awrap(sendMail({
            email: user.email,
            subject: "Activate your account",
            message: "Hello ".concat(user.fullName, ", please click on the to link activate your account: ").concat(activationUrl)
          }));

        case 18:
          res.status(201).json({
            sucess: true,
            message: "Please check your email:- ".concat(user.email, " to activate your account ")
          });
          _context.next = 24;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](15);
          return _context.abrupt("return", next(new ErrorHandler(_context.t0.message, 500)));

        case 24:
          _context.next = 29;
          break;

        case 26:
          _context.prev = 26;
          _context.t1 = _context["catch"](0);
          return _context.abrupt("return", next(new ErrorHandler(_context.t1.message, 400)));

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 26], [15, 21]]);
}); // create activationToken

var createActivationToken = function createActivationToken(user) {
  return jwt.sign(user, process.env.Activation_SECRET, {
    expiresIn: "5m"
  });
}; // activate user


router.post("/activation", catchAsyncErrors(function _callee2(req, res, next) {
  var activation_token, newUser, fullName, email, password, avatar, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          activation_token = req.body.activation_token;
          newUser = jwt.verify(activation_token, process.env.Activation_SECRET);

          if (newUser) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next(new ErrorHandler("Invalid token", 400)));

        case 5:
          fullName = newUser.fullName, email = newUser.email, password = newUser.password, avatar = newUser.avatar;
          _context2.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 8:
          user = _context2.sent;

          if (!user) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", next(new ErrorHandler("User already exists", 400)));

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(User.create({
            fullName: fullName,
            email: email,
            avatar: avatar,
            password: password
          }));

        case 13:
          user = _context2.sent;
          sendToken(user, 201, res);
          _context2.next = 20;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", next(new ErrorHandler(_context2.t0.message, 500)));

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 17]]);
})); // Login User

router.post("/login-user", catchAsyncErrors(function _callee3(req, res, next) {
  var _req$body2, email, password, user, isPasswordValid;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", next(new ErrorHandler("Please provide the all fields!", 400)));

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).select("+password"));

        case 6:
          user = _context3.sent;

          if (user) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", next(new ErrorHandler("User doesn't exists!", 400)));

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(user.comparePassword(password));

        case 11:
          isPasswordValid = _context3.sent;

          if (isPasswordValid) {
            _context3.next = 14;
            break;
          }

          return _context3.abrupt("return", next(new ErrorHandler("Please provide the correct information", 400)));

        case 14:
          sendToken(user, 201, res);
          _context3.next = 20;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", next(new ErrorHandler(_context3.t0.message, 500)));

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 17]]);
})); // load user
// router.get(
//   "/getuser",
//   isAuthenticated,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const user = await User.findById(req.user.id);
//       if (!user) {
//         return next(new ErrorHandler("User doesn't exists", 400));
//       }
//       res.status(200).json({
//         success: true,
//         user,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

module.exports = router;