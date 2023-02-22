import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormErrorMessage from "./FormErrorMessage";

const BookingForm = (props) => {

  // useNavigate hook
  const navigate = useNavigate();

  // form fields with formik validation
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      date: "",
      time: "",
      guests: "",
      occasion: "",
    },
    // state values
    onSubmit: (values) => {
      console.log(values);
      // checks for valid field values
      if (isFormValid()) {
        // suppress errors for Unit Tests (App.test.js)
        try {
          const bool = props.submitForm(values);
          if (bool) {
            console.log("form submitted");
            navigate("/confirmBooking", { state: values });
          }
        } catch (err) { }
      }
    },
    // a Yup schema that validates the form fields
    validationSchema: Yup.object({
      name: Yup
        .string()
        .required("Required"),
      email: Yup
        .string()
        .email("Invalid email address")
        .required("Required"),
      date: Yup
        .string()
        .required("Required"),
      time: Yup
        .string()
        .required("Required"),
      guests: Yup
        .number()
        .min(1, "Minimum 1 guest")
        .max(10, "Maximum 10 guests")
        .required("Required"),
      occasion: Yup
        .string()
        .required("Required"),
    }),
  });

  function fieldValue(str) {
    return formik.getFieldProps(str).value;
  }

  function isFormValid() {
    return (
      fieldValue("name") !== ""
      && fieldValue("email") !== ""
      && fieldValue("date") !== ""
      && fieldValue("time") !== ""
      && (fieldValue("guests") >= 1 && fieldValue("guests") <= 10)
      && fieldValue("occasion") !== ""
    );
  }

  // event handlers
  function handleDateTime(e) {
    const selectedDate = e.target.value;
    // dispatch to reducer
    // include the newly selected date in the dispatch parameter
    props.updateTimes({ type: "update", payload: selectedDate });
  }

  return (
    <form onSubmit={(e) => {
      // prevent page refresh when a submission occurs
      e.preventDefault();
      // submit form, also touches all fields
      formik.handleSubmit(e);
    }}
      noValidate
    >
      <span className="section-main-select">
        <span>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter full name"
            aria-label="Enter full name"
            aria-required="true"
            data-testid="name"
            haserror={formik.touched.name && formik.errors.name}
            {...formik.getFieldProps("name")}
          />
          {
            formik.touched.name && formik.errors.name &&
            <FormErrorMessage message={formik.errors.name}>
              {formik.errors.name}
            </FormErrorMessage>
          }
        </span>
        <span>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Enter email address"
            aria-label="Enter email address"
            aria-required="true"
            data-testid="email"
            haserror={formik.touched.email && formik.errors.email}
            {...formik.getFieldProps("email")}
          />
          {
            formik.touched.email && formik.errors.email &&
            <FormErrorMessage message={formik.errors.email}>
              {formik.errors.email}
            </FormErrorMessage>
          }
        </span>
        <span>
          <label htmlFor="res-date">Select date</label>
          <input type="date" id="res-date"
            data-testid="date"
            aria-label="Select a date"
            aria-required="true"
            haserror={formik.touched.date && formik.errors.date}
            {...formik.getFieldProps("date")}
            onChange={(e) => {
              formik.handleChange(e);
              handleDateTime(e);
            }}
          />
          {
            formik.touched.date && formik.errors.date &&
            <FormErrorMessage message={formik.errors.date}>
              {formik.errors.date}
            </FormErrorMessage>
          }
        </span>
        <span>
          <label htmlFor="res-time">Select time</label>
          <select id="res-time"
            data-testid="time"
            aria-label="Select a time"
            aria-required="true"
            haserror={formik.touched.time && formik.errors.time}
            {...formik.getFieldProps("time")}
          >
            <option value="">-- Select a time --</option>
            {
              /* populate option fields */
              props.availableTimes?.map((time, index) =>
                <option key={index} value={time}>{time}</option>
              )
            }
          </select>
          {
            formik.touched.time && formik.errors.time &&
            <FormErrorMessage message={formik.errors.time}>
              {formik.errors.time}
            </FormErrorMessage>
          }
        </span>
        <span>
          <label htmlFor="guests">Number of guests</label>
          <input type="number" min="1" max="10" id="guests"
            data-testid="guests"
            aria-label="Enter number of guests"
            aria-required="true"
            haserror={formik.touched.guests && formik.errors.guests}
            className="section-main-guests"
            {...formik.getFieldProps("guests")}
          />
          {
            formik.touched.guests && formik.errors.guests &&
            <FormErrorMessage message={formik.errors.guests}>
              {formik.errors.guests}
            </FormErrorMessage>
          }
        </span>
        <span>
          <label htmlFor="occasion">Occasion</label>
          <select id="occasion"
            data-testid="occasion"
            aria-label="Select an occasion"
            aria-required="true"
            haserror={formik.touched.occasion && formik.errors.occasion}
            {...formik.getFieldProps("occasion")}
          >
            <option value="">-- Select an occasion --</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
          </select>
          {
            formik.touched.occasion && formik.errors.occasion &&
            <FormErrorMessage message={formik.errors.occasion}>
              {formik.errors.occasion}
            </FormErrorMessage>
          }
        </span>
      </span>
      <span>
        <button type="submit" aria-label="Submit Form">
          Book Now
        </button>
      </span>
    </form>
  );
}
export default BookingForm;
