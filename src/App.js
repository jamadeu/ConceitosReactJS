import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";
import Repository from './components/Repository';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "uma url qualquer",
      title: "titulo",
      techs: ["Node"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  };

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if(response.status === 204){
      const tmp = repositories.filter(rep => rep.id !== id);
      setRepositories(tmp);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (<li key={repository.id}>
            <Repository title={repository.title}>
              <ul>
                <li>url: {repository.url}</li>
                <li>techs: {repository.techs}</li>
                <li>likes: {repository.likes}</li>
              </ul>

            </Repository>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)

        })}

    
      </ul>

      <button onClick={() => handleAddRepository()}>Adicionar</button>
    </div>
  );
}

export default App;
