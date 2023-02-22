import Contact from "./Contact";
import Nav from "./Nav";

const Footer = () => {
  return (
    <section className="section-flexbox section-footer">
      <img src={require("../images/logo2.png")} className="footer-logo"
        alt="Little Lemon footer logo">
      </img>
      <span className="section-footer-nav">
        <span>
          <h3>Doormat Navigation</h3>
          <Nav />
        </span>
        <span>
          <h3>Contact</h3>
          <Contact />
        </span>
        <span>
          <h3>Social Media Links</h3>
          <Contact />
        </span>
      </span>
    </section>
  );
}
export default Footer;
