import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../index.css";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const PostedNewsitems = () => {
  const [loading, setloading] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("Newsybit-user"));
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const getData = async () => {
    setloading(true);
    try {
      const result = await axios.post("/api/newsItems/getnewsitembyuserid", {
        userid: user._id,
      });
      setloading(false);
      setNewsItems(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const deleteItem = async (newsid) => {
    setloading(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const result = await axios.post("/api/newsItems/deletenewsItem", {
        newsid,
      });
      setloading(false);
      getData();
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  return (
    <Layout>
      {loading && <Spinner />}

      {newsItems.length > 0 && (
        <div className="p-10">
          <h1 className="text-3xl text-gray-600 mb-5 font-semibold">
            Posted News Items
          </h1>
          <table className="w-full border-2 border-gray-500 p-10">
            <thead className="w-full">
              <tr className="w-full">
                <th className="border-2 border-gray-500 p-2">Id</th>
                <th className="border-2 border-gray-500 p-2">Title</th>
                <th className="border-2 border-gray-500 p-2">Posted on</th>
                <th className="border-2 border-gray-500 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsItems.map((item) => {
                return (
                  <tr>
                    <td className="border-2 border-gray-500 p-2">{item._id}</td>
                    <td className="border-2 border-gray-500 p-2">
                      {item.title}
                    </td>
                    <td className="border-2 border-gray-500 p-2">
                      {item.createdAt.slice(0, 10)}
                    </td>
                    <td className="border-2 border-gray-500 p-2 items-center">
                      <div className="flex justify-center space-x-5 pr-5 mt-3 mb-3">
                        <button
                          className="px-5 py-1 bg-red-700 text-sm text-white p-2"
                          onClick={() => deleteItem(item._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="px-5 py-1 bg-green-500 text-sm text-white p-2"
                          onClick={() => navigate(`/edit/${item._id}`)}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default PostedNewsitems;
