import AdminPage from './Pages/AdminPage';
import styled from 'styled-components';

const StyledApp = styled.div`
  h1 {
    text-align: center;
  }
`;
function App() {
  return (
    <StyledApp className='App'>
      <AdminPage />
    </StyledApp>
  );
}

export default App;
