import React from 'react';
import {
  Grid,
  Typography,
  Button,
  Box,
  Divider,
  TextField,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Heading from '../../Components/Common/Heading';
import Breadcrumb from '../../Components/Common/BreadCrumb';
import SubHeader from '../../Components/Common/subHeader';
import Notice from '../../Components/Common/Notice';
import apiClient from '../../API/API-client';

/**
 * Component used for deleting/unsubscribing from the mail magazine
 */
const MagazineDelete: React.FC = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      pc_email: '',
      mobile_email: '',
    },
  });

  const breadcrumbItems = [
    { title: 'HOME', href: '/' },
    { title: 'メルマガ購読フォーム' },
  ];

  /**
   * Method used to unsubscribe mail magazine
   */
  const unsubscribeMagazine = async (data: any) => {
    if (!data.pc_email && !data.mobile_email) {
      alert('PC用または携帯用のメールアドレスを入力してください。');
      return;
    }

    try {
      const DataRequest = {
        email: data.pc_email || '',
        emailMob: data.mobile_email || '',
      };

      const details = await apiClient.post('api/magadd/getMagid', DataRequest);

      if (!details?.data?.data || details?.data?.data === 0) {
        alert('サブスクリプションが見つかりません');
      } else {
        const apiData = await apiClient.delete(
          'api/magadd/delete/' + details.data.data
        );
        if (apiData) {
          alert('メールマガジンを退会しました。');
          reset();
        }
      }
    } catch (error) {
      console.error('Unsubscription Failed: ', error);
      alert('エラーが発生しました。もう一度お試しください。');
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
      <Heading title="登録メールアドレスの変更・削除（解約）" />

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

            {/* Instruction Notes */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  mb: 1.5,
                  color: '#222222',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                }}
              >
                ★登録メールアドレスを変更したい方、又はメールマガジンの購読を中止したい方は、
                <span style={{ color: '#d32f2f' }}>
                  現在登録されているメールアドレスを削除してください。
                </span>
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
              ■ 登録メールアドレスの削除
            </Typography>

            {/* Unsubscription Form */}
            <form
              id="unsubscription-form"
              onSubmit={handleSubmit(unsubscribeMagazine)}
            >
              {/* Field 1: PC Email */}
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
                  メールアドレス（PC用）
                </Typography>
                <Controller
                  name="pc_email"
                  control={control}
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

              {/* Field 2: Mobile Email */}
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
                  メールアドレス（携帯用）
                </Typography>
                <Controller
                  name="mobile_email"
                  control={control}
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
                上記内容でよろしければ、削除ボタンを押して下さい。
              </Typography>

              {/* Blue Delete Button (Centered) */}
              <Box sx={{ textAlign: 'center', mb: 5 }}>
                <Button
                  type="submit"
                  variant="contained"
                  id="unsubscription-form-submit-button"
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
                  削除する
                </Button>
              </Box>
            </form>

            <Divider sx={{ my: 4 }} />

            {/* Newsletter Registration Link Section */}
            <Box sx={{ mb: 3 }}>
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
                ★メールアドレスの変更、又はパソコン（PC用）や携帯での新規登録を希望される方は、以下のリンクから新しいメールアドレスを登録してください。
              </Typography>

              {/* Pink Newsletter Registration Button (Centered) */}
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/mailmagazine')}
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
                  メルマガ登録
                </Button>
              </Box>
            </Box>
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

export default MagazineDelete;
