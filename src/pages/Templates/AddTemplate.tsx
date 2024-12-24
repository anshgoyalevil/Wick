import { Button, Container, Title } from "@mantine/core";
import Editor from "../../components/editor/Editor";
import { useState } from "react";

function AddTemplate() {
  const [templateContent, setTemplateContent] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(templateContent);
  };

  return (
    <Container size="md">
      <Title mt={-60} mb={30}>
        Add Template
      </Title>
      <form onSubmit={handleSubmit} autoComplete="off">
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
