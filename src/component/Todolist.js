import React,{useState} from 'react'
import "./todolist.css"
const Todolist = (props) => {
  
  const {item,content,setContent}=props;
  
  console.log(content);
  const removeHandler=()=>{
    setContent(content.filter((inside)=>inside.id!==item.id));
   
  }
  return (
    <div className="todolist-container">
      <div className="todolist-date">{item.y}/{item.m}/{item.d}</div>
      <div className="todolist-input">{item.input}</div>
    <button className="todolist-button" onClick={removeHandler}>刪除</button>
    </div>
  )
}

export default Todolist