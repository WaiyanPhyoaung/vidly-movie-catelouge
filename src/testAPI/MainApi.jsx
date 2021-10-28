import React, { useEffect, useState } from "react";
import config from "../config.json";
import http from "../httpModule/httpService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainApi() {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const { data } = await http.get(config.apiEndPoint);
    setPosts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    const obj = { title: "t", body: "b" };
    const { data: post } = await http.post(config.apiEndPoint, obj);
    console.log(post);
    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };

  const handleUpdate = async (post) => {
    console.log("To be update => ", post);
    post.title = "New Updated Title";
    const { data: updatedObj } = await http.patch(
      `${config.apiEndPoint}/${post.id}`,
      {
        title: "updated with patch",
      }
    );
    const postsUpdate = [...posts];
    const index = postsUpdate.indexOf(post);
    postsUpdate[index] = updatedObj;

    setPosts(postsUpdate);
  };

  const handleDelete = async (post) => {
    const originalPosts = posts;

    const deletedPosts = posts.filter((p) => p.id !== post.id);
    setPosts(deletedPosts);
    try {
      await http.delete(`${config.apiEndPoint}/${post.id}`);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This post has already been deleted~!");
      }
      setPosts(originalPosts);
    }
  };

  return (
    <div>
      <ToastContainer />
      <button onClick={handleAdd}>Add Post</button>

      {posts.map((p) => (
        <div key={p.id}>
          <h5 key={p.id}>{p.title}</h5>
          <button onClick={() => handleUpdate(p)}>Update</button>
          <button onClick={() => handleDelete(p)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default MainApi;
