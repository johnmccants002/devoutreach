// emailService.js
import axios from "axios";

export const generateEmailTemplate = async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/email-templates/generate",
      { user }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating email templates:", error);
    return [];
  }
};

export const updateEmailTemplate = async (template, transformation) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/email-templates/update",
      { template, transformation }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating email template:", error);
    return null;
  }
};

export const customEmailTemplate = async (prompt, template, user) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/email-templates/custom-update",
      { prompt, template, user }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating email template:", error);
    return null;
  }
};
