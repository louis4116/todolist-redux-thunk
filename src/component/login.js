import React,{useRef} from 'react';
import { useDispatch } from 'react-redux';
import { loginData } from '../store/auth-slice';
import "./login.css";
const Login = (props) => {
  const dispatch=useDispatch();
  const loginEmailRef=useRef();
  const loginPasswordRef=useRef();
  const loginHanlder=(e)=>{
    e.preventDefault();
    const enteredLogin=loginEmailRef.current.value;
    const enteredPassword=loginPasswordRef.current.value;
    dispatch(loginData({email:enteredLogin,password:enteredPassword}));//把要登入的資訊傳入auth-slice
  };
  
  return (
    <div className='login'>
    <form className='login-form' onSubmit={loginHanlder}>
      <div className='login-container'>
        <div className='login-content'>
          <input type="email" id='account-1' className='login-content-input' placeholder="帳號"  ref={loginEmailRef} required/>
          <label htmlFor='account-1' className='login-content-label'>帳號</label>
        </div>
        <div className='login-content'>
          <input type="password" id='password-1' className='login-content-input' placeholder="密碼" ref={loginPasswordRef} required/>
          <label htmlFor='password-1' className='login-content-label'>密碼</label>
        </div>
        <button className='login-button'>登入</button>
      </div> 
    </form>
    <button className='link-button' onClick={()=>props.change("register")}>註冊帳號</button>
    </div>
  )
}

export default Login