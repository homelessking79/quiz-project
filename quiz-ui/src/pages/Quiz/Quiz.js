import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionsForm from './components/QuestionsForm';
import { postServerData } from '../../helper/helper';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/joy/FormControl';
import styles from './Quiz.module.scss';

const universities = [
  'University 1',
  'University 2',
  'University 3'
  // Add more universities as needed
];

const Quiz = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUniversityChange = (event, newValue) => {
    setUniversity(newValue);
  };

  const handleStartGame = () => {
    if (name && university) {
      setGameStarted(true);
    } else {
      alert('Please enter your name and university.');
    }
  };

  const onHandleSubmit = (timeRemaining, answers) => {
    const data = {
      username: name,
      university: university,
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
        navigate('/Result', { state: userResult });
      } catch (error) {
        console.error('Error post result:', error);
      }
    };
    postResult();
  };

  return (
    <Box
      className={styles.home}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center">
      {!gameStarted && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="50vh">
          <div>
            <h1 className={styles.mainTitle}>QUIZY</h1>
          </div>
          <Input
            label="Name"
            placeholder="Name"
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
          <Select
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
              <em>Select University</em>
            </Option>
            {universities.map((uni) => (
              <Option key={uni} value={uni}>
                {uni}
              </Option>
            ))}
          </Select>

          <Button sx={{ marginTop: '16px' }} variant="solid" onClick={handleStartGame}>
            Start Game
          </Button>
        </Box>
      )}
      {gameStarted && <QuestionsForm onHandleSubmit={onHandleSubmit} />}
    </Box>
  );
};

export default Quiz;
