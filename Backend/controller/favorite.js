import User from "../models/user.js";

export const addBookInFavorites = async (req, res) => {
  try {
    const bookid = req.headers["bookid"];
    const id = req.headers["id"];
    const userData = await User.findById(id);
    const isBookAlreadyFav = userData.favorites.includes(bookid);
    if (isBookAlreadyFav) {
      return res.status(200).json({ message: "Book is already in favorites" });
    }
    await User.findByIdAndUpdate(id, { $push: { favorites: bookid } });
    res.status(200).json({ message: "Book added in favorites" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteBookFromFavorites = async (req, res) => {
  try {
    const bookid = req.headers["bookid"];
    const id = req.headers["id"];
    const userData = await User.findById(id);
    const isBookAvailableInFavorites = userData.favorites.includes(bookid);
    if (isBookAvailableInFavorites) {
      await User.findByIdAndUpdate(id, { $pull: { favorites: bookid } });
    }
    res.status(200).json({ message: "Book removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllFavBooks = async (req, res) => {
  try {
    const id = req.headers["id"];
    const userData = await User.findById(id).populate("favorites");
    const favBooks = userData.favorites.reverse();
    if (!favBooks.length) {
      return res
        .status(404)
        .json({ message: "No Books in favorites to display" });
    }
    res.status(200).json(favBooks);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
