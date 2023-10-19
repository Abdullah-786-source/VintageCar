import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

dotenv.config(); 

// Create a MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Define a route
app.get("/Profile", (req, res) => {
  db.query(
    "SELECT * FROM customers WHERE customerStatus = 'active';",
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    }
  );
});

app.post("/CreateProfile", (req, res) => {
  const body = req.body;
  console.log(body);

  const {
    customerNumber,
    customerName,
    contactLastName,
    contactFirstName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    salesRepEmployeeNumber,
    creditLimit,
  } = req.body;

  const customersData = [
    customerNumber,
    customerName,
    contactLastName,
    contactFirstName,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    salesRepEmployeeNumber,
    creditLimit,
  ];

  const query = `
    INSERT INTO customers (
      customerNumber,
      customerName,      
      contactLastName,
      contactFirstName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      salesRepEmployeeNumber,
      creditLimit
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    // ... (your existing code)

    db.query(query, customersData, (err, result) => {
      if (err) {
        console.error("Error inserting data: " + err.message);
        res.status(500).json({ message: "Error inserting data!" });
      } else {
        console.log("Data inserted successfully!");
        res.status(200).json({ message: "Data inserted successfully!" });
      }
    });
  } catch (err) {
    console.error("Error: " + err.message);
    res.status(500).json({ message: "Error inserting data!" });
  }
});

app.put("/EditProfile/:customerNumber", (req, res) => {
  const { customerNumber } = req.params;
  const updatedData = req.body;
  console.log(updatedData);

  const customerNumberInt = parseInt(customerNumber, 10);
  const creditLimitFloat = parseFloat(updatedData.creditLimit);

  // Construct the SQL query to update the record
  const query = `UPDATE customers
SET
  customerName = ?,
  contactLastName = ?,
  contactFirstName = ?,
  phone = ?,
  addressLine1 = ?,
  addressLine2 = ?,
  city = ?,
  state = ?,
  postalCode = ?,
  country = ?,
  salesRepEmployeeNumber = ?,
  creditLimit = ?
WHERE customerNumber = ?`;

  // Prepare an array of values to replace placeholders
  const values = [
    updatedData.customerName,
    updatedData.contactLastName,
    updatedData.contactFirstName,
    updatedData.phone,
    updatedData.addressLine1,
    updatedData.addressLine2,
    updatedData.city,
    updatedData.state,
    updatedData.postalCode,
    updatedData.country,
    updatedData.salesRepEmployeeNumber,
    parseFloat(updatedData.creditLimit), // Parse creditLimit as a float
    customerNumberInt, // Use the integer customerNumber
  ];

  console.log(values);

  // Run the query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating record:", err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      if (result.affectedRows === 1) {
        console.log("Record updated successfully");
        res.status(200).json({ message: "Record updated successfully" });
      } else {
        console.log("Record not found or not updated");
        res.status(404).json({ error: "Record not found or not updated" });
      }
    }
  });
});

// Delete customer and associated orders
app.delete("/DeleteProfile/:customerNumber", (req, res) => {
  const { customerNumber } = req.params;

  // Update associated orders (set customerNumber to NULL)
  // Replace this with your actual database update logic
  const updateOrdersQuery = `UPDATE customers SET customerStatus = 'inactive' WHERE customerNumber = ?`;

  // Delete the customer

  db.query(
    updateOrdersQuery,
    [customerNumber],
    (updateError, updateResults) => {
      if (updateError) {
        res.status(500).json({ error: "Error deleting customer" });
      } else {
        res
          .status(200)
          .json({
            message: "Customer and associated orders deleted successfully",
          });
      }
    }
  );
});

/// Employee ///
app.get("/Employee", (req, res) => {
  db.query(
    "SELECT * FROM employees WHERE employeeStatus = 'active';",
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    }
  );
});

app.post("/CreateEmployee", (req, res) => {
  const body = req.body;
  console.log(body);

  const {
    employeeNumber,
    lastName,
    firstName,
    extension,
    email,
    officeCode,
    reportsTo,
    jobTitle,
  } = req.body;

  const employeesData = [
    employeeNumber,
    lastName,
    firstName,
    extension,
    email,
    officeCode,
    reportsTo,
    jobTitle,
  ];

  const query = `
    INSERT INTO employees (
      employeeNumber,
      lastName,
      firstName,
      extension,
      email,
      officeCode,
      reportsTo,
      jobTitle
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    // ... (your existing code)

    db.query(query, employeesData, (err, result) => {
      if (err) {
        console.error("Error inserting data: " + err.message);
        res.status(500).json({ message: "Error inserting data!" });
      } else {
        console.log("Data inserted successfully!");
        res.status(200).json({ message: "Data inserted successfully!" });
      }
    });
  } catch (err) {
    console.error("Error: " + err.message);
    res.status(500).json({ message: "Error inserting data!" });
  }
});

