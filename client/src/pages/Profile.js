import React from 'react'
import Layout from '../components/Layout'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Spinner from "../components/Spinner";



const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setloading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("Newsybit-user"));
  const navigate = useNavigate()

  useEffect(() => {
    if(userData && userData.name && userData.email) {
      setName(userData.name);
      setEmail(userData.email);
    }
  }, []);

  const handlePasswordChange = async (e) => {
    setloading(true);
    e.preventDefault();
    try {
      const payload = {
        userId: userData._id,
        currentPassword: currentPassword,
        newPassword: newPassword,
      };
      const response = await axios.post('/api/users/changepassword', payload);
      console.log('Response:', response.data);
      setloading(false);
      toast("Password Changed Successfully, Please Login")
      localStorage.removeItem("Newsybit-user");
      navigate('/')
      
    } catch (error) {
      toast("Error Changing Password");
      setloading(false);
    }
  };
  return (
    <Layout>
      {loading && <Spinner />}
    <h1 className="text-3xl text-gray-600 underline mb-5 font-semibold mt-5 ml-5">Your Profile Info</h1>
    <div className='mt-10 pl-5'>
      <h2 className='text-2xl italic'>Name: {name}</h2>
      <h2 className='mt-2 mb-20 text-2xl italic'>Email: {email}</h2>
      <h2 className="text-2xl text-gray-600 underline mb-3 mt-5 ">Change Password</h2>
      <form  onSubmit={handlePasswordChange}>
       <div className='mb-3'>
          <input className='border-2 h-10 w-64 border-gray-500 px-5 bg-transparent text-gray-800'
            type="password"
            placeholder="Enter your current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
      </div>   
      <div className='mb-3'>    
          <input className='border-2 h-10 w-64 border-gray-500 px-5 bg-transparent text-gray-800'
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
      </div>  
      <div>
          <button type="submit" className="bg-[#fb923c] px-8 py-0.5 text-black font-semibold" >Submit</button>
      </div>    
        </form>
    </div>
    </Layout>
  )
}

export default Profile