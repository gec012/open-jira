import { useContext } from "react"

import { List } from "@mui/material"
import { ListItemIcon } from "@mui/material"
import { ListItem } from "@mui/material"
import { Typography } from "@mui/material"
import { Box, Drawer } from "@mui/material"
import AllInboxIcon from '@mui/icons-material/AllInbox';
import EmailIcon from '@mui/icons-material/Email';
import { ListItemText } from "@mui/material"
import { Divider } from "@mui/material"
import { UIContext } from "@/context/ui"






const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar = () => {

    const { sidemenuOpen ,closeSideMenu} = useContext(UIContext)

  return (
 
      <Drawer
        anchor="left"
        open={sidemenuOpen}
        onClose={closeSideMenu}
      >

<Box sx={{ width: 250 }}>
<Box sx={{ padding: '5px 10px'}}>
            <Typography variant="h4">Menu</Typography>
        </Box>
        <List>
            {
                menuItems.map((text,index)=>(
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2? <AllInboxIcon/>:<EmailIcon/>}
                        </ListItemIcon>
                        <ListItemText primary={text} >

                        </ListItemText >
                    </ListItem>
                ))
            }
        </List>
        <Divider/>
        <List>
            {
                menuItems.map((text,index)=>(
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2? <AllInboxIcon/>:<EmailIcon/>}
                        </ListItemIcon>
                        <ListItemText primary={text} >

                        </ListItemText >
                    </ListItem>
                ))
            }
        </List>

</Box>

      
        
      </Drawer>
   
  )
}

