import { ITemplate } from "./schema";

export const storageKey = "templates";

export const getTemplates = () => {
  const storedItems = localStorage.getItem(storageKey);
  return storedItems ? JSON.parse(storedItems) : [];
};

export const getTemplate = (id: string | undefined) => {
  const templates = getTemplates();
  return templates.find((item: ITemplate) => item.id === id);
};

export const addTemplate = (template: ITemplate) => {
  const templates = getTemplates();
  templates.push(template);
  localStorage.setItem(storageKey, JSON.stringify(templates));
  return templates;
};

export const updateTemplate = (id: string, updatedTemplate: ITemplate) => {
  const templates = getTemplates();
  const index = templates.findIndex((item: ITemplate) => item.id === id);
  if (index !== -1) {
    templates[index] = { ...templates[index], ...updatedTemplate };
    localStorage.setItem(storageKey, JSON.stringify(templates));
  }
};

export const deleteTemplate = (id: string) => {
  const templates = getTemplates().filter((item: ITemplate) => item.id !== id);
  localStorage.setItem(storageKey, JSON.stringify(templates));
};

export const clearTemplates = () => {
  localStorage.removeItem(storageKey);
};
