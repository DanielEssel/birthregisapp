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
  Menu,
  X,
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
  const [selectedRecord, setSelectedRecord] = useState<BirthRecord | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // In real app → filter by logged-in parent ID
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
    <Layout title="Parent Dashboard" subtitle="Track your children's birth registration">
      <div className="space-y-6 sm:space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Your Children's Records</h1>
              <p className="text-sm sm:text-base text-blue-100">Track registration progress and access certificates</p>
            </div>
            <div className="text-right">
              <p className="text-xs sm:text-sm text-blue-100">islaBirth System</p>
              <p className="text-sm sm:text-lg font-semibold">Parent Portal</p>
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
                <Baby className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div className="ml-2 sm:ml-3 lg:ml-4 min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  {parentRecords.length}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">Children Registered</p>
              </div>
            </div>
            <div className="mt-2 sm:mt-3 lg:mt-4 text-xs sm:text-sm text-gray-500">All records in the system</div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-teal-100 rounded-lg">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-teal-600" />
              </div>
              <div className="ml-2 sm:ml-3 lg:ml-4 min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  {parentRecords.filter((r) => r.status === "verified").length}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">Verified Records</p>
              </div>
            </div>
            <div className="mt-2 sm:mt-3 lg:mt-4 text-xs sm:text-sm text-gray-500">Approved and validated</div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-purple-100 rounded-lg">
                <QrCode className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-600" />
              </div>
              <div className="ml-2 sm:ml-3 lg:ml-4 min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  {parentRecords.filter((r) => r.qrCode).length}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">QR Codes</p>
              </div>
            </div>
            <div className="mt-2 sm:mt-3 lg:mt-4 text-xs sm:text-sm text-gray-500">For digital verification</div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
              </div>
              <div className="ml-2 sm:ml-3 lg:ml-4 min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  {parentRecords.filter((r) => r.status === "completed").length}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">Certificates</p>
              </div>
            </div>
            <div className="mt-2 sm:mt-3 lg:mt-4 text-xs sm:text-sm text-gray-500">Available for download</div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search by child name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
              />
            </div>

            <div className="flex items-center justify-between sm:hidden">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg text-gray-700"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filters</span>
                {showMobileFilters ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
              <span className="text-sm text-gray-500">{filteredRecords.length} records</span>
            </div>

            <div className={`${showMobileFilters ? "block" : "hidden"} sm:block`}>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="provisional">Provisional</option>
                <option value="verified">Verified</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Records */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Birth Records</h2>

          {filteredRecords.length === 0 ? (
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border text-center">
              <Baby className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No records found</h3>
              <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div key={record.id} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">{record.childName}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Born: {new Date(record.dateOfBirth).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{record.placeOfBirth}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1 ml-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStageColor(record.stage)}`}>
                          {record.stage}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusColor(record.status)}`}>
                          {getStatusText(record.status)}
                        </span>
                      </div>
                    </div>

                    {/* Mother Info */}
                    <div className="text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{record.contactPhone}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
                      <button
                        onClick={() => setSelectedRecord(record)}
                        className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium flex items-center space-x-1"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>View Details</span>
                      </button>

                      {record.qrCode && (
                        <button className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs sm:text-sm font-medium flex items-center space-x-1">
                          <QrCode className="w-3 h-3" />
                          <span>QR</span>
                        </button>
                      )}

                      {record.certificateUrl && (
                        <button className="bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded text-xs sm:text-sm font-medium flex items-center space-x-1">
                          <Download className="w-3 h-3" />
                          <span>Certificate</span>
                        </button>
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
