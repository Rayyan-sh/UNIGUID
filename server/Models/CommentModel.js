import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    commentBody: {
      type: String,
      required: true,
    },

    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userInfos",
      required: true,
    },

    likes: {
      type: [mongoose.Schema.Types.ObjectId], // users who liked
      ref: "userInfos",
      default: [],
    },

    dislikes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "userInfos",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("comments", CommentSchema);
export default CommentModel;