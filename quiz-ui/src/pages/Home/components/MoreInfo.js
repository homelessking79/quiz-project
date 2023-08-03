import * as React from 'react';
import { Grid } from '@mui/material';
import CardUtil from './CardUtil';
import { Box, Typography, Link } from '@mui/material';
import Sponsor from '../../../components/Logo/sponsor.png';
import img1 from '../../../components/Images/img1_nationalscienceweek2023.png';
import img2 from '../../../components/Images/img2_nationalscienceweek2023ntsponsors.png';
import img3 from '../../../components/Images/img3_affairforaustralia.jpg';
import img4 from '../../../components/Images/img4_groupmeeting.jpg';

const MoreInfo = () => {
  const content1 = (
    <div>
      <Typography variant="body1" sx={{ mb: 5 }}>
        The festival celebrates science, technology and innovation in everyday life and our future.
        It is a time to celebrate contributions of Australian scientists&apos;s to the world of
        exciting and evidence-based knowledge.
      </Typography>
      <Typography variant="body1" sx={{ mb: 5 }}>
        In the NT, events are generally delivered by universities, schools, research institutions,
        libraries and community organisations. Science Week inspires a vast array of groups from
        children to adults, and science amateurs and professionals, with an aim to encourage an
        interest in science pursuits among the general public.
      </Typography>
      <Typography variant="body1" sx={{ mb: 5 }}>
        Some very special events are happening this year, Some of our favourite events and projects
        are listed for you to the right.
      </Typography>
    </div>
  );

  const content2 = (
    <div>
      <Typography variant="body1" sx={{ mb: 5 }}>
        National Science Week makes up one of Australia&apos;s biggest festivals. Nationally and
        Territory wide a collection of events large and small are put together by individuals and
        groups.
      </Typography>
      <Typography variant="body1" sx={{ mb: 5 }}>
        Organising your own event can be as simple as registering for a workplace morning tea. Or on
        a larger scale; coordinating a school science fair, hosting a guest speaker or an open day.
      </Typography>
      <Typography variant="body1" sx={{ mb: 5 }}>
        There are many opportunities for individuals to engage with events during National Science
        Week. You can search for events as they are added to our Events Calendar.
      </Typography>
    </div>
  );

  const content3 = (
    <div>
      <Typography variant="body1" sx={{ mb: 5 }}>
        National Science Week is coordinated by a committee that is made up of volunteers who
        contribute to ideas and the coordination of major Science Week events in the Northern
        Territory. The National Science Week NT Coordination Committee also administer the Community
        Grants NT Program, aimed to assist a selected STEM Outreach professionals and organisations
        financially to deliver events during National Science Week.
      </Typography>
      <Typography variant="body1" sx={{ mb: 5 }}>
        The Committee are also responsible for the delivery of a major event during National Science
        Week in the NT, and supporting marketing and promotional activity.
      </Typography>
      <Typography variant="body1" sx={{ mb: 5 }}>
        If you are interested in being a part of the National Science Week NT Coordination
        Committee, please {`contact `}
        <Link href={`mailto:carla.eisemberg@cdu.edu.au`} underline="always">
          {`carla.eisemberg@cdu.edu.au`}
        </Link>
      </Typography>
    </div>
  );
  return (
    <Grid>
      <Typography
        variant="h3"
        color="#a3826c"
        sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', mb: 3, mt: 3 }}>
        {' '}
        The Inspired NT Quiz is proudly sponsored by
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', mb: 3, mt: 3 }}>
        <img width="60%" style={{ margin: 'auto' }} src={Sponsor}></img>
      </Box>
      <Typography
        variant="h3"
        color="#a3826c"
        sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', mb: 3, mt: 3 }}>
        {' '}
        National Science Week
      </Typography>
      <CardUtil
        title="About Science Week in the NT"
        image={img1}
        content={content1}
      />

      <Box mt={5} display="flex">
        <img
          width="75%"
          style={{ margin: 'auto' }}
          src={img2}></img>
      </Box>

      <CardUtil
        title="Get Involved"
        image={img3}
        content={content2}
      />

      <CardUtil
        title="National Science Week Committee"
        image={img4}
        content={content3}
      />
    </Grid>
  );
};

export default MoreInfo;
