import { Link } from "react-router-dom";
import logo from "../../assets/image.png";
import { Avatar } from "antd";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} width="50" height="50"></img>
      {/* <Avatar icon={logo} size={50}></Avatar> */}
      <h2 style={{ fontWeight: "bold" }}> Networks Collection Metrics</h2>
      <div className="links">
        <Link to="/collections">Collections</Link>
        <Link to="/developers">Developers</Link>
        <Link to="/analytics">Analytics</Link>
      </div>
    </nav>
  );
};

export default Navbar;
