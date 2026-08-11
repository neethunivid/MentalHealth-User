import React from "react";
import { Typography, Grid } from "@mui/material";

interface LayoutProps {
  // children: ReactNode;
  firstrowHeading?: string;
  secondrowHeading: string;
  thirdRowHeading: string;
  textClass?: string;
  gridBg?: string;
  spanP1?: Boolean;
  spanP2?: Boolean;

  control?: any;
  defaultValue?: any;
  inputTypeText?: Boolean;
}
const Form2_expenss_field = ({
  firstrowHeading,
  secondrowHeading,
  thirdRowHeading,
  textClass,

  control,
  defaultValue,
}: LayoutProps) => {
  return (
    <Grid className="content-row">
      <Grid xs={7} className="content-row">
        <Grid xs={8} className="bg-yellow">
          <Typography className={textClass ?? ""}>
            {firstrowHeading ?? ""}
          </Typography>
        </Grid>
        <Grid className="bg-yellow" xs={4}>
          <Typography>{secondrowHeading}</Typography>
        </Grid>
      </Grid>
      <Grid xs={5} className="content-row">
        <Grid className="txt-box-holder tbmin_width" xs={6}>
          <input
            value={defaultValue}
            type="text"
            pattern="[0-9 _,]*"
            className="txt-box"
            readOnly
          />
        </Grid>
        <Grid className="bg-right" xs={6}>
          <Typography>{thirdRowHeading}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Form2_expenss_field;
