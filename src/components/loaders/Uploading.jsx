import React from 'react'
import '../../assets/css/Uploading.css'
function Uploading({isUploading}) {
  return (
      <>
          

          {isUploading ? (
           <div className="fixed-top  w-auto vh-100 d-flex justify-content-center align-items-center bg-white  bg-opacity-75 z-10 custom-bg " >
       
       <span className="loader"></span>
       </div>
        
              
          ) : null}
          



          

      </> 
  )
}

export default Uploading
