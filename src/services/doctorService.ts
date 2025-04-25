import { Doctor } from "../types/doctor";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Error fetching doctors: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the API data to match our Doctor interface
    const transformedData: Doctor[] = data.map((doctor: any) => ({
      id: Number(doctor.id),
      name: doctor.name || "",
      specialty: doctor.specialities?.map((s: any) => s.name) || [],
      experience: parseInt(doctor.experience) || 0,
      fees: parseInt(doctor.fees?.replace(/[^\d]/g, "")) || 0,
      videoConsult: Boolean(doctor.video_consult),
      inClinic: Boolean(doctor.in_clinic),
      image: doctor.photo || "",
      expertise: doctor.doctor_introduction || undefined,
      rating: undefined,
      hospitalName: doctor.clinic?.name || undefined,
      location: doctor.clinic?.address?.locality 
        ? `${doctor.clinic.address.locality}, ${doctor.clinic.address.city || ""}`
        : undefined,
      qualifications: doctor.qualifications?.map((q: any) => q.name) || []
    }));
    
    return transformedData;
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    throw error;
  }
};
