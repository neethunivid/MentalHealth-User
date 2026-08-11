import React from 'react'
import { useSelector, useDispatch } from "react-redux";

import { Grid, Typography } from "@mui/material";
import Form1Field_prev from './Form1Field_prev';
const PrevForm1 = () => {
    const form1: any = useSelector((state: any) => state.formData);
  return (
    <Grid className="cover">
    <Grid className="header">
      <Typography className="text-bold">
        研究活動助成の申請フォーム
      </Typography>
      <Grid className="hr" />
    </Grid>
    <Grid className="header-row">
      <Grid item xs={3}>
        <Typography className="text-bold">■様式1-1 (Form 1)</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography className="text-bold">
          記入項目 (Item Questions)
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography className="text-bold">
          記入欄 (Fill in Answers)
        </Typography>
      </Grid>
      <Grid xs={5}>
        <Typography className="text-bold">記入例 (Example)</Typography>
      </Grid>
    </Grid>
    <Grid className="hr"></Grid>
    <Form1Field_prev
      firstrowHeading="1. 所属機関の所在地"
      secondrowHeading="国"
      thirdRowHeading="Japan"
      defaultValue={form1?.form1?.line_39}
    />
    <Form1Field_prev
      secondrowHeading="〒 (所在地)"
      thirdRowHeading="530-0057"
      defaultValue={form1?.form1?.location}
    />
    <Form1Field_prev
      secondrowHeading="都道府県"
      thirdRowHeading="大阪府"
      defaultValue={form1?.form1?.prefectures}
    />
    <Form1Field_prev
      secondrowHeading="市区郡町村"
      thirdRowHeading="大阪市北区曽根崎"
      defaultValue={form1?.form1?.city}
    />
    <Form1Field_prev
      secondrowHeading="番地"
      thirdRowHeading="2丁目5-10"
      defaultValue={form1?.form1?.address}
    />
    <Form1Field_prev
      secondrowHeading="ビル・マンション名"
      thirdRowHeading="梅田ビル701号"
      defaultValue={form1?.form1?.building_no}
    />

    {/* 1st row section ends here
     */}

    <Grid className="hr"></Grid>
    {/* 2nd row section starts here */}
    <Form1Field_prev
      firstrowHeading="2. 所属機関名・部局・職名"
      secondrowHeading="所属機関名"
      thirdRowHeading="メンタルヘルス記念病院"
      defaultValue={form1?.form1?.affliation_name}
    />

    <Form1Field_prev
      secondrowHeading=" 部署・職名"
      thirdRowHeading="精神科部長"
      defaultValue={form1?.form1?.affliation_name2}
    />
    {/* 2nd row section ends here */}
    <Grid className="hr"></Grid>
    {/* 3rd row section starts here */}
    <Form1Field_prev
      firstrowHeading=" 3.A 個人研究代表者"
      secondrowHeading="氏名"
      thirdRowHeading="鈴木三郎"
      defaultValue={form1?.form1?.family_name}
    />
    <Form1Field_prev
      firstrowHeading="団体活動の場合には 下記(3.B)に記入"
      secondrowHeading="ふりがな"
      thirdRowHeading="すずきさぶろう"
      defaultValue={form1?.form1?.Furigana}
    />
    <Form1Field_prev
      secondrowHeading=" 生年月日（西暦）"
      thirdRowHeading="1234.05.06（カンマで区切る）"
      defaultValue={form1?.form1?.dob}
    />
    <Form1Field_prev
      secondrowHeading="年齢"
      thirdRowHeading="62歳"
      defaultValue={form1?.form1?.age0}
    />
    <Form1Field_prev
      secondrowHeading="国"
      thirdRowHeading="Japan"
      defaultValue={form1?.form1?.country}
    />

    <Form1Field_prev
      secondrowHeading="〒（所在地）"
      thirdRowHeading="123-456"
      defaultValue={form1?.form1?.home}
    />

    <Form1Field_prev
      secondrowHeading="都道府県"
      thirdRowHeading="東京都"
      defaultValue={form1?.form1?.prefectures2}
    />

    <Form1Field_prev
      secondrowHeading="市区郡町村"
      thirdRowHeading="渋谷区新町"
      defaultValue={form1?.form1?.city1}
    />
    <Form1Field_prev
      secondrowHeading="番地"
      thirdRowHeading=" 1丁目2-3"
      defaultValue={form1?.form1?.address1}
    />
    <Form1Field_prev
      secondrowHeading="ビル・マンション名"
      thirdRowHeading="東京ビル0001号"
      defaultValue={form1?.form1?.building_name1}
    />

    <Form1Field_prev
      secondrowHeading="電話（固定or 携帯)"
      thirdRowHeading="123-456-7890"
      defaultValue={form1?.form1?.phone1}
    />
    <Form1Field_prev
      secondrowHeading="Email"
      thirdRowHeading="abcd@efg.com"
      defaultValue={form1?.form1?.email1}
    />
    <Grid className="hr"></Grid>
    <Form1Field_prev
      firstrowHeading={"3.B 団体活動"}
      secondrowHeading={"名称・代表者職名・氏名"}
      thirdRowHeading={"メンタルヘルス岡本記念財団"}
      defaultValue={form1?.form1?.representive_title_name}
    />
    <Form1Field_prev
      firstrowHeading={" 研究の場合には、上記（3.A）に記入"}
      textClass={"text-bold"}
      gridBg={"txt-red"}
      secondrowHeading={"国"}
      thirdRowHeading={"Japan"}
      defaultValue={form1?.form1?.country3}
    />
    <Form1Field_prev
      secondrowHeading={"〒（所在地）"}
      thirdRowHeading={"123-456"}
      defaultValue={form1?.form1?.home3}
    />
    <Form1Field_prev
      secondrowHeading="都道府県"
      thirdRowHeading="東京都"
      defaultValue={form1?.form1?.prefectures3}
    />
    <Form1Field_prev
      secondrowHeading="市区郡町村"
      thirdRowHeading="渋谷区新町"
      defaultValue={form1?.form1?.city2}
    />
    <Form1Field_prev
      secondrowHeading="番地"
      thirdRowHeading="1丁目2-3"
      defaultValue={form1.form1.address2}
    />
    <Form1Field_prev
      secondrowHeading="ビル・マンション名"
      thirdRowHeading="東京ビル0001号"
      defaultValue={form1?.form1?.building_name2}
    />
    <Form1Field_prev
      secondrowHeading="電話（固定or 携帯)"
      thirdRowHeading="123-456-7890"
      defaultValue={form1?.form1?.phone2}
    />
    <Form1Field_prev
      secondrowHeading="Email"
      thirdRowHeading="abcd@efg.com"
      defaultValue={form1?.form1?.email2}
    />
    <Form1Field_prev
      secondrowHeading="担当者名"
      thirdRowHeading="鈴木四郎"
      defaultValue={form1?.form1?.person_in_charge}
    />
    <Grid className="hr"></Grid>
    <Form1Field_prev
      firstrowHeading="   4.推薦者（※必須項目）"
      secondrowHeading="所属機関名"
      thirdRowHeading="メンタルヘルス記念病院"
      defaultValue={form1?.form1?.affliation_name3}
    />
     <Form1Field_prev
      secondrowHeading="氏名"
      thirdRowHeading="鈴木花子"
      defaultValue={form1?.form1?.job_title}
    />
    <Form1Field_prev
      secondrowHeading="職名"
      thirdRowHeading="看護師"
      defaultValue={form1?.form1?.family_name2}
    />
   
    <Form1Field_prev
      secondrowHeading="国"
      thirdRowHeading="Japan"
      defaultValue={form1?.form1?.country4}
    />
    <Form1Field_prev
      secondrowHeading="   〒（所在地）"
      thirdRowHeading=" 123-456"
      defaultValue={form1?.form1?.home4}
    />
    <Form1Field_prev
      secondrowHeading="   都道府県"
      thirdRowHeading="   都道府県"
      defaultValue={form1?.form1?.prefectures4}
    />
    <Form1Field_prev
      secondrowHeading="市区郡町村"
      thirdRowHeading="渋谷区新町"
      defaultValue={form1?.form1?.city4}
    />
    <Form1Field_prev
      secondrowHeading=" 番地"
      thirdRowHeading="1丁目2-3"
      defaultValue={form1?.form1?.address4}
    />
    <Form1Field_prev
      secondrowHeading="ビル・マンション名"
      thirdRowHeading="東京ビル0001号"
      defaultValue={form1?.form1?.building_name3}
    />
    <Form1Field_prev
      secondrowHeading="   電話（固定or 携帯)"
      thirdRowHeading="123-456-7890"
      defaultValue={form1?.form1?.phone3}
    />
  </Grid>
  )
}

export default PrevForm1