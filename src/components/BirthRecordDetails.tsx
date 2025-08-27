import React from 'react';
import { X, Calendar, Clock, User, Phone, Mail, MapPin, Heart, FileText, Download, CheckCircle, AlertCircle, Baby, Weight, Ruler, Printer } from 'lucide-react';
import { BirthRecord } from '../types';
import { getStatusColor, getStatusText, getWorkflowSteps } from '../data/mockData';
import { mockHospitals } from '../data/mockData';

interface BirthRecordDetailsProps {
  record: BirthRecord;
  onClose: () => void;
  userRole: 'parent' | 'health_worker' | 'registry_staff';
}

export default function BirthRecordDetails({ record, onClose, userRole }: BirthRecordDetailsProps) {
  const steps = getWorkflowSteps(userRole);
  const hospital = mockHospitals.find(h => h.id === record.hospitalId);

  const getStepStatus = (stepId: number) => {
    if (record.currentStep > stepId) return 'completed';
    if (record.currentStep === stepId) return 'current';
    return 'pending';
  };

  const getStepIcon = (stepId: number) => {
    const status = getStepStatus(stepId);
    if (status === 'completed') return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />;
    if (status === 'current') return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
    return <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 rounded-full" />;
  };

  return (
    <div className="inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg sm:rounded-2xl w-full h-full sm:h-auto sm:max-w-7xl sm:max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b shrink-0">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{record.childName}</h2>
            <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600 mt-1">
              {record.registrationNumber && (
                <span className="font-medium text-blue-600 truncate">#{record.registrationNumber}</span>
              )}
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border shrink-0 ${getStatusColor(record.status)}`}>
                {getStatusText(record.status)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
            {/* Main Information */}
            <div className="xl:col-span-2 space-y-4 sm:space-y-6">
              {/* Child Information */}
              <div className="bg-white rounded-lg border p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                  <Baby className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                  Child Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs sm:text-sm text-gray-500">Full Name</label>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{record.childName}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm text-gray-500">Date of Birth</label>
                      <p className="font-medium text-gray-900 flex items-center text-sm sm:text-base">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {new Date(record.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm text-gray-500">Time of Birth</label>
                      <p className="font-medium text-gray-900 flex items-center text-sm sm:text-base">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {record.timeOfBirth}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs sm:text-sm text-gray-500">Gender</label>
                      <p className="font-medium text-gray-900 capitalize text-sm sm:text-base">{record.gender}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm text-gray-500">Weight</label>
                      <p className="font-medium text-gray-900 flex items-center text-sm sm:text-base">
                        <Weight className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {record.weight} kg
                      </p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm text-gray-500">Length</label>
                      <p className="font-medium text-gray-900 flex items-center text-sm sm:text-base">
                        <Ruler className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {record.length} cm
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              <div className="bg-white rounded-lg border p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
                  Parent Information
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Mother */}
                  <div className="bg-pink-50 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Mother</h4>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex flex-col sm:flex-row">
                        <span className="text-gray-500 sm:w-20 shrink-0">Name:</span>
                        <span className="font-medium truncate">{record.motherName}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row">
                        <span className="text-gray-500 sm:w-20 shrink-0">Age:</span>
                        <span className="font-medium">{record.motherAge}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row">
                        <span className="text-gray-500 sm:w-20 shrink-0">Nationality:</span>
                        <span className="font-medium">{record.motherNationality}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row">
                        <span className="text-gray-500 sm:w-20 shrink-0">Occupation:</span>
                        <span className="font-medium truncate">{record.motherOccupation}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row">
                        <span className="text-gray-500 sm:w-20 shrink-0">Address:</span>
                        <span className="font-medium text-xs sm:text-sm">{record.motherAddress}</span>
                      </div>
                    </div>
                  </div>

                  {/* Father */}
                  <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Father</h4>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex flex-col sm:flex-row">
                        <span className="text-gray-500 sm:w-20 shrink-0">Name:</span>
                        <span className="font-medium truncate">{record.fatherName}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row">
                        <span className="text-gray-500 sm:w-20 shrink-0">Age:</span>
                        <span className="font-medium">{record.fatherAge}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row">
                        <span className="text-gray-500 sm:w-20 shrink-0">Nationality:</span>
                        <span className="font-medium">{record.fatherNationality}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row">
                        <span className="text-gray-500 sm:w-20 shrink-0">Occupation:</span>
                        <span className="font-medium truncate">{record.fatherOccupation}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row">
                        <span className="text-gray-500 sm:w-20 shrink-0">Address:</span>
                        <span className="font-medium text-xs sm:text-sm">{record.fatherAddress}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="bg-white rounded-lg border p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-600" />
                  Medical Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs sm:text-sm text-gray-500">Hospital/Facility</label>
                    <p className="font-medium text-gray-900 flex items-center text-sm sm:text-base">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 shrink-0" />
                      <span className="truncate">{hospital?.name || record.placeOfBirth}</span>
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-500">Attending Physician</label>
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{record.attendingPhysician}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-500">Medical Certificate #</label>
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{record.medicalCertificateNumber}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-500">Delivery Type</label>
                    <p className="font-medium text-gray-900 capitalize text-sm sm:text-base">{record.deliveryType}</p>
                  </div>
                  {record.complications && (
                    <div className="sm:col-span-2">
                      <label className="text-xs sm:text-sm text-gray-500">Complications</label>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{record.complications}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-lg border p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs sm:text-sm text-gray-500">Primary Phone</label>
                    <p className="font-medium text-gray-900 flex items-center text-sm sm:text-base">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {record.contactPhone}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-500">Email</label>
                    <p className="font-medium text-gray-900 flex items-center text-sm sm:text-base">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 shrink-0" />
                      <span className="truncate">{record.contactEmail}</span>
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-500">Emergency Contact</label>
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{record.emergencyContact}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-500">Emergency Phone</label>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">{record.emergencyPhone}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white rounded-lg border p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-600" />
                  Documents ({record.documents.length})
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {record.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg gap-3">
                      <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(doc.uploadedDate).toLocaleDateString()} • 
                            {(doc.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        {doc.verified ? (
                          <div className="flex items-center space-x-1 text-green-600">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs hidden sm:inline">Verified</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 text-yellow-600">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs hidden sm:inline">Pending</span>
                          </div>
                        )}
                        <button className="text-blue-600 hover:text-blue-800 p-1">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Progress Timeline */}
              <div className="bg-white rounded-lg border p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Registration Progress</h3>
                <div className="space-y-3 sm:space-y-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-start space-x-3 relative">
                      <div className="flex-shrink-0 mt-0.5">
                        {getStepIcon(step.id)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs sm:text-sm font-medium truncate ${
                          getStepStatus(step.id) === 'completed' ? 'text-green-600' :
                          getStepStatus(step.id) === 'current' ? 'text-blue-600' :
                          'text-gray-500'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-500">{step.description}</p>
                        {getStepStatus(step.id) === 'completed' && (
                          <p className="text-xs text-green-600 mt-1">
                            Completed {
                              step.id === 2 && record.verifiedDate ? new Date(record.verifiedDate).toLocaleDateString() :
                              step.id === 4 && record.approvedDate ? new Date(record.approvedDate).toLocaleDateString() :
                              step.id === 5 && record.issuedDate ? new Date(record.issuedDate).toLocaleDateString() :
                              ''
                            }
                          </p>
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`absolute left-2 sm:left-[10px] top-6 sm:top-8 w-0.5 h-4 sm:h-6 ${
                          getStepStatus(step.id) === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Information */}
              <div className="bg-white rounded-lg border p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Key Information</h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Submitted:</span>
                    <span className="font-medium text-right">
                      {record.submittedDate ? new Date(record.submittedDate).toLocaleDateString() : 'Not submitted'}
                    </span>
                  </div>
                  {record.verifiedBy && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Verified by:</span>
                      <span className="font-medium text-right truncate ml-2">{record.verifiedBy}</span>
                    </div>
                  )}
                  {record.approvedBy && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Approved by:</span>
                      <span className="font-medium text-right truncate ml-2">{record.approvedBy}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Documents:</span>
                    <span className="font-medium">{record.documents.length} files</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Progress:</span>
                    <span className="font-medium">{record.progress}%</span>
                  </div>
                </div>
              </div>

              {/* Hospital Information */}
              {hospital && (
                <div className="bg-white rounded-lg border p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-600" />
                    Hospital Information
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <span className="ml-2 font-medium block sm:inline">{hospital.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Address:</span>
                      <span className="ml-2 font-medium block sm:inline">{hospital.address}, {hospital.city}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Contact:</span>
                      <span className="ml-2 font-medium block sm:inline">{hospital.contactNumber}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">License:</span>
                      <span className="ml-2 font-medium block sm:inline">{hospital.licenseNumber}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {userRole === 'parent' && record.status === 'issued' && (
                <div className="bg-white rounded-lg border p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Actions</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 sm:py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base">
                      <Download className="w-4 h-4" />
                      <span>Download Birth Certificate</span>
                    </button>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base">
                      <Printer className="w-4 h-4" />
                      <span>Print Certificate</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}