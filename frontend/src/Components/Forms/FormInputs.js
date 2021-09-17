import React from 'react';

const FormInputs = ({ state, handleChange }) => {
  return (
    <>
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
    </>
  );
};

export default FormInputs;
