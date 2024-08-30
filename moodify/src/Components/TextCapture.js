import React, { useState } from 'react';
import { TextField, Button, Container, Grid2 } from '@mui/material';
import axios from 'axios'

function TextCapture({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async () => {
    if (inputValue.trim()) {
      const response = await axios.post('http://localhost:5000/submit', { input: inputValue });
      onSubmit(response.data);
      setInputValue('');
    }
  };

  return (
    <Container>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 item xs={12}>
          <TextField
            label="Enter your input"
            variant="outlined"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{ marginBottom: '1rem' }}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            Submit
          </Button>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default TextCapture;
