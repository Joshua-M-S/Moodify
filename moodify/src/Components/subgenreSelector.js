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

const BackLink = styled.a`
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

const ShowGenresButton = styled.button`
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

  const bubbleSize = 150; // Adjust to match the size in the Genre component
  const padding = 20;

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
        <ButtonContainer>
          <BackLink role="button" aria-label="Back to Main Genres" onClick={() => navigate('/')}>
            Back to Main Genres
          </BackLink>
          <ShowGenresButton onClick={() => setShowModal(true)}>
            Show Selected Genres
          </ShowGenresButton>
        </ButtonContainer>

        {subGenres.map((subGenre, index) => {
          const numCols = Math.floor(window.innerWidth / (bubbleSize + padding));
          const row = Math.floor(index / numCols);
          const col = index % numCols;
          const x = col * (bubbleSize + padding);
          const y = row * (bubbleSize + padding) + 100; // Adjust Y to leave space for buttons

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
