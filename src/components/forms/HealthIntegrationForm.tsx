import React, { useState } from 'react';
import { X, User, FileText, CheckCircle, AlertCircle, Users, Home, Heart, Calendar } from 'lucide-react';
import { HealthIntegrationFormData, BirthRecord } from '../../types';

interface HealthIntegrationFormProps {
  record: BirthRecord;
  onClose: () => void;
  onSubmit: (data: HealthIntegrationFormData) => void;
}

export default function HealthIntegrationForm({ record, onClose, onSubmit }: HealthIntegrationFormProps) {
  const [formData, setFormData] = useState<HealthIntegrationFormData>({
    fatherName: record.fatherName || '',
    fatherAge: record.fatherAge?.toString() || '',
    fatherNationality: record.fatherNationality || 'Filipino',
    fatherOccupation: record.fatherOccupation || '',
    fatherAddress: record.fatherAddress || '',
    fatherIdNumber: record.fatherIdNumber || '',
    fatherIdType: record.fatherIdType || 'drivers_license',
    
    motherIdNumber: record.motherIdNumber || '',
    motherIdType: record.motherIdType || 'drivers_license',
    
    householdSize: '',
    householdIncome: '',
    
    parentsMarried: false,
    marriageDate: '',
    marriagePlace: '',
    marriageCertificateNumber: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof HealthIntegrationFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.motherIdNumber.trim()) {
      newErrors.motherIdNumber = 'Mother\'s ID number is required for civil registration';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Health Integration Update</h2>
            <p className="text-gray-600">Complete registration details for {record.childName}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm text-blue-600 font-medium">Provisional ID: {record.provisionalId}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Current Child Information */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Baby className="w-5 h-5 mr-2 text-blue-600" />
              Current Registration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Child:</span>
                <p className="font-medium">{record.childName}</p>
              </div>
              <div>
                <span className="text-gray-500">Born:</span>
                <p className="font-medium">{new Date(record.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-gray-500">Mother:</span>
                <p className="font-medium">{record.motherName}</p>
              </div>
            </div>
          </div>

          {/* Mother's ID Information */}
          <div className="bg-pink-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-pink-600" />
              Mother's Identification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Type *
                </label>
                <select
                  value={formData.motherIdType}
                  onChange={(e) => handleInputChange('motherIdType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="drivers_license">Driver's License</option>
                  <option value="passport">Passport</option>
                  <option value="sss_id">SSS ID</option>
                  <option value="philhealth_id">PhilHealth ID</option>
                  <option value="voters_id">Voter's ID</option>
                  <option value="postal_id">Postal ID</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Number *
                </label>
                <input
                  type="text"
                  value={formData.motherIdNumber}
                  onChange={(e) => handleInputChange('motherIdNumber', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.motherIdNumber ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter ID number"
                />
                {errors.motherIdNumber && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.motherIdNumber}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Father Information */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Father's Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter father's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.fatherAge}
                  onChange={(e) => handleInputChange('fatherAge', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality
                </label>
                <input
                  type="text"
                  value={formData.fatherNationality}
                  onChange={(e) => handleInputChange('fatherNationality', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Filipino"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation
                </label>
                <input
                  type="text"
                  value={formData.fatherOccupation}
                  onChange={(e) => handleInputChange('fatherOccupation', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Engineer, Farmer, etc."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.fatherAddress}
                  onChange={(e) => handleInputChange('fatherAddress', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Complete address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Type
                </label>
                <select
                  value={formData.fatherIdType}
                  onChange={(e) => handleInputChange('fatherIdType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="drivers_license">Driver's License</option>
                  <option value="passport">Passport</option>
                  <option value="sss_id">SSS ID</option>
                  <option value="philhealth_id">PhilHealth ID</option>
                  <option value="voters_id">Voter's ID</option>
                  <option value="postal_id">Postal ID</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Number
                </label>
                <input
                  type="text"
                  value={formData.fatherIdNumber}
                  onChange={(e) => handleInputChange('fatherIdNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter ID number"
                />
              </div>
            </div>
          </div>

          {/* Household Information */}
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Home className="w-5 h-5 mr-2 text-green-600" />
              Household Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Household Size
                </label>
                <input
                  type="number"
                  value={formData.householdSize}
                  onChange={(e) => handleInputChange('householdSize', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Number of family members"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Household Income
                </label>
                <select
                  value={formData.householdIncome}
                  onChange={(e) => handleInputChange('householdIncome', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select income range</option>
                  <option value="below_10k">Below ₱10,000</option>
                  <option value="10k_25k">₱10,000 - ₱25,000</option>
                  <option value="25k_50k">₱25,000 - ₱50,000</option>
                  <option value="50k_100k">₱50,000 - ₱100,000</option>
                  <option value="above_100k">Above ₱100,000</option>
                </select>
              </div>
            </div>
          </div>

          {/* Marriage Information */}
          <div className="bg-purple-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-purple-600" />
              Marriage Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="parentsMarried"
                  checked={formData.parentsMarried}
                  onChange={(e) => handleInputChange('parentsMarried', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="parentsMarried" className="text-sm font-medium text-gray-700">
                  Parents are legally married
                </label>
              </div>

              {formData.parentsMarried && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marriage Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        value={formData.marriageDate}
                        onChange={(e) => handleInputChange('marriageDate', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marriage Certificate Number
                    </label>
                    <input
                      type="text"
                      value={formData.marriageCertificateNumber}
                      onChange={(e) => handleInputChange('marriageCertificateNumber', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Certificate number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Place of Marriage
                    </label>
                    <input
                      type="text"
                      value={formData.marriagePlace}
                      onChange={(e) => handleInputChange('marriagePlace', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City, Province"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Information Notice */}
          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-yellow-800 mb-2">Progressive Registration</h4>
                <p className="text-sm text-yellow-700">
                  This information is collected progressively during health visits (immunizations, postnatal care). 
                  Complete information enables final civil registration and official birth certificate issuance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-500">
            Health Integration - Stage 3 of 4
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
            >
              Update Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}