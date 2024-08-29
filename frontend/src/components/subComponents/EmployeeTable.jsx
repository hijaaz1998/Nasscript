// src/components/EmployeeTable.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const EmployeeTable = ({
  employees,
  filteredEmployees,
  handleChangePage,
  handleChangeRowsPerPage,
  totalEmployees,
  page,
  rowsPerPage,
}) => {
  return (
    <Paper elevation={3}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>VP Number</TableCell>
              <TableCell>Visa Number</TableCell>
              <TableCell>Medical Status</TableCell>
              <TableCell>Visa Printing</TableCell>
              <TableCell>ID Printing</TableCell>
              <TableCell>Food Medical</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.workingBranch}</TableCell>
                <TableCell>{employee.status.vpNumber || 'N/A'}</TableCell>
                <TableCell>{employee.status.visaNumber || 'N/A'}</TableCell>
                <TableCell>{employee.status.medical}</TableCell>
                <TableCell>{employee.status.visaPrinting}</TableCell>
                <TableCell>{employee.status.idPrinting}</TableCell>
                <TableCell>{employee.status.foodMedical}</TableCell>
                <TableCell align="center">
                  <Link to={`/edit/${employee._id}`}>
                    <Button variant="contained" color="primary" size="small">
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalEmployees}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default EmployeeTable;
