import React from 'react';
import axios from 'axios';

// Base url for axios
axios.defaults.baseURL = 'http://localhost:5000';

const Table = ({ usersState, setUsersState }) => {
  const deleteUser = (id) => {
    const updatedUsersState = usersState.filter((item) => item._id !== id);

    axios
      .delete(`/users/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setUsersState(updatedUsersState);
  };
  return (
    <div>
      {usersState && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Vardas</th>
              <th>El. paštas</th>
              <th>Amžius</th>
              <th>Ištrinti</th>
            </tr>
          </thead>
          <tbody>
            {usersState.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.age}</td>
                <td>
                  <button
                    className='btn-primary'
                    onClick={() => deleteUser(item._id)}
                  >
                    Ištrinti
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
