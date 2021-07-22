import {Button, Card, CardActions, CardContent, IconButton, makeStyles, Typography} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const Medicament = ({id, nom, forme, administration, generique, surveillance_renforcee, quantite, enleverMedicament}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {forme}, {quantite} boîte(s)
        </Typography>
        <Typography variant="h5" component="h2">
          {nom}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Administration par {administration}
        </Typography>
        <Typography variant="body2" component="p">
          {generique === '1' && 'Médicament générique'}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => enleverMedicament(id)}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}
