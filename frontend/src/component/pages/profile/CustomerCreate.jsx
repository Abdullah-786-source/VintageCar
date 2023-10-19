import React, { useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField, Stack, Box, Button } from "@mui/material";

const CustomerCreate = ({ open, setOpen, updateData }) => {

  const [customer, setCustomer] = useState({
    customerNumber: 0,
    customerName: "",
    contactLastName: "",
    contactFirstName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    salesRepEmployeeNumber: "",
    creditLimit: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("/CreateProfile", customer);

    if (response.status === 200) {
      // Data inserted successfully
      console.log("Data inserted successfully!");
      updateData();
      setOpen(false);
    } else {
      // Error inserting data
      console.log("Error inserting data!");
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl">
      <DialogTitle>Add New Record</DialogTitle>
      <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="customerNumber"
              label="Customer Number"
              type="number"
              name="customerNumber"
              value={customer.customerNumber}
              onChange={handleChange}
            />
            <TextField
              id="customerName"
              label="Customer Name"
              type="text"
              name="customerName"
              value={customer.customerName}
              onChange={handleChange}
            />
            <TextField
              id="contactLastName"
              label="Contact Last Name"
              type="text"
              name="contactLastName"
              value={customer.contactLastName}
              onChange={handleChange}
            />
            <TextField
              id="contactFirstName"
              label="Contact First Name"
              type="text"
              name="contactFirstName"
              value={customer.contactFirstName}
              onChange={handleChange}
            />
            <TextField
              id="phone"
              label="Phone"
              type="text"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
            />
            <TextField
              id="addressLine1"
              label="Address Line 1"
              type="text"
              name="addressLine1"
              value={customer.addressLine1}
              onChange={handleChange}
            />
            <TextField
              id="addressLine2"
              label="Address Line 2"
              type="text"
              name="addressLine2"
              value={customer.addressLine2}
              onChange={handleChange}
            />
            <TextField
              id="city"
              label="City"
              type="text"
              name="city"
              value={customer.city}
              onChange={handleChange}
            />
            <TextField
              id="state"
              label="State"
              type="text"
              name="state"
              value={customer.state}
              onChange={handleChange}
            />
            <TextField
              id="postalCode"
              label="Postal Code"
              type="text"
              name="postalCode"
              value={customer.postalCode}
              onChange={handleChange}
            />
            <TextField
              id="country"
              label="Country"
              type="text"
              name="country"
              value={customer.country}
              onChange={handleChange}
            />
            <TextField
              id="salesRepEmployeeNumber"
              label="Sales Rep Employee Number"
              type="number"
              name="salesRepEmployeeNumber"
              value={customer.salesRepEmployeeNumber}
              onChange={handleChange}
            />
            <TextField
              id="creditLimit"
              label="Credit Limit"
              type="number"
              name="creditLimit"
              value={customer.creditLimit}
              onChange={handleChange}
            />
          </Box>
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

export default CustomerCreate;
