/* ---------- 変数定義 ---------- */

/* 稼働状態フラグ true：シャッフル中 false：待機中 */
var flgRunning;
/* 当選ボール番号 */
var numBall;
/* 残りボール数 */
var qtyRemainBall;
/* 配列の数値入れ替え用のワーク */
var wkNumber;
/* ビンゴ番号の配列 */
var allBingoNumber  = [] ;
/* インデックス */
var i;

/* html上の部品(ドキュメントオブジェクト)用の変数 */
var logo;
var txtWinNo;
var numLog_dsp1;
var numLog_dsp2;
var btnStart;
var soundEffect;
var sound1_1;
var sound1_2;
var sound2_1;
var sound2_2;
var seMenu;

/* 10ミリ秒ごとの繰り返し処理のID */
var timer;


/*  ---------- 画面起動時の処理 ---------- */

window.onload = function () {
	/* html上の部品(ドキュメントオブジェクト)とJavascriptの変数の対応付け */
	logo      = document.getElementById("logo");
	btnStart  = document.getElementById("btnStart");
	txtWinNo  = document.getElementById("txtWinNo");
	numLog_dsp1 = document.getElementById("numLog_dsp1");
	numLog_dsp2 = document.getElementById("numLog_dsp2");
	soundEffect = document.getElementById( "soundEffect" ) ;	
	sound1_1 = document.getElementById( "sound1_1" ) ;	
	sound1_2 = document.getElementById( "sound1_2" ) ;	
	sound2_1 = document.getElementById( "sound2_1" ) ;	
	sound2_2 = document.getElementById( "sound2_2" ) ;	
	seMenu = document.getElementsByName( "se1" ) ;

	/* 変数初期化 */
	 txtWinNo.textContent =0;
	 flgRunning =false;
	 qtyRemainBall = 75;
	/* ビンゴ番号配列に全番号セット */
	allBingoNumber.push(0);
	for ( i = 1; i <= qtyRemainBall; i++) {
		allBingoNumber.push(i);
	}

	for ( i = 1; i <= qtyRemainBall; i++) {
        //全番号モードの初期状態セットアップ
		display1_setup();
        //当選番号履歴モードの初期状態セットアップ
		display2_setup();
	}

	/* 当選番号表示エリアを待機中 */
    textWinArea.className = "textWaiting";
	/* ボタンのテキスト表示 */
	btnStart.textContent = "スタート";
	btnViewChg.textContent = "表示切替";
	/* スタート時は全番号表示モード */
	display1.style.display = "block";
	display2.style.display = "none";

	//ラジオボタンのセット
	seMenu[0].checked = true ;

}

/*  ---------- ボタンクリック時のイベント処理 ---------- */

/* 抽選ボタンクリック */
function clkStartStop() {

	/* 処理状態がシャッフル中の場合 */
	if (flgRunning == true) {
		/* 抽選実行し待機状態へ状態変更 */
		toStandby();
	} else {
	/* 処理状態が抽選実行の場合 */
		/* シャッフル中へ状態変更 */
		toRun();
	}
}

/* 表示切替ボタンクリック */
function clkViewChg() {

	if (display1.style.display == "none") {
		display2.style.display = "none";
		display1.style.display = "block";
	} else {
		display1.style.display = "none";
		display2.style.display = "block";
	}
}

/*  ---------- 関数 ---------- */
/* 抽選実行して待機状態にするための各種処理 */
function toStandby() {
	/* 効果音 */
	seReset() ;
	if ( seMenu[1].checked == true){
		sound1_2.play();
	} else if  (  seMenu[2].checked == true){
		sound2_2.play();
	}
	
    /* シャッフルをとめる。止めた時点のnumBallが当選番号 */
    clearInterval(timer);
    
	/* シャッフル中フラグをoffに */
	flgRunning = false;
	/* アイコンを点灯 */
	logo.className = "logo";
	/* 当選番号表示エリアを待機中 */
    textWinArea.className = "textWaiting";

	/* 当選番号表示エリアの編集*/
    document.getElementById("dsp1_li"+allBingoNumber[numBall]).className = "BingoBallSelected";
	document.getElementById("dsp2_li"+(76-qtyRemainBall)).textContent  = allBingoNumber[numBall];
	document.getElementById("dsp2_li"+(76-qtyRemainBall)).className = "BingoBallSelected";

	/* ビンゴ番号配列の編集*/
	wkNumber = allBingoNumber[numBall] ;
	allBingoNumber[numBall]  = allBingoNumber[qtyRemainBall] ;
	allBingoNumber[qtyRemainBall]  = wkNumber ;
	qtyRemainBall = qtyRemainBall - 1;

    /* ボタンのテキスト編集 */
    btnStart.textContent = "スタート";

	/* ボールがなくなったら、ボタンをつかえなくする */
    if (qtyRemainBall == 0) {
		btnStart.disabled = true;
	}
}

//全番号モードの初期状態セットアップ
var display1_setup = function(){
  // li要素定義
  var newLi = document.createElement("dsp1_li");
  // id属性追加
    newLi.setAttribute ("id","dsp1_li"+i);
  // テキスト初期値　ボール番号
    var newContent = document.createTextNode(i);
  newLi.appendChild(newContent);
  // li要素をDOMに追加
  document.getElementById("numLog_dsp1").appendChild(newLi);
  // 未当選状態のクラス
    document.getElementById("dsp1_li"+i).className = "BingoBallNotSelected";
}

//当選番号履歴モードの初期状態セットアップ
var display2_setup = function(){
  // li要素定義
  var newLi = document.createElement("dsp2_li");
  // id属性追加
  newLi.setAttribute ("id","dsp2_li"+i);
  // テキスト初期値"？"
    var newContent = document.createTextNode("？");
  newLi.appendChild(newContent);
  // li要素をDOMに追加
  document.getElementById("numLog_dsp2").appendChild(newLi);
  // 未当選状態のクラス
	document.getElementById("dsp2_li"+i).className = "BingoBallNotSelected";
}



/* シャッフル中に変更 */
function toRun() {
	/* 効果音 */
	seReset();
	if (  seMenu[1].checked == true){
		sound1_1.play();
	} else if  (  seMenu[2].checked == true){
		sound2_1.play();
	}

	/* 10ミリ秒ごとに残り時間を計算するタイマー処理 開始 */
	timer = setInterval(shuffle, 10);
	/* シャッフル中フラグをonに */
	flgRunning = true;
	/* 開始終了ボタンのテキスト"STOP"に書き換える */
	btnStart.textContent = "ストップ";
	/* アイコンを点滅 */
	logo.className = "logo_blink";
	/* 当選番号エリアのクラス名を、シャッフル中テキストのクラスに */
	textWinArea.className = "textShuffle";
}

/* 10ミリ秒ごとに実施するシャッフル処理 */
function shuffle() {
	 numBall = Math.ceil(Math.random() * qtyRemainBall);
	 txtWinNo.textContent = allBingoNumber[numBall] ;
}

/* 効果音リセット*/
function seReset() {
	sound1_1.pause();
	sound1_1.currentTime = 0;
	sound1_2.pause();
	sound1_2.currentTime = 0;
	sound2_1.pause();
	sound2_1.currentTime = 0;
	sound2_2.pause();
	sound2_2.currentTime = 0;
}
/* 効果音呼び出し*/
function audioLoad1() {
	sound1_1.load();
	sound1_2.load();
}
/* 効果音呼び出し*/
function audioLoad2() {
	sound2_1.load();
	sound2_2.load();
}
