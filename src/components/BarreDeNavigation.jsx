import {AppBar, Toolbar, Typography} from '@material-ui/core';
import './BarreDeNavigation.css';


export const BarreDeNavigation = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <img src="/logo.png" className="logo" alt="logo" />
        <Typography variant="h6" className="titre">PharmaSee</Typography>
      </Toolbar>
    </AppBar>
  )
}
