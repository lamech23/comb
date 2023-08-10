import { createContext ,useEffect,useReducer} from "react";

export const HouseRegistrationAuthContext =createContext()

export const houseRegistrationReducer =(state , action)=>{
    switch(action.type){
        case 'LOGIN':
            return{houseRegistration:action.payload}
        case 'LOGOUT':
            return{houseRegistration : null}
        default :
            return state
    }

}

export const HouseRegistrationAuthContextProvider =({children})=>{
    const [state ,dispatch] =useReducer(houseRegistrationReducer,{
        // user :null basically means when a user opens a web he/she is not logged in
        houseRegistration:null
    })
    console.log('HouseRegistrationAuthContext ',state)
// to update the authcontext so ass to stay logged in
    useEffect(()=>{
        const houseRegistration =JSON.parse(localStorage.getItem('House'))
       
//this is to check if the user exist on the localstorage and update the authContext so as to maintain the loging so as to avoid logging out the credentials
        if(houseRegistration){
            dispatch({type:'LOGIN' , payload : houseRegistration})
        }
        

    },[])

    return(
    <HouseRegistrationAuthContext.Provider value={{...state ,dispatch}}>
        {children}

    </HouseRegistrationAuthContext.Provider>
    )
}
 

