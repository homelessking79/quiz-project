import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionsForm from './components/QuestionsForm';
import { postServerData } from '../../helper/helper';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
import Box from '@mui/joy/Box';
import inspiredNt_logo_trans from '../../components/Logo/inspiredNt_logo_trans-resize-removebg-preview.png';
import styles from './Quiz.module.scss';
import Autocomplete from '@mui/joy/Autocomplete';
import Typography from '@mui/joy/Typography';
// import Modal from '@mui/joy/Modal';
// import ModalClose from '@mui/joy/ModalClose';
// import Sheet from '@mui/joy/Sheet';
// import { createFilterOptions } from '@mui/material/Autocomplete';

const universities = [
  'Alawa Primary School',
  'Alekarenge School',
  'Alice Springs School of the Air',
  'Alyangula Area School',
  'Ampilatwatja School',
  'Anula Primary School',
  'Areyonga School',
  'Arlparra School',
  'Bakewell Primary School',
  'Barunga School',
  'Batchelor Area School',
  'Bees Creek Primary School',
  'Belyuen School',
  'Berry Springs Primary School',
  'Borroloola School',
  'Bradshaw Primary School',
  'Braitling Primary School',
  'Bulman School',
  'Casuarina Senior College',
  'Casuarina Street Primary School',
  'Centralian Middle School',
  'Centralian Senior College',
  'Clyde Fenton Primary School',
  'Darwin High School',
  'Darwin Middle School',
  'Dripstone Middle School',
  'Driver Primary School',
  'Durack Primary School',
  'Elliott School',
  'Gapuwiyak School',
  'Gawa Christian School',
  'Gillen Primary School',
  'Girraween Primary School',
  'Gray Primary School',
  'Gunbalanya School',
  'Howard Springs Primary School',
  'Humpty Doo Primary School',
  'Imanpa School',
  'Jilkminggan School',
  'Jingili Primary School',
  'Kalkaringi School',
  'Karama Primary School',
  'Katherine High School',
  'Katherine South Primary School',
  'Lajamanu School',
  'Larapinta Primary School',
  'Larrakeyah Primary School',
  'Laynhapuy Homelands School',
  'Leanyer Primary School',
  'Ltyentye Apurte Catholic School',
  'Ludmilla Primary School',
  'MacFarlane Primary School',
  'Malak Primary School',
  'Maningrida School',
  'Manunda Terrace Primary School',
  'Milingimbi School',
  'Millner Primary School',
  'Minyerri School',
  'Moil Primary School',
  'Moulden Park Primary School',
  'Mungkarta School',
  'Murray Downs School',
  'Nakara Primary School',
  'Nganmarriyanga School',
  'Nhulunbuy High School',
  'Nhulunbuy Primary School',
  'Nightcliff Middle School',
  'Nightcliff Primary School',
  'Numbulwar School',
  'Nyangatjatjara College',
  'Palmerston College',
  'Parap Primary School',
  'Remote Schools:',
  'Rockhampton Downs School',
  'Ross Park Primary School',
  'Sadadeen Primary School',
  'Sanderson Middle School',
  'Santa Teresa School',
  'Shepherdson College',
  'Stuart Park Primary School',
  'Taminmin College',
  'Tennant Creek High School',
  'Tennant Creek Primary School',
  'Umbakumba School',
  'Urapunga School',
  'Wagaman Primary School',
  'Wanguri Primary School',
  'Warruwi School',
  'Woodroffe Primary School',
  'Woolaning School',
  'Wugularr School',
  'Wulagi Primary School',
  'Yirrkala School',
  'Yuendumu School'
];

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

  const onHandleSubmit = (timeRemaining, answers, questions) => {
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
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="50vh">
          <img src={inspiredNt_logo_trans} alt="Logo" className={styles.quizImage} />
          <h1 className={styles.mainTitle}>Science Quiz</h1>
          <Box sx={{ mt: 1, mb: 5, minWidth: 100, maxWidth: 400 }}>
            <Typography className={styles.colorContent} level="h6">
              {' '}
              {`\u2022 20 minutes. 20 random questions. 100 points each question.`}
            </Typography>
            <Typography className={styles.colorContent} level="h6">
              {' '}
              {`\u2022 The sooner you complete , the more bonus point you get (must have at least 1 correct answer)`}
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
          <Autocomplete
            placeholder="Select School"
            onChange={handleUniversityChange}
            options={universities}
            // filterOptions={filterOptions}
            sx={{
              marginBottom: '16px',
              width: '300px',
              backgroundColor: '#fff'
            }}
            size="lg"
          />
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
