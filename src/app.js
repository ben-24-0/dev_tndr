const express = require("express");
const port = 7777;
const connectDB = require("./config/database");
require("./config/database");
const User = require("./models/user");
const app = express(); // the main app

app.use(express.json());

app.post("/signup", async (req, res) => {
  const data = req.body;
  // final = await data.json();
  console.log(data);

  const user = new User(req.body);
  await user.save();
  res.send(" saved succesfully");
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

    if (body.length === 0) {
      throw new Error("empty field");
    }
    ALLOWED_FIELDS = ["age", "height", "weight", "skills"];
    // Find user(s) by firstname

    const isUpdateAllowed = Object.keys(data).every((keys) =>
      ALLOWED_FIELDS.includes(keys)
    );

    if (!isUpdateAllowed) {
      throw new Error("not updatable");
    }
    if (data?.skills.length > 10) {
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
