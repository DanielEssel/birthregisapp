import { BirthRecord, Hospital, User, Notification, ImmunizationRecord, PostnatalVisit } from '../types';

export * from '../types';

export const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Manila General Hospital',
    address: '1234 Taft Avenue',
    city: 'Manila',
    province: 'Metro Manila',
    contactNumber: '+63 2 8554 8400',
    licenseNumber: 'LIC-MGH-2024-001',
    hasInternetConnection: true,
    lastSyncDate: '2024-01-26T10:30:00Z'
  },
  {
    id: '2',
    name: 'Rural Health Unit - Bataan',
    address: 'Barangay San Miguel',
    city: 'Balanga',
    province: 'Bataan',
    contactNumber: '+63 47 237 3456',
    licenseNumber: 'LIC-RHU-BAT-2024-002',
    hasInternetConnection: false,
    lastSyncDate: '2024-01-25T08:15:00Z'
  },
  {
    id: '3',
    name: 'Philippine General Hospital',
    address: 'Taft Avenue',
    city: 'Manila',
    province: 'Metro Manila',
    contactNumber: '+63 2 8554 8400',
    licenseNumber: 'LIC-PGH-2024-003',
    hasInternetConnection: true,
    lastSyncDate: '2024-01-26T11:45:00Z'
  },
  {
    id: '4',
    name: 'Barangay Health Station - Mindanao',
    address: 'Sitio Malaya',
    city: 'Davao',
    province: 'Davao del Sur',
    contactNumber: '+63 82 234 5678',
    licenseNumber: 'LIC-BHS-DAV-2024-004',
    hasInternetConnection: false,
    lastSyncDate: '2024-01-24T16:20:00Z'
  }
];

