import { UIState } from './UIProvider';

type UIActionType =
 |{type: 'UI - Open Sidebar'}
 |{type: 'UI - Close Sidebar'}   
 |{type: 'Ui - Set isAddingEntry',payload: boolean}  
 |{type: 'Ui - Start Dragging'} 
 |{type: 'Ui - End Dragging'} 


export const uiReducer = (state:UIState, action:UIActionType): UIState =>{

 switch(action.type){
    case 'UI - Open Sidebar':
            return{
                ...state,
                sidemenuOpen:true,
            }
        
    case 'UI - Close Sidebar':
            return{
                ...state,
                sidemenuOpen:false,
            }
    case 'Ui - Set isAddingEntry':
        return{
            ...state,
            isAddingEntry:action.payload
        }
    case 'Ui - Start Dragging':
    return{
        ...state,
        isDragging:true
    }
    case 'Ui - End Dragging':
        return{
            ...state,
            isDragging:false
        }            
            
    default:
        return state;    
 }

    

}