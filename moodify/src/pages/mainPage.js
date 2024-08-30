import React, { useState } from 'react';
import { Container, Grid2, Paper, Typography, Box } from '@mui/material';
import WebcamCapture from '../Components/CameraCapture';  // Adjust the import path if needed
import TextCapture from '../Components/TextCapture';      // Adjust the import path if needed
import SongPlaylist from '../Components/SongPlaylist';    // Adjust the import path if needed
import axios from 'axios';


const MainPage = () => {
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
    <Container maxWidth="md" className="App-container">
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
  );
};

export default MainPage;
