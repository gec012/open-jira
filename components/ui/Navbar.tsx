import { IconButton } from "@mui/material"
import { Toolbar } from "@mui/material"
import { AppBar, Link } from "@mui/material"
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Typography } from "@mui/material";
import { useContext } from 'react';
import { UIContext } from "@/context/ui";
import NextLink from "next/link";




export const Navbar = () => {


  const {openSideMenu} = useContext(UIContext)

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#4a148c" }} >
        <Toolbar>
            <IconButton
            size="large"
            edge="start"
            onClick={openSideMenu}
            >
                <MenuRoundedIcon/>
            </IconButton>
            <NextLink href="/" passHref legacyBehavior >
              <Link 
              underline="none"
              color='white'
              >
              <Typography variant="h6">OpenJira</Typography>
              </Link>
            
            </NextLink>
            
        </Toolbar>
    </AppBar>
  )
}


