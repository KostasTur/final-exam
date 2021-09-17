import React from 'react';
import axios from 'axios';
import { StyledTable } from './Table.styled';
import { Button } from '../Button/Button';

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
    <StyledTable>
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
                  <Button clear onClick={() => deleteUser(item._id)}>
                    Ištrinti
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </StyledTable>
  );
};

export default Table;
