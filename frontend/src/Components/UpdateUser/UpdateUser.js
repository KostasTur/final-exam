import React, { useReducer } from 'react';
import axios from 'axios';
// import useAxios from '../../Hooks/useAxios';

// Base url for axios
axios.defaults.baseURL = 'http://localhost:5000';

const initialState = { name: '', email: '', password: '', age: '' };
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
        <div>
          <label htmlFor='name'>Vardas</label>
          <input
            type='text'
            name='name'
            required
            value={state.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor='email'>El. paštas</label>
          <input
            type='email'
            name='email'
            value={state.email}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <div>
          <label htmlFor='password'>Slaptažodis</label>
          <input
            type='text'
            name='password'
            required
            value={state.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor='age'>Amžius</label>
          <input
            type='number'
            name='age'
            placeholder='age'
            value={+state.age}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        <input type='submit' value='Atnaujinti' />
      </form>
    </section>
  );
};

export default UpdateUser;
