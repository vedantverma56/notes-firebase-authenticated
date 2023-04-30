import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({ userName }) => {
  // console.log(userName);
  const navigate = useNavigate();
  const auth = getAuth();

  const logOutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success(`logged out successfully!`, {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-moveTask"
        });
        // alert("logged out successfully");
      })
      .catch((error) => {
        // An error happened.
        alert("error");
      });
    navigate("/");
  };
  return (
    <nav>
        <h2>Notes App</h2>
      <ul>
        {!userName && (
          <li>
            <NavLink to="Signup">SignUp</NavLink>
          </li>
        )}
        {!userName && (
          <li>
            <NavLink to="login">Login</NavLink>
          </li>
        )}
      </ul>
      {userName && <p>Welcome, {userName} !</p>}
      {userName && (
        <button onClick={logOutHandler} className="logOutBtn">
          LogOut
        </button>
      )}
    </nav>
  );
};
export default Navbar;
