
import { useState } from "react";
import { useDoctorsFilter } from "@/hooks/useDoctorsFilter";
import AutocompleteSearch from "@/components/AutocompleteSearch";
import FilterPanel from "@/components/FilterPanel";
import DoctorList from "@/components/DoctorList";

const Index = () => {
  const {
    doctors,
    loading,
    error,
    searchTerm,
    updateSearchTerm,
    searchSuggestions,
    consultationType,
    updateConsultationType,
    specialties,
    allSpecialties,
    updateSpecialties,
    sortBy,
    updateSortBy,
  } = useDoctorsFilter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold text-medical-primary mb-4 md:mb-0">
              Campus Doctor Finder
            </h1>
            <AutocompleteSearch 
              searchTerm={searchTerm}
              onSearchChange={updateSearchTerm}
              suggestions={searchSuggestions}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <aside className="w-full md:w-64 mb-6 md:mb-0">
            <FilterPanel
              specialties={specialties}
              allSpecialties={allSpecialties}
              consultationType={consultationType}
              sortBy={sortBy}
              updateConsultationType={updateConsultationType}
              updateSpecialties={updateSpecialties}
              updateSortBy={updateSortBy}
            />
          </aside>

          {/* Doctor Listings */}
          <div className="flex-1">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {loading 
                  ? "Loading doctors..." 
                  : `Doctors (${doctors.length})`
                }
              </h2>
            </div>
            <DoctorList 
              doctors={doctors} 
              loading={loading} 
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
