import React from 'react';
import { X, Calendar, Clock, User, Phone, Mail, MapPin, Heart, FileText, Download, CheckCircle, AlertCircle, Baby, Weight, Ruler } from 'lucide-react';
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
    if (status === 'completed') return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === 'current') return <Clock className="w-5 h-5 text-blue-500" />;
    return <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{record.childName}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
              {record.registrationNumber && (
                <span className="font-medium text-blue-600">#{record.registrationNumber}</span>
              )}
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                {getStatusText(record.status)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Child Information */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Baby className="w-5 h-5 mr-2 text-blue-600" />
                  Child Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <p className="font-medium text-gray-900">{record.childName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Date of Birth</label>
                      <p className="font-medium text-gray-900 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(record.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Time of Birth</label>
                      <p className="font-medium text-gray-900 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {record.timeOfBirth}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Gender</label>
                      <p className="font-medium text-gray-900 capitalize">{record.gender}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Weight</label>
                      <p className="font-medium text-gray-900 flex items-center">
                        <Weight className="w-4 h-4 mr-1" />
                        {record.weight} kg
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Length</label>
                      <p className="font-medium text-gray-900 flex items-center">
                        <Ruler className="w-4 h-4 mr-1" />
                        {record.length} cm
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-purple-600" />
                  Parent Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mother */}
                  <div className="bg-pink-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Mother</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Name:</span>
                        <span className="ml-2 font-medium">{record.motherName}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Age:</span>
                        <span className="ml-2 font-medium">{record.motherAge}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Nationality:</span>
                        <span className="ml-2 font-medium">{record.motherNationality}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Occupation:</span>
                        <span className="ml-2 font-medium">{record.motherOccupation}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Address:</span>
                        <span className="ml-2 font-medium">{record.motherAddress}</span>
                      </div>
                    </div>
                  </div>

                  {/* Father */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Father</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Name:</span>
                        <span className="ml-2 font-medium">{record.fatherName}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Age:</span>
                        <span className="ml-2 font-medium">{record.fatherAge}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Nationality:</span>
                        <span className="ml-2 font-medium">{record.fatherNationality}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Occupation:</span>
                        <span className="ml-2 font-medium">{record.fatherOccupation}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Address:</span>
                        <span className="ml-2 font-medium">{record.fatherAddress}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-600" />
                  Medical Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Hospital/Facility</label>
                    <p className="font-medium text-gray-900 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hospital?.name || record.placeOfBirth}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Attending Physician</label>
                    <p className="font-medium text-gray-900">{record.attendingPhysician}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Medical Certificate #</label>
                    <p className="font-medium text-gray-900">{record.medicalCertificateNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Delivery Type</label>
                    <p className="font-medium text-gray-900 capitalize">{record.deliveryType}</p>
                  </div>
                  {record.complications && (
                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-500">Complications</label>
                      <p className="font-medium text-gray-900">{record.complications}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-green-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Primary Phone</label>
                    <p className="font-medium text-gray-900 flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {record.contactPhone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium text-gray-900 flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {record.contactEmail}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Emergency Contact</label>
                    <p className="font-medium text-gray-900">{record.emergencyContact}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Emergency Phone</label>
                    <p className="font-medium text-gray-900">{record.emergencyPhone}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-orange-600" />
                  Documents ({record.documents.length})
                </h3>
                <div className="space-y-3">
                  {record.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            Uploaded: {new Date(doc.uploadedDate).toLocaleDateString()} • 
                            {(doc.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.verified ? (
                          <div className="flex items-center space-x-1 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-xs">Verified</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 text-yellow-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs">Pending</span>
                          </div>
                        )}
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress Timeline */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Progress</h3>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getStepIcon(step.id)}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
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
                        <div className={`absolute left-[22px] mt-8 w-0.5 h-6 ${
                          getStepStatus(step.id) === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                        }`} style={{ position: 'relative', left: '10px', marginTop: '8px' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Information */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Submitted:</span>
                    <span className="font-medium">
                      {record.submittedDate ? new Date(record.submittedDate).toLocaleDateString() : 'Not submitted'}
                    </span>
                  </div>
                  {record.verifiedBy && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Verified by:</span>
                      <span className="font-medium">{record.verifiedBy}</span>
                    </div>
                  )}
                  {record.approvedBy && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Approved by:</span>
                      <span className="font-medium">{record.approvedBy}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Documents:</span>
                    <span className="font-medium">{record.documents.length} files</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Progress:</span>
                    <span className="font-medium">{record.progress}%</span>
                  </div>
                </div>
              </div>

              {/* Hospital Information */}
              {hospital && (
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-red-600" />
                    Hospital Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <span className="ml-2 font-medium">{hospital.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Address:</span>
                      <span className="ml-2 font-medium">{hospital.address}, {hospital.city}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Contact:</span>
                      <span className="ml-2 font-medium">{hospital.contactNumber}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">License:</span>
                      <span className="ml-2 font-medium">{hospital.licenseNumber}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {userRole === 'parent' && record.status === 'issued' && (
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download Birth Certificate</span>
                    </button>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
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