import { IconCheck } from "@tabler/icons-react";
import {
  Button,
  Container,
  Group,
  Image,
  List,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import image from "./image.svg";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container size="lg">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            A <span className={classes.highlight}>templating</span> engine for
            drafting
            <br />{" "}
          </Title>
          <Text c="dimmed" mt="md">
            Generate draft messages, emails and textual content with templating
            engine that supports variables.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck size={12} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Variable based</b> – Use variables to generate content with a
              single template
            </List.Item>
            <List.Item>
              <b>Export and imports</b> – Export and import templates to share.
              Supports backup for the whole data.
            </List.Item>
            <List.Item>
              <b>No annoying signups</b> – Just start using it, no need to sign
              up.
            </List.Item>
          </List>

          <Group mt={30}>
            <Button
              component={Link}
              to="/templates"
              radius="xl"
              size="md"
              className={classes.control}
            >
              Get started
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              Learn more
            </Button>
          </Group>
        </div>
        <Image src={image} className={classes.image} />
      </div>
    </Container>
  );
}
