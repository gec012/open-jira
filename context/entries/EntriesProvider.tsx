import React, { FC, useReducer } from 'react'
import { EntriesContext } from './';
import { entriesReducer } from './';
import { Entry } from '@/interfaces';
import { v4 as uuidv4 } from 'uuid';


 export interface EntriesState {
  entries: Entry[];
 }

 


 const Entries_INITIAL_STATE:EntriesState ={
  entries: [
    {
      _id: uuidv4(),
      description:'Pendiente: kfokfokf oodmdfm didiodnd infinf1',
      status:'pending',
      createAt: Date.now()
    },
    {
      _id: uuidv4(),
      description:'En-progreso: kfokfokf oodmdfm didiodnd ihhhhh2',
      status:'in-progress',
      createAt: Date.now() - 1000000
    },
    {
      _id: uuidv4(),
      description:'Terminadas: kfokfokf oodmdfm didiodnd igggg3',
      status:'finished',
      createAt: Date.now() - 100000
    }
  ]
 }


 interface Props{
    
  children?: React.ReactNode | undefined;
}


export const EntriesProvider:FC<Props> = ({children}) => {

  const[state, dispatch]= useReducer(entriesReducer,Entries_INITIAL_STATE)

  const addNewEntry = ( description:string)=>{

    const newEntry:Entry = {
      _id: uuidv4(),
      description: description,
      createAt: Date.now(),
      status: 'pending'
    }

    dispatch({type:'[Entry] - Add-Entry',payload: newEntry})
  }


  const updateEntry = ( entry:Entry)=>{
      dispatch({type: '[Entry] - Entry-Updated', payload: entry})
  }


   return (
   <EntriesContext.Provider value={{ 
       ...state,
       //metodos
       addNewEntry,
       updateEntry
      }}>
        {children}
   </EntriesContext.Provider>
   )
 }