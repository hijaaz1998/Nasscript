import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
const Sidebar = lazy(() => import("./components/Sidebar"));
const CreateEmployee = lazy(() => import("./components/CreateEmployee"));
const LeaveVacation = lazy(() => import("./components/LeaveVacation"));
const Reports = lazy(() => import("./components/Reports"));
const EditEmployee = lazy(() => import("./components/EditEmployee"));

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex flex-grow">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <main className="flex-grow p-12">
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/create" element={<CreateEmployee />} />
                  <Route path="/leave" element={<LeaveVacation />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/edit/:id" element={<EditEmployee />} />
                </Routes>
              </Suspense>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
