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
  { id: "q1", label: "Q1. 動悸、心悸亢進、または心拍数の増加した" },
  { id: "q2", label: "Q2. 発汗がある" },
  { id: "q3", label: "Q3. 身震いまたは震えがある" },
  { id: "q4", label: "Q4. 息切れ感または息苦しさがある" },
  { id: "q5", label: "Q5. 窒息感がある" },
  { id: "q6", label: "Q6. 胸痛または胸部不快感がある" },
  { id: "q7", label: "Q7. おう気または腹部の不快感" },
  { id: "q8", label: "Q8. めまい感、ふらつく感じ、頭が軽くなる感じまたは気が遠くなる感じ" },
  { id: "q9", label: "Q9. 現実感消失、または離人症状" },
  { id: "q10", label: "Q10. コントロールを失うことに対する、または気が狂うことに対する恐怖" },
  { id: "q11", label: "Q11. 死ぬことに対する恐怖" },
  { id: "q12", label: "Q12. 異常感覚" },
  { id: "q13", label: "Q13. 冷感または熱感" }
];

/**
 * Component used to display test questions which allows users to select their problems regarding Panic disorder and submit
 */

const PanicDisorderCheckForm = () => {
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
    { title: 'パニック症チェック' }
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
    if (checkedCount <= 3)
      setTestResult(`該当する項目は全部で ${checkedCount} 個でパニック障害はあてはまりません。`)
    else if (checkedCount >= 4)
      setTestResult(`該当する項目は全部で ${checkedCount} 個（4個以上）でパニック障害があてはまります。`)

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
      <Heading title='パニック症チェック' />
      <Breadcrumb items={breadcrumbItems} />
      <Grid container className='container'>
        {!submitFlag ? (
          <>
            <Grid item xs={12} alignItems='center' justifyContent='center'>
              <form className="test" onSubmit={handleSubmit(onSubmit)}>
                <Typography className='blueBackground-blackContent'>
                  ＜パニック発作とは＞<br />
                  強い恐怖又は不快を感じる、はっきり他と区分できる期間で、その時以下の症状のうち4つ（又はそれ以上）が突然に出現し、10分以内にその頂点に達する場合。
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
                      id={`panicdisorder-selftest-question-${question.id}`}
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
                    <Button variant="contained" color="primary" type="submit" className="selftest-form-button" id="panicdisorder-selftest-form-diagnose-button">診断する</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={handleRedoClick} className="selftest-form-button" id="panicdisorder-selftest-form-redo-button">やり直し</Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12} alignItems='center' justifyContent='center'>
              {openForm &&
                <Grid>
                  <Typography variant='body1'>{testResult}</Typography>
                  <RequestDiagnosisResult type={3} result={testResult} onFlagChange={handleSubmitFlagChange} />
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

export default PanicDisorderCheckForm
