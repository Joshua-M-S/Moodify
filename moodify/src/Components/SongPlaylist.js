// src/SongPlaylist.js
import React from 'react';
import { List, ListItem, ListItemText, Container, Typography, Paper } from '@mui/material';

function SongPlaylist({ songs }) {
  return (
    <Container>
      <Paper elevation={3} sx={{ padding: '1rem', marginTop: '2rem' }}>
        <Typography variant="h6" gutterBottom>
          Your Playlist
        </Typography>
        <List>
          {songs.map((song, index) => (
            <ListItem key={index}>
              <ListItemText primary={song} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default SongPlaylist;
