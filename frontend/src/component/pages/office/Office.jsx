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
import CreateOffice from "./CreateOffice";
import EditOffice from "./EditOffice"; // Import your EditProfile component
import DeleteOffice from "./DeleteOffice";

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    // Make an Axios GET request to fetch your data
    axios
      .get("/Office")
      .then((response) => {
        setRows(response.data); // Assuming the data is an array
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to run the effect once on component mount

  const updateData = (callback) => {
    axios
      .get("/Office")
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
    { field: "officeCode", headerName: "Office Code", width: 150 },
    { field: "city", headerName: "City", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "addressLine1", headerName: "Address Line 1", width: 150 },
    { field: "addressLine2", headerName: "Address Line 2", width: 150 },
    { field: "state", headerName: "State", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    { field: "postalCode", headerName: "Postal Code", width: 150 },
    { field: "territory", headerName: "Territoy", width: 150 },
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

  const getRowId = (row) => row.officeCode;

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
        </Fab>
        <CreateOffice open={open} setOpen={setOpen} updateData={updateData} />
        <EditOffice
          open={editOpen}
          setOpen={setEditOpen}
          recordToEdit={recordToEdit}
          updateData={updateData}
        />
        <DeleteOffice
          open={deleteOpen}
          setOpen={setDeleteOpen}
          row={recordToEdit}
          onDeleteSuccess={handleDelete}
        />
      </Stack>
    </Box>
  );
}
