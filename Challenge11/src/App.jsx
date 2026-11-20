

import { useState } from 'react';
import { Graph } from 'react-d3-graph';
import './App.css';

const initialCities = [
  { id: 'city-1', name: 'Cali' },
  { id: 'city-2', name: 'Bogotá' },
];

const initialPeople = [
  { id: 'person-1', name: 'Ana', age: 20, cityId: 'city-1' },
  { id: 'person-2', name: 'Carlos', age: 22, cityId: 'city-1' },
  { id: 'person-3', name: 'Laura', age: 19, cityId: 'city-2' },
];

function App() {
  const [cities, setCities] = useState(initialCities);
  const [people, setPeople] = useState(initialPeople);

  const [cityName, setCityName] = useState('');
  const [personName, setPersonName] = useState('');
  const [personAge, setPersonAge] = useState('');
  const [selectedCity, setSelectedCity] = useState('city-1');
  const [filterCity, setFilterCity] = useState('city-1');

  const addCity = (e) => {
    e.preventDefault();

    const name = cityName.trim();

    if (!name) return;

    if (
      cities.some(
        (city) => city.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert('Esta ciudad ya está registrada');
      return;
    }

    const newCity = {
      id: crypto.randomUUID(),
      name,
    };

    setCities((previous) => [...previous, newCity]);
    setCityName('');
  };

  const addPerson = (e) => {
    e.preventDefault();

    const name = personName.trim();
    const age = Number(personAge);

    if (
      !name ||
      !Number.isInteger(age) ||
      age <= 0 ||
      !cities.some((city) => city.id === selectedCity)
    ) {
      alert('Completa correctamente todos los campos');
      return;
    }

    const newPerson = {
      id: crypto.randomUUID(),
      name,
      age,
      cityId: selectedCity,
    };

    setPeople((previous) => [...previous, newPerson]);
    setPersonName('');
    setPersonAge('');
  };

  const residents = people.filter(
    (person) => person.cityId === filterCity
  );

  const graphData = {
    nodes: [
      ...cities.map((city) => ({
        id: city.id,
        name: city.name,
        color: '#3b82f6',
        size: 600,
      })),
      ...people.map((person) => ({
        id: person.id,
        name: person.name,
        color: '#22c55e',
        size: 400,
      })),
    ],
    links: people.map((person) => ({
      source: person.id,
      target: person.cityId,
    })),
  };

  const graphConfig = {
    directed: false,
    nodeHighlightBehavior: true,
    automaticRearrangeAfterDropNode: true,
    height: 540,
    width: 850,
    d3: {
      gravity: -200,
      linkLength: 140,
      linkStrength: 1,
    },
    node: {
      size: 450,
      fontSize: 15,
      fontColor: '#ffffff',
      labelProperty: 'name',
      highlightStrokeColor: '#facc15',
    },
    link: {
      color: '#94a3b8',
      strokeWidth: 2,
    },
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Challenge 11 - Grafos</h1>
        <p>Administración de personas y ciudades</p>
      </header>

      <section className="forms-grid">
        <div className="panel">
          <h2>Registrar ciudad</h2>

          <form onSubmit={addCity} className="form">
            <input
              type="text"
              placeholder="Nombre de la ciudad"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              required
            />

            <button type="submit">Agregar ciudad</button>
          </form>
        </div>

        <div className="panel">
          <h2>Registrar persona</h2>

          <form onSubmit={addPerson} className="form">
            <input
              type="text"
              placeholder="Nombre de la persona"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Edad"
              value={personAge}
              onChange={(e) => setPersonAge(e.target.value)}
              min="1"
              required
            />

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>

            <button type="submit">Agregar persona</button>
          </form>
        </div>
      </section>

      <section className="panel residents-panel">
        <h2>Consultar personas por ciudad</h2>

        <select
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>

        {residents.length === 0 ? (
          <p className="empty-message">
            No hay personas registradas en esta ciudad.
          </p>
        ) : (
          <ul className="residents-list">
            {residents.map((person) => (
              <li key={person.id}>
                <span>{person.name}</span>
                <span>{person.age} años</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="panel graph-panel">
        <h2>Visualización del grafo</h2>
        <p className="graph-description">
          Cada persona está conectada con su ciudad de residencia.
        </p>

        <div className="graph-wrapper">
          <Graph
            id="graph-friends-cities"
            data={graphData}
            config={graphConfig}
          />
        </div>

        <div className="legend">
          <span>
            <i className="legend-dot city-dot" />
            Ciudades
          </span>

          <span>
            <i className="legend-dot person-dot" />
            Personas
          </span>
        </div>
      </section>
    </main>
  );
}

export default App;
