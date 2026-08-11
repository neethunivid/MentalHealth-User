
import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form';
import pref from '../../Common/pref';

interface LayoutProps {
  // children: ReactNode;
  firstrowHeading?: string;
  secondrowHeading: string;
  thirdRowHeading: string;
  textClass?: string;
  gridBg?: string;
  spanP1?: Boolean;
  spanP2?: Boolean;
  name: string;
  control?: any;
  defaultValue?: any;
  inputTypeText?: Boolean;
}
const Form1FieldsComp = ({
    firstrowHeading,
    secondrowHeading,
    thirdRowHeading,
    textClass,
    gridBg,
    spanP1,
    spanP2,
    name,
    control,
    defaultValue,
    inputTypeText,
  }: LayoutProps) => {
  return (
    <div>
  
    <Grid className="content-row">
      <Grid className={gridBg ?? "bg-yellow"} xs={3}>
        <Typography className={textClass ?? ""}>
          {firstrowHeading ?? ""}{" "}
          {spanP1 == true ? <span className="span-star"> * </span> : ""}
        </Typography>
      </Grid>
      <Grid className="bg-yellow" xs={2}>
        <Typography>
          {secondrowHeading}{" "}
          {spanP2 == true ? <span className="span-star"> * </span> : ""}
        </Typography>
      </Grid>
      <Grid className="txt-box-holder" item xs={2}>
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={name}
          render={({ field }) => (
            <>
              {inputTypeText == true ? (
                <select {...field} className="selt-box">
                  {pref.map((item: any) => (
                    <option key={item.label}>{item.value}</option>
                  ))}
                </select>
              ) : (
                <input {...field} type="text" className="txt-box" />
              )}
            </>
          )}
        />
      </Grid>
      <Grid className="bg-right" item xs={5}>
        <Typography>{thirdRowHeading}</Typography>
      </Grid>
    </Grid>
  </div>
  )
}

export default Form1FieldsComp