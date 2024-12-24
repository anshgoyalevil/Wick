import { Button, Container, TextInput, Title } from "@mantine/core";
import Editor from "../../components/editor/Editor";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { getTemplate, updateTemplate } from "../../db/db";
import { ITemplate } from "../../db/schema";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [templateContent, setTemplateContent] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const form = useForm({
    initialValues: {
      title: "",
    },
  });

  useEffect(() => {
    const template = getTemplate(id);
    if (template) {
      setTemplateContent(template.content);
      form.setValues({ title: template.title });
    }
  }, [id]);

  const handleUpdate = (formValue: any) => {
    const updatedTemplate: ITemplate = {
      id: id!,
      title: formValue.title,
      content: templateContent,
      variables: [] as string[],
      dateCreated: new Date().toLocaleDateString("en-GB"),
    };

    const extractVariables = templateContent.match(/{{(.*?)}}/g);

    if (extractVariables) {
      updatedTemplate.variables = extractVariables.map((variable) =>
        variable.replace(/[{}]/g, "")
      );

      updatedTemplate.variables = Array.from(
        new Set(updatedTemplate.variables)
      );
    }

    updateTemplate(id!, updatedTemplate);

    navigate("/templates");
  };

  return (
    <Container size="md">
      <Title mt={-60} mb={30}>
        Edit Template
      </Title>
      <form onSubmit={form.onSubmit(handleUpdate)} autoComplete="off">
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
        <Button mb={100} mt={20} type="submit" variant="light" fullWidth>
          Save
        </Button>
      </form>
    </Container>
  );
}

export default Edit;
