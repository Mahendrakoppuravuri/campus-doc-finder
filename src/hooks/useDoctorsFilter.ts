
import { useState, useEffect, useMemo } from "react";
import { useQueryParams } from "./useQueryParams";
import { Doctor } from "../types/doctor";
import { fetchDoctors } from "../services/doctorService";

export type ConsultationType = "video" | "clinic" | null;
export type SortType = "fees" | "experience" | null;

export function useDoctorsFilter() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { getQueryParam, setQueryParams } = useQueryParams();

  // Get filter values from URL params
  const consultationType = getQueryParam("type") as ConsultationType;
  const specialties = getQueryParam("specialties") as string[];
  const sortBy = getQueryParam("sort") as SortType;
  const searchQuery = getQueryParam("q") as string | null;

  // Fetch doctors on component mount
  useEffect(() => {
    const getDoctors = async () => {
      try {
        setLoading(true);
        const data = await fetchDoctors();
        setDoctors(data);
        setError(null);
      } catch (err) {
        setError("Failed to load doctors. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getDoctors();
  }, []);

  // Sync search term with URL
  useEffect(() => {
    if (searchQuery && !searchTerm) {
      setSearchTerm(searchQuery);
    }
  }, [searchQuery]);

  // Update filters
  const updateConsultationType = (type: ConsultationType) => {
    setQueryParams({ type: type || null });
  };

  const updateSpecialties = (specialty: string, isChecked: boolean) => {
    const currentSpecialties = specialties ? 
      (Array.isArray(specialties) ? specialties : [specialties]) : 
      [];
    
    let newSpecialties: string[];
    if (isChecked) {
      newSpecialties = [...currentSpecialties, specialty];
    } else {
      newSpecialties = currentSpecialties.filter(s => s !== specialty);
    }
    
    setQueryParams({ 
      specialties: newSpecialties.length > 0 ? newSpecialties : null 
    });
  };

  const updateSortBy = (sort: SortType) => {
    setQueryParams({ sort: sort || null });
  };

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      setQueryParams({ q: term });
    } else {
      setQueryParams({ q: null });
    }
  };

  // Filter & sort doctors based on current filters
  const filteredDoctors = useMemo(() => {
    let result = [...doctors];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by consultation type
    if (consultationType) {
      if (consultationType === "video") {
        result = result.filter(doctor => doctor.videoConsult);
      } else if (consultationType === "clinic") {
        result = result.filter(doctor => doctor.inClinic);
      }
    }
    
    // Filter by specialties
    if (specialties && specialties.length > 0) {
      const specialtiesArray = Array.isArray(specialties) ? specialties : [specialties];
      result = result.filter(doctor => 
        specialtiesArray.some(s => doctor.specialty.includes(s))
      );
    }
    
    // Sort doctors
    if (sortBy) {
      if (sortBy === "fees") {
        result.sort((a, b) => a.fees - b.fees);
      } else if (sortBy === "experience") {
        result.sort((a, b) => b.experience - a.experience);
      }
    }
    
    return result;
  }, [doctors, searchTerm, consultationType, specialties, sortBy]);

  // Get unique specialties from all doctors
  const allSpecialties = useMemo(() => {
    if (!doctors || doctors.length === 0) return [];
    
    const specialtySet = new Set<string>();
    doctors.forEach(doctor => {
      // Check if doctor.specialty exists before calling forEach
      if (doctor.specialty && Array.isArray(doctor.specialty)) {
        doctor.specialty.forEach(s => specialtySet.add(s));
      }
    });
    return Array.from(specialtySet).sort();
  }, [doctors]);

  // Get search suggestions based on current search term
  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    return doctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 3) // Limit to 3 suggestions
      .map(doctor => doctor.name);
  }, [doctors, searchTerm]);

  return {
    doctors: filteredDoctors,
    allDoctors: doctors,
    loading,
    error,
    searchTerm,
    updateSearchTerm,
    searchSuggestions,
    consultationType,
    updateConsultationType,
    specialties: specialties ? (Array.isArray(specialties) ? specialties : [specialties]) : [],
    allSpecialties,
    updateSpecialties,
    sortBy,
    updateSortBy,
  };
}
