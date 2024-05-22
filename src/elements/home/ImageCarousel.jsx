import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true, // Habilitar el deslizamiento automático
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', position: 'relative' }}>
    <Slider {...settings}>
      {images.map((image, index) => (
        <Box key={index} sx={{ position: 'relative' }}>
          <Box
            component="img"
            src={image.src}
            alt={`slide-${index}`}
            sx={{ width: '100%', borderRadius: 2 }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparente para mejor legibilidad
              borderRadius: 2,
            }}
          >
            <Typography variant="h4">{image.text}</Typography>
          </Box>
        </Box>
      ))}
    </Slider>
  </Box>
  );
};

export default ImageCarousel;
