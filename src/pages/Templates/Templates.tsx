import {
  IconFileText,
  IconPencil,
  IconTextPlus,
  IconTrash,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Badge,
  Button,
  Container,
  Group,
  Table,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { ITemplate } from "../../db/schema";
import { useEffect, useState } from "react";
import { deleteTemplate, getTemplates } from "../../db/db";

const jobColors: Record<string, string> = {
  yesterday: "blue",
  today: "green",
  tomorrow: "red",
};

export default function Templates() {
  const [data, setData] = useState<ITemplate[]>([]);

  useEffect(() => {
    const templates = getTemplates();
    setData(templates);
  }, []);

  const handleDelete = (id: string) => {
    deleteTemplate(id);
    setData(getTemplates());
  };

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
        <Badge color={jobColors[item.dateCreated]} variant="light">
          {item.dateCreated}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.variables.length}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <Tooltip label="Create message">
            <ActionIcon
              component={Link}
              to={`/draft/${item.id}`}
              variant="subtle"
              color="gray"
            >
              <IconFileText size={16} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Edit template">
            <ActionIcon
              component={Link}
              to={`/edit/${item.id}`}
              variant="subtle"
              color="gray"
            >
              <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete template">
            <ActionIcon
              onClick={() => handleDelete(item.id)}
              variant="subtle"
              color="red"
            >
              <IconTrash size={16} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="lg">
      <Group mt={-60} mb={30}>
        <Title>Templates</Title>
        <Tooltip label="Add new template">
          <Button
            component={Link}
            to="/add-template"
            rightSection={<IconTextPlus size={20} stroke={1.5} />}
            variant="light"
          >
            Add
          </Button>
        </Tooltip>
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
