// src/components/SubGenres.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelectedGenres } from '../context/selectedGenresContext';
import SelectedGenresModal from './SelectedGenresModal';

const Bubble = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  transition: transform 0.3s ease, background-color 0.3s ease;
  transform-origin: center;
  padding: 10px;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.3);
  }
`;

const BubblesContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: #001f3f;
  padding: 20px;
`;

const BackLink = styled.a`
  position: absolute;
  top: 20px;
  left: 20px;
  color: #fff;
  font-size: 18px;
  text-decoration: none;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const ShowGenresButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  color: #fff;
  font-size: 18px;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Popup = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  z-index: 1000;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const SubGenres = () => {
  const [subGenres, setSubGenres] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const { genre } = useParams();
  const navigate = useNavigate();
  const { selectedGenres, addGenre, removeGenre } = useSelectedGenres();

  useEffect(() => {
    const fetchSubGenres = async () => {
      try {
        const response = await fetch('/List of genres.txt');
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();

        const cleanedText = text.replace(/['\[\]"]/g, '');

        const allSubGenres = cleanedText.split(',').map(subGenre => subGenre.trim());

        const filteredSubGenres = allSubGenres.filter(subGenre => subGenre.toLowerCase().includes(genre.toLowerCase()));

        setSubGenres(filteredSubGenres);
      } catch (error) {
        console.error('Error fetching sub-genres:', error.message);
        setSubGenres([]);
      }
    };

    fetchSubGenres();
  }, [genre]);

  const bubbleSize = 250;
  const padding = 20;
  const buttonHeight = 50;

  const handleBubbleClick = (subGenre) => {
    addGenre(subGenre);
    setPopupMessage(`You have chosen "${subGenre}"`);
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 2000); // Hide popup after 2 seconds
  };

  const handleModalClose = () => setShowModal(false);

  const handleDeleteGenre = (genre) => {
    removeGenre(genre);
  };

  return (
    <>
      {showModal && (
        <SelectedGenresModal
          selectedGenres={selectedGenres}
          onDelete={handleDeleteGenre}
          onClose={handleModalClose}
        />
      )}

      <Popup visible={popupVisible}>{popupMessage}</Popup>

      <BubblesContainer>
        <ShowGenresButton onClick={() => setShowModal(true)}>
          Show Selected Genres
        </ShowGenresButton>
        <BackLink role="button" aria-label="Back to Main Genres" onClick={() => navigate('/')}>
          Back to Main Genres
        </BackLink>
        {subGenres.map((subGenre, index) => {
          const numCols = Math.floor(window.innerWidth / (bubbleSize + padding));
          const row = Math.floor(index / numCols);
          const col = index % numCols;
          const x = col * (bubbleSize + padding);
          const y = row * (bubbleSize + padding) + buttonHeight + 30;

          const isSelected = selectedGenres.includes(subGenre);
          const color = isSelected ? '#FF5733' : `#${Math.floor(Math.random() * 16777215).toString(16)}`;

          return (
            <Bubble
              key={index}
              style={{
                width: bubbleSize,
                height: bubbleSize,
                top: y,
                left: x,
                backgroundColor: color,
              }}
              animate={{
                x: [0, Math.random() * 10 - 5, 0],
                y: [0, Math.random() * 10 - 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              onClick={() => handleBubbleClick(subGenre)}
            >
              {subGenre}
            </Bubble>
          );
        })}
      </BubblesContainer>
    </>
  );
};

export default SubGenres;
