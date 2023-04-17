/* ---------- External ---------- */
import React, { useEffect, useState } from 'react';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { MdChevronRight } from 'react-icons/md';
import Link from 'next/link';
import { IconType } from 'react-icons';

/* ---------- Contexts ---------- */
import { useCommon } from '_contexts/common';

/* ---------- Styles ---------- */
import { SidebarButtonSx, SidebarChevronStyles, SidebarLinkSx } from './styles';

/* ---------- Interfaces ---------- */
interface LinksGroupProps {
  icon: IconType;
  label: string;
  default_opened?: boolean;
  links?: { label: string; link: string }[];
}

export const LinksGroup = ({
  icon: Icon,
  label,
  default_opened = false,
  links,
}: LinksGroupProps) => {
  /* ---------- Hooks ---------- */
  const { drawer_opened, sidebar_opened } = useCommon();

  /* ---------- States ---------- */
  const [opened, setOpened] = useState<boolean>(default_opened);

  /* ---------- Constants ---------- */
  const has_links = Array.isArray(links);

  const items = (has_links ? links : []).map(({ link, label: link_label }) => (
    <Link href={link} key={link_label}>
      <Text sx={SidebarLinkSx}>{link_label}</Text>
    </Link>
  ));

  /* ---------- Effects ---------- */
  useEffect(() => {
    if (!sidebar_opened) setOpened(false);
  }, [sidebar_opened]);

  useEffect(() => {
    if (!drawer_opened) setOpened(false);
  }, [drawer_opened]);

  return (
    <>
      <UnstyledButton onClick={() => setOpened(o => !o)} sx={SidebarButtonSx}>
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={38}>
              <Icon size="1.25rem" />
            </ThemeIcon>

            <Box ml="md">{label}</Box>
          </Box>

          {has_links && (
            <MdChevronRight
              size="1rem"
              stroke="1.5"
              style={{
                ...SidebarChevronStyles,
                transform: opened ? `rotate(90deg)` : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>

      {has_links ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
};
