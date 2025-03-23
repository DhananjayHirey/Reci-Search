import React from 'react';
import Webcam from 'react-webcam';
import * as tmImage from '@teachablemachine/image';
import { useRef,useCallback } from 'react';
function Cam() {
  //   const videoConstraints = {
  // width: 1280,
  // height: 720,
  // facingMode: "user"
  // }

  // let model,maxPredictions;
  // async function init(){
  //   model = await tmImage.load(modelURL,metadataURL);
    
  //   maxPredictions = model.getTotalClasses();

  // }


  // const webcamRef = useRef(null);
  // let imageSrc;
  // const capture = React.useCallback(
  //   () => {
  //     imageSrc = webcamRef.current.getScreenshot();
  //     webcam = new tmImage.w
  //     console.log(imageSrc)
  //   },
  //   [webcamRef]
  // );
  const URL = "../my_model/";
  let webcam,model,maxPredictions,labelContainer;
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        
        const flip = true; 
        webcam = new tmImage.Webcam(300, 200, flip); // width, height, flip
        
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");

    }


    async function loop() {
        webcam.update(); // update the webcam frame
        // await predict();
        window.requestAnimationFrame(loop);
    }
  

  async function check(params) {
    const prediction = await model.predict(imageSrc);
    var maxi = '0.0';
        var maxDish = 'Model not trained for this dish';
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                if(prediction[i].probability.toFixed(2)>maxi){
                    maxi = prediction[i].probability.toFixed(2)
                    if(maxi>0.7){
                        maxDish = prediction[i].className;

                    }
                }
            }
        // labelContainer.innerHTML = "It is: "+ maxDish;
        Dish = maxDish;

  }
  // init();
  return (
    <>
    <div id='webcam-container' className=''>
      
    
    </div>
    <div><button onClick={init} >Check</button></div>
    </>
  
  )
}

export default Cam;
