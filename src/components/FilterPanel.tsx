
import { Check, Radio } from "lucide-react";
import { ConsultationType, SortType } from "@/hooks/useDoctorsFilter";

interface FilterPanelProps {
  specialties: string[];
  allSpecialties: string[];
  consultationType: ConsultationType;
  sortBy: SortType;
  updateConsultationType: (type: ConsultationType) => void;
  updateSpecialties: (specialty: string, isChecked: boolean) => void;
  updateSortBy: (sort: SortType) => void;
}

const FilterPanel = ({
  specialties,
  allSpecialties,
  consultationType,
  sortBy,
  updateConsultationType,
  updateSpecialties,
  updateSortBy,
}: FilterPanelProps) => {
  // Format specialty name for data-testid
  const formatSpecialtyId = (specialty: string) => {
    return specialty.replace(/\/|\s+/g, "-");
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full md:w-64 h-fit">
      {/* Consultation Mode Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-moc" 
          className="font-medium text-lg mb-3 text-gray-800"
        >
          Consultation Mode
        </h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="video-consult"
              data-testid="filter-video-consult"
              checked={consultationType === "video"}
              onChange={() => updateConsultationType(consultationType === "video" ? null : "video")}
              className="h-4 w-4 text-medical-primary"
            />
            <label htmlFor="video-consult" className="ml-2 text-gray-700">
              Video Consult
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="in-clinic"
              data-testid="filter-in-clinic"
              checked={consultationType === "clinic"}
              onChange={() => updateConsultationType(consultationType === "clinic" ? null : "clinic")}
              className="h-4 w-4 text-medical-primary"
            />
            <label htmlFor="in-clinic" className="ml-2 text-gray-700">
              In Clinic
            </label>
          </div>
        </div>
      </div>

      {/* Specialties Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-speciality" 
          className="font-medium text-lg mb-3 text-gray-800"
        >
          Speciality
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {allSpecialties.map((specialty) => (
            <div key={specialty} className="flex items-center">
              <input
                type="checkbox"
                id={`specialty-${specialty}`}
                data-testid={`filter-specialty-${formatSpecialtyId(specialty)}`}
                checked={specialties.includes(specialty)}
                onChange={(e) => updateSpecialties(specialty, e.target.checked)}
                className="h-4 w-4 text-medical-primary rounded"
              />
              <label htmlFor={`specialty-${specialty}`} className="ml-2 text-gray-700">
                {specialty}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <h3 
          data-testid="filter-header-sort" 
          className="font-medium text-lg mb-3 text-gray-800"
        >
          Sort By
        </h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="sort-fees"
              data-testid="sort-fees"
              checked={sortBy === "fees"}
              onChange={() => updateSortBy(sortBy === "fees" ? null : "fees")}
              className="h-4 w-4 text-medical-primary"
            />
            <label htmlFor="sort-fees" className="ml-2 text-gray-700">
              Consultation Fees (Low to High)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="sort-experience"
              data-testid="sort-experience"
              checked={sortBy === "experience"}
              onChange={() => updateSortBy(sortBy === "experience" ? null : "experience")}
              className="h-4 w-4 text-medical-primary"
            />
            <label htmlFor="sort-experience" className="ml-2 text-gray-700">
              Experience (High to Low)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
