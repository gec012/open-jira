import React, { FC, useEffect, useReducer } from 'react'
import { EntriesContext } from './';
import { entriesReducer } from './';
import { Entry } from '@/interfaces';
import { useSnackbar } from 'notistack';

import { entriesApi } from '@/apis';


export interface EntriesState {
  entries: Entry[];
}




const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}


interface Props {

  children?: React.ReactNode | undefined;
}


export const EntriesProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
  const { enqueueSnackbar} =useSnackbar()

  const addNewEntry = async (description: string) => {

    const { data } = await entriesApi.post<Entry>('/entries', { description: description })

    dispatch({ type: '[Entry] - Add-Entry', payload: data })
  }


  const updateEntry = async({_id,description,status}: Entry,showSnackbar=false) => {

    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description: description,status: status })
      dispatch({ type: '[Entry] - Entry-Updated', payload: data })
      //Todo :mostrat notificacion snackbar

      if(showSnackbar)
      enqueueSnackbar('Entrada Actualizada',{
        variant:'success',
        autoHideDuration:1500,
        anchorOrigin:{
          vertical:'top',
          horizontal:'right'
        }
      })


    } catch (error) {
        console.log({error})
    }


  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: '[Entry] - Refresh-Data', payload: data })

  }

  useEffect(() => {
    refreshEntries()
  }, [])


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