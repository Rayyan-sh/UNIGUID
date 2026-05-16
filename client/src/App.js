import './App.css';

import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Register from './Components/Register';
import CourseList from "./Components/CourseList";
import BookDetails from './Components/BookDetails';
import CommentsSec from './Components/CommentsSec';
import User from "./Components/User";
import Profile from './Components/Profile';


import p1 from "./Images/p1.jpg";

function App() {
    console.log("SERVER_URL:", SERVER_URL);
  return (
      <div className="App">

        <Header />

        <Routes>

          {/* الصفحة الرئيسية */}
          <Route
            path="/"
            element={
              <section className="main-section">
                <div className="container">

                  <div className="text">
                    <h1>
                     Welcome  UniGuide ! <br />
                    </h1>

                    <p>
                      An interactive platform that helps students 
                      explore courses, discover useful books, 
                      and share knowledge through comments and 
                      ratings.
                    </p>

                  </div>

                  <div className="image">
                    <img src={p1} alt="student" />
                  </div>

                </div>
              </section>
            }
          />

          <Route path="/login" element={<Login />} />
           <Route path="/Register" element={<Register />} />
  <Route path="/CourseList" element={<CourseList />} />
              <Route path="/profile" element={<Profile />}></Route>

    <Route path="/courses/:courseId/books" element={<BookDetails />} />
<Route path="/courses/:courseId/books/:bookId" element={<CommentsSec />} />



        </Routes>

        <Footer />

      </div>
  );
}

export default App;