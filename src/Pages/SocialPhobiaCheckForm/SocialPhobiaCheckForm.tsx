import React, { useState } from 'react'
import {
  Grid,
  Typography,
  FormGroup,
  Checkbox,
  Button,
  Box,
  Paper
} from '@mui/material'
import Heading from '../../Components/Common/Heading'
import { useForm } from 'react-hook-form'
import RequestDiagnosisResult from '../../Components/Common/RequestDiagnosisResult'
import SubHeader from '../../Components/Common/subHeader'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Notice from '../../Components/Common/Notice';

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
    label: "Q26. 人のちょっとしたしぐすが自分にあてつけているように感じる"
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
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  const [openForm, setOpenForm] = useState(false);
  const [testResult, setTestResult] = useState<string>("");
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);

  const handleSubmitFlagChange = (value: boolean) => {
    setSubmitFlag(value);
  };

  const { handleSubmit } = useForm();

  const handleCheckedCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setCheckedCount(prevCount => prevCount + (checked ? 1 : -1));
    setCheckedQuestions(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  const onSubmit = async () => {
    if (checkedCount <= 1)
      setTestResult(`該当する項目は全部で ${checkedCount} 個で対人恐怖症はあてはまりません。`);
    else if (checkedCount <= 20)
      setTestResult(`該当する項目は全部で ${checkedCount} 個でやや対人恐怖症の症状があります。`);
    else
      setTestResult(`該当する項目は全部で ${checkedCount} 個（６割以上）でかなり高い対人恐怖症の症状があります。`);

    setOpenForm(true);
  };

  const handleRedoClick = () => {
    window.location.reload();
  };

  return (
    <Box
      sx={{
        width: '100%',
        pb: 6,
        fontFamily: '"MPLUSRounded1c", "M PLUS Rounded 1c", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif !important',
        '& *': {
          fontFamily: '"MPLUSRounded1c", "M PLUS Rounded 1c", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif !important',
        },
      }}
    >
      <SubHeader />
      <Heading title='対人恐怖症チェック' />

      <Box sx={{ maxWidth: '1200px', margin: '0 auto', px: { xs: 2, sm: 3 }, pt: 2 }}>
        <Grid container spacing={3}>
          {/* Left Main Content Column */}
          <Grid item xs={12} md={8}>
            {/* Breadcrumb Navigation */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 0.8,
                fontSize: '0.82rem',
                color: '#666666',
                mb: 2,
              }}
            >
              <HomeRoundedIcon sx={{ fontSize: '1rem', color: '#666666' }} />
              <a href="/home.html" style={{ color: '#666666', textDecoration: 'none' }}>
                HOME
              </a>
              <span>/</span>
              <a href="/check.html" style={{ color: '#666666', textDecoration: 'none' }}>
                自己診断チェック
              </a>
              <span>/</span>
              <span style={{ color: '#666666' }}>対人恐怖症チェック</span>
            </Box>

            {!submitFlag ? (
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                {/* Instruction Line */}
                <Typography
                  variant="body1"
                  sx={{
                    color: '#555555',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    mb: 2.5,
                  }}
                >
                  問：現在のあなたの状態で以下に該当する項目にチェックしてください。
                </Typography>

                {/* Questions Checklist */}
                <FormGroup sx={{ mb: 2 }}>
                  {questions.map((question, index) => {
                    const isColored = index % 2 === 0;
                    return (
                      <Box
                        key={question.id}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: isColored ? '#e5effd' : 'transparent',
                          borderTop: isColored ? '1px solid #7ea1d0' : '1px solid transparent',
                          borderBottom: isColored ? '1px solid #7ea1d0' : '1px solid transparent',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 0,
                          padding: '16px 20px',
                          marginBottom: '12px',
                        }}
                        id={`socialphobia-selftest-question-${question.id}`}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: { xs: '0.88rem', sm: '0.93rem' },
                            color: '#333333',
                            lineHeight: 1.5,
                            pr: 2,
                            flexGrow: 1,
                          }}
                        >
                          {question.label}
                        </Typography>
                        <Checkbox
                          checked={checkedQuestions[question.id] || false}
                          onChange={handleCheckedCount}
                          id={question.id}
                          icon={
                            <Box
                              sx={{
                                width: 18,
                                height: 18,
                                border: '1px solid #767676',
                                borderRadius: '3px',
                                backgroundColor: '#ffffff',
                              }}
                            />
                          }
                          checkedIcon={
                            <Box
                              sx={{
                                width: 18,
                                height: 18,
                                border: '1px solid #0066cc',
                                borderRadius: '3px',
                                backgroundColor: '#0066cc',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '13px',
                                fontWeight: 'bold',
                                lineHeight: 1,
                              }}
                            >
                              ✓
                            </Box>
                          }
                          sx={{
                            padding: 0,
                            '&:hover': { backgroundColor: 'transparent' },
                          }}
                        />
                      </Box>
                    );
                  })}
                </FormGroup>

                {/* Reference Note */}
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666666',
                    fontSize: '0.82rem',
                    mt: 1,
                    mb: 3,
                  }}
                >
                  「神経症を治す」中村 敬 著 保健同人社より
                </Typography>

                {/* Checked Counter Box */}
                <Box
                  sx={{
                    backgroundColor: '#fff7df',
                    color: '#333333',
                    padding: '18px 24px',
                    width: '100%',
                    mb: 3,
                    boxSizing: 'border-box',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1.15rem',
                      color: '#333333',
                    }}
                  >
                    該当する項目は {checkedCount} 個
                  </Typography>
                </Box>

                {/* Buttons Row */}
                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                  <Button
                    variant="contained"
                    type="submit"
                    id="socialphobia-selftest-form-diagnose-button"
                    sx={{
                      backgroundColor: '#0066cc',
                      px: 4,
                      py: 1,
                      fontSize: '0.95rem',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#004c99',
                      },
                    }}
                  >
                    診断する
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleRedoClick}
                    id="socialphobia-selftest-form-redo-button"
                    sx={{
                      borderColor: '#0066cc',
                      color: '#0066cc',
                      px: 4,
                      py: 1,
                      fontSize: '0.95rem',
                      fontWeight: 'bold',
                      '&:hover': {
                        borderColor: '#004c99',
                        backgroundColor: '#f0f7ff',
                      },
                    }}
                  >
                    やり直し
                  </Button>
                </Box>

                {/* Open Diagnosis Result Form */}
                {openForm && (
                  <Box
                    sx={{
                      mt: 3,
                      p: { xs: 2.5, sm: 3.5 },
                      backgroundColor: '#fff7df',
                      boxSizing: 'border-box',
                    }}
                  >
                    <Typography variant="body1" sx={{ color: '#cc0000', fontWeight: 'bold', mb: 2 }}>
                      {testResult}
                    </Typography>
                    <RequestDiagnosisResult
                      type={2}
                      result={testResult}
                      onFlagChange={handleSubmitFlagChange}
                    />
                  </Box>
                )}
              </Box>
            ) : (
              /* Success Submission View */
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  backgroundColor: '#f0f7ff',
                  border: '1px solid #b3d7ff',
                }}
              >
                <Typography variant="h6" sx={{ color: '#0066cc', fontWeight: 'bold', mb: 2 }}>
                  ご利用ありがとうございました。
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, color: '#333333' }}>
                  内容を確認の上、後日、事務局よりメールにてご連絡致しますので、よろしくお願い致します。
                </Typography>
                <Typography variant="body2" sx={{ color: '#666666', lineHeight: 1.7 }}>
                  （注）通信キャリアにより、迷惑メール対策をされている場合、拒否される可能性があります。送信後、3日以上経過しても通知メールが届かない場合、「mentalzaidan@mental-health.org」のメールアドレスを受信するように設定して下さい。
                </Typography>
              </Paper>
            )}
          </Grid>

          {/* Right Sidebar Column (Notice Section) */}
          <Grid item xs={12} md={4}>
            <Notice />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SocialPhobiaCheckForm;
