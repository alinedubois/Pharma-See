import './App.css';
import {BarreDeNavigation} from './components/BarreDeNavigation';
import {Pharmacie} from './components/Pharmacie';
import {useEffect, useState} from 'react';

function App() {
    const [medicaments, setMedicaments] = useState([]);

    const chargerLesMedicamentsDeLaPharmacie = async () => {
        const medicamentsResultat = await fetch('http://localhost:3000/api/medicaments');
        const medicamentsJson = await medicamentsResultat.json();
        setMedicaments(medicamentsJson);
    };

    useEffect(() => {
        chargerLesMedicamentsDeLaPharmacie();
    }, []);

    const enleverMedicament = async (medicamentId) => {
        await fetch('http://localhost:3000/api/medicaments/' + medicamentId, {method: 'DELETE'});
        await chargerLesMedicamentsDeLaPharmacie();
    }

    return (
        <>
            <BarreDeNavigation />

            <Pharmacie
                medicaments={medicaments}
                enleverMedicament={enleverMedicament}
            />
        </>
    );
}

export default App;

