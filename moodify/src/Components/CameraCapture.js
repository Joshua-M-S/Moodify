import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Box } from '@mui/material';

function WebcamCapture({ onCapture }) {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc); // Store the captured image in state to freeze it
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

  const retake = () => {
    setCapturedImage(null); // Reset captured image to allow live feed again
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      {capturedImage ? (
        <img
          src={capturedImage}
          alt="Captured"
          style={{ borderRadius: '8px', width: '100%', marginBottom: '1rem' }}
        />
      ) : (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ borderRadius: '8px', width: '100%', marginBottom: '1rem' }}
        />
      )}
      <Button variant="contained" color="primary" onClick={capturedImage ? retake : capture}>
        {capturedImage ? 'Retake Photo' : 'Capture Photo'}
      </Button>
    </Box>
  );
}

export default WebcamCapture;
