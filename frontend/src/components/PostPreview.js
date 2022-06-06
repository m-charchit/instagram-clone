import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addComment, checkLike, deletePost, likePost } from "../state/Actions/post";
import { followActions } from "../state/Actions/user";
import OptionDialog from "./OptionDialog";
import UserDialog from "./UsersDialog";

function PostPreview({ post }) {
  // @ts-ignore
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showLikeElem, setShowLikeElem] = useState(false);
  const [showOptionDialog, setShowOptionDialog] = useState(false);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(checkLike(post._id))
  }, [])
  
  const buttonData = [
    ...(currentUser && post.user._id === currentUser._id
      ? [
          {
            msg: "Delete",
            color: "red",
            fun: () => {
              dispatch(deletePost(post._id));
            },
          },
        ]
      : []),
    {
      msg: "Go To Post",
      fun: () => {
        navigate(`/post/${post._id}`);
      },
    },
    {
      msg: "Copy Link",
      fun: () => {
        navigator.clipboard.writeText(`http://localhost:3000/post/${post._id}`);
      },
    },
  ];

  const likePosts = () => {
    dispatch(likePost(post._id,post.like.currentPage));
  };
  const followAction = (type, userId) => {
    dispatch(followActions(userId, type));
  };
  const InputHandle = (e) => {
    setComment(e.target.value);
  };
  const uploadComment = (e) => {
    e.preventDefault();
    dispatch(addComment(comment, post._id));
    setComment("");
  };
  return (
    <>
      {showOptionDialog && (
        <OptionDialog hideElem={setShowOptionDialog} buttonData={buttonData} />
      )}
      {showLikeElem && post.like.totalDocs !== 0 && (
        <UserDialog
          title="Like"
          hideElem={setShowLikeElem}
          user={post }
          data2={currentUser && currentUser.followings}
          followAction={followAction}
          crUsername={currentUser.username}
        />
      )}

      <div className="bg-white border">
        <div className="flex py-5 px-4 ">
          <img src="/default.jpg" alt="" className="w-8 h-8 " />
          <div className="grid ml-4 -mt-1">
            <span className="text-sm">{post.user.username}</span>
            <span className="text-xs text-gray-500">Narela City (Delhi)</span>
          </div>
          <i
            className="fas fa-ellipsis-h text-gray-500 float-right ml-auto my-auto"
            onClick={() => {
              setShowOptionDialog(true);
            }}
          ></i>
        </div>
        <img src="/walk.jpg" alt="" />
        <div className="flex flex-col py-3 px-4">
          <div className="w-full">
            <div className="flex space-x-3 float-left">
              <i
                className={`${
                  post.likedPost 
                    ? "fas text-red-500"
                    : "far"
                } fa-heart text-2xl cursor-pointer hover:opacity-70 active:scale-125 transition-all`}
                onClick={likePosts}
              ></i>

              <Link to={`/post/${post._id}`}>
                <i className="far fa-comment text-2xl cursor-pointer"></i>
              </Link>
              <i className="far fa-paper-plane text-2xl cursor-pointer"></i>
            </div>
            <i className="far fa-bookmark text-2xl cursor-pointer float-right"></i>
          </div>
          <p className="font-thin">
            Liked by{" "}
            <button
              className="font-semibold"
              onClick={() => {
                setShowLikeElem(true);
              }}
            >
              {post.like?.totalDocs} users
            </button>
          </p>
          <p className="text-gray-600">
            <b>{post.user.username}</b> {post.caption}
          </p>
          {post && post.comments.length !== 0 && (
            <Link
              to={`/post/${post._id}`}
              className="outline-none text-gray-500 text-left text-sm w-fit active:text-gray-300 "
            >
              View all {post.comments.length} comments
            </Link>
          )}
          {post &&
            post.comments.length !== 0 &&
            post.comments.slice(0, 2).map((comment) => {
              return (
                <div key={comment._id}>
                  <Link
                    to={`/profile/${comment.user.username}`}
                    className="font-semibold"
                  >
                    {comment.user.username}{" "}
                  </Link>
                  <span>{comment.comment}</span>
                </div>
              );
            })}
        </div>
        <form action="" method="post" onSubmit={uploadComment}>
          <div className="flex border-t p-3 justify-between">
            <input
              type="text"
              placeholder="Add a Comment..."
              className="w-full outline-none px-1"
              onChange={InputHandle}
              value={comment}
              name="com"
            />
            <button
              className="outline-none text-blue-400 hover:text-blue-700 "
              disabled={comment.trim().length === 0}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PostPreview;
