import React from 'react';
import AdminDashboard from './admindashboard/AdminDashboard'
import SalesQuoteDashboard from './salesdashboard/SalesDashboard';

const Dashboard = () => {

    const storedRole = localStorage.getItem('role');
    const role = storedRole ? storedRole.toLowerCase() : '';


    if (role.toLowerCase() === 'admin') {
        return <AdminDashboard />;
    } else if (role.toLowerCase() === 'salesexecutive') {
        return <SalesQuoteDashboard />;
    }
    else {
        return <div>Unknown role. Please contact support.</div>;
    }
};

export default Dashboard;