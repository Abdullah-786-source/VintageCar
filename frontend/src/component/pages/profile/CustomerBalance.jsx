import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const CustomerBalance = ({ customerNumber }) => {
    const [rows, setRows] = useState([]);

    
    useEffect(() => {
        // Make an Axios GET request to fetch your data
        axios
            .get(`/CustomerBalance/${customerNumber}`,)
            .then((response) => {
                setRows(response.data); // Assuming the data is an array
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });        

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerNumber]);

    const getRowId = (row) => row.customerNumber;

    const columns = [
        { field: "customerNumber", headerName: "Customer Number", width: 150 },
        {
          field: "totalAmount",
          headerName: "Total Billed Amount",
          width: 150,
        },
        {
          field: "totalPayments",
          headerName: "Total Payments",
          width: 150,
        },
        {
          field: "balance",
          headerName: "Balance",
          width: 150,
        },
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

export default CustomerBalance;