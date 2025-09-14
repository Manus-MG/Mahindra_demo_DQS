import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import Home from '../pages/home/Home';
import About from '../pages/home/About';
import LayoutComponent from '../layout/LayoutComponent';
import AdminDashboard from '../pages/dashboard/admindashboard/AdminDashboard';
import AgentDashboard from '../pages/dashboard/agentdashboard/AgentDashboard';
import ClientDashboard from '../pages/dashboard/clientdashboard/ClientDashboard';
import ManageCredential from '../pages/management/ManageCredential';
import MyProfile from '../components/MyProfile';
import AllQuotes from '../pages/sales/AllQuotes';
import AddQuote from '../pages/sales/AddQuote';
import SalesQuoteDashboard from '../pages/dashboard/salesdashboard/SalesDashboard';
import AccessoriesTable from '../pages/admin/AllAccessories';
import VehiclePricingTable from '../pages/admin/PriceList';
// import { Dashboard } from '@mui/icons-material';
import Dashboard from '../pages/dashboard/Dashboard';
import InsurancePlansManagement from '../pages/admin/InsuranceManagement';
import DiscountSchemesManagement from '../pages/admin/AllScheme';
const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: 'dashboard',
      element: <LayoutComponent />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: 'agent-dashboard',
          element: <AgentDashboard />,
        },
        {
          path: 'client-dashboard',
          element: <ClientDashboard />,
        },
        {
          path: 'sales-dashboard',
          element: <SalesQuoteDashboard />,
        },
        {
          path: 'manage-credential',
          element: <ManageCredential />,
        },
        {
          path: 'my-profile',
          element: <MyProfile />,
        },
      ],
    },
    {
      path: 'quotes',
      element: <LayoutComponent />,
      children: [
        {
          path: 'all-quotes',
          element: <AllQuotes />,
        },
        {
          path:'add-quote',
          element:<AddQuote/>

        }
      ]
    },
    {
      path: 'accessories',
      element: <LayoutComponent />,
      children: [
        {
          path: 'all-accessories',
          element: <AccessoriesTable />,
        }
      ]
    },
    {
      path: 'prices',
      element: <LayoutComponent />,
      children: [
        {
          path: 'all-prices',
          element: <VehiclePricingTable />,
        }
      ]
    },{
      path: 'insurance',
      element: <LayoutComponent />,
      children: [
        {
          path: 'all-policies',
          element: <InsurancePlansManagement />,
        }
      ]
    },{
      path: 'scheme',
      element: <LayoutComponent />,
      children: [
        {
          path: 'all-schemes',
          element: <DiscountSchemesManagement />,
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default Routes;