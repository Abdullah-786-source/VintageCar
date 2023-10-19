import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {
  TextField,
  Stack,
  Box,
  Button,
  Select,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomerFind from "../profile/CustomerFind";
import MessageBox from "../MessageBox";
import OrderDetailsForm from "./OrderForm";
import OrderAddDetails from "./OrderAddDetails";
import { DataGrid } from '@mui/x-data-grid';
import OrderDetailsEdit from "./OrderDetailsEdit";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const OrderCreate = ({ open, setOpen }) => {
  const [order, setOrder] = useState({
    orderNumber: "",
    orderDate: "",
    requiredDate: "",
    shippedDate: "",
    status: "",
    comments: "",
    customerNumber: "",
  });
  const [orderNumber, setOrderNumber] = useState(0);
  const [openDetail, setOpenDetial] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [validKey, setValidKey] = useState();
  const [openCustomerFind, setOpenCustomerFind] = useState(false);
  const [customerNumber, setCustomerNumber] = useState(null);
  const [openMsg, setOpenMsg] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editOrderDetails, setEditOrderDetails] = useState(null);

  useEffect(() => {
    if (open) {
      setToInit();
    }

  }, [open]);

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

  const setToInit = () => {
      setOrder({orderNumber: "",
      orderDate: "",
      requiredDate: "",
      shippedDate: "",
      status: "",
      comments: "",
      customerNumber: ""});

      setOrderData([]);
      setIsDisabled(false);
  }

  useEffect(() => {
   setOrderNumber(order.orderNumber)
    
  }, [order.orderNumber]);


  useEffect(() => {
    console.log(orderData);
  }, [orderData]);

  useEffect(() => {
    // This will log the updated validKey whenever it changes
    console.log("Updated validKey:", validKey);
  }, [validKey]); // Run this effect whenever validKey changes
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const checkValidKey = async () => {
    console.log(order.orderNumber);
    try {
      const res = await axios.get(`/key/${order.orderNumber}`);
      setValidKey(res.data[0]); // Update validKey state
      console.log(res.data[0].key); // Log the key from the response
      return res.data[0]; // Return the validKey data
    } catch (err) {
      console.error(err.message);
      throw err; // Re-throw the error to be caught by the caller if needed
    }
  };
  
  const handleClick = () => {
    checkValidKey()
      .then((response) => {
        if (response.key === 0) {
          return handleCreate();
        } else {
          setOpenMsg(true);
          setMessage("The order is already exist, please try a unique Order Number");
          console.log("not valid");
          throw new Error("Invalid key");
        }
      })
      .then(() => {
        setOpen(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log(order);
    OrderDetailsForm.handleSubmit();
  }

  const handleOpenDetails = () => {
    if (columns) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

    setOpenDetial(true);
  }

  const handleEdit = (id) => {
    const editDetails = orderData.find((record) => record.productCode === id);
    setEditOrderDetails(editDetails);
    setIsEditing(true);
    setOpenDetial(true);
  };

  const handleRemove = (id) => {
    // Remove the record based on the id and update orderData state
    const updatedOrderData = orderData.filter((record) => record.productCode !== id);
    setOrderData(updatedOrderData);
    console.log(`Removed record with id: ${id}`, orderData);
  };

  const ProductNameCell = ({ row }) => {
    const [productName, setProductName] = useState([]);
  
    useEffect(() => {
      const fetchProductName = async () => {
        try {
          const response = await axios.get(`/products/${row.productCode}`);
          setProductName(response.data[0].productName);
        } catch (error) {
          console.error(`Error fetching product name for product code ${row.productCode}: ${error.message}`);
          setProductName('N/A');
        }
      };
  
      fetchProductName();
    }, [row.productCode]);
  
    return <span>{productName}</span>;
  };



  const handleCreate = async () => {
  
    const response = await axios.post("/CreateOrder", order);

    if (response.status === 200) {
      // Data inserted successfully
      handleCreateDetails();
      console.log("Data order inserted successfully!");
      
    } else {
      // Error inserting data
      console.log("Error inserting data!");
    }
  };

  const handleCreateDetails = async () => {
     const response = await axios.post("/CreateOrderDetails", orderData);

    if (response.status === 200) {
      // Data inserted successfully
      console.log("Data order details inserted successfully!");
      
    } else {
      // Error inserting data
      console.log("Error inserting data!");
    }
  };

  const columns = [
    { field: 'orderNumber', headerName: "Order Number", width: 150},
    { field: 'productCode', headerName: "Product Code", width: 150},
    { field: 'productName', headerName: "Product Name", width: 150, 
      renderCell:  (params) => <ProductNameCell row={params.row} />,},
    { field: 'quantityOrdered', headerName: "Qty", width: 150},
    { field: 'priceEach', headerName: "Price", width: 150},
    {
      field: 'cost',
      headerName: 'Cost',
      width: 150,
      renderCell: (params) => {
        // Calculate the cost based on other columns in the same row
        const quantity = params.row.quantityOrdered;
        const price = params.row.priceEach;
        const cost = quantity * price;
        // Format the cost as needed
        const formattedCost = `$${cost.toFixed(2)}`;
        return <span>{formattedCost}</span>;
      },
    },
    { field: 'orderLineNumber', headerName: "Order Line", width: 150},
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row.productCode)}
          >
            <EditIcon />
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleRemove(params.row.productCode)}
          >
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  const getRowId = (row) => row.productCode;

  const handleSave = (orderDetails) => {
    if (isEditing) {
      // If editing, replace the existing order details with the edited details
      const updatedOrderData = orderData.map((record) =>
        record.productCode === editOrderDetails.productCode ? orderDetails : record
      );
      setOrderData(updatedOrderData);
    } else {
      // If not editing, add the new order details to the existing data
      setOrderData([...orderData, orderDetails]);
    }

    // Reset edit-related state variables
    setIsEditing(false);
    setEditOrderDetails(null);
    setOpenDetial(false);
  };

  
  

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
        <DialogTitle>Add New Record</DialogTitle>
        <DialogContent>
          <Box mb={2} />
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <TextField
                  id="orderNumber"
                  label="Order Number"
                  type="number"
                  name="orderNumber"
                  fullWidth
                  value={order.orderNumber}
                  onChange={handleChange}
                  disabled={isDisabled}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  id="orderDate"
                  type="date"
                  name="orderDate"
                  helperText="Enter Order Date"
                  fullWidth
                  value={order.orderDate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  id="requiredDate"
                  type="date"
                  name="requiredDate"
                  helperText="Enter Required Date"
                  fullWidth
                  value={order.requiredDate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  id="shippedDate"
                  type="date"
                  name="shippedDate"
                  helperText="Enter Shipped Date"
                  fullWidth
                  value={order.shippedDate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl sx={{ minWidth: 120 }} size="normal">
                  <InputLabel id="demo-select-small-label">Status</InputLabel>
                  <Select
                    label="Status"
                    name="status"
                    value={order.status}
                    onChange={handleChange}
                  >
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                    <MenuItem value="On Hold">On Hold</MenuItem>
                    <MenuItem value="Dispute">Dispute</MenuItem>
                    <MenuItem value="In Process">In Process</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  id="comments"
                  label="Comments"
                  type="text"
                  name="comments"
                  fullWidth
                  value={order.comments}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  id="customerNumber"
                  label="Customer Number"
                  type="text"
                  name="customerNumber"
                  value={order.customerNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" fullWidth onClick={handleSearch}>
                  <SearchIcon />
                </Button>
              </Grid>
            </Grid>
            {/* hello */}
            <Button onClick={handleOpenDetails}>Add Order Items</Button>
            <Box sx={{ height: 400, width: '100%' }}>
              {/* datagrid here */}
              <DataGrid
                rows={orderData}
                columns={columns}
                getRowId={getRowId}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
              />
            </Box>
            <MessageBox open={openMsg} setOpen={setOpenMsg} message={message} />
            <CustomerFind open={openCustomerFind} setOpen={setOpenCustomerFind} setCustomerNumber={setCustomerNumber}/>
            <OrderAddDetails open={openDetail} setOpen={setOpenDetial} orderNumber={orderNumber} onSave={handleSave}/>
            <OrderDetailsEdit open={isEditing} setOpen={setIsEditing}  orderNumber={orderNumber} editOrderDetails={editOrderDetails} onSave={handleSave}/>
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

export default OrderCreate;
