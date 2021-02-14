/* global $ MobileDetect */
// モバイルブラウザかどうか判定
const isMobile = !!new MobileDetect(window.navigator.userAgent).mobile();
/**
 * ----------------------
 * 指定された名前のタブを表示
 * ----------------------
 */
const showTab = (tabName) => {
	// すでに表示されている場合は何もせずに終了
	if ($(`#${tabName}`).is(':visible')) {
		return;
	}
	const tabsContainer = $(`a[href='#${tabName}']`).closest('.tabs');
	// .tabs__menu liのうちtabNameに該当するものにだけactiveクラスを付ける
	tabsContainer.find('.tabs__menu li').removeClass('active');
	tabsContainer.find(`.tabs__menu a[href='#${tabName}']`).parent('li').addClass('active');
	// .tabs__contentの直下の要素をすべて非表示
	tabsContainer.find('.tabs__content > *').css({
		display: 'none'
	});
	// #<tabName>と.tabs__content .<tabName>を表示
	tabsContainer.find(`#${tabName}, .tabs__content .${tabName}`).css({
		display: 'block',
		opacity: 0.7,
	}).animate({
		opacity: 1,
	}, 400, );
};
/**
 * -------------
 * パララックス関連
 * -------------
 */
// 背景画像のスクロール速度。数字が小さいほど速い。
const parallaxXSpeed = 12;
const parallaxYSpeed = 3;
const parallaxXSpeedSmall = 5;
const parallaxYSpeedSmall = 1;
// パララックスを適用する関数
const showParallax = () => {
	const scrollTop = $(window).scrollTop();
	// 背景画像の位置をスクロールに合わせて変える
	const offsetX = Math.round(scrollTop / parallaxXSpeed);
	const offsetY = Math.round(scrollTop / parallaxYSpeed);
	const offsetXSmall = Math.round(scrollTop / parallaxXSpeedSmall);
	const offsetYSmall = Math.round(scrollTop / parallaxYSpeedSmall);
	$('.puppies').css({
		'background-position':
			// 一番上
			`${-offsetX}px ${-offsetY}px, ${
        // 上から2番目
        offsetXSmall
      }px ${-offsetYSmall}px, `
			// 一番下
			+ '0% 0%',
	});
	$('.kittens').css({
		'background-position':
			// 一番上
			`${offsetX}px ${-offsetY}px, ${
        // 上から2番目
        -offsetXSmall
      }px ${-offsetYSmall}px, `
			// 一番下
			+ '0% 0%',
	});
};
// パララックスを初期化する関数
const initParallax = () => {
	$(window).off('scroll', showParallax);
	if (!isMobile) {
		// モバイルブラウザでなければパララックスを適用
		showParallax();
		// スクロールのたびにshowParallax関数を呼ぶ
		$(window).on('scroll', showParallax);
	}
};
/**
 * ------------------
 * イベントハンドラの登録
 * ------------------
 */
/**
 * animatedクラスを持つ要素が画面内に入ったら
 * Animate.cssのfadeInUpエフェクトを適用
 */
$('.animated').waypoint({
	handler(direction) {
		if (direction === 'down') {
			$(this.element).addClass('fadeInUp');
			this.destroy();
		}
	},
	/**
	 * 要素の上端が画面のどの位置に来たときにhandlerメソッドを呼び出すか指定
	 * 0%なら画面の一番上、100%なら画面の一番下に来たときに呼び出される
	 */
	offset: '100%',
});
$(window).on('resize', () => {
	// ウインドウがリサイズされるとここが実行される
	initParallax();
});
// タブがクリックされたらコンテンツを表示
$('.tabs__menu a').on('click', (e) => {
	const tabName = $(e.currentTarget).attr('href');
	// hrefにページ遷移しない
	e.preventDefault();
	if (tabName[0] === '#') {
		// hrefの先頭の#を除いたものをshowTab()関数に渡す
		showTab(tabName.substring(1));
	}
});
/**
 * ナビゲーションバーのリンクをクリックしたら、
 * スムーズにスクロールしながら対象位置に移動
 */
