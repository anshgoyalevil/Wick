import { Box, Burger, Divider, Drawer, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import ColorSchemeToggle from "./ColorSchemeToggle/ColorSchemeToggle";

export default function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const links = [
    { title: "Home", to: "/" },
    { title: "Templates", to: "/templates" },
    { title: "Contact", to: "/contact" },
  ];

  const items = links.map((link) => (
    <Link key={link.to} to={link.to} className={classes.link}>
      {link.title}
    </Link>
  ));

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group h="100%" gap={0} visibleFrom="sm">
            {items}

          </Group>
            <ColorSchemeToggle />

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          {items}

        </ScrollArea>
      </Drawer>
    </Box>
  );
}
