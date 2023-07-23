/* eslint-disable no-unused-vars */
import React from 'react';
import CongratCard from './components/CongratCard';
import { useLocation } from 'react-router-dom';
import './Result.css';
import Box from '@mui/material/Box';
import styles from './Result.module.scss';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const result = location.state.userResult;
  const questions = location.state.questions;
  const navigate = useNavigate();

  const handleGoToReview = () => {
    navigate('/Review', { state: { result, questions } });
  };

  return (
    <Box
      className={styles.home}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center">
      <h1 className={styles.mainTitle}>Overall Result</h1>
      <Stack spacing={2}>
        <CongratCard
          name={result?.data?.username}
          school={result?.data?.university}
          time={result?.data?.time}
          score={result?.data?.points}
          rank={result?.rank}
        />
        <Button variant="contained" color="warning" onClick={handleGoToReview}>
          Review Answer
        </Button>
      </Stack>
    </Box>
  );
};

export default Result;
