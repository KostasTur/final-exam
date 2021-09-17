import React, { useReducer } from 'react';
import axios from 'axios';
import FormInputs from '../Forms/FormInputs';

// Base url for axios
axios.defaults.baseURL = 'http://localhost:5000';
// import useAxios from '../../Hooks/useAxios';

const initialState = { name: '', email: '', password: '', age: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD INPUT':
      return { ...state, [action.field]: action.payload };
    case 'CLEAR':
      return (state = initialState);
    default:
      return state;
  }
};

const AddUser = ({ setUsersState }) => {
  // form state
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD INPUT',
      field: e.target.name,
      payload: e.target.value,
    });
  };
  const addUser = (e) => {
    e.preventDefault();
    axios
      .post('/users', state)
      .then((res) => {
        if (res.data.users) {
          setUsersState(res.data.users);
          dispatch({ type: 'CLEAR' });
        } else {
          return alert('email email is already taken');
        }
      })
      .catch((err) => console.log(err))
      .finally();
  };
  return (
    <section>
      <h2>Pridėti vartotoją</h2>
      <form onSubmit={addUser}>
        <FormInputs state={state} handleChange={handleChange} />

        <input type='submit' value='Pridėti' />
      </form>
    </section>
  );
};

export default AddUser;
