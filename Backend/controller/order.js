import User from "../models/user.js";
import Order from "../models/order.js";

// for admin and user
export const placeOrder = async (req, res) => {
  try {
    const id = req.headers["id"];
    const order = req.body;

    for (const orderData of order) {
      const newOrder = new Order({
        user: id,
        book: orderData._id,
      });
      const orderDataFromDB = await newOrder.save();

      //saving order in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDB._id },
      });
      //clearing cart
      await User.findByIdAndUpdate(id, { $pull: { cart: orderData._id } });
    }

    res.status(200).json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// for user
export const getOrderHistory = async (req, res) => {
  try {
    const id = req.headers["id"];
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    const ordersData = userData.orders.reverse();
    return res.status(200).json(ordersData);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// for admin
export const getAllOrders = async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// for admin
export const updateStatusOfOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    await Order.findByIdAndUpdate(orderId, { status: req.body.status });

    return res.json({
      status: "Success",
      message: "Status updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
