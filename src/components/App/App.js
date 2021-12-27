import styled from "styled-components";
import Nav from "../Nav";
import Footer from "../Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext, AuthLoadingContext } from "../../contexts";
import { getMyUserData } from "../../WebAPI";
import { getAuthToken } from "../../utils";
import TeacherManagePage from "../../pages/TeacherManagePage";
import FrontCoursePage from "../../pages/FrontCoursePage";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import TeacherCalendarPage from "../../pages/TeacherCalendarPage";
import FilterPage from "../../pages/FilterPage";
import CartPage from "../../pages/CartPage";
import PointPage from "../../pages/PointPage";
import StudentCalendarPage from "../../pages/StudentCalendarPage";
import StudentManagePage from "../../pages/StudentManagePage";
import QAPage from "../../pages/QAPage";

export const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  text-align: center;
  z-index: 20;
`;

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const token = getAuthToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    getMyUserData().then((response) => {
      setIsLoading(false);
      if (response && response.success === true) {
        setUser(response.user);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AuthLoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <Router basename={process.env.PUBLIC_URL}>
          <div id="Outside">
            {/* {isLoading && <Loading>載入中...</Loading>} */}
            <Nav />
            <Routes>
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/filter" element={<FilterPage />} />
              <Route exact path="/qa" element={<QAPage />} />
              <Route
                exact
                path="/cart"
                element={user && user.identity === "student" && <CartPage />}
              />
              <Route
                path="/manage"
                element={
                  user && user.identity === "teacher" ? (
                    <TeacherManagePage />
                  ) : (
                    user && user.identity === "student" && <StudentManagePage />
                  )
                }
              />
              <Route path="/course/:courseId" element={<FrontCoursePage />} />
              <Route
                path="/calendar"
                element={
                  user && user.identity === "teacher" ? (
                    <TeacherCalendarPage />
                  ) : (
                    user &&
                    user.identity === "student" && <StudentCalendarPage />
                  )
                }
              />
              <Route path="/point" element={<PointPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </AuthLoadingContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
