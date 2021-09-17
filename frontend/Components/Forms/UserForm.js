// import axios from 'axios';
import axios from 'axios';
import React, { useReducer } from 'react';

import useAxios from '../../Hooks/useAxios';

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
const SignupForm = () => {
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
  const handleSumit = (e) => {
    e.preventDefault();
    // POST DATA Etc
    const { name } = state;
    axios
      .put('http://localhost:5000/teams/delete', { id: name })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    console.log(state);
  };
  return (
    <div>
      <form onSubmit={handleSumit}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          onChange={(e) => handleChange(e)}
        />
        {/* <input
          type='text'
          name='surname'
          placeholder='Surname'
          onChange={(e) => handleChange(e)}
        />
        <input
          type='email'
          name='email'
          placeholder='exaple@email.com'
          onChange={(e) => handleChange(e)}
        />
        <input type='text' name='password' placeholder='bestpassword' /> */}
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default SignupForm;
