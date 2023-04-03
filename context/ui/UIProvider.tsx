import React, { FC, useReducer } from 'react'
import { UIContext } from './UIContext';
import { uiReducer } from './uiReducer';


 export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
 }

 const UI_INITIAL_STATE:UIState ={
    sidemenuOpen: false,
    isAddingEntry: false
 }

 interface Props{
    
    children?: React.ReactNode | undefined;
}

 
 export const UIProvider:FC<Props> = ({children}) => {

    const[state, dispatch]= useReducer(uiReducer,UI_INITIAL_STATE)

    const openSideMenu = () =>{
      dispatch({type: 'UI - Open Sidebar'});
    }
    const closeSideMenu = () =>{
      dispatch({type: 'UI - Close Sidebar'});
    }

    const setIsAddingEntry = (isAdding:boolean) => {
      dispatch({type: 'Ui - Set isAddingEntry',payload: isAdding});
    }


   return (
        <UIContext.Provider value={{ 
            ...state,
            //metodos o funciones
            openSideMenu,
            closeSideMenu,
            setIsAddingEntry
         }}>
            {children}
        </UIContext.Provider>
   )
 }
 

 