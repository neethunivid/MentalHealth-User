import { Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

interface LayoutProps {
  id: string;
  label?: string;
 inputValue?:string
}

const FormInputPreview = ({
  label,
  inputValue,
}: LayoutProps) => {
  // Function to determine if the field is required based on the presence of the asterisk
  
  return (
    <Grid container item className="textfieldcontainer">
      <Grid item className="labelcontainer" xs={12} md={4}>
        <Typography variant='h4'>
          {label ?? ''} 
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        {inputValue}
      </Grid>
    </Grid>
  );
};

export default FormInputPreview;
