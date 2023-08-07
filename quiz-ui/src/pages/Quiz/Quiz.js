import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionsForm from './components/QuestionsForm';
import { postServerData, getServerData } from '../../helper/helper';
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
  const [appState, setAppState] = useState();
  const [loading, setLoading] = useState(true); // Track loading state

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

  useEffect(() => {
    // Fetch questions from an API or any data source
    const fetchAppState = async () => {
      try {
        const appData = await getServerData(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/appstate`,
          (data) => data
        );
        setAppState(appData[0]);
        // console.log(appData);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };
    fetchAppState();
  }, []);

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

  const renderInputForm = () => {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Typography className={styles.colorContent} level="h6">
          {' '}
          {`✧ 20 minutes. 20 random questions. 100 points each question.`}
        </Typography>
        <Typography className={styles.colorContent} level="h6">
          {' '}
          {`✧ The sooner you complete, the more bonus point you get (must have at least 1 correct answer)`}
        </Typography>
        <Input
          label="Name"
          placeholder="Full Name"
          value={name}
          onChange={handleNameChange}
          variant="outlined"
          required
          size="lg"
          sx={{
            marginTop: '25px',
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
    );
  };

  const renderTheTextQuizWillStart = () => {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <h5 className={styles.subTitle}>The Quiz will start soon. Hold Tight!</h5>
      </Box>
    );
  };

  const renderTheTextQuizEnd = () => {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <h5 className={styles.subTitle}>Quiz time is over! Please head to the leaderboard.</h5>
      </Box>
    );
  };

  const renderBody = () => {
    if (!loading) {
      if (appState) {
        if (appState.turnOff) {
          return <>{renderTheTextQuizEnd()}</>;
        }

        if (appState.turnOn) {
          return <>{renderInputForm()}</>;
        }

        const currentDate = new Date();
        const startDate = new Date(appState.startDate);
        const endDate = new Date(appState.endDate);

        if (currentDate >= startDate && currentDate <= endDate) {
          return <>{renderInputForm()}</>;
        }

        if (startDate > currentDate) {
          return <>{renderTheTextQuizWillStart()}</>;
        }

        if (endDate < currentDate) {
          return <>{renderTheTextQuizEnd()}</>;
        }
      }
    }
  };

  return (
    <Box className={styles.home} display="flex" flexDirection="column" alignItems="center">
      {!gameStarted && (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <h1 className={styles.mainTitle}>National</h1>
          <h1 className={styles.mainTitle}>Science Quiz</h1>
          <Box sx={{ mt: 0, mb: 0, ml: 2, mr: 2, minWidth: 100, maxWidth: 400 }}>
            {/* {renderInputForm()} */}
            {/* {renderTheTextQuizWillStart()} */}
            {/* {renderTheTextQuizEnd()} */}
            {renderBody()}
          </Box>
        </Box>
      )}
      {gameStarted && <QuestionsForm onHandleSubmit={onHandleSubmit} />}
    </Box>
  );
};

export default Quiz;
