import * as React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import './Question.css';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import List from '@mui/joy/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/joy/ListItem';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
// import Banner from '../../../components/Logo/1.png';

export default function Question({ question, onSelectedOption, answer, x, rotateY }) {
  const handleChange = (event) => {
    if (onSelectedOption) {
      onSelectedOption(event.target.value, question?.options.indexOf(event.target.value));
    }
  };

  // console.log(answer);
  return (
    <Paper elevation={0}>
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id} // Use a unique key for each question
          initial={{ opacity: 0, x }} // Initial animation values
          animate={{ opacity: 1, x: 0 }} // Animation values when the question is in view
          exit={{ opacity: 0, x: 0, rotateX: 60, rotateY }} // Animation values when transitioning out of view
          transition={{
            duration: 1,
            ease: [0.4, 0, 0.2, 1] // Custom easing function for smoother motion
          }}>
          <Card variant="outlined" sx={{ width: 350, height: 'auto' }}>
            <CardOverflow>
              <AspectRatio ratio="2">
                <img
                  // src={`${process.env.PUBLIC_URL}/images/quiz/${question.imgUrl}`}
                  src={`https://imagedelivery.net/GuOwov7MQf3_QpmVBqSw5A/${question.imgUrl}/public`}
                  srcSet={`https://imagedelivery.net/GuOwov7MQf3_QpmVBqSw5A/${question.imgUrl}/public`}
                  // src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                  // srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                  loading="lazy"
                  alt={`${question.imgUrl}`}
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }} orientation="veritcal">
              <Typography level="body-xs">{question.question} </Typography>
              <RadioGroup
                sx={{ maxWidth: 260, height: 'auto', minWidth: 200 }}
                value={`${answer[question.id]}` ?? ' '}
                onChange={handleChange}>
                <List>
                  {question?.options.map((q, i) => (
                    <ListItem
                      variant="outlined"
                      key={i}
                      sx={{ boxShadow: 'sm', bgcolor: 'background.body' }}>
                      <Radio
                        overlay
                        value={q}
                        label={q}
                        sx={{ flexGrow: 1, textAlign: 'left' }}
                        slotProps={{
                          action: ({ checked }) => ({
                            sx: (theme) => ({
                              ...(checked && {
                                inset: -1,
                                border: '2px solid',
                                borderColor: theme.vars.palette.primary[500]
                              })
                            })
                          })
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </RadioGroup>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </Paper>
  );
}

Question.propTypes = {
  question: PropTypes.object,
  onSelectedOption: PropTypes.func,
  answer: PropTypes.object,
  x: PropTypes.number,
  rotateY: PropTypes.number
};
