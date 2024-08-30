import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Box } from '@mui/material';

function WebcamCapture({ onCapture }) {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = () => {
    let imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    if (onCapture) {
      onCapture(imageSrc);
    }
  };

  function preprocessImage(imageSrc, targetWidth = 48, targetHeight = 48) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        // Resize the canvas to the target size
        canvas.width = targetWidth;
        canvas.height = targetHeight;
  
        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  
        // Convert to grayscale
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          data[i] = gray;        // red
          data[i + 1] = gray;    // green
          data[i + 2] = gray;    // blue
          // data[i + 3] is the alpha channel
        }
        ctx.putImageData(imageData, 0, 0);
  
        // Normalize pixel values
        const normalizedData = [];
        for (let i = 0; i < data.length; i += 4) {
          normalizedData.push(data[i] / 255.0);  // Push normalized grayscale value
        }
  
        // Return the processed image data
        resolve(normalizedData);
      };
    });
  }
  

  const clear = () => {
    setCapturedImage(null);
    if (webcamRef.current) {
      webcamRef.current.video.srcObject.getTracks().forEach(track => track.start());
    }
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
      <Button variant="contained" color="secondary" onClick={capture} disabled={!!capturedImage}>
        Capture Photo
      </Button>
      <Button variant="outlined" color="primary" onClick={clear} sx={{ marginLeft: '1rem' }} disabled={!capturedImage}>
        Retake Photo
      </Button>
    </Box>
  );
}

export default WebcamCapture;
