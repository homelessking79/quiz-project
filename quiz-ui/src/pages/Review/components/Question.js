import * as React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Card from '@mui/joy/Card';
// import Box from '@mui/joy/Box';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function Question({ question, onSelectedOption, answer, x, rotateY, systemAnswer }) {
  const handleChange = (event) => {
    if (onSelectedOption) {
      onSelectedOption(event.target.value, question?.options.indexOf(event.target.value));
    }
  };

  // console.log(answer);
  // console.log(systemAnswer);
  // console.log(question.id);
  // console.log(question?.options);
  // console.log('User ans');
  // console.log(question?.options[answer[question.id]]);
  // console.log('System ans');
  // console.log(question?.options[systemAnswer[question.id]]);

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
                  // src={`https://imagedelivery.net/GuOwov7MQf3_QpmVBqSw5A/${question.imgUrl}/public`}
                  src={`https://img.inspiredntquiz.net/${question.imgUrl}`}
                  loading="lazy"
                  alt={`${question.imgUrl}`}
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }} orientation="veritcal">
              <Typography level="body-xs">{question.question} </Typography>
              <RadioGroup
                sx={{ maxWidth: 260, height: 'auto', minWidth: 200 }}
                value={`${question?.options[answer[question.id]]}` ?? ' '}
                onChange={handleChange}>
                <List>
                  {question?.options.map((q, i) => (
                    <ListItem
                      variant="outlined"
                      key={i}
                      sx={{
                        boxShadow: 'sm',
                        bgcolor: 'background.body',
                        ...(systemAnswer[question.id] === i && {
                          border: '2px solid',
                          borderColor:
                            answer[question.id] === systemAnswer[question.id]
                              ? 'green !important' // Green border for matching answers
                              : 'red !important' // Red border for non-matching answers
                        })
                      }}>
                      <Radio
                        // overlay
                        sx={{ flexGrow: 1, textAlign: 'left' }}
                        value={q}
                        label={q}
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
  rotateY: PropTypes.number,
  systemAnswer: PropTypes.object
};
