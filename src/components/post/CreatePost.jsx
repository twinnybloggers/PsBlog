import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { createPost } from '../../utils/apis';
import { createPost } from '../../features/post/postSlice';
import Navbar from '../Navbar';
import Spinner from '../Spinner';

const CreatePost = ({ setShowCreatePost, showCreatePost, user }) => {
  const dispatch = useDispatch();
  const [postState, setPostState] = useState({
    title: '',
    content: '',
    imgurl: '',
  });
  const defaultImg =
    'https://images.freeimages.com/images/large-previews/bee/omniety-1535599.jpg';

  const { loading } = useSelector((state) => state.post);

  return (
    <>
      <Navbar
        setShowCreatePost={setShowCreatePost}
        showCreatePost={showCreatePost}
        user={user}
      />
      <div className="flex flex-col justify-center items-center mx-5 py-10">
        <div className="pb-14 space-y-3 w-[700px] p-10">
          <h1 className="text-3xl font-bold  text-center">Create Post</h1>
          <div className="space-y-1">
            <p className="text-lg">Post Title</p>
            <input
              className="w-full"
              type="text"
              placeholder="Title for your post..."
              onChange={(e) =>
                setPostState({ ...postState, title: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <p className="text-lg">Background Image (optional)</p>
            <input
              className="w-full"
              type="text"
              placeholder="Image Url..."
              onChange={(e) =>
                setPostState({ ...postState, imgurl: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <p className="text-lg">Content</p>
            <textarea
              className="w-full"
              type="text"
              placeholder="Write Here..."
              rows={5}
              onChange={(e) =>
                setPostState({ ...postState, content: e.target.value })
              }
            />
          </div>
          <button
            className="bg-gray-700 w-full p-2 text-white hover:bg-slate-900"
            onClick={() => {
              dispatch(
                createPost({
                  ...postState,
                  imgurl: postState.imgurl || defaultImg,
                  user: user.id,
                  likes: {
                    users: [],
                  },
                })
              );
            }}
          >
            {loading ? <Spinner /> : 'Create Post'}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
