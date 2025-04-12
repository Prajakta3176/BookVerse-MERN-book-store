import Book from "../models/book.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const addBook = async (req, res) => {
  try {
    const id = req.headers["id"];
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(500)
        .json({ message: "You do not have access to perform admin task!" });
    }
    const { url, title, author, price, description, language } = req.body;
    const book = new Book({
      url: url,
      title: title,
      author: author,
      price: price,
      description: description,
      language: language,
    });
    await book.save();
    res.status(200).json({ message: "Book added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const bookId = req.headers["bookid"];
    if (!bookId) {
      return res.status(400).json({ message: "Book Id is required" });
    }
    const updateData = req.body;
    const book = await Book.findByIdAndUpdate({ _id: bookId }, updateData, {
      new: true,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = req.headers["bookid"];
    if (!bookId) {
      return res.status(400).json({ message: "Book Id is required" });
    }
    const book = await Book.findByIdAndDelete(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRecentlyAddedBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 }).limit(4);
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addBooks = async (req, res) => {
  try {
    const id = req.headers["id"];
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(500)
        .json({ message: "You do not have access to perform admin task!" });
    }
    const books = req.body;

    if (!Array.isArray(books) || books.length === 0) {
      return res
        .status(400)
        .json({
          message: "Invalid book data. Please provide an array of books.",
        });
    }

    await Book.insertMany(books);
    res.status(200).json({ message: "Book added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
