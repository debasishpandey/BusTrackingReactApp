import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[999] bg-[#212529] text-white shadow min-h-[56px]">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link
          to="/admin-dashboard"
          className="text-base font-semibold flex items-center gap-2 no-underline text-white"
        >
          🚌 BusTrack Admin
        </Link>

        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        <div
          className={`lg:flex ${menuOpen ? 'flex' : 'hidden'} flex-col lg:flex-row lg:items-center w-full lg:w-auto mt-3 lg:mt-0 space-y-2 lg:space-y-0 lg:space-x-4`}
        >
          <Link to="/admin-dashboard" className="text-base no-underline text-white hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/admin-dashboard/bus/view-all" className="text-base no-underline text-white hover:text-gray-300">
            Buses
          </Link>
          <Link to="/admin-dashboard/student/view-all" className="text-base no-underline text-white hover:text-gray-300">
            Students
          </Link>
          <Link to="/admin-dashboard/driver/view-all" className="text-base no-underline text-white hover:text-gray-300">
            Drivers
          </Link>

          {/* Dropdown */}
          <div className="relative group">
            <button className="text-base no-underline text-white hover:text-gray-300">Admin ▾</button>
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg hidden group-hover:block z-50">
              <Link to="/admin/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Profile
              </Link>
              <Link to="/admin/settings" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Settings
              </Link>
              <div className="border-t border-gray-200"></div>
              <Link to="/" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
