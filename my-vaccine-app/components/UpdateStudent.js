import React, { useState } from 'react';
import axios from 'axios';

const UpdateStudent = ({ student, onBack, onUpdate }) => {
  const [name, setName] = useState(student.name);

  const updateStudent = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/students/${student.id}`, { ...student, name });
      alert('Aluno atualizado com sucesso');
      onUpdate(response.data); // Chamar a função onUpdate passando o aluno atualizado
      onBack(); // Voltar à lista de alunos após atualizar
    } catch (error) {
      alert('Erro ao atualizar aluno: ' + error);
    }
  };

  return (
    <div>
      <h2>Atualizar Aluno</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do Aluno"
      />
      <button onClick={updateStudent}>Atualizar</button>
      <button onClick={onBack}>Voltar</button>
    </div>
  );
};

export default UpdateStudent;
