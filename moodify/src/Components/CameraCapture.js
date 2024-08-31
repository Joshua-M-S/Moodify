import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { Button, Box } from '@mui/material';

function WebcamCapture({ onCapture }) {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });
          if (onCapture) {
            onCapture(file); // Pass the file object to the parent component
          }
        });
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ borderRadius: '8px', width: '100%', marginBottom: '1rem' }}
      />
      <Button variant="contained" color="secondary" onClick={capture}>
        Capture Photo
      </Button>
    </Box>
  );
}

export default WebcamCapture;
