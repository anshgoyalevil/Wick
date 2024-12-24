import { Button, Container, TextInput, Title } from "@mantine/core";
import Editor from "../../components/editor/Editor";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { v4 as uuidv4 } from "uuid";
import { addTemplate } from "../../db/db";
import { ITemplate } from "../../db/schema";
import { useNavigate } from "react-router-dom";

function AddTemplate() {
  const [templateContent, setTemplateContent] = useState("");

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
    },
  });

  const handleSubmit = (formValue: any) => {
    const newTemplate: ITemplate = {
      id: uuidv4(),
      title: formValue.title,
      content: templateContent,
      variables: [] as string[],
      dateCreated: new Date().toLocaleDateString("en-GB"),
    };

    const extractVariables = templateContent.match(/{{(.*?)}}/g);

    if (extractVariables) {
      newTemplate.variables = extractVariables.map((variable) =>
        variable.replace(/[{}]/g, "")
      );
    }

    addTemplate(newTemplate);

    navigate("/templates");
  };

  return (
    <Container size="md">
      <Title mt={-60} mb={30}>
        Add Template
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)} autoComplete="off">
        <TextInput
          mt="md"
          mb="md"
          placeholder="A nice name for your template"
          required
          {...form.getInputProps("title")}
        />
        <Editor
          content={templateContent}
          setTemplateContent={setTemplateContent}
        />
        <Button mt={20} type="submit" variant="light" fullWidth>
          Save
        </Button>
      </form>
    </Container>
  );
}

export default AddTemplate;
