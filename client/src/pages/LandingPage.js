import React, { useEffect, useState } from "react";
import lottie from "lottie-web";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [showLogInForm, setshowLogInForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const login = async () => {
    try {
      setloading(true);
      const payload = {
        email,
        password,
      };
      const result = await axios.post(`${apiUrl}/api/users/login`, payload);
      const userData = { ...result.data };
      delete userData.password;
      toast("Login Successful");
      localStorage.setItem("Newsybit-user", JSON.stringify(userData));
      navigate("/home");
      setloading(false);
    } catch (error) {
      toast("Something went wrong");
      setloading(false);
    }
  };
  const register = async () => {
    try {
      setloading(true);
      const payload = {
        email,
        password,
        name,
      };
      await axios.post(`${apiUrl}/api/users/register`, payload);
      toast("Registration Successful, Please login");
      setName("");
      setEmail("");
      setPassword("");
      setloading(false);
      setShowRegisterForm(false);
      setshowLogInForm(true);
    } catch (error) {
      toast("Something went wrong");
      setloading(false);
    }
  };
  useEffect(() => {
    if (!showLogInForm && !showRegisterForm) {
      const container = document.getElementById("lottie-container");
      lottie.loadAnimation({
        container: container,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "https://lottie.host/d5cf2afe-d3fe-4cae-9ed1-b65a39979351/RJogtvd7Cg.json",
      });
    }
  }, [showLogInForm, showRegisterForm]);
  useEffect(()=>{
    if(localStorage.getItem('Newsybit-user'))
    navigate('/home')
  },[])
  return (
    <div className="h-screen flex items-center sm:flex-col">
      {loading && <Spinner />}
      <div className={`w-1/2 px-10 space-y-5 sm:w-screen ${(showLogInForm || showRegisterForm) && 'sm:hidden'}`}>
        <h1>
          <b className="text-[#fb923c] text-8xl">NEWSY</b>{" "}
          <b className="text-8xl text-gray-700">BITS</b>
        </h1>
        <p className="text-lg">
        Welcome to NewsyBits, your one-stop destination for the latest news and updates from 
        across the globe. We are dedicated to delivering accurate and unbiased reporting on diverse 
        topics, including politics, economy, science, lifestyle, and more.
        </p>
        <div className="space-x-5">
          <button
            className="bg-gray-300 px-10 py-3 font-semibold"
            onClick={() => {
              setShowRegisterForm(false);
              setshowLogInForm(true);
            }}
          >
            LOG IN
          </button>
          <button
            className="bg-[#fb923c] px-10 py-3 text-white font-semibold"
            onClick={() => {
              setshowLogInForm(false);
              setShowRegisterForm(true);
            }}
          >
            REGISTER
          </button>
        </div>
      </div>
      <div className="w-1/2 sm:w-screen">
        {!showLogInForm && !showRegisterForm && (
          <div id="lottie-container"></div>
        )}
        {showLogInForm && (
          <div className="ml-40 sm:ml-0">
            <div className="flex flex-col bg-primary h-screen justify-center items-center px-20 space-y-5">
              <h1 className="text-6xl text-gray-400 text-left w-full font-semibold my-5">
                LOG IN
              </h1>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-200"
                placeholder="email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-200"
                placeholder="password"
              />
              <div className="flex justify-end w-full">
                <button
                  className="bg-gray-100 px-10 py-3 text-black font-semibold"
                  onClick={login}
                >
                  LOG IN
                </button>
              </div>
            </div>
          </div>
        )}
        {showRegisterForm && (
          <div className="ml-40 sm:ml-0">
            <div className="flex flex-col bg-primary h-screen justify-center items-center px-20 space-y-5">
              <h1 className="text-6xl text-gray-400 text-left w-full font-semibold my-5">
                REGISTER
              </h1>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-200"
                placeholder="name"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-200"
                placeholder="email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-200"
                placeholder="password"
              />
              <div className="flex justify-end w-full">
                <button
                  className="bg-gray-100 px-10 py-3 text-black font-semibold"
                  onClick={register}
                >
                  REGISTER
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {(showRegisterForm || showLogInForm) && (
        <AiOutlineClose
          className="absolute top-10 right-10 z-10 cursor-pointer hover:bg-gray-100 hover:rounded-full hover: text-white"
          size={30}
          color="gray"
          onClick={() => {
            setshowLogInForm(false);
            setShowRegisterForm(false);
          }}
        />
      )}
    </div>
  );
};

export default LandingPage;
