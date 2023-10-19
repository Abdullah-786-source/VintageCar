import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const CustomerOrders = ({ customerNumber }) => {
    const [rows, setRows] = useState([]);

    
    useEffect(() => {
        // Make an Axios GET request to fetch your data
        axios
            .get(`/CustomerOrders/${customerNumber}`,)
            .then((response) => {
                setRows(response.data); // Assuming the data is an array
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });        

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerNumber]);

    const getRowId = (row) => row.orderNumber;

    const columns = [
        { field: "orderNumber", headerName: "Order Number", width: 150 },
        {
          field: "orderDate",
          headerName: "Order Date",
          width: 150,
          valueGetter: (params) => {
            const orderDate = new Date(params.row.orderDate);
            return orderDate.toLocaleDateString(); // Format as per user's locale
          },
        },
        {
          field: "requiredDate",
          headerName: "Required Date",
          width: 150,
          valueGetter: (params) => {
            const requiredDate = new Date(params.row.requiredDate);
            return requiredDate.toLocaleDateString(); // Format as per user's locale
          },
        },
        {
          field: "shippedDate",
          headerName: "Shipped Date",
          width: 150,
          valueGetter: (params) => {
            const shippedDate = new Date(params.row.shippedDate);
            return shippedDate.toLocaleDateString(); // Format as per user's locale
          },
        },
        { field: "status", headerName: "Status", width: 150 },
        { field: "comments", headerName: "Comments", width: 300 },
      ];

      console.log(rows);
      

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </>
    )
}

export default CustomerOrders