import React, { useState  } from "react";
import Webcam from "react-webcam";



const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 400,
  height: 400,
};

export const WebcamCapture = () => {

  const [image,setImage]=useState("");
  const webcamRef = React.useRef(null);

    
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc)
    });


  return (
    <div className="webcam-container">
      <div className="webcam-img">

        {image === "" ? <Webcam
          audio={false}
          height={350}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={400}
          videoConstraints={videoConstraints}
          className="rounded"
        /> : <img src={image} alt="img" className="rounded" style={{height:"350px" ,width:"350px"}}/>}
      </div>
      <div>
        {image !== "" ?
          <><button onClick={(e) => {
            e.preventDefault();
            setImage("");
          } }
          className="btn connectpad  mt-3 mx-3">
                      Retake Image</button>
          <button className="btn connectpad  mt-3"> Accept</button></>:
          <button onClick={(e) => {
            e.preventDefault();
            capture();
          }}
          className="btn connectpad type_pad mt-3">Capture</button>
          
        }
      </div>
    </div>
  );
};
export default WebcamComponent;
