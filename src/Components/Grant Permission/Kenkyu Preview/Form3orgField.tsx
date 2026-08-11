import { Grid, Typography } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";

interface LayoutProps {
  // children: ReactNode;
  firstrowHeading?: string;
  secondrowHeading: string;
  thirdRowHeading: string;
  textClass?: string;

  defaultValue?: any;
}
const Form3orgField = ({
  firstrowHeading,
  secondrowHeading,
  thirdRowHeading,
  textClass,

  defaultValue,
}: LayoutProps) => {
  return (
    <div>
      <Grid className="content-row">
        <Grid className="bg-yellow" xs={4}>
          <Typography className={textClass ?? ""}>
            {firstrowHeading ?? ""}
          </Typography>
        </Grid>
        <Grid className="bg-yellow" xs={2}>
          <Typography>{secondrowHeading}</Typography>
        </Grid>
        <Grid className="txt-box-holder" item xs={3}>
          <input defaultValue={defaultValue} type="text" className="txt-box" />
        </Grid>
        <Grid className="bg-right" item xs={3}>
          <Typography>{thirdRowHeading}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Form3orgField;
