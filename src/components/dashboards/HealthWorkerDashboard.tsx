import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Baby,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  MapPin,
  Phone,
  Calendar,
  Eye,
  TrendingUp,
  Wifi,
  WifiOff,
  FileText,
  Heart,
  QrCode,
  Download,
  RefreshCw,
} from "lucide-react";
import Layout from "../Layout";
import BirthCaptureForm from "../forms/BirthCaptureForm";
import HealthIntegrationForm from "../forms/HealthIntegrationForm";
import BirthRecordDetails from "../BirthRecordDetails";
import OfflineIndicator from "../OfflineIndicator";
import {
  BirthRecord,
  BirthCaptureFormData,
  HealthIntegrationFormData,
} from "../../types";
import {
  mockBirthRecords,
  getStatusColor,
  getStatusText,
  getSyncStatusColor,
  getSyncStatusText,
} from "../../data/mockData";

export default function HealthWorkerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showBirthCapture, setShowBirthCapture] = useState(false);
  const [showHealthIntegration, setShowHealthIntegration] =
    useState<BirthRecord | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<BirthRecord | null>(
    null
  );
  const [birthRecords, setBirthRecords] =
    useState<BirthRecord[]>(mockBirthRecords);
  const [isOffline] = useState(false); // Mock offline state

  const filteredRecords = birthRecords.filter((record) => {
    const matchesSearch =
      record.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.motherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (record.provisionalId &&
        record.provisionalId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingSyncCount = birthRecords.filter(
    (r) => r.syncStatus === "local"
  ).length;

  const handleBirthCapture = (
    formData: BirthCaptureFormData,
    saveLocal = false
  ) => {
    const provisionalId = `PROV-${new Date().getFullYear()}-${String(
      Date.now()
    ).slice(-6)}`;
    const healthRecordId = `HR-${new Date().getFullYear()}-${String(
      Date.now()
    ).slice(-6)}`;

    const newRecord: BirthRecord = {
      id: Date.now().toString(),
      provisionalId,
      childName: formData.childName,
      dateOfBirth: formData.dateOfBirth,
      timeOfBirth: formData.timeOfBirth,
      placeOfBirth:
        mockHospitals.find((h) => h.id === formData.hospitalId)?.name || "",
      gender: formData.gender as "male" | "female",
      weight: parseFloat(formData.weight),
      length: parseFloat(formData.length),

      motherName: formData.motherName,
      motherAge: formData.motherAge ? parseInt(formData.motherAge) : undefined,
      motherNationality: formData.motherNationality,
      motherOccupation: formData.motherOccupation,
      motherAddress: formData.motherAddress,

      contactPhone: formData.contactPhone,
      contactEmail: formData.contactEmail,
      emergencyContact: formData.emergencyContact,
      emergencyPhone: formData.emergencyPhone,

      attendingPhysician: formData.attendingPhysician,
      hospitalId: formData.hospitalId,
      deliveryType: formData.deliveryType as "normal" | "cesarean" | "assisted",
      complications: formData.complications,

      healthRecordId,
      immunizationSchedule: [],
      postnatalVisits: [],

      documents: [
        {
          id: Date.now().toString(),
          name: "Birth Confirmation Slip",
          type: "confirmation_slip",
          url: `/documents/confirmation-${provisionalId}.pdf`,
          uploadedDate: new Date().toISOString(),
          verified: true,
          verifiedBy: "Current Health Worker",
          verifiedDate: new Date().toISOString(),
          size: 156432,
          mimeType: "application/pdf",
        },
      ],

      stage: saveLocal ? "immediate_capture" : "pre_registration",
      status: saveLocal ? "draft" : "provisional",
      birthCapturedDate: new Date().toISOString(),
      preRegistrationDate: saveLocal ? undefined : new Date().toISOString(),

      qrCode: `QR-${provisionalId}`,
      confirmationSlip: `CONF-${provisionalId}`,

      syncStatus: saveLocal || isOffline ? "local" : "synced",
      lastSyncDate:
        saveLocal || isOffline ? undefined : new Date().toISOString(),

      currentStep: saveLocal ? 1 : 2,
      totalSteps: 4,
      progress: saveLocal ? 25 : 50,

      createdBy: "2", // Current health worker
      requiresInfo: ["father_details", "mother_id", "household_details"],
    };

    setBirthRecords((prev) => [newRecord, ...prev]);
    setShowBirthCapture(false);
  };

  const handleHealthIntegration = (
    record: BirthRecord,
    formData: HealthIntegrationFormData
  ) => {
    setBirthRecords((prev) =>
      prev.map((r) =>
        r.id === record.id
          ? {
              ...r,
              fatherName: formData.fatherName,
              fatherAge: formData.fatherAge
                ? parseInt(formData.fatherAge)
                : undefined,
              fatherNationality: formData.fatherNationality,
              fatherOccupation: formData.fatherOccupation,
              fatherAddress: formData.fatherAddress,
              fatherIdNumber: formData.fatherIdNumber,
              fatherIdType: formData.fatherIdType,
              motherIdNumber: formData.motherIdNumber,
              motherIdType: formData.motherIdType,
              stage: "civil_registration",
              status: "verified",
              verificationDate: new Date().toISOString(),
              currentStep: 3,
              progress: 75,
              requiresInfo: [],
            }
          : r
      )
    );
    setShowHealthIntegration(null);
  };

  const handleSync = async () => {
    // Mock sync process
    setBirthRecords((prev) =>
      prev.map((r) =>
        r.syncStatus === "local"
          ? {
              ...r,
              syncStatus: "synced",
              lastSyncDate: new Date().toISOString(),
            }
          : r
      )
    );
  };

  return (
    <Layout
      title="Health Worker Dashboard"
      subtitle="Birth registration at point of delivery"
    >
      <div className="space-y-8">
        {/* Header with Offline Indicator */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Birth Registration System
              </h1>
              <p className="text-teal-100">
                Immediate capture and progressive completion
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <OfflineIndicator
                pendingSyncCount={pendingSyncCount}
                onSync={handleSync}
              />
              <button
                onClick={() => setShowBirthCapture(true)}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Record Birth</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Baby className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {
                    birthRecords.filter((r) => r.stage === "immediate_capture")
                      .length
                  }
                </p>
                <p className="text-sm text-gray-500">Births Today</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-blue-600 font-medium">+3</span>
              <span className="text-gray-500 ml-1">this shift</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <QrCode className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {
                    birthRecords.filter((r) => r.stage === "pre_registration")
                      .length
                  }
                </p>
                <p className="text-sm text-gray-500">Provisional IDs</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Generated and linked to health records
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-teal-100 rounded-lg">
                <Heart className="w-6 h-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {
                    birthRecords.filter((r) => r.stage === "health_integration")
                      .length
                  }
                </p>
                <p className="text-sm text-gray-500">Health Integration</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Progressive completion during visits
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <WifiOff className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {pendingSyncCount}
                </p>
                <p className="text-sm text-gray-500">Pending Sync</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Stored locally, will sync when online
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by child name, mother name, or provisional ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="provisional">Provisional</option>
                <option value="verified">Verified</option>
                <option value="completed">Completed</option>
                <option value="requires_info">Requires Info</option>
              </select>
            </div>
          </div>
        </div>

        {/* Birth Records */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Birth Records</h2>

          {filteredRecords.length === 0 ? (
            <div className="bg-white rounded-xl p-8 shadow-sm border text-center">
              <Baby className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No birth records found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Start by recording a new birth at the point of delivery."}
              </p>
              <button
                onClick={() => setShowBirthCapture(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Record New Birth
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {record.childName}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Born:{" "}
                                {new Date(
                                  record.dateOfBirth
                                ).toLocaleDateString()}{" "}
                                at {record.timeOfBirth}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{record.placeOfBirth}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            {record.provisionalId && (
                              <div className="text-sm text-purple-600 font-medium">
                                Provisional ID: {record.provisionalId}
                              </div>
                            )}
                            {record.registrationNumber && (
                              <div className="text-sm text-green-600 font-medium">
                                Registration #: {record.registrationNumber}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                              record.stage
                            )}`}
                          >
                            {record.stage
                              .replace("_", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </span>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                              record.status
                            )}`}
                          >
                            {getStatusText(record.status)}
                          </span>
                        </div>
                      </div>

                      {/* Mother Information */}
                      <div className="mb-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>Mother: {record.motherName}</span>
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
                          <span className="text-sm font-medium text-gray-700">
                            Registration Progress
                          </span>
                          <span className="text-sm text-gray-500">
                            {record.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-teal-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${record.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                          <span
                            className={
                              record.currentStep >= 1
                                ? "text-teal-600 font-medium"
                                : ""
                            }
                          >
                            Immediate Capture
                          </span>
                          <span
                            className={
                              record.currentStep >= 2
                                ? "text-teal-600 font-medium"
                                : ""
                            }
                          >
                            Pre-Registration
                          </span>
                          <span
                            className={
                              record.currentStep >= 3
                                ? "text-teal-600 font-medium"
                                : ""
                            }
                          >
                            Health Integration
                          </span>
                          <span
                            className={
                              record.currentStep >= 4
                                ? "text-teal-600 font-medium"
                                : ""
                            }
                          >
                            Civil Registration
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span>
                              Captured:{" "}
                              {new Date(
                                record.birthCapturedDate
                              ).toLocaleDateString()}
                            </span>
                            <span>Physician: {record.attendingPhysician}</span>
                            {record.healthRecordId && (
                              <span>Health ID: {record.healthRecordId}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setSelectedRecord(record)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>

                          {record.stage === "health_integration" && (
                            <button
                              onClick={() => setShowHealthIntegration(record)}
                              className="bg-teal-100 hover:bg-teal-200 text-teal-800 px-3 py-1 rounded text-sm font-medium transition-colors"
                            >
                              Complete Info
                            </button>
                          )}

                          {record.qrCode && (
                            <button className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1 rounded text-sm font-medium transition-colors flex items-center space-x-1">
                              <QrCode className="w-3 h-3" />
                              <span>QR Code</span>
                            </button>
                          )}

                          {record.confirmationSlip && (
                            <button className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded text-sm font-medium transition-colors flex items-center space-x-1">
                              <Download className="w-3 h-3" />
                              <span>Slip</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Required Information Notice */}
                      {record.requiresInfo &&
                        record.requiresInfo.length > 0 && (
                          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-sm text-yellow-800">
                              <span className="font-medium">
                                Still needed:{" "}
                              </span>
                              {record.requiresInfo
                                .map((info) => info.replace("_", " "))
                                .join(", ")}
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Birth Capture Form */}
        {showBirthCapture && (
          <BirthCaptureForm
            onClose={() => setShowBirthCapture(false)}
            onSubmit={handleBirthCapture}
            isOffline={isOffline}
          />
        )}

        {/* Health Integration Form */}
        {showHealthIntegration && (
          <HealthIntegrationForm
            record={showHealthIntegration}
            onClose={() => setShowHealthIntegration(null)}
            onSubmit={(data) =>
              handleHealthIntegration(showHealthIntegration, data)
            }
          />
        )}

        {/* Record Details Modal */}
        {selectedRecord && (
          <BirthRecordDetails
            record={selectedRecord}
            onClose={() => setSelectedRecord(null)}
            userRole="health_worker"
          />
        )}
      </div>
    </Layout>
  );
}
