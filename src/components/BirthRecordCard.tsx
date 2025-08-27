import React from 'react';
import { Calendar, MapPin, User, Phone, FileText, Clock, CheckCircle, AlertCircle, Eye, Edit3, Download, Printer } from 'lucide-react';
import { BirthRecord } from '../types';
import { getStatusColor, getStatusText, getWorkflowSteps } from '../data/mockData';

interface BirthRecordCardProps {
  record: BirthRecord;
  userRole: 'parent' | 'health_worker' | 'registry_staff';
  onView?: (record: BirthRecord) => void;
  onEdit?: (record: BirthRecord) => void;
  onVerify?: (record: BirthRecord) => void;
  onApprove?: (record: BirthRecord) => void;
  onIssue?: (record: BirthRecord) => void;
}

export default function BirthRecordCard({ 
  record, 
  userRole, 
  onView, 
  onEdit, 
  onVerify, 
  onApprove, 
  onIssue 
}: BirthRecordCardProps) {
  const steps = getWorkflowSteps(userRole);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'issued':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-purple-500" />;
      case 'under_review':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'submitted':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const renderActions = () => {
    const actions = [];

    // Common view action
    if (onView) {
      actions.push(
        <button
          key="view"
          onClick={() => onView(record)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </button>
      );
    }

    // Role-specific actions
    switch (userRole) {
      case 'parent':
        if (record.status === 'draft' && onEdit) {
          actions.push(
            <button
              key="edit"
              onClick={() => onEdit(record)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-sm font-medium transition-colors flex items-center space-x-1"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          );
        }
        if (record.status === 'issued') {
          actions.push(
            <button
              key="download"
              className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded text-sm font-medium transition-colors flex items-center space-x-1"
            >
              <Download className="w-3 h-3" />
              <span>Download</span>
            </button>
          );
        }
        break;

      case 'health_worker':
        if (record.status === 'submitted' && onVerify) {
          actions.push(
            <button
              key="verify"
              onClick={() => onVerify(record)}
              className="bg-teal-100 hover:bg-teal-200 text-teal-800 px-3 py-1 rounded text-sm font-medium transition-colors"
            >
              Verify
            </button>
          );
        }
        break;

      case 'registry_staff':
        if (record.status === 'verified' && onApprove) {
          actions.push(
            <button
              key="approve"
              onClick={() => onApprove(record)}
              className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded text-sm font-medium transition-colors"
            >
              Approve
            </button>
          );
        }
        if (record.status === 'approved' && onIssue) {
          actions.push(
            <button
              key="issue"
              onClick={() => onIssue(record)}
              className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1 rounded text-sm font-medium transition-colors flex items-center space-x-1"
            >
              <Printer className="w-3 h-3" />
              <span>Issue Certificate</span>
            </button>
          );
        }
        break;
    }

    return actions;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{record.childName}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Born: {new Date(record.dateOfBirth).toLocaleDateString()} at {record.timeOfBirth}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{record.placeOfBirth}</span>
                </div>
              </div>
              {record.registrationNumber && (
                <div className="mt-1 text-sm text-blue-600 font-medium">
                  Registration #: {record.registrationNumber}
                </div>
              )}
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(record.status)}`}>
              {getStatusIcon(record.status)}
              <span className="ml-2">{getStatusText(record.status)}</span>
            </span>
          </div>

          {/* Parent Information */}
          <div className="mb-4 text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>Parents: {record.motherName} & {record.fatherName}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>{record.contactPhone}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Registration Progress</span>
              <span className="text-sm text-gray-500">{record.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${record.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              {steps.map((step, index) => (
                <span
                  key={step.id}
                  className={`${record.currentStep >= step.id ? 'text-blue-600 font-medium' : ''}`}
                >
                  {step.title}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>Submitted: {record.submittedDate ? new Date(record.submittedDate).toLocaleDateString() : 'Not submitted'}</span>
                <span>Documents: {record.documents.length}</span>
                {record.attendingPhysician && (
                  <span>Physician: {record.attendingPhysician}</span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {renderActions()}
            </div>
          </div>

          {/* Notes or Rejection Reason */}
          {(record.notes || record.rejectionReason) && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-medium">
                  {record.rejectionReason ? 'Rejection Reason: ' : 'Notes: '}
                </span>
                {record.rejectionReason || record.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}