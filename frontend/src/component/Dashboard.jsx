import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import NewBarChart from './pages/charts/BarCharts';
import axios from 'axios';
import PieChart from './pages/charts/PieChart';
import CountryChart from './pages/charts/CountryChart';
import PaidIcon from '@mui/icons-material/Paid';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import BalanceIcon from '@mui/icons-material/Balance';
import InventoryIcon from '@mui/icons-material/Inventory';

const Dashboard = () => {
    const [revenue, setRevenue] = useState([]);
    const [units, setUnits] = useState([]);
    const [payments, setPayments] = useState([]);

    

    const fetchRevenue = async () => {
        try {
            const response = await axios.get(`/revenue`);
            setRevenue(response.data);
        } catch (error) {
            console.error("Error fetching revenue data:", error);
            // Handle error, e.g., show an error message to the user
        }
    };

    const fetchUnits = async () => {
        try {
            const response = await axios.get(`/units`);
            setUnits(response.data);
        } catch (error) {
            console.error("Error fetching revenue data:", error);
            // Handle error, e.g., show an error message to the user
        }
    };

    const fetchPayments = async () => {
        try {
            const response = await axios.get(`/payments`);
            setPayments(response.data);
        } catch (error) {
            console.error("Error fetching revenue data:", error);
            // Handle error, e.g., show an error message to the user
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchRevenue();
            await fetchUnits();
            await fetchPayments();
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Log data whenever it changes
        console.log(revenue);
    }, [revenue]); // Run this effect whenever the data state changes

        // Check if revenue and payments have valid values
        const hasValidValues = revenue[0]?.revenue !== undefined && payments[0]?.amount !== undefined;

        // Calculate the result if both values exist, otherwise set result as undefined
        const result = hasValidValues ? revenue[0].revenue - payments[0].amount : undefined;
    
        // Format the result as a float with 2 digits after the decimal point, or show 'N/A'
        const formattedResult = hasValidValues ? result.toFixed(2) : 'N/A';

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Item sx={{ height: '200px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <PaidIcon sx={{ fontSize: 40 }} color="icon" />
                        <Typography variant='h5'>$ {revenue.length > 0 ? revenue[0].revenue : 'N/A'}</Typography>
                        <Typography variant='h6' fontWeight="bold">Total Revenue</Typography>
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item sx={{ height: '200px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <PointOfSaleIcon sx={{ fontSize: 40 }} color="icon" />
                        <Typography variant='h5'>$ {payments.length > 0 ? payments[0].amount : 'N/A'}</Typography>
                        <Typography variant='h6' fontWeight="bold">Payments Received</Typography>
                    </Item>
                </Grid>

                <Grid item xs={3}>
                    <Item sx={{ height: '200px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <BalanceIcon sx={{ fontSize: 40 }} color="icon" />
                        <Typography variant='h5'>$ {formattedResult}</Typography>
                        <Typography variant='h6' fontWeight="bold">Balance</Typography>
                    </Item>
                </Grid>

                <Grid item xs={3}>
                    <Item sx={{ height: '200px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <InventoryIcon sx={{ fontSize: 40 }} color="icon" />
                        <Typography variant='h5'>{units.length > 0 ? units[0].TotalUnit : 'N/A'}</Typography>
                        <Typography variant='h6' fontWeight="bold">Total Units Sold</Typography>
                    </Item>
                </Grid>
            </Grid>


            <Grid mt={2} container spacing={2}>
                <Grid item xs={6}>
                    <Item sx={{padding: '20px'}}><PieChart /></Item>
                </Grid>
                <Grid item xs={6}>
                    <Item sx={{padding: '20px'}}><CountryChart /></Item>
                </Grid>
            </Grid>
            <Grid mt={2} container spacing={2}>
                <Grid item xs={12}>
                    <Item sx={{padding: '20px'}}><NewBarChart /></Item>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
