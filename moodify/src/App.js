import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Grid2, Paper, Typography, Box } from '@mui/material';
import WebcamCapture from './Components/CameraCapture';
import TextCapture from './Components/TextCapture';
import SongPlaylist from './Components/SongPlaylist';
import axios from 'axios';
import theme from './Themes/Theme';  
import './App.css';  
import './App.css';
import Bubbles from './components/genreSelector';

function App() {
  const [songs, setSongs] = useState([]);
  const [capturedImage, setCapturedImage] = useState(null);

  const handleTextSubmit = async (inputData) => {
    try {
      const response = await axios.post('http://localhost:5000/submit', {
        input: inputData,
        image: capturedImage,
      });
      setSongs(response.data.songs); // Assuming the response contains a 'songs' array
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" className="App-container">
      <Bubbles/>
        <Paper elevation={3} className="App-paper">
          <Typography variant="h4" align="center" gutterBottom>
            Music Recommender
          </Typography>
          <Grid2 container spacing={4} alignItems="center" justifyContent="center">
            <Grid2 item xs={12} md={6}>
              <Box className="Webcam-box">
                <WebcamCapture onCapture={setCapturedImage} />
              </Box>
            </Grid2>
            <Grid2 item xs={12} md={6}>
              <TextCapture onSubmit={handleTextSubmit} />
            </Grid2>
            <Grid2 item xs={12}>
              <SongPlaylist songs={songs} />
            </Grid2>
          </Grid2>
        </Paper>
      </Container>
    </ThemeProvider>

     
   
  );
}

export default App;
