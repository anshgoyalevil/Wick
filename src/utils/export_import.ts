import { getTemplates, storageKey } from "../db/db";

export const exportData = () => {
  try {
    const data = getTemplates();
    if (!data) {
      throw new Error("No templates found to export.");
    }

    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;
    const exportFileDefaultName = "templates.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  } catch (error) {
    console.error("Failed to export data:", error);
    alert("Failed to export data. Check the console for details.");
  }
};

export const importData = async (file: File) => {
  if (!file.name.endsWith(".json")) {
    alert("Please upload a valid JSON file.");
    return;
  }

  try {
    const data = await file.text();
    const parsedData = JSON.parse(data);

    if (!Array.isArray(parsedData)) {
      throw new Error("Invalid data format. Expected an array of templates.");
    }

    localStorage.setItem(storageKey, JSON.stringify(parsedData));
    alert("Templates successfully imported!");
  } catch (error) {
    console.error("Failed to import data:", error);
    alert("Failed to import data. Check the console for details.");
  }
};
