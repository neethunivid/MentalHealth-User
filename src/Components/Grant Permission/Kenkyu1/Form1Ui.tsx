import React, { useState, useEffect } from "react";
import Form1Header from './Form1Header'
import { Container, Grid, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form1FieldsComp from './Form1FieldsComp'
import apiClient from '../../../API/API-client'
import { useForm, Controller } from "react-hook-form";
import { setFormData } from "../../../Redux/actions";
import '../grant_style.scss'
const Form1Ui = () => {
    const [filename, setfilename] = useState<any>();
    const navigate = useNavigate();
    const [file1Visible, setFile1Visible] = useState(true);
    const {
      register,
      handleSubmit,
      control,
      setValue,
      formState: { errors },
    } = useForm();
  
    const dispatch = useDispatch();
  
    const onSubmit = async (data: any) => {
      try {
        const {
          email1,
          email2,
          file,
          affliation_name3,
          family_name2,
          job_title,
          country4,
          home4,
          prefectures4,
          address4,
          phone3,
          building_name3,
        } = data;
        if (!email1 && !email2) {
          alert("メールアドレスを入力してください。");
          return;
        }
        if (email1 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email1)) {
          alert("正しいメールアドレスを記入してください。");
          return;
        }
        if (email2 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email2)) {
          alert("正しいメールアドレスを記入してください。");
          return;
        }
        if (
          !affliation_name3 ||
          !job_title ||
          !family_name2 ||
          !country4 ||
          !home4 ||
          !prefectures4 ||
          !address4 ||
          !phone3 ||
          !building_name3
        ) {
          alert("推薦者欄が未入力です。推薦状も必須です");
          return;
        }
  
        if (!file && !form1?.form1?.file[0] && !form1?.form1?.file) {
          alert(
            "添付書類（推薦状：必須書類）がありません／添付しないで送信できません。"
          );
          return;
        }
        if (prefectures4 === "都道府県") {
          alert("都道府県を選択してください");
          return;
        }
  
        if (file) {
          await fileUpload(file);
        }
  
        dispatch(setFormData("form1", data));
  
        navigate("/kenkyu2");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };
    const form1: any = useSelector((state: any) => state.formData);
  
  
    useEffect(() => {
      if (!form1) {
        navigate("kenkyu1");
      }
      if (form1?.form1?.file) {
        let file = form1.form1.file[0];
        if (!file) {
          file = form1.form1.file;
        }
        setfilename(file);
        setValue("file", file);
   
      }
    }, []);
  
    const handleFile1Click = () => {
      setFile1Visible(false);
    };
  
    const fileUpload = async (file: FileList) => {
     
      if (!file || file.length === 0) {

        return;
      }
  
      try {
        const DataRequest = {
          file: file[0],
          fileName: file[0].name,
        };
  
        const apiData = await apiClient.post("api/file/upload", DataRequest, {});
  

  
        if (apiData) {

          const fileid = apiData.data.data.id;
          var result: any = file[0];
          result["id"] = fileid;

          // dispatch(setFormData("form1", result));
  
     
        } else {

          alert("errorrrrrr here");
          return;
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };
  return (
    <Grid  className="font-fam">
    <Grid xs={12} className="cover">
    <form id="form1" onSubmit={handleSubmit(onSubmit)}>
              <Form1Header />
              {/* top header ends here */}
              <Grid className="hr"></Grid>
              {/* 1st full column */}
              <Form1FieldsComp
                gridBg="bg-yellow"
                firstrowHeading="1. 所属機関の所在地"
                secondrowHeading="国"
                thirdRowHeading="Japan"
                control={control}
                defaultValue={form1?.form1?.line_39}
                name="line_39"
              />
              <Form1FieldsComp
                firstrowHeading=""
                secondrowHeading={"〒 (所在地)"}
                thirdRowHeading={"530-0057"}
                gridBg={"bg-yellow"}
                control={control}
                defaultValue={form1?.form1?.location}
                name={"location"}
              />
              <Form1FieldsComp
                secondrowHeading={"都道府県"}
                thirdRowHeading={"大阪府"}
                gridBg={"bg-yellow"}
                control={control}
                defaultValue={form1?.form1?.prefectures}
                name={"prefectures"}
                inputTypeText={true}
              />
              <Form1FieldsComp
                secondrowHeading={"市区郡町村"}
                thirdRowHeading={"大阪市北区曽根崎"}
                gridBg={"bg-yellow"}
                control={control}
                defaultValue={form1?.form1?.city}
                name={"city"}
              />
    
              <Form1FieldsComp
                secondrowHeading={"番地"}
                thirdRowHeading={"2丁目5-10"}
                gridBg={"bg-yellow"}
                control={control}
                defaultValue={form1?.form1?.address}
                name={"address"}
              />
              <Form1FieldsComp
                secondrowHeading={"ビル・マンション名"}
                thirdRowHeading={"梅田ビル701号"}
                gridBg={"bg-yellow"}
                control={control}
                defaultValue={form1?.form1?.building_no}
                name={"building_no"}
              />
              <Grid className="hr"></Grid>
              <Form1FieldsComp
                firstrowHeading={"2. 所属機関名・部局・職名"}
                secondrowHeading={" 所属機関名"}
                thirdRowHeading={"メンタルヘルス記念病院"}
                gridBg={"bg-yellow"}
                control={control}
                defaultValue={form1?.form1?.affliation_name}
                name="affliation_name"
              />
              <Form1FieldsComp
                secondrowHeading={"部署・職名"}
                thirdRowHeading={"精神科部長"}
                gridBg={"bg-yellow"}
                control={control}
                defaultValue={form1?.form1?.affliation_name2}
                name="affliation_name2"
              />
              <Grid className="hr"></Grid>
              <Form1FieldsComp
                firstrowHeading={"3.A 個人研究代表者"}
                secondrowHeading={"氏名"}
                thirdRowHeading={"鈴木三郎"}
                gridBg={"bg-yellow"}
                control={control}
                defaultValue={form1?.form1?.family_name}
                name="family_name"
              />
              <Form1FieldsComp
                firstrowHeading={" 団体活動の場合には 下記(3.B)に記入"}
                secondrowHeading={"ふりがな"}
                thirdRowHeading={"すずきさぶろう"}
                textClass={"text-bold"}
                gridBg={"txt-red"}
                control={control}
                defaultValue={form1?.form1?.Furigana}
                name="Furigana"
              />
              <Form1FieldsComp
                secondrowHeading={"生年月日（西暦）"}
                thirdRowHeading={" 1234.05.06（カンマで区切る）"}
                control={control}
                defaultValue={form1?.form1?.dob}
                name="dob"
              />
    
              <Form1FieldsComp
                secondrowHeading={"年齢"}
                thirdRowHeading={"62歳"}
                control={control}
                defaultValue={form1?.form1?.age0}
                name="age0"
              />
              <Form1FieldsComp
                secondrowHeading={"国"}
                thirdRowHeading={"Japan"}
                control={control}
                defaultValue={form1?.form1?.country}
                name="country"
              />
              <Form1FieldsComp
                secondrowHeading={" 〒（自宅）"}
                thirdRowHeading={"123-456"}
                control={control}
                defaultValue={form1?.form1?.home}
                name="home"
              />
              <Form1FieldsComp
                secondrowHeading={"都道府県"}
                thirdRowHeading={"東京都"}
                control={control}
                defaultValue={form1?.form1?.prefectures2}
                name="prefectures2"
                inputTypeText={true}
              />
    
              <Form1FieldsComp
                secondrowHeading={"市区郡町村"}
                thirdRowHeading={"渋谷区新町"}
                control={control}
                defaultValue={form1?.form1?.city1}
                name="city1"
              />
              <Form1FieldsComp
                secondrowHeading={"番地"}
                thirdRowHeading={"1丁目2-3"}
                control={control}
                defaultValue={form1?.form1?.address1}
                name="address1"
              />
              <Form1FieldsComp
                secondrowHeading={"ビル・マンション名"}
                thirdRowHeading={"東京ビル0001号"}
                control={control}
                defaultValue={form1?.form1?.building_name1}
                name="building_name1"
              />
              <Form1FieldsComp
                secondrowHeading={"電話（固定or 携帯)"}
                thirdRowHeading={" 123-456-7890"}
                control={control}
                defaultValue={form1?.form1?.phone1}
                name="phone1"
              />
              <Form1FieldsComp
                secondrowHeading={"Email"}
                thirdRowHeading={"abcd@efg.com"}
                control={control}
                defaultValue={form1?.form1?.email1}
                name="email1"
              />
              <Grid className="hr"></Grid>
              {/* 4th row compoents starts here */}
              <Form1FieldsComp
                firstrowHeading={"3.B 団体活動"}
                secondrowHeading={"名称・代表者職名・氏名"}
                thirdRowHeading={"メンタルヘルス岡本記念財団"}
                control={control}
                defaultValue={form1?.form1?.representive_title_name}
                name="representive_title_name"
              />
              <Form1FieldsComp
                firstrowHeading={" 研究の場合には、上記（3.A）に記入"}
                textClass={"text-bold"}
                gridBg={"txt-red"}
                secondrowHeading={"国"}
                thirdRowHeading={"Japan"}
                control={control}
                defaultValue={form1?.form1?.country3}
                name="country3"
              />
              <Form1FieldsComp
                secondrowHeading={"〒（所在地）"}
                thirdRowHeading={"123-456"}
                control={control}
                defaultValue={form1?.form1?.home3}
                name="home3"
              />
              <Form1FieldsComp
                secondrowHeading="都道府県"
                thirdRowHeading="東京都"
                control={control}
                defaultValue={form1?.form1?.prefectures3}
                name="prefectures3"
                inputTypeText={true}
              />
              <Form1FieldsComp
                secondrowHeading="市区郡町村"
                thirdRowHeading="渋谷区新町"
                control={control}
                defaultValue={form1?.form1?.city2}
                name="city2"
              />
              <Form1FieldsComp
                secondrowHeading="番地"
                thirdRowHeading="1丁目2-3"
                control={control}
                defaultValue={form1?.form1?.address2}
                name="address2"
              />
    
              <Form1FieldsComp
                secondrowHeading="ビル・マンション名"
                thirdRowHeading="東京ビル0001号"
                control={control}
                defaultValue={form1?.form1?.building_name2}
                name="building_name2"
              />
    
              <Form1FieldsComp
                secondrowHeading="電話（固定or 携帯)"
                thirdRowHeading="123-456-7890"
                control={control}
                defaultValue={form1?.form1?.phone2}
                name="phone2"
              />
              <Form1FieldsComp
                secondrowHeading="Email"
                thirdRowHeading="abcd@efg.com"
                control={control}
                defaultValue={form1?.form1?.email2}
                name="email2"
              />
    
              <Form1FieldsComp
                secondrowHeading="担当者名"
                thirdRowHeading="鈴木四郎"
                control={control}
                defaultValue={form1?.form1?.person_in_charge}
                name="person_in_charge"
              />
              <Grid className="hr"></Grid>
    
              <Form1FieldsComp
                spanP1={true}
                spanP2={true}
                firstrowHeading="    4.推薦者（必須項目）"
                secondrowHeading="所属機関名"
                thirdRowHeading="メンタルヘルス記念病院"
                control={control}
                defaultValue={form1?.form1?.affliation_name3}
                name="affliation_name3"
              />
                <Form1FieldsComp
                spanP2={true}
                secondrowHeading="氏名"
                thirdRowHeading="鈴木花子"
                control={control}
                defaultValue={form1?.form1?.job_title}
                name="job_title"
              />
              <Form1FieldsComp
                spanP2={true}
                secondrowHeading="職名"
                thirdRowHeading="看護師"
                control={control}
                defaultValue={form1?.form1?.family_name2}
                name="family_name2"
              />
          
              <Form1FieldsComp
                spanP2={true}
                secondrowHeading="国"
                thirdRowHeading="Japan"
                control={control}
                defaultValue={form1?.form1?.country4}
                name="country4"
              />
              <Form1FieldsComp
                spanP2={true}
                secondrowHeading="   〒（所在地）"
                thirdRowHeading=" 123-456"
                control={control}
                defaultValue={form1?.form1?.home4}
                name="home4"
              />
              <Form1FieldsComp
                spanP2={true}
                secondrowHeading="   都道府県"
                thirdRowHeading="   都道府県"
                control={control}
                defaultValue={form1?.form1?.prefectures4}
                name="prefectures4"
                inputTypeText={true}
              />
              <Form1FieldsComp
                spanP2={true}
                secondrowHeading="市区郡町村"
                thirdRowHeading="渋谷区新町"
                control={control}
                defaultValue={form1?.form1?.city4}
                name="city4"
              />
              <Form1FieldsComp
                spanP2={true}
                secondrowHeading=" 番地"
                thirdRowHeading="1丁目2-3"
                control={control}
                defaultValue={form1?.form1?.address4}
                name="address4"
              />
              <Form1FieldsComp
                spanP2={true}
                secondrowHeading="ビル・マンション名"
                thirdRowHeading="東京ビル0001号"
                control={control}
                defaultValue={form1?.form1?.building_name3}
                name="building_name3"
              />
              <Form1FieldsComp
                spanP2={true}
                secondrowHeading="   電話（固定or 携帯)"
                thirdRowHeading="123-456-7890"
                control={control}
                defaultValue={form1?.form1?.phone3}
                name="phone3"
              />
    
              <Grid className="content-row">
                <Grid className="bg-yellow" item xs={3}></Grid>
                <Grid className="bg-yellow" item xs={2}>
                  <Typography>
                    推薦者の証明書（必須書類）{" "}
                    <span className="span-star"> * </span>
                  </Typography>
                </Grid>
                <Grid className="txt-box-holder" item xs={2}>
                  <div>
                    <div>
                      {form1?.form1?.file[0] && (
                        <Typography>{form1?.form1?.file[0]?.name}</Typography>
                      )}
                      {form1?.form1?.file && (
                        <Typography>{form1?.form1?.file?.name}</Typography>
                      )}
                    </div>
                  </div>
    
                  {file1Visible ? (
                    <button
                      type="button"
                      className="upload-button"
                      onClick={handleFile1Click}
                    >
                      <Typography> 添付書類 1</Typography>
                    </button>
                  ) : (
                    <>
                      <input id="files" type="file" {...register("file")} />
                    </>
                  )}
                </Grid>
                <Grid className="bg-right" item xs={5}>
                  <Typography>
                    （注）指定の推薦用紙に記入しスキャンデータ又は写真データを添付する
                  </Typography>
                </Grid>
              </Grid>
              <Grid className="hr"></Grid>
              <Grid className="content-row">
                <Grid className="bg-yellow" item xs={5}>
                  <Typography>
                    5.研究のときは研究代表者略歴を、団体活動のときは
                    活動歴を書いてください。（800文字以内）
                  </Typography>
                </Grid>
                <Grid className="txt-box-holder" item xs={7}>
                  <Controller
                    control={control}
                    defaultValue={form1?.form1?.statement_text}
                    name="statement_text"
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={10}
                        cols={40}
                        className="txtarea-box "
                        {...register("statement_text", {
                          maxLength: 400,
                        })}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid className="hr"></Grid>
              <Grid className="action-row">
                <button type="submit" name="next">
                  様式1-2へ　⏩
                </button>
              </Grid>
              <Grid className="hr"></Grid>
            </form> 
    </Grid>
    </Grid>
  )
}

export default Form1Ui