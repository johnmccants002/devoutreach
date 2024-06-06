// emailService.js
import axios from "axios";

export const generateEmailTemplate = async (user, company) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/email-templates/generate",
      { user, company }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating email templates:", error);
    return [];
  }
};
