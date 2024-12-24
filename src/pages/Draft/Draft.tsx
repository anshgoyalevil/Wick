import { useParams } from "react-router-dom";
import { getTemplate } from "../../db/db";
import {
  Container,
  Grid,
  Paper,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { ITemplate } from "../../db/schema";

function Draft() {
  const { id } = useParams();

  const [template, setTemplate] = useState<ITemplate | null>(null);
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchedTemplate = getTemplate(id);
    if (fetchedTemplate) {
      setTemplate(fetchedTemplate);

      const initialFieldValues = fetchedTemplate.variables.reduce(
        (acc: any, variable: string) => {
          acc[variable] = "";
          return acc;
        },
        {} as { [key: string]: string }
      );
      setFieldValues(initialFieldValues);
    }
  }, [id]);

  // Generate the rendered content by replacing placeholders with field values
  const renderedContent = template
    ? template.content.replace(
        /{{(.*?)}}/g,
        (_, variable) => fieldValues[variable] || `{{${variable}}}`
      )
    : "";

  if (!template) {
    return (
      <Container>
        <Title mt={-60} mb={30}>
          Template not found {":("}
        </Title>
      </Container>
    );
  }

  return (
    <Container>
      <Title mt={-60} mb={30}>
        {template.title}
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Paper shadow="sm" withBorder px={20}>
          <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
        </Paper>
        <Grid gutter="md">
          <Grid.Col>
            <Paper shadow="sm" px={20}>
              {template.variables.map((variable) => (
                <TextInput
                  mb={20}
                  key={variable}
                  placeholder={variable}
                  value={fieldValues[variable] || ""}
                  onChange={(event) => {
                    const newValue = event.currentTarget.value;
                    setFieldValues((prev) => ({
                      ...prev,
                      [variable]: newValue,
                    }));
                  }}
                  required
                />
              ))}
            </Paper>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}

export default Draft;
