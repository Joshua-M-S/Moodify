import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Define an array of genres
const genres = [
  'Rock', 'Pop', 'Jazz', 'Classical', 'Hip Hop', 'Electronic', 'Reggae', 'Country', 'Blues', 'Soul',
  'R&B', 'Metal', 'Punk', 'Folk', 'Latin', 'Gospel', 'Funk', 'Disco', 'Opera', 'Techno',
  'House', 'Ambient', 'Alternative', 'Indie', 'Grunge', 'Dubstep', 'Trap', 'Drum and Bass', 'Ska', 'Swing',
  'Post-Rock', 'Progressive', 'Dancehall', 'Bluegrass', 'New Age', 'World', 'Experimental', 'Minimal', 'Industrial', 'Tango',
  'Chillout', 'Ethnic', 'Bossa Nova', 'Hard Rock', 'Gothic', 'Noise', 'Tech House', 'Acoustic', 'Jazz Fusion', 'Psychedelic'
];

const Bubble = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #000; // Base color, will be overridden by the vibrant color
  color: #fff;
  font-size: 25px; // Increased font size
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  transition: transform 0.3s ease, background-color 0.3s ease;
  /* Ensure transition applies to the scale transformation */
  transform-origin: center;

  &:hover {
    transform: scale(1.5); // Increase hover size
  }
`;

const BubblesContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #001f3f; // Navy blue background
`;

const Popup = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8); // Dark overlay
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  color: white;
  font-size: 50px;
  font-weight: bold;
  text-align: center;
`;

const PopupButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const vibrantColors = [
  '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F7FF33', '#33F7FF', '#FF8333', '#7DFF33', '#FF33C4', '#C4FF33',
  '#FF9A33', '#33FF9A', '#9A33FF', '#FF33A8', '#33A8FF', '#A8FF33', '#FF6B33', '#6BFF33', '#FF33C4', '#C4FF6B'
];

const Bubbles = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [showPopup, setShowPopup] = useState(true); // Start with popup shown
  const [showGenrePopup, setShowGenrePopup] = useState(false); // State for the genre popup
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const calculatePositions = () => {
      const positions = [];
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      const bubbleDiameter = 120; // Diameter of the bubbles
      const padding = 80; // Padding from the container edges
      const numRows = Math.ceil(containerHeight / (bubbleDiameter + padding));
      const numCols = Math.ceil(containerWidth / (bubbleDiameter + padding));

      // Generate positions
      for (let i = 0; i < genres.length; i++) {
        const row = Math.floor(i / numCols);
        const col = i % numCols;
        const x = col * (bubbleDiameter + padding);
        const y = row * (bubbleDiameter + padding);

        if (x < containerWidth && y < containerHeight) {
          positions.push({ x, y });
        }
      }

      setPositions(positions);
    };

    calculatePositions();
    window.addEventListener('resize', calculatePositions);

    return () => {
      window.removeEventListener('resize', calculatePositions);
    };
  }, []);

  const handleClick = (genre) => {
    setSelectedGenre(genre);
    setShowGenrePopup(true); // Show genre popup
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleGenrePopupClose = () => {
    setShowGenrePopup(false);
  };

  return (
    <>
      {showPopup && (
        <Popup
          initial={{ y: 0 }}
          animate={{ y: '-100vh' }}
          exit={{ y: '0' }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        >
          <div>
            <p>Choose Your Genre</p>
           
          </div>
        </Popup>
      )}

      {showGenrePopup && (
        <Popup
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ background: 'rgba(0, 0, 0, 0.8)', color: 'white', fontSize: '36px' }}
        >
          <div>
            <p>You selected: {selectedGenre}</p>
            <PopupButton onClick={handleGenrePopupClose}>Close</PopupButton>
          </div>
        </Popup>
      )}

      <BubblesContainer>
        {genres.map((genre, index) => {
          const size = 147; // Fixed size for all bubbles
          const position = positions[index] || { x: 0, y: 0 };
          const color = vibrantColors[Math.floor(Math.random() * vibrantColors.length)]; // Random vibrant color

          return (
            <Bubble
              key={index}
              style={{
                width: size,
                height: size,
                top: position.y,
                left: position.x,
                backgroundColor: color,
              }}
              onClick={() => handleClick(genre)}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            >
              {genre}
            </Bubble>
          );
        })}
      </BubblesContainer>
    </>
  );
};

export default Bubbles;
