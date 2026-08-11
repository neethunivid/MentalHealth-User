import { Grid, Typography } from "@mui/material";
import React from "react";
import { text } from "stream/consumers";

import { useSelector, useDispatch } from "react-redux";
import Form2_expenss_field from "./Form2_expenss_field";
import Form2_textField from "./Form2_textField";

const PreviewForm2 = () => {
    const form2: any = useSelector((state: any) => state.formData);
  return (
    <div>
    <Grid container className="cover">
      <Grid item xs={12}>
        <form id="form2">
          <Grid className="hr"></Grid>
          {/* <Form2Header /> */}
          <Grid className="header-row">
        <Grid  xs={7} className="content-row">
          <Grid item xs={8}>
            <Typography className="text-bold"> ■様式1-2 (Form2)</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className="text-bold">
              記入項目 (Item Questions)
            </Typography>
          </Grid> 
          </Grid>
          <Grid  xs={5} className="content-row">
          <Grid item xs={6}>
            <Typography className="text-bold">
              {"   "}
              記入欄 (Fill in Answers)
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="text-bold txt_lft"> 記入例 (Example)</Typography>
          </Grid>
          </Grid>
        </Grid>
          <Grid className="hr"></Grid>
          <Grid className="content-row">
            <Grid xs={7} className="content-row">
              <Grid xs={8} className="bg-yellow">
                <Typography>6. 応募申請の区分</Typography>
              </Grid>
              <Grid xs={4} className="bg-yellow"></Grid>
            </Grid>
            <Grid xs={5} className="content-row">
              <Grid xs={6} className="txt-box-holder">
                <Grid className="content-row">
                  <input
                    type="text"
                    className="txt-box"
                    value={form2?.form2?.grant}
                  />
                </Grid>
              </Grid>
              <Grid xs={6} className="bg-right">
                <Typography> ◉研究助成　○活動助成</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid className="hr"></Grid>
          <Grid className="content-row">
            <Grid xs={7} className="content-row">
              <Grid xs={8} className="bg-yellow">
                <Typography> 7. 新規・継続の区分</Typography>
              </Grid>
              <Grid xs={4} className="bg-yellow"></Grid>
            </Grid>
            <Grid xs={5} className="content-row">
              <Grid xs={6} className="txt-box-holder">
                <Grid className="content-row">
                  <input value={form2?.form2?.grant1} className="txt-box" />
                </Grid>
              </Grid>
              <Grid xs={6} className="bg-right">
                <Typography>◉新規　○継続 </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid className="content-row">
            <Grid xs={7} className="content-row">
              <Grid xs={8} className="bg-yellow">
                <Typography> 8. 研究名または活動名（80文字以内）</Typography>
              </Grid>
              <Grid xs={4} className="bg-yellow"></Grid>
            </Grid>
            <Grid xs={5} className="content-row">
              <Grid xs={6} className="txt-box-holder">
                <input
                  type="text"
                  style={{ height: "50px" }}
                  value={form2?.form2?.activity}
                  className="txt-box input-box"
                />
              </Grid>
              <Grid xs={6} className="bg-right">
                <Typography>現代の森田療法の研究 </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Form2_expenss_field
            firstrowHeading="  9. 本研究活動に要する今年度の経費（単位：円）"
            secondrowHeading="A.設備備品費"
            thirdRowHeading="400,000"
            defaultValue={form2?.form2?.tb_1}
          />
          <Form2_expenss_field
            firstrowHeading=""
            secondrowHeading="B.消耗品費"
            thirdRowHeading="400,000"
            defaultValue={form2?.form2?.tb_2}
          />
          <Form2_expenss_field
            firstrowHeading=""
            secondrowHeading="C.旅費"
            thirdRowHeading="400,000"
            defaultValue={form2?.form2?.tb_3}
          />
          <Form2_expenss_field
            firstrowHeading=" "
            secondrowHeading="D.謝礼金"
            thirdRowHeading="400,000"
            defaultValue={form2?.form2?.tb_4}
          />
          <Form2_expenss_field
            firstrowHeading=" "
            secondrowHeading="E.その他"
            thirdRowHeading="400,000"
            defaultValue={form2?.form2?.tb_5}
          />
          <Grid className="content-row">
            <Grid xs={7} className="content-row">
              <Grid xs={8} className="bg-yellow"></Grid>
              <Grid xs={4} className="bg-yellow">
                <Typography>F.合計(A+B+C+D+E）</Typography>
              </Grid>
            </Grid>
            <Grid xs={5} className="content-row">
              <Grid xs={6} className="txt-box-holder">
                <input
                  type="number"
                  className="txt-box"
                  value={form2?.form2?.sum}
                  readOnly
                />
              </Grid>
              <Grid xs={6} className="bg-right">
                <Typography>2,000,000 </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Form2_expenss_field
            firstrowHeading="10. 上記に関する助成申請額（単位：円） "
            secondrowHeading="A.設備備品費"
            thirdRowHeading="400,000"
            defaultValue={form2?.form2?.tb_7}
          />
          <Form2_expenss_field
            firstrowHeading=" "
            secondrowHeading="B.消耗品費"
            thirdRowHeading="400,000"
            defaultValue={form2?.form2?.tb_8}
          />
          <Form2_expenss_field
            firstrowHeading=" "
            secondrowHeading="C.旅費"
            thirdRowHeading="400,000"
            defaultValue={form2?.form2?.tb_9}
          />
          <Form2_expenss_field
            firstrowHeading=""
            secondrowHeading="D.謝礼金"
            thirdRowHeading="400,000"
            defaultValue={form2?.form2?.tb_10}
          />
          <Form2_expenss_field
            firstrowHeading=" "
            secondrowHeading="E.その他"
            thirdRowHeading="400,000"
            defaultValue={form2?.form2?.tb_11}
          />
          <Grid className="content-row">
            <Grid xs={7} className="content-row">
              <Grid xs={8} className="bg-yellow"></Grid>
              <Grid xs={4} className="bg-yellow">
                <Typography>F.合計(A+B+C+D+E）</Typography>
              </Grid>
            </Grid>
            <Grid xs={5} className="content-row">
              <Grid xs={6} className="txt-box-holder">
                <input
                  type="number"
                  className="txt-box"
                  value={form2?.form2?.sum1}
                  readOnly
                />
              </Grid>
              <Grid xs={6} className="bg-right">
                <Typography>1,000,000 </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Form2_textField
            firstrowHeading="  11. 上記に関する助成金申請額 の明細 （800文字以内）"
            secondrowHeading=" 設備備品（会場代）200万円"
            secondrowHeading1=" 消耗品費（ポスター）20万円"
            secondrowHeading2=" 旅費（交通費）20万円"
            secondrowHeading3=" 謝礼金（4人）20万円"
            secondrowHeading4=" その他（予備費）20万円"
            textClass="txt-center"
            textClass1="txt-centerrg"
            defaultValue={form2?.form2?.grantamount}
          />
          <Grid className="hr"></Grid>
          <Form2_textField
            firstrowHeading=" 12-1.研究または活動の内容"
            firstrowHeading1=" （1000文字以内）"
            textClass="txt-center"
            textClass1="txt-center"
            secondrowHeading="1.目的"
            defaultValue={form2?.form2?.purpose}
          />
          <Form2_textField
            firstrowHeading="  ※研究では、なるべく「目的」"
            firstrowHeading1="「対象」「方法」「予想される"
            firstrowHeading2=" 研究成果」項目別に"
            firstrowHeading3="   記述してください。"
            firstrowHeading4="（500文字以内）"
            textClass1="txt-center"
            secondrowHeading="2.対象"
            defaultValue={form2?.form2?.target}
          />
          <Form2_textField
            firstrowHeading="   ※調査がある場合は、その"
            firstrowHeading1=" 内容が把握できる大まかな"
            firstrowHeading2="  調査項目を示して下さい。"
            firstrowHeading3=" "
            textClass="txt-centerrg"
            textClass1="txt-center"
            secondrowHeading=" 3.内容"
            defaultValue={form2?.form2?.method}
            name="method"
          />
          <Form2_textField
            firstrowHeading="  ※調査票を用いる場合は、"
            firstrowHeading1=" 調査票を添付して下さい。"
            firstrowHeading2=" "
            textClass="txt-centerrg"
            textClass1="txt-center"
            secondrowHeading="4.予想される成果 "
            defaultValue={form2?.form2?.outcome}
          />
          <Grid className="hr"></Grid>

          <Grid className="bg-yellow">
            <Typography>
              個人を対象にした調査や研究がなされる場合の人権やプライバシーへの配慮について
            </Typography>
          </Grid>
          <Form2_textField
            firstrowHeading="  12-A (１)所属機関の倫理審査委員会"
            firstrowHeading1="等の承認について"
            secondrowHeading=""
            textClass="txt-center"
            defaultValue={form2?.form2?.review}
            name="review"
          />
          <Form2_textField
            firstrowHeading="  12-B（２）調査・研究対象者個人"
            firstrowHeading1=" に対して"
            secondrowHeading=""
            textClass="txt-center"
            defaultValue={form2?.form2?.survey}
            name="survey"
          />
          <Grid className="hr"></Grid>
          <Form2_textField
            firstrowHeading=" 12-2. キーワード "
            secondrowHeading=""
            textClass="txt-center"
            defaultValue={form2?.form2?.keyword}
            name="keyword"
          />
          <Grid className="hr"></Grid>
        </form>
      </Grid>
    </Grid>
  </div>
  )
}

export default PreviewForm2