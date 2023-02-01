import React,{Fragment,useState,useEffect} from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { todoAction, todoInData } from '../store/todo-slice';
import { fetchTodoData } from '../store/todo-slice';
import { v4 as uuidv4 } from 'uuid';
import Todolist from './Todolist';
import "./todo.css";
const Todo = (props) => {
 
  const [input,setInput]=useState("");
  const dispatch=useDispatch();
  const fetchData=useSelector(state=>state.todo.fetchContent);
  const local=useSelector(state=>state.auth.localId);
  
 const submitHandler=(e)=>{
  e.preventDefault();
  if(input.length===0){
    return;
  }else if(input.length>=30){
    return alert("請將字數限制在30字以內!!")
  }
 
  const temp=new Date();
  const year=temp.getFullYear();
  const month=temp.getMonth()+1;
  const day=temp.getDate();
  const id=uuidv4();
  dispatch(todoAction.storeTodo({
    content:input,id,year,month,day 
  }));//儲存todo

  dispatch(todoInData({content:input,year:year,month:month,day:day,id:id,localId:local}));//儲存todo到資料庫
  
  setInput("");
 
 };
 const inputHandler=(e)=>{
  setInput(e.target.value);
 };

useEffect(()=>{
  dispatch(fetchTodoData({localId:local}));//送入特定帳號id
  
},[dispatch]);


  return (
    <Fragment>
     
      <div className='todo'>
      <header className='header'>
        <h1>待辦事項</h1>
      </header>
        <div className='todo-container'>
      <form className='todo-form' onSubmit={submitHandler}>
      <label className="todo-content-label" htmlFor="todolist">事項</label>
      <input className="todo-content-input" type="text" id="todolist" placeholder='AddTodo' onChange={inputHandler} value={input}  />
      <button className="todo-button">添加</button>
      </form>
      <button className="todo-delete-button" onClick={props.logout}>登出</button>
      </div>
      <div className='test'>
      { fetchData.map((item)=>(
    <Todolist 
    key={item.id}  
    id={item.id}
    item={item} 
    name={item.name}
    content={item.content} 
    />))}
      </div>
      </div>
     
      
      
      </Fragment>
  )
}

export default Todo