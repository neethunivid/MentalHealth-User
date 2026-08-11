import { Typography,Grid } from '@mui/material'
import React, { ReactNode } from 'react'
import { useForm, Controller } from "react-hook-form";
interface LayoutProps {
    // children: ReactNode;
    firstrowHeading?: string;
    secondrowHeading: string;
    thirdRowHeading: string;
    textClass?:string;
    gridBg?:string;
    spanP1?:Boolean;
    spanP2?:Boolean;
    name:string;
    control?:any;
    defaultValue?:any;
    inputTypeText?:Boolean
  }
const Form2Expenses = ({  firstrowHeading,secondrowHeading,thirdRowHeading,textClass,name,control,defaultValue}:LayoutProps) => {
  return (
    <Grid className="content-row">
    <Grid  xs={7} className="content-row">
   <Grid xs={8} className="bg-yellow">
     <Typography className={textClass??''}>{firstrowHeading??''}</Typography>
   </Grid>
   <Grid className="bg-yellow" xs={4}>
     <Typography>{secondrowHeading}</Typography>
   </Grid>
   </Grid>
   <Grid  xs={5} className="content-row">
   <Grid className="txt-box-holder tbmin_width"   xs={6}>
   <Controller
             control={control}
             defaultValue={defaultValue}
             name={name}
             render={({ field }) => (
               <input {...field} type="text"  pattern="[0-9 _,]*" className="txt-box" />
             
         
             )}
           />
   </Grid>
   <Grid className="bg-right" xs={6}>
     <Typography>{thirdRowHeading}</Typography>
   </Grid>
   </Grid>
 </Grid>
  )
}

export default Form2Expenses