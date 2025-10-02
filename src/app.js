const express = require("express");
const cookieparser = require("cookie-parser");
var jwt = require("jsonwebtoken");
const port = 7777;
const connectDB = require("./config/database");
require("./config/database");
const { validateSignupData, ValidateLoginData } = require("./utils/validation");
const passHash = require("./utils/passHash");
const User = require("./models/user");
const app = express(); // the main app
app.use(cookieparser());
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    // final = await data.json();
    validateSignupData(req);
    const { LastName, FirstName, emailId, password, gender } = data;
    const hashedPass = await passHash(password);
    console.log(hashedPass);
    const user = new User({
      LastName,
      FirstName,
      emailId,
      password: hashedPass,
      gender,
    });
    await user.save();
    res.send(" saved succesfully");
  } catch (error) {
    res.send({
      message: "ERROR:" + error,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    // const { emailId, password } = req.body;
    const user = await ValidateLoginData(req);
    if (!user) {
      throw new Error("invalid credentiels");
    } else if (user) {
      //create a jwt token

      var token = jwt.sign({ _id: user._id }, "supersecret");

      //add the token and send as the cookie
      console.log(token);
      res.cookie("token", token).send("login succesful");
    }
  } catch (error) {
    res.send({
      message: "ERROR:" + error,
    });
  }
});

app.get("/profile", async (req, res) => {
  try {
    // const { emailId, password } = req.body;

    const { token } = req.cookies;
    if (!token) {
      throw new Error("invalid token");
    }

    var decoded = jwt.verify(token, "supersecret");
    console.log(decoded);
    const profile = await User.findById({ _id: decoded._id });
    res.send("profile data" + profile);
  } catch (error) {
    res.send({
      message: "ERROR:" + error,
    });
  }
});
app.get("/user", async (req, res) => {
  const reqEmailId = req.body.emailId;

  try {
    const fetched = await User.find({ emailId: reqEmailId });
    if (fetched.length === 0) {
      res.status(404).send("user q qnot found");
    }
    console.log(fetched);
    res.send(fetched);
  } catch (error) {
    res.status(418);
  }
});

app.delete("/user", async (req, res) => {
  const name = req.body.Firstname;
  console.log(name);
  try {
    const data = await User.find({ Firstname: name });
    console.log(data);
    if (!data) {
      console.log("user not found");
    } else {
      id = data[0]._id.toString();
      console.log(id);
      await User.findByIdAndDelete(id);
    }
    res.send("deleted");
  } catch (error) {
    res.status(404).send("eror");
  }
});
//update email
app.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params?.userId;
    const data = req.body;
    console.log(data);
    // if (data.length === 0) {
    //   throw new Error("empty field");
    // }
    ALLOWED_FIELDS = ["password", "age", "height", "weight", "skills"];
    // Find user(s) by firstname

    const isUpdateAllowed = Object.keys(data).every((keys) =>
      ALLOWED_FIELDS.includes(keys)
    );

    if (!isUpdateAllowed) {
      throw new Error("not updatable");
    }
    if (data?.skills?.length > 10) {
      throw new Error("skill array too long");
    }
    // Update user
    const upd = await User.findByIdAndUpdate(
      userId,
      data,
      { new: true } // return the updated document
    );

    res.status(200).send({
      message: "User updated successfully",
      updatedUser: upd,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal server error");
  }
});

connectDB()
  .then(() => {
    console.log("connected..");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("error");
  });
