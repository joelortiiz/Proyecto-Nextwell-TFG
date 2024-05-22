import React from 'react';
import { Link } from 'react-router-dom'; 
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import './Card.css'
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: '10px', 
  backgroundColor: 'gray',
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 140,
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    '& p': { // Estilos para los párrafos dentro del CardContent
      textDecoration: 'none', // Quitar la decoración del texto
      color: 'white', // Heredar el color de texto
    },
  }));

function Cards({ cardsData }) {
  return (
    <Box sx={{ flexGrow: 1, padding: 1 }}>
    <Grid container spacing={1} justifyContent="center">
      {cardsData.map((card, index) => (
        <Grid
          item
          key={index}
          xs={12}
          sm={6}
          md={4}
          display="flex"
          justifyContent="center"
        >
          <Link to={card.link}>
            <StyledCard>
              <StyledCardMedia
                image={card.image}
                title={card.title}
              />
              <StyledCardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" >
                  {card.description}
                </Typography>
              </StyledCardContent>
            </StyledCard>
          </Link>
        </Grid>
      ))}
    </Grid>
  </Box>
  );
}

export default Cards;
