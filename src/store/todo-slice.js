import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export  const todoInData=createAsyncThunk("todo/todoInNN",async({input,inputId,year,month,day,localId})=>{
    console.log(input,year,month,day,localId);
    const todoIn=await fetch(`${process.env.REACT_APP_TODO}${localId}.json`,{
        method:"POST",
        body:JSON.stringify({
            content:input,
            id:inputId,
            year:year,
            month:month,
            day:day,
        }),
        headers:{
            'Content-Type': 'application/json',
        }
    });
    const todoInResult= await todoIn.json();
    return todoInResult
});

export const fetchTodoData=createAsyncThunk("todo/fetchData",async({localId})=>{
    console.log(localId);
    const fetchTodo= await fetch(`${process.env.REACT_APP_TODO}${localId}.json`,{
        method:"GET"
    });
    const fetchResult= await fetchTodo.json();
    return fetchResult;
})

const todoSlice=createSlice({
    name:"todo",
    initialState:{
        fetchContent:[]
    },
    reducers:{

    },
    extraReducers:{
        [todoInData.fulfilled]:(state,action)=>{
           
            console.log(action.payload);
        },
        [fetchTodoData.fulfilled]:(state,action)=>{
            state.fetchContent=action.payload;
            console.log(state.fetchContent);
        }
    }
})

export const todoAction=todoSlice.actions;

export default todoSlice;