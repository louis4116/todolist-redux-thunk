import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const localId=localStorage.getItem("localId")||"";
const token=localStorage.getItem("token")||"";
const loading=localStorage.getItem("token")!==null ? true:false;
const expiresin=localStorage.getItem("expiresin")||"";
const initialState =
    {
        loading:loading,
        token:token,
        localId:localId,
       expiresin:expiresin,
       loginError:"",
       signupError:"",
    };
export  const signupData=createAsyncThunk("auth/singup",async({email,password})=>{
    
   
        const signup= await fetch(process.env.REACT_APP_API_SIGNUP,{
        method:"POST",
        body:JSON.stringify({
            email:email,
            password:password,
            returnSecureToken: true
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
                returnSecureToken: true
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
            state.loading=true;
            state.token=login.idToken;
            state.localId=login.localId
            state.expiresin=login.expiresIn;
            localStorage.setItem("localId",login.localId);
            localStorage.setItem("token",login.idToken);
            localStorage.setItem("expiresin",login.expiresIn);
        },
        [loginData.rejected]:(state,action)=>{
            state.loginError=action.error.message;
            console.log(action.error);
        }
    }
})

export const authAction=authSlice.actions;


export default authSlice;