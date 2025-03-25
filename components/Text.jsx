import React, { useEffect,useState } from 'react'


function Text(props) {

  return (
    <div className='text-white rounded-2xl h-160 w-200 outline-2 outline-zinc-600 p-4 overflow-y-scroll bg-zinc-950 hover:bg-zinc-900' >
      <p> {props.searchDish} </p>
      {/* <p dangerouslySetInnerHTML={{__html: props.text}} />
       */}
        <div >
            {props.text.split('\n').map((line,index)=>(
                <p className='text-start text-xl' key={index}>{line}</p>
            ))

            }
        </div>
    </div>
  )
}

export default Text
