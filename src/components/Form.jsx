import { useState, useEffect } from "react";
import Error from "./Error";

function Form({patients, setPatients, patient, setPatient}) {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(patient).length > 0) {
      setName(patient.name)
      setOwner(patient.owner)
      setEmail(patient.email)
      setDate(patient.date)
      setSymptoms(patient.symptoms)
    }
  }, [patient]);

  const generateId = () => {
    const rand = Math.random().toString(36).substring(2);
    const dateNow = Date.now().toString(36);
    return rand + dateNow;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if ([name, owner, email, date, symptoms].includes('')) {
      setError(true);
      return;
    }

    setError(false);

    const newPatient = {
      name,
      owner,
      email,
      date,
      symptoms
    }

    if (patient.id) {
      newPatient.id = patient.id;
      const patientsUpdated = patients.map( patientState => patientState.id === patient.id ? newPatient : patientState);
      setPatients(patientsUpdated)
      setPatient({})
    } else {
      newPatient.id = generateId();
      setPatients([...patients, newPatient]);
    }

    setName('');
    setOwner('');
    setEmail('');
    setDate('');
    setSymptoms('');
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Follow-up Patients</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Add Patients and
        <span className="text-indigo-600 font-bold"> Manage them</span>
      </p>

      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        
        { error && <Error><p>All fields are required</p></Error>}
        
        <div className="mb-5">
          <label htmlFor="pet" className="block text-gray-700 uppercase font-bold">
            Pet name
          </label>
          <input 
            id="pet"
            type="text" 
            placeholder="Pet name"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="owner" className="block text-gray-700 uppercase font-bold">
            Owner name
          </label>
          <input 
            id="owner"
            type="text" 
            placeholder="Owner name"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Email
          </label>
          <input 
            id="email"
            type="email" 
            placeholder="Email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="registration" className="block text-gray-700 uppercase font-bold">
            Registration date
          </label>
          <input 
            id="registration"
            type="date" 
            placeholder="Registration date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="block text-gray-700 uppercase font-bold">
            Symptoms
          </label>
          <textarea 
            id="symptoms"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe the symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}/>
        </div>

        <input type="submit" 
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={patient.id ? 'Edit patient' : 'Add patient'}/>
      </form>
    </div>
  )
}

export default Form
