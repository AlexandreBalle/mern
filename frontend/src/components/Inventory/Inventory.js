import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { createFish, getFishes, putFish, removeFish } from '../../Api';
import sampleFishes from '../../sample-fishes';
import { isLoggedIn } from '../../Services/AuthService';
import AddFishForm from '../AddFishForm/AddFishForm';
import EditFishForm from '../EditFishForm/EditFishForm';
import './Inventory.scss';

const Inventory = () => {
  const [fishes, setFishes] = useState({});
  const isAuth = isLoggedIn();

  useEffect(() => {
    getFishes().then(fishesApi => {
      setFishes(Object.assign({}, fishesApi));
    });
  }, []);

  const loadSampleFishes = () => {
    setFishes(sampleFishes);
  };

  const updateFish = fish => {
    putFish(fish).then(result => {
      toast.info(result, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true
      });
    });
  };

  const deleteFish = id => {
    removeFish(id).then(result => {
      toast.info(result, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true
      });
    });
  };

  const addFish = fish => {
    createFish(fish).then(result => {
      if (result) {
        toast.info('👍 Successful creation', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true
        });
      }
    });
  };

  return isAuth ? (
    <div className='inventory'>
      <h1>Inventory</h1>
      {Object.keys(fishes).map(key => (
        <EditFishForm fish={fishes[key]} key={key} index={key} updateFish={updateFish} deleteFish={deleteFish} />
      ))}
      <AddFishForm addFish={addFish} />
      <button onClick={loadSampleFishes}>Load sample fishes</button>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </div>
  ) : (
    <Redirect to={{ pathname: '/Login' }} />
  );
};

Inventory.propTypes = {
  fishes: PropTypes.object,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  loadSampleFishes: PropTypes.func,
  addFish: PropTypes.func
};

export default Inventory;
