import { Box, Button, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save';

import AddBoxIcon from '@mui/icons-material/AddBox';
import { ChangeEvent, useState, useContext } from 'react';
import { EntriesContext } from "@/context/entries";
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

  

  const [inputValue,setInputValue] = useState('')
  const [touched,setTouched] = useState(false)

  const {addNewEntry} = useContext(EntriesContext)
  const  {isAddingEntry,setIsAddingEntry} = useContext(UIContext)

  const onTextFieldChanged = (event:ChangeEvent<HTMLInputElement>) =>{
    setInputValue(event.target.value)
  }

  const onSave =()=>{
    if( inputValue.length ===0) return;
   
    addNewEntry(inputValue)
    setIsAddingEntry(false)
    setTouched(false)
    setInputValue('')

    
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>

      {
        isAddingEntry ? (
          <>
            <TextField
              fullWidth
              sx={{ marginTop: 2, marginBottom: 1 }}
              placeholder="Nueva Entrada"
              autoFocus
              multiline
              label="Nueva entrada"
              helperText={inputValue.length <=0 && 'Ingrese un valor'}
              error ={ inputValue.length <=0 && touched}
              value={inputValue}
              onChange={onTextFieldChanged}
              onBlur={()=> setTouched(true)}


            />
            <Box display='flex' justifyContent={'space-between'}>
              <Button
                variant="text"
                onClick={()=>setIsAddingEntry(false)}

              >
                Cancelar
              </Button>
              <Button
                variant="outlined"
                color="primary"
                endIcon={<SaveIcon />}
                onClick={onSave}
              >
                Guardar
              </Button>

            </Box>
          </>
        )
          : (
            <Button
              startIcon={<AddBoxIcon />}
              fullWidth
              variant="outlined"
              sx={{ marginTop: 1 }}
              onClick={()=>setIsAddingEntry(true)}
            >
              Agregar Tarea

            </Button>
          )

      }




    </Box>
  )
}


