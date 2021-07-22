import {Search} from '@material-ui/icons';
import {alpha, Button, CircularProgress, createStyles, makeStyles, TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import {useState} from 'react';
import './BarreDeRecherche.css';
import {useAuth0} from '@auth0/auth0-react';

const useStyles = makeStyles(theme =>
    createStyles({
        inputAutoComplete: {
            // color: 'white !important',
            padding: theme.spacing(1, 1, 1, 0) + ' !important',
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px) !important`,
            paddingTop: '10px !important',
            transition: theme.transitions.create('width'),
            width: '80% !important',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '30ch',
            },
        },
    }),
);

export const BarreDeRecherche = ({rechargerLaPharmacie}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const {isAuthenticated, user} = useAuth0();


    const ajouterMedicament = async (medicamentId) => {
        if (isAuthenticated) {
            await fetch('http://localhost:3000/api/medicaments/' + user.name, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: '{"id":' + medicamentId + '}'
            });
            await rechargerLaPharmacie();
        }
    };

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <Search/>
            </div>
            <Autocomplete
                id="recherche"
                style={{width: 550}}
                getOptionLabel={(option) => option.nom}
                options={options}
                open={options?.length > 0 ? open : false}
                onClose={() => {
                    setOpen(false);
                    setOptions([]);
                }}
                onOpen={() => setOpen(true)}
                clearText="Effacer"
                renderOption={(option) => (
                    <div className="container">
                        <div>{option.nom}</div>
                        <div style={{flexGrow: 1}}></div>
                        <Button variant="contained" color="primary" onClick={(event) => {
                            event.stopPropagation();
                            ajouterMedicament(option.id);
                        }}>Ajouter</Button>
                    </div>
                )}
                loading={loading}
                fullWidth
                renderInput={(params) => (
                    <TextField
                        {...params} placeholder="Ajouter un médicament..."
                        classes={{
                            root: classes.inputAutoComplete,
                        }}
                        onChange={(evenement) => {
                            const motCle = evenement.target.value;
                            if (motCle.length >= 3) {
                                setOptions([]);
                                setOpen(false);
                                setLoading(true);
                                fetch('http://localhost:3000/api/referentiel?nom=' + motCle)
                                    .then(resultat => resultat.json())
                                    .then(medicaments => {
                                        setOpen(true);
                                        setLoading(false);
                                        setOptions(medicaments);
                                    });
                            }
                        }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="secondary" size={20}/> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />

                )}
            />
        </div>
    );
};
