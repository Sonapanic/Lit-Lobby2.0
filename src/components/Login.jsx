import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";

const Login = () => {
  const {
    currentUser,
    setCurrentUser,
    newUser,
    setNewUser,
    showToast,
    renderUrl,
    localUrl
  } = useContext(AuthContext);

  const [confirmPass, setConfirmPass] = useState("");
  const changeConfirm = (e) => {
    setConfirmPass(e.currentTarget.value);
  };

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    friends: [],
    friend_requests: [],
  });

  const [userCreated, setUserCreated] = useState({
    isNew: false,
    rejected: false,
  });

  const isPasswordValid = userInfo.password.length >= 1;

  const doPasswordsMatch = userInfo.password === confirmPass;

  const clearForm = () => {
    setUserInfo({
      username: "",
      password: "",
      email: "",
      first_name: "",
      last_name: "",
      friends: [],
      friend_requests: [],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleAccountSubmit = async (e) => {
    // post request to make a new user
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    };

    try {
      if (isPasswordValid) {
        await fetch(`${renderUrl}/register`, options);
        clearForm();
        handleSignUp();
        setUserCreated({ ...userCreated, isNew: true, rejected: false });
        showToast("Account created! Please log in.");
      }
    } catch (err) {
      console.error("Couldn't sign up");
      setUserCreated({ ...userCreated, isNew: false, rejected: true });
    }
  };

  const handleSignUp = () => {
    clearForm();
    setNewUser(!newUser);
  };

  const handleLoginSubmit = async (e) => {
    // post request to authenticate returning user
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    };

    try {
      const response = await fetch(`${renderUrl}/login`, options);

      if (response.ok) {
        const user = await response.json();
        const safeUser = Object.fromEntries(
          Object.entries(user).filter(([key]) => key !== "hashed_password")
        );
        localStorage.setItem("user", JSON.stringify(safeUser));
        setCurrentUser(user);
        showToast(`Welcome to LitLobby!`);
      } else {
        throw new Error("Login response not ok");
      }
    } catch (err) {
      showToast('Login error. Please verify user information and try again.')
      console.error("Couldn't log in");
    }
  };

  return newUser ? (
    <div
      className={`flex overflow-auto flex-col justify-between rounded-lg bg-linkWhite md:text-md mt-10 lg:text-lg w-72 p-4 h-[55dvh] ${location.pathname === '/contact' || location.pathname === '/about' ? 'hidden' : ''}`}
      style={{ background: 'linear-gradient(to bottom left, #E1D4C0, #cdbfa8, #E1D4C0)' }}
    >
      <h2 className="">Please enter the following information:</h2>
      <div className="w-full flex justify-center">
        <form onSubmit={handleAccountSubmit} className="w-full h-full flex flex-col">
          <div className="">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              className="border border-darkGreen focus:border-testShadow bg-softWhite focus:outline-none focus:searchbar-box-shadow duration-300 px-2 text-softBlack rounded-md w-full"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              className="border bg-softWhite border-darkGreen focus:border-testShadow focus:outline-none focus:searchbar-box-shadow duration-300 px-2 text-softBlack rounded-md  w-full"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              required
            />
            {isPasswordValid ? (
              <span></span>
            ) : (
              <span className="w-1/2 font-semibold">
                Should contain at least 8 characters
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPass"
              value={confirmPass}
              onChange={changeConfirm}
              className="border bg-softWhite border-darkGreen focus:border-testShadow focus:outline-none focus:searchbar-box-shadow duration-300 px-2 text-softBlack rounded-md w-full"
            />
            {doPasswordsMatch ? (
              <span></span>
            ) : (
              <span className="w-1/2 font-semibold">
                Passwords do not match
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              className="border bg-softWhite border-darkGreen focus:border-testShadow focus:outline-none focus:searchbar-box-shadow duration-300 px-2 text-softBlack rounded-md  w-full"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">First Name</label>
            <input
              type="text"
              className="border border-darkGreen bg-softWhite focus:border-testShadow focus:outline-none focus:searchbar-box-shadow duration-300 px-2 text-softBlack rounded-md  w-full"
              name="first_name"
              value={userInfo.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Last Name</label>
            <input
              type="text"
              className="border border-darkGreen bg-softWhite focus:border-testShadow focus:outline-none focus:searchbar-box-shadow duration-300 px-2 text-softBlack rounded-md  w-full"
              name="last_name"
              value={userInfo.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full flex justify-between">
            {isPasswordValid ? (
              <input
                type="submit"
                className="bg-midBrown hover:bg-warmBrown text-softWhite font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-inner duration-300 cursor-pointer"
                value="Submit"
                onSubmit={handleAccountSubmit}
              />
    ) : (
                <button className="bg-midBrown hover:bg-warmBrown text-softWhite font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-inner duration-300 cursor-pointer">
                  Submit
                </button>
              )}
              <button
                onClick={handleSignUp}
                className="bg-midBrown hover:bg-warmBrown text-softWhite font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-inner duration-300 cursor-pointer"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
  ) : (
      <div
        className={`flex flex-col overflow-auto items-center mt-40 bg-linkWhite h-[30dvh] lg:text-lg p-4 md:text-md rounded-lg ${location.pathname === '/contact' || location.pathname === '/about' ? 'hidden' : ''}`}
        style={{ background: 'linear-gradient(to bottom left, #E1D4C0, #cdbfa8, #E1D4C0)' }}
      >
        <h1>Log Into Lit-Lobby</h1>
        <span>
          Don't have an account?{" "}
          {
            <button onClick={handleSignUp} className="text-softBlack underline">
              Sign up!
            </button>
          }
        </span>
        <form
          onSubmit={handleLoginSubmit}
          className="w-full mt-12 flex justify-center flex-col"
        >
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              className="border border-darkGreen bg-softWhite focus:border-testShadow focus:outline-none focus:searchbar-box-shadow duration-300 px-2 text-softBlack rounded-md  w-full"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              className="border border-darkGreen bg-softWhite focus:border-testShadow focus:outline-none focus:searchbar-box-shadow duration-300 px-2 text-softBlack rounded-md  w-full"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-start w-full">
            <input
              type="submit"
              className="w-1/2 bg-warmBrown hover:bg-alternateBrown text-softWhite font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-inner duration-300 cursor-pointer mt-2"
              value="Log In"
            />
          </div>
        </form>
      </div>
  );
};

export default Login;
