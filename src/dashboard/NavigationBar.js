import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./NavigationBar.css";
import { useNavigate } from "react-router-dom";
import Logo from '../assests/images/quiz.png'

type Props = {
    userName: any;
}
const Navbar = (props: Props) => {
    const navigate = useNavigate();
    const {userName} = props;

    const userLogoutHandler = () => {
        sessionStorage.clear();
        navigate('/login');

    }

    return (
        <header>
            <img src={Logo}  width={90} height={70} alt="React Imaage"/>
            <h2 className="nav-header">QUIZ APPLICATION</h2>
            <nav>
                <a href="/#">Dashboard</a>
                <a href="/#">My Profile</a>
                <a href="/#">{props.userName}</a>
                <a onClick={userLogoutHandler} className="btn btn-danger" href="#" role="button">LOGOUT</a>

            </nav>
        </header>
    );
}

export default Navbar;
