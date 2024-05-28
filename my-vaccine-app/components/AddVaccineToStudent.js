import React, { useState } from 'react';
import axios from 'axios';

const AddVaccineToStudent = ({ student, vaccines, onBack }) => {
  const [selectedVaccine, setSelectedVaccine] = useState('');
  const [date, setDate] = useState('');

  const addVaccine = async () => {
    if (!selectedVaccine || !date) {
      alert('Selecione uma vacina e uma data');
      return;
    }

    const vaccine = vaccines.find(v => v.id === parseInt(selectedVaccine));

    const updatedStudent = {
      ...student,
      vaccines: [...student.vaccines, { vaccineId: vaccine.id, name: vaccine.name, date }]
    };

    try {
      await axios.put(`http://localhost:3001/students/${student.id}`, updatedStudent);
      alert('Vacina adicionada com sucesso');
      onBack();
    } catch (error) {
      alert('Erro ao adicionar vacina: ' + error);
    }
  };

  return (
    <div>
      <h2>Adicionar Vacina ao Aluno</h2>
      <select onChange={(e) => setSelectedVaccine(e.target.value)} value={selectedVaccine}>
        <option value="">Selecione uma vacina</option>
        {vaccines.map((vaccine) => (
          <option key={vaccine.id} value={vaccine.id}>{vaccine.name}</option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Data da Vacina"
      />
      <button onClick={addVaccine}>Adicionar</button>
      <button onClick={onBack}>Voltar</button>
    </div>
  );
};

export default AddVaccineToStudent;
