import { Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Heading from '../../Components/Common/Heading'
import Breadcrumb from '../../Components/Common/BreadCrumb'
import { useForm } from 'react-hook-form'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button';
import RequestDiagnosisResult from '../../Components/Common/RequestDiagnosisResult'
import SubHeader from '../../Components/Common/subHeader'

const questions = [
  {
    id: "q1",
    label: "Q1. 人見知りがはげしい"
  },
  {
    id: "q2",
    label: "Q2. ひどくはにかみやである"
  },
  {
    id: "q3",
    label: "Q3. 人前で緊張感が強い"
  },
  {
    id: "q4",
    label: "Q4. 人前で顔面がこわばる"
  },
  {
    id: "q5",
    label: "Q5. 人前で体がこわばる"
  },
  {
    id: "q6",
    label: "Q6. 人とむかいあうのをおそれる"
  },
  {
    id: "q7",
    label: "Q7. 人と会話するのをおそれる"
  },
  {
    id: "q8",
    label: "Q8. 人と視線を合わせるのをおそれる"
  },
  {
    id: "q9",
    label: "Q9. 人前で汗が出ることをおそれる"
  },
  {
    id: "q10",
    label: "Q10. 人前で顔が赤くなることをおそれる"
  },
  {
    id: "q11",
    label: "Q11. 人前でどもることをおそれる"
  },
  {
    id: "q12",
    label: "Q12. 人前で声がかすれたり、声が出にくくなることをおそれる"
  },
  {
    id: "q13",
    label: "Q13. 人前で声がふるえることをおそれる"
  },
  {
    id: "q14",
    label: "Q14. 人前でばかなことをいうことをおそれる"
  },
  {
    id: "q15",
    label: "Q15. 人前で字を書くとき、手のふるえをおそれる"
  },
  {
    id: "q16",
    label: "Q16. 人前で変な表情になることをおそれる"
  },
  {
    id: "q17",
    label: "Q17. 自分の顔またはその一部（目、鼻、口など）がみにくいと感じている"
  },
  {
    id: "q18",
    label: "Q18. 自分の体型または体の一部がみにくいと感じている"
  },
  {
    id: "q19",
    label: "Q19. 人の視線が気になる"
  },
  {
    id: "q20",
    label: "Q20. 人前でおならをすることをおそれる"
  },
  {
    id: "q21",
    label: "Q21. 自分の体の臭い（体臭、ガスなど）のために人にいやな感じをあたえることをおそれる"
  },
  {
    id: "q22",
    label: "Q22. 自分の視線のために人にいやな感じをあたえることをおそれる"
  },
  {
    id: "q23",
    label: "Q23. 自分の恐怖が人に移ることをおそれる"
  },
  {
    id: "q24",
    label: "Q24. 人と同室で寝るとき、寝言をいうことをおそれる"
  },
  {
    id: "q25",
    label: "Q25. 人が話していると自分のことを悪く言っているように感じる"
  },
  {
    id: "q26",
    label: "Q26. 人のちょっとしたしぐさが自分にあてつけているように感じる"
  },
  {
    id: "q27",
    label: "Q27. 人といっしょに食事をすることをおそれる"
  },
  {
    id: "q28",
    label: "Q28. 人のそばにいると小便が出にくくなることをおそれる"
  },
  {
    id: "q29",
    label: "Q29. 人前で体がふるえることをおそれる"
  },
  {
    id: "q30",
    label: "Q30. 人前で顔が青ざめることをおそれる"
  },
  {
    id: "q31",
    label: "Q31. 人前で唾を飲みこむことをおそれる"
  },
  {
    id: "q32",
    label: "Q32. 人前でおなかが鳴ることをおそれる"
  },
  {
    id: "q33",
    label: "Q33. 自分の目つきが異性にいやらしく思われることをおそれる"
  },
  {
    id: "q34",
    label: "Q34. 脇にいる人が視野に入ることをおそれる"
  },
  {
    id: "q35",
    label: "Q35. 自分の視線が相手の性器にいくことをおそれる"
  }
];

/**
 * Component used to display test questions which allows users to select their problems regarding Socialphobia and submit
 */
const SocialPhobiaCheckForm = () => {
  const [checkedCount, setCheckedCount] = useState(0);
  const [openForm, setOpenForm] = useState(false)
  const [testResult, setTestResult] = useState<string>("")
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);

  const handleSubmitFlagChange = (value: boolean) => {
    setSubmitFlag(value);
  };

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
    { title: '対人恐怖症チェック' }
  ];

  /**
   * Method used to take the total count of selected items
   * @param event 
   */

  const handleCheckedCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const increment = isChecked ? 1 : -1;
    setCheckedCount(prevCount => prevCount + increment);
  };

  /**
   * Method used to submit the answers
   * @param data 
   */

  const onSubmit = async (data: any) => {
    if (checkedCount == 1)
      setTestResult(`該当する項目は全部で ${checkedCount} 個で対人恐怖症はあてはまりません。`)
    else if (checkedCount <= 20)
      setTestResult(`該当する項目は全部で ${checkedCount} 個でやや対人恐怖症の症状があります。`)
    else if (checkedCount >= 21)
      setTestResult(`該当する項目は全部で ${checkedCount} 個（６割以上）でかなり高い対人恐怖症の症状があります。`)

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
      <Heading title='対人恐怖症チェック' />
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
                      id={`socialphobia-selftest-question-${question.id}`}
                    />
                  ))}
                </FormGroup>
                <Typography variant='h2'>
                  「神経症を治す」中村 敬 著 保健同人社より
                </Typography>
                <Typography className='pinkBackground-blueContent'>
                  該当する項目は {checkedCount} 個
                </Typography>
                <Grid item container alignItems='flex-start' justifyContent='flex-start' spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="primary" type="submit" className="selftest-form-button" id="socialphobia-selftest-form-diagnose-button">診断する</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={handleRedoClick} className="selftest-form-button" id="socialphobia-selftest-form-redo-button">やり直し</Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12} alignItems='center' justifyContent='center'>
              {openForm &&
                <Grid>
                  <Typography variant='body1'>{testResult}</Typography>
                  <RequestDiagnosisResult type={2} result={testResult} onFlagChange={handleSubmitFlagChange} />
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

export default SocialPhobiaCheckForm
