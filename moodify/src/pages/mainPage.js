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
    try {
      const formData = new FormData();
      formData.append('picture', JSON.stringify(processedImage));  // Convert the processed image to JSON string
      formData.append('genre', selectedGenres.join(','));  // Assuming selectedGenres is an array

      const response = await axios.post('http://localhost:5000/Moodify/getCustomPlaylist', formData);
      setSongs(response.data['Recommended playlist']);
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

