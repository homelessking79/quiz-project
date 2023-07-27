import * as React from 'react';
import { Grid } from '@mui/material';
import CardUtil from './CardUtil';
import { Box, Typography, Link } from '@mui/material';

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
        sx={{ display: 'flex', justifyContent: 'center', mb: 3, mt: 3 }}>
        {' '}
        National Science Week
      </Typography>
      <CardUtil
        title="About Science Week in the NT"
        image="https://images.squarespace-cdn.com/content/v1/5e7edd655234e75594647807/bbc71afb-3606-40b6-b625-86228750b672/2023+Science+Week+Program+-+special+events+-+public+%281%29.png"
        content={content1}
      />

      <Box mt={5} display="flex">
        <img
          width="75%"
          style={{ margin: 'auto' }}
          src="https://images.squarespace-cdn.com/content/v1/5e7edd655234e75594647807/bd9dcfbe-9637-487d-868a-0d1b32bcc771/SCIENCE+WEEK+SPONSORS+banner+thin.png"></img>
      </Box>

      <CardUtil
        title="Get Involved"
        image="https://images.squarespace-cdn.com/content/v1/5e7edd655234e75594647807/1585982031988-LOU4C0D0XNC5QVBWN6IR/DSC_3387.jpg"
        content={content2}
      />

      <CardUtil
        title="National Science Week Committee"
        image="https://images.squarespace-cdn.com/content/v1/5e7edd655234e75594647807/1591417431889-8GJ7C3PCDK6OZS168BDV/2019-09-26+10.53.32.jpg"
        content={content3}
      />
    </Grid>
  );
};

export default MoreInfo;
