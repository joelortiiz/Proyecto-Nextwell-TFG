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
    <Grid container spacing={1} >
      {cardsData.map((card, index) => (
        <Grid
          item
          key={index}
          xs={12}
          sm={6}
          md={4}
        >
          <Link to={card.link}>
            <StyledCard>
              <StyledCardMedia
                image={card.image}
                title={card.title}
              />
              <div className='a'>
              <p>
                  {card.title}
                  </p>
                <Typography variant="body2" >
                  {card.description}
                </Typography>
              </div>
            </StyledCard>
          </Link>
        </Grid>
      ))}
    </Grid>
  </Box>
  );
}

export default Cards;
