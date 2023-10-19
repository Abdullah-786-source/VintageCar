import React, { useState, useEffect } from "react";
import { DataGrid,  } from "@mui/x-data-grid";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField, Stack, Box, Button } from "@mui/material";

const OrderFind = ({ open, setOpen, setOrderNumber }) => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState({
    orderNumber: "",
    status: "",
    customerNumber: "",
  });


  const fetchData = async () => {
    try {
      const response = await axios.get("/Order");
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])
  
  const handleSearchChange = (e, field) => {
    setSearch({ ...search, [field]: e.target.value });
  };

  const handleRowClick = (row) => {

    setOrderNumber(row.row.orderNumber);
  };

  const handleClose = () => {
    setOrderNumber(null);
    setOpen(false);
  };

  const handleClick = () => {
    // Handle click logic here
    setOpen(false);
  };

  const getRowId = (row) => row.orderNumber;

  const columns = [
    { field: "orderNumber", headerName: "orderNumber", width: 150 },
    {
      field: "orderDate",
      headerName: "order Date",
      width: 150,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    {
      field: "requiredDate",
      headerName: "requiredDate",
      width: 150,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    {
      field: "shippedDate",
      headerName: "shippedDate",
      width: 150,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    { field: "status", headerName: "Status", width: 150 },
    { field: "comments", headerName: "Comments", width: 150 },
    { field: "customerNumber", headerName: "Customer Number", width: 150 },
  ];

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
        <DialogTitle>Find Order</DialogTitle>
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
                label="Search by Order No."
                variant="outlined"
                value={search.orderNumber}
                size="small"
                onChange={(e) => handleSearchChange(e, "orderNumber")}
              />
              <TextField
                label="Search by Status"
                variant="outlined"
                value={search.status}
                size="small"
                onChange={(e) => handleSearchChange(e, "status")}
              />
              <TextField
                label="Search by Customer No."
                variant="outlined"
                value={search.customerNumber}
                size="small"
                onChange={(e) => handleSearchChange(e, "customerNumber")}
              />
            </Box>
          </form>
        </DialogContent>
        <div style={{ height: 450, width: "100%" }}>
          <DataGrid
            rows={rows}
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

export default OrderFind;
