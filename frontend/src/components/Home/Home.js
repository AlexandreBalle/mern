import React, { useEffect, useState } from 'react';
import { getFishes } from '../../Api';
import Fish from '../Fish/Fish';
import './Home.scss';

const Home = () => {
  const [fishes, setFishes] = useState({});

  useEffect(() => {
    getFishes().then(fishesApi => {
      setFishes(Object.assign({}, fishesApi));
    });
  }, []);

  return (
    <div className='menu'>
      <h1>Fishes</h1>
      <ul>
        {Object.keys(fishes).map(key => (
          <Fish key={key} index={key} details={fishes[key]} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
