import { Typography, Grid } from "@mui/material";
import React, { ReactNode } from "react";
import { useForm, Controller } from "react-hook-form";
interface LayoutProps {
  // children: ReactNode;
  firstrowHeading: string;
  firstrowHeading1?: string;
  firstrowHeading2?: string;
  firstrowHeading3?: string;
  firstrowHeading4?: string;
  secondrowHeading?: string;
  secondrowHeading1?: string;
  secondrowHeading2?: string;
  secondrowHeading3?: string;
  secondrowHeading4?: string;
  textClass?: string;
  textClass1?: string;
  name?: string;
  control?: any;
  defaultValue?: any;
}
const Form2_textField = ({
  firstrowHeading,
  firstrowHeading2,
  firstrowHeading3,
  firstrowHeading4,
  secondrowHeading,
  name,
  control,
  defaultValue,
  firstrowHeading1,
  secondrowHeading1,
  secondrowHeading2,
  secondrowHeading3,
  secondrowHeading4,
  textClass,
  textClass1,
}: LayoutProps) => {
  return (
    <div>
      {" "}
      <Grid className="content-row">
        <Grid className="bg-yellow" xs={6}>
          <Typography className={textClass ?? ""}>
            {firstrowHeading}
            <br />
            {firstrowHeading1 ?? ""}
            <br />
            {firstrowHeading2 ?? ""}
            <br />
            {firstrowHeading3 ?? ""} <br />
            {firstrowHeading4 ?? ""}{" "}
          </Typography>
        </Grid>

        <Grid className="txt-box-holder bxmin_width" xs={6}>
          <textarea value={defaultValue} className="txtarea-box" />
        </Grid>

        <Grid className="bg-right mn_width" xs={2}>
          <Typography className={textClass1 ?? ""}>
            {secondrowHeading ?? ""}
            <br />
            {secondrowHeading1 ?? ""}
            <br />
            {secondrowHeading2 ?? ""}
            <br />
            {secondrowHeading3 ?? ""}
            <br />
            {secondrowHeading4 ?? ""}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Form2_textField;