app.put("/EditEmployee/:employeeNumber", (req, res) => {
  const { employeeNumber } = req.params;
  const updatedData = req.body;
  console.log(updatedData);

  const employeeNumberInt = parseInt(employeeNumber, 10);
  //const creditLimitFloat = parseFloat(updatedData.creditLimit);

  // Construct the SQL query to update the record
  const query = `UPDATE employees
    SET
      lastName = ?,
      firstName = ?,
      extension = ?,
      email = ?,
      officeCode = ?,
      reportsTo = ?,
      jobTitle = ?
    WHERE employeeNumber = ?`;

  // Prepare an array of values to replace placeholders
  const values = [
    updatedData.lastName,
    updatedData.firstName,
    updatedData.extension,
    updatedData.email,
    updatedData.officeCode,
    updatedData.reportsTo,
    updatedData.jobTitle,
    employeeNumberInt, // Use the integer customerNumber
  ];

  console.log(values);

  // Run the query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating record:", err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      if (result.affectedRows === 1) {
        console.log("Record updated successfully");
        res.status(200).json({ message: "Record updated successfully" });
      } else {
        console.log("Record not found or not updated");
        res.status(404).json({ error: "Record not found or not updated" });
      }
    }
  });
});

app.delete("/DeleteEmployee/:employeeNumber", (req, res) => {
  const { employeeNumber } = req.params;

  // Update associated orders (set customerNumber to NULL)
  // Replace this with your actual database update logic
  const updateOrdersQuery = `UPDATE employees SET employeeStatus = 'inactive' WHERE employeeNumber = ?`;

  // Delete the employee

  db.query(
    updateOrdersQuery,
    [employeeNumber],
    (updateError, updateResults) => {
      if (updateError) {
        res.status(500).json({ error: "Error deleting employee" });
      } else {
        res.status(200).json({ message: "employees deleted successfully" });
      }
    }
  );
});

// Office
app.get("/Office", (req, res) => {
  db.query(
    "SELECT * FROM offices WHERE officeStatus = 'active';",
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    }
  );
});

app.post("/CreateOffice", (req, res) => {
  const body = req.body;
  console.log(body);

  const {
    officeCode,
    city,
    phone,
    addressLine1,
    addressLine2,
    state,
    country,
    postalCode,
    territory,
  } = req.body;

  const officesData = [
    officeCode,
    city,
    phone,
    addressLine1,
    addressLine2,
    state,
    country,
    postalCode,
    territory,
  ];

  const query = `
    INSERT INTO offices (
      officeCode,
      city,
      phone,
      addressLine1,
      addressLine2,
      state,
      country,
      postalCode,
      territory
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    // ... (your existing code)

    db.query(query, officesData, (err, result) => {
      if (err) {
        console.error("Error inserting data: " + err.message);
        res.status(500).json({ message: "Error inserting data!" });
      } else {
        console.log("Data inserted successfully!");
        res.status(200).json({ message: "Data inserted successfully!" });
      }
    });
  } catch (err) {
    console.error("Error: " + err.message);
    res.status(500).json({ message: "Error inserting data!" });
  }
});

app.put("/EditOffice/:OfficeCode", (req, res) => {
  const { OfficeCode } = req.params;
  const updatedData = req.body;
  console.log(updatedData);

  const OfficeCodeInt = parseInt(OfficeCode, 10);
  //const creditLimitFloat = parseFloat(updatedData.creditLimit);

  // Construct the SQL query to update the record
  const query = `UPDATE offices
    SET
      city = ?,
      phone = ?,
      addressLine1 = ?,
      addressLine2 = ?,
      state = ?,
      country = ?,
      postalCode = ?,
      territory = ?
    WHERE OfficeCode = ?`;

  // Prepare an array of values to replace placeholders
  const values = [
    updatedData.city,
    updatedData.phone,
    updatedData.addressLine1,
    updatedData.addressLine2,
    updatedData.state,
    updatedData.country,
    updatedData.postalCode,
    updatedData.territory,
    OfficeCodeInt, // Use the integer customerNumber
  ];

  console.log(values);

  // Run the query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating record:", err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      if (result.affectedRows === 1) {
        console.log("Record updated successfully");
        res.status(200).json({ message: "Record updated successfully" });
      } else {
        console.log("Record not found or not updated");
        res.status(404).json({ error: "Record not found or not updated" });
      }
    }
  });
});

app.delete("/DeleteOffice/:officeCode", (req, res) => {
  const { officeCode } = req.params;

  // Update associated orders (set customerNumber to NULL)
  // Replace this with your actual database update logic
  const updateOrdersQuery = `UPDATE offices SET officeStatus = 'inactive' WHERE officeCode = ?`;

  // Delete the employee

  db.query(updateOrdersQuery, [officeCode], (updateError, updateResults) => {
    if (updateError) {
      res.status(500).json({ error: "Error deleting employee" });
    } else {
      res.status(200).json({ message: "employees deleted successfully" });
    }
  });
});

// Product
app.get("/Product", (req, res) => {
  db.query(
    "SELECT * FROM products WHERE productStatus = 'active';",
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    }
  );
});

app.post("/CreateProduct", (req, res) => {
  const body = req.body;
  console.log(body);

  const {
    productCode,
    productName,
    ProdcutLine,
    ProudtScale,
    productVendor,
    prodcutDescription,
    quantityInStock,
    buyPrice,
    MSRP,
  } = req.body;

  const productsData = [
    productCode,
    productName,
    ProdcutLine,
    ProudtScale,
    productVendor,
    prodcutDescription,
    quantityInStock,
    buyPrice,
    MSRP,
  ];

  const query = `
    INSERT INTO products (
      productCode,
      productName,
      ProdcutLine,
      ProudtScale,
      productVendor,
      prodcutDescription,
      quantityInStock,
      buyPrice,
      MSRP
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    // ... (your existing code)

    db.query(query, productsData, (err, result) => {
      if (err) {
        console.error("Error inserting data: " + err.message);
        res.status(500).json({ message: "Error inserting data!" });
      } else {
        console.log("Data inserted successfully!");
        res.status(200).json({ message: "Data inserted successfully!" });
      }
    });
  } catch (err) {
    console.error("Error: " + err.message);
    res.status(500).json({ message: "Error inserting data!" });
  }
});

app.put("/EditProduct/:productCode", (req, res) => {
  const { productCode } = req.params;
  const updatedData = req.body;
  console.log(updatedData);

  //const creditLimitFloat = parseFloat(updatedData.creditLimit);

  // Construct the SQL query to update the record
  const query = `UPDATE products
    SET
      productName = ?,
      productLine = ?,
      productScale = ?,
      productVendor = ?,
      productDescription = ?,
      quantityInStock = ?,
      buyPrice = ?,
      MSRP = ?
    WHERE productCode = ?`;

  // Prepare an array of values to replace placeholders
  const values = [
    updatedData.productName,
    updatedData.productLine,
    updatedData.productScale,
    updatedData.productVendor,
    updatedData.productDescription,
    updatedData.quantityInStock,
    updatedData.buyPrice,
    updatedData.MSRP,
    productCode, // Use the integer customerNumber
  ];

  console.log(values);

  console.log(values);

  // Run the query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating record:", err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      if (result.affectedRows === 1) {
        console.log("Record updated successfully");
        res.status(200).json({ message: "Record updated successfully" });
      } else {
        console.log("Record not found or not updated");
        res.status(404).json({ error: "Record not found or not updated" });
      }
    }
  });
});

app.delete("/DeleteProduct/:productCode", (req, res) => {
  const { productCode } = req.params;

  // Update associated orders (set customerNumber to NULL)
  // Replace this with your actual database update logic
  const updateOrdersQuery = `UPDATE products SET productStatus = 'inactive' WHERE productCode = ?`;

  // Delete the employee

  db.query(updateOrdersQuery, [productCode], (updateError, updateResults) => {
    if (updateError) {
      res.status(500).json({ error: "Error deleting employee" });
    } else {
      res.status(200).json({ message: "employees deleted successfully" });
    }
  });
});

// ProductLine

app.get("/ProductLine", (req, res) => {
  db.query(
    "SELECT * FROM productlines WHERE productLineStatus = 'active';",
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    }
  );
});

