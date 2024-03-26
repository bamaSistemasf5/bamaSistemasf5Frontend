import React from "react";

const Loading = () => {
  return (
    <div
      style={{
       position: "absolute",
       top: "0",
        width: "100%",
        height: "100%", 
        zIndex: "1000",
        backgroundColor: "#C6C5C6"
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{ 
            display: "flex",
            marginLeft: "6%",
            backgroundColor: "#C6C5C6",
            width: "80%",
            height: "100%", 
           
           }}
      
      >
        <source src="./si.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
    </div>
  );
};

export default Loading;
