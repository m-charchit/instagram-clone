// @ts-nocheck
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import LoadingBar from 'react-topbar-progress-indicator'
import { getLikes } from '../state/Actions/post'
import { getFollows } from '../state/Actions/user'

function UserDialog(props) {
  const {title,hideElem,user,followAction,data2,crUsername} = props
  const data =  user[title.toLowerCase()]
  console.log(data)
  const [progress, setProgress] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    setProgress(false)
    document.body.style.overflow = "hidden"
    return () => {
    document.body.style.overflow = "auto"
    }
  },[])

  const renderBtn = (item) => {
    let ifUserFollow = data2.map((e)=>JSON.stringify(e)).includes(JSON.stringify(item))
    if (item.username !== crUsername){
    if (ifUserFollow) {
      return (
        <button className="outline-none text-white text-sm font-semibold  bg-blue-500  px-2 py-1 rounded-sm my-3 lg:my-0" onClick={()=>followAction("unfollow",item._id)}>
              Following
            </button>
      )
    } else{
      return (<button className="outline-none text-white text-sm font-semibold  bg-blue-500  px-2 py-1 rounded-sm my-3 lg:my-0" onClick={()=>followAction("follow",item._id)}>
      Follow
    </button>)
    }
  } else {
    return (
      (<Link to={`/profile/${crUsername}`} className="outline-none text-white text-sm font-semibold  bg-blue-500  px-2 py-1 rounded-sm my-3 lg:my-0" >
      Profile
    </Link>)
    )
  }
  }
  
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-30 backdrop-brightness-50' style={{"margin":"0px"}}>
      
        <div className="bg-white border rounded-xl w-96 overflow-auto  animate-showModal ">
            <div className='relative my-2 font-semibold flex justify-center items-center'>
                <p className='w-full text-center '>{title}</p>
                <i className="absolute right-2 fas fa-times text-3xl float-right cursor-pointer" onClick={()=>hideElem(false)}></i>
            </div>  
            <hr />
            <div id='scrollTarget' className='h-20 overflow-auto'>
            { user && data  && <InfiniteScroll 
            scrollThreshold={"10px"}
            style={{ overflowY: "hidden" }}
            dataLength={data.docs.length}
            next={() => {
              dispatch(title === "Like" ?getLikes(user._id,data.nextPage) :getFollows(user._id,title.toLowerCase(),data.nextPage)).then(() => {
                // setloading(false);console.log("S")
              });
              // setloading(true);
            }}
            hasMore={data.hasNextPage}
            scrollableTarget={"scrollTarget"}
            >
            { data.docs.map((item)=>{
            return (<div className="flex flex-col mx-4 mt-2 space-y-1 mb-1" key={item._id}>
                <div className="flex space-x-3 items-center">
                <img src="/default.jpg" alt="" className="w-9 h-9 rounded-full"/>
              <div className="w-full mx-10 lg:mx-0 mt-1 lg:mt-0">
                <Link to={`/profile/${item.username}`} className="font-semibold">{item.username}</Link>
                <p className="text-sm text-slate-500">{item.name}</p>
              </div>
              {renderBtn(item)}
                </div>
            </div>)
            })}
            </InfiniteScroll>}
            { progress && <LoadingBar/>}
            </div>
        </div>
    </div>
  )
}

export default UserDialog