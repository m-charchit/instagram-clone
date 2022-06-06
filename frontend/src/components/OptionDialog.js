import React from 'react'

function OptionDialog(props) {
    // const {hideElem,}
    const {buttonData,hideElem,title} = props

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-30 backdrop-brightness-50' style={{"margin":"0px"}}>
      <div className="bg-white border rounded-xl w-96 overflow-auto backdrop-opacity-100 animate-showModal mx-1">
        {title && <div className="text-center p-6 border-b">{title}</div>}
        <div className="flex flex-col center-text">
        {buttonData.map((item,index)=>{
            return(
              
            item.color  ? 
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