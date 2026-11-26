/**
 * Extracts a backend error message from an Axios error or API response and alerts the user.
 */
export const showRemarkErrorAlert = (rawMessage?: string): string => {
  const msg = rawMessage?.trim() || '新規発言を送信できませんでした。';
  if (/title.*prohibited NG words/i.test(msg)) {
    alert(`タイトルに禁止ワード（NGワード）が含まれているため送信できません。\n${msg}`);
  } else if (/prohibited NG words/i.test(msg)) {
    alert(`発言内容に禁止ワード（NGワード）が含まれているため送信できません。\n${msg}`);
  } else {
    alert(msg);
  }
  return msg;
};

export const extractApiErrorMessage = (error: any): string => {
  const errData = error?.response?.data;
  return (
    errData?.error ||
    errData?.message ||
    (typeof errData === 'string' ? errData : '') ||
    error?.message ||
    ''
  );
};

