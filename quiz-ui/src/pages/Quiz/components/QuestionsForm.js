import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getServerData } from '../../../helper/helper';
import Question from './Question';
import { formatTime } from '../../../components/Util';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
// import Card from '@mui/joy/Card';
import CircularProgress from '@mui/joy/CircularProgress';

const QuestionsForm = ({ onHandleSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes in seconds
  const [answers, setAnswers] = useState({}); // Object to store user answers
  const [answersIndex, setAnswersIndex] = useState({}); // Object to store user answers
  const [questionsLoaded, setQuestionsLoaded] = useState(false); // Track if questions are loaded
  const [loading, setLoading] = useState(true); // Track loading state
  const [x, setX] = useState(200);
  const [rotateY, setRotateY] = useState(0);
  const [isPageChanged, setIsPageChanged] = useState(false);

  useEffect(() => {
    // Fetch questions from an API or any data source
    const fetchQuestions = async () => {
      try {
        const q = await getServerData(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,
          (data) => data
        );
        setQuestions(q);
        setQuestionsLoaded(true); // Set the questionsLoaded state to true after questions are fetched
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    // Start countdown timer only when questions are loaded
    if (questionsLoaded) {
      const timerId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timerId);
            onHandleSubmit(0, answers, questions);
          }
          return prevTime - 1;
        });
      }, 1000);

      // Clean up the timer when component unmounts
      return () => {
        clearInterval(timerId);
      };
    }
  }, [questionsLoaded]);

  async function handleNextQuestion() {
    setX(200);
    setRotateY(0);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setIsPageChanged(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setIsPageChanged(false);
  }

  async function handlePreviousQuestion() {
    setX(-200);
    setRotateY(0);
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setIsPageChanged(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setIsPageChanged(false);
  }

  const handleAnswerChange = (questionId, answer, answerIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer
    }));

    setAnswersIndex((prevAnswersIndex) => ({
      ...prevAnswersIndex,
      [questionId]: answerIndex
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Submit answers to the server or perform any necessary actions
    if (onHandleSubmit) {
      onHandleSubmit(timeRemaining, answersIndex, questions);
    }
  };

  if (loading) {
    // Display a loading indicator while fetching data
    return <CircularProgress color="success" size="lg" value={31} />;
  }

  return (
    <div className="quiz-container">
      <Typography textColor="#FFA500" level="h5" noWrap={false} variant="plain">
        Weekly Question
      </Typography>
      <Stack direction="row" spacing={16}>
        <Typography color="primary" level="h6" noWrap={false} variant="plain">
          Time remaining: {formatTime(timeRemaining)}
        </Typography>
        <Typography color="neutral" level="h6" noWrap={false} variant="plain">
          {currentQuestionIndex + 1} / {questions.length}
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit}>
        {questionsLoaded && questions.length > 0 && (
          <Question
            question={questions[currentQuestionIndex]}
            onSelectedOption={(answer, answerIndex) =>
              handleAnswerChange(questions[currentQuestionIndex].id, answer, answerIndex)
            }
            answer={answers} // Pass the answer as a prop
            x={x}
            rotateY={rotateY}
          />
        )}
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
          {currentQuestionIndex === questions.length - 1 && (
            <Button
              sx={{
                width: 80
              }}
              type="submit"
              variant="solid"
              color="warning"
              disabled={currentQuestionIndex != questions.length - 1 || isPageChanged}>
              Submit
            </Button>
          )}
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
      </form>
    </div>
  );
};

QuestionsForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired
};

export default QuestionsForm;
