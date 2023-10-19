import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField, Stack, Box, Button } from "@mui/material";

const EditEmployee = ({ open, setOpen, updateData, recordToEdit }) => {
  const [employee, setEmployee] = useState({ ...recordToEdit });

  useEffect(() => {
    setEmployee({ ...recordToEdit });
  }, [recordToEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.put(
      `/EditEmployee/${employee.employeeNumber}`,
      employee
    );

    if (response.status === 200) {
      // Data updated successfully
      console.log("Data updated successfully!");
      setOpen(false);
      updateData();
    } else {
      // Error updating data
      console.log("Error updating data!");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl">
      <DialogTitle>Edit Record</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            {/* Render TextField components with data from the record */}
            {/* ... (similar to your CreateProfile component) */}
            {/* <TextField
              id="customerNumber"
              label="Customer Number"
              type="number"
              name="customerNumber"
              value={employee.customerNumber}
              onChange={handleChange}
              disabled // You might want to disable editing the employee number
            /> */}

            <TextField
              id="lastName"
              label="Last Name"
              type="text"
              name="lastName"
              value={employee.lastName}
              onChange={handleChange}
            />

            <TextField
              id="firstName"
              label="First Name"
              type="text"
              name="firstName"
              value={employee.firstName}
              onChange={handleChange}
            />

            <TextField
              id="extension"
              label="Extension"
              type="text"
              name="extension"
              value={employee.extension}
              onChange={handleChange}
            />

            <TextField
              id="email"
              label="Email"
              type="text"
              name="email"
              value={employee.email}
              onChange={handleChange}
            />

            <TextField
              id="officeCode"
              label="Office Code"
              type="number"
              name="officeCode"
              value={employee.officeCode}
              onChange={handleChange}
            />

            <TextField
              id="reportsTo"
              label="Report To"
              type="number"
              name="reportsTo"
              value={employee.reportsTo}
              onChange={handleChange}
            />

            <TextField
              id="jobTitle"
              label="Job Title"
              type="text"
              name="jobTitle"
              value={employee.jobTitle}
              onChange={handleChange}
            />
          </Box>
        </form>
      </DialogContent>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
        sx={{ width: "100%" }}
      >
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default EditEmployee;
