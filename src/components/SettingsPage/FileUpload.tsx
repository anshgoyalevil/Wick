import { Group, Text, rem } from "@mantine/core";
import { IconUpload, IconX, IconFile } from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import { useState } from "react";
import { importData } from "../../utils/export_import";

export default function FileUpload() {
  const [loading, setLoading] = useState(false);

  return (
    <Dropzone
      loading={loading}
      onDrop={(files) => {
        setLoading(true);
        try {
          importData(files[0]);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }}
      onReject={(files) => console.log("rejected files", files)}
      accept={["application/json"]}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-blue-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-red-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFile
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-dimmed)",
            }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag templates json file here or click to select file
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach 1 file only. Previous data will be cleared.
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
