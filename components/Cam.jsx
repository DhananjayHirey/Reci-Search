import React, { useEffect, useState } from 'react';
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




function Cam(props) {

  const [cur,setCur] = useState('1')
  const [title,setTitle] = useState('Webcam')
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
    useEffect(
      ()=>{
        if(cur=='1'){
          setTitle('Webcam')

          
        }
        else if(cur=='2'){
          setTitle('Gallery')
          if(document.getElementById("webcam-container").innerHTML!=""){
            webcamRef.current.stop();
            document.getElementById("webcam-container").innerHTML = "";
          }
        }
        else{
          setTitle('Search')
          if(document.getElementById("webcam-container").innerHTML!=""){
            webcamRef.current.stop();
            document.getElementById("webcam-container").innerHTML = "";
          }
        }
      }
      ,[cur])

    async function loop() {
        webcamRef.current.update(); // update the webcam frame
        // await predict();
        window.requestAnimationFrame(loop);
      }
      
      async function handleCur(a){
        // if(a!='1'&& webcamRef.current && webcamRef.current.stop){
        //   await webcamRef.current.stop();
          
        // }
        setCur(a);

    }

  const check2 = useCallback(async (e)=> {

    if(cur=='1'){

      if (!modelRef.current || !webcamRef.current) {
        console.error("Model or Webcam not initialized.");
        return;
      }
      // console.log('button clocked')
      const prediction = await modelRef.current.predict(webcamRef.current.canvas);
      let maxi = '0';
      let maxDish = 'Model not yet trained for the dish!';
      for (let i = 0; i < maxPredictionsRef.current; i++) {
        console.log(prediction[i].className, prediction[i].probability.toFixed(2), typeof(prediction[i].probability.toFixed(2)));
        if(prediction[i].probability.toFixed(2)>maxi){
          maxi = prediction[i].probability.toFixed(2)
          if(maxi>0.5){
            maxDish = prediction[i].className;
            
          }
        }
      }
      setDish(`${maxDish}!`)
      props.setSearch(maxDish);
    }
    else if(cur=='3'){
      console.log(document.getElementById('text-search').innerText);
      // props.setSearch(document.getElementById('text-search').innerHTML)
    }
      
  },[]);
  // init();
  return (
    <>

    <div className='flex flex-col justify-center items-center' >
    <div className='bg-zinc-950 pt-6 pb-2 rounded-3xl outline-2 outline-zinc-600' >
        <CardTitle className={'text-zinc-50 font-bold'} >{title}</CardTitle>
        <div className="flex justify-center gap-4 mt-2 mb-2">
          <div onClick={()=>handleCur('1')} className={cur==1?"cursor-pointer overflow-hidden p-0.5 bg-white w-8 h-8 rounded-full":"cursor-pointer overflow-hidden p-0.5 bg-zinc-900 w-8 h-8 rounded-full outline-2 outline-zinc-100 "}><img src={cur==1?camd:camw} className='' alt="" /></div>
          <div onClick={()=>handleCur('2')} className={cur==2?"cursor-pointer overflow-hidden p-0.5 bg-white w-8 h-8 rounded-full":"cursor-pointer overflow-hidden p-0.5 bg-zinc-900 w-8 h-8 rounded-full outline-2 outline-zinc-100 "}><img src={cur==2?loadd:loadw} className='' alt="" /></div>
          <div onClick={()=>handleCur('3')} className={cur==3?" cursor-pointer overflow-hidden p-0.5 bg-white w-8 h-8 rounded-full":"cursor-pointer overflow-hidden p-0.5 bg-zinc-900 w-8 h-8 rounded-full outline-2 outline-zinc-100 "}><img src={cur==3?textd:textw} className='' alt="" /></div>
          
        </div>
        <div className='flex flex-col items-center justify-center h-90 w-90 overflow-hidden' >

          <div id='webcam-container' className='bg-zinc-950 overflow-hidden rounded-2xl '>
          </div>
              <div className={`text-white ${cur==2?'':'hidden'}`} >Upload Pics from gallery</div>
              <div className={`text-white ${cur==3?'':'hidden'}`} >Search for a recipe...</div>
              <div className={`text-white ${cur==3?'':'hidden'}`} ><input type="text" id='text-search'  className='p-2 m-2 w-60 rounded-lg outline-2 outline-zinc-600 focus:outline-zinc-200  '/></div>
          <div className={`${cur!=1?'invisible':''}`} ><Button className={'cursor-pointer'} onClick={init} variant={'outline'} >Start cam</Button></div>
        </div>

    </div>

    <div id="label-container " className='text-white p-2 m-4 rounded-md outline-2 outline-zinc-600' >Your dish is :{dish}</div>
    <div className="flex justify-center gap-2">
      <div><Button onClick={check2} variant={'outline'} className={'cursor-pointer'} >Search</Button></div>
    </div>
    </div>
    </>
  
  )
}

export default Cam;
