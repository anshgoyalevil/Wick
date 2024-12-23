import { ITemplate } from "./schema";

const storageKey = "templates";

export const getTemplates = () => {
  const storedItems = localStorage.getItem(storageKey);
  return storedItems ? JSON.parse(storedItems) : [];
};

export const addTemplate = (template: ITemplate) => {
  const templates = getTemplates();
  templates.push(template);
  localStorage.setItem(storageKey, JSON.stringify(templates));
  return templates;
};

export const updateTemplate = (id, updatedTemplate) => {
  const templates = getTemplates();
  const index = templates.findIndex((item) => item.id === id);
  if (index !== -1) {
    templates[index] = { ...templates[index], ...updatedTemplate };
    localStorage.setItem(storageKey, JSON.stringify(templates));
  }
};

export const deleteTemplate = (id) => {
  const templates = getTemplates().filter((item) => item.id !== id);
  localStorage.setItem(storageKey, JSON.stringify(templates));
};
