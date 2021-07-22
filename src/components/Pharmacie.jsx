import {Box, Container, Typography} from '@material-ui/core';
import {useEffect, useState} from 'react';
import {Medicament} from './Medicament';

export const Pharmacie = ({medicaments, enleverMedicament}) => {

  return <>
    <Container maxWidth="lg">
      <Typography variant="h1">Ma pharmacie</Typography>
      <Box display="flex" flexWrap="wrap" gridGap={20} mt={2}>
        {medicaments
          .filter(medicament => medicament.quantite > 0)
          .map(medicament => (
          <Medicament
            key={medicament.id}
            id={medicament.id}
            nom={medicament.nom}
            forme={medicament.forme}
            administration={medicament.administration}
            generique={medicament.generique}
            surveillance_renforcee={medicament.surveillance_renforcee}
            quantite={medicament.quantite}
            enleverMedicament={enleverMedicament}
          />
        ))}
      </Box>
    </Container>
  </>;
}
