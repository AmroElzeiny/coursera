import { useLocation } from "react-router-dom";
import { formatDate } from "../utils/date";

const ConfirmBookingPage = () => {
  // props from navigate
  const { state } = useLocation();

  return (
    <section className="section-flexbox">
      <span className="section-main">
        <h2>Your booking has been confirmed!</h2>
        <span className="confirmed-span-content">
          <span>
            <span>Name:</span>
            <span>Email:</span>
            <span>Date:</span>
            <span>Time:</span>
            <span>Guests:</span>
            <span>Occasion:</span>
          </span>
          <span>
            <span>{state.name}</span>
            <span>{state.email}</span>
            <span>{formatDate(state.date)}</span>
            <span>{state.time}</span>
            <span>{state.guests}</span>
            <span>{state.occasion}</span>
          </span>
        </span>
      </span>
    </section>
  );
}
export default ConfirmBookingPage;