app.post("/CreateProductLine", (req, res) => {
  const body = req.body;
  console.log(body);

  const {
    productLine,
    textDescription,
    htmlDescription,
    image,
  } = req.body;

  const productLinessData = [
    productLine,
    textDescription,
    htmlDescription,
    image,
  ];

  const query = `
    INSERT INTO productlines (
      productLine,
      textDescription,
      htmlDescription,
      image,
    ) VALUES (?, ?, ?, ?)`;

  try {
    // ... (your existing code)

    db.query(query, productLinessData, (err, result) => {
      if (err) {
        console.error("Error inserting data: " + err.message);
        res.status(500).json({ message: "Error inserting data!" });
      } else {
        console.log("Data inserted successfully!");
        res.status(200).json({ message: "Data inserted successfully!" });
      }
    });
  } catch (err) {
    console.error("Error: " + err.message);
    res.status(500).json({ message: "Error inserting data!" });
  }
});

app.put("/EditProductLine/:productLine", (req, res) => {
  const { productLine } = req.params;
  const updatedData = req.body;
  console.log(updatedData);

  //const creditLimitFloat = parseFloat(updatedData.creditLimit);

  // Construct the SQL query to update the record
  const query = `UPDATE productlines
    SET
      textDescription = ?,
      htmlDescription = ?,
      image = ?
    WHERE productLine = ?`;

  // Prepare an array of values to replace placeholders
  const values = [
    updatedData.textDescription,
    updatedData.htmlDescription,
    updatedData.image,
    productLine, // Use the integer customerNumber
  ];

  console.log(values);

  console.log(values);

  // Run the query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating record:", err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      if (result.affectedRows === 1) {
        console.log("Record updated successfully");
        res.status(200).json({ message: "Record updated successfully" });
      } else {
        console.log("Record not found or not updated");
        res.status(404).json({ error: "Record not found or not updated" });
      }
    }
  });
});

app.delete("/DeleteProductLine/:productLine", (req, res) => {
  const { productLine } = req.params;

  // Update associated orders (set customerNumber to NULL)
  // Replace this with your actual database update logic
  const updateOrdersQuery = `UPDATE productLines SET productLineStatus = 'inactive' WHERE productLine = ?`;

  // Delete the employee

  db.query(updateOrdersQuery, [productLine], (updateError, updateResults) => {
    if (updateError) {
      res.status(500).json({ error: "Error deleting employee" });
    } else {
      res.status(200).json({ message: "employees deleted successfully" });
    }
  });
});

app.get("/Orders", (req, res) => {
  const query = `SELECT * FROM orders
  JOIN customers
  ON orders.customerNumber = customers.customerNumber`;

   db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "record not found"});
    } else {
      res.json(results);
    }
   })           
});

app.get("/CustomerNumber/:customerNumber", (req, res) => {

  const { customerNumber } = req.params;

  console.log(customerNumber);
  const query = `SELECT *
  FROM customers
  WHERE customerNumber = ? AND customerStatus = 'active'`;

  db.query(query, customerNumber, (err, results) => {
    if (err) {
      res.status(500).json({ error: "record not found"});
    } else {
      console.log("///////////////////////////////////////////////////////////");
      console.log(results);
      res.json(results);
    }
   });
  });



app.get("/CustomerOrders/:customerNumber", (req, res) => {

  const { customerNumber } = req.params;

  console.log(customerNumber);
  const query = `SELECT *
  FROM orders
  JOIN customers
  ON customers.customerNumber = orders.customerNumber
  WHERE orders.customerNumber = ? AND customers.customerStatus = 'active'`;

  db.query(query, customerNumber, (err, results) => {
    if (err) {
      res.status(500).json({ error: "record not found"});
    } else {
      console.log("///////////////////////////////////////////////////////////");
      console.log(results);
      res.json(results);
    }
   });
  });


  app.get("/CustomerPayments/:customerNumber", (req, res) => {

    const { customerNumber } = req.params;
  
    console.log(customerNumber);
    const query = `SELECT *
    FROM payments
    JOIN customers
    ON payments.customerNumber = customers.customerNumber
    WHERE payments.customerNumber = ? AND customers.customerStatus = 'active'`;
  
    db.query(query, customerNumber, (err, results) => {
      if (err) {
        res.status(500).json({ error: "record not found"});
      } else {
        console.log("///////////////////////////////////////////////////////////");
        console.log(results);
        res.json(results);
      }
     });
    });


  app.get("/CustomerBalance/:customerNumber", (req, res) => {

    const { customerNumber } = req.params;
  
    console.log(customerNumber);
    const query = `SELECT 
    c.customerNumber,
    c.customerName,
    SUM(p.amount) AS totalPayments,
    (SELECT SUM(od.quantityOrdered * od.priceEach) 
     FROM orders o
     JOIN orderdetails od ON o.orderNumber = od.orderNumber
     WHERE o.customerNumber = c.customerNumber) AS totalAmount,
    (SELECT SUM(od.quantityOrdered * od.priceEach) 
     FROM orders o
     JOIN orderdetails od ON o.orderNumber = od.orderNumber
     WHERE o.customerNumber = c.customerNumber) - SUM(p.amount) AS balance
FROM 
    customers c
JOIN 
    payments p ON c.customerNumber = p.customerNumber
WHERE
    c.customerNumber = ?;`;
  
    db.query(query, customerNumber, (err, results) => {
      if (err) {
        res.status(500).json({ error: "record not found"});
      } else {
        console.log("///////////////////////////////////////////////////////////");
        console.log(results);
        res.json(results);
      }
      });
    });

    app.get("/OrderNumber/:orderNumber", (req, res) => {
      const { orderNumber } = req.params;

      const query = `SELECT *
      FROM orders
      WHERE orderNumber =  ?`;

      db.query(query, orderNumber, (err, results) => {
        if (err) {
          res.status(500).json({ error: "record not found"});
        } else {
          console.log("///////////////////////////////////////////////////////////");
          console.log(results);
          res.json(results);
        }
        });
    });

    app.get("/OrderDetails/:orderNumber", (req, res) => {
      const { orderNumber } = req.params;

      const query = `SELECT *, (od.quantityOrdered * od.priceEach) AS totalPrice
      FROM orders o
      JOIN orderdetails od ON o.orderNumber = od.orderNumber
      JOIN products p ON od.productCode = p.productCode
      WHERE od.orderNumber = ?`;

      db.query(query, orderNumber, (err, results) => {
        if (err) {
          res.status(500).json({ error: "record not found"});
        } else {
          console.log("///////////////////////////////////////////////////////////");
          console.log(results);
          res.json(results);
        }
        });
    });

    app.get("/Order", (req, res) => {

      const query = `SELECT * FROM orders`;

      db.query(query, (err, results) => {
        if (err) {
          res.status(500).json({ error: "record not found"});
        } else {
          console.log("///////////////////////////////////////////////////////////");
          console.log(results);
          res.json(results);
        }
        });
    });

    app.put("/OrderEdit/:orderNumber", (req, res) => {
      const { orderNumber } = req.params;
      const updatedData = req.body;
      console.log(updatedData);
    
      const orderNumberInt = parseInt(orderNumber, 10);
    
      // Construct the SQL query to update the record
      const query = `UPDATE orders
    SET
      orderDate = ?,
      requiredDate = ?,
      shippedDate = ?,
      status = ?,
      comments = ?,
      customerNumber = ?
    WHERE orderNumber = ?`;
    
      // Prepare an array of values to replace placeholders
      const values = [
        updatedData.orderDate,
        updatedData.requiredDate,
        updatedData.shippedDate,
        updatedData.status,
        updatedData.comments,
        updatedData.customerNumber, 
        orderNumberInt, // Use the integer customerNumber
        updatedData.customerNumber
      ];
    
      console.log(values);
    
      // Run the query
      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Error updating record:", err);
          res.status(500).json({ error: "Error updating record" });
        } else {
          if (result.affectedRows === 1) {
            console.log("Record updated successfully");
            res.status(200).json({ message: "Record updated successfully" });
          } else {
            console.log("Record not found or not updated");
            res.status(404).json({ error: "Record not found or not updated" });
          }
        }
      });
    });

app.get("/productCode", (req, res) => {
  const query = `SELECT productCode, productName
      FROM products
      WHERE productStatus = 'active'`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error in loading products: ", err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      console.log("Products loaded successfully");
      res.json(result);
    }
  })
})

