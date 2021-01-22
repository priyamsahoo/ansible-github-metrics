import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Ansible Github Metrics</h1>
            <div className="links">
                <Link to="/">Collections</Link>
                <Link to="/developers">Developers</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;