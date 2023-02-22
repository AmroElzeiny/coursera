import { Link } from "react-router-dom";

const Specials = () => {
  return (
    <section className="section-flexbox section-specials">
      <span className="section-flexbox">
        <span className="specials-span-content">
          <h1>This Week's Specials!</h1>
        </span>
        <span>
          <Link to="/menu" role="button">Online Menu</Link>
        </span>
      </span>
    </section>
  );
}
export default Specials;