app.get("/products/:productCode", (req, res) => {

  const { productCode } = req.params;
  console.log(productCode);
  const query = `SELECT productCode, productName
  FROM products
  WHERE productCode = ? AND productStatus = 'active'`;

  db.query(query, productCode, (err, result) => {
    if (err) {
      console.error("Error in loading products: ", err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      console.log("Products loaded successfully");
      res.json(result);
    };
  });
});

app.get("/key/:orderNumber", (req, res) => {
  const { orderNumber } = req.params;

  const query = `SELECT COUNT(*) AS 'key' FROM orders WHERE orderNumber = ?`;

  db.query(query, orderNumber, (err, result) => {
    if (err) {
      console.error("Error in loading products: ", err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      console.log("Products loaded successfully");
      res.json(result);
    };
  });
});

app.post("/CreateOrder", (req, res) => {
  const body = req.body;
  console.log(body);

  const {
    orderNumber,
    orderDate,
    requiredDate,
    shippedDate,
    status,
    comments,
    customerNumber,
  } = req.body;


  const orders = [
    orderNumber,
    orderDate,
    requiredDate,
    shippedDate,
    status,
    comments,
    customerNumber,
  ];

  const query = `
    INSERT INTO orders (
    orderNumber,
    orderDate,
    requiredDate,
    shippedDate,
    status,
    comments,
    customerNumber
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  try {
    // ... (your existing code)

    db.query(query, orders, (err, result) => {
      if (err) {
        console.error("Error inserting data: " + err.message);
        res.status(500).json({ message: "Error inserting data!" });
      } else {
        console.log("Data inserted successfully!");
        res.status(200).json({ message: "Data inserted successfully!" });
      }
    });
  } catch (err) {
    console.error("Error: " + err.message);
    res.status(500).json({ message: "Error inserting data!" });
  }
});

app.post("/CreateOrderDetails", (req, res) => {
  const orderDetailsList = req.body; // Assuming req.body is an array of order details objects
  console.log(orderDetailsList);

  const query = `
    INSERT INTO orderdetails (
      orderNumber,
      productCode,
      quantityOrdered,
      priceEach,
      orderLineNumber
    ) VALUES (?, ?, ?, ?, ?)`;

  try {
    // Iterate through the list of order details and execute the query for each set of details
    orderDetailsList.forEach((orderdetails) => {
      const {
        orderNumber,
        productCode,
        quantityOrdered,
        priceEach,
        orderLineNumber,
      } = orderdetails;

      db.query(query, [orderNumber, productCode, quantityOrdered, priceEach, orderLineNumber], (err, result) => {
        if (err) {
          console.error("Error inserting data: " + err.message);
        } else {
          console.log("Data inserted successfully for order number: " + orderNumber);
        }
      });
    });

    res.status(200).json({ message: "Data inserted successfully!" });
  } catch (err) {
    console.error("Error: " + err.message);
    res.status(500).json({ message: "Error inserting data!" });
  }
});

app.get("/status", (req, res) => {

  const query = `SELECT status as label, COUNT(STATUS) AS value
                  FROM orders
                GROUP BY status`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error in loading products: ", err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      console.log("Products loaded successfully");
      res.json(result);
    };
  });
});

app.get("/revenue", (req, res) => {

  const query = `SELECT SUM(quantityOrdered * priceEach) AS revenue
  FROM orderdetails;`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error in loading products: ", err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      console.log("Products loaded successfully");
      res.json(result);
    };
  });
});

app.get("/units", (req, res) => {

  const query = "SELECT SUM(quantityOrdered) AS TotalUnit FROM orderdetails";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error in loading products: ", err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      console.log("Products loaded successfully");
      res.json(result);
    };
  });
});

app.get("/payments", (req, res) => {

  const query = "SELECT SUM(amount) AS amount FROM payments";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error in loading products: ", err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      console.log("Products loaded successfully");
      res.json(result);
    };
  });
});

app.get("/TopProducts", (req, res) => {

  const query = `SELECT p.productName, COUNT(od.quantityOrdered) AS product
  FROM orderdetails od
  JOIN products p ON p.productCode = od.productCode 
  GROUP BY od.productCode
  ORDER BY od.quantityOrdered ASC
  LIMIT 10;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error in loading products: ", err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      console.log("Products loaded successfully");
      res.json(result);
    };
  });
});

app.get("/Status", (req, res) => {

  const query = `SELECT status, COUNT(status) AS value FROM orders
  GROUP BY status`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error in loading products: ", err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      console.log("Products loaded successfully");
      console.log(result);
      res.json(result);
    };
  });
});

app.get("/Country", (req, res) => {

  const query = `SELECT country, COUNT(country) AS val FROM customers
  GROUP BY country
  ORDER BY country DESC
  LIMIT 5;`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error in loading products: ", err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      console.log("Products loaded successfully");
      console.log(result);
      res.json(result);
    };
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
