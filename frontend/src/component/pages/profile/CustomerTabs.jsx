import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomerOrders from './CustomerOrders';
import CustomersPayments from './CustomerPayments';
import CustomerBalance from './CustomerBalance';

export default function CustomerTabs({customerNumber}) {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch (value) {
      case 'one':
        return (<CustomerOrders customerNumber={customerNumber} />);
      case 'two':
        return <><CustomersPayments customerNumber={customerNumber} /></>
        case 'three':
        return <><CustomerBalance customerNumber={customerNumber} /></>
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Order Details" />
        <Tab value="two" label="Payments" />
        <Tab value="three" label="Balance" />
      </Tabs>

      {renderTabContent()}
    </Box>
  );
}
