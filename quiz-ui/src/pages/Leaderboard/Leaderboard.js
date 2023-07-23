import React from 'react';
import LeaderboardTable from './components/LeaderboardTable';
import styles from './Leaderboard.module.scss';
import Sheet from '@mui/joy/Sheet';

const Leaderboard = () => {
  return (
    <Sheet className={styles.home}>
      <h3 className={styles.mainTitle}>LEADERBOARD</h3>
      <LeaderboardTable />
    </Sheet>
  );
};

export default Leaderboard;
