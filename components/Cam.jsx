import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import {CardTitle } from '@/components/ui/card';
import * as tmImage from '@teachablemachine/image';
import { useRef,useCallback } from 'react';
import camd from '../src/assets/cam-d.png'
import camw from '../src/assets/cam-w.png'
import loadd from '../src/assets/load-d.png'
import loadw from '../src/assets/load-w.png'
import textw from '../src/assets/text-w.png'
import textd from '../src/assets/text-d.png'




function Cam() {

  const [cur,setCur] = useState(1)

  const [dish, setDish] = useState('')
  const webcamRef = useRef(null)
  const modelRef = useRef(null)
  const maxPredictionsRef = useRef(null);
  const URL = "../my_model/";
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";


        modelRef.current = await tmImage.load(modelURL, metadataURL);
        maxPredictionsRef.current = modelRef.current.getTotalClasses();
        
        const flip = true; 
        webcamRef.current = new tmImage.Webcam(400, 400, flip); // width, height, flip
        
        await webcamRef.current.setup(); // request access to the webcam
        await webcamRef.current.play();
        window.requestAnimationFrame(loop);
        document.getElementById("webcam-container").appendChild(webcamRef.current.canvas);
        // labelContainer = document.getElementById("label-container");

    }


    async function loop() {
        webcamRef.current.update(); // update the webcam frame
        // await predict();
        window.requestAnimationFrame(loop);
    }
  

  async function check2(params) {
    if (!modelRef.current || !webcamRef.current) {
      console.error("Model or Webcam not initialized.");
      return;
    }
    console.log('button clocked')
    const prediction = await modelRef.current.predict(webcamRef.current.canvas);
        let maxi = 0;
        let maxDish = 'Model not yet trained for the dish!';
        for (let i = 0; i < maxPredictionsRef.current; i++) {
            console.log(prediction[i].className, prediction[i].probability.toFixed(2));
                if(prediction[i].probability.toFixed(2)>maxi){
                    maxi = prediction[i].probability.toFixed(2)
                    if(maxi>0.5){
                        maxDish = prediction[i].className;

                    }
                }
            }
        setDish(`${maxDish}!`)

  }
  // init();
  return (
    <>


    <div className='bg-zinc-950 pt-6 pb-2 rounded-3xl outline-1 outline-zinc-600' >
        <CardTitle className={'text-zinc-50 font-bold'} >Webcam</CardTitle>
        <div className="flex justify-center gap-4 mt-2 mb-2">
          <div className={cur==1?"overflow-hidden p-0.5 bg-white w-8 h-8 rounded-full":"overflow-hidden p-0.5 bg-zinc-900 w-8 h-8 rounded-full"}><img src={cur==1?camd:camw} className='' alt="" /></div>
          <div className={cur==2?"overflow-hidden p-0.5 bg-white w-8 h-8 rounded-full":" overflow-hidden p-0.5 bg-zinc-900 w-8 h-8 rounded-full"}><img src={cur==2?loadd:loadw} className='' alt="" /></div>
          <div className={cur==3?"overflow-hidden p-0.5 bg-white w-8 h-8 rounded-full":"overflow-hidden p-0.5 bg-zinc-900 w-8 h-8 rounded-full"}><img src={cur==3?textd:textw} className='' alt="" /></div>
          
        </div>
        <div id='webcam-container' className='bg-zinc-950 overflow-hidden rounded-2xl h-90 w-90'></div>
      <div ><Button onClick={init} variant={'outline'} >Start cam</Button></div>

    </div>

    <div id="label-container " className='text-white p-2 m-4 rounded-md outline-2 outline-zinc-600' >Your dish is :{dish}</div>
    <div className="flex justify-center gap-2">
      <div><Button onClick={check2} variant={'outline'} >Predict</Button></div>
    </div>
    
    </>
  
  )
}

export default Cam;
