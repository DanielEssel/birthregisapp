import React, { useState } from "react";
import {
  Search,
  Filter,
  Baby,
  Calendar,
  MapPin,
  Phone,
  QrCode,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Heart,
} from "lucide-react";
import Layout from "../Layout";
import BirthRecordDetails from "../BirthRecordDetails";
import { BirthRecord } from "../../types";
import {
  mockBirthRecords,
  getStatusColor,
  getStatusText,
  getStageColor,
} from "../../data/mockData";

export default function ParentDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState<BirthRecord | null>(
    null
  );

  // Filter records for current parent (in real app, this would be based on user ID)
  const parentRecords = mockBirthRecords.filter(
    (record) =>
      record.motherName === "Maria Elena Santos" ||
      record.motherName === "Rosa Reyes" ||
      record.motherName === "Carmen Garcia"
  );

  const filteredRecords = parentRecords.filter((record) => {
    const matchesSearch = record.childName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout
      title="Parent Dashboard"
      subtitle="Track your children's birth registration"
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Your Children's Records
              </h1>
              <p className="text-blue-100">
                Track birth registration progress and access certificates
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">islaBirth System</p>
              <p className="text-lg font-semibold">Parent Portal</p>
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Baby className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {parentRecords.length}
                </p>
                <p className="text-sm text-gray-500">Children Registered</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              All birth records in the system
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {parentRecords.filter((r) => r.status === "completed").length}
                </p>
                <p className="text-sm text-gray-500">Certificates Ready</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Available for download
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <QrCode className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {parentRecords.filter((r) => r.provisionalId).length}
                </p>
                <p className="text-sm text-gray-500">Provisional IDs</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Immediate health record access
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            How islaBirth Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Baby className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                1. Immediate Capture
              </h4>
              <p className="text-sm text-gray-600">
                Health worker records birth at delivery point
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <QrCode className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                2. Provisional ID
              </h4>
              <p className="text-sm text-gray-600">
                Instant ID generation with QR code confirmation
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-teal-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                3. Health Integration
              </h4>
              <p className="text-sm text-gray-600">
                Progressive completion during health visits
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                4. Final Registration
              </h4>
              <p className="text-sm text-gray-600">
                Official certificate issuance
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by child's name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        {/* Birth Records */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Children's Birth Records
          </h2>

          {filteredRecords.length === 0 ? (
            <div className="bg-white rounded-xl p-8 shadow-sm border text-center">
              <Baby className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No records found
              </h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Your children's birth records will appear here once registered by health workers."}
              </p>
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
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStageColor(
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
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${record.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                          <span
                            className={
                              record.currentStep >= 1
                                ? "text-blue-600 font-medium"
                                : ""
                            }
                          >
                            Birth Captured
                          </span>
                          <span
                            className={
                              record.currentStep >= 2
                                ? "text-blue-600 font-medium"
                                : ""
                            }
                          >
                            Provisional ID
                          </span>
                          <span
                            className={
                              record.currentStep >= 3
                                ? "text-blue-600 font-medium"
                                : ""
                            }
                          >
                            Health Integration
                          </span>
                          <span
                            className={
                              record.currentStep >= 4
                                ? "text-blue-600 font-medium"
                                : ""
                            }
                          >
                            Certificate Ready
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span>
                              Recorded:{" "}
                              {new Date(
                                record.birthCapturedDate
                              ).toLocaleDateString()}
                            </span>
                            <span>Physician: {record.attendingPhysician}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {/* View Details */}
                          <button
                            onClick={() => setSelectedRecord(record)}
                            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>

                          {/* QR Code */}
                          {record.qrCode && (
                            <button className="flex items-center gap-1 rounded-md bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 hover:bg-purple-200 transition-colors">
                              <QrCode className="w-4 h-4" />
                              <span>QR Code</span>
                            </button>
                          )}

                          {/* Download Certificate */}
                          {record.status === "completed" && (
                            <button className="flex items-center gap-1 rounded px-3 py-1 text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 transition-colors">
                              <Download className="w-4 h-4" />
                              <span>Download</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Information Notice */}
                      {record.requiresInfo &&
                        record.requiresInfo.length > 0 && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800">
                              <span className="font-medium">
                                Next health visit:{" "}
                              </span>
                              Additional information will be collected to
                              complete the registration process.
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

        {/* Record Details Modal */}
        {selectedRecord && (
          <BirthRecordDetails
            record={selectedRecord}
            onClose={() => setSelectedRecord(null)}
            userRole="parent"
          />
        )}
      </div>
    </Layout>
  );
}
