/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerShopButton,
  BannerTitle
} from './banner';
import Banner from '../../../components/Logo/home_banner.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Typography from '@mui/joy/Typography';

export default function HomeCoverV2() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();

  const handleGoGame = () => {
    navigate('/Quiz');
  };

  return (
    <BannerContainer sx={{ background: 'none', padding: '20px 0' }}>
      <BannerContent>
        <Typography level="h6" fontWeight="lg" sx={{ mb: 3, color: '#A3826C' }}>
          National Science Quiz
        </Typography>
        <Typography level="h3" color="primary" sx={{ mb: 5, color: '#4E83CC' }}>
          Inspired NT Quiz Game!
        </Typography>

        <BannerDescription variant="subtitle" sx={{ fontFamily: 'InterVariable,sans-serif' }}>
          The Inspired NT STEM (Science, technology, Engineering, and Math) Quiz is here to test
          your knowledge on all things STEM in the Territory. Compete with your classmates and
          friends and maybe learn something new! Each question hass been tailored by local
          scientists to get your brain buzzing.
        </BannerDescription>

        <Button
          variant="contained"
          color="warning"
          endIcon={<ArrowForwardIcon />}
          onClick={handleGoGame}>
          Quiz Time
        </Button>
      </BannerContent>
      <BannerImage src={Banner} />
    </BannerContainer>
  );
}
