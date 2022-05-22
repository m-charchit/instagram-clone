import React from 'react'

function OptionDialog(props) {
    // const {hideElem,}
    // const buttonData = [{msg:"Delete",color:"red",fun:()=>{console.log("hi")}}]
    const {buttonData,hideElem} = props
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-30 backdrop-brightness-50'>
    {/* { progress && <LoadingBar/>} */}
      <div className="bg-white border rounded-xl w-96 overflow-auto  animate-showModal mx-1">
        <div className="flex flex-col center-text">
        {buttonData.map((item,index)=>{
            return(
              
            item.color === "red" ? 
            <button className="text-red-500 border-b py-3 font-bold active:bg-gray-200" key={index} onClick={item.fun}>{item.msg}</button> : 
            <button className='border-b py-3 active:bg-gray-200' key={index} onClick={item.fun}>{item.msg}</button>
            )
        })}
            <button className='border-b py-3 active:bg-gray-200' onClick={()=>hideElem(false)}>Cancel</button>
        </div>
      </div>
  </div>
  )
}

export default OptionDialog