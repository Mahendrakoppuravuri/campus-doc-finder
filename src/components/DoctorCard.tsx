import { Doctor } from "@/types/doctor";
import { Button } from "@/components/ui/button";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div 
      data-testid="doctor-card" 
      className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4 w-full"
    >
      <div className="flex-shrink-0">
        <img 
          src={doctor.image || "/placeholder.svg"} 
          alt={`${doctor.name}`} 
          className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </div>
      
      <div className="flex-grow">
        <h3 
          data-testid="doctor-name" 
          className="text-lg font-semibold text-gray-800"
        >
          {doctor.name}
        </h3>
        
        <div 
          data-testid="doctor-specialty" 
          className="text-sm text-gray-600 mt-1"
        >
          {doctor.specialty.join(", ")}
        </div>
        
        {doctor.qualifications && doctor.qualifications.length > 0 && (
          <div className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Qualifications:</span> {doctor.qualifications.join(", ")}
          </div>
        )}
        
        {doctor.hospitalName && (
          <div className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Hospital:</span> {doctor.hospitalName}
          </div>
        )}
        
        {doctor.location && (
          <div className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Location:</span> {doctor.location}
          </div>
        )}
        
        <div className="mt-2 flex flex-wrap gap-2">
          {doctor.videoConsult && (
            <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
              Video Consult
            </span>
          )}
          {doctor.inClinic && (
            <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
              In Clinic
            </span>
          )}
        </div>
        
        <div className="mt-3 flex flex-col sm:flex-row sm:justify-between items-center">
          <div className="flex-grow">
            <div 
              data-testid="doctor-experience" 
              className="text-sm text-gray-700 mb-2 sm:mb-0"
            >
              <span className="font-medium">Experience:</span> {doctor.experience} years
            </div>
            
            <div 
              data-testid="doctor-fee" 
              className="text-sm text-gray-700"
            >
              <span className="font-medium">Consultation Fee:</span> ₹{doctor.fees}
            </div>
          </div>
          
          <Button 
            variant="default" 
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white mt-2 sm:mt-0"
          >
            Book an Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
