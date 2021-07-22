import {AppBar, Toolbar, Typography} from '@material-ui/core';
import './BarreDeNavigation.css';
import {BarreDeRecherche} from './BarreDeRecherche';


export const BarreDeNavigation = ({rechargerLaPharmacie}) => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <img src="/logo.png" className="logo" alt="logo"/>
                <Typography variant="h6" className="titre">PharmaSee</Typography>
                <BarreDeRecherche
                    rechargerLaPharmacie={rechargerLaPharmacie}
                />

            </Toolbar>
        </AppBar>
    )
}
