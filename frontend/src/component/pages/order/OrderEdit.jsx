import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Button, Box, Select, MenuItem } from "@mui/material";
import CustomerFind from "../profile/CustomerFind";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";


dayjs.extend(utc);

const OrderEdit = ({ open, setOpen, updateData, recordToEdit }) => {
  // Initialize order state with recordToEdit on component mount
  const [order, setOrder] = useState({ ...recordToEdit });
  const [openCustomerFind, setOpenCustomerFind] = useState(false);
  const [customerNumber, setCustomerNumber] = useState(null);


  // Use useEffect to update order state when recordToEdit changes
  useEffect(() => {
    setOrder({ ...recordToEdit });
  }, [recordToEdit]);


  const formatInput = (dateString) => {
    const input = Date.parse(dateString);
    if (isNaN(input)) {
      return "";
    }
    const formattedDate = dayjs(dateString).format("YYYY-MM-DD");
    return formattedDate;
  };

  const handleChange = (name, value) => {
    // Format date before updating the state

    if ((name === 'orderDate') || (name === 'requiredDate') || (name === 'shippedDate')) {
      const inputDate = value;
      const formattedDate = dayjs(inputDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      setOrder({ ...order, [name]: formattedDate });
    }

    // Update order state when input values change
    setOrder({ ...order, [name]: value });
  };

  useEffect(() => {
    console.log(order); // This will log the updated state
  }, [order]); // This useEffect will run whenever the 'order' state changes

  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderDate = formatInput(order.orderDate);
    const requiredDate = formatInput(order.requiredDate);
    const shippedDate = formatInput(order.shippedDate);

    const newOrder = {
      ...order,
      orderDate: orderDate,
      requiredDate: requiredDate,
      shippedDate: shippedDate
    };

    setOrder(newOrder);

    // Send the updated order data to the server
    await axios.put(`/OrderEdit/${order.orderNumber}`, {
      ...newOrder,
    });

    console.log("Data updated successfully!");
    setOpen(false);
    updateData();
  };

  const handleSearch = () => {
    setOpenCustomerFind(true);
    console.log(customerNumber);
  }

  useEffect(() => {
    if (customerNumber !== null) {
      setOrder({
        ...order,
        customerNumber: customerNumber // Use customerNumber
      });
      console.log(customerNumber);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerNumber]);



  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl">
      <DialogTitle>Edit Record</DialogTitle>
      <DialogContent>
      <Box mb={2} />
        <form onSubmit={handleSubmit}>
          <Stack component="form" spacing={2} noValidate autoComplete="off">
              <TextField
                id="orderDate"
                type="date"
                name="orderDate"
                helperText="Order Date"
                value={formatInput(order.orderDate) || ""}
                onChange={(e) => handleChange("orderDate", e.target.value)}
              />
              <TextField
                id="requiredDate"
                type="date"
                name="requiredDate"
                helperText="Required Date"
                value={formatInput(order.requiredDate) || ""}
                onChange={(e) => handleChange("requiredDate", e.target.value)}
              />
              <TextField
                id="shippedDate"
                type="date"
                name="shippedDate"
                helperText="Shipped Date"
                value={formatInput(order.shippedDate) || ""}
                onChange={(e) => handleChange("shippedDate", e.target.value)}
              />
              <Select
              value={order.status || ""}
              onChange={(e) => handleChange("status", e.target.value)}
              label="Status"
              name="status"
            >
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
                <MenuItem value="On Hold">On Hold</MenuItem>
                <MenuItem value="Dispute">Dispute</MenuItem>
                <MenuItem value="In Process">In Process</MenuItem>
              </Select>
              <TextField
                id="comments"
                label="Comments"
                type="text"
                name="comments"
                value={order.comments || ""}
                onChange={(e) => handleChange("comments", e.target.value)}
              />
              <TextField
                id="customerNumber"
                label="Customer Number"
                type="text"
                name="customerNumber"
                value={order.customerNumber || ""}
                onChange={(e) => handleChange("customerNumber", e.target.value)}
              />
              <Button variant="contained" onClick={handleSearch}>
                  <SearchIcon />
              </Button>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
    <CustomerFind open={openCustomerFind} setOpen={setOpenCustomerFind} setCustomerNumber={setCustomerNumber}/>
    </>

  );
};

export default OrderEdit;
