'use strict';

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime; //startした時の時間
  let timeoutId; //10ミリ秒ごとに関数countUpを呼び出す設定
  let elapsedTime = 0;  //stopを押した時の時間

  // タイマーの時間を表示するための関数
  function countUp(){
    const d = new Date(Date.now() - startTime + elapsedTime);
    // 現在時刻からstartをクリックされた時間を引く
    const m = String(d.getMinutes()).padStart(2,'0');
    // 分を表すものpadStartで２桁表示、１桁の場合は空白に0を入れる
    const s = String(d.getSeconds()).padStart(2,'0');
    // 秒、２桁表示
    const ms = String(d.getMilliseconds()).padStart(3,'0');
    // ミリ秒、３桁表示
    timer.textContent = `${m}:${s}:${ms}`;
    // m:s:msと表示

    timeoutId = setTimeout(() =>{
        countUp();
      },10);
    // 10ミリ秒ごとに関数CountUpを呼び出すtimeoutIdを設定
  }


   // 処理の途中に不要なボタンを押させないための処理
  //  inactiveクラスをつけると押させない処理、外すと押せるようになる処理
  // .disabled = trueの時は押させない処理、falseの時に押せるようにする。 disabledプロパティーはユーザーからのインプットを抑制するために使う

  // ボタンを最初の状態にセットする関数
  function setButtonStateInitial(){
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }
  // 計測中の時(startを押した後の状態)のボタンをセットする関数
  function setButtonStateRunnning(){
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }
  // 停止中(stopを押した後)ボタンをセットする関数
  function setButtonStateStopped(){
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }

  setButtonStateInitial();


  start.addEventListener('click',() =>{
    if(start.classList.contains('inactive') === true){
      return;
      // #startにinactiveクラスが含まれていたら、何もしない（処理終了）
    }
    // startボタンが押された時の処理
    setButtonStateRunnning();
    // ボタン表示
    startTime = Date.now();
    // 変数startTimeにクリックされた時の現在時刻を取得
    // newDate().getTimeと違いインスタンスを生成しなくても良い
    countUp();
  });

  stop.addEventListener('click',() =>{
    if(stop.classList.contains('inactive') === true){
      return;
      // #stopにinactiveクラスが含まれていたら、何もしない（処理終了）
    }
    setButtonStateStopped();
    //ボタン表示
    clearTimeout(timeoutId);
    // timeoutIdの処理を終了
    elapsedTime += Date.now() - startTime;
    // =にすると直近のタイマーが走っていた時間しか保持されないため、トータルの時間を全て足す必要がある
  });

  reset.addEventListener('click',() =>{
    if(reset.classList.contains('inactive') === true){
      return;
      // #resetにinactiveクラスが含まれていたら、何もしない（処理終了）
    }
    setButtonStateInitial();
    // ボタン表示
    timer.textContent = '00:00:000';
    // resetボタンを押したら、00:00:000と表示
    elapsedTime = 0;
  });

 

  
}  