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
import CheckedCounterBox from '../../Components/Common/CheckedCounterBox';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Notice from '../../Components/Common/Notice';

const questions = [
  { id: "q1", label: "Q1. 動悸、心悸亢進、または心拍数の増加した" },
  { id: "q2", label: "Q2. 発汗がある" },
  { id: "q3", label: "Q3. 身震いまたは震えがある" },
  { id: "q4", label: "Q4. 息切れ感または息苦しさがある" },
  { id: "q5", label: "Q5. 窒息感がある" },
  { id: "q6", label: "Q6. 胸痛または胸部不快感がある" },
  { id: "q7", label: "Q7. おう気または腹部の不快感" },
  { id: "q8", label: "Q8. めまい感、ふらつく感じ、頭が軽くなる感じまたは気が遠くなる感じ" },
  { id: "q9", label: "Q9. 現現実感消失、または離人症状" },
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
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  const [openForm, setOpenForm] = useState(false);
  const [testResult, setTestResult] = useState<string>("");
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);

  const handleSubmitFlagChange = (value: boolean) => {
    setSubmitFlag(value);
  };

  const { handleSubmit } = useForm();

  const handleToggleQuestion = (id: string) => {
    setCheckedQuestions(prev => {
      const nextChecked = !prev[id];
      const updated = { ...prev, [id]: nextChecked };
      const newCount = Object.values(updated).filter(Boolean).length;
      setCheckedCount(newCount);
      return updated;
    });
  };

  const onSubmit = async () => {
    if (checkedCount <= 3)
      setTestResult(`該当する項目は全部で ${checkedCount} 個でパニック障害はあてはまりません。`);
    else if (checkedCount >= 4)
      setTestResult(`該当する項目は全部で ${checkedCount} 個（4個以上）でパニック障害があてはまります。`);

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
      <Heading title='パニック症チェック' />

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
              <span style={{ color: '#666666' }}>パニック症チェック</span>
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
                  ＜パニック発作とは＞<br />
                  強い恐怖又は不快を感じる、はっきり他と区分できる期間で、その時以下の症状のうち4つ（又はそれ以上）が突然に出現し、10分以内にその頂点に達する場合。
                </Typography>

                {/* Questions Checklist */}
                <FormGroup sx={{ mb: 2 }}>
                  {questions.map((question, index) => {
                    const isColored = index % 2 === 0;
                    return (
                      <Box
                        key={question.id}
                        onClick={() => handleToggleQuestion(question.id)}
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
                          cursor: 'pointer',
                        }}
                        id={`panicdisorder-selftest-question-${question.id}`}
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
                          checked={!!checkedQuestions[question.id]}
                          onChange={() => {}}
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
                            pointerEvents: 'none',
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

                {/* Separate Counter Box Component */}
                <CheckedCounterBox count={checkedCount} />

                {/* Buttons Row */}
                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                  <Button
                    variant="contained"
                    type="submit"
                    id="panicdisorder-selftest-form-diagnose-button"
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
                    id="panicdisorder-selftest-form-redo-button"
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
                      type={3}
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

export default PanicDisorderCheckForm;
