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
} from '@mantine/core';
import Link from 'next/link';
import { useOs, useMediaQuery } from '@mantine/hooks';
import { useSpotlight } from '@mantine/spotlight';
import { MdLogout, MdNotifications, MdPerson, MdSearch } from 'react-icons/md';

/* ---------- Contexts ---------- */
import { useAuth } from '_contexts/auth';

/* ---------- Hooks ---------- */
import { useResetContexts } from '_hooks/resetContexts';

/* ---------- Styles ---------- */
import { MenuItemSx, NavbarSx } from './styles';

export const Navbar = () => {
  /* ---------- Hooks ---------- */
  const mobile = useMediaQuery('(max-width: 500px)');
  const os = useOs();
  const { openSpotlight } = useSpotlight();
  const { user } = useAuth();
  const { handleLogout } = useResetContexts();

  /* ---------- Renderers ---------- */
  const renderSearchBox = () => (
    <Paper
      withBorder
      py={4}
      px={12}
      maw={413}
      w="100%"
      style={{ cursor: 'pointer', alignSelf: 'center' }}
      onClick={openSpotlight}
    >
      <Flex align="center" gap="xs">
        <MdSearch color="gray" size={16} />

        <Text size="sm" mt={1} color="gray.6">
          Search
        </Text>

        <Box ml="auto" mb={2}>
          <Kbd>{os === 'macos' ? '⌘' : 'Ctrl'}</Kbd>+<Kbd>K</Kbd>
        </Box>
      </Flex>
    </Paper>
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

      <Menu.Label>More</Menu.Label>
      <Menu.Item
        icon={<MdLogout />}
        sx={MenuItemSx}
        onClick={() => handleLogout({ redirect: false })}
      >
        Logout
      </Menu.Item>
    </Menu.Dropdown>
  );

  const renderNotificationButton = () => (
    <Button
      radius="lg"
      p={4}
      w={36}
      variant="white"
      bg="transparent"
      color="gray"
      styles={{ label: { overflow: 'visible' } }}
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
      {!mobile && renderNotificationButton()}

      <Menu shadow="md" width={200} position="bottom-end">
        <Menu.Target>
          <Flex align="center" gap="sm" style={{ cursor: 'pointer' }}>
            <Avatar radius="xl" src={user.picture || undefined}>
              {user.full_name?.[0] || null}
            </Avatar>

            {!mobile && <Text>{user.full_name}</Text>}

            <ChevronIcon />
          </Flex>
        </Menu.Target>

        {renderUserMenuDropdown()}
      </Menu>
    </Flex>
  );

  return (
    <Paper pos="sticky" top={0} sx={NavbarSx}>
      <Flex
        p={`16px ${mobile ? 12 : 32}px 4px`}
        justify="space-between"
        gap="lg"
      >
        {renderSearchBox()}

        {renderUserMenu()}
      </Flex>
    </Paper>
  );
};
