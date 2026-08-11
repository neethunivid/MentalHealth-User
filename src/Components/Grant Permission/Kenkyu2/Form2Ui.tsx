import { Grid}from "@material-ui/core";
import { Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { getFormData, setFormData } from "../../../Redux/actions";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Form2Header from "./Form2Header";
import Form2Fields from "./Form2Fields";
import Form2Expenses from "./Form2Expenses";

const Form2Ui = () => {
    const navigate = useNavigate();
    const {
      register,
      watch,
      handleSubmit,
      control,
      setError,
      setValue,
      formState: { errors },
    } = useForm();
     useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    const watchFields = watch(["tb_1", "tb_2", "tb_3", "tb_4", "tb_5"]);
    const watchField = watch(["tb_7", "tb_8", "tb_9", "tb_10", "tb_11"]);
    // Calculate the sum of the five input fields
    const calculateSum_1 = () => {
      var sum = watchFields.reduce(
        (accumulator, currentValue) => {return parseFloat(currentValue) > 0 ?  accumulator + Number(currentValue):accumulator;},
        0
      );
      if (sum) {
        //console.log("testsum", sum);
        setValue("sum", sum);
      }
      return sum
    };
    const calculateSum = () => {
      const sum1 = watchField.reduce(
        (accumulator, currentValue) => {return parseFloat(currentValue)>0? accumulator + Number(currentValue):accumulator;},
        0
      );
      if (sum1) {
        setValue("sum1", sum1);
      }
       return sum1;
    };
    const dispatch = useDispatch();
    const form2: any = useSelector((state: any) => state.formData);
    console.log(form2);
    console.log("data in gm form", form2);
  
    const onSubmit = (data: any) => {
      console.log(data, "full form list data");
      dispatch(setFormData("form2", data));
      navigate("/kenkyu3");
    };
    const total = form2?.form2?.sum !== "" ? form2?.form2?.sum : calculateSum_1();
    const total1 = form2?.form2?.sum1 !=="" ?form2?.form2?.sum1 : calculateSum() ;
  return (
    <Grid container className="cover">
    <Grid item xs={12}>
      <form id="form2" onSubmit={handleSubmit(onSubmit)}>
        <Grid className="hr"></Grid>
        <Form2Header/>
        <Grid className="hr"></Grid>
        <Grid className="content-row">
        <Grid  xs={7} className="content-row">
          <Grid xs={8} className="bg-yellow">
            <Typography>6. 応募申請の区分</Typography>
          </Grid>
          <Grid xs={4} className="bg-yellow"></Grid>
          </Grid>
          <Grid  xs={5} className="content-row">
          <Grid xs={6} className="txt-box-holder">
            <Grid className="content-row">
              <Controller
                control={control}
                defaultValue={form2?.form2?.grant}
                name="grant"
                render={({ field }) => (
                  <input
                    {...field}
                    type="radio"
                    value="研究助成 "
                    //   checked={form2?.form2?.grant=="研究助成"}
                    {...register("grant")}
                    //   defaultChecked
                    
                  />
                )}
              />
             <Typography className="grant">研究助成 </Typography>
              <Controller
                control={control}
                defaultValue={form2?.form2?.grant}
                name="grant"
                render={({ field }) => (
                  <input
                    type="radio"
                    value="活動助成"
                    // checked={form2?.form2?.grant=='活動助'}
                    {...register("grant")}
                  />
                )}
              />
              <Typography className="grant">活動助成</Typography>
            </Grid>
          </Grid>
          <Grid xs={6} className="bg-right">
            <Typography> ◉研究助成　○活動助成</Typography>
          </Grid>
          </Grid>
        </Grid>
        <Grid className="hr"></Grid>
         <Grid className="content-row">
        <Grid  xs={7} className="content-row">
          <Grid xs={8} className="bg-yellow">
            <Typography> 7. 新規・継続の区分</Typography>
          </Grid>
          <Grid xs={4} className="bg-yellow"></Grid>
          </Grid>
          <Grid  xs={5} className="content-row">
          <Grid xs={6} className="txt-box-holder">
            <Grid className="content-row">
              <Controller
                control={control}
                defaultValue={form2?.form2?.grant1}
                name="grant1"
                render={({ field }) => (
                  <input
                    {...field}
                    type="radio"
                    value="新規 "
                    //   checked={form2?.form2?.grant1=="新規"}
                    {...register("grant1")}
                    //   defaultChecked
                  />
                )}
              />
               <Typography className="grant1">新規 </Typography>
               <Controller
                control={control}
                defaultValue={form2?.form2?.grant1}
                name="grant1"
                render={({ field }) => (
                  <input
                    type="radio"
                    value="継続"
                    //   checked={form2?.form2?.grant1=='継続'}
                    {...register("grant1")}
                  />
                )}
              />
               <Typography className="grant2">継続</Typography>
            </Grid>
          </Grid>
          <Grid xs={6} className="bg-right">
            <Typography>◉新規　○継続 </Typography>
          </Grid>
          </Grid>
        </Grid>
        <Grid className="hr"></Grid>
        <Grid className="content-row">
          <Grid  xs={7} className="content-row">
          <Grid xs={8} className="bg-yellow">
            <Typography className="txt-center"> 8. 研究名または活動名（80文字以内）</Typography>
          </Grid>
          <Grid xs={4} className="bg-yellow"></Grid>
          </Grid>
          <Grid xs={5} className="content-row">
          <Grid xs={6} className="txt-box-holder">
            <Controller
              control={control}
              defaultValue={form2?.form2?.activity}
              name="activity"
              render={({ field }) => (
                <textarea
                  {...field}
                  className="txtarea-box"
                  // value={form2?.form2?.activity}
                  {...register("activity")}
                />
              )}
            />
          </Grid>
          <Grid xs={6} className="bg-right">
            <Typography className="txt-center">現代の森田療法の研究 </Typography>
          </Grid>
          </Grid>
        </Grid>
       <Grid className="hr"></Grid>
        <Form2Expenses
       firstrowHeading="  9. 本研究活動に要する今年度の経費（単位：円）"
       secondrowHeading="A.設備備品費"
       thirdRowHeading="400,000"
       control={control}
       defaultValue={form2?.form2?.tb_1}
       name="tb_1"
      />
      <Form2Expenses
       firstrowHeading=" "
       secondrowHeading="B.消耗品費"
       thirdRowHeading="400,000"
       control={control}
       defaultValue={form2?.form2?.tb_2}
       name="tb_2"
      />
       <Form2Expenses
       firstrowHeading=" "
       secondrowHeading="C.旅費"
       thirdRowHeading="400,000"
       control={control}
       defaultValue={form2?.form2?.tb_3}
       name="tb_3"
      />
       <Form2Expenses
       firstrowHeading=" "
       secondrowHeading="D.謝礼金"
       thirdRowHeading="400,000"
       control={control}
       defaultValue={form2?.form2?.tb_4}
       name="tb_4"
      />
      <Form2Expenses
       firstrowHeading=" "
       secondrowHeading="E.その他"
       thirdRowHeading="400,000"
       control={control}
       defaultValue={form2?.form2?.tb_5}
       name="tb_5"
      />
       <Grid className="content-row">
        <Grid  xs={7} className="content-row">
          <Grid xs={8} className="bg-yellow"></Grid>
          <Grid xs={4} className="bg-yellow">
            <Typography>F.合計(A+B+C+D+E）</Typography>
          </Grid>
          </Grid>
          <Grid  xs={5} className="content-row">
          <Grid xs={6} className="txt-box-holder">
            <input
              type="number"
              className="txt-box"
            
             value={calculateSum_1()}
              {...register("sum",  { value: total })}
              readOnly
            />
          </Grid>
          <Grid xs={6} className="bg-right">
            <Typography>2,000,000 </Typography>
          </Grid>
          </Grid>
        </Grid>
        <Grid className="hr"></Grid>
        <Form2Expenses
       firstrowHeading="10. 上記に関する助成申請額（単位：円） "
       secondrowHeading="A.設備備品費"
       thirdRowHeading="2,000,000"
       control={control}
       defaultValue={form2?.form2?.tb_7}
       name="tb_7"
      />
      <Form2Expenses
       firstrowHeading=" "
       secondrowHeading="B.消耗品費"
       thirdRowHeading="2,000,000"
       control={control}
       defaultValue={form2?.form2?.tb_8}
       name="tb_8"
      />
      <Form2Expenses
       firstrowHeading=" "
       secondrowHeading="C.旅費"
       thirdRowHeading="2,000,000"
       control={control}
       defaultValue={form2?.form2?.tb_9}
       name="tb_9"
      />
      <Form2Expenses
       firstrowHeading=""
       secondrowHeading="D.謝礼金"
       thirdRowHeading="2,000,000"
       control={control}
       defaultValue={form2?.form2?.tb_10}
       name="tb_10"
      />
      <Form2Expenses
       firstrowHeading=" "
       secondrowHeading="E.その他"
       thirdRowHeading="2,000,000"
       control={control}
       defaultValue={form2?.form2?.tb_11}
       name="tb_11"
      />
      <Grid className="content-row">
        <Grid  xs={7} className="content-row">
          <Grid xs={8} className="bg-yellow"></Grid>
          <Grid xs={4} className="bg-yellow">
            <Typography>F.合計(A+B+C+D+E）</Typography>
          </Grid>
          </Grid>
          <Grid  xs={5} className="content-row">
          <Grid xs={6} className="txt-box-holder">
            <input
              type="number"
              className="txt-box"
              value={calculateSum()}
              {...register("sum1", { value: total1 })}
               readOnly
            />
            {/* )}
            />    */}
          </Grid>
          <Grid xs={6} className="bg-right">
            <Typography>1,000,000 </Typography>
          </Grid>
        </Grid>
        </Grid>
        <Grid className="hr"></Grid>
        <Form2Fields
       firstrowHeading="  11. 上記に関する助成金申請額 の明細 （800文字以内）"
       secondrowHeading=" 設備備品（会場代）200万円"
       secondrowHeading1=" 消耗品費（ポスター）20万円"
       secondrowHeading2=" 旅費（交通費）20万円"
       secondrowHeading3=" 謝礼金（4人）20万円"
       secondrowHeading4=" その他（予備費）20万円"
       textClass="txt-center"
       textClass1="txt-centerrg"
       control={control}
       defaultValue={form2?.form2?.grantamount}
       name="grantamount"
      />
      <Grid className="hr"></Grid>
        <Form2Fields
       firstrowHeading=" 12-1.研究または活動の内容"
       firstrowHeading1=" （1000文字以内）"
       textClass="txt-center"
       textClass1="txt-center"
       secondrowHeading="1.目的"
       control={control}
       defaultValue={form2?.form2?.purpose}
       name="purpose"
      />
        <Form2Fields
       firstrowHeading="  ※研究では、なるべく「目的」"
       firstrowHeading1="「対象」「方法」「予想される"
       firstrowHeading2=" 研究成果」項目別に"
       firstrowHeading3="   記述してください。"
       firstrowHeading4="（500文字以内）"
       textClass1="txt-center"
       secondrowHeading="2.対象"
       control={control}
       defaultValue={form2?.form2?.target}
       name="target"
      />
       <Form2Fields
       firstrowHeading="   ※調査がある場合は、その"
       firstrowHeading1=" 内容が把握できる大まかな"
       firstrowHeading2="  調査項目を示して下さい。"
       firstrowHeading3=" （1000文字以内）"
       textClass="txt-centerrg"
       textClass1="txt-center"
       secondrowHeading=" 3.方法 "
       control={control}
       defaultValue={form2?.form2?.method}
       name="method"
      />
      <Form2Fields
       firstrowHeading="  ※調査票を用いる場合は、"
       firstrowHeading1=" 調査票を添付して下さい。"
       firstrowHeading2=" （500文字以内）"
       textClass="txt-centerrg"
       textClass1="txt-center"
       secondrowHeading="4.予想される成果 "
       control={control}
       defaultValue={form2?.form2?.outcome}
       name="outcome"
      />
       <Grid className="hr"></Grid>

        <Grid className="bg-yellow">
          <Typography>
            個人を対象にした調査や研究がなされる場合の人権やプライバシーへの配慮について
          </Typography>
        </Grid>
        <Form2Fields
       firstrowHeading="  12-A (１)所属機関の倫理審査委員会"
       firstrowHeading1="等の承認について（500文字以内）"
       secondrowHeading=""
       textClass="txt-center"
       control={control}
       defaultValue={form2?.form2?.review}
       name="review"
      />
        <Form2Fields
       firstrowHeading="  12-B（２）調査・研究対象者個人"
       firstrowHeading1=" に対して（500文字以内）"
       secondrowHeading=""
       textClass="txt-center"
       control={control}
       defaultValue={form2?.form2?.survey}
       name="survey"
      />
       <Grid className="hr"></Grid>
        <Form2Fields
       firstrowHeading=" 12-2. キーワード （80文字以内）"
       secondrowHeading=""
       textClass="txt-center"
       control={control}
       defaultValue={form2?.form2?.keyword}
       name="keyword"
      />
       <Grid className="hr"></Grid>
        <Grid className="content-row">
          <Grid xs={5} className="action-row">
            <button type="button" onClick={() => navigate("/kenkyu1")}>
              ⏪　戻る
            </button>
          </Grid>
          <Grid xs={7} className="action-row">
            <button type="submit">様式1-3へ⏩</button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  </Grid>
  )
}

export default Form2Ui