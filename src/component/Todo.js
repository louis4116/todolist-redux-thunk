import React,{Fragment,useState,useEffect,useCallback} from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { todoInData } from '../store/todo-slice';
import { fetchTodoData } from '../store/todo-slice';
import { v4 as uuidv4 } from 'uuid';
import Todolist from './Todolist';
import "./todo.css";
const Todo = (props) => {
  const [content,setContent]=useState([]);
  const [input,setInput]=useState("");
  const dispatch=useDispatch();
  const fetchData=useSelector(state=>state.todo.fetchContent);
  const local=useSelector(state=>state.auth.localId);
 
 const submitHandler=useCallback((e)=>{
  e.preventDefault();
  if(input.length===0){
    return;
  }else if(input.length>=30){
    return alert("請將字數限制在30字以內!!")
  }
  const temp=new Date();
  const y=temp.getFullYear();
  const m=temp.getMonth()+1;
  const d=temp.getDate();
  const id=uuidv4();
  
  setContent([...content,{input,id,y,m,d}]);
  dispatch(todoInData({input:input,year:y,month:m,day:d,inputId:id,localId:local}));
  setInput("");
 
 },[content,dispatch,input,local]);
 const inputHandler=(e)=>{
  setInput(e.target.value);
 };



useEffect(()=>{
  dispatch(fetchTodoData({localId:local}));
 let temp=Object.values(fetchData);
 console.log(temp)
},[dispatch])

  return (
    <Fragment>
     
      <div className='todo'>
      <header className='header'>
        <h1>待辦事項</h1>
      </header>
        <div className='todo-container'>
      <form className='todo-form' onSubmit={submitHandler}>
      <label className="todo-content-label" htmlFor="todolist">事項</label>
      <input className="todo-content-input" type="text" id="todolist" placeholder='AddTodo' onChange={inputHandler} value={input}/>
      <button className="todo-button">添加</button>
      </form>
      <button className="todo-delete-button" onClick={props.logout}>登出</button>
      </div>
      <div className='test'>
      {content.map((item)=>(
      <Todolist 
      key={item.id}  
      id={item.id}
      item={item} 
      content={content} 
      setContent={setContent}/>))}</div>
      </div>
     
      
      
      </Fragment>
  )
}

export default Todo