import mongoose from "mongoose";

const conn = async () => {
  try {
    await mongoose.connect(`${process.env.URI}`);
    console.log("Database is connected");
  } catch (err) {
    console.log(err);
  }
};

export default conn;