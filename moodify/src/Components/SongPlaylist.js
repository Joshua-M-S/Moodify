import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const SongPlaylist = ({ songs }) => {
  // Default to an empty array if songs is undefined or not an array
  const playlist = Array.isArray(songs) ? songs : [];

  return (
    <List>
      {playlist.length > 0 ? (
        playlist.map((song, index) => (
          <ListItem key={index}>
            <ListItemText primary={song.title} secondary={song.artist} />
          </ListItem>
        ))
      ) : (
        <ListItem>No songs available</ListItem>
      )}
    </List>
  );
};

export default SongPlaylist;
