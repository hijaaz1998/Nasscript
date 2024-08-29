// src/components/Dashboard.js
import React, { useState, useEffect, useMemo } from "react";
import { Grid, Typography, TextField, Select, MenuItem, Box } from "@material-ui/core";
import axios from "axios";
import SummaryCard from "./subComponents/SummaryCard";
import EmployeeTable from "./subComponents/EmployeeTable";

const API = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    fetchEmployees();
  }, [page, rowsPerPage]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        `${API}/employees?page=${page + 1}&limit=${rowsPerPage}`
      );
      setEmployees(res.data.employees);
      setFilteredEmployees(res.data.employees);
      setTotalEmployees(res.data.totalEmployees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    const results = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterBranch === "" || employee.workingBranch === filterBranch)
    );
    setFilteredEmployees(results);
  }, [searchTerm, filterBranch, employees]);

  const summary = useMemo(() => {
    return filteredEmployees.reduce(
      (acc, employee) => {
        acc.total++;
        if (employee.status.medical === "pending") acc.medicalPending++;
        if (employee.status.visaPrinting === "pending") acc.visaPrinting++;
        if (employee.status.idPrinting === "pending") acc.idPrinting++;
        if (employee.status.foodMedical === "pending") acc.foodMedical++;
        return acc;
      },
      {
        total: 0,
        medicalPending: 0,
        visaPrinting: 0,
        idPrinting: 0,
        foodMedical: 0,
      }
    );
  }, [filteredEmployees]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const branches = useMemo(
    () => [...new Set(employees.map((employee) => employee.workingBranch))],
    [employees]
  );

  return (
    <Box p={4}>
      <Typography variant="h4" component="h1" gutterBottom className="font-bold">
        Employee Dashboard
      </Typography>

      {/* Summary Section */}
      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Total Employee" value={summary.total} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Pending Medical" value={summary.medicalPending} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Pending Visa Printing" value={summary.visaPrinting} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Pending ID Printing" value={summary.idPrinting} />
        </Grid>
      </Grid>

      {/* Search and Filter Section */}
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} mb={12}>
          <Select
            fullWidth
            variant="outlined"
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Branches</MenuItem>
            {branches.map((branch) => (
              <MenuItem key={branch} value={branch}>
                {branch}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      {/* Employee Table Section */}
      <EmployeeTable
        employees={employees}
        filteredEmployees={filteredEmployees}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        totalEmployees={totalEmployees}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </Box>
  );
};

export default Dashboard;
