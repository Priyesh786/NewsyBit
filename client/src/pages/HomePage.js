import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../index.css";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [loading, setloading] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const [SearchText, setSearchText] = useState('');
  const navigate = useNavigate()
  const apiUrl = process.env.REACT_APP_API_URL;

  const getData = async () => {
    setloading(true);
    try {
      const result = await axios.get("/api/newsItems/getallnewsItem");
      setloading(false);
      setNewsItems(result.data);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="grid px-20 sm:px-5 mt-5">
        <input
          value={SearchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          className="border-2 h-10 w-full border-gray-300 px-5"
          placeholder="Search News"
        />
      </div>
      {newsItems.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-5 mx-20 my-10 sm:mx-5 mt-20">
          {newsItems
            .filter((item) =>
              item.title.toLowerCase().includes(SearchText && SearchText.toLowerCase())
            )
            .map((item) => {
              return (
                <div className="shadow-md p-3 border-2 cursor-pointer " onClick={()=>navigate(`/newsdesc/${item._id}`)}>
                  <h1 className="text-primary text-lg font-semibold">
                    {item.title}
                  </h1>
                  <p>{item.description}</p>
                  <div className="flex justify-end flex-col items-end">
                    <span className="text-gray-500 text-sm">
                      By : {item.postedby.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      On : {item.createdAt.slice(0, 10)}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </Layout>
  );
}

export default HomePage;
