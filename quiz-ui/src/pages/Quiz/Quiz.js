import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionsForm from './components/QuestionsForm';
import { postServerData } from '../../helper/helper';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
import Box from '@mui/joy/Box';
import styles from './Quiz.module.scss';
// import Autocomplete from '@mui/joy/Autocomplete';
import Typography from '@mui/joy/Typography';
// import Modal from '@mui/joy/Modal';
// import ModalClose from '@mui/joy/ModalClose';
// import Sheet from '@mui/joy/Sheet';
// import { createFilterOptions } from '@mui/material/Autocomplete';

// const OPTIONS_LIMIT = 100;
// const defaultFilterOptions = createFilterOptions();

const Quiz = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUniversityChange = (event) => {
    setUniversity(event.target.value);
  };

  const handleStartGame = () => {
    if (name) {
      setGameStarted(true);
    } else {
      alert('Please enter your name.');
    }
  };

  const onHandleSubmit = (timeRemaining, answers, questions) => {
    const data = {
      username: name,
      university: university || 'N/A',
      time: timeRemaining,
      answers: answers
    };
    // send this data to server

    const postResult = async () => {
      try {
        if (answers !== [] && university && !name) throw new Error("Couldn't get Result");
        const userResult = await postServerData(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`,
          data,
          (data) => data
        );
        // Redirect to result page
        navigate('/Result', { state: { userResult, questions } });
      } catch (error) {
        console.error('Error post result:', error);
      }
    };
    postResult();
  };

  // const filterOptions = (options, state) => {
  //   return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  // };

  return (
    <Box className={styles.home} display="flex" flexDirection="column" alignItems="center">
      {!gameStarted && (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <h1 className={styles.mainTitle}>National</h1>
          <h1 className={styles.mainTitle}>Science Quiz</h1>
          <Box sx={{ mt: 1, mb: 5, ml: 2, mr: 2, minWidth: 100, maxWidth: 400 }}>
            <Typography className={styles.colorContent} level="h6">
              {' '}
              {`✧ 20 minutes. 20 random questions. 100 points each question.`}
            </Typography>
            <Typography className={styles.colorContent} level="h6">
              {' '}
              {`✧ The sooner you complete, the more bonus point you get (must have at least 1 correct answer)`}
            </Typography>
          </Box>
          <Input
            label="Name"
            placeholder="Full Name"
            value={name}
            onChange={handleNameChange}
            variant="outlined"
            required
            size="lg"
            sx={{
              marginBottom: '16px',
              width: '300px',
              backgroundColor: '#fff'
            }}
          />
          <Input
            label="School / Organisation"
            placeholder="School / Organisation"
            value={university}
            onChange={handleUniversityChange}
            variant="outlined"
            required={false}
            size="lg"
            sx={{
              marginBottom: '16px',
              width: '300px',
              backgroundColor: '#fff'
            }}
          />
          {/* <Autocomplete
            placeholder="School / Organisation"
            onChange={handleUniversityChange}
            options={universities}
            // filterOptions={filterOptions}
            sx={{
              marginBottom: '16px',
              width: '300px',
              backgroundColor: '#fff'
            }}
            size="lg"
            required={false}
          /> */}
          {/* <Select
            sx={{
              marginBottom: '16px',
              width: '300px',
              backgroundColor: '#fff'
            }}
            placeholder="Select University"
            value={university}
            required
            size="lg"
            onChange={handleUniversityChange}
            variant="outlined">
            <Option value="" disabled>
              <em>Select School</em>
            </Option>
            {universities.map((uni) => (
              <Option key={uni} value={uni}>
                {uni}
              </Option>
            ))}
          </Select> */}

          <Button
            sx={{ marginTop: '16px', marginBottom: '40px' }}
            variant="solid"
            onClick={handleStartGame}>
            Start Game
          </Button>
        </Box>
      )}
      {gameStarted && <QuestionsForm onHandleSubmit={onHandleSubmit} />}
    </Box>
  );
};

export default Quiz;
