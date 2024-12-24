import { useParams } from "react-router-dom";
import { getTemplate } from "../../db/db";
import {
  Button,
  Container,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import { useEffect, useState, useRef } from "react";
import { ITemplate } from "../../db/schema";
import TurndownService from "turndown";
const htmlToMarkdown = new TurndownService();

function Draft() {
  const { id } = useParams();
  const contentRef = useRef<HTMLDivElement>(null);

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

  const renderedContent = template
    ? template.content.replace(/{{(.*?)}}/g, (_, variable) => {
        const value = fieldValues[variable] || `{{${variable}}}`;
        return `<span style="color: ${
          fieldValues[variable] ? "green" : "green"
        };">${value}</span>`;
      })
    : "";

  const handleCopyContent = () => {
    if (contentRef.current) {
      const range = document.createRange();
      range.selectNode(contentRef.current);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Failed to copy content: ", err);
      }
      selection?.removeAllRanges();
    }
  };

  const handleTranslate = () => {
    if (contentRef.current) {
      const markdown = htmlToMarkdown.turndown(contentRef.current.innerHTML);
      navigator.clipboard.writeText(markdown);
    }
  };

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
    <Container size="lg">
      <Group mt={-80} mb={30}>
        <Title size="xl">{template.title}</Title>
        <Button variant="light" onClick={handleCopyContent}>
          Copy Content
        </Button>
        <Button variant="light" onClick={handleTranslate}>
          Copy Markdown
        </Button>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Paper shadow="sm" withBorder px={20} mb={60}>
          <div
            ref={contentRef}
            dangerouslySetInnerHTML={{
              __html: renderedContent,
            }}
          />
        </Paper>
        <Grid gutter="md">
          <Grid.Col>
            <Paper shadow="sm" px={20}>
              {Object.keys(fieldValues).map((variable) => (
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
