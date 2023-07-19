import React, { useEffect, useState } from "react";
import {EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import Spinner from "../components/Spinner";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Layout from "../components/Layout";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function EditNews() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setloading] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('Newsybit-user'))
  const save = async () => {
    setloading(true)
    try {
      const payload = {
        title,
        description,
        content : JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        postedby : {
          userid : user._id ,
          email : user.email ,
          name : user.name
        },
        newsid : params.newsid
      };
     
      await axios.post('/api/newsItems/editnewsItem', payload);
      setloading(false)
      toast('News Edited Successfully', 'success')
      navigate('/home')
    } catch(error) {
      console.log(error);
      toast('Something went wrong', 'error')
      setloading(false)
    }
  }
  const getData = async () => {
    setloading(true);
    try {
      const result = await axios.post("/api/newsItems/getnewsitembyid", {
        newsid: params.newsid,
      });
      setloading(false);
      setTitle(result.data.title);
      setDescription(result.data.description)
      setEditorState(()=>EditorState.createWithContent(convertFromRaw(JSON.parse(result.data.content))))
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
      <h1 className="text-3xl font-semibold mt-5 ml-5">EditNews</h1>
      <div className="px-5 py-5">
        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          type="text"
          className="border-2 h-10 w-full border-gray-300"
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          className="border-2 w-full border-gray-300 my-2"
          rows="4"
          placeholder="Description"
        ></textarea>
      </div>
      <div className="border-2 border-gray-400 mx-5 rounded px-2">
        <Editor editorState={editorState} onEditorStateChange={setEditorState} editorClassName="draft-editor" />;
      </div>
      <div className="flex justify-end space-x-5 pr-5 mt-5">
        <button className="px-5 py-2 bg-yellow-500 text-white" onClick={()=>navigate('/home')}>BACK</button>
        <button className="px-5 py-2 bg-orange-700 text-white" onClick={save}>SAVE</button>
      </div>
    </Layout>
  );
}

export default EditNews;
