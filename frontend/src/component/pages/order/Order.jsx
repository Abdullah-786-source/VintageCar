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
import OrderCreate from "./OrderCreate";
import dayjs from "dayjs";
import { useEffect } from "react";
import OrderTabs from "./OrderTabs";
import OrderFind from "./OrderFind";
import OrderEdit from "./OrderEdit";
import MessageBox from "../MessageBox";


const Order = () => {
  const [order, setOrder] = useState({
    orderNumber: 0,
  });

  const [rows, setRows] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [findOpen, setFindOpen] = useState(false);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(null);
  const [recordToEdit, setRecordToEdit] = useState(null);
  const [findUpdate, setFindUpdate] = useState(null);
  const [openMsg, setOpenMsg] = useState(false);
  const [message, setMessage] = useState("");


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/OrderNumber/${order.orderNumber}`
      );
      setRows(response.data);
      const orderData = response.data[0] || {}; // Handle empty response
      setOrderDetails(orderData);
      console.log(orderDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrder({ ...order, [name]: value });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchData();
    }
  };

  useEffect(() => {
    if (selectedOrderNumber !== null) {
      setOrder({
        ...order,
        orderNumber: selectedOrderNumber // Use selectedCustomerNumber
      });
      setOrderDetails({
      });
      console.log(selectedOrderNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrderNumber]);

  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    // Try parsing the input date string
    const parsedDate = dayjs(dateString);

    // Validate if the parsed date is valid
    if (!parsedDate.isValid()) {
      // If the parsed date is invalid, return the original input
      return "Invalid Date";
    }

    // Convert the parsed date to the MySQL date format
    const mysqlDateFormattedDate = parsedDate.format("YYYY-MM-DD");

    return mysqlDateFormattedDate;
  };

  const handleSearch = (searchCriteria) => {
    // Perform search logic using searchCriteria and update the order details
    // For example, you can make an API call with searchCriteria to get order data
    // Update selectedCustomerNumber and orderDetails state accordingly
    // setOrderDetails(newCustomerDetails);

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
    setMessage("Order cannot be delete, please set the status to 'Cancelled'");
    setOpenMsg(true);
    setOpenDelete(true);
    setRecordToEdit(orderDetails);
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
            Order
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
                name="orderDate"
                variant="standard"
                label="Order Date"
                value={formatDate(orderDetails.orderDate) || ""}
                onChange={handleChange}
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
                  name="orderNumber"
                  label="Order Number"
                  value={order.orderNumber}
                  helperText="Press Enter to retrive data"
                  onChange={handleChange}
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
                name="requiredDate"
                label="Required Date"
                value={formatDate(orderDetails.requiredDate) || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="standard"
                name="shippedDate"
                label="Shipped Date"
                value={formatDate(orderDetails.shippedDate) || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth variant="standard" label="Status" name="status" value={orderDetails.status || ""} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth variant="standard" label="Comments" name="comments" value={orderDetails.comments || ""} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth variant="standard" label="Customer Number" name="customerNumber" value={orderDetails.customerNumber || ""} onChange={handleChange} />
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        {isLoading && <OrderTabs orderNumber={orderDetails.orderNumber} />}
      </Box>
      <OrderCreate open={open} setOpen={setOpen} />
      <OrderFind open={findOpen} setOpen={setFindOpen} setOrderNumber={setSelectedOrderNumber} findUpdate={findUpdate} />
      <OrderEdit open={openEdit} setOpen={setEditOpen} updateData={fetchData} recordToEdit={orderDetails} />
      <MessageBox open={openMsg} setOpen={setOpenMsg} message={message} />
    </div>
  );
}

export default Order;
