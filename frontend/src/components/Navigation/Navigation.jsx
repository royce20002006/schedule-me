import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul className="profile-navs round">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="bigger">ScheduleMe</li>
      <li>
        <ProfileButton className='profile-button'/>
      </li>
    </ul>
  );
}

export default Navigation;
