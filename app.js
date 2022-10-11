var createError = require("http-errors");
var express = require("express");
var path = require("path");
const cors = require("cors");

var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var tokenRouter = require("./routes/token");
var addressRouter = require("./routes/address");
var recipeRouter = require("./routes/recipe");
var paymentRecipeRouter = require("./routes/paymentRecipe");
var cartRouter = require("./routes/cart");
var productRouter = require("./routes/product");
var productCategoryRouter = require("./routes/productCategory");
var productDescriptionRouter = require("./routes/productDescription");
var categoryRouter = require("./routes/category");
var productStockRouter = require("././routes/productStock")
var unitconvertionRouter = require("./routes/unitConveter")
var productHistoryRouter = require("./routes/productHistory")
var salesReportRouter = require("./routes/salesReport")
var orderRoutes = require("./routes/order")
var app = express();

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/token", tokenRouter);
app.use("/address", addressRouter);
app.use("/recipe", recipeRouter);
app.use("/payment_recipe", paymentRecipeRouter);
app.use("/cart", cartRouter);
app.use("/product", productRouter);
app.use("/product_category", productCategoryRouter);
app.use("/product_description", productDescriptionRouter);
app.use("/category", categoryRouter);
app.use("/product_stock", productStockRouter);
app.use("/unitConveter", unitconvertionRouter);
app.use("/product_history", productHistoryRouter);
app.use("/sales_report",salesReportRouter)
app.use("/order",orderRoutes)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
