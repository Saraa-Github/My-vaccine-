'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import CreateStudent from '../components/CreateStudent';
import DeleteStudent from '../components/DeleteStudent';
import UpdateStudent from '../components/UpdateStudent';
import ViewStudents from '../components/ViewStudents';
import AddVaccineToStudent from '../components/AddVaccineToStudent';

function App() {
  const [vaccineList, setVaccineList] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [view, setView] = useState('list'); // Para controlar a visualização atual

  useEffect(() => {
    fetchVaccineList();
    fetchStudents();
  }, []);

  const fetchVaccineList = async () => {
    const options = {
      method: 'GET',
      url: 'https://vaccine2.p.rapidapi.com/vaccines',
      headers: {
        'X-RapidAPI-Key': 'bad3e1ae7emsh255dbbf76985857p1e91f0jsn024a0c1faf28',
        'X-RapidAPI-Host': 'vaccine2.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setVaccineList(response.data);
    } catch (error) {
      alert('Erro ao buscar vacinas: ' + error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/students');
      setStudents(response.data);
    } catch (error) {
      alert('Erro ao buscar alunos: ' + error);
    }
  };

  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const updateStudentInList = (updatedStudent) => {
    setStudents(students.map(s => (s.id === updatedStudent.id ? updatedStudent : s)));
  };

  const deleteStudentFromList = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const getVaccineCount = (vaccineName) => {
    return students.reduce((count, student) => {
      return count + student.vaccines.filter(v => v.name === vaccineName).length;
    }, 0);
  };

  const handleAddVaccine = (student) => {
    setSelectedStudent(student);
    setView('addVaccine');
  };

  const handleUpdateStudent = (student) => {
    setSelectedStudent(student);
    setView('update');
  };

  const handleDeleteStudent = (student) => {
    setSelectedStudent(student);
    setView('delete');
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setView('view');
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
    setView('list');
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Alunos Vacinados Mack</h1>
      </div>
      <div className="container">
        {view === 'list' && (
          <>
            <div className="add-button">
              <button className="btn btn-primary" onClick={() => setView('create')}>Adicionar Aluno</button>
            </div>
            <h1>Lista de Alunos</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Nome do Aluno</th>
                  <th>Vacinas</th>
                  <th>Data Vacina</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.vaccines.map(v => v.name).join(', ') || 'N/A'}</td>
                    <td>{student.vaccines.map(v => v.date).join(', ') || 'N/A'}</td>
                    <td className="button-group">
                      <button className="update" onClick={() => handleUpdateStudent(student)}>Atualizar</button>
                      <button className="delete" onClick={() => handleDeleteStudent(student)}>Apagar</button>
                      <button className="view" onClick={() => handleViewStudent(student)}>Ver</button>
                      <button className="add-vaccine" onClick={() => handleAddVaccine(student)}>Adicionar Vacina</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {view === 'create' && <CreateStudent onBack={handleBackToList} onAdd={addStudent} />}
        {view === 'update' && <UpdateStudent student={selectedStudent} onBack={handleBackToList} onUpdate={updateStudentInList} />}
        {view === 'delete' && <DeleteStudent student={selectedStudent} onBack={handleBackToList} onDelete={deleteStudentFromList} />}
        {view === 'view' && <ViewStudents student={selectedStudent} onBack={handleBackToList} />}
        {view === 'addVaccine' && <AddVaccineToStudent student={selectedStudent} vaccines={vaccineList} onBack={handleBackToList} />}
      </div>
    </div>
  );
}

export default App;
