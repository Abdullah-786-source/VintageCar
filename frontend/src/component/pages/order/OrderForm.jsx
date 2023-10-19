import React, { useState, useEffect } from "react";
import { Button, Grid, TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";


const OrderDetailsForm = ({ orderNumber }) => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [getOrderNumber, setGetOrderNumber] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/productCode/`);
            setProducts(response.data);
            setLoading(false); // Set loading to false when data is successfully fetched
        } catch (error) {
            setError(error); // Set error state if there's an error during the API call
            setLoading(false); // Set loading to false in case of error
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // When the component receives a new orderNumber prop, update the orderNumber in the form fields
        setGetOrderNumber(orderNumber);
    }, [orderNumber]);

    // useEffect(() => {
    //     // This will run whenever getOrderNumber changes
    //     console.log("getOrderNumber has been updated:", getOrderNumber);
    // }, [getOrderNumber]);


    const addOrderDetail = () => {
        // Create a new order detail object with default values
        const newOrderDetail = {
            orderNumber: "",
            productCode: "",
            quantityOrdered: 0,
            priceEach: 0,
            orderLine: "",
        };

        // Update orderDetails state by adding the new order detail
        setOrderDetails([...orderDetails, newOrderDetail]);
    };

    const removeOrderDetail = (index) => {
        const newOrderDetails = [...orderDetails];
        newOrderDetails.splice(index, 1);
        setOrderDetails(newOrderDetails);
    };

    const handleOrderNumberChange = (index, value) => {
        const updatedOrderDetails = [...orderDetails];
        if (updatedOrderDetails[index]) {
            updatedOrderDetails[index] = {
                ...updatedOrderDetails[index],
                orderNumber: value,  // Always use the orderNumber prop
            };
            setOrderDetails(updatedOrderDetails);
        }
    };


    const handleQuantityChange = (index, value) => {
        const updatedOrderDetails = [...orderDetails];
        updatedOrderDetails[index].quantityOrdered = parseInt(value, 10) || 0; // Parse value to integer or set to 0 if invalid
        setOrderDetails(updatedOrderDetails);
    };

    const handlePriceChange = (index, value) => {
        const updatedOrderDetails = [...orderDetails];
        updatedOrderDetails[index].priceEach = parseFloat(value) || 0; // Parse value to float or set to 0 if invalid
        setOrderDetails(updatedOrderDetails);
    };



    const handleOrderLineChange = (index, value) => {
        const updatedOrderDetails = [...orderDetails];
        updatedOrderDetails[index].orderLine = value;
        setOrderDetails(updatedOrderDetails);
    };

    const handleSubmit = () => {
        console.log(orderDetails);
    };

    const handleProductCodeChange = (index, value) => {
        const updatedOrderDetails = [...orderDetails];
        updatedOrderDetails[index] = {
            ...updatedOrderDetails[index],
            productCode: value,  // Update productCode for the specified index
        };
        setOrderDetails(updatedOrderDetails);
    };



    const renderOrderDetails = () => {
        return orderDetails.map((orderDetail, index) => (
            <Box key={index}>
                <Box sx={{ marginBottom: '70px' }} />
                <Grid container spacing={2} >
                    <Grid item xs={2}>
                        <TextField
                            variant="outlined"
                            id={`orderDetail-${index}-orderNumber`}
                            label="Order Number"
                            type="text"
                            name={`orderDetail-${index}-orderNumber`}
                            value={orderDetails[index].orderNumber}  // Use orderDetails[index].orderNumber
                            onChange={(e) => handleOrderNumberChange(index, e.target.value)}  // Update the order number using handleOrderNumberChange

                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl size="normal" fullWidth sx={{ width: '100%' }}>
                            <InputLabel id="demo-select-small-label">Product</InputLabel>
                            <Select
                                label="Product"
                                name={`orderDetail-${index}-productCode`}
                                value={orderDetails[index].productCode}
                                onChange={(e) => handleProductCodeChange(index, e.target.value)}
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
                            id={`orderDetail-${index}-quantityOrdered`}
                            label="Qty"
                            type="number"
                            name={`orderDetail-${index}-quantityOrdered`}
                            value={orderDetails.quantityOrdered}
                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            variant="outlined"
                            id={`orderDetail-${index}-priceEach`}
                            label="Price"
                            type="number"
                            name={`orderDetail-${index}-priceEach`}
                            value={orderDetails.priceEach}
                            onChange={(e) => handlePriceChange(index, e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            variant="outlined"
                            id={`orderDetail-${index}-cost`}
                            label="Cost"
                            type="number"
                            name={`orderDetail-${index}-cost`}
                            value={(orderDetails[index].quantityOrdered || 0) * (orderDetails[index].priceEach || 0)}
                            disabled // disable input for calculated field
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            variant="outlined"
                            id={`orderDetail-${index}-orderLine`}
                            label="Order Line"
                            type="text"
                            name={`orderDetail-${index}-orderLine`}
                            value={orderDetails.orderLine}
                            onChange={(e) => (handleOrderLineChange(index, e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={() => removeOrderDetail(index)}>Remove</Button>
                    </Grid>
                </Grid>
                <Button onClick={handleSubmit} > Ok </Button>
            </Box>
        ));
    };

    return (
        <Box sx={{ margin: "20px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button onClick={addOrderDetail}>Add Order Detail</Button>
                </Grid>
                {renderOrderDetails()}
            </Grid>
        </Box>
    );
};

export default OrderDetailsForm;
