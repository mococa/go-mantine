/* ---------- External ---------- */
import React, { PropsWithChildren } from 'react';
import { Box, Flex } from '@mantine/core';
import { SpotlightProvider, SpotlightAction } from '@mantine/spotlight';
import { useMediaQuery } from '@mantine/hooks';
import { MdDashboard } from 'react-icons/md';

/* ---------- Common Components ---------- */
import { Navbar } from '_common/templates/Navbar';

/* ---------- Styles ---------- */
import { MainSx } from './styles';

/* ---------- Constants ---------- */
const actions: SpotlightAction[] = [
  {
    title: 'Dashboard',
    description: 'Get full information about current system status',
    // eslint-disable-next-line no-console
    onTrigger: () => console.log('Dashboard'),
    icon: <MdDashboard size={18} />,
  },
];

export const MainLayout = ({ children }: PropsWithChildren) => {
  /* ---------- Hooks ---------- */
  const mobile = useMediaQuery('(max-width: 500px)');

  return (
    <Box sx={MainSx} component="main">
      <SpotlightProvider
        actions={[...actions]}
        cleanQueryOnClose
        shortcut={['ctrl + K']}
        searchPlaceholder="Search for anything"
      >
        <Flex direction="column" style={{ flex: 1, overflow: 'auto' }} h="100%">
          <Navbar />

          <Box p={mobile ? 12 : 32}>{children}</Box>
        </Flex>
      </SpotlightProvider>
    </Box>
  );
};
