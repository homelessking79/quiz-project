import * as React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import './Question.css';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import List from '@mui/joy/List';
import Sheet from '@mui/joy/Sheet';
import ListItem from '@mui/joy/ListItem';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
// import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function Question({ question, onSelectedOption, answer, x, rotateY }) {
  const handleChange = (event) => {
    if (onSelectedOption) {
      onSelectedOption(event.target.value, question?.options.indexOf(event.target.value));
    }
  };

  // console.log(answer);
  return (
    <Sheet variant="plain">
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
          <Card variant="outlined" sx={{ width: 320 }}>
            <CardOverflow>
              <AspectRatio ratio="2">
                <img
                  src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                  srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
            </CardOverflow>
            <Box
              orientation="vertical"
              sx={{ flexWrap: 'wrap', display: 'flex', justifyContent: 'center' }}>
              <Typography level="body1">{question.question} </Typography>
              <RadioGroup value={`${answer[question.id]}` ?? ' '} onChange={handleChange}>
                <List
                  // variant="outlined"
                  sx={{
                    minWidth: 240,
                    flexWrap: 'wrap',
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                  {question?.options.map((q, i) => (
                    <ListItem
                      variant="outlined"
                      key={i}
                      sx={{ boxShadow: 'sm', bgcolor: 'background.body' }}>
                      <Radio
                        overlay
                        value={q}
                        label={q}
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
            </Box>
          </Card>
        </motion.div>
      </AnimatePresence>
    </Sheet>
  );
}

Question.propTypes = {
  question: PropTypes.object,
  onSelectedOption: PropTypes.func,
  answer: PropTypes.object,
  x: PropTypes.number,
  rotateY: PropTypes.number
};
