/* ---------- 変数定義 ---------- */

/* html上の部品(ドキュメントオブジェクト)用の変数 */
var i3;
var logo;
var btnStart;
var txtSelectNo;
var flgRunning;
var WinNo;
var RemainNumber;
var taihiNumber;
var allNumber;
var allNumber2  = [] ;
var allNumber3;
/* 10ミリ秒ごとの繰り返し処理のID */
var timer;


/*  ---------- 画面起動時の処理 ---------- */

window.onload = function () {
	/* html上の部品(ドキュメントオブジェクト)とJavascriptの変数の対応付け */
	logo      = document.getElementById("logo");
	btnStart  = document.getElementById("btnStart");
	txtSelectNo  = document.getElementById("txtSelectNo");
	allNumber = document.getElementById("allNumber");
	
	/* 待機状態にするための各種処理 */
	 txtWinNo.textContent =0;
	 flgRunning =false;
	 RemainNumber = 75;
	/* 描画 */
	allNumber2.push(0);
	for (var i = 1; i <= RemainNumber; i++) {
		allNumber2.push(i);
	}

	for ( i3 = 1; i3 <= RemainNumber; i3++) {
		addElement3();
	}

	/* 開始ボタンのテキスト"スタート"に書き換える */
	btnStart.textContent = "スタート";
	/* 開始ボタンのテキスト"スタート"に書き換える */
	btnViewChg.textContent = "表示切替";
	allNumber.textContent = "";
	display1.style.display = "block";
	display2.style.display = "none";


}

/*  ---------- ボタンクリック時のイベント処理 ---------- */

/* 開始終了ボタンクリック */
function clkStartStop() {

	/* 処理状態が稼働中の場合 */
	if (flgRunning == true) {
		/* 待機中へ状態変更 */
		toStandby();
	} else {
	/* 処理状態が待機中の場合 */
		/* 稼働中へ状態変更 */
		toRun();
	}
}

/* 開始終了ボタンクリック */
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

/* 待機中にするための各種処理 */
function toStandby() {
	clearInterval(timer);
	/* 稼働中フラグをonに */
	flgRunning = false;
	/* アイコンを点滅 */
	logo.className = "logo";
	text.className = "text2";
	addElement();

	document.getElementById("li"+allNumber2[WinNo]).className = "text5";

	taihiNumber = allNumber2[WinNo] ;
	allNumber2[WinNo]  = allNumber2[RemainNumber] ;
	allNumber2[RemainNumber]  = taihiNumber ;
	RemainNumber = RemainNumber - 1;
	btnStart.textContent = "スタート";
	if (RemainNumber == 0) {
	/* 開始終了ボタンを無効に */
		btnStart.disabled = true;
	}
}

var addElement = function(){
  // 新しいdiv要素を作成、コンテンツ追加
  var newDiv = document.createElement("li");
  var newContent = document.createTextNode(allNumber2[WinNo]);
  //新しく作成したdivにテキストノードを追加
  newDiv.appendChild(newContent);
  // 作成したdivをDOM内へ追加
  document.getElementById("allNumber").appendChild(newDiv);
}

var addElement3 = function(){
  // 新しいdiv要素を作成、コンテンツ追加
  var newDiv = document.createElement("li");
  newDiv.setAttribute ("id","li"+i3);
  var newContent = document.createTextNode(i3);
  //新しく作成したdivにテキストノードを追加
  newDiv.appendChild(newContent);
  // 作成したdivをDOM内へ追加
  document.getElementById("allNumber3").appendChild(newDiv);
	document.getElementById("li"+i3).className = "text4";
}



/* 稼働中に状態変更 */
function toRun() {
	/* 10ミリ秒ごとに残り時間を計算するタイマー処理 開始 */
	timer = setInterval(calcTimer, 10);
	/* 稼働中フラグをonに */
	flgRunning = true;
	/* 開始終了ボタンのテキスト"STOP"に書き換える */
	btnStart.textContent = "ストップ";
	/* アイコンを点滅 */
	logo.className = "logo_blink";
	text.className = "text";
}

/* タイマー処理 */
function calcTimer() {
	 WinNo = Math.ceil(Math.random() * RemainNumber);
	 txtWinNo.textContent = allNumber2[WinNo] ;
}

