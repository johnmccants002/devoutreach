// utils/emailTemplateHelper.js
export const replaceCompanyPlaceholder = (template, companyName) => {
  const newSubject = template.subject.replace("*company*", companyName);
  const newBody = template.body.replace(/\*company\*/g, companyName);
  return { subject: newSubject, body: newBody };
};
