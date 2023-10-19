import React, { useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField, Stack, Box, Button } from "@mui/material";

const CreateProduct = ({ open, setOpen, updateData }) => {

  const [product, setProduct] = useState({
    productCode: 0,
    productName: "",
    productLine: "",
    productScale: "",
    productVendor: "",
    productDescription: "",
    quantityInStock: 0,
    buyPrice: 0,
    MSRP: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("/CreateProduct", product);

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
    setProduct({ ...product, [name]: value });
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
              id="productCode"
              label="Product Code"
              type="number"
              name="productCode"
              value={product.productCode}
              onChange={handleChange}
            />
            <TextField
              id="productName"
              label="Product Name"
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleChange}
            />
            <TextField
              id="productLine"
              label="Product Line"
              type="text"
              name="productLine"
              value={product.productLine}
              onChange={handleChange}
            />
            <TextField
              id="productScale"
              label="Product Scale"
              type="text"
              name="productScale"
              value={product.productScale}
              onChange={handleChange}
            />
            <TextField
              id="productVendor"
              label="Product Vednor"
              type="text"
              name="productVendor"
              value={product.productVendor}
              onChange={handleChange}
            />
            <TextField
              id="productDescription"
              label="Product Description"
              type="text"
              name="productDescription"
              value={product.productDescription}
              onChange={handleChange}
            />
            <TextField
              id="quantityInStock"
              label="QTY"
              type="number"
              name="quantityInStock"
              value={product.quantityInStock}
              onChange={handleChange}
            />
            <TextField
              id="buyPrice"
              label="Buy Price"
              type="number"
              name="buyPrice"
              value={product.buyPrice}
              onChange={handleChange}
            />
            <TextField
              id="MSRP"
              label="MSRP"
              type="number"
              name="MSRP"
              value={product.MSRP}
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

export default CreateProduct;
