import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct"; // Import your EditProfile component
import DeleteProduct from "./DeleteProduct";

export default function Product() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    // Make an Axios GET request to fetch your data
    axios
      .get("/Product")
      .then((response) => {
        setRows(response.data); // Assuming the data is an array
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to run the effect once on component mount

  const updateData = (callback) => {
    axios
      .get("/Product")
      .then((response) => {
        setRows(response.data);
        if (callback) {
          callback();
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Define your columns here
  const columns = [
    { field: "productCode", headerName: "Product Code", width: 150 },
    { field: "productName", headerName: "Product Name", width: 150 },
    { field: "productLine", headerName: "Product Line", width: 150 },
    { field: "productScale", headerName: "Product Scale", width: 150 },
    { field: "productVendor", headerName: "Product Vendor", width: 150 },
    { field: "productDescription", headerName: "Product Description", width: 150 },
    { field: "quantityInStock", headerName: "Qty", width: 150 },
    { field: "buyPrice", headerName: "Buy Price", width: 150 },
    { field: "MSRP", headerName: "MSRP", width: 150 },
    {
      field: "Edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Button variant="text" onClick={() => handleEdit(params.row)}>
            <EditIcon />
        </Button>
      ),
    },
    {
      field: "Ddelete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <Button variant="text" onClick={() => handleDelete(params.row)}>
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  const getRowId = (row) => row.productCode;

  // Define your edit and delete handlers
  const handleEdit = (row) => {
    // Add your edit logic here
    console.log("Edit clicked for row:", row);
    setRecordToEdit(row);
    setEditOpen(true);
  };

  const handleDelete = (row) => {
    // Call the DeleteProfile component to handle the deletion
    setDeleteOpen(true);
    setRecordToEdit(row);
    updateData();
  };

  const handleClick = () => {
    // Open the form dialog
    setOpen(true);
  };

  return (
    <Box>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={getRowId} // Specify the custom ID function
          pageSize={5}
        />
      </div>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{ margin: "20px" }}
      >
        <Fab color="primary" aria-label="add" onClick={handleClick}>
          <AddIcon />
        </Fab><CreateProduct open={open} setOpen={setOpen} updateData={updateData} />
        
        <EditProduct
          open={editOpen}
          setOpen={setEditOpen}
          recordToEdit={recordToEdit}
          updateData={updateData}
        />
        <DeleteProduct
          open={deleteOpen}
          setOpen={setDeleteOpen}
          row={recordToEdit}
          onDeleteSuccess={handleDelete}
        />
      </Stack>
    </Box>
  );
}
