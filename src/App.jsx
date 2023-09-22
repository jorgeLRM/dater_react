import { useState, useEffect } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import Patients from "./components/Patients";

function App() {

  const [patients, setPatients] = useState(() => JSON.parse(localStorage.getItem('patients')) || []);
  const [patient, setPatient] = useState({});

  /*useEffect(() => {
    const getLocalStorage = () => {
      const patientsLocalStorage = JSON.parse(localStorage.getItem('patients')) || [];
      console.log(patientsLocalStorage)
      setPatients(patientsLocalStorage)
    }
    getLocalStorage();
  }, [])*/

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients))
  }, [patients])

  const deletePatient = id => {
    const updatedPatients = patients.filter(patient => patient.id !== id);
    setPatients(updatedPatients)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Form 
          patients={patients} 
          setPatients={setPatients}
          patient={patient}
          setPatient={setPatient}/>
        <Patients 
          patients={patients}
          setPatient={setPatient}
          deletePatient={deletePatient}/>
      </div>
    </div>
  );
}

export default App;
