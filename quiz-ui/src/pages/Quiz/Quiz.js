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
// import { createFilterOptions } from '@mui/material/Autocomplete';

const universities = [
  'Alawa Primary School',
  'Anula Primary School',
  'Bakewell Primary School',
  'Bees Creek Primary School',
  'Berry Springs Primary School',
  'Bradshaw Primary School',
  'Braitling Primary School',
  'Casuarina Senior College',
  'Casuarina Street Primary School',
  'Clyde Fenton Primary School',
  'Darwin High School',
  'Darwin Middle School',
  'Driver Primary School',
  'Durack Primary School',
  'Dripstone Middle School',
  'Gillen Primary School',
  'Girraween Primary School',
  'Gray Primary School',
  'Howard Springs Primary School',
  'Humpty Doo Primary School',
  'Jingili Primary School',
  'Karama Primary School',
  'Katherine High School',
  'Katherine South Primary School',
  'Larapinta Primary School',
  'Larrakeyah Primary School',
  'Leanyer Primary School',
  'Ludmilla Primary School',
  'MacFarlane Primary School',
  'Malak Primary School',
  'Manunda Terrace Primary School',
  'Millner Primary School',
  'Moil Primary School',
  'Moulden Park Primary School',
  'Nakara Primary School',
  'Nhulunbuy High School',
  'Nhulunbuy Primary School',
  'Nightcliff Middle School',
  'Nightcliff Primary School',
  'Palmerston College',
  'Parap Primary School',
  'Ross Park Primary School',
  'Sadadeen Primary School',
  'Sanderson Middle School',
  'Stuart Park Primary School',
  'Taminmin College',
  'Wagaman Primary School',
  'Wanguri Primary School',
  'Woodroffe Primary School',
  'Wulagi Primary School',
  'Alice Springs School of the Air',
  'Centralian Middle School',
  'Centralian Senior College',
  'Remote Schools:',
  'Areyonga School',
  'Barunga School',
  'Batchelor Area School',
  'Belyuen School',
  'Borroloola School',
  'Bulman School',
  'Gunbalanya School',
  'Jilkminggan School',
  'Kalkaringi School',
  'Lajamanu School',
  'Maningrida School',
  'Milingimbi School',
  'Minyerri School',
  'Nganmarriyanga School',
  'Numbulwar School',
  'Nyangatjatjara College',
  'Shepherdson College',
  'Umbakumba School',
  'Warruwi School',
  'Woolaning School',
  'Yirrkala School',
  'Yuendumu School',
  'Barunga School',
  'Borroloola School',
  'Jilkminggan School',
  'Kalkaringi School',
  'Lajamanu School',
  'Nganmarriyanga School',
  'Numbulwar School',
  'Shepherdson College',
  'Warruwi School',
  'Woolaning School',
  'Alyangula Area School',
  'Gapuwiyak School',
  'Gawa Christian School',
  'Laynhapuy Homelands School',
  'Milingimbi School',
  'Nhulunbuy High School',
  'Nhulunbuy Primary School',
  'Shepherdson College',
  'Yirrkala School',
  'Areyonga School',
  'Imanpa School',
  'Ltyentye Apurte Catholic School',
  'Santa Teresa School',
  'Alekarenge School',
  'Ampilatwatja School',
  'Arlparra School',
  'Elliott School',
  'Mungkarta School',
  'Murray Downs School',
  'Rockhampton Downs School',
  'Tennant Creek High School',
  'Tennant Creek Primary School',
  'Urapunga School',
  'Wugularr School'
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
