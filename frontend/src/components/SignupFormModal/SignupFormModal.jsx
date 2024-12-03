import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";
import { getAllUsersThunk } from "../../redux/users";

function SignupFormModal() {
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('Employee')
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        firstName,
        role,
        lastName,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse.errors);
    } else {
      await dispatch(getAllUsersThunk());
      closeModal();
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p className="error">{errors.server}</p>}
      {errors.undefined && <p className="error">{errors.undefined}</p>}
      
      <form className='signup-form' onSubmit={handleSubmit}>
      <label className="labels">
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className="error">{errors.firstName}</p>}
      <label className="labels">
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label className="labels">
          Role
          <select className="select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Supervisor">Supervisor</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
        </label>
        {errors.role && <p className="error">{errors.role}</p>}
        <label className="labels">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
        <label className="labels">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="error">{errors.username}</p>}
        <label className="labels">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <label className="labels">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        <button className="submit" type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
