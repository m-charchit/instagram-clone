// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addComment,
  deleteComment,
  deletePost,
  fetchPost,
  likePost,
  organizeComments,
} from "../state/Actions/post";
import { followActions } from "../state/Actions/user";
import NotFound from "./NotFound";
import OptionDialog from "./OptionDialog";
import UserDialog from "./UsersDialog";

function Post() {
  // @ts-ignore
  const { currentUser } = useSelector((state) => state.user);
  // @ts-ignore
  let { post } = useSelector((state) => state.post);
  const [error, setError] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLikeElem, setShowLikeElem] = useState(false);
  const [replyCommentId, SetReplyCommentId] = useState(undefined);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [comment, setComment] = useState("");
  const inputEl = useRef(null);
  const replyToEl = useRef(null);

  const { postId } = useParams();

  useEffect(() => {
    dispatch(fetchPost(postId)).then((data) => {
      dispatch(organizeComments(data));
    }).catch(()=>{
      setError(true)
    });
  }, [dispatch]);

  const likePosts = () => {
    dispatch(likePost(post._id,post.like?.currentPage)).then((data) => {
      dispatch(organizeComments(data));
    });
  };
  const dltComment = (commentId) => {
    dispatch(deleteComment(commentId)).then((data) => {
      dispatch(organizeComments(data));
    });
  };
  const dltPost = () => {
    dispatch(deletePost(post._id)).then(() => {
      navigate("/");
    });
  };
  const showElem = () => {
    setShowLikeElem(true);
  };
  const followAction = (type, userId) => {
    dispatch(followActions(userId, type));
  };
  const InputHandle = (e) => {
    setComment(e.target.value);
  };
  const replyComment = (comId, username) => {
    SetReplyCommentId(comId);
    replyToEl.current.parentElement.classList.remove("hidden");
    replyToEl.current.innerText = `Replying to ${username}`;
    inputEl.current.focus();
  };
  const removeReplyBox = () => {
    SetReplyCommentId(undefined);
    replyToEl.current.parentElement.classList.add("hidden");
  };
  const uploadComment = (e) => {
    e.preventDefault();
    dispatch(addComment(comment, post._id, replyCommentId)).then((data) => {
      dispatch(organizeComments(data));
    });
    removeReplyBox();
    setComment("");
  };
  const showReplies = (e) => {
    console.log(e);
    if (e.target.nodeName === "BUTTON") {
      e.target.nextElementSibling.classList.toggle("hidden");
    } else {
      e.target.parentElement.nextElementSibling.classList.toggle("hidden");
    }
  };
  const commentIconClick = () => {
    inputEl.current.focus();
  };
  if (error){
    return <NotFound/>
  }
  else if (post) {

  return (
    <>
    {showConfirmDialog && <OptionDialog
          title={
            "Are you sure of deleting the post. Once you delete, it's gone forever!"
          }
          hideElem={setShowConfirmDialog}
          buttonData={[
            {
              msg: "Delete",
              color: "red",
              fun: () => {
                dltPost()
              },
            },
          ]}
        />}
      {showLikeElem && post && currentUser && post.like.totalDocs !== 0 && (
        <UserDialog
          title="Like"
          hideElem={setShowLikeElem}
          user={post}
          data2={currentUser.followings}
          followAction={followAction}
          crUsername={currentUser.username}
        />
      )}

      <div className="lg:container mx-auto lg:px-3 md:px-2 ">
        <div className="flex flex-col md:flex-row border md:my-7 shadow-md md:h-[80vh]">
          <img src="/walk.jpg" alt="" className="w-full md:w-[65%] " />
          <div className="flex flex-col bg-white w-full md:w-[35%] ">
            <div className="flex py-5 px-4 border-b">
              <img src="/default.jpg" alt="" className="w-8 h-8 " />
              <div className="grid ml-4 -mt-1">
                <span className="text-sm">
                  {(post && post.user.username) || <Skeleton />}
                </span>
                <span className="text-xs text-gray-500">
                  Narela City (Delhi)
                </span>
              </div>
              {currentUser &&
                post &&
                post.user.username === currentUser.username && (
                  <i
                    className="fas fa-trash-alt text-gray-500 float-right ml-auto my-auto"
                    onClick={()=>setShowConfirmDialog(true)}
                  ></i>
                )}
            </div>
            <div className="flex border-b h-96 overflow-auto flex-col p-4 space-y-5">
              <div className="flex space-x-3">
                <img src="/default.jpg" alt="" className="w-8 h-8 " />
                <p>
                  <span className="font-semibold text-gray-700">
                    {(post && post.user.username) || (
                      <Skeleton width={"100px"} />
                    )}{" "}
                  </span>{" "}
                  {post && post.caption}
                </p>
              </div>
              <hr className="mx-12 "/>
              {post ? (
                post.comments.length !== 0 &&
                post.comments.map((comment) => {
                  return (
                    <div className="flex space-x-3" key={comment._id}>
                      <img src="/default.jpg" alt="" className="w-8 h-8 " />
                      <div className="flex flex-col space-y-2">
                        <div className="">
                          <Link
                            className="font-semibold text-gray-700"
                            to={`/profile/${comment.user.username}`}
                          >
                            {comment.user.username}{" "}
                          </Link>
                          <span>{comment.comment}</span>
                        </div>
                        <div className="flex space-x-4 text-sm text-gray-500 items-center">
                          <span>2w</span>
                          <button
                            onClick={() =>
                              replyComment(comment._id, comment.user.username)
                            }
                          >
                            Reply
                          </button>
                          {currentUser &&
                            comment.user.username === currentUser.username && (
                              <i
                                className="fas fa-trash-alt float-right cursor-pointer"
                                onClick={() => dltComment(comment._id)}
                              ></i>
                            )}
                        </div>
                        {comment.childComments.length !== 0 && (
                          <button
                            className="flex  items-center text-[#8e8e8e] space-x-4 ml-1 text-sm font-semibold"
                            onClick={showReplies}
                          >
                            <div className="border-b border-b-[#8e8e8e] w-6"></div>
                            <span className="">
                              View replies ({comment.childComments.length}){" "}
                            </span>
                          </button>
                        )}
                        <div className="hidden">
                          {comment.childComments.map((item) => {
                            return (
                              <div
                                className="flex space-x-3 mt-3"
                                key={item._id}
                              >
                                <img
                                  src="/default.jpg"
                                  alt=""
                                  className="w-8 h-8 "
                                />
                                <div className="flex flex-col space-y-2">
                                  <div>
                                    <Link
                                      className="font-semibold text-gray-700"
                                      to={`/profile/${item.user.username}`}
                                    >
                                      {item.user.username}{" "}
                                    </Link>
                                    <span>{item.comment}</span>
                                  </div>
                                  <div className="flex space-x-4 text-sm text-gray-500 items-center">
                                    <span>2w</span>
                                    {currentUser &&
                                      item.user.username ===
                                        currentUser.username && (
                                        <i
                                          className="fas fa-trash-alt float-right cursor-pointer"
                                          onClick={() => dltComment(item._id)}
                                        ></i>
                                      )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{ borderTopColor: "transparent" }}
                  className="m-auto w-16 h-16 border-4 border-gray-400 border-solid rounded-full animate-spin"
                ></div>
              )}
            </div>
            <div className="flex flex-col p-3 space-y-2">
              <div className="w-full ">
                <div className="flex space-x-3 float-left">
                  <i
                    className={`${
                      post?.likedPost
                        ? "fas text-red-500"
                        : "far"
                    } fa-heart text-2xl cursor-pointer hover:opacity-70 active:scale-125 transition-all`}
                    onClick={likePosts}
                  ></i>
                  <i
                    className="far fa-comment text-2xl cursor-pointer"
                    onClick={commentIconClick}
                  ></i>
                  <i className="far fa-paper-plane text-2xl cursor-pointer"></i>
                </div>
                <i className="far fa-bookmark text-2xl cursor-pointer float-right"></i>
              </div>
              {post ? (
                <p className="font-thin">
                  Liked by{" "}
                  <button className="font-semibold" onClick={showElem}>
                    {post.like.totalDocs || post.like.length} users
                  </button>
                </p>
              ) : (
                <Skeleton count={0.5} />
              )}
              <p className="text-gray-400 text-xs font-extralight">APRIL 29</p>
            </div>
            <form action="" method="post" onSubmit={uploadComment}>
              <div className="flex pb-3 flex-col  relative space-y-2">
                <div className="flex absolute bg-white border-t w-full -top-9 pt-2 px-3 rounded-sm  items-center space-x-3 hidden">
                  {<p className="w-full text-gray-500" ref={replyToEl}></p>}
                  <i
                    className="fas fa-times text-lg cursor-pointer"
                    onClick={removeReplyBox}
                  ></i>
                </div>
                <div className="flex justify-between mx-2 py-3 px-4 border rounded-3xl">
                  <input
                    type="text"
                    placeholder="Add a Comment..."
                    className="w-full outline-none px-1"
                    name="com"
                    onChange={InputHandle}
                    ref={inputEl}
                    value={comment}
                  />
                  <button
                    className="outline-none disabled:text-blue-400 text-blue-900 hover:text-blue-700"
                    disabled={comment.trim().length === 0}
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
              }
}


export default Post;
