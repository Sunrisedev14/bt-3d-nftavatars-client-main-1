import React,{useState,Suspense} from "react";
import { Avatar, Grid} from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import {WebcamCapture} from "./webcam";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useFBX } from "@react-three/drei";
import Female from "../../assets/Female.fbx"

const Scene = () => {
  const fbx = useFBX(Female);
  
  return <primitive object={fbx} scale={0.01} position={[0, 1, 0]} />;
};
function CreateAvatar () {
  const[show ,setShow]=useState(false);
  const[model1 ,setModel1] =useState(false)
  const[webcam ,setWebcam]=useState(false);

  const selectBody = (items) =>{
    console.log("items selected",items)
    setShow(true);
    setModel1(true)
  }
  const phototake =()=>{
    setWebcam(true) 
    setModel1(false)
  }


  return(
    <div>
      {show === false ?
        <Grid lg={12} xs={12} container justifyContent="center" alignItems="center" direction="column" sx={{ padding: "0% 8%" }}>
          <h2 className="text-light mt-5">Choose Your Body Type</h2>  
          <Grid lg={6} xs={6} container justifyContent="center " className="" alignItems="center">
            <ul className="list-unstyled ">
              <li>
                <button className="btn connectpad w-100 mt-4" onClick={()=>{selectBody("Masculine")}} >
            Masculine
                </button>
              </li>
              <li>
                <button className="btn connectpad type_pad mt-4" onClick={()=>{selectBody("Feminine")}}>
              Feminine
                </button>
              </li>
              <li>
                <button className="btn connectpad  mt-4 w-100" onClick={()=>{selectBody("Girl")}} >
              Girl
                </button>
              </li>
              <li>
                <button className="btn connectpad  mt-4 w-100" onClick={()=>{selectBody("Boy")}} >
              Boy
                </button>
              </li>
            </ul>  
          </Grid>         
        </Grid>:""}
      {model1 === true ? 
        <><Grid lg={12} xs={12}  container justifyContent="center" alignItems="center" direction="column" sx={{ padding: "0% 8%" }}>
          <button className="btn btn-danger rounded mt-5" onClick={() => {setShow(false); setWebcam(false) ;setModel1(false)}}  size={30}><BiArrowBack /> Back </button>
          <div className="border  border-success rounded text-center justify-content-center   p-3 mt-3" >
            <p className="text-light ">For best results take a selfie with a neutral </p>
            <p className="text-light "> face and good lighting.</p>
            <Avatar className=" mx-auto" sx={{ width: 100, height: 100 }}/>
            <button className="btn connectpad w-100 mt-3 " onClick={()=>phototake()} >
                  Take a photo!
            </button>
            <Canvas camera={{ position: [-0.5, 1, 2] }} style={{height:"500px"}} >
          <Suspense>
          <directionalLight position={[3.3, 1, 4.4]}   />
            <Scene />
            <Environment preset="sunset" background={false} />
            <OrbitControls target={[0, 1, 0]} />
          </Suspense>
        </Canvas>
            <label className="gray-text " style={{ margin: "0px", cursor: "pointer" }} htmlFor="upload-photo" >
              <p className="text-light mt-3">OR <span className=""><u> Pick a File</u></span></p>              
            </label>
            <input style={{ display: "none" }} id="upload-photo" type="file"  className=""/>
                  
          </div>
          <div className="pb-5"></div>
        </Grid></>
        :""}          
      {webcam=== true ?
        <><Grid lg={12} xs={12} container justifyContent="center" alignItems="center" direction="column" sx={{ padding: "0% 8%" }}>
          <button className="btn btn-danger rounded mt-5" onClick={() => { setShow(true); setWebcam(false); setModel1(true); } } size={30}><BiArrowBack /> Back </button>
          <div className=" rounded text-center justify-content-center py-3   mt-3">
            <WebcamCapture />
          </div>
        </Grid></>
        :""
      }


    </div>
  )

}
export default CreateAvatar;