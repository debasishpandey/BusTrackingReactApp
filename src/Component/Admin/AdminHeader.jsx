import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/admin-dashboard" className="text-lg font-bold flex items-center gap-2">
          🚌 BusTrack Admin
        </Link>

        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d={isMenuOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <nav className={`flex-col lg:flex lg:flex-row lg:items-center gap-6 ${isMenuOpen ? 'flex' : 'hidden'}`}>
          <Link className="text-sm hover:text-gray-300" to="/admin-dashboard">Dashboard</Link>
          <Link className="text-sm hover:text-gray-300" to="/admin-dashboard/bus/view-all">Buses</Link>
          <Link className="text-sm hover:text-gray-300" to="/admin-dashboard/student/view-all">Students</Link>
          <Link className="text-sm hover:text-gray-300" to="/admin-dashboard/driver/view-all">Drivers</Link>
          <Link className="text-sm hover:text-gray-300" to="/admin-dashboard/route">Routes</Link>
        </nav>

        {/* Admin Dropdown */}
        <div className="relative ml-auto">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="text-sm font-medium hover:text-gray-300"
          >
            Admin ▾
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
              <Link to="/admin/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</Link>
              <Link to="/admin/settings" className="block px-4 py-2 text-sm hover:bg-gray-100">Settings</Link>
              <div className="border-t border-gray-200"></div>
              <Link to="/logout" className="block px-4 py-2 text-sm hover:bg-gray-100">Logout</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
