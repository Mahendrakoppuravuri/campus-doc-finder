
import { Doctor } from "@/types/doctor";
import DoctorCard from "./DoctorCard";

interface DoctorListProps {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
}

const DoctorList = ({ doctors, loading, error }: DoctorListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-pulse text-lg text-gray-600">Loading doctors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-8">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="text-center my-8">
        <p className="text-gray-600">No doctors found matching your filters.</p>
        <p className="mt-2 text-sm text-gray-500">Try adjusting your search criteria or filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
