export interface User {
  id: string;
  name: string;
  email: string;
  role: 'health_worker' | 'registry_staff' | 'parent';
  avatar?: string;
  location?: string;
  facility?: string;
  phoneNumber?: string;
  licenseNumber?: string;
}

export interface BirthRecord {
  id: string;
  provisionalId?: string; // Generated immediately at birth
  registrationNumber?: string; // Final registration number
  
  // Child Information (captured at birth)
  childName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  gender: 'male' | 'female';
  weight: number;
  length: number;
  
  // Mother Information (immediate capture)
  motherName: string;
  motherAge?: number;
  motherNationality?: string;
  motherOccupation?: string;
  motherAddress?: string;
  motherIdNumber?: string;
  motherIdType?: string;
  
  // Father Information (can be added later)
  fatherName?: string;
  fatherAge?: number;
  fatherNationality?: string;
  fatherOccupation?: string;
  fatherAddress?: string;
  fatherIdNumber?: string;
  fatherIdType?: string;
  
  // Contact Information
  contactPhone: string;
  contactEmail?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  
  // Medical Information
  attendingPhysician: string;
  hospitalId: string;
  medicalCertificateNumber?: string;
  deliveryType: 'normal' | 'cesarean' | 'assisted';
  complications?: string;
  
  // Health Record Integration
  healthRecordId?: string;
  immunizationSchedule?: ImmunizationRecord[];
  postnatalVisits?: PostnatalVisit[];
  
  // Documents
  documents: Document[];
  
  // Workflow Status
  stage: 'immediate_capture' | 'pre_registration' | 'health_integration' | 'civil_registration' | 'completed';
  status: 'draft' | 'provisional' | 'verified' | 'completed' | 'requires_info';
  
  // Timestamps
  birthCapturedDate: string;
  preRegistrationDate?: string;
  verificationDate?: string;
  civilRegistrationDate?: string;
  completionDate?: string;
  
  // QR Code and Confirmation
  qrCode?: string;
  confirmationSlip?: string;
  
  // Sync Status for Offline
  syncStatus: 'local' | 'syncing' | 'synced' | 'error';
  lastSyncDate?: string;
  
  // Workflow tracking
  currentStep: number;
  totalSteps: number;
  progress: number;
  
  // Additional metadata
  createdBy: string; // Health worker ID
  verifiedBy?: string;
  registeredBy?: string;
  notes?: string;
  requiresInfo?: string[];
}

export interface ImmunizationRecord {
  id: string;
  vaccine: string;
  dateGiven: string;
  nextDue?: string;
  healthWorker: string;
  batchNumber?: string;
}

export interface PostnatalVisit {
  id: string;
  visitDate: string;
  weight: number;
  length: number;
  healthWorker: string;
  notes?: string;
  nextVisitDue?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'medical_certificate' | 'mother_id' | 'father_id' | 'marriage_certificate' | 'proof_of_address' | 'confirmation_slip' | 'other';
  url: string;
  uploadedDate: string;
  verified: boolean;
  verifiedBy?: string;
  verifiedDate?: string;
  size: number;
  mimeType: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  contactNumber: string;
  licenseNumber: string;
  hasInternetConnection: boolean;
  lastSyncDate?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface BirthCaptureFormData {
  // Immediate capture at birth
  childName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  gender: 'male' | 'female' | '';
  weight: string;
  length: string;
  
  // Mother Information (essential)
  motherName: string;
  motherAge: string;
  contactPhone: string;
  
  // Medical Information
  attendingPhysician: string;
  hospitalId: string;
  deliveryType: 'normal' | 'cesarean' | 'assisted' | '';
  complications: string;
  
  // Optional immediate info
  motherNationality: string;
  motherOccupation: string;
  motherAddress: string;
  contactEmail: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export interface HealthIntegrationFormData {
  // Additional details collected during health visits
  fatherName: string;
  fatherAge: string;
  fatherNationality: string;
  fatherOccupation: string;
  fatherAddress: string;
  fatherIdNumber: string;
  fatherIdType: string;
  
  // Complete mother details
  motherIdNumber: string;
  motherIdType: string;
  
  // Household information
  householdSize: string;
  householdIncome: string;
  
  // Marriage information
  parentsMarried: boolean;
  marriageDate: string;
  marriagePlace: string;
  marriageCertificateNumber: string;
}