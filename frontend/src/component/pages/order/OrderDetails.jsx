import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const OrderDetails = ({ orderNumber }) => {
    const [rows, setRows] = useState([]);

    
    useEffect(() => {
        // Make an Axios GET request to fetch your data
        axios
            .get(`/OrderDetails/${orderNumber}`,)
            .then((response) => {
                setRows(response.data); // Assuming the data is an array
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });        

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderNumber]);

    const getRowId = (row) => {
        return row.orderNumber + row.productCode;
      };
      

    const columns = [
        { field: "productName", headerName: "Product Name", width: 300 },
        { field: "quantityOrdered", headerName: "Qty", width: 100 },
        { field: "priceEach", headerName: "Price", width: 100 },
        { field: "totalPrice", headerName: "Total", width: 100 },
        { field: "orderLineNumber", headerName: "Line Number", width: 100 },
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

export default OrderDetails