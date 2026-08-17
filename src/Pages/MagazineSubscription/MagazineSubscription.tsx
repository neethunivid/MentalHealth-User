import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Box,
  Divider,
  Paper,
  TextField,
  Collapse,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import Heading from '../../Components/Common/Heading';
import Breadcrumb from '../../Components/Common/BreadCrumb';
import SubHeader from '../../Components/Common/subHeader';
import Notice from '../../Components/Common/Notice';
import apiClient from '../../API/API-client';

/**
 * Component is used for subscribing to and unsubscribing from the mail magazine
 */
const MagazineSubscription: React.FC = () => {
  const [showUnsubscribe, setShowUnsubscribe] = useState(false);

  const {
    control: subscribeControl,
    handleSubmit: handleSubscribeSubmit,
    reset: resetSubscribe,
  } = useForm({
    defaultValues: {
      name: '',
      pc_email_address: '',
      mobile_email_address: '',
    },
  });

  const {
    control: unsubscribeControl,
    handleSubmit: handleUnsubscribeSubmit,
    reset: resetUnsubscribe,
  } = useForm({
    defaultValues: {
      pc_email: '',
      mobile_email: '',
    },
  });

  const breadcrumbItems = [
    { title: 'HOME', href: '/' },
    { title: 'メルマガ購読' },
  ];

  /**
   * Method used to subscribe mail magazine
   */
  const subscribeMagazine = async (data: any) => {
    if (data) {
      try {
        const DataRequest = {
          email: data.pc_email_address,
          emailMob: data.mobile_email_address,
          name: data.name,
        };

        const details = await apiClient.post('api/magadd/checkEmail', DataRequest);
        if (details.data.data !== null) {
          alert('アクティブなサブスクリプションがあります');
        } else {
          const apiData = await apiClient.post('api/magadd/add', DataRequest);
          if (apiData) {
            alert('メールニュースレターを購読しました。');
            resetSubscribe();
          }
        }
      } catch (error) {
        // console.error("Subscription Failed : ", error)
      }
    }
  };

  /**
   * Method used to unsubscribe mail magazine
   */
  const unsubscribeMagazine = async (data: any) => {
    if (data) {
      try {
        const DataRequest = {
          email: data.pc_email,
          emailMob: data.mobile_email,
        };

        const details = await apiClient.post('api/magadd/getMagid', DataRequest);

        if (details?.data?.data === 0) {
          alert('サブスクリプションが見つかりません');
        } else {
          const apiData = await apiClient.delete(
            'api/magadd/delete/' + details.data.data
          );
          if (apiData) {
            alert('メールマガジンを退会しました。');
            resetUnsubscribe();
          }
        }
      } catch (error) {
        // console.error("Unsubscription Failed : ", error)
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        pb: 6,
        fontFamily:
          '"MPLUSRounded1c", "M PLUS Rounded 1c", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif !important',
        '& *': {
          fontFamily:
            '"MPLUSRounded1c", "M PLUS Rounded 1c", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif !important',
        },
      }}
    >
      <SubHeader />
      <Heading title="メルマガ購読" />

      <Box
        sx={{
          maxWidth: '1280px',
          margin: '0 auto',
          px: { xs: 2, sm: 3 },
          pt: 2,
        }}
      >
        <Grid container spacing={4}>
          {/* Left Main Content Column */}
          <Grid item xs={12} md={7.5}>
            {/* Breadcrumb Navigation */}
            <Box sx={{ mb: 3 }}>
              <Breadcrumb items={breadcrumbItems} />
            </Box>

            {/* Instruction Banner Notes */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  mb: 1.5,
                  color: '#222222',
                  fontSize: '1.05rem',
                }}
              >
                ★メールマガジンの購読を希望される方はメールアドレスを登録して下さい。
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#d32f2f',
                  mb: 1.5,
                  lineHeight: 1.7,
                  fontSize: '1.05rem',
                }}
              >
                ★パソコン（PC用）又は携帯のいずれかで購読できます。どちらも購読したい方は、2つとも登録して下さい。
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#d32f2f',
                  mb: 3,
                  lineHeight: 1.7,
                  fontSize: '1.05rem',
                }}
              >
                ★このフォームは、SSL技術（暗号化送信）で送受信されますので、個人情報の流失等がなく、安心・安全にご利用いただけます。
              </Typography>
            </Box>

            {/* Section Header */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#222222',
                mb: 3.5,
                fontSize: '1.25rem',
              }}
            >
              ■ メールアドレスの新規登録
            </Typography>

            {/* Subscription Form */}
            <form
              id="subscription-form"
              onSubmit={handleSubscribeSubmit(subscribeMagazine)}
            >
              {/* Field 1: Name */}
              <Box sx={{ mb: 3.5 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 'bold',
                    color: '#222222',
                    mb: 0.5,
                    fontSize: '1.15rem',
                  }}
                >
                  1. お名前 <span style={{ color: '#d32f2f' }}>*</span>
                </Typography>
                <Typography
                  variant="body2"
                  display="block"
                  sx={{ color: '#666666', mb: 0.3, fontSize: '0.92rem' }}
                >
                  (ニックネームも可能です)
                </Typography>
                <Typography
                  variant="body2"
                  display="block"
                  sx={{ color: '#777777', mb: 1.2, fontSize: '0.92rem' }}
                >
                  3-15文字 (半角英数字)
                </Typography>
                <Controller
                  name="name"
                  control={subscribeControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      required
                      variant="outlined"
                      id="subscription-form-name"
                      sx={{
                        backgroundColor: '#ffffff',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          minHeight: '50px',
                          fontSize: '1.05rem',
                        },
                        '& .MuiOutlinedInput-input': {
                          padding: '12px 16px',
                        },
                      }}
                    />
                  )}
                />
              </Box>

              {/* Field 2: PC Email */}
              <Box sx={{ mb: 3.5 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 'bold',
                    color: '#222222',
                    mb: 1,
                    fontSize: '1.15rem',
                  }}
                >
                  2. メールアドレス（PC用） <span style={{ color: '#d32f2f' }}>*</span>
                </Typography>
                <Controller
                  name="pc_email_address"
                  control={subscribeControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="email"
                      fullWidth
                      required
                      variant="outlined"
                      id="subscription-form-pc-email"
                      sx={{
                        backgroundColor: '#ffffff',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          minHeight: '50px',
                          fontSize: '1.05rem',
                        },
                        '& .MuiOutlinedInput-input': {
                          padding: '12px 16px',
                        },
                      }}
                    />
                  )}
                />
              </Box>

              {/* Field 3: Mobile Email */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 'bold',
                    color: '#222222',
                    mb: 1,
                    fontSize: '1.15rem',
                  }}
                >
                  3. メールアドレス（携帯用） <span style={{ color: '#d32f2f' }}>*</span>
                </Typography>
                <Controller
                  name="mobile_email_address"
                  control={subscribeControl}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="email"
                      fullWidth
                      required
                      variant="outlined"
                      id="subscription-form-mobile-email"
                      sx={{
                        backgroundColor: '#ffffff',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          minHeight: '50px',
                          fontSize: '1.05rem',
                        },
                        '& .MuiOutlinedInput-input': {
                          padding: '12px 16px',
                        },
                      }}
                    />
                  )}
                />
              </Box>

              {/* Submission instruction note (Left-aligned) */}
              <Typography
                variant="body1"
                sx={{
                  color: '#333333',
                  mb: 2.5,
                  fontSize: '1rem',
                  textAlign: 'left',
                }}
              >
                上記内容でよろしければ、登録ボタンを押して下さい。
              </Typography>

              {/* Blue Submit Button (Centered) */}
              <Box sx={{ textAlign: 'center', mb: 5 }}>
                <Button
                  type="submit"
                  variant="contained"
                  id="subscription-form1-submit-button"
                  sx={{
                    backgroundColor: '#0073e6',
                    color: '#ffffff',
                    px: 8,
                    py: 1.4,
                    borderRadius: '28px',
                    fontSize: '1.15rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    boxShadow: 'none',
                    minWidth: '220px',
                    '&:hover': {
                      backgroundColor: '#005bb5',
                      boxShadow: 'none',
                    },
                  }}
                >
                  登録する
                </Button>
              </Box>
            </form>

            <Divider sx={{ my: 4 }} />

            {/* Unsubscribe / Change Section */}
            <Box sx={{ mb: 3 }}>
              {/* Unsubscribe instruction note (Left-aligned) */}
              <Typography
                variant="body1"
                sx={{
                  color: '#222222',
                  fontWeight: 'bold',
                  mb: 2.5,
                  lineHeight: 1.7,
                  fontSize: '1.05rem',
                  textAlign: 'left',
                }}
              >
                ★登録メールアドレスを変更したい方、又はメールマガジンの購読を中止したい方は、以下のボタンから削除または変更を行ってください。
              </Typography>

              {/* Pink Change/Cancel Button (Centered) */}
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  onClick={() => setShowUnsubscribe(!showUnsubscribe)}
                  sx={{
                    backgroundColor: '#f77292',
                    color: '#ffffff',
                    px: 6,
                    py: 1.4,
                    borderRadius: '28px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    boxShadow: 'none',
                    minWidth: '240px',
                    '&:hover': {
                      backgroundColor: '#e05c7c',
                      boxShadow: 'none',
                    },
                  }}
                >
                  {showUnsubscribe ? '閉じる' : '登録変更・解除'}
                </Button>
              </Box>
            </Box>

            {/* Collapsible Unsubscribe Form */}
            <Collapse in={showUnsubscribe}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  mt: 3,
                  mb: 4,
                  backgroundColor: '#fff5f7',
                  border: '1px solid #ffccd5',
                  borderRadius: '12px',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: '#d32f2f',
                    mb: 2.5,
                    fontSize: '1.1rem',
                  }}
                >
                  ■ 登録メールアドレスの削除・変更
                </Typography>
                <form
                  id="unsubscription-form"
                  onSubmit={handleUnsubscribeSubmit(unsubscribeMagazine)}
                >
                  <Box sx={{ mb: 2.5 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        color: '#333333',
                        mb: 0.8,
                        fontSize: '1.05rem',
                      }}
                    >
                      メールアドレス（PC用）
                    </Typography>
                    <Controller
                      name="pc_email"
                      control={unsubscribeControl}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="email"
                          fullWidth
                          variant="outlined"
                          id="unsubscription-form-pc-email"
                          sx={{
                            backgroundColor: '#ffffff',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              minHeight: '48px',
                            },
                          }}
                        />
                      )}
                    />
                  </Box>

                  <Box sx={{ mb: 3.5 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        color: '#333333',
                        mb: 0.8,
                        fontSize: '1.05rem',
                      }}
                    >
                      メールアドレス（携帯用）
                    </Typography>
                    <Controller
                      name="mobile_email"
                      control={unsubscribeControl}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="email"
                          fullWidth
                          variant="outlined"
                          id="unsubscription-form-mobile-email"
                          sx={{
                            backgroundColor: '#ffffff',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              minHeight: '48px',
                            },
                          }}
                        />
                      )}
                    />
                  </Box>

                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      id="unsubscription-form2-submit-button"
                      sx={{
                        backgroundColor: '#d32f2f',
                        color: '#ffffff',
                        px: 5,
                        py: 1.2,
                        borderRadius: '24px',
                        fontWeight: 'bold',
                        fontSize: '1.05rem',
                        '&:hover': {
                          backgroundColor: '#b71c1c',
                        },
                      }}
                    >
                      削除送信
                    </Button>
                  </Box>
                </form>
              </Paper>
            </Collapse>
          </Grid>

          {/* Right Sidebar Column (Notice Section) */}
          <Grid item xs={12} md={4.5}>
            <Notice />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MagazineSubscription;

