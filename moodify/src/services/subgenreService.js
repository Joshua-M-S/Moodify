const fetchSubGenres = async (genre) => {
    try {
      const response = await fetch('/List of genres.txt'); // Path to your text file
      const text = await response.text();
      const subGenres = text.split('\n'); // Assuming each sub-genre is on a new line
      return subGenres.filter(subGenre => subGenre.toLowerCase().includes(genre.toLowerCase()));
    } catch (error) {
      console.error('Error fetching sub-genres:', error);
      return [];
    }
  };
  