// serpApiService.js
import axios from "axios";

const BASE_URL = "http://localhost:3001/api/search"; // Update this URL to match your Express backend

export const fetchLocalResults = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?query=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
    return [];
  }
};
