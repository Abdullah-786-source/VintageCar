import React, { useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import DeleteIcon from '@mui/icons-material/Delete';
import CustomerTabs from "./CustomerTabs";
import CustomerFind from "./CustomerFind";
import { useEffect } from "react";
import CustomerCreate from "./CustomerCreate";
import CustomerEdit from "./CustomerEdit";
import CustomerDelete from "./CustomerDelete";


const Customer = () => {
  const [customer, setCustomer] = useState({
    customerNumber: 0,
  });

  const [rows, setRows] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [findOpen, setFindOpen] = useState(false);
  const [selectedCustomerNumber, setSelectedCustomerNumber] = useState(null);
  const [recordToEdit, setRecordToEdit] = useState(null);
  const [findUpdate, setFindUpdate] = useState(null);


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/CustomerNumber/${customer.customerNumber}`
      );
      setRows(response.data);
      const customerData = response.data[0] || {}; // Handle empty response
      setCustomerDetails(customerData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchData();
    }
  };

  useEffect(() => {
    if (selectedCustomerNumber !== null) {
      setCustomer({
        ...customer,
        customerNumber: selectedCustomerNumber // Use selectedCustomerNumber
      });
      setCustomerDetails({
      });
      console.log(selectedCustomerNumber);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCustomerNumber]); 

  const handleSearch = (searchCriteria) => {
    // Perform search logic using searchCriteria and update the customer details
    // For example, you can make an API call with searchCriteria to get customer data
    // Update selectedCustomerNumber and customerDetails state accordingly
    // setCustomerDetails(newCustomerDetails);
    
    setFindOpen(true);
  };

  const addRecord = (event) => {
    // Open the form dialog
    event.preventDefault();
    setFindUpdate(findUpdate + 1);
    fetchData();
    setOpen(true);
  };

  const editRecord = (event) => {
    event.preventDefault();
    setFindUpdate(findUpdate + 1);
    console.log(findUpdate);
    fetchData();
    setEditOpen(true);
  };

  const deleteRecord = () => {
    // Call the DeleteProfile component to handle the deletion
    setOpenDelete(true);
    setRecordToEdit(customerDetails);
    setFindUpdate(findUpdate + 1);
    fetchData();
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <AppBar position="static" color="primary" sx={{ width: "90vw" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "white" }}
          >
            Customer
          </Typography>
          <Button color="inherit" onClick={addRecord}>
            <AddIcon />
          </Button>
          <Button color="inherit" onClick={editRecord}>
            <EditIcon />
          </Button>
          <Button color="inherit" onClick={deleteRecord}>
            <DeleteIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Box maxWidth="md" sx={{ marginTop: 2 }}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="standard"
                label="Customer Name"
                value={customerDetails.customerName || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                <TextField
                  fullWidth
                  variant="standard"
                  type="text"
                  name="customerNumber"
                  label="Customer Number"
                  helperText="Press Enter to retrive data"
                  value={customer.customerNumber}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                <Button variant="contained" onClick={handleSearch}>
                  <SearchIcon />
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="standard"
                label="Contact Last Name"
                value={customerDetails.contactLastName || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="standard"
                label="Contact First Name"
                value={customerDetails.contactFirstName || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth variant="standard" label="Phone" value={customerDetails.phone || ""} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth variant="standard" label="Address Line 1" value={customerDetails.addressLine1 || ""} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth variant="standard" label="Address Line 2" value={customerDetails.addressLine2 || ""} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth variant="standard" label="City" value={customerDetails.city || ""} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth variant="standard" label="Country" value={customerDetails.country || ""} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth variant="standard" label="State" value={customerDetails.state || ""} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth variant="standard" label="Postal Code" value={customerDetails.postalCode || ""} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth variant="standard" label="Sale Rep" value={customerDetails.salesRepEmployeeNumber || ""} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth variant="standard" label="Credit Limit" value={customerDetails.creditLimit || ""} />
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box sx={{marginTop: '20px'}}>
        {isLoading && <CustomerTabs customerNumber={customerDetails.customerNumber} />}
      </Box>
      <CustomerFind open={findOpen}  setOpen={setFindOpen} setCustomerNumber={setSelectedCustomerNumber} findUpdate={findUpdate}/>
      <CustomerCreate open={open}  setOpen={setOpen} updateData={fetchData} />
      <CustomerEdit open={openEdit} setOpen={setEditOpen} updateData={fetchData} recordToEdit={customerDetails} />
      <CustomerDelete open={openDelete} setOpen={setOpenDelete} row={customerDetails} onDeleteSuccess={deleteRecord}/>
    </div>
  );
}

export default Customer;
