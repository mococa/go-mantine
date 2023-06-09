/* ---------- External ---------- */
import React from 'react';
import {
  Avatar,
  Box,
  Button,
  ChevronIcon,
  Flex,
  Indicator,
  Kbd,
  Menu,
  Paper,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import Link from 'next/link';
import { useOs, useMediaQuery } from '@mantine/hooks';
import { useSpotlight } from '@mantine/spotlight';
import {
  MdBrush,
  MdDehaze,
  MdLogout,
  MdNotifications,
  MdPerson,
  MdSearch,
} from 'react-icons/md';

/* ---------- Common Components ---------- */
import { Logo } from '_common/components/Logo';

/* ---------- Contexts ---------- */
import { useAuth } from '_contexts/auth';

/* ---------- Hooks ---------- */
import { useResetContexts } from '_hooks/resetContexts';

/* ---------- Styles ---------- */
import {
  KbdContainerSx,
  LogoWrapperSx,
  MenuItemSx,
  MobileInvisibleSx,
  NavbarSx,
  NotificationsButtonSx,
  SearchboxSx,
  SearchboxWrapperSx,
} from './styles';

/* ---------- Interfaces ---------- */
interface Props {
  handleToggleSidebar: () => void;
  handleToggleDrawer: () => void;
}

export const Navbar = ({ handleToggleSidebar, handleToggleDrawer }: Props) => {
  /* ---------- Hooks ---------- */
  const mobile = useMediaQuery('(max-width: 500px)');
  const os = useOs();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { openSpotlight } = useSpotlight();
  const { user } = useAuth();
  const { handleLogout } = useResetContexts();

  /* ---------- Renderers ---------- */
  const renderSearchBox = () => (
    <Flex sx={SearchboxWrapperSx}>
      <Paper
        withBorder
        sx={[SearchboxSx, MobileInvisibleSx]}
        onClick={openSpotlight}
      >
        <Flex align="center" gap="xs">
          <MdSearch color="gray" size={16} />

          <Text size="sm" mt={1} color="gray.6">
            Search
          </Text>

          <Box sx={KbdContainerSx}>
            <Kbd>{os === 'macos' ? '⌘' : 'Ctrl'}</Kbd>+<Kbd>K</Kbd>
          </Box>
        </Flex>
      </Paper>

      <Button color="gray" variant="subtle" onClick={openSpotlight}>
        <MdSearch color="inherit" size={18} />
      </Button>
    </Flex>
  );

  const renderUserMenuDropdown = () => (
    <Menu.Dropdown>
      <Menu.Label>Account</Menu.Label>
      <Link href="/profile">
        <Menu.Item icon={<MdPerson />} sx={MenuItemSx}>
          Profile
        </Menu.Item>
      </Link>

      <Menu.Divider />

      <Menu.Label>Theme</Menu.Label>
      <Menu.Item
        icon={<MdBrush />}
        sx={MenuItemSx}
        onClick={() => toggleColorScheme()}
      >
        Toggle theme
      </Menu.Item>

      <Menu.Label>More</Menu.Label>
      <Menu.Item
        icon={<MdLogout />}
        sx={MenuItemSx}
        onClick={() => handleLogout({ redirect_back: false })}
      >
        Logout
      </Menu.Item>
    </Menu.Dropdown>
  );

  const renderNotificationButton = () => (
    <Button
      variant="white"
      bg="transparent"
      color="gray"
      styles={{ label: { overflow: 'visible' } }}
      sx={NotificationsButtonSx}
    >
      <Indicator
        label={4}
        size={20}
        position="top-end"
        offset={5}
        pr={4}
        styles={{ common: { span: { top: 1.5 } } }}
      >
        <MdNotifications size={24} />
      </Indicator>
    </Button>
  );

  const renderUserMenu = () => (
    <Flex align="center" gap="lg">
      {renderNotificationButton()}

      <Menu shadow="md" width={200} position="bottom-end">
        <Menu.Target>
          <Flex align="center" gap="sm" style={{ cursor: 'pointer' }}>
            <Avatar radius="xl" src={user.picture?.trim()} color="gray">
              {user.full_name?.[0]}
            </Avatar>

            <Text sx={MobileInvisibleSx}>{user.full_name}</Text>

            <ChevronIcon />
          </Flex>
        </Menu.Target>

        {renderUserMenuDropdown()}
      </Menu>
    </Flex>
  );

  const renderLogoWithButton = () => (
    <Flex align="center" gap="sm" sx={LogoWrapperSx}>
      <Button
        variant="subtle"
        p="xs"
        c={colorScheme === 'light' ? 'gray' : 'gray.4'}
        onClick={mobile ? handleToggleDrawer : handleToggleSidebar}
      >
        <MdDehaze size={20} />
      </Button>

      <Logo clickable width="80" />
    </Flex>
  );

  return (
    <Paper pos="sticky" top={0} withBorder sx={NavbarSx}>
      {renderLogoWithButton()}

      {renderSearchBox()}

      {renderUserMenu()}
    </Paper>
  );
};
