import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByCourse } from "../Features/BookSlice";
import { useParams, useNavigate } from "react-router-dom";
import CommentsSec from "./CommentsSec";
import "./Book.css";

const BookDetails = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { books, booksStatus } = useSelector((state) => state.books);
// git book by course
  useEffect(() => {
    if (courseId) {
      dispatch(getBooksByCourse(courseId));
    }
  }, [courseId, dispatch]);

  if (booksStatus === "loading") return <p>Loading...</p>;
  if (booksStatus === "failed") return <p>Error loading books</p>;

  return (
    <div className="course-container">
      <h2>Books</h2>

      {booksStatus === "succeeded" && books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <div className="books-list">
          {books.map((book) => (
            <div
              key={book._id}
              className="book-card"
              onClick={() =>
                navigate(`/courses/${courseId}/books/${book._id}`)
              }
            >
              <img src={book.coverImage} alt={book.title} />

              <div className="book-info">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookDetails;