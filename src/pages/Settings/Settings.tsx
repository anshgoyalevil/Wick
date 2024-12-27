import {
  Card,
  Container,
  Title,
  Text,
  useMantineTheme,
  SimpleGrid,
  UnstyledButton,
} from "@mantine/core";
import FileUpload from "../../components/SettingsPage/FileUpload";
import { IconClearAll, IconDatabaseExport } from "@tabler/icons-react";
import classes from "./Settings.module.css";
import { exportData } from "../../utils/export_import";
import { clearTemplates } from "../../db/db";

const controls = [
  {
    title: "Export Templates",
    icon: IconDatabaseExport,
    color: "violet",
    action: "export",
  },
  {
    title: "Clear All Templates",
    icon: IconClearAll,
    color: "red",
    action: "clear",
  },
];

export default function Settings() {
  const theme = useMantineTheme();

  const handleAction = (action: string) => {
    if (action === "export") {
      exportData();
    } else if (action === "clear") {
      clearTemplates();
    }
  };

  const items = controls.map((item) => {
    return (
      <UnstyledButton
        onClick={() => handleAction(item.action)}
        key={item.title}
        className={classes.item}
      >
        <item.icon color={theme.colors[item.color][6]} size={32} />
        <Text size="xs" mt={7}>
          {item.title}
        </Text>
      </UnstyledButton>
    );
  });

  return (
    <Container size="lg">
      <Title mt={-60} mb={30}>
        Settings
      </Title>
      <FileUpload />

      <Card mt={30} withBorder radius="md" className={classes.card}>
        <SimpleGrid cols={{ base: 1, lg: 2 }}>{items}</SimpleGrid>
      </Card>
    </Container>
  );
}
