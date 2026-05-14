import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
    },

    description: {
      type: String,
    },


courseId: {
  type: mongoose.Schema.Types.ObjectId, 
  ref: "courses", 
  required: true,
}
  },
  { timestamps: true }
);

const BookModel = mongoose.model("books", BookSchema);
export default BookModel;