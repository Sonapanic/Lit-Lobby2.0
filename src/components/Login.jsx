import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";

const Login = () => {
  const { currentUser, setCurrentUser, newUser, setNewUser } =
    useContext(AuthContext);

  const renderUrl = "https://litlobby.onrender.com";
  const localUrl = "http://localhost:10000";

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  const [userCreated, setUserCreated] = useState({
    isNew: false,
    rejected: false,
  });

  const clearForm = () => {
    setUserInfo({
      username: "",
      password: "",
      email: "",
      first_name: "",
      last_name: "",
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
      await fetch(`${localUrl}/register`, options);
      clearForm();
      setUserCreated({ ...userCreated, isNew: true, rejected: false });
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
      const response = await fetch(`${localUrl}/login`, options);

      if (response.ok) {
        const user = await response.json()
        setCurrentUser(user)
      } else {
        throw new Error('Login response not ok')
      }

    } catch (err) {
      console.error("Couldn't log in");
    }
  };

  return newUser ? (
    <div className="flex flex-col items-center">
      <h2 className="mb-4">Please enter the following information:</h2>
      <form onSubmit={handleAccountSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            className="border border-gray-300 p-1 w-full"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="border border-gray-300 p-1 w-full"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="border border-gray-300 p-1 w-full"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            className="border border-gray-300 p-1 w-full"
            name="first_name"
            value={userInfo.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            className="border border-gray-300 p-1 w-full"
            name="last_name"
            value={userInfo.last_name}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          className="bg-gray-200 p-2 cursor-pointer"
          value="Submit"
        />
        <button
          onClick={handleSignUp}
          className="bg-gray-200 p-2 cursor-pointer ml-24"
        >
          Back to Login
        </button>
      </form>
      {userCreated.isNew ? (
        <span className="text-green-500">
          You've been successfully registered to LitLobby! Please log in to
          continue.
        </span>
      ) : (
        <span></span>
      )}
      {userCreated.rejected ? (
        <span>
          Either the username or email you entered has already been registered.
          Please try a new one.
        </span>
      ) : (
        <span></span>
      )}
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <h1>Log Into LitLobby</h1>
      <button onClick={handleSignUp}>Don't have an account? Sign up!</button>
      <form onSubmit={handleLoginSubmit} className="w-full max-w-xs mt-12">
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            className="border border-gray-300 p-1 w-full"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="border border-gray-300 p-1 w-full"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          className="bg-gray-200 p-2 cursor-pointer"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default Login;
