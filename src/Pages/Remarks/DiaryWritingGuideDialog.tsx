import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

interface DiaryWritingGuideDialogProps {
  open: boolean;
  onClose: () => void;
}

const DiaryWritingGuideDialog: React.FC<DiaryWritingGuideDialogProps> = ({ open, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="diary-writing-guide-title"
    fullWidth
    maxWidth="md"
  >
    <DialogTitle id="diary-writing-guide-title" className="diary-guide-title">
      掲示板での日記の書き方（例）
    </DialogTitle>
    <DialogContent>
      <ul className="diary-guide-list">
        <li>
          <span className="diary-guide-highlight">日記療法</span>は本来、ノートに記録された患者さんの行動や考えについて、患者さんと治療者が定期的に意見を交換し、助言を行うためのものです。
        </li>
        <li>
          会員は日々の活動や考えを掲示板に投稿できますが、<span className="diary-guide-highlight">主治医がいないため、管理者が代わりに不定期にコメントします。</span>
        </li>
        <li>
          日記を書く基本は、<span className="diary-guide-highlight">その日に行った活動を時間帯ごとに分けて、毎日の終わり（例えば就寝前）に書き留めること</span>です。
        </li>
        <li>
          今日感じたことや意見、疑問なども自由に書いてください。ただし、長くなりすぎないようにしましょう。
        </li>
        <li>
          翌日以降も掲示板に書き続ける場合は、<span className="diary-guide-highlight">「日記を追加」をクリックすると、下の行に日記の入力欄が表示されます。</span>
        </li>
        <li>
          <span className="diary-guide-highlight">日記の書き方の例</span>は、日記掲示板（タイトル：「日記の書き方の例」）を参考にしてください。
        </li>
        <li>
          「コメント」欄には、<span className="diary-guide-highlight">森田療法のように、管理者から不定期に助言のコメントが寄せられます。</span>
        </li>
        <li>
          日記をつけることで、一日の出来事を振り返り、<span className="diary-guide-highlight">不安や感情を受け入れる姿勢を育む</span>きっかけになります。
        </li>
        <li>
          日記は記録として残るため、後から読み返すことで、<span className="diary-guide-highlight">気づきを得たり、自分の行動を見直したりする</span>のに役立ちます。
        </li>
      </ul>
    </DialogContent>
    <DialogActions className="diary-guide-actions" sx={{ justifyContent: 'center' }}>
      <Button className="diary-guide-close-button" onClick={onClose}>閉じる</Button>
    </DialogActions>
  </Dialog>
);

export default DiaryWritingGuideDialog;
