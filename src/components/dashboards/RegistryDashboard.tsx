import React, { useState } from 'react';
import { 
  Search, Filter, Download, BarChart3, TrendingUp, Users, FileText, Clock, 
  CheckCircle, AlertTriangle, Calendar, MapPin, Eye, Edit3, Printer
} from 'lucide-react';
import Layout from '../Layout';

interface BirthRecord {
  id: string;
  registrationNumber: string;
  childName: string;
  parentNames: string;
  dateOfBirth: string;
  placeOfBirth: string;
  dateRegistered: string;
  verifiedBy: string;
  status: 'completed' | 'pending_approval' | 'issued';
  certificateIssued: boolean;
}

export default function RegistryDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data
  const birthRecords: BirthRecord[] = [
    {
      id: '1',
      registrationNumber: 'BR-2024-001234',
      childName: 'Sofia Maria Santos',
      parentNames: 'Maria Santos & Carlos Santos',
      dateOfBirth: '2024-01-15',
      placeOfBirth: 'Manila General Hospital',
      dateRegistered: '2024-01-18',
      verifiedBy: 'Dr. Juan Cruz',
      status: 'completed',
      certificateIssued: true
    },
    {
      id: '2',
      registrationNumber: 'BR-2024-001235',
      childName: 'Juan Carlos Dela Cruz',
      parentNames: 'Maria Dela Cruz & Jose Dela Cruz',
      dateOfBirth: '2024-01-16',
      placeOfBirth: 'St. Luke\'s Medical Center',
      dateRegistered: '2024-01-19',
      verifiedBy: 'Dr. Ana Rodriguez',
      status: 'pending_approval',
      certificateIssued: false
    },
    {
      id: '3',
      registrationNumber: 'BR-2024-001236',
      childName: 'Ana Isabel Martinez',
      parentNames: 'Carmen Martinez & Miguel Martinez',
      dateOfBirth: '2024-01-20',
      placeOfBirth: 'Philippine General Hospital',
      dateRegistered: '2024-01-22',
      verifiedBy: 'Dr. Luis Garcia',
      status: 'issued',
      certificateIssued: true
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />;
      case 'pending_approval':
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />;
      case 'issued':
        return <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
      default:
        return <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending_approval':
        return 'Pending Approval';
      case 'issued':
        return 'Certificate Issued';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending_approval':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'issued':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredRecords = birthRecords.filter(record => {
    const matchesSearch = 
      record.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.parentNames.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Mock analytics data
  const analyticsData = {
    totalRegistrations: 1247,
    completedToday: 23,
    pendingApproval: 45,
    certificatesIssued: 1180,
    monthlyGrowth: 12.5,
    weeklyStats: [
      { day: 'Mon', registrations: 25 },
      { day: 'Tue', registrations: 32 },
      { day: 'Wed', registrations: 28 },
      { day: 'Thu', registrations: 41 },
      { day: 'Fri', registrations: 35 },
      { day: 'Sat', registrations: 18 },
      { day: 'Sun', registrations: 12 }
    ]
  };

  return (
    <Layout title="Registry Dashboard" subtitle="Manage birth registrations and certificates">
      <div className=" space-y-6 sm:space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg sm:rounded-2xl p-4 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Welcome, Rosa!</h1>
              <p className="text-green-100 text-sm sm:text-base">Manage birth registrations and issue certificates</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs sm:text-sm text-green-100">Manila Civil Registry Office</p>
              <p className="text-base sm:text-lg font-semibold">District 1</p>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="min-w-0">
                <p className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{analyticsData.totalRegistrations.toLocaleString()}</p>
                <p className="text-xs sm:text-sm text-gray-500">Total Registrations</p>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-lg mt-2 sm:mt-0 w-fit">
                <FileText className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+{analyticsData.monthlyGrowth}%</span>
              <span className="text-gray-500 ml-1 hidden sm:inline">this month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="min-w-0">
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{analyticsData.completedToday}</p>
                <p className="text-xs sm:text-sm text-gray-500">Completed Today</p>
              </div>
              <div className="p-2 sm:p-3 bg-green-100 rounded-lg mt-2 sm:mt-0 w-fit">
                <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
              <span className="hidden sm:inline">Processing efficiency: </span>98.5%
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="min-w-0">
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{analyticsData.pendingApproval}</p>
                <p className="text-xs sm:text-sm text-gray-500">Pending Approval</p>
              </div>
              <div className="p-2 sm:p-3 bg-orange-100 rounded-lg mt-2 sm:mt-0 w-fit">
                <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
              <span className="hidden sm:inline">Avg. processing time: </span>2.3 days
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="min-w-0">
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{analyticsData.certificatesIssued.toLocaleString()}</p>
                <p className="text-xs sm:text-sm text-gray-500">Certificates Issued</p>
              </div>
              <div className="p-2 sm:p-3 bg-purple-100 rounded-lg mt-2 sm:mt-0 w-fit">
                <Printer className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
              <span className="hidden sm:inline">Digital certificates: </span>87%
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Weekly Registration Volume</h3>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-auto"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {analyticsData.weeklyStats.map((stat) => (
                <div key={stat.day} className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600 w-8 sm:w-12">{stat.day}</span>
                  <div className="flex-1 mx-2 sm:mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div 
                        className="bg-green-600 h-1.5 sm:h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${(stat.registrations / 50) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-900 w-6 sm:w-8 text-right">{stat.registrations}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Registration Status Distribution</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm text-gray-600">Completed</span>
                </div>
                <span className="text-xs sm:text-sm font-medium">75%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm text-gray-600">Certificates Issued</span>
                </div>
                <span className="text-xs sm:text-sm font-medium">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm text-gray-600">Pending Approval</span>
                </div>
                <span className="text-xs sm:text-sm font-medium">5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search by child name, registration number, or parent names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending_approval">Pending Approval</option>
                <option value="issued">Certificate Issued</option>
              </select>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <button className="px-3 sm:px-4 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Birth Records */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Birth Registration Records</h2>
          </div>
          
          {/* Mobile Card View */}
          <div className="block lg:hidden">
            {filteredRecords.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <div key={record.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{record.childName}</h3>
                        <p className="text-xs text-gray-500 truncate">{record.registrationNumber}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border shrink-0 ml-2 ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                        <span className="ml-1">{getStatusText(record.status)}</span>
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-xs text-gray-600 mb-3">
                      <div>Parents: {record.parentNames}</div>
                      <div>Born: {new Date(record.dateOfBirth).toLocaleDateString()}</div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1 shrink-0" />
                        <span className="truncate">{record.placeOfBirth}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        Registered: {new Date(record.dateRegistered).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-green-600 hover:text-green-900 p-1">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 p-1">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {!record.certificateIssued && record.status === 'completed' && (
                          <button className="text-purple-600 hover:text-purple-900 p-1">
                            <Printer className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
                <p className="text-gray-500 text-sm px-4">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'No birth registration records available.'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Child Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Birth Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{record.registrationNumber}</div>
                      <div className="text-sm text-gray-500">Registered: {new Date(record.dateRegistered).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{record.childName}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {record.placeOfBirth}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{record.parentNames}</div>
                      <div className="text-sm text-gray-500">Verified by: {record.verifiedBy}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(record.dateOfBirth).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                        <span className="ml-2">{getStatusText(record.status)}</span>
                      </span>
                      {record.certificateIssued && (
                        <div className="text-xs text-green-600 font-medium mt-1">Certificate Issued</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-green-600 hover:text-green-900" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900" title="Edit">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {!record.certificateIssued && record.status === 'completed' && (
                          <button className="text-purple-600 hover:text-purple-900" title="Issue Certificate">
                            <Printer className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredRecords.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'No birth registration records available.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}