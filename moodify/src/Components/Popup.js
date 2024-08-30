import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PopupWrapper = styled(motion.div)`
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
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const PopupContent = styled.div`
  background: #333;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
`;

const PopupButton = styled.button`
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

const Popup = ({ isOpen, onClose, title, items }) => {
  if (!isOpen) return null;

  return (
    <PopupWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PopupContent>
        <h2>{title}</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <PopupButton onClick={onClose}>Close</PopupButton>
      </PopupContent>
    </PopupWrapper>
  );
};

export default Popup;
