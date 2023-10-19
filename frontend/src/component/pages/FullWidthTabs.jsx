import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Customer from './profile/Customer';

export default function ColorTabs() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch (value) {
      case 'one':
        return (<Customer />);
      case 'two':
        return <>Tabl2</>;
      case 'three':
        return <>Tabl3</>;
      case 'four':
        return <>Tabl4</>;
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
        <Tab value="one" label="Customer Profile" />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" />
        <Tab value="four" label="Item four" />
        <Tab value="four" label="Item four" />
      </Tabs>

      {renderTabContent()}
    </Box>
  );
}