$('.nav-link').on('click', (e) => {
	const destination = $(e.target).attr('href');
	if (destination.indexOf('#') === 0) {
	// 本来のクリックイベントは処理しない
	e.preventDefault();
	$('html, body').animate({
		scrollTop: $(destination).offset().top,
	}, 1000, );
	// ハンバーガーメニューが開いている場合は閉じる
	$('.navbar-toggler:visible').trigger('click');
	}
});
/**
 * -----------------------------------------
 * ページの読み込みが完了したタイミングで行うDOM操作
 * -----------------------------------------
 */
// モバイルブラウザでは静止画を表示し、それ以外では動画を表示
if (isMobile) {
	$('.top__bg').css({
		'background-image': 'url(video/top-video-still.jpg)',
	});
} else {
	$('.top__video').css({
		display: 'block'
	});
}
// 初期値を設定
let num = 0;
// ログインユーザのUID
let currentUID = null;
const getValue = () => {
	// 現在のmykeyの値を取得
	firebase.database().ref('mykey').on('value', (snapshot) => {
		// データの取得が完了すると実行される
		const snapshotValue = snapshot.val();
		// 取得した値が数値かを判定
		if (Number.isFinite(snapshotValue)) {
			num = snapshotValue;
		}
		console.log(`Got value: ${num}`);
	});
};
const setValue = () => {
	num += 1;
	console.log(`set: ${num}`);
	// Firebase上のmykeyの値を更新
	firebase.database().ref('mykey').set(num);
};

const createUser = (mail, pass) => {
	firebase.auth().createUserWithEmailAndPassword(mail, pass)
		.then((userRecord) => {
			firebase.auth().signInWithEmailAndPassword(mail, pass) // ログイン実行
				.then((user) => {
					// ログインに成功したときの処理
					console.log('ログインしました', user);
					location.href = "index2.html";
			});
		});
}

const logIn = (mail, pass) => {
    firebase.auth().signInWithEmailAndPassword(mail, pass) // ログイン実行
        .then((user) => {
            // ログインに成功したときの処理
            console.log('ログインしました', user);
            currentUID = user.uid;
            location.href = "index2.html";
        }).catch((error) => {
            // ログインに失敗したときの処理
            console.error('ログインエラー', error);
            createUser(mail,pass);
        });
};
const logOut = () => {
    firebase.auth().signOut() // ログアウト実行
        .then(() => {
            // ログアウトに成功したときの処理
            console.log('ログアウトしました');
            currentUID = null;
        }).catch((error) => {
            // ログアウトに失敗したときの処理
            console.error('ログアウトエラー', error);
        });
};

const changeView = () => {
	if (currentUID != null) {
		// ログイン状態のとき
		$('.visible-on-login').removeClass('hidden-block').addClass('visible-block');
		$('.visible-on-logout').removeClass('visible-block').addClass('hidden-block');
	} else {
		// ログアウト状態のとき
		$('.visible-on-login').removeClass('visible-block').addClass('hidden-block');
		$('.visible-on-logout').removeClass('hidden-block').addClass('visible-block');
	}
};
// ユーザのログイン状態が変化したら呼び出される、コールバック関数を登録
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		console.log('状態：ログイン中');
		currentUID = user.uid;
		changeView();
		getValue();
	} else {
		console.log('状態：ログアウト');
		currentUID = null;
		changeView();
	}
});
// id="my-button"をクリックしたら呼び出される、イベントハンドラを登録
$('#my-button').on('click', () => {
	setValue();
});
// id="login-button"をクリックしたら呼び出される、イベントハンドラを登録
$('#login-button').on('click', () => {
	const mail = $('#user-mail').val();
	const pass = $('#user-pass').val();
	logIn(mail, pass);
});
// id="logout-button"をクリックしたら呼び出される、イベントハンドラを登録
$('#logout-button').on('click', () => {
	logOut();
	location.href = "index.html";
});

// id="return-button"をクリックしたら呼び出される、イベントハンドラを登録
$('#return-button').on('click', (e) => {
    e.preventDefault();
    if (currentUID != null) {
    // ログイン状態のとき
    location.href="index2.html";
  } else {
    // ログアウト状態のとき
    location.href="index.html";
  }
});