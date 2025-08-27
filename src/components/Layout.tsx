import React, { useState } from "react";
import { Heart, Menu, X, LogOut, Bell, User, Settings } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import NotificationCenter from "./NotificationCenter";
import { mockNotifications } from "../data/mockData";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function Layout({ children, title, subtitle }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();

  const unreadNotifications = mockNotifications.filter(
    (n) => n.userId === user?.id && !n.read
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:max-w-7xl xl:mx-auto">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg sm:rounded-xl">
                  <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="block sm:block">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                    islaBirth
                  </h1>
                </div>
              </div>

              {/* Title section - responsive visibility */}
              <div className="hidden lg:block border-l border-gray-200 pl-4 min-w-0">
                <h2 className="text-base lg:text-lg font-medium text-gray-900 truncate">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-sm text-gray-500 truncate">{subtitle}</p>
                )}
              </div>

              {/* Mobile/Tablet Title */}
              <div className="block lg:hidden border-l border-gray-200 pl-2 sm:pl-4 min-w-0 flex-1">
                <h2 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-xs sm:text-sm text-gray-500 truncate hidden sm:block">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
              <button
                onClick={() => setShowNotifications(true)}
                className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications > 9 ? "9+" : unreadNotifications}
                  </span>
                )}
              </button>

              <div className="flex items-center space-x-3">
                <div className="text-right hidden xl:block">
                  <p className="text-sm font-medium text-gray-900 max-w-32 truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role?.replace("_", " ")}
                  </p>
                </div>
                {user?.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                )}
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tablet Navigation (md breakpoint) */}
            <div className="hidden md:flex lg:hidden items-center space-x-2">
              <button
                onClick={() => setShowNotifications(true)}
                className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications > 9 ? "9+" : unreadNotifications}
                  </span>
                )}
              </button>

              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-lg object-cover"
                />
              )}

              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-3 sm:px-4 py-3 space-y-3">
              <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
                {user?.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 capitalize">
                    {user?.role?.replace("_", " ")}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => {
                    setShowNotifications(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-3 py-2.5 sm:py-3 text-left text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Notifications</span>
                  {unreadNotifications > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[1.25rem] text-center">
                      {unreadNotifications > 99 ? "99+" : unreadNotifications}
                    </span>
                  )}
                </button>
                <button className="flex items-center space-x-3 w-full px-3 py-2.5 sm:py-3 text-left text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                  <User className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Profile</span>
                </button>
                <button className="flex items-center space-x-3 w-full px-3 py-2.5 sm:py-3 text-left text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Settings</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-3 py-2.5 sm:py-3 text-left text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:max-w-7xl xl:mx-auto py-4 sm:py-6 md:py-8">
        {children}
      </main>

      {/* Notification Center */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        userId={user?.id || ""}
      />
    </div>
  );
}
