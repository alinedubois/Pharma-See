import './App.css';
import {BarreDeNavigation} from './components/BarreDeNavigation';
import {Pharmacie} from './components/Pharmacie';
import {useEffect, useState} from 'react';
import BackTop from "./components/BackTop";
import Footer from "./components/Footer";
import {useAuth0} from '@auth0/auth0-react';



function App() {
    const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();

    const [medicaments, setMedicaments] = useState([]);

    const chargerLesMedicamentsDeLaPharmacie = async () => {
        const medicamentsResultat = await fetch('http://localhost:3000/api/medicaments/' + user.email);
        const medicamentsJson = await medicamentsResultat.json();
        setMedicaments(medicamentsJson);
    };

    useEffect(() => {
        if (isAuthenticated) {
            chargerLesMedicamentsDeLaPharmacie();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            loginWithRedirect();
        }
    },[isAuthenticated]);

    const enleverMedicament = async (medicamentId) => {
        if (isAuthenticated) {
            await fetch('http://localhost:3000/api/medicaments/' + user.name + '/' + medicamentId, {method: 'DELETE'});
            await chargerLesMedicamentsDeLaPharmacie();
        }
    }

    return (
        <>
            <BarreDeNavigation
                rechargerLaPharmacie={chargerLesMedicamentsDeLaPharmacie}
            />

            <Pharmacie
                medicaments={medicaments}
                enleverMedicament={enleverMedicament}
            />

            <BackTop />
            <Footer/>
        </>

    );
}

export default App;

