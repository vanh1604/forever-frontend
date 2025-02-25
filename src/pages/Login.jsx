import React, { useContext, useEffect, useState } from "react";

import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [currentState, setCurrentSate] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const res = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        console.log(res);
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        console.log(res);
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800]"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="w-full flex justify-between text-sm mt-[8px]">
        <p className="cursor-pointer">Fogot your password ?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => {
              setCurrentSate("Sign Up");
            }}
          >
            Create Account{" "}
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => {
              setCurrentSate("Login");
            }}
          >
            Login Here
          </p>
        )}
      </div>
      <button
        onClick={onSubmitHandler}
        className="bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currentState === "login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
