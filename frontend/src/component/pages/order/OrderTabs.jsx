import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import OrderDetails from './OrderDetails';


export default function OrderTabs({orderNumber}) {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch (value) {
      case 'one':
        return (<OrderDetails orderNumber={orderNumber} />);
      case 'two':
        return <></>
        case 'three':
        return <></>
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
      </Tabs>

      {renderTabContent()}
    </Box>
  );
}
