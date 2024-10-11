import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul className="profile-navs">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>ScheduleMe</li>
      <li>
        <ProfileButton className='profile-button'/>
      </li>
    </ul>
  );
}

export default Navigation;
