import React, { useState } from 'react';
import axios from 'axios';

const CreateStudent = ({ onBack, onAdd }) => {
  const [name, setName] = useState('');

  const addStudent = async () => {
    try {
      const response = await axios.post('http://localhost:3001/students', { name, vaccines: [] });
      alert('Aluno adicionado com sucesso');
      setName('');
      onAdd(response.data); // Chamar a função onAdd passando o novo aluno
      onBack(); // Voltar à lista de alunos após adicionar
    } catch (error) {
      alert('Erro ao adicionar aluno: ' + error);
    }
  };

  return (
    <div>
      <h2>Adicionar Aluno</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do Aluno"
      />
      <button onClick={addStudent}>Adicionar</button>
      <button onClick={onBack}>Voltar</button>
    </div>
  );
};

export default CreateStudent;
