import { Grid, Typography } from "@mui/material";
import React from "react";

interface LayoutProps {
    firstrowHeading?: string;
    secondrowHeading: string;
    thirdRowHeading: string;
    textClass?: string;
    gridBg?: string;
    // name:string;
    defaultValue?: any;
  }
const Form1Field_prev = ({
    firstrowHeading,
    secondrowHeading,
    thirdRowHeading,
    textClass,
    gridBg,
    defaultValue,
  }: LayoutProps) => {
  return (
    <div>
    <Grid className="content-row">
      <Grid className={gridBg ?? "bg-yellow"} xs={3}>
        <Typography className={textClass ?? ""}>
          {firstrowHeading ?? ""}{" "}
        </Typography>
      </Grid>
      <Grid className="bg-yellow" xs={2}>
        <Typography>{secondrowHeading} </Typography>
      </Grid>
      <Grid className="txt-box-holder" item xs={3}>
        <>
          <input
            type="text"
            value={defaultValue}
            className="txt-box"
            readOnly
          />
        </>
      </Grid>
      <Grid className="bg-right" item xs={5}>
        <Typography>{thirdRowHeading}</Typography>
      </Grid>
    </Grid>
  </div>
  )
}

export default Form1Field_prev