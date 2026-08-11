import { Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import Heading from '../../Components/Common/Heading'
import Breadcrumb from '../../Components/Common/BreadCrumb'
import { useForm } from 'react-hook-form'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button';
import { List, ListItem } from '@mui/material'
import RequestDiagnosisResult from '../../Components/Common/RequestDiagnosisResult'
import SubHeader from '../../Components/Common/subHeader'

const questions = [
  {
    id: "q1",
    label: "Q1. 特定の思考や衝動、またはイメージがふいに頭に現れ、そのことに強い不安や苦痛を感じる。"
  },
  {
    id: "q2",
    label: "Q2. 1のような状態を、無視や抑えこもうとしたり、他の思考や行動（例：強迫行為を行う）をして気持ちを落ち着かせようとすることがある。"
  },
  {
    id: "q3",
    label: "Q3. くり返しの行動（手を洗う、順番に並べる、確認するなど）または心の中の行為（祈る、数える、声を出さずに言葉を繰り返すなど）の特定の決まりに従って繰り返し行動するように駆り立てられるように感じている。"
  },
  {
    id: "q4",
    label: "Q4. その行動または心の中の行為は、不安や苦痛を避けるか緩和すること、または何か恐ろしい出来事や状況を避けることを目的としている。しかし、その行動や心の中の行為は、それによって中和したり予防したりしようとしているが、現実的にはつながりません。"
  },
  {
    id: "q5",
    label: "Q5. 強迫観念や強迫行為に1日1時間以上かける。"
  },
  {
    id: "q6",
    label: "Q6. 強迫観念や強迫行為によって、肉体的・精神的な苦痛が実際にある。または、学業や仕事などの社会生活に重要な支障がある。"
  }
];

/**
 * Component used to display test questions which allows users to select their problems regarding OCD and submit
 */

const ObsessiveCompulsiveDisorderCheckForm = () => {
  const [checkedCount, setCheckedCount] = useState(0);
  const [openForm, setOpenForm] = useState(false)
  const [obsessionsTrueCount, setObsessionsTrueCount] = useState(0);
  const [compulsionsTrueCount, setCompulsionsTrueCount] = useState(0);
  const [testResult, setTestResult] = useState<string>("");
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);

  const handleSubmitFlagChange = (value: boolean) => {
    setSubmitFlag(value);
  };

  const [obsessions, setObsessions] = useState({
    q1: false,
    q2: false,
    q3: false,
    q4: false
  });

  const [compulsions, setCompulsions] = useState({
    q5: false,
    q6: false
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const breadcrumbItems = [
    { title: 'HOME', href: '/home.html' },
    { title: '自己診断チェック', href: '/check.html' },
    { title: '強迫症チェック' }
  ];

  /**
   * Method used to take the total count of selected items
   * @param event 
   */

  const handleCheckedCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setCheckedCount(prevCount => prevCount + (checked ? 1 : -1));

    if (["q1", "q2", "q3", "q4"].includes(id)) {
      setObsessions(prevState => ({
        ...prevState,
        [id]: checked
      }));
    } else {
      setCompulsions(prevState => ({
        ...prevState,
        [id]: checked
      }));
    }
  };


  /**
   * Method used to submit the answers
   * @param data 
   */

  const onSubmit = async (data: any) => {
    const obsessionsTrueCount = Object.values(obsessions).filter(item => item).length;
    const compulsionsTrueCount = Object.values(compulsions).filter(item => item).length;
    setObsessionsTrueCount(obsessionsTrueCount);
    setCompulsionsTrueCount(compulsionsTrueCount);

    const result = `強迫観念の該当個数が ${obsessionsTrueCount} 個あります。 <br/> 強迫行為の該当個数が ${compulsionsTrueCount} 個あります。` + ((obsessionsTrueCount) ? `あなたは強迫観念と強迫行為があり、強迫性障害と診断されます。` : ``)
    setTestResult(result);
    setOpenForm(true)
  }

  /**
   * Method used to clear the entire selection of items
   */

  const handleRedoClick = () => {
    window.location.reload();
  };

  return (
    <Grid>
      <SubHeader/>
      <Heading title='強迫症チェック' />
      <Breadcrumb items={breadcrumbItems} />
      <Grid container className='container'>
        {!submitFlag ? (
          <>
            <Grid item xs={12} alignItems='center' justifyContent='center'>
              <form className="test" onSubmit={handleSubmit(onSubmit)}>
                <Typography className='blueBackground-blackContent'>
                  現在のあなたの状態について、以下のあてはまる項目にチェックをつけてください。
                </Typography>
                <FormGroup>
                  {questions.map((question, index) => (
                    <FormControlLabel
                      key={question.id}
                      control={
                        <Checkbox
                          onChange={handleCheckedCount}
                          id={question.id}
                        />
                      }
                      label={
                        <Typography variant='h3'>
                          {question.label}
                        </Typography>
                      }
                      className={index % 2 === 0 ? "whiteBackground-questions" : "blueBackground-questions"}
                      id={`obsessivecompulsivedisorder-selftest-question-${question.id}`}
                    />
                  ))}
                </FormGroup>
                <Typography variant='h2'>
                  米国精神医学会(APA)の精神疾患の診断分類、改訂第5版（DSM-5）より
                </Typography>
                <Typography className='pinkBackground-blueContent'>
                  該当する項目は {checkedCount} 個
                </Typography>
                <Grid item container alignItems='flex-start' justifyContent='flex-start' spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="primary" type="submit" className="selftest-form-button" id="obsessivecompulsivedisorder-selftest-form-diagnose-button">診断する</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={handleRedoClick} className="selftest-form-button" id="obsessivecompulsivedisorder-selftest-form-redo-button">やり直し</Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12} alignItems='center' justifyContent='center'>
              {openForm &&
                <Grid>
                  <Grid>
                    <List className='details' id='selftest-basic-details'>
                      <ListItem className='point'><Typography variant='body1'>強迫観念の該当個数が {obsessionsTrueCount} 個あります。</Typography></ListItem>
                      <ListItem className='point'><Typography variant='body1'>強迫行為の該当個数が {compulsionsTrueCount} 個あります。</Typography></ListItem>
                    </List>
                    {obsessionsTrueCount ? (
                      <Typography variant='body1'>あなたは強迫観念と強迫行為があり、強迫性障害と診断されます。</Typography>
                    ) : (
                      <></>
                    )
                    }
                  </Grid>
                  <RequestDiagnosisResult type={4} result={testResult} onFlagChange={handleSubmitFlagChange} />
                </Grid>
              }
            </Grid>
          </>
        ) : (
          <Grid xs={10} md={11} className='success-page'>
            <Typography>
              ご利用ありがとうございました。内容を確認の上、後日、事務局より
            <Typography>
              メールにてご連絡致しますので、よろしくお願い致します。
            </Typography>
            </Typography>
            <Typography>
              <br />（注）<br />
              通信キャリアにより、迷惑メール対策をされている場合、拒否される 可能性があります。送信後、3日以上経過しても通知メールが届かない場合、 「mentalzaidan@mental-health.org」のメールアドレスを受信するように設定し て下さい。
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default ObsessiveCompulsiveDisorderCheckForm
