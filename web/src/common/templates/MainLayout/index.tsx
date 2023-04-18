/* ---------- External ---------- */
import React, { PropsWithChildren } from 'react';
import {
  Box,
  Flex,
  Navbar as Sidebar,
  Drawer,
  ScrollArea,
} from '@mantine/core';
import { SpotlightProvider, SpotlightAction } from '@mantine/spotlight';
import { useMediaQuery } from '@mantine/hooks';
import {
  MdDashboard,
  MdLockOutline,
  MdOutlineAnalytics,
  MdOutlineCalendarMonth,
  MdOutlineEditNote,
  MdOutlineFilePresent,
  MdOutlineInsertChartOutlined,
  MdOutlineSettings,
} from 'react-icons/md';

/* ---------- Contexts ---------- */
import { useCommon } from '_contexts/common';

/* ---------- Common Templates ---------- */
import { Navbar } from '_common/templates/Navbar';

/* ---------- Common Components ---------- */
import { Logo } from '_common/components/Logo';
import { LinksGroup } from '_common/components/LinksGroup';

/* ---------- Styles ---------- */
import { ExpandSx, MainContentSx, MainSx, SidebarSx } from './styles';

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

const sidebar_items = [
  { label: 'Dashboard', icon: MdOutlineInsertChartOutlined },
  {
    label: 'Market news',
    icon: MdOutlineEditNote,
    links: [
      { label: 'Overview', link: '/' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' },
    ],
  },
  {
    label: 'Releases',
    icon: MdOutlineCalendarMonth,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' },
    ],
  },
  { label: 'Analytics', icon: MdOutlineAnalytics },
  { label: 'Contracts', icon: MdOutlineFilePresent },
  { label: 'Settings', icon: MdOutlineSettings },
  {
    label: 'Security',
    icon: MdLockOutline,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
];

export const MainLayout = ({ children }: PropsWithChildren) => {
  /* ---------- Hooks ---------- */
  const mobile = useMediaQuery('(max-width: 500px)');
  const {
    sidebar_opened,
    drawer_opened,
    handleToggleDrawer,
    handleToggleSidebar,
  } = useCommon();

  const renderSidebarContent = () => (
    <Sidebar.Section grow component={ScrollArea}>
      <div>
        {sidebar_items.map(item => (
          <LinksGroup {...item} key={item.label} />
        ))}
      </div>
    </Sidebar.Section>
  );

  const renderSidebar = () => (
    <Sidebar p="lg" sx={SidebarSx} aria-expanded={sidebar_opened}>
      {renderSidebarContent()}
    </Sidebar>
  );

  const renderDrawer = () => (
    <Drawer
      opened={drawer_opened}
      onClose={handleToggleDrawer}
      size="xs"
      title={
        <Sidebar.Section mt="xl" mb="sm">
          <Logo
            height="24"
            width="120"
            clickable
            onClick={handleToggleDrawer}
          />
        </Sidebar.Section>
      }
    >
      {renderSidebarContent()}
    </Drawer>
  );

  return (
    <Box sx={MainSx} component="main">
      <SpotlightProvider
        actions={[...actions]}
        cleanQueryOnClose
        shortcut={['ctrl + K', 'mod + K', '/']}
        searchPlaceholder="Search for anything"
      >
        <Flex direction="column" sx={ExpandSx} mah="100vh">
          <Navbar
            handleToggleSidebar={handleToggleSidebar}
            handleToggleDrawer={handleToggleDrawer}
          />

          <Flex sx={ExpandSx}>
            {mobile ? renderDrawer() : renderSidebar()}

            <Box sx={MainContentSx}>{children}</Box>
          </Flex>
        </Flex>
      </SpotlightProvider>
    </Box>
  );
};
