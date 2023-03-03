const express = require("express");
const cors = require("cors");
const { authenticate } = require("./middleware/Authentication");
const { connection } = require("./config/db");
const { dataroutes } = require("./routes/data.routes");
const { cartroutes } = require("./routes/cart.routes");
const { userRouter } = require("./routes/user.routes");
const { adminRouter } = require("./routes/admin.routes");
const { wishlistRouter } = require("./routes/wishlist.routes");

const app = express();

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello trends");
});

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/data", dataroutes);
app.use(authenticate);

app.use("/cart", cartroutes);
app.use("/wishlist", wishlistRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.log({ msg: error.message });

    console.log("Can't connect to db");

    console.log({ msg: error.message });
  }
});
