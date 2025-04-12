import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, email, password, address, role } = req.body;

    //check username length is more than 4
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username length should be greater than 3" });
    }
    // check username already exist
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }
    // check email already exist
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // check password length is greater than 6
    if (password.length < 7) {
      return res
        .status(400)
        .json({ message: "Password should be of minimum 6 characters" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashPass,
      address: address,
      role: role || "user",
    });

    await newUser.save();
    return res.status(200).json({ message: "SignUp successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // checking if  user exists or not
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = [
          {
            name: existingUser.username,
          },
          {
            role: existingUser.role,
          },
        ];
        const token = jwt.sign({ authClaims }, "bookStore3176", {
          expiresIn: "30d",
        });
        // res.status(200).json({ message: "Signed In successfully" });
        res
          .status(200)
          .json({ id: existingUser.id, role: existingUser.role, token: token });
      } else {
        return res.status(400).json({ message: "Invalid Credential" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserInformation = async (req, res) => {
  try {
    const id = req.headers["id"];
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const id = req.headers["id"];
    const { address } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: id },
      { address: address },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Address updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
