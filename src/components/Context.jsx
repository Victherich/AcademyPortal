import React from 'react'
import { createContext } from 'react'
import { useState } from 'react';

export const Context = createContext();

const ContextProvider = ({children}) => {

    const state = false;
    const stateStudent = false;
    const stateTeacher = false;
    const hour = "8:06am"
    const managmentSignupUrl = "https://ephadacademyportal.com.ng/ephad_api/management_signup.php"
    const managementLoginUrl = "https://ephadacademyportal.com.ng/ephad_api/management_login.php"
    const managementInfoUrl= "https://ephadacademyportal.com.ng/ephad_api/get_management_user.php?id="
    const mainDomain = "https://ephadacademyportal.com.ng/"




    

  return (
    <Context.Provider value={{state,stateStudent,stateTeacher,managmentSignupUrl,managementLoginUrl,
    managementInfoUrl,mainDomain}}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider


// database 
// User “hotsalesng_ephad” was added to the database “hotsalesng_ephad”.
//pw: ephad123ephad


// database main
// User “ephadacademyport_ephad” was added to the database “ephadacademyport_ephad”.
//pw: ephad123ephad


// https://chatgpt.com/c/6750a656-4964-8003-9c81-05792011e2ca