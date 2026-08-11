import { useState, useEffect, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../API/API-client";
import PrevForm1 from "./PrevForm1";
import PreviewForm2 from "./PreviewForm2";
import PrevForm3 from "./PrevForm3";

const PreviewPageUi = () => {
    const [filename, setfilename] = useState<any>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const form1: any = useSelector((state: any) => state.formData);
    const form2: any = useSelector((state: any) => state.formData);
    const form3: any = useSelector((state: any) => state.formData);
  
    useEffect(() => {
      if (form1?.form1==null) {
        navigate("/kenkyu1");
      }
      window.scrollTo(0, 0);
      //set file name of form3 here
      if (form3?.form3?.files) {
        let file = form3.form3.files[0];
        if (!file) {
          file = form3.form3.files;
        }
        setfilename(file.name);
  
        console.log(file, "file is here");
      }
  
  
    }, []);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 since month is zero-based
    const currentDay = currentDate.getDate();
  
    function getFiled(form3: any) {
      //getting form3 file id here from redux state
      let fileid: any = "";
      try {
        // fileid = form3.form3.files[0].id|| form3.form3.files?.id;
        if (form3.form3.files && form3.form3.files[0]) {
          fileid = form3.form3.files[0].id;
        } else if (form3.form3.files) {
          fileid = form3.form3.files.id;
        }
      } catch (e) {}
  
      return fileid;
    }
    function getFiled1(form1: any) {
      //getting form1 file id here from redux state
      let fileid1: any = "";
      try {
        if (form1.form1.file && form1.form1.file[0]) {
          fileid1 = form1.form1.file[0].id;
        } else if (form1.form1.file) {
          fileid1 = form1.form1.file.id;
        }
      } catch (e) {}
  
      return fileid1;
    }
    const handleSubmit = useCallback(async (event: any) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
      
  
        event.preventDefault();
        try {
          const DataRequest: any = {
            grandRequest: {
              location1: form1.form1.location ?? "",
              prefectures1: form1.form1.prefectures ?? "",
              municipality1: form1.form1.city ?? "",
              building1: form1.form1.building_no ?? "",
              institution: form1.form1.affliation_name ?? "",
              dept: form1.form1.affliation_name2 ?? "",
              fullname: form1.form1.family_name ?? "",
              furigana: form1.form1.Furigana ?? "",
              dob: form1.form1.dob ?? "",
              age: form1.form1.age0 ?? "",
              home: form1.form1.home ?? "",
              prefectures2: form1.form1.prefectures2 ?? "",
              municipality2: form1.form1.city1 ?? "",
              address1: form1.form1.address ?? "",
              address2: form1.form1.address1 ?? "",
              building2: form1.form1.building_name1 ?? "",
              phone: form1.form1.phone1 ?? "",
              email2: form1.form1.email1 ?? "",
              representative: form1.form1.representive_title_name ?? "",
              repLocation: form1.form1.home3 ?? "",
              repPrefectures: form1.form1.prefectures3 ?? "",
              repMunicipality: form1.form1.city2 ?? "",
              repAddress: form1.form1.address2 ?? "",
              repBuilding: form1.form1.building_name2 ?? "",
              repPhone: form1.form1.phone2 ?? "",
              repEmail: form1.form1.email2 ?? "",
              inCharge: form1.form1.person_in_charge ?? "",
              recomdPernInst: form1.form1.affliation_name3 ?? "",
              recomdPernJob: form1.form1.job_title ?? "",
              recomdPernFullname: form1.form1.family_name2 ?? "",
              recomdPernLocation: form1.form1.home4 ?? "",
              recomdPernPrefectures4: form1.form1.prefectures4 ?? "",
              recomdPernMunicipality: form1.form1.city4 ?? "",
              recomdPernAddress: form1.form1.address4 ?? "",
              recomdPernBuilding: form1.form1.building_name3 ?? "",
              recomdPernPhone: form1.form1.phone3 ?? "",
              file1: getFiled1(form1) ?? "",
  
              biography: form1.form1.statement_text ?? "",
              classification: form2.form2.grant ?? "",
              newCont: form2.form2.grant1??"",
              researchName: form2.form2.activity ?? "",
              expEquipmentCosts: form2.form2.tb_1 ?? "",
              expConsumablesCosts: form2.form2.tb_2 ?? "",
              expTravelExpenses: form2.form2.tb_3 ?? "",
              expRewardMoney: form2.form2.tb_4 ?? "",
              expOther: form2.form2.tb_5 ?? "",
              expTotal: form2.form2.sum ?? "",
              subEquipmentCosts: form2.form2.tb_7 ?? "",
              subConsumablesCosts: form2.form2.tb_8 ?? "",
              subTravelExpenses: form2.form2.tb_9 ?? "",
              subRewardMoney: form2.form2.tb_10 ?? "",
              subOther: form2.form2.tb_11 ?? "",
              subTotal: form2.form2.sum1 ?? "",
              dateCreated: [currentYear, currentMonth, currentDay] ?? "",
              country1: form1.form1.line_39 ?? "",
              country2: form1.form1.country ?? "",
              country3: form1.form1.country3 ?? "",
              country4: form1.form1.country4,
              file2: getFiled(form3) ?? "",
            },
  
            grantRequest2: {
              details: form2?.form2.grantamount,
              purpose: form2.form2.purpose ?? "",
              target: form2.form2.target ?? "",
              contents: form2.form2.method ?? "",
              expectedResults: form2.form2.outcome ?? "",
              approval: form2.form2.review,
              researchSubjects: form2.form2.survey??"",
              keywords: form2.form2.keyword ?? "",
              originality: form3.form3.originality ?? "",
              achievements: form3.form3.presentation ?? "",
              orgPrincipal: form3.form3.representative??"",
              affiliation: form3.form3.department ?? "",
              //   affiliation: "",
              age0: form3.form3.age ?? "",
              role0: form3.form3.division ?? "",
              coordinator1: form3.form3.investor1 ?? "",
              affiliation1: form3.form3.deparment1 ?? "",
              age1: form3.form3.age1 ?? "",
              role1: form3.form3.role1 ?? "",
              coordinator2: form3.form3.investor2 ?? "",
              affiliation2: form3.form3.deparment2 ?? "",
              age2: form3.form3.age2 ?? "",
              role2: form3.form3.role2 ?? "",
              coordinator3: form3.form3.investor3 ?? "",
              affiliation3: form3.form3.deparment3 ?? "",
              // age3: form3.form3.age3,
              age3: form3.form3.age3??"",
              role3: form3.form3.role3 ?? "",
              coordinator4: form3.form3.investor4 ?? "",
              affiliation4: form3.form3.deparment4 ?? "",
              age4: form3.form3.age4 ?? "",
              role4: form3.form3.role4 ?? "",
              coordinator5: form3.form3.investor5 ?? "",
              affiliation5: form3.form3.deparment5 ?? "",
              age5: form3.form3.age5 ?? "",
              role5: form3.form3.role5 ?? "",
              researchContents: form3.form3.previousgrant ?? "",
            },
          };
          console.log(DataRequest, "here is datarequest");
  
          const apiData = await apiClient.post(
            "api/grant-requests/create",
            DataRequest,
            {}
          );
          console.log(apiData, "api response is here");
          if (apiData) {
            if (apiData) {
              // navigate("/kenkyuThanks");
              window.location.replace("/kenkyuThanks");
              // navigate('/grantedit');
            }
          }
        } catch (error) {
          // navigate("/login");
          console.error("Error oooocreating data:", error);
        }
      }
    }, []);
  
  return (
    <div>
    {/* <Form1Header /> */}
    <PrevForm1 />
    <Grid className="content-row">
      <Grid className="bg-yellow" item xs={3}></Grid>
      <Grid className="bg-yellow" item xs={2}>
        <Typography> 推薦者の証明書（必須書類）</Typography>
      </Grid>
      <Grid className="txt-box-holder" item xs={3}>
        <div>
          {form1?.form1?.file[0] && (
            <Typography>{form1?.form1?.file[0]?.name}</Typography>
          )}
          {form1?.form1?.file && (
            <Typography>{form1?.form1?.file?.name}</Typography>
          )}
        </div>
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
          活動歴を書いてください。
        </Typography>
      </Grid>
      <Grid className="txt-box-holder" item xs={8}>
        <textarea
          defaultValue={form1?.form1?.statement_text}
          className="txtarea-box"
          maxLength={800}
        />
      </Grid>
    </Grid>
    <br></br>

    <Grid className="hr"></Grid>
    {/* <Grid className="hr"></Grid> */}
    <PreviewForm2 />
    <Grid xs={12}>
      <form id="form">
        <Grid className="hr"></Grid>
        <Grid className="header-row">
          <Grid item xs={5}>
            <Typography className="text-bold">■様式1-3 （Form 3)</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className="text-bold">
              記入項目 (Item Questions)
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className="text-bold">
              {" "}
              記入欄 (Fill in Answers)
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className="text-bold"> 記入例 (Example)</Typography>
          </Grid>
        </Grid>

        <Grid className="hr"></Grid>
        <Grid className="content-row">
          <Grid xs={4} className="bg-yellow">
            <Typography>
              12-3. 本研究の独創性（具体的に）（800文字以内）
            </Typography>
          </Grid>
          <Grid xs={5} className="txt-box-holder">
            <textarea
              defaultValue={form3?.form3?.originality}
              className="txtarea-box"
              maxLength={800}
            />
          </Grid>
          <Grid xs={3} className="bg-right"></Grid>
        </Grid>
        <Grid className="hr"></Grid>
        <Grid className="content-row">
          <Grid xs={9} className="bg-yellow">
            <Typography>
              12-４. 関連領域における研究発表、実績
              （投稿論文や学会発表論文など）（1000文字以内）
            </Typography>
          </Grid>
          <Grid xs={3} className="bg-right"></Grid>
        </Grid>
        <Grid className="content-row">
          <Grid xs={4} className="bg-yellow"></Grid>
          <Grid xs={5} className="txt-box-holder">
            <textarea
              value={form3?.form3?.presentation}
              className="txtarea-box"
              maxLength={1000}
            />
          </Grid>
          <Grid xs={3} className="bg-right"></Grid>
        </Grid>

        <PrevForm3 />
        <Grid className="hr"></Grid>

        <Grid className="content-row">
          <Grid xs={9} className="bg-yellow">
            <Typography>
              14. 過年度助成の研究内容と実績の要約を箇条書きで記述してください
            </Typography>
          </Grid>

          <Grid className="bg-right"></Grid>
          <Grid xs={3} className="bg-right"></Grid>
        </Grid>
        <Grid className="content-row">
          <Grid xs={4} className="bg-yellow">
            <Typography>
              （研究助成申請者のみ記入して下さい）（800文字以内）{" "}
            </Typography>
          </Grid>
          <Grid xs={5} className="txt-box-holder">
            <textarea
              value={form3?.form3?.previousgrant}
              className="txtarea-box"
              maxLength={800}
            />
          </Grid>

          <Grid xs={3} className="bg-right"></Grid>
        </Grid>
        <Grid xs={9} className="txt-red">
          <div>
            {/* {form3?.form3?.files[0] && (
              <Typography style={{ fontWeight: "bold" }}>
                {" "}
                添付2資料がある場合は、戻るボタンで、戻り、資料を添付（添付2）して
                Upload
                Fileを押して、再度、内容確認（プレビュー）後、送信して下さい。
                {form3?.form3?.files[0]?.name}
              </Typography>
            )} */}
            {form3?.form3?.files && (
              <Typography style={{ fontWeight: "bold" }}>
                添付2資料がある場合は、戻るボタンで、戻り、資料を添付（添付2）して
                Upload
                Fileを押して、再度、内容確認（プレビュー）後、送信して下さい。
                {filename}
              </Typography>
            )}
            {!form3?.form3?.files && (
              <Typography style={{ fontWeight: "bold" }}>
                添付2資料がある場合は、戻るボタンで、戻り、資料を添付（添付2）して
                Upload
                Fileを押して、再度、内容確認（プレビュー）後、送信して下さい。
              </Typography>
            )}
          </div>
          {/* <div>
              {form3?.form3?.files[0] && (
                <Typography> hello{form3?.form3?.files[0]?.name}</Typography>
              )}
              {form3?.form3?.files && (
                <Typography>{form3?.form3?.files?.name}</Typography>
              )}
            </div> */}
          {/* {form3?.form3?.files && (
            <Typography style={{ fontWeight: "bold" }}>
              添付2資料がある場合は、戻るボタンで、戻り、資料を添付（添付2）して
              Upload
              Fileを押して、再度、内容確認（プレビュー）後、送信して下さい。
              {form3?.form3?.files[0].name}
            </Typography>
          )}  */}
        </Grid>
        <Grid className="hr"></Grid>
        <Grid xs={12} className="content-row">
          <Grid className="action-row" xs={6}>
            <button type="button" onClick={() => navigate("/kenkyu3")}>
              ⏪　戻る
            </button>
          </Grid>
          <Grid className="action-row" xs={6}>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              送信へ⏩
            </button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  </div>
  )
}

export default PreviewPageUi