import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

const DeleteProfile = ({ open, setOpen, row, onDeleteSuccess }) => {

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        axios
            .delete(`/DeleteProfile/${row.customerNumber}`)
            .then((response) => {
                if (response.status === 200) {
                    onDeleteSuccess(row.customerNumber); // Notify the parent component of successful deletion
                    handleClose(); // Close the dialog
                } else {
                    console.error("Error deleting profile:", response.data);
                }
            })
            .catch((error) => {
                console.error("Error deleting profile:", error);
            });

    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this customer?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteProfile;