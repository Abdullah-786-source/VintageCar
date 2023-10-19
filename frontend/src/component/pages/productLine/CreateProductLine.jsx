import React, { useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField, Stack, Box, Button } from "@mui/material";

const CreateProductLine = ({ open, setOpen, updateData }) => {

  const [productLine, setProductLine] = useState({
    productLine: 0,
    textDescription: "",
    htmlDescription: "",
    image: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("/CreateProductLine", productLine);

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
    setProductLine({ ...productLine, [name]: value });
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
              id="productLine"
              label="ProductLine"
              type="number"
              name="productLine"
              value={productLine.productLine}
              onChange={handleChange}
            />
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

export default CreateProductLine;
