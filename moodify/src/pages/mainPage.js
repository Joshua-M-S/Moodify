import React, { useState } from 'react';
import { Container, Paper, Typography, Box, Button, IconButton, Snackbar, Slide, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import WebcamCapture from '../Components/CameraCapture';  // Adjust the import path if needed
import SongPlaylist from '../Components/SongPlaylist';    // Adjust the import path if needed
import { useSelectedGenres } from '../context/selectedGenresContext';

const CustomSnackbar = styled(Snackbar)(({ theme }) => ({
  '& .MuiSnackbarContent-root': {
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid lightgray',
    borderRadius: '4px',
    padding: '10px 20px',
    boxShadow: theme.shadows[1],
  },
  '& .MuiSnackbarContent-message': {
    fontSize: '16px',
  },
  '& .MuiSnackbarContent-action': {
    color: 'black',
  },
  '& .MuiSnackbarContent-root': {
    animation: '$shake 0.5s ease',
  },
  '@keyframes shake': {
    '0%': { transform: 'translateX(0)' },
    '25%': { transform: 'translateX(-5px)' },
    '50%': { transform: 'translateX(5px)' },
    '75%': { transform: 'translateX(-5px)' },
    '100%': { transform: 'translateX(0)' },
  },
}));

const MainPage = () => {
  const [songs, setSongs] = useState([]);
  const [processedImage, setProcessedImage] = useState(null);
  const [predictedEmotion, setPredictedEmotion] = useState('');  // State for predicted emotion
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // State for Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState('info'); // State for Snackbar severity
  const { selectedGenres } = useSelectedGenres();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!processedImage || selectedGenres.length === 0) {
      console.error('Image or genres missing.');
      return;
    }
  
    const formData = new FormData();
    formData.append('picture', processedImage); // Append file
    formData.append('genre', JSON.stringify(selectedGenres)); // Append genres
  
    try {
      const response = await fetch('http://localhost:5000/Moodify/getCustomPlaylist', {
        method: 'POST',
        body: formData, // Send FormData
      });

      if (!response.ok) {
        // Handle error response
        if (response.status === 500) {
          setSnackbarMessage('Your image could not be processed. Please retake and ensure you have adequate mild lighting and you are facing the camera.');
          setSnackbarSeverity('error');
        } else {
          setSnackbarMessage('Your image could not be processed. Please retake and ensure you have adequate mild lighting and you are facing the camera');
          setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
        return;
      }

      const data = await response.json();
      console.log('API Response:', data);
  
      // Handle the response
      setSongs(data['Recommended Playlist']);
      setPredictedEmotion(data['Predicted Emotion']); // Access predictedEmotion from payload
      setSnackbarMessage(`You are feeling: ${data['Predicted Emotion']}. Here are some tracks to match your vibe!`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true); // Show Snackbar after setting emotion
    } catch (error) {
      console.error('Error submitting data:', error);
      setSnackbarMessage('Your image could not be processed. Please retake and ensure you have adequate mild lighting and you are facing the camera.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container
      maxWidth="xlg"
      style={{
        backgroundColor: '#001f3f', // Navy blue background
        minHeight: '100vh', // Ensure full height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', // For positioning the back arrow
      }}
    >
      {/* Back Arrow */}
      <IconButton
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: '#001f3f', // Navy blue background
          color: 'white', // White icon
          border: '2px solid lightblue', // Light blue border
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Paper
        elevation={3}
        style={{
          border: '5px solid lightblue',
          padding: '40px',
          backgroundColor: 'white', // Slightly transparent white background
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Moodify.ai
        </Typography>
        <Box
          style={{
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <WebcamCapture onCapture={setProcessedImage} />
        </Box>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!processedImage || selectedGenres.length === 0}
          fullWidth
          style={{
            backgroundColor: '#001f3f', // Navy blue background
            color: 'white', // White text
            border: '2px solid #001f3f', // Light blue border
          }}
        >
          Generate Playlist
        </Button>
        <Box mt={2}>
          <SongPlaylist songs={songs} />
        </Box>
      </Paper>

      {/* Snackbar */}
      <CustomSnackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        TransitionComponent={Slide}
      />
    </Container>
  );
};

export default MainPage;
