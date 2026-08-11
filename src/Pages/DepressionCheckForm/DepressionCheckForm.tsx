import { Grid, Typography } from '@material-ui/core'
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
    label: "Q1. 抑うつ気分"
  },
  {
    id: "q2",
    label: "Q2. 興味と喜びの喪失"
  },
  {
    id: "q3",
    label: "Q3. 集中力と注意力の減退がある"
  },
  {
    id: "q4",
    label: "Q4. 自己評価と自信の低下"
  },
  {
    id: "q5",
    label: "Q5. 罪責感と無価値観（軽症エピソードでも）"
  },
  {
    id: "q6",
    label: "Q6. 将来に対する希望のない悲観的な見方"
  },
  {
    id: "q7",
    label: "Q7. 自傷あるいは自殺の観念や行為"
  },
  {
    id: "q8",
    label: "Q8. 睡眠障害"
  },
  {
    id: "q9",
    label: "Q9. 食欲不振"
  },
];

/**
 * Component used to display test questions which allows users to select their problems regarding Depression and submit
 */

const DepressionCheckForm = () => {
  const [checkedCount, setCheckedCount] = useState(0);
  const [openForm, setOpenForm] = useState(false)
  const [depression1TrueCount, setDepression1TrueCount] = useState(0)
  const [depression2TrueCount, setDepression2TrueCount] = useState(0)
  const [conclusion, setConclusion] = useState<string>("")
  const [testResult, setTestResult] = useState<string>("")
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);

  const handleSubmitFlagChange = (value: boolean) => {
    setSubmitFlag(value);
  };

  const [depression1, setDepression1] = useState({
    q1: false,
    q2: false
  })

  const [depression2, setDepression2] = useState({
    q3: false,
    q4: false,
    q5: false,
    q6: false,
    q7: false,
    q8: false,
    q9: false
  })

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
    { title: 'うつ病チェック' }
  ];

  /**
   * Method used to take the total count of selected items
   * @param event 
   */

  const handleCheckedCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setCheckedCount(prevCount => prevCount + (checked ? 1 : -1));

    if (["q1", "q2"].includes(id)) {
      setDepression1(prevState => ({
        ...prevState,
        [id]: checked
      }));
    } else {
      setDepression2(prevState => ({
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
    const depression1TrueCount = Object.values(depression1).filter(item => item).length;
    const depression2TrueCount = Object.values(depression2).filter(item => item).length;
    setDepression1TrueCount(depression1TrueCount);
    setDepression2TrueCount(depression2TrueCount);

    if (depression1TrueCount === 0)
      setConclusion("Q1～Q2のいずれも該当がなく、あなたはうつ病と診断されません。")
    else if ((depression1TrueCount == 1 && depression2TrueCount <= 3) || (depression1TrueCount == 2 && depression2TrueCount <= 2))
      setConclusion("Q1～Q2のいずれかとQ3～Q9のうち、うつ病の該当個数が5個以下ですので、あなたはうつ病ではありません。")
    else if ((depression1TrueCount == 1 && depression2TrueCount >= 4) || (depression1TrueCount == 2 && depression2TrueCount >= 3))
      setConclusion("Q1～Q2のいずれかとQ3～Q9のうち、うつ病の該当個数が5個以上ありますので、あなたはうつ病と診断されます。")

    const result = `Q1～Q2のうち、うつ病の該当個数は ${depression1TrueCount} 個あります。<br/> Q3-Q9のうち、うつ病に該当する項目の数は ${depression2TrueCount} です。<br/> ${conclusion} <br/> ＜大うつ病のエピソード＞ <br/> 患者は通常、抑うつ気分、興味と喜びの喪失、および活力の減退による、易疲労感の増大や活動性の減少に悩まされる。わずかに頑張ったあとでも、ひどく疲労を感じることがふつうである。普通、少なくとも2週間の持続が必要とされるが、もし症状がきわめて重症で急激な発症であれば、より短い期間であってもかまわない。`
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
      <Heading title='うつ病チェック' />
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
                      id={`depression-selftest-question-${question.id}`}
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
                    <Button variant="contained" color="primary" type="submit" className="selftest-form-button" id="depression-selftest-form-diagnose-button">診断する</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={handleRedoClick} className="selftest-form-button" id="depression-selftest-form-redo-button">やり直し</Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12} alignItems='center' justifyContent='center'>
              {openForm &&
                <Grid>
                  <Grid>
                    <List className='details' id='selftest-basic-details'>
                      <ListItem className='point'><Typography variant='body1'>Q1～Q2のうち、うつ病の該当個数は {depression1TrueCount} 個あります。</Typography></ListItem>
                      <ListItem className='point'><Typography variant='body1'>Q3-Q9のうち、うつ病に該当する項目の数は {depression2TrueCount} です。</Typography></ListItem>
                    </List>
                    <Typography variant='body1'>{conclusion}</Typography>
                    <Typography variant='caption'>
                      <br />＜大うつ病のエピソード＞<br />
                      患者は通常、抑うつ気分、興味と喜びの喪失、および活力の減退による、易疲労感の増大や活動性の減少に悩まされる。わずかに頑張ったあとでも、ひどく疲労を感じることがふつうである。普通、少なくとも2週間の持続が必要とされるが、もし症状がきわめて重症で急激な発症であれば、より短い期間であってもかまわない。
                    </Typography>
                  </Grid>
                  <RequestDiagnosisResult type={5} result={testResult} onFlagChange={handleSubmitFlagChange} />
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

export default DepressionCheckForm
