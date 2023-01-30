import { useState, useEffect } from 'react';
import {  useSelector , useDispatch } from 'react-redux';
import Login from './component/login';
import Signup from './component/signup';
import Todo from './component/Todo';
import './App.css';
import { authAction } from './store/auth-slice';

function App() {
  const [change,setChange]=useState("login");
  const dispatch=useDispatch();
  const loading=useSelector((state)=> state.auth.loading);
  const time=useSelector((state)=>state.auth.expiresin);
  const logoutHandler=()=>{
    dispatch(authAction.removeToken());
    setChange("login")
  };
  const changeForm=(nowState)=>{
    setChange(nowState)
  }
 const test=()=>{
  if(!loading&&change==="login"){
    return <Login change={changeForm}/>
  }else if(change==="register"){
     return <Signup change={changeForm}/>
  };
 }
      // useEffect(()=>{
      // let logoutTimer;
      // if(loading){
      // const logoutTime =new Date(time).getTime()- new Date().getTime();
      //   logoutTimer=setTimeout(()=>{
      //     dispatch(authAction.removeToken());
      //   },logoutTime)
      //   }
      //   return ()=>{
      //     clearTimeout(logoutTimer);
      //   };
      // },[loading,time,dispatch])
  
  return (
    <div className="app">
      {test()}
     
      {loading&& <Todo logout={logoutHandler}/>}
      </div>
  );
}

export default App;

