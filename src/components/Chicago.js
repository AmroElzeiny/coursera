import { Link } from "react-router-dom";

const Chicago = () => {
  return (
    <section className="section-flexbox section-chicago">
      <span className="section-flexbox">
        <span className="chicago-span-content">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <article>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </article>
          <Link to="/booking" role="button">Reserve a Table</Link>
        </span>
        <span>
          <img src={require("../images/restauranfood.jpg")} alt="Main logo"
            className="chicago-logo">
          </img>
        </span>
      </span>
    </section>
  );
}
export default Chicago;
