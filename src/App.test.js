import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import Main from './components/Main';
import { updateTimes, initializeTimes } from './components/Main';

// PowerShell Terminal > npm test

/**
 * Exercise:
 * Adding unit tests
 */

// Step 1: Test for some static text being rendered
// in the Main component
test("Renders the BookingForm main heading", () => {
  // https://stackoverflow.com/a/71107064
  // render component
  render(
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
  const heading = screen.getByText("Make a Reservation");
  expect(heading).toBeInTheDocument();
});

// -- Readiness check: Did you set up component unit tests?
test("Tests if the BookingForm component can be submitted by the user", async () => {
  // https://stackoverflow.com/a/64486930
  const promise = Promise.resolve();
  // mock function
  const mock = jest.fn(() => promise);
  // render component
  render(
    <BrowserRouter>
      <BookingForm onSubmit={mock} />
    </BrowserRouter>
  );

  // simulate submitButton click event
  const submitButton = screen.getByText("Book Now");
  fireEvent.click(submitButton);
  // mock the submitButton
  mock(submitButton);

  // expected results
  expect(mock).toBeCalled();

  await act(() => promise);
});

// Step 2: Test the updateTimes and initializeTimes functions
// -- Write a unit test for the initializeTimes function to validate
// that it returns the correct expected value
test("Tests if initializeTimes() returns the correct expected value", () => {
  // function to test
  const times = initializeTimes();
  //console.log(times);

  // mock function with optional implemetation to get/return time
  const mock = jest.fn(t => t);
  mock(times[0]); // first
  //mock(times[times.length-1]); // last

  // expected results
  expect(mock).toHaveReturnedWith("17:00");
  //expect(mock).toHaveReturnedWith("23:30");
});

// -- For testing purposes, the fetchAPI function will
// return a non-empty array of available booking times
test("Tests if initializeTimes() returns a non-empty Array", () => {
  // function to test
  const times = initializeTimes();

  // mock function with optional implemetation to get/return Array
  const mock = jest.fn(t => t);
  mock(times);

  // expected results
  expect(mock).not.toHaveLength(0); // not to have zero length
});

// -- Write a unit test for the updateTimes function to validate
// that it returns the same value that is provided in the state
test("Tests if updateTimes() returns the same value as provided in the state", () => {
  // function to test
  const state = updateTimes("2023-02-17", { type: "default" });
  //console.log(state);

  // mock function with optional implemetation to get/return state
  const mock = jest.fn(state => state);
  mock(state);

  // expected results
  expect(mock).toHaveReturnedWith("2023-02-17");
});

/**
 * Exercise:
 * Adding unit tests for the form validation and submission
 * https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
 */

// Step 1: Validate if HTML5 validation attribute is applied
test("Tests if input is of type text, email, date, and number", async () => {
  // https://dev.to/il3ven/fix-warning-in-react-update-was-not-wrapped-in-act-bk6
  act(() => {
    render(
      <BrowserRouter>
        <BookingForm />
      </BrowserRouter>
    );
  });
  await waitFor(() => {
    const name = screen.getByTestId("name");
    expect(name).toHaveAttribute("type", "text");

    const email = screen.getByTestId("email");
    expect(email).toHaveAttribute("type", "email");

    const date = screen.getByTestId("date");
    expect(date).toHaveAttribute("type", "date");

    const guests = screen.getByTestId("guests");
    expect(guests).toHaveAttribute("type", "number");
  });
});

test("Tests if input (guests) has the min and max attributes", async () => {
  act(() => {
    render(
      <BrowserRouter>
        <BookingForm />
      </BrowserRouter>
    );
  });
  await waitFor(() => {
    const guests = screen.getByTestId("guests");
    expect(guests).toHaveAttribute("min", "1");
    expect(guests).toHaveAttribute("max", "10");
  });
});

// Step 2: Add unit tests for JavaScript validation functions
const EVENT = {
  SELECT: "select",
  CHANGE: "change",
  BLUR: "blur",
};
// resolve with Promise to suppress act() warning
function resolve(onEvent, elem, val) {
  let state = null;
  switch (onEvent) {
    case EVENT.SELECT:
      state = fireEvent.select(elem, { target: { value: val } });
      break;
    case EVENT.CHANGE:
      state = fireEvent.change(elem, { target: { value: val } });
      break;
    case EVENT.BLUR:
      state = fireEvent.blur(elem);
      break;
    default:
      state = null;
  }
  return Promise.resolve(state);
}

test("Validation tests for valid states", async () => {
  render(
    <BrowserRouter>
      <BookingForm />
    </BrowserRouter>
  );

  const name = screen.getByTestId("name");
  await act(() => resolve(EVENT.CHANGE, name, "Mickey Mouse"));
  expect(name).not.toHaveAttribute("haserror");

  const email = screen.getByTestId("email");
  await act(() => resolve(EVENT.CHANGE, email, "mickeymouse@mousehouse.com"));
  expect(email).not.toHaveAttribute("haserror");

  const date = screen.getByTestId("date");
  await act(() => resolve(EVENT.CHANGE, date, { type: "update", payload: "2023-02-17" }));
  expect(date).not.toHaveAttribute("haserror");

  const time = screen.getByTestId("time");
  await act(() => resolve(EVENT.SELECT, time, { target: { value: initializeTimes()[0] } }));
  expect(time).not.toHaveAttribute("haserror");

  const guests = screen.getByTestId("guests");
  await act(() => resolve(EVENT.CHANGE, guests, "1"));
  expect(guests).not.toHaveAttribute("haserror");
  await act(() => resolve(EVENT.CHANGE, guests, "10"));
  expect(guests).not.toHaveAttribute("haserror");

  const occasion = screen.getByTestId("occasion");
  await act(() => resolve(EVENT.SELECT, occasion, { target: { value: "birthday" } }));
  expect(occasion).not.toHaveAttribute("haserror");
});

test("Validation tests for invalid states", async () => {
  render(
    <BrowserRouter>
      <BookingForm />
    </BrowserRouter>
  );

  const name = screen.getByTestId("name");
  await act(() => resolve(EVENT.BLUR, name));
  expect(name).toHaveAttribute("haserror");

  const email = screen.getByTestId("email");
  await act(() => resolve(EVENT.BLUR, email));
  expect(email).toHaveAttribute("haserror");
  await act(() => resolve(EVENT.CHANGE, email, "mickeymouse"));
  expect(email).toHaveAttribute("haserror");

  const date = screen.getByTestId("date");
  await act(() => resolve(EVENT.BLUR, date));
  expect(date).toHaveAttribute("haserror");

  const time = screen.getByTestId("time");
  await act(() => resolve(EVENT.BLUR, time));
  expect(time).toHaveAttribute("haserror");
  await act(() => resolve(EVENT.BLUR, time));
  expect(time).toHaveAttribute("haserror");

  const guests = screen.getByTestId("guests");
  await act(() => resolve(EVENT.BLUR, guests));
  expect(guests).toHaveAttribute("haserror");
  await act(() => resolve(EVENT.CHANGE, guests, "0"));
  expect(guests).toHaveAttribute("haserror");
  await act(() => resolve(EVENT.CHANGE, guests, "100"));
  expect(guests).toHaveAttribute("haserror");

  const occasion = screen.getByTestId("occasion");
  await act(() => resolve(EVENT.BLUR, occasion));
  expect(occasion).toHaveAttribute("haserror");
  await act(() => resolve(EVENT.SELECT, occasion, { target: { value: "" } }));
  expect(occasion).toHaveAttribute("haserror");
});
