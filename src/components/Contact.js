import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <ul>
      <li><Link to="/" className="nav-item">Address</Link></li>
      <li><Link to="/" className="nav-item">Phone number</Link></li>
      <li><Link to="/" className="nav-item">Email</Link></li>
    </ul>
  );
}
export default Contact;
