import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const localId=localStorage.getItem("localId")||"";//辨識登入帳號

const loading=localStorage.getItem("localId")!==null ? true:false;


const initialState =
    {
        loading:loading,//儲存登入狀態
        localId:localId,//辨識特定帳戶
       loginError:"",//登入錯誤訊息
       signupError:"",//註冊錯誤訊息
    };
export  const signupData=createAsyncThunk("auth/singup",async({email,password})=>{
    
   
        const signup= await fetch(process.env.REACT_APP_API_SIGNUP,{
        method:"POST",
        body:JSON.stringify({
            email:email,
            password:password,
            returnSecureToken: true//返回令牌並須為true
        }),
        headers: {
          'Content-Type': 'application/json',
        },
    });
    console.log(signup);
    const signupResult = await signup.json();
    if(signup.ok){
        return signupResult
    }else{
        throw Error(`status code ${signup.status}`)
      }
   

})

export const loginData=createAsyncThunk("auth/login",async({email,password})=>{
   
        const login=await fetch(process.env.REACT_APP_API_LOGIN,{
            method:"POST",
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken: true//返回令牌並須為true
            }),
            headers:{
                "Content-Type":"application/json",
            }
        });
        
        const loginResult=await login.json();
        
       if(login.ok){
        return loginResult;
       }else{
         throw Error(`status code ${login.status}`)
       }
       
   
})

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
      
        removeToken(state,action){
            localStorage.removeItem("token");
            localStorage.removeItem("expiresin");
            localStorage.removeItem("localId");
            state.loading=false;
           
        }
    },
    extraReducers:{
        [signupData.pending]:(state,action)=>{
            console.log(action.payload);
        },
        [signupData.fulfilled]:(state,action)=>{
           
            console.log(action.payload);
        },
        [signupData.rejected]:(state,action)=>{
            state.signupError=action.error.message;
            console.log(action.payload);
        },
        [loginData.pending]:(state,action)=>{
            console.log(action);
        },
        [loginData.fulfilled]:(state,action)=>{
            const login=action.payload
            console.log(action.payload);
            state.loading=true;//儲存到initialState
            state.localId=login.localId//儲存到initialState
            localStorage.setItem("localId",login.localId);
        },
        [loginData.rejected]:(state,action)=>{
            state.loginError=action.error.message;
            console.log(action.error);
        }
    }
})

export const authAction=authSlice.actions;


export default authSlice;