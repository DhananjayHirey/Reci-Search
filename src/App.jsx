import { useEffect, useState } from 'react'
import './App.css'
import Cam from '../components/Cam'
import Text from '../components/Text'
import {run} from '../src/gemini-start';
import { ScrollArea } from "@/components/ui/scroll-area"


import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { color } from 'framer-motion';



function App() {
  const [searchDish, setSearchDish] = useState('');
  const [recipe,setRecipe] = useState('');
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
  setList((prevList)=>[...prevList,dish]);
  // var res = await run(dish);
  // res = await formatRecipe(res);
  // setLoading(false)
  // setRecipe(res);
 }
  return (
    <>
    <div className='flex flex-wrap items-center' >
    <div className='absolute left-0 w-50 h-80 flex flex-col' >
    
    {list.map((value,index)=>(
      <div className='text-white text-lg text-start ps-4 pt-2 pb-2  bg-zinc-800 font-bold hover:bg-zinc-700 cursor-pointer' >{value}</div>
    ))}
    </div>

    
    <div className='flex justify-start' >
      <HoverCard>
        <HoverCardTrigger style={{color:'white'}} >@eraisedx</HoverCardTrigger>
        <HoverCardContent className={'bg-zinc-900 text-zinc-100'} >
          Developed by Dhananjay Hirey.
        </HoverCardContent>
      </HoverCard>

    </div>
    <div className='flex flex-wrap justify-center  gap-8' >
      <Cam  setSearch={setSearch} />
      <Text searchDish={searchDish} setSearchDish={setSearchDish} text={recipe} loading={loading} />

    </div>
    </div>


    </>
  )
}

export default App
