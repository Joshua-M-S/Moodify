import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelectedGenres } from '../context/selectedGenresContext';
import SelectedGenresModal from './SelectedGenresModal';

const genres = [
  'Rock', 'Pop', 'Jazz', 'Classical', 'Hip Hop', 'Electronic', 'Reggae', 'Country', 'Blues', 'Soul',
  'R&B', 'Metal', 'Punk', 'Folk', 'Latin', 'Gospel', 'Funk', 'Disco', 'Opera', 'Techno',
  'House', 'Ambient', 'Alternative', 'Indie', 'Grunge', 'Dubstep', 'Trap', 'Drum and Bass', 'Ska', 'Swing',
  'Post-Rock', 'Progressive', 'Dancehall', 'Bluegrass', 'New Age', 'World', 'Experimental', 'Minimal', 'Industrial', 'Tango',
  'Chillout', 'Ethnic', 'Bossa Nova', 'Hard Rock', 'Gothic', 'Noise', 'Tech House', 'Acoustic', 'Jazz Fusion', 'Psychedelic'
];

const vibrantColors = [
  '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F7FF33', '#33F7FF', '#FF8333', '#7DFF33', '#FF33C4', '#C4FF33',
  '#FF9A33', '#33FF9A', '#9A33FF', '#FF33A8', '#33A8FF', '#A8FF33', '#FF6B33', '#6BFF33', '#FF33C4', '#C4FF6B'
];

const Bubble = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #000;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  transition: transform 0.3s ease, background-color 0.3s ease;
  transform-origin: center;
  text-align: center;
  padding: 5px;

  &:hover {
    transform: scale(1.2);
  }
`;

const BubblesContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #001f3f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 1000;
  background-color: rgba(0, 31, 63, 0.8);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 10px 20px;
  border: 2px solid #ADD8E6;
  background-color: #001f3f;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #003366;
    border-color: #87CEFA;
  }
`;

const Bubbles = () => {
  const [showModal, setShowModal] = useState(false);
  const [positions, setPositions] = useState([]);
  const navigate = useNavigate();
  const { selectedGenres, addGenre, removeGenre } = useSelectedGenres();

  useEffect(() => {
    const calculatePositions = () => {
      const positions = [];
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      const centerX = containerWidth / 2;
      const centerY = containerHeight / 2;
      
      const minSize = 120;
      const maxSize = 120;
      const padding = 10;

      const generateRandomSize = () => Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

      const doesOverlap = (x1, y1, size1, x2, y2, size2) => {
        const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
        return distance < (size1 + size2) / 2 + padding;
      };

      for (let i = 0; i < genres.length; i++) {
        let size = generateRandomSize();
        let x, y;
        let overlapping = true;

        while (overlapping) {
          x = Math.random() * (containerWidth - size);
          y = Math.random() * (containerHeight - size);
          overlapping = positions.some(pos => doesOverlap(x, y, size, pos.x, pos.y, pos.size));
        }

        positions.push({ x, y, size });
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
    addGenre(genre);
    navigate(`/sub-genres/${encodeURIComponent(genre)}`);
  };

  const handleDeleteGenre = (genre) => {
    removeGenre(genre);
  };

  return (
    <>
      {showModal && (
        <SelectedGenresModal
          selectedGenres={selectedGenres}
          onClose={() => setShowModal(false)}
          onDelete={handleDeleteGenre}
        />
      )}

      <BubblesContainer>
        <ButtonContainer>
          <Button onClick={() => setShowModal(true)}>
            Show Selected Genres
          </Button>
          <Button onClick={() => navigate('/home')}>
            Proceed
          </Button>
        </ButtonContainer>

        {genres.map((genre, index) => {
          const position = positions[index] || { x: 0, y: 0, size: 50 };
          const color = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];

          return (
            <Bubble
              key={index}
              style={{
                width: position.size,
                height: position.size,
                top: position.y,
                left: position.x,
                backgroundColor: color,
              }}
              onClick={() => handleClick(genre)}
              animate={{
                x: [0, Math.random() * 10 - 5, 0],
                y: [0, Math.random() * 10 - 5, 0],
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
