import { useEffect, useState } from 'react'
import './App.css'
import Cam from '../components/Cam'
import Text from '../components/Text'
import {run} from '../src/gemini-start';
import ghb from './assets/github.png'
import x from './assets/x.png'
import lkn from './assets/linkedin.png'


import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { motion } from 'framer-motion';



function App() {
  const [searchDish, setSearchDish] = useState('');
  const [recipe,setRecipe] = useState('Hello!');
  const [loading,setLoading] = useState(false);
  const [list,setList] = useState([])

  function formatRecipe(text) {
    return text
        .replace(/\*\*/g, '')                       
        .replace(/\*\s/g, '')                       
        // .replace(/(?<=\d\.)/g, '\n')                
        .replace(/(?<=\bIngredients:|Instructions:)/g, '\n') 
        .replace(/(?=\*\s)/g, '\n')              
        .trim();  
}
async function setSearch(dish){
  setLoading(true)
  setSearchDish(dish);
  document.getElementById('type').innerHTML="";
  var res = await run(dish);
  res = await formatRecipe(res);
  setList((prevList)=>[...prevList,dish]);
  setLoading(false)
  setRecipe(res);
 }
  return (
    <>
    <div className='flex flex-wrap items-center' >
    <div className={`absolute left-0 w-50 h-80 flex flex-col ${list.length>8?'overflow-y-scroll':''}`} >
    <p className='text-lg text-white text-start ps-4 mb-2 font-bold' >You looked for...</p>
    {list.map((value,index)=>(
      <motion.div initial={{opacity:0, y:'-20%'}} animate={{opacity:1, y:'0%'}} transition={{duration:1}} >
      <div key={index} className='text-white text-lg text-start ps-4 pt-2 pb-2 bg-zinc-800 font-bold hover:bg-zinc-700 cursor-pointer' >{value}</div></motion.div>
    ))}
    </div>

    
      
    <div className='flex flex-col items-start ' >
    <div className=' text-white text-4xl' >Reci-Search</div>
      <HoverCard>
        <HoverCardTrigger style={{color:'white', cursor:'pointer' }} >@eraisedx</HoverCardTrigger>
        <HoverCardContent className={'bg-zinc-600 text-zinc-100'} >
          Developed by Dhananjay Hirey.
          <div className="flex justify-end">
            <img src={lkn} className='h-8 cursor-pointer' alt="" />
            <img src={x} className='h-8 cursor-pointer' alt="" />
            <img src={ghb} className='h-8 cursor-pointer' alt="" />
          </div>
        </HoverCardContent>
      </HoverCard>

    </div>
    <div className='flex flex-wrap justify-center items-center  gap-8' >
      <Cam  setSearch={setSearch} />
      <Text searchDish={searchDish} setSearchDish={setSearchDish} text={recipe} setRecipe={setRecipe} loading={loading} />

    </div>
    </div>


    </>
  )
}

export default App
