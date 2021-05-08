import React, { useState } from "react"
//global

export const userContext = React.createContext({username:"oat",type:"admin"});
 


const store = ({children})=>{
  const [user,setUser] = useState({username:"",type:"",authstate:""});
  return (
       <userContext.Provider value={[user,setUser]}>
          {children}
       </userContext.Provider>
  )
}
export default store;