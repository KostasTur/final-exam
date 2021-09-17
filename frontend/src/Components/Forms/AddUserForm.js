import React, { useReducer } from 'react';
import axios from 'axios';

// Base url for axios
axios.defaults.baseURL = 'http://localhost:5000';
// import useAxios from '../../Hooks/useAxios';

const initialState = {};
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD INPUT':
      return { ...state, [action.field]: action.payload };
    //   not sure how useful this is...
    case 'CLEAR':
      return {};
    default:
      return state;
  }
};

const AddUserForm = ({ usersState, setUsersState }) => {
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
        console.log(res.data.users);
        setUsersState(res.data.users);
        console.log('updated');
      })
      .catch((err) => console.log(err))
      .finally(console.log('updated', usersState));
  };
  return (
    <div>
      <form onSubmit={addUser}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          required
          onChange={(e) => handleChange(e)}
        />

        <input
          type='email'
          name='email'
          placeholder='exaple@email.com'
          onChange={(e) => handleChange(e)}
          required
        />

        <input
          type='text'
          name='password'
          placeholder='bestpassword'
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          type='number'
          name='age'
          placeholder='age'
          onChange={(e) => handleChange(e)}
          required
        />

        <input type='submit' value='Pridėti' />
      </form>
    </div>
  );
};

export default AddUserForm;
