import PatientsPage from "./pages/PatientsPage.jsx";
import DoctorsPage from "./pages/DoctorsPage.jsx";
import CommitteePage from "./pages/CommitteePage.jsx";

function App() {
    return (
        <div>
            <h1>Clinica - Sistema de turnos</h1>

            <PatientsPage />

            <hr />

            <DoctorsPage />

            <hr />

            <CommitteePage />
        </div>
    );
}

export default App;