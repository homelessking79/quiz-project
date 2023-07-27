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
    <BannerContainer>
      <BannerContent>
        <Typography level="h6" fontWeight="lg" color="success" sx={{ mb: 3 }}>
          National Science Quiz
        </Typography>
        <Typography level="h3" color="primary" sx={{ mb: 5 }}>
          Inspired NT Quiz Game!
        </Typography>

        <BannerDescription variant="subtitle">
          Explore the Wonders of Science Down Under! Unveiled by <strong>Inspired NT</strong>, this
          engaging quiz game immerses kids in the wonders of Australian general science,
          particularly in the Northern Territory. With <strong>20 random questions</strong> pulled
          from an expansive collection, each
          <strong> correct answer </strong>boosts your score by <strong>100 points!</strong> The
          faster you finish the quiz, the more bonus points you earn. Start your adventure now,
          learn fascinating facts and rack up those points!
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
