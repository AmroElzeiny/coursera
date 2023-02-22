import React, { useReducer } from "react";
import BookingForm from "./BookingForm";
import { fetchAPI, submitAPI } from "../utils/api";

// reducer
// https://read.reduxbook.com/markdown/part1/03-updating-state.html
export const updateTimes = (state, action) => {
  const type = action.type;
  if (type === "update") {
    // return the new state
    const selectedDate = action.payload;
    return fetchAPI(selectedDate);
  }
  // always return state
  return state;
}

// initial state
export const initializeTimes = () => {
  return fetchAPI(new Date()); // today
}

// submitAPI
const submitForm = (formData) => {
  return submitAPI(formData);
}

const Main = () => {
  // update time
  const initialState = initializeTimes();
  const [availableTimes, dispatch] = useReducer(updateTimes, initialState);

  return (
    <section className="section-main">
      <img src={require("../images/reserve_table.jpg")} alt="Make a Reservation logo">
      </img>
      <h1>Make a Reservation</h1>
      <BookingForm
        availableTimes={availableTimes}
        updateTimes={dispatch}
        submitForm={submitForm}
      />
    </section>
  );
}
export default Main;
