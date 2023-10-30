
export const setHeaders = ()=>{
   
const headers ={
    headers:{
        "x-auth-token": localStorage.getItem("credentials")  
    }
};
return headers
};
 

