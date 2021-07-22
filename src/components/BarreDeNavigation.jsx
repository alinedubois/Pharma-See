import {AppBar, Badge, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography} from '@material-ui/core';
import './BarreDeNavigation.css';
import {BarreDeRecherche} from './BarreDeRecherche';
import {AccountCircle} from '@material-ui/icons';
import {useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));

export const BarreDeNavigation = ({rechargerLaPharmacie}) => {
    const { logout, loginWithRedirect, isAuthenticated, user } = useAuth0();

    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id="menuId"
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => {
                logout({ returnTo: window.location.origin });
                loginWithRedirect();
            }}>Se deconnecter</MenuItem>
        </Menu>
    );

    return (
        <AppBar position="sticky">
            <Toolbar>
                <img src="/logo.png" className="logo" alt="logo"/>
                <Typography variant="h6" className="titre">PharmaSee</Typography>
                <BarreDeRecherche
                    rechargerLaPharmacie={rechargerLaPharmacie}
                />
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    <IconButton
                        edge="end"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </div>
                {isAuthenticated && <Typography variant="body1" style={{marginLeft:"10px"}}>{user.name}</Typography>}
                {renderMenu}
            </Toolbar>
        </AppBar>
    )
}
