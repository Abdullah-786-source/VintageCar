import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Select, MenuItem, Grid, FormControl, InputLabel, Button } from '@mui/material';

const OrderAddDetails = ({ open, setOpen, orderNumber, onSave }) => {
  const [orderDetails, setOrderDetails] = useState({
    orderNumber: orderNumber,
    productCode: "",
    quantityOrdered: "",
    priceEach: "",
    orderLineNumber: ""
  });
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('/productCode/');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this effect will run once when the component mounts

  useEffect(() => {
    if (open) {
      setOrderDetails({
        orderNumber: orderNumber,
        productCode: "",
        quantityOrdered: "",
        priceEach: "",
        orderLineNumber: ""
      });
    }
  }, [open]);


  const handleChange = (name, value) => {
    setOrderDetails(prevOrderDetails => ({
      ...prevOrderDetails,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log(orderDetails);
    onSave(orderDetails);
    setOpen(false);
  };
    
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl">
        <DialogTitle>Add Record</DialogTitle>
        <DialogContent>
          <Box mb={2} />
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                id="orderNumber"
                label="Order Number"
                type="text"
                name="orderNumber"
                value={orderDetails.orderNumber}
                disabled
              />
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">Product</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={orderDetails.productCode}
                  onChange={(e) => handleChange("productCode", e.target.value)}
                >
                  {products.map((product, index) => (
                    <MenuItem key={index} value={product.productCode}>{product.productName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <TextField
                variant="outlined"
                id="quantityOrdered"
                label="Qty"
                type="number"
                name="quantityOrdered"
                value={orderDetails.quantityOrdered}
                onChange={(e) => handleChange("quantityOrdered", e.target.value)}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                variant="outlined"
                id="priceEach"
                label="Price"
                type="number"
                name="priceEach"
                value={orderDetails.priceEach}
                onChange={(e) => handleChange("priceEach", e.target.value)}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                variant="outlined"
                id="cost"
                label="Cost"
                type="number"
                name="cost"
                value={(orderDetails.quantityOrdered || 0) * (orderDetails.priceEach || 0)}
                disabled
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                id="OrderLineNumber"
                label="Order Line"
                type="text"
                name="orderLineNumber"
                value={orderDetails.orderLineNumber}
                onChange={(e) => handleChange("orderLineNumber", e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderAddDetails;
