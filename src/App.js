import './App.css';
import HomePage from "./HomePage";
import BookingPage from "./BookingPage";
import NoPage from "./NoPage";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ConfirmBookingPage from "./components/ConfirmBookingPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <span className="section-flexbox section-header-nav">
        <Header />
        <Nav />
      </span>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<NoPage />}></Route>
        <Route path="/menu" element={<NoPage />}></Route>
        <Route path="/booking" element={<BookingPage />}></Route>
        <Route path="/order" element={<NoPage />}></Route>
        <Route path="/login" element={<NoPage />}></Route>

        <Route path="/confirmBooking" element={<ConfirmBookingPage />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
