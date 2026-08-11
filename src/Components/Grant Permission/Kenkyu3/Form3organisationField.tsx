import { Typography,Grid } from '@mui/material';
import React, { ReactNode } from 'react'
import { useForm, Controller } from "react-hook-form";

interface LayoutProps {
    // children: ReactNode;
    firstrowHeading?: string;
    secondrowHeading: string;
    thirdRowHeading: string;
    textClass?:string;
    name:string;
    control?:any;
    defaultValue?:any;
    
  }
const Form3organisationField = ({  firstrowHeading,secondrowHeading,thirdRowHeading,textClass,name,control,defaultValue}:LayoutProps) => {
  return (
    <div>  <Grid className="content-row">
    <Grid className='bg-yellow' xs={4}>
      <Typography className={textClass??''}>{firstrowHeading??''}</Typography>
    </Grid>
    <Grid className="bg-yellow" xs={2}>
      <Typography>{secondrowHeading}</Typography>
    </Grid>
    <Grid className="txt-box-holder" item xs={3}>
    <Controller
              control={control}
              defaultValue={defaultValue}
              name={name}
              render={({ field }) => (
                <input {...field} type="text" className="txt-box" />
                )}
            />
    </Grid>
    <Grid className="bg-right" item xs={3}>
      <Typography>{thirdRowHeading}</Typography>
    </Grid>
  </Grid></div>
  )
}

export default Form3organisationField