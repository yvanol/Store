"use strict";

var ErrorHandler = require("../utils/ErrorHandler");

var catchAsyncErrors = require("../middleware/catchAsyncErrors");

var jwt = require("jsonwebtoken");

var User = require("../model/user");

exports.isAuthenticated = catchAsyncErrors(function _callee(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.cookies.token;

          if (token) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", next(new ErrorHandler("Please login to continue", 401)));

        case 3:
          decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findOne(decoded.id));

        case 6:
          req.user = _context.sent;
          next();

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});