
import { Doctor } from "../types/doctor";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Error fetching doctors: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    throw error;
  }
};
