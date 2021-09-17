import React, { useReducer } from 'react';
import axios from 'axios';
import FormInputs from '../Forms/FormInputs';
import { StyledForm } from '../Forms/Form.styled';

// Base url for axios
axios.defaults.baseURL = 'http://localhost:5000';

const initialState = { name: '', email: '', password: '', age: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD':
      return action.payload;
    case 'UPDATE':
      return { ...state, [action.field]: action.payload };
    case 'CLEAR ':
      return {};
    default:
      return state;
  }
};
const UpdateUser = ({ usersState, setUsersState }) => {
  // form state
  const [state, dispatch] = useReducer(reducer, initialState);

  //  custom  functions
  const handleSelect = (e) => {
    const userId = e.target.value;
    const user = usersState.find((item) => item._id === userId);
    dispatch({ type: 'LOAD', payload: user });
  };

  const handleChange = (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const updateUser = async (e) => {
    console.log('hit');
    e.preventDefault();
    try {
      const { _id, name, email, password, age } = state;
      const res = await axios.put(`/users/`, {
        _id: _id,
        name: name,
        email: email,
        password: password,
        age: +age,
      });
      console.log(res);
      setUsersState(res.data.users);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  return (
    <section>
      <h2>Redaguoti vartotoją</h2>
      <form onSubmit={updateUser}>
        {usersState && (
          <select onChange={(e) => handleSelect(e)}>
            <option key={1} value={''}>
              Pasirinkite vartotoja pagal el. paštą
            </option>
            {usersState.map((item) => (
              <option key={item._id} value={item._id}>
                {item.email}
              </option>
            ))}
          </select>
        )}
        <FormInputs state={state} handleChange={handleChange} />

        <input type='submit' value='Atnaujinti' />
      </form>
    </section>
  );
};

export default UpdateUser;
