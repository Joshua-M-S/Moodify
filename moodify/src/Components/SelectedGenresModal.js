// src/components/SelectedGenresModal.js

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  color: #000;
  border-radius: 8px;
  padding: 20px;
  max-width: 80vw;
  max-height: 80vh;
  overflow-y: auto;
  text-align: center;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const GenreList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
  text-align: left;
`;

const GenreItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const DeleteButton = styled.button`
  background: #dc3545;
  border: none;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;

const formatGenre = (genre) => {
  // Use regex to insert underscores before capital letters or between lowercase and uppercase letters
  return genre.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};

const SelectedGenresModal = ({ selectedGenres, onClose, onDelete }) => {
  return (
    <ModalBackdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ModalContent>
        <h2>Selected Genres</h2>
        <GenreList>
          {selectedGenres.map((genre, index) => (
            <GenreItem key={index}>
              {formatGenre(genre)}
              <DeleteButton onClick={() => onDelete(genre)}>Delete</DeleteButton>
            </GenreItem>
          ))}
        </GenreList>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default SelectedGenresModal;
