import React, { useEffect,useState } from 'react'
import { motion } from 'framer-motion';
import Loader from './Loader';

function Text(props) {
  

  const [start,setStart] = useState(false)
  const animateTextTyping = (node) => {
  const text = props.text;
  const chars = text.split("");

  node.innerHTML = "";
  node.classList.add("typing");
  let i = 0;

  const addNextChar = (i) => {
    let nextChar = chars[i] === "\n" ? "<br>" : chars[i];
    node.innerHTML += "<span>" + nextChar + "</span>";
    if (i < chars.length - 1) {
      setTimeout(function () {
        addNextChar(i + 1);
      }, 20 + Math.random());
    } else {
      setTimeout(function () {
        node.classList.remove("typing");
      }, 20 + Math.random());
    }
  }

  addNextChar(i);
}



if(!start && props.text){
  setStart(true);
  animateTextTyping(document.getElementById('type'))

}


  
  

  return (
    <>
    <motion.div initial={{opacity:0, x:'-20%'}} animate={{opacity:1, x:'0%'}} transition={{duration:1}}>
    <div className='outline-2 outline-zinc-600 overflow-hidden rounded-2xl' >

    <div className='text-white rounded-2xl h-160 w-200  p-4 overflow-y-scroll bg-zinc-950 hover:bg-zinc-900' >
      <motion.div className={`${props.searchDish.length?'':'hidden'}`} initial={{opacity:0, y:'-200%'}} animate={{opacity:1, y:'0%'}} transition={{duration:0.5}} >
      <p className='mb-4' ><span className='font-bold text-xl p-8 pt-2 pb-2  outline-2 outline-gray-500 rounded-sm' > {props.searchDish}</span> </p></motion.div>
      {/* <p dangerouslySetInnerHTML={{__html: props.text}} />
       */}
        {/* <div >
            {props.text.split('\n').map((line,index)=>(
              <p className='text-start text-lg' key={index} >{line}</p>
              
            ))
          }
        </div> */}
        <p id='type' className='text-start'></p>
        <div className={`${props.loading==false?'hidden':''}`} >
          <Loader/>
          <Loader/>
          <Loader/>

        </div>
    </div>
    </div>
    </motion.div>
    </>
  )
}

export default Text
