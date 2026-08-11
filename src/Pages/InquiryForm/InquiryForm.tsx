import { Button, Grid } from "@mui/material";
import { Typography } from "@material-ui/core";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import apiClient from "../../API/API-client";
import FormInputTextField from "../../Components/Common/FormInputTextField";
import FormInputPreview from "../../Components/Common/FormInputPreview";
import Heading from "../../Components/Common/Heading";
import Breadcrumb from "../../Components/Common/BreadCrumb";

/**
 * Component is used for Inquiry
 */

const InquiryForm = () => {
  const [inquiryData, setInquiryData] = useState<any>()
  const [FilledForm, setFilledForm] = useState(false)
  const [SendDataFlag, setSendDataFlag] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const breadcrumbItems = [
    { title: 'HOME', href: '/home.html' },
    { title: 'お問い合わせ' }
  ];

  /**
   * Method  is used to save the data and preview the details entered in the form
   * @param data 
   */

  const onSubmit = async (data: any) => {
    if (data.name === undefined) {
      alert("名前を入力してください。")
    }
    else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.emailaddress))) {
      alert("正しいメールアドレスを入力してください。")
    }
    else if (data.message === undefined) {
      alert("内容を入力してください。")
    }
    else {
      setInquiryData(data)
      setFilledForm(true)
    }
  }

  /**
   * Method is used to edit the data after preview the details entered in the form
   */

  const handleEditData = async () => {
    setFilledForm(false)
  }

  /**
   * Method used to submit the form after verifying details through preview section are correct
   * This will also sent data to database
   */

  const handleSendData = async () => {
    if (inquiryData) {
      try {
        const DataRequest = {
          "name": inquiryData.name,
          "profession": inquiryData.occupation,
          "email": inquiryData.emailaddress,
          "age": inquiryData.age,
          "comment": inquiryData.message
        };

        const apiData = await apiClient.post("api/inquiry/add", DataRequest, {});

        if (apiData) {
          setSendDataFlag(true)
        }

      } catch (error) {
        //console.error("Error sending Data:", error)
      }
    }
  }

  return (
    <Grid>
      <Heading title="お問い合わせ" />
      <Breadcrumb items={breadcrumbItems} />
      <Grid container className='container'>
        <Grid item xs={12} alignItems='center' justifyContent='center'>

          {/* Display as default when page loads to the first time and the form is not entered or in case of edit the details */}

          {!FilledForm && SendDataFlag == false &&
            <form className="form" id="inquiry-form" onSubmit={handleSubmit(onSubmit)}>
              <Grid item container xs={12} pb={3} pt={3}>
                <Grid item xs={12}>
                  <Typography variant="h1">
                    *は入力必須項目です。未入力の場合、送信できませんのでご了承下さい。
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h1">
                    当サイトはセキュアサイト（暗号化送信）ですので安心・安全にご利用できます。
                  </Typography>
                </Grid>
              </Grid>
              <FormInputTextField
                required={true}
                label="お名前 "
                control={control}
                name="name"
                id="inquiry-form-name"
              />
              <FormInputTextField
                label="ご職業 "
                control={control}
                name="occupation"
                id="inquiry-form-occupation"
              />
              <FormInputTextField
                label="年齢 "
                control={control}
                type="number" 
                name="age"
                smalltextField={true}
                id="inquiry-form-age"
              />
              <FormInputTextField
                required={true}
                label="メールアドレス "
                type="email"
                control={control}
                name="emailaddress"
                id="inquiry-form-email"
              />
              <FormInputTextField
                required={true}
                label="コメントまたはメッセージ "
                control={control}
                textarea={true}
                name="message"
                id="inquiry-form-message"
              />
              <Grid xs={12} pt={2} className="form-preview-container">
                <Button variant="contained" id="inquiry-form-save-button" className="form-page-button" type="submit">プレビュー</Button>
              </Grid>
            </form>
          }

          {/* Displays when the form is filled and not submitted, and also used to review the details entered in the form */}

          {FilledForm && inquiryData && SendDataFlag == false &&
            <Grid container className="form" alignItems='center' justifyContent='center' id="inquiry-preview" pt={2}>
              <FormInputPreview
                label="お名前 "
                inputValue={inquiryData.name}
                id="inquiry-preview-name"
              />
              <FormInputPreview
                label="ご職業 "
                inputValue={inquiryData.occupation}
                id="inquiry-preview-occupation"
              />
              <FormInputPreview
                label="年齢 "
                inputValue={inquiryData.age}
                id="inquiry-preview-age"
              />
              <FormInputPreview
                label="メールアドレス "
                inputValue={inquiryData.emailaddress}
                id="inquiry-preview-email"
              />
              <FormInputPreview
                label="コメントまたはメッセージ "
                inputValue={inquiryData.message}
                id="inquiry-preview-message"
              />
              <Grid container className="form-save-container">
                <Grid item className="form-save-container-confirm-text">
                  上記の内容でよろしければ、送信ボタンをクリックしてください。
                </Grid>
                <Grid item container>
                  <Grid item>
                    <Button variant="contained" id="inquiry-preview-submit-button" className="form-save-container-submit-button" type="submit" onClick={handleSendData}>送信</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" id="inquiry-preview-back-button" className="form-save-container-back-button" onClick={handleEditData}>戻る</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          }

          {/* Display only when the form data is submitted successfully */}

          {SendDataFlag === true &&
            <Grid sx={{ backgroundColor: "#f9f9f9", padding: 5, fontSize: 16, border: 1, borderColor: "#9f9f9f", margin: 10 }}>
              <Typography>
                お問合わせいただき、ありがとうございます。
              </Typography>
              <Typography>
                後日、事務局よりメールにてご連絡致しますので、しばらくお待ち下さい。
              </Typography>
            </Grid>}
        </Grid>
      </Grid>
    </Grid>
  );

}
export default InquiryForm