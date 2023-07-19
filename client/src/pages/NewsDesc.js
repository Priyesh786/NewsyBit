import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';

const NewsDesc = () => {
  const [loading, setloading] = useState(false);
  const [newsItem, setNewsItem] = useState();
  const getData = async () => {
    setloading(true);
    try {
      const result = await axios.post("/api/newsItems/getnewsitembyid", {
        newsid: params.newsid,
      });
      setloading(false);
      setNewsItem(result.data);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const params = useParams();
  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        newsItem && (
          <div className="p-5">
            <h1 className="my-3 text-2xl font-semibold">{newsItem.title}</h1>
            <hr />
            {parse(draftToHtml(JSON.parse(newsItem.content)))}
          </div>
        )
      )}
    </Layout>
  );
};

export default NewsDesc;
