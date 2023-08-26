import { Box } from '@mui/material';
import { Table } from './components';

const App = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'linear-gradient(to bottom, #2196F3, #00d9d5)',
      }}
    >
      <Table />
    </Box>
  );
};

export default App;
