import {
  IconFileText,
  IconPencil,
  IconTextPlus,
  IconTrash,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Badge,
  Container,
  Group,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";

const data = [
  {
    title: "LinkedIn Referral Message Template",
    variableCount: 3,
    dateCreated: "2021-01-01",
  },
];

const jobColors: Record<string, string> = {
  engineer: "blue",
  manager: "cyan",
  designer: "pink",
};

export default function Templates() {
  const rows = data.map((item) => (
    <Table.Tr key={item.title}>
      <Table.Td>
        <Group gap="sm">
          <Text fz="sm" fw={500}>
            {item.title}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge
          color={jobColors[item.dateCreated.toLowerCase()]}
          variant="light"
        >
          {item.dateCreated}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.variableCount}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconFileText size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray">
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="md">
      <Group mt={-60} mb={30}>
        <Title>Templates</Title>
        <ActionIcon
          component={Link}
          to="/add-template"
          variant="subtle"
          color="yellow"
        >
          <IconTextPlus size={80} stroke={1.5} />
        </ActionIcon>
      </Group>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Date created</Table.Th>
              <Table.Th>Variable Count</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Container>
  );
}
