import { useEffect, useState } from 'react'
import './App.css'
import Cam from '../components/Cam'
import Text from '../components/Text'
import {run} from '../src/gemini-start';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"



function App() {
  const [searchDish, setSearchDish] = useState('');
  const [recipe,setRecipe] = useState('');
  
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
  setSearchDish(dish);
  var res = await run(dish);
  res = await formatRecipe(res);
  setRecipe(res);
 }
  return (
    <>
    <div className='flex justify-start' >
      <HoverCard>
        <HoverCardTrigger style={{color:'white'}} >@eraisedx</HoverCardTrigger>
        <HoverCardContent className={'bg-zinc-900 text-zinc-100'} >
          Developed by Dhananjay Hirey.
        </HoverCardContent>
      </HoverCard>

    </div>
    <div className='flex flex-wrap gap-8' >
      <Cam  setSearch={setSearch} />
      <Text searchDish={searchDish} text={recipe} />

    </div>
    </>
  )
}

export default App
