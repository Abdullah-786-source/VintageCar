import React, { useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField, Stack, Box, Button } from "@mui/material";

const CreateOffice = ({ open, setOpen, updateData }) => {

  const [office, setOffice] = useState({
    officeCode: 0,
    city: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    country: "",
    postalCode: "",
    territory: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("/CreateOffice", office);

    if (response.status === 200) {
      // Data inserted successfully
      console.log("Data inserted successfully!");
      setOpen(false);
      updateData();
    } else {
      // Error inserting data
      console.log("Error inserting data!");
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setOffice({ ...office, [name]: value });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl">
      <DialogTitle>Add New Record</DialogTitle>
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
            <TextField
              id="officeCode"
              label="Office Code"
              type="number"
              name="officeCode"
              value={office.officeCode}
              onChange={handleChange}
            />
            <TextField
              id="city"
              label="City"
              type="text"
              name="city"
              value={office.city}
              onChange={handleChange}
            />
            <TextField
              id="phone"
              label="Phone"
              type="text"
              name="phone"
              value={office.phone}
              onChange={handleChange}
            />
            <TextField
              id="addressLine1"
              label="Address Line 1"
              type="text"
              name="addressLine1"
              value={office.addressLine1}
              onChange={handleChange}
            />
            <TextField
              id="addressLine2"
              label="Address Line 2"
              type="text"
              name="addressLine2"
              value={office.addressLine2}
              onChange={handleChange}
            />
            <TextField
              id="state"
              label="State"
              type="text"
              name="state"
              value={office.state}
              onChange={handleChange}
            />
            <TextField
              id="postalCode"
              label="Postal Code"
              type="text"
              name="postalCode"
              value={office.postalCode}
              onChange={handleChange}
            />
            <TextField
              id="country"
              label="Country"
              type="text"
              name="country"
              value={office.country}
              onChange={handleChange}
            />
            <TextField
              id="territory"
              label="Territory"
              type="text"
              name="territory"
              value={office.territory}
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

export default CreateOffice;