import React, { useEffect, useState } from 'react';
import { getServerData } from '../../../helper/helper';
import { formatTime } from '../../../components/Util';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import gold from '../../../components/Icons/gold.png';
import silver from '../../../components/Icons/silver.png';
import bronze from '../../../components/Icons/bronze.png';
import white from '../../../components/Icons/white.png';

function TruncatedName(name) {
  let truncatedName = name;
  if (name && name.length > 50) {
    truncatedName = name.substring(0, 25) + '...';
  }

  return truncatedName;
}

const LeaderboardTable = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const totalPages =
    Math.floor(results.length / rowsPerPage) + (results.length % rowsPerPage === 0 ? 0 : 1);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Make a fetch request to the server to get the results
        const data = await getServerData(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`,
          (data) => data
        );
        setLoading(false);
        if (data.length < 1) {
          return;
        }

        const sortedResults = data.sort((a, b) => {
          if (b.points !== a.points) {
            return b.points - a.points; // Sort by points in descending order
          }
          if (a.time !== b.time) {
            // Convert time strings to Date objects for comparison
            const timeA = new Date(a.time);
            const timeB = new Date(b.time);

            return timeB - timeA; // Sort by time in ascending order
          }
          return a.username.localeCompare(b.username); // Sort by username in ascending order
        });

        // create effect loading
        const timer = setTimeout(() => {
          setResults(sortedResults);
        }, 1000);
        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - results.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer>
      <Table
        sx={{
          margin: 'auto',
          width: '85%',
          minWidth: 650,
          border: 'solid 3px #fff',
          height: '100%'
        }}
        size="medium"
        aria-label="leaderboard table">
        <TableHead>
          <TableRow sx={{ borderBottom: 'solid 2px #fff', bgcolor: '#9A18B9' }}>
            <TableCell
              align="left"
              sx={{
                fontWeight: 'bold',
                width: '10%',
                color: '#fff',
                fontSize: '17px !important',
                paddingLeft: '25px'
              }}>
              Position
            </TableCell>
            <TableCell
              align="left"
              sx={{
                fontWeight: 'bold',
                width: '10%',
                color: '#fff',
                fontSize: '17px !important'
              }}>
              Name
            </TableCell>
            <TableCell
              align="left"
              sx={{
                fontWeight: 'bold',
                width: '10%',
                color: '#fff',
                fontSize: '17px !important'
              }}>
              School / Organisation
            </TableCell>
            <TableCell
              align="left"
              sx={{
                fontWeight: 'bold',
                width: '10%',
                color: '#fff',
                fontSize: '17px !important'
              }}>
              Score
            </TableCell>
            <TableCell
              align="left"
              sx={{
                fontWeight: 'bold',
                width: '10%',
                color: '#fff',
                fontSize: '17px !important'
              }}>
              Time
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {!results || results.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ bgcolor: '#fff' }}>
                {loading ? <CircularProgress color="secondary" /> : 'There is no data to display'}
              </TableCell>
            </TableRow>
          ) : (
            (rowsPerPage > 0
              ? results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : results
            ).map((result, index) => (
              <TableRow
                key={index}
                sx={{
                  bgcolor: index % 2 == 1 ? '#ECEFF4' : '#F9F9F9',
                  borderBottom: 'solid 2px #fff'
                }}>
                <TableCell
                  align="left"
                  height="30px"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '15px !important',
                    paddingBottom: '25px',
                    paddingLeft: page * rowsPerPage + index == 9 ? '20px' : '30px'
                  }}>
                  {page * rowsPerPage + index + 1}{' '}
                  <img
                    src={
                      page * rowsPerPage + index == 0
                        ? gold
                        : page * rowsPerPage + index == 1
                        ? silver
                        : page * rowsPerPage + index == 2
                        ? bronze
                        : page * rowsPerPage + index < rowsPerPage
                        ? white
                        : ''
                    }
                    height="35px"
                    style={{ marginBottom: '-10px' }}
                  />
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold', paddingLeft: '20px' }}>
                  <Tooltip title={result.username} placement="top">
                    <span>{TruncatedName(result.username)}</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold', paddingLeft: '20px' }}>
                  <Tooltip title={result.university} placement="top">
                    <span>{TruncatedName(result.university)}</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="left" sx={{ paddingLeft: '20px' }}>
                  <span style={{ fontWeight: 'bold' }}>{result.points}</span> pts
                </TableCell>
                <TableCell align="left" sx={{ paddingLeft: '20px' }}>
                  {formatTime(1200 - result.time)}
                </TableCell>
              </TableRow>
            ))
          )}
          {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={5} />
            </TableRow>
          )} */}
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 2 }}>
        <Stack spacing={5}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(event, newPage) => handleChangePage(event, newPage - 1)}
            color="secondary"
          />
        </Stack>
      </Box>
    </TableContainer>
  );
};

export default LeaderboardTable;