export const mockBirthRecords: BirthRecord[] = [
  {
    id: '1',
    provisionalId: 'PROV-2024-001234',
    registrationNumber: 'BR-2024-001234',
    childName: 'Sofia Maria Santos',
    dateOfBirth: '2024-01-15',
    timeOfBirth: '08:30',
    placeOfBirth: 'Manila General Hospital',
    gender: 'female',
    weight: 3.2,
    length: 50,
    
    motherName: 'Maria Elena Santos',
    motherAge: 28,
    motherNationality: 'Filipino',
    motherOccupation: 'Teacher',
    motherAddress: '123 Rizal Street, Manila',
    motherIdNumber: 'DL-1234567890',
    motherIdType: 'drivers_license',
    
    fatherName: 'Carlos Miguel Santos',
    fatherAge: 30,
    fatherNationality: 'Filipino',
    fatherOccupation: 'Engineer',
    fatherAddress: '123 Rizal Street, Manila',
    fatherIdNumber: 'DL-0987654321',
    fatherIdType: 'drivers_license',
    
    contactPhone: '+63 917 123 4567',
    contactEmail: 'maria@example.com',
    emergencyContact: 'Ana Santos (Sister)',
    emergencyPhone: '+63 918 987 6543',
    
    attendingPhysician: 'Dr. Juan Cruz',
    hospitalId: '1',
    medicalCertificateNumber: 'MC-2024-001',
    deliveryType: 'normal',
    
    healthRecordId: 'HR-2024-001234',
    immunizationSchedule: [
      {
        id: '1',
        vaccine: 'BCG',
        dateGiven: '2024-01-15',
        healthWorker: 'Dr. Juan Cruz',
        batchNumber: 'BCG-2024-001'
      },
      {
        id: '2',
        vaccine: 'Hepatitis B',
        dateGiven: '2024-01-15',
        nextDue: '2024-02-15',
        healthWorker: 'Dr. Juan Cruz',
        batchNumber: 'HEPB-2024-001'
      }
    ],
    
    postnatalVisits: [
      {
        id: '1',
        visitDate: '2024-01-22',
        weight: 3.4,
        length: 51,
        healthWorker: 'Nurse Maria Lopez',
        notes: 'Healthy development, feeding well',
        nextVisitDue: '2024-02-05'
      }
    ],
    
    documents: [
      {
        id: '1',
        name: 'Medical Certificate of Live Birth',
        type: 'medical_certificate',
        url: '/documents/medical-cert-1.pdf',
        uploadedDate: '2024-01-15',
        verified: true,
        verifiedBy: 'Dr. Juan Cruz',
        verifiedDate: '2024-01-15',
        size: 245760,
        mimeType: 'application/pdf'
      },
      {
        id: '2',
        name: 'Birth Confirmation Slip',
        type: 'confirmation_slip',
        url: '/documents/confirmation-slip-1.pdf',
        uploadedDate: '2024-01-15',
        verified: true,
        verifiedBy: 'Dr. Juan Cruz',
        verifiedDate: '2024-01-15',
        size: 156432,
        mimeType: 'application/pdf'
      }
    ],
    
    stage: 'completed',
    status: 'completed',
    birthCapturedDate: '2024-01-15T08:30:00Z',
    preRegistrationDate: '2024-01-15T09:00:00Z',
    verificationDate: '2024-01-17T10:00:00Z',
    civilRegistrationDate: '2024-01-18T14:00:00Z',
    completionDate: '2024-01-19T16:00:00Z',
    
    qrCode: 'QR-PROV-2024-001234',
    confirmationSlip: 'CONF-2024-001234',
    
    syncStatus: 'synced',
    lastSyncDate: '2024-01-19T16:05:00Z',
    
    currentStep: 4,
    totalSteps: 4,
    progress: 100,
    
    createdBy: '2', // Health worker
    verifiedBy: '2',
    registeredBy: '3'
  },
  {
    id: '2',
    provisionalId: 'PROV-2024-001235',
    childName: 'Miguel Jose Reyes',
    dateOfBirth: '2024-01-20',
    timeOfBirth: '14:45',
    placeOfBirth: 'Rural Health Unit - Bataan',
    gender: 'male',
    weight: 3.5,
    length: 52,
    
    motherName: 'Rosa Reyes',
    motherAge: 25,
    motherNationality: 'Filipino',
    motherOccupation: 'Farmer',
    motherAddress: 'Barangay San Miguel, Balanga, Bataan',
    
    contactPhone: '+63 919 234 5678',
    emergencyContact: 'Pedro Reyes (Husband)',
    emergencyPhone: '+63 920 345 6789',
    
    attendingPhysician: 'Dr. Ana Rodriguez',
    hospitalId: '2',
    deliveryType: 'normal',
    
    healthRecordId: 'HR-2024-001235',
    immunizationSchedule: [
      {
        id: '3',
        vaccine: 'BCG',
        dateGiven: '2024-01-20',
        healthWorker: 'Dr. Ana Rodriguez',
        batchNumber: 'BCG-2024-002'
      }
    ],
    
    documents: [
      {
        id: '3',
        name: 'Birth Confirmation Slip',
        type: 'confirmation_slip',
        url: '/documents/confirmation-slip-2.pdf',
        uploadedDate: '2024-01-20',
        verified: true,
        verifiedBy: 'Dr. Ana Rodriguez',
        verifiedDate: '2024-01-20',
        size: 167890,
        mimeType: 'application/pdf'
      }
    ],
    
    stage: 'health_integration',
    status: 'provisional',
    birthCapturedDate: '2024-01-20T14:45:00Z',
    preRegistrationDate: '2024-01-20T15:00:00Z',
    
    qrCode: 'QR-PROV-2024-001235',
    confirmationSlip: 'CONF-2024-001235',
    
    syncStatus: 'local', // Offline area - not yet synced
    
    currentStep: 2,
    totalSteps: 4,
    progress: 50,
    
    createdBy: '4', // Rural health worker
    requiresInfo: ['father_details', 'mother_id', 'household_details']
  },
  {
    id: '3',
    provisionalId: 'PROV-2024-001236',
    childName: 'Ana Isabel Garcia',
    dateOfBirth: '2024-01-25',
    timeOfBirth: '22:15',
    placeOfBirth: 'Barangay Health Station - Mindanao',
    gender: 'female',
    weight: 2.8,
    length: 48,
    
    motherName: 'Carmen Garcia',
    motherAge: 22,
    contactPhone: '+63 912 345 6789',
    
    attendingPhysician: 'Midwife Elena Santos',
    hospitalId: '4',
    deliveryType: 'normal',
    
    healthRecordId: 'HR-2024-001236',
    
    documents: [
      {
        id: '4',
        name: 'Birth Confirmation Slip',
        type: 'confirmation_slip',
        url: '/documents/confirmation-slip-3.pdf',
        uploadedDate: '2024-01-25',
        verified: true,
        verifiedBy: 'Midwife Elena Santos',
        verifiedDate: '2024-01-25',
        size: 134567,
        mimeType: 'application/pdf'
      }
    ],
    
    stage: 'immediate_capture',
    status: 'draft',
    birthCapturedDate: '2024-01-25T22:15:00Z',
    
    syncStatus: 'local', // Remote area - offline
    
    currentStep: 1,
    totalSteps: 4,
    progress: 25,
    
    createdBy: '5', // Rural midwife
    requiresInfo: ['complete_mother_info', 'father_details', 'contact_details']
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '2',
    title: 'New Birth Recorded',
    message: 'Birth successfully captured for Ana Isabel Garcia. Provisional ID: PROV-2024-001236',
    type: 'success',
    read: false,
    createdAt: '2024-01-25T22:20:00Z',
    actionUrl: '/health-worker/records/3'
  },
  {
    id: '2',
    userId: '4',
    title: 'Sync Required',
    message: '3 birth records are waiting to sync when internet connection is available.',
    type: 'warning',
    read: false,
    createdAt: '2024-01-26T08:00:00Z'
  },
  {
    id: '3',
    userId: '3',
    title: 'Ready for Civil Registration',
    message: 'Miguel Jose Reyes record is complete and ready for final registration.',
    type: 'info',
    read: true,
    createdAt: '2024-01-26T09:15:00Z',
    actionUrl: '/registry/records/2'
  }
];

