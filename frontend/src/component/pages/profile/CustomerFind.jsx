import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField, Stack, Box, Button } from "@mui/material";

const CustomerFind = ({ open, setOpen, setCustomerNumber }) => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState({
    name: "",
    phone: "",
    lastName: "",
    firstName: "",
  });
  

  const fetchData = async () => {
    try {
      const response = await axios.get("/Profile");
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (open) {
    fetchData();
  }
  const handleSearchChange = (e, field) => {
    setSearch({ ...search, [field]: e.target.value });
  };

  const handleRowClick = (row) => {
    setCustomerNumber(row.row.customerNumber);
    console.log(setCustomerNumber);
  };

  const handleClose = () => {
    setCustomerNumber(null);
    setOpen(false);
  };

  const handleClick = () => {
    // Handle click logic here
    setOpen(false);
  };

  const getRowId = (row) => row.customerNumber;

  const columns = [
    { field: "customerNumber", headerName: "Customer Number", width: 150 },
    { field: "customerName", headerName: "Customer Name", width: 150 },
    { field: "contactLastName", headerName: "Contact Last Name", width: 150 },
    { field: "contactFirstName", headerName: "Contact First Name", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "addressLine1", headerName: "Address Line 1", width: 150 },
    { field: "addressLine2", headerName: "Address Line 2", width: 150 },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "State", width: 150 },
    { field: "postalCode", headerName: "Postal Code", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
  ];

  const filteredRows = rows.filter(
    (row) =>
      row.customerName.toLowerCase().includes(search.name.toLowerCase()) &&
      row.phone.includes(search.phone) &&
      row.contactLastName.toLowerCase().includes(search.lastName.toLowerCase()) &&
      row.contactFirstName.toLowerCase().includes(search.firstName.toLowerCase())
  );

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
        <DialogTitle>Find Customer</DialogTitle>
        <DialogContent>
          <form>
            <Box
              component="div"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Search by Name"
                variant="outlined"
                value={search.name}
                size="small"
                onChange={(e) => handleSearchChange(e, "name")}
              />
              <TextField
                label="Search by Phone"
                variant="outlined"
                value={search.phone}
                size="small"
                onChange={(e) => handleSearchChange(e, "phone")}
              />
              <TextField
                label="Search by Contact Last Name"
                variant="outlined"
                value={search.lastName}
                size="small"
                onChange={(e) => handleSearchChange(e, "lastName")}
              />
              <TextField
                label="Search by Contact First Name"
                variant="outlined"
                value={search.firstName}
                size="small"
                onChange={(e) => handleSearchChange(e, "firstName")}
              />
            </Box>
          </form>
        </DialogContent>
        <div style={{ height: 450, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={getRowId} // Specify the custom ID function
            pageSize={5}
            onRowClick={handleRowClick} // Add this line
          />
        </div>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <DialogActions>
            <Button variant="contained" onClick={handleClick}>
              Save
            </Button>
          </DialogActions>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </>
  );
};

export default CustomerFind;
