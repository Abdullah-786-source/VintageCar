import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const CustomersPayments = ({ customerNumber }) => {
    const [rows, setRows] = useState([]);

    
    useEffect(() => {
        // Make an Axios GET request to fetch your data
        axios
            .get(`/CustomerPayments/${customerNumber}`,)
            .then((response) => {
                setRows(response.data); // Assuming the data is an array
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });        

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerNumber]);

    const getRowId = (row) => row.checkNumber;

    const columns = [
        { field: "checkNumber", headerName: "Check Number", width: 150 },
        {
          field: "paymentDate",
          headerName: "Payment Date",
          width: 150,
          valueGetter: (params) => {
            const paymentDate = new Date(params.row.paymentDate);
            return paymentDate.toLocaleDateString(); // Format as per user's locale
          },
        },
        {
          field: "amount",
          headerName: "Amount",
          width: 150,
        },
      ];
      

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

export default CustomersPayments