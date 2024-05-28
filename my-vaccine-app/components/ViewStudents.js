import React from 'react';

const ViewStudents = ({ student, onBack }) => {
  return (
    <div>
      <h2>Detalhes do Aluno</h2>
      <p><strong>Nome:</strong> {student.name}</p>
      <p><strong>Vacinas:</strong> {student.vaccines.map(v => v.name).join(', ') || 'N/A'}</p>
      <p><strong>Data Vacina:</strong> {student.vaccines.map(v => v.date).join(', ') || 'N/A'}</p>
      <button onClick={onBack}>Voltar</button>
    </div>
  );
};

export default ViewStudents;
