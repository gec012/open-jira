import { Layout } from "@/components/layouts"
import { capitalize, Card, CardContent, CardHeader, Grid, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Entry, EntryStatus } from "@/interfaces";
import { useState, ChangeEvent, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next'
;
import { dbEntries } from "@/database";
import { EntriesContext } from "@/context/entries";
import { dateFuncions } from "@/utils";
const validStatus: EntryStatus[]=['pending','in-progress','finished']


interface Props {
    entry:Entry
}



export const EntryPage:FC<Props> = ({entry}) => {

    const{updateEntry}=useContext(EntriesContext)

    const [inputValue,setInputValue] = useState(entry.description)
    const [status,setStatus] = useState<EntryStatus>(entry.status)
    const [touched,setTouched] = useState(false)

    const isNotValid = useMemo(()=>inputValue.length<=0 && touched,[inputValue,touched])

    const onTextFieldChanged =(event: ChangeEvent<HTMLInputElement>)=>{
        setInputValue(event.target.value)
    }

    const onStatusChanged =(event: ChangeEvent<HTMLInputElement>)=>{
       setStatus(event.target.value as EntryStatus)
       console.log(event.target.value)
    }

    
const onSave = ()=>{

    if(inputValue.trim().length === 0) return;

    const updatedEntry:Entry = {
        ...entry,
        status:status,
        description:inputValue
    }

   updateEntry(updatedEntry,true)
}

    return (
        <Layout title={inputValue.substring(0,20)+'...'}>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada:`}
                            subheader={`Creada ${dateFuncions.getFormattedDistanceToNow(entry.createdAt)}`}
                        />

                        <CardContent>
                            <TextField
                             error={isNotValid}
                             sx={{ marginTop: 2, marginBottom: 1 }}
                             fullWidth
                             placeholder="Nueva entrada"
                             autoFocus
                             multiline
                             label="Nueva entrada"
                             value={inputValue}
                             onChange={onTextFieldChanged}
                             helperText={isNotValid && 'Ingrese un valor'}
                             onBlur={()=> setTouched(true)
                             
                            }
                            />

                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                 row
                                 value={status}
                                 onChange={onStatusChanged}
                                >
                                    {
                                        validStatus.map((statu) =>(
                                            <FormControlLabel
                                              key={statu}
                                              value={statu}
                                              control={<Radio/>}
                                              label={capitalize(statu)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                            startIcon={<SaveAltIcon/>}
                            variant="contained"
                            fullWidth
                            onClick={onSave}
                            disabled={inputValue.length <=0}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>

                </Grid>

            </Grid>
            <IconButton sx={{ 
                position:'fixed',
                bottom:30,
                right:30,
                backgroundColor:'error.dark'
             }}
            >
             <DeleteForeverIcon/>

             </IconButton>
        </Layout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
 
    const {id} = params as {id:string}

   const entry = await dbEntries.getEntryById(id)
 console.log(entry)
     if (!entry){

        return {
            redirect:{
                destination:'/',
                permanent:false,
            }
        }
     }

    return {
        props: {
            entry
        }
    }
}


export default EntryPage
