import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) fetch();

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>Real Estate App</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
  // <div id="about">
  //   <p>
  //     Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quod
  //     molestias perspiciatis quo harum veniam fugiat, vitae nemo quia quaerat
  //     error officia laudantium debitis ex neque! Temporibus inventore architecto
  //     quia.
  //   </p>
  // </div>;

  // <div id="contact">
  //   <p>
  //     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed odit minima
  //     blanditiis a necessitatibus eaque fugit deleniti ea exercitationem
  //     sapiente laborum, fuga quas ducimus dicta quae voluptatum molestias nisi
  //     ullam!
  //   </p>
  // </div>;

  // <div id="agents">
  //   <p>agents:</p>
  // </div>;
}

export default Navbar;
