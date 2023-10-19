import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField, Stack, Box, Button } from "@mui/material";

const EditProductLine = ({ open, setOpen, updateData, recordToEdit }) => {
  const [productLine, SetProductLine] = useState({ ...recordToEdit });

  useEffect(() => {
    SetProductLine({ ...recordToEdit });
  }, [recordToEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.put(
      `/EditProductLine/${productLine.productLine}`,
      productLine
    );

    if (response.status === 200) {
      // Data updated successfully
      console.log("Data updated successfully!");
      setOpen(false);
      updateData();
    } else {
      // Error updating data
      console.log("Error updating data!");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    SetProductLine({ ...productLine, [name]: value });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl">
      <DialogTitle>Edit Record</DialogTitle>
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
            {/* Render TextField components with data from the record */}
            {/* ... (similar to your CreateProfile component) */}
            {/* <TextField
              id="customerNumber"
              label="Customer Number"
              type="number"
              name="customerNumber"
              value={productLine.customerNumber}
              onChange={handleChange}
              disabled // You might want to disable editing the productLine number
            /> */}
            <TextField
              id="textDescription"
              label="Description"
              type="text"
              name="textDescription"
              value={productLine.textDescription}
              onChange={handleChange}
            />
            <TextField
              id="htmlDescription"
              label="Description"
              type="text"
              name="htmlDescription"
              value={productLine.htmlDescription}
              onChange={handleChange}
            />
            <TextField
              id="image"
              label="Image"
              type="text"
              name="image"
              value={productLine.image}
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

export default EditProductLine;
