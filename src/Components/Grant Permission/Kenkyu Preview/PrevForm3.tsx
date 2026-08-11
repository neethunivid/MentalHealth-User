import React from "react";
import Form3orgField from "./Form3orgField";
import { Grid, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
const PrevForm3 = () => {
  const form3: any = useSelector((state: any) => state.formData);
  return (
    <div>
      <Grid className="hr"></Grid>
      <Form3orgField
        firstrowHeading="13. 研究組織"
        secondrowHeading="研究代表者"
        thirdRowHeading="山田太郎"
        defaultValue={form3?.form3?.representative}
      />
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="所属機関・部局・職名"
        thirdRowHeading="メンタルヘルス記念病院　事務局"
        defaultValue={form3?.form3?.department}
      />
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="年齢"
        thirdRowHeading="63歳 "
        defaultValue={form3?.form3?.age}
      />
      <Grid className="hr"></Grid>
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="役割分担"
        thirdRowHeading=""
        defaultValue={form3?.form3?.division}
      />
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="研究分担者（1）"
        thirdRowHeading="川上花子"
        defaultValue={form3?.form3?.investor1}
      />
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="所属機関・部局・職名"
        thirdRowHeading="メンタルヘルス記念病院　看護師"
        defaultValue={form3?.form3?.deparment1}
      />
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="年齢"
        thirdRowHeading="59歳  "
        defaultValue={form3?.form3?.age1}
      />
      <Grid className="hr"></Grid>
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="役割分担"
        thirdRowHeading=""
        defaultValue={form3?.form3?.role1}
      />
      <Grid className="hr"></Grid>
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="研究分担者（2）"
        thirdRowHeading=""
        defaultValue={form3?.form3?.investor2}
      />
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="所属機関・部局・職名"
        thirdRowHeading=""
        defaultValue={form3?.form3?.deparment2}
      />
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="年齢"
        thirdRowHeading=""
        defaultValue={form3?.form3?.age2}
      />
      <Grid className="hr"></Grid>
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="役割分担"
        thirdRowHeading=""
        defaultValue={form3?.form3?.role2}
      />
      <Grid className="hr"></Grid>
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="研究分担者（3）"
        thirdRowHeading=""
        defaultValue={form3?.form3?.investor3}
      />
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="所属機関・部局・職名"
        thirdRowHeading=""
        defaultValue={form3?.form3?.deparment3}
      />
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="年齢"
        thirdRowHeading=""
        defaultValue={form3?.form3?.age3}
      />
      <Grid className="hr"></Grid>
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="役割分担"
        thirdRowHeading=""
        defaultValue={form3?.form3?.role3}
      />
      <Grid className="hr"></Grid>
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="研究分担者（4）"
        thirdRowHeading=""
        defaultValue={form3?.form3?.investor4}
      />
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="所属機関・部局・職名"
        thirdRowHeading=""
        defaultValue={form3?.form3?.deparment4}
      />
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="年齢"
        thirdRowHeading=""
        defaultValue={form3?.form3?.age4}
      />
      <Grid className="hr"></Grid>
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="役割分担"
        thirdRowHeading=""
        defaultValue={form3?.form3?.role4}
      />
      <Grid className="hr"></Grid>
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="研究分担者（5）"
        thirdRowHeading=""
        defaultValue={form3?.form3?.investor5}
      />
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="所属機関・部局・職名"
        thirdRowHeading=""
        defaultValue={form3?.form3?.deparment5}
      />
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="年齢"
        thirdRowHeading=""
        defaultValue={form3?.form3?.age5}
      />
      <Grid className="hr"></Grid>
      <Form3orgField
        firstrowHeading=""
        secondrowHeading="役割分担"
        thirdRowHeading=""
        defaultValue={form3?.form3?.role5}
      />
    </div>
  );
};

export default PrevForm3;
