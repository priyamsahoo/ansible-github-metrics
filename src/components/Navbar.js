import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} width="50" height="50"></img>
      <h1>nsible Github Metrics</h1>
      <div className="links">
        <Link to="/">Collections</Link>
        <Link to="/developers">Developers</Link>
      </div>
    </nav>
  );
};

export default Navbar;
