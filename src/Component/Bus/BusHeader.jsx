import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BusHeader = () => {
  return (
    <div className="bus-header bg-gradient p-3 shadow-sm" style={{ background: 'linear-gradient(to right, #f8f9fa, #e9ecef)' }}>
      <div className="container d-flex justify-content-between align-items-center">
        <h4 className="mb-0 fw-bold text-primary">
          🚌 Bus Management
        </h4>

        <div className="d-flex gap-2">
          <NavLink to="/admin-dashboard/bus/view-all">
            {({ isActive }) => (
              <Button
                variant={isActive ? 'primary' : 'outline-dark'}
                className="rounded-pill px-4"
              >
                All Buses
              </Button>
            )}
          </NavLink>

          <NavLink to="/admin-dashboard/bus/add">
            {({ isActive }) => (
              <Button
                variant={isActive ? 'primary' : 'outline-dark'}
                className="rounded-pill px-4"
              >
                Add Bus
              </Button>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BusHeader;
