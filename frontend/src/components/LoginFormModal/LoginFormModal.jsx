import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const demoLoginSupervisor = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return dispatch(thunkLogin({ email: 'Demo-lition', password: 'password' })).then(closeModal)
        .catch(
            async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
            }
        );
      }
  const demoLoginEmployee = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return dispatch(thunkLogin({ email: 'FakeUser2', password: 'password3' })).then(closeModal)
        .catch(
            async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
            }
        );
      }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );
    
    

    if (serverResponse) {
     
      setErrors(serverResponse.errors);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h1>Log In</h1>
      {errors.server && <p className="error">{errors.server}</p>}
      {errors.credential && <div className="error">{errors.credential}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="labels">
          Username or Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        
        <label className="labels">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="submit" type="submit">Log In</button>
        <div className="buttons">
        <button className="submit" onClick={(e) => demoLoginSupervisor(e)}>Supervisor</button>
        <button className="submit" onClick={(e) => demoLoginEmployee(e)}>employee</button>

        </div>
        
      </form>
    </>
  );
}

export default LoginFormModal;
