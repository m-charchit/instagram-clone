const reverseComments = (array) => {
  array.map((item) => {
    return item.comments.reverse();
  });
  return array;
};

const returnData = (state, action) => {
  if (state.userPosts) {
    let index = state.userPosts.docs.findIndex(
      ({ _id }) => _id === action.payload.post._id
    );
    if (index !== -1) {
      state.userPosts.docs[index].comments =
        action.payload.post.comments.length;
      state.userPosts.docs[index].like = action.payload.post.like.length;
    }
  }
  if (state.posts) {
    let index = state.posts.docs.findIndex(
      ({ _id }) => _id === action.payload.post._id
    );
    state.posts.docs[index] = {
      ...state.posts.docs[index],
      ...action.payload.post,
      like: state.posts.docs[index].like,
      comments: action.payload.post.comments.reverse(),
    };
    return {
      ...state,
      posts: state.posts,
      userPosts: state.userPosts,
    };
  }
  return {
    ...state,
    post: {
      like: state.post.like,
      likedPost: state.post.likedPost,
      ...action.payload.post,
      comments: action.payload.post.comments.reverse(),
    },
    userPosts: state.userPosts,
  };
};

const post = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return {
        ...state,
        posts:
          state.posts && state.posts.page !== action.payload.posts.page
            ? {
                ...action.payload.posts,
                docs: [
                  ...state.posts.docs,
                  ...reverseComments(action.payload.posts.docs),
                ],
              }
            : {
                ...action.payload.posts,
                docs: reverseComments(action.payload.posts.docs),
              },
      };
    case "FETCH_LIKES":
      if (state.posts) {
        let id = state.posts.docs.findIndex(
          ({ _id }) => _id === action.payload.postId
        );
        action.payload.like.docs =
          action.payload.like.currentPage !== 1
            ? state.posts.docs[id].like.nextPage !==
              action.payload.like.nextPage
              ? [...state.posts.docs[id].like.docs, ...action.payload.like.docs]
              : state.posts.docs[id].like.docs
            : action.payload.like.docs;
        state.posts.docs[id] = {
          ...state.posts.docs[id],
          like: action.payload.like,
        };
      } else {
        action.payload.like.docs =
          action.payload.like.currentPage !== 1
            ? state.post.like.nextPage !== action.payload.like.nextPage
              ? [...state.post.like.docs, ...action.payload.like.docs]
              : state.post.like.docs
            : action.payload.like.docs;
        state.post = { ...state.post, like: action.payload.like };
      }
      return {
        ...state,
        posts: state?.posts,
        post: state.post
          ? { ...state.post, like: action.payload.like }
          : undefined,
      };
    case "FETCH_POST_SUCCESS":
      console.log(action.payload.posts);
      return {
        ...state,
        post: {
          ...action.payload.posts,
          comments: action.payload.posts.comments.reverse(),
        },
      };
    case "ORGANIZE_POST_SUCCESS":
      return {
        ...state,
        post: {
          like: state.post.like,
          likedPost: state.post.likedPost,
          ...action.payload.posts,
        },
      };
    case "FETCH_USER_POSTS":
      return {
        ...state,
        userPosts:
          state.userPosts && state.userPosts.page !== action.payload.posts.page
            ? {
                ...action.payload.posts,
                docs: [...state.userPosts.docs, ...action.payload.posts.docs],
              }
            : action.payload.posts,
      };
    case "UPLOAD_POST_SUCCESS":
      state.posts[
        state.posts.findIndex(({ _id }) => _id === action.payload.post._id)
      ] = action.payload.post;
      return {
        ...state,
        posts: state.posts,
      };

    case "LIKE_POST_SUCCESS":
      return returnData(state, action);
    case "ADD_COMMENT_SUCCESS":
      return returnData(state, action);
    case "DELETE_COMMENT_SUCCESS":
      return returnData(state, action);
    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        posts: state.posts && {
          ...state.posts,
          docs: state.posts.docs.filter(
            (e) => e._id !== action.payload.deletedPostId
          ),
        },
        userPosts: state.userPosts && {
          ...state.userPosts,
          docs: state.userPosts.docs.filter(
            (e) => e._id !== action.payload.deletedPostId
          ),
        },
      };
    case "CHECK_LIKE_SUCCESS":
      if (state.posts) {
        let index = state.posts.docs.findIndex(
          ({ _id }) => _id === action.payload.postId
        );
        state.posts.docs[
          state.posts.docs.findIndex(({ _id }) => _id === action.payload.postId)
        ] = { ...state.posts.docs[index], ...action.payload.data };
      }
      return {
        ...state,
        post: state.post
          ? { ...state.post, ...action.payload.data }
          : undefined,
        posts: state.posts,
      };
    default:
      return state;
  }
};
export default post;
