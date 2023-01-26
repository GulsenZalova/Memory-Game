import React, { useState,useEffect } from 'react'
const TILE_COLORS = ["red", "green", "blue", "yellow","Red", "Green", "Blue", "Yellow"];
function Memory() {
  const [colors,setColors]=useState([])
  const [selectColor,setSelectColor]=useState([])
  const [trueSelect,setTrueSelect]=useState([])
  const [count,setCount]=useState(0)

  useEffect(()=>{
    setColors(shuffle(TILE_COLORS))
  },[])

  const handleClick=(color)=>{
    setSelectColor([...selectColor,color])
    setCount(count=>count+1)

    if(count===1){
     
      if(selectColor[0]?.toLowerCase()==color.toLowerCase()){
        console.log(selectColor[0])
        setTrueSelect([...trueSelect,selectColor[0] ,color])
      }
      setTimeout(()=>{
          setSelectColor([])
          setCount(0)
      },[1000])
    }
  }
  return (
    <>
      <h1> {trueSelect.length === TILE_COLORS.length? "You Win" : "Memory"}</h1>
      <div className="board">
    {
      colors && (
        colors.map(((color,i)=>(
          <div key={i} style={{backgroundColor:selectColor.includes(color) ? color : trueSelect.includes(color) ? color :"white"}} onClick={()=>handleClick(color)}
          className={`tile ${
            selectColor.includes(color)
              ? color
              : trueSelect.includes(color)
              ? color
              : ""
          }`}
          ></div>
        )))
      )
    }

       
      </div>
      {
      trueSelect.length === TILE_COLORS.length && (
        <button onClick={()=>{
          setTrueSelect([])
          setColors(shuffle(TILE_COLORS))
        }}>
          Restart
        </button>
      )
    }
    </>
  )
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
  
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  }
export default Memory
