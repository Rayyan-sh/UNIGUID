import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByCourse } from "../Features/BookSlice";
import "./CommentsSec.css";

import {
  getCommentsByBook,
  addComment,
  toggleReaction,
} from "../Features/CommentsSlice";

import moment from "moment";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";

const CommentsSec = () => {
  const { courseId, bookId } = useParams();
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const { comments } = useSelector((state) => state.comments);

  const [text, setText] = useState("");

  useEffect(() => {
    if (courseId) dispatch(getBooksByCourse(courseId));
    if (bookId) dispatch(getCommentsByBook(bookId));
  }, [courseId, bookId, dispatch]);

  const book = books.find((b) => b._id === bookId);
 const user = JSON.parse(localStorage.getItem("user"));
const userId = user?._id;

  const handleSend = async () => {
    if (!text.trim()) return;

    if (!userId) {
      alert("Please login first");
      return;
    }

    await dispatch(
      addComment({
        bookId,
        userId,
        commentBody: text,
      })
    );

    setText("");
  };

  const handleReaction = (commentId, type) => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    dispatch(
      toggleReaction({
        commentId,
        userId,
        type,
      })
    );
  };

  return (
    <div className="comments-page">

      <div className="book-panel">
        {book ? (
          <div className="book-card">
            <img src={book.coverImage} alt={book.title} />
            <h2>{book.title}</h2>
            <p className="author">
              <strong>Author:</strong> {book.author}
            </p>
            <p className="desc">
              <strong>Description:</strong> {book.description}
            </p>
          </div>
        ) : (
          <p>Loading book...</p>
        )}
      </div>

      <div className="comments-panel">

        <div className="input-box">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write comment..."
          />
          <button onClick={handleSend}>Send</button>
        </div>

        <div className="comments-box">
          {comments?.map((c) => (
            <div key={c._id} className="comment-card">
              <p className="comment-text">{c.commentBody}</p>

              <p className="user">
                {c.userId?.name || c.userId || "Unknown"}
              </p>

              <p className="time">
                {moment(c.createdAt).fromNow()}
              </p>

              <div className="reactions">
                <button onClick={() => handleReaction(c._id, "like")}>
                  <FaThumbsUp /> {c.likes?.length || 0}
                </button>

                <button onClick={() => handleReaction(c._id, "dislike")}>
                  <FaThumbsDown /> {c.dislikes?.length || 0}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CommentsSec;