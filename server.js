require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectDb");

const app = express();

// Connect to MongoDB Database
connectDb();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/artworks", require("./routes/artRoutes"));
app.use("/api/v1/orders", require("./routes/orderRoutes"));
app.use("/api/v1/seller-orders", require("./routes/sellerOrderRoutes"));
app.use("/api/v1/reviews", require("./routes/reviewRoutes"));
app.use("/api/v1/address", require("./routes/addressRoutes"));
app.use("/api/v1/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/v1/cart", require("./routes/cartRoutes"));
app.use("/api/v1/coupons", require("./routes/couponRoutes"));
app.use("/api/v1/commissioned", require("./routes/commissionedArtworkRoutes"));
app.use("/api/v1/email", require("./routes/emailRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started successfully at port:", PORT);
});
