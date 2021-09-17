import React, { useState, useEffect } from 'react';
// import AddUserForm from '../Components/Forms/AddUserForm';
import Table from '../Components/Table/Table';
import axios from 'axios';
import UpdateUser from '../Components/UpdateUser/UpdateUser';
import AddUser from '../Components/AddUser/AddUser';
import { StyledMain } from './AdminPage.styled';

// Base url for axios
axios.defaults.baseURL = 'http://localhost:5000';

const AdminPage = () => {
  // hooks
  // state
  const [usersState, setUsersState] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //   custom function to get users on load
  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/users');
      console.log(res.data);
      setUsersState(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <header>
        <h1>Administratoriaus Puslapis</h1>
      </header>
      <StyledMain>
        <section>
          <h2>Vartotojai</h2>

          {loading ? (
            <h4>...Loading...</h4>
          ) : (
            <div>
              {error && error.message}
              {usersState && (
                <Table usersState={usersState} setUsersState={setUsersState} />
              )}
            </div>
          )}
        </section>
        <AddUser usersState={usersState} setUsersState={setUsersState} />
        <UpdateUser usersState={usersState} setUsersState={setUsersState} />
      </StyledMain>
    </>
  );
};

export default AdminPage;
