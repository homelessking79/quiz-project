/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Question from './components/Question';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/joy/Typography';
import styles from './Review.module.scss';

const Review = () => {
  const location = useLocation();
  const result = location.state.result;
  const questions = location.state.questions;
  const userAnswers = result?.data?.result[0] || {}; // can empty, object type
  const systemAnswers = result?.data?.systemAnswers || {};

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPageChanged, setIsPageChanged] = useState(false);

  // console.log(result);
  // console.log(userAnswers);
  // console.log(systemAnswers);

  async function handleNextQuestion() {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setIsPageChanged(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setIsPageChanged(false);
  }

  async function handlePreviousQuestion() {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setIsPageChanged(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setIsPageChanged(false);
  }

  return (
    <Box
      className={styles.home}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center">
      <div className="quiz-container">
        <Stack direction="row" spacing={16}>
          <Typography textColor="#FFA500" level="h5" noWrap={false} variant="plain">
            Review Question
          </Typography>
          <Typography color="neutral" level="h6" noWrap={false} variant="plain">
            {currentQuestionIndex + 1} / {questions.length}
          </Typography>
        </Stack>
        <div className={styles.questionFormButton}>
          {questions.length > 0 && (
            <Question
              question={questions[currentQuestionIndex]}
              answer={userAnswers} // Pass the answer as a prop
              x={200}
              rotateY={0}
              systemAnswer={systemAnswers}
            />
          )}
        </div>
        <Stack sx={{ display: 'flex', justifyContent: 'center' }} direction="row" spacing={8}>
          <Button
            sx={{
              width: 80
            }}
            color="primary"
            variant="solid"
            size="md"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0 || isPageChanged}>
            Back
          </Button>
          {currentQuestionIndex !== questions.length - 1 && (
            <Button
              sx={{
                width: 80
              }}
              color="success"
              variant="solid"
              size="md"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1 || isPageChanged}>
              Next
            </Button>
          )}
        </Stack>
      </div>
    </Box>
  );
};

export default Review;
