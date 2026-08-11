import React from 'react'
import { Box, Grid } from "@material-ui/core";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFormData } from "../../../Redux/actions";
import apiClient from '../../../API/API-client';
import Form3Header from './Form3Header';
import Form3organisationField from './Form3organisationField';

const Form3Ui = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const form3: any = useSelector((state: any) => state.formData);
 
  
    const form1: any = useSelector((state: any) => state.formData);
 
  
    const {
      register,
      handleSubmit,
      control,
      setError,
      setValue,
      formState: { errors },
    } = useForm();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [file1Visible, setFile1Visible] = useState(true);
    const [uploadMsg, setUploadMsg] = useState("");
    const [filename, setfilename] = useState<any>();
  
    const fileUpload = async () => {

      const fileName = selectedFile?.name;

  
      try {
        const DataRequest = {
          file: selectedFile,
          fileName: fileName,
          // fileName: selectedFile.name,
        };
  
  
        const apiData = await apiClient.post("api/file/upload", DataRequest, {});
  

  
        if (apiData) {

          const fileid = apiData.data.data.id;
          var result: any = selectedFile;
          result["id"] = fileid;

          window.scrollTo(0, 0);
        } else {
      
          alert("errorrrrrr here");
          return;
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };
  
    const onSubmit = (data: any) => {

      dispatch(setFormData("form3", data));
  
      navigate("/kenkyuprev");
    };
    useEffect(() => {
      window.scrollTo(0, 0);

      if (form1?.form1 == null) {
        navigate("/kenkyu1");
      }
      window.scrollTo(0, 0);
      if (form3?.form3?.files) {
        let file = form3.form3.files[0];
        if (!file) {
          file = form3.form3.files;
        }
        setfilename(file);
        setValue("files", file);
     
      }
    }, []);
  
    const handleFile1Click = () => {
      setFile1Visible(false);
    };
  return (
    <Grid container className="cover">
    <Grid xs={12}>
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography>{uploadMsg}</Typography>
        <Form3Header />

        <Grid className="hr"></Grid>
        <Grid className="content-row">
          <Grid xs={4} className="bg-yellow">
            <Typography className="txt-center">
              {" "}
              12-3. 本研究の独創性（具体的に）（800文字以内）
            </Typography>
          </Grid>
          <Grid xs={5} className="txt-box-holder">
            <Controller
              control={control}
              defaultValue={form3?.form3?.originality}
              name="originality"
              render={({ field }) => (
                <textarea
                  className="txtarea-box"
                  maxLength={800}
                  {...register("originality")}
                />
              )}
            />
          </Grid>
          <Grid xs={3} className="bg-right"></Grid>
        </Grid>
        <Grid className="hr"></Grid>
        <Grid className="content-row">
          <Grid xs={9} className="bg-yellow fm3_width">
            <Typography>
              {" "}
              12-４. 関連領域における研究発表、実績
              （投稿論文や学会発表論文など）（1000文字以内）
            </Typography>
          </Grid>
          <Grid xs={3} className="bg-right"></Grid>
        </Grid>
        <Grid className="content-row">
          <Grid xs={4} className="bg-yellow"></Grid>
          <Grid xs={5} className="txt-box-holder">
            <Controller
              control={control}
              defaultValue={form3?.form3?.presentation}
              name="presentation"
              render={({ field }) => (
                <textarea
                  className="txtarea-box"
                  maxLength={1000}
                  {...register("presentation")}
                />
              )}
            />
          </Grid>
          <Grid xs={3} className="bg-right"></Grid>
        </Grid>
        <Grid className="hr"></Grid>
        <Form3organisationField
          firstrowHeading="13. 研究組織"
          secondrowHeading="研究代表者"
          thirdRowHeading="山田太郎"
          control={control}
          defaultValue={form3?.form3?.representative}
          name="representative"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="所属機関・部局・職名"
          thirdRowHeading="メンタルヘルス記念病院　事務局"
          control={control}
          defaultValue={form3?.form3?.department}
          name="department"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="年齢"
          thirdRowHeading="63歳 "
          control={control}
          defaultValue={form3?.form3?.age}
          name="age"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="役割分担"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.division}
          name="division"
        />
        <Grid className="hr"></Grid>
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="研究分担者（1）"
          thirdRowHeading="川上花子"
          control={control}
          defaultValue={form3?.form3?.investor1}
          name="investor1"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="所属機関・部局・職名"
          thirdRowHeading="メンタルヘルス記念病院　看護師"
          control={control}
          defaultValue={form3?.form3?.deparment1}
          name="deparment1"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="年齢"
          thirdRowHeading="59歳  "
          control={control}
          defaultValue={form3?.form3?.age1}
          name="age1"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="役割分担"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.role1}
          name="role1"
        />
        <Grid className="hr"></Grid>
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="研究分担者（2）"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.investor2}
          name="investor2"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="所属機関・部局・職名"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.deparment2}
          name="deparment2"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="年齢"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.age2}
          name="age2"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="役割分担"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.role2}
          name="role2"
        />
        <Grid className="hr"></Grid>
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="研究分担者（3）"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.investor3}
          name="investor3"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="所属機関・部局・職名"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.deparment3}
          name="deparment3"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="年齢"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.age3}
          name="age3"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="役割分担"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.role3}
          name="role3"
        />
        <Grid className="hr"></Grid>
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="研究分担者（4）"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.investor4}
          name="investor4"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="所属機関・部局・職名"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.deparment4}
          name="deparment4"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="年齢"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.age4}
          name="age4"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="役割分担"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.role4}
          name="role4"
        />
        <Grid className="hr"></Grid>
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="研究分担者（5）"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.investor5}
          name="investor5"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="所属機関・部局・職名"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.deparment5}
          name="deparment5"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="年齢"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.age5}
          name="age5"
        />
        <Form3organisationField
          firstrowHeading=""
          secondrowHeading="役割分担"
          thirdRowHeading=""
          control={control}
          defaultValue={form3?.form3?.role5}
          name="role5"
        />
        <Grid className="hr"></Grid>
        <Grid className="content-row">
          <Grid xs={9} className="bg-yellow fm3_width">
            <Typography>
              14. 過年度助成の研究内容と実績の要約を箇条書きで記述してください
            </Typography>
          </Grid>

          <Grid className="bg-right"></Grid>
          <Grid xs={3} className="bg-right"></Grid>
        </Grid>
        <Grid className="content-row">
          <Grid xs={4} className="bg-yellow">
            <Typography className="txt-center">
              {" "}
              （研究助成申請者のみ記入して下さい）（800文字以内）{" "}
            </Typography>
          </Grid>
          <Grid xs={5} className="txt-box-holder">
            <Controller
              control={control}
              defaultValue={form3?.form3?.previousgrant}
              name="previousgrant"
              render={({ field }) => (
                <textarea
                  className="txtarea-box"
                  maxLength={800}
                  {...register("previousgrant")}
                />
              )}
            />
          </Grid>
          <Grid xs={3} className="bg-right"></Grid>
        </Grid>
        <Grid className="hr"></Grid>
        <Grid className="action-green">
          <Grid xs={4} className="action-row">
            <button type="button" onClick={() => navigate("/kenkyu2")}>
              ⏪　戻る
            </button>
          </Grid>
          <Grid xs={8} className="action-row">
            <button type="submit">内容確認（プレビュー）</button>
          </Grid>
        </Grid>
        <Grid className="content-row">
          <Grid xs={6} className="action-row">
            <Typography className="text-center">
              {" "}
              ＜注＞
              <br />
              1）添付資料2が
              <b> ない</b>
              場合は、
              <b> 内容確認（プレビュー）後、</b>送信して下さい。
              <br />
              2）添付資料2が
              <b>ある</b>場合は、
              <b>
                内容確認（プレビュー）後、戻るボタンで
                <br />
                戻り、添付2で資料を選択後、Upload File を押して下さい。
              </b>
              <br />
              その後、再度、内容確認（プレビュー）後、送信して下さい。
            </Typography>
          </Grid>
          <Grid xs={3} className="action-row">
            <Typography className="text-center">
              （注）添付書類２
              <br />
              　 審査の際は白黒印刷書類を使用
              <br />
              　 します。添付書類も白黒印刷で
              <br />　 判読できるようにして下さい。
            </Typography>
          </Grid>
          <Grid container xs={3} className="action-row">
            <div>
              {form3?.form3?.files[0] && (
                <Typography> {form3?.form3?.files[0]?.name}</Typography>
              )}
              {form3?.form3?.files && (
                <Typography>{form3?.form3?.files?.name}</Typography>
              )}
            </div>
            {file1Visible ? (
              <button
                type="button"
                className="upload-button"
                onClick={handleFile1Click}
              >
                添付書類２{" "}
              </button>
            ) : (
              <Box>
                <input
                  type="file"
                  {...register("files")}
                  onChange={(e) => {
                    const file = e.target.files![0];

                    setSelectedFile(file);
                  }}
                />
                <br />

                <input
                  onClick={fileUpload}
                  className="top-right"
                  type="button"
                  value="Upload File"
                  name="btnSubmit2"
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </form>
    </Grid>
  </Grid>
  )
}

export default Form3Ui