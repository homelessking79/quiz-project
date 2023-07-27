import PropTypes from 'prop-types';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

const CardUtil = ({ title, content, image }) => {
  return (
    <Box component="more-info">
      <Container maxWidth="xl" style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h6"
              color="#a3826c"
              gutterBottom
              marginBottom="1.5rem"
              fontSize="calc(1.6 * 1rem)">
              {title}
            </Typography>
            <div>{content}</div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img width="100%" src={image}></img>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

CardUtil.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  image: PropTypes.string.isRequired
};

export default CardUtil;
