import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { todoAction } from '../store/todo-slice';
import { deleteTodoData } from '../store/todo-slice';
import "./todolist.css"
const Todolist = (props) => {
  const {item,name,id}=props;
  const dispatch=useDispatch();
  const local=useSelector(state=>state.auth.localId);

  const removeHandler=()=>{
    dispatch(todoAction.filterTodo({name,id}));
    dispatch(deleteTodoData({localId:local,name:name,id:id}));
  }
  return (
    <div className="todolist-container">
      <div className="todolist-date">{item.year}/{item.month}/{item.day}</div>
      <div className="todolist-input">{item.content}</div>
    <button className="todolist-button" onClick={removeHandler}>刪除</button>
    </div>
  )
}

export default Todolist