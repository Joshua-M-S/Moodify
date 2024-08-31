import React, { useState } from 'react';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import WebcamCapture from '../Components/CameraCapture';  // Adjust the import path if needed
import SongPlaylist from '../Components/SongPlaylist';    // Adjust the import path if needed
import axios from 'axios';
import { useSelectedGenres } from '../context/selectedGenresContext';

const MainPage = () => {
  const [songs, setSongs] = useState([]);
  const [processedImage, setProcessedImage] = useState(null);
  const { selectedGenres } = useSelectedGenres();

  const handleSubmit = async () => {
    if (!processedImage || selectedGenres.length === 0) {
      console.error('Image or genres missing.');
      return;
    }
  
    const formData = new FormData();
    formData.append('picture', processedImage); // Append file
    formData.append('genre', selectedGenres); // Append genres
  
    try {
      const response = await fetch('https://127.0.0.1:5000/Moodify/getCustomPlaylist', {
        method: 'POST',
        body: formData,
        credentials: 'include' // Send FormData
      });
      const data = await response.json();
      console.log('API Response:', data);
  
      // Handle the response
      setSongs(data['Recommended Playlist']);
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
        <Box className="Webcam-box">
          <WebcamCapture onCapture={setProcessedImage} />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!processedImage || selectedGenres.length === 0}
          fullWidth
        >
          Generate Playlist
        </Button>
        <SongPlaylist songs={songs} />
      </Paper>
    </Container>
  );
};

export default MainPage;