export const getWorkflowSteps = () => {
  return [
    { 
      id: 1, 
      title: 'Immediate Capture', 
      description: 'Birth recorded at point of delivery',
      stage: 'immediate_capture'
    },
    { 
      id: 2, 
      title: 'Pre-Registration', 
      description: 'Provisional ID generated, confirmation slip issued',
      stage: 'pre_registration'
    },
    { 
      id: 3, 
      title: 'Health Integration', 
      description: 'Progressive completion during health visits',
      stage: 'health_integration'
    },
    { 
      id: 4, 
      title: 'Civil Registration', 
      description: 'Final registration and certificate issuance',
      stage: 'civil_registration'
    }
  ];
};

export const getStageColor = (stage: string) => {
  switch (stage) {
    case 'immediate_capture':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'pre_registration':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'health_integration':
      return 'bg-teal-100 text-teal-800 border-teal-200';
    case 'civil_registration':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'completed':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'draft':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'provisional':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'verified':
      return 'bg-teal-100 text-teal-800 border-teal-200';
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'requires_info':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'draft':
      return 'Draft';
    case 'provisional':
      return 'Provisional Registration';
    case 'verified':
      return 'Verified';
    case 'completed':
      return 'Completed';
    case 'requires_info':
      return 'Requires Information';
    default:
      return 'Unknown';
  }
};

export const getSyncStatusColor = (syncStatus: string) => {
  switch (syncStatus) {
    case 'local':
      return 'bg-orange-100 text-orange-800';
    case 'syncing':
      return 'bg-blue-100 text-blue-800';
    case 'synced':
      return 'bg-green-100 text-green-800';
    case 'error':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getSyncStatusText = (syncStatus: string) => {
  switch (syncStatus) {
    case 'local':
      return 'Stored Locally';
    case 'syncing':
      return 'Syncing...';
    case 'synced':
      return 'Synced';
    case 'error':
      return 'Sync Error';
    default:
      return 'Unknown';
  }
};