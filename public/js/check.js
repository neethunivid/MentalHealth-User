$(function(){

  const $checkboxes = $('input[type="checkbox"]');
  const $countDisplay = $('#checkCount');

  function updateCount() {
    let count = $checkboxes.filter(':checked').length;
    $countDisplay.text(count);
  }

  $checkboxes.on('change', updateCount);

  $('form').on('reset', function() {
    setTimeout(function(){
      $countDisplay.text(0);
      $('#resultMessage').html('');
      $('#finalCount').text(0);
      $('#resultArea').slideUp();
    }, 0);
  });

  $('#diagnoseBtn').on('click', function(){

    const $area = $('#resultArea');
    const type = $area.data('type'); // ← ここが最重要

    const count = $('input[type="checkbox"]:checked').length;
    $('#finalCount').text(count);

    let message = '';
    let detailMessage = '';

    // =========================
    // ✅ check5（うつ病）
    // =========================
    if(type === 'check-depression'){

      const depCoreCount = $('.dep-core:checked').length;
      const depOtherCount = $('.dep-other:checked').length;
      const depTotalCount = depCoreCount + depOtherCount;

      detailMessage += '・Q1～Q2のうち、うつ病の該当個数は' + depCoreCount + '個あります。\n';
      detailMessage += '・Q3～Q9のうち、うつ病の該当個数は' + depOtherCount + '個あります。\n';

      if (depCoreCount === 0) {
        message = 'Q1～Q2のいずれも該当がなく、あなたはうつ病と診断されません。';
      } else if (depTotalCount <= 4) {
        message = 'Q1～Q2のいずれかとQ1～Q9のうち、該当個数が5個以下ですので、あなたはうつ病ではありません。';
      } else {
        message = 'Q1～Q2のいずれかとQ1～Q9のうち、該当個数が5個以上ありますので、あなたはうつ病と診断されます。';
      }

    // =========================
    // ✅ check4（強迫）
    // =========================
    } else if(type === 'check4'){

      const obsessionCount = $('.obsession:checked').length;
      const compulsionCount = $('.compulsion:checked').length;

      if (obsessionCount > 0) {
        detailMessage += '・強迫観念の該当個数が' + obsessionCount + '個あります。\n';
      }

      if (compulsionCount > 0) {
        detailMessage += '・強迫行為の該当個数が' + compulsionCount + '個あります。\n';
      }

      if (obsessionCount > 0 && compulsionCount > 0) {
        message = 'あなたは強迫観念と強迫行為があり、強迫性障害と診断されます。';
      } else if (obsessionCount > 0) {
        message = 'あなたは強迫観念症と診断されます。';
      } else {
        message = '該当する症状は見られません。';
      }

    // =========================
    // ✅ check1〜3（従来ロジック）
    // =========================
    } else {

      const threshold = $area.data('threshold');
      const mid = $area.data('threshold-mid');

      const msgLow = $area.data('message-low');
      const msgMid = $area.data('message-mid');
      const msgHigh = $area.data('message-high');

      if(mid !== undefined){

        if(count === 0){
          message = msgLow;
        } else if(count <= mid){
          message = msgMid;
        } else {
          message = msgHigh;
        }

      } else {

        if(count <= threshold){
          message = msgLow;
        } else {
          message = msgHigh;
        }

      }

    }

    // =========================
    // ✅ 最後に1回だけ表示
    // =========================
    $('#resultMessage').html(
      message + (detailMessage ? '<br>' + detailMessage.replace(/\n/g, '<br>') : '')
    );

    $('#resultArea').slideDown();

  });

  $('#sendBtn').on('click', function(){
    const email = $('#email').val();

    if(!email){
      alert('メールアドレスを入力してください');
      return;
    }

    alert('送信しました！（※実際の送信処理は未実装）');
  });

});