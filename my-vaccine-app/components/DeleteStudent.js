import React from 'react';
import axios from 'axios';

const DeleteStudent = ({ student, onBack, onDelete }) => {
  const deleteStudent = async () => {
    try {
      await axios.delete(`http://localhost:3001/students/${student.id}`);
      alert('Aluno apagado com sucesso');
      onDelete(student.id); // Chamar a função onDelete passando o ID do aluno apagado
      onBack(); // Voltar à lista de alunos após apagar
    } catch (error) {
      alert('Erro ao apagar aluno: ' + error);
    }
  };

  return (
    <div>
      <h2>Apagar Aluno</h2>
      <p>Tem certeza que deseja apagar o aluno {student.name}?</p>
      <button onClick={deleteStudent}>Sim</button>
      <button onClick={onBack}>Não</button>
    </div>
  );
};

export default DeleteStudent;
