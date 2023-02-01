import React,{useRef,Fragment} from 'react'
import { signupData } from '../store/auth-slice'
import { useDispatch } from 'react-redux'
import "./login.css";
const Signup = (props) => {
    const accountRef=useRef();
    const passwordRef=useRef();
    const dispatch=useDispatch();
    const submitHanlder=(e)=>{
        e.preventDefault();
        const enteredAccount =accountRef.current.value;
        const enteredPassword = passwordRef.current.value;
        dispatch( signupData({email:enteredAccount,password:enteredPassword}));//把創建好的帳號和密碼傳入至auth-slice
        props.change("login")
      }
  return (
    <Fragment>
    <form className='login' onSubmit={submitHanlder}>
      <div className='login-container'>
      <div className='login-content'>
        <input type="email" id='account-3' className='login-content-input' placeholder="帳號"  ref={accountRef} required/>
        <label htmlFor='account-3' className='login-content-label' >帳號</label>
      </div>
      <div className='login-content'>
        <input type="password" id='password-3'  className='login-content-input' placeholder="密碼" ref={passwordRef} required/>
        <label htmlFor='password-3' className='login-content-label'>密碼</label>
      </div>
        <button className='login-button' >註冊</button>
      </div>
    </form>
     <button className='link-button' onClick={()=>props.change("login")}>已有帳號，轉至登入</button>
     </Fragment>
  )
}

export default Signup