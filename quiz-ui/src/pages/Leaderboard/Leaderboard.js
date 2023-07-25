import React from 'react';
import LeaderboardTable from './components/LeaderboardTable';
import styles from './Leaderboard.module.scss';
import Paper from '@mui/material/Paper';

const Leaderboard = () => {
  return (
    <Paper elevation={0} className={styles.home}>
      <h3 className={styles.mainTitle}>LEADERBOARD</h3>
      <LeaderboardTable />
    </Paper>
  );
};

export default Leaderboard;
