import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState ={fetchContent:[]}
export  const todoInData=createAsyncThunk("todo/todoInNN",async({content,id,year,month,day,localId})=>{
    //送入特定帳號的資料庫檔案
    const todoIn=await fetch(`${process.env.REACT_APP_API_TODO}${localId}.json`,{
        method:"POST",
        body:JSON.stringify({
            content:content,
            id:id,
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
    
  //取得特定帳號的todo資料庫檔案
    const fetchTodo= await fetch(`${process.env.REACT_APP_API_TODO}/${localId}.json`,{
        method:"GET"
    });
    const fetchTemp= await fetchTodo.json();
   
    console.log(fetchTemp)
      const fetchKey=Object.keys(fetchTemp);//抓出key
    const fetchResult=Object.values(fetchTemp);//抓出值
        let result=[];
        let temp=[]
        for(let i=0;i<fetchResult.length;i++){
          fetchResult[i].name=fetchKey[i]//在object設定name然後將key放入，因為firebase會生產特定的name
           temp=fetchResult[i]
           result.push(temp);
           temp=[]; 
        }
        return result;
    
    

});

export const deleteTodoData=createAsyncThunk("todo/deleteDara",async({localId,name})=>{
    //刪除資料庫檔案
    const fetchTodo= await fetch(`${process.env.REACT_APP_API_TODO}${localId}/${name}.json`,{
        method:"DELETE",
        headers:{
            'Content-Type': 'application/json',
        }
    });
    const deleteFinished= await fetchTodo.json();
    return deleteFinished;
})
const todoSlice=createSlice({
    name:"todo",
    initialState,
    reducers:{
        storeTodo:(state,action)=>{
            const oldItem=action.payload;
            console.log(oldItem)
                state.fetchContent.push({
                    content:oldItem.content,
                    id:oldItem.id,
                    year:oldItem.year,
                    month:oldItem.month,
                    day:oldItem.day,
                }) 
        },
        filterTodo:(state,action)=>{
            const oldItem=action.payload;//先find再filter
           if(state.fetchContent.length===0){
             state.fetchContent=[]
           }
           console.log(oldItem)
           if(oldItem.name===undefined){
            const existingItem=state.fetchContent.find(item=>item.id===oldItem.id);
            state.fetchContent=state.fetchContent.filter(item=>item.id!==existingItem.id);//沒name在這邊處理，但是會有問題，就是無法及時刪掉資料庫的檔案，需要再重新整理一次
           }else{
            const existingItem=state.fetchContent.find(item=>item.name===oldItem.name);
            state.fetchContent=state.fetchContent.filter(item=>item.name!==existingItem.name);
           }
        },
        removeTodo:(state,action)=>{
            return initialState
        }
    },
    extraReducers:{
        [todoInData.fulfilled]:(state,action)=>{
           
            console.log(action.payload);
        },
        [fetchTodoData.pending]:(state,action)=>{
            state.fetchContent=[]
        },
        [fetchTodoData.fulfilled]:(state,action)=>{
            const oldItem=action.payload; 
            console.log( oldItem)
            
            if(state.fetchContent===undefined){
                //因為如果是空的話，會回傳undefined
               return initialState //回傳一個空陣列
            }else if(state.fetchContent.length===0){

                state.fetchContent=oldItem
            }else{    
                let temp=[];
                temp.push(oldItem);
                console.log(temp);
                state.fetchContent.concat(temp);
             }
        },
        [fetchTodoData.rejected]:(state,action)=>{
            return initialState
        },
        [deleteTodoData.fulfilled]:(state,action)=>{
            console.log(action.payload);
        }
    }
})

export const todoAction=todoSlice.actions;

export default todoSlice;