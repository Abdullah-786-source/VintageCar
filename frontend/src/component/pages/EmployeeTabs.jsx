import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Employee from './employee/Employees';
import Office from './office/Office';

export default function ColorTabs() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch (value) {
      case 'one':
        return (<Employee/>);
      case 'two':
        return (<Office />);
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
        <Tab value="one" label="Employee Profile" />
        <Tab value="two" label="Office" />
      </Tabs>

      {renderTabContent()}
    </Box>
  );
}
