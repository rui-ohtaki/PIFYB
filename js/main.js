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
  tabsContainer
    .find(`.tabs__menu a[href='#${tabName}']`)
    .parent('li')
    .addClass('active');

  // .tabs__contentの直下の要素をすべて非表示
  tabsContainer.find('.tabs__content > *').css({ display: 'none' });
  // #<tabName>と.tabs__content .<tabName>を表示
  tabsContainer
    .find(`#${tabName}, .tabs__content .${tabName}`)
    .css({
      display: 'block',
      opacity: 0.7,
    })
    .animate(
      {
        opacity: 1,
      },
      400,
    );
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

  // 本来のクリックイベントは処理しない
  e.preventDefault();

  $('html, body').animate(
    {
      scrollTop: $(destination).offset().top,
    },
    1000,
  );

  // ハンバーガーメニューが開いている場合は閉じる
  $('.navbar-toggler:visible').trigger('click');
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
  $('.top__video').css({ display: 'block' });
}

// 初期状態として1番目のタブを表示
showTab('puppies-1');
showTab('kittens-1');

// パララックスを初期化する
initParallax();


// ビュー（画面）を変更する
const showView = (id) => {
  $('.view').hide();
  $(`#${id}`).fadeIn();

  if (id === 'chat') {
    loadChatView();
  }
};

// ログインフォームを初期状態に戻す
const resetLoginForm = () => {
  $('#login-form > .form-group').removeClass('has-error');
  $('#login__help').hide();
  $('#login__submit-button')
    .prop('disabled', false)
    .text('ログイン');
};

// ログインした直後に呼ばれる
const onLogin = () => {
  console.log('ログイン完了');

  // チャット画面を表示
  showView('chat');
};

// ログアウトした直後に呼ばれる
const onLogout = () => {
  firebase
    .database()
    .ref('users')
    .off('value');
  firebase
    .database()
    .ref('rooms')
    .off('value');
  currentRoomName = null;
  dbdata = {};
  resetLoginForm();
  resetChatView();
  resetSettingsModal();
  resetFavoritesListModal(); // お気に入り一覧のモーダルを初期化
  showView('login');
};

// ユーザ作成のときパスワードが弱すぎる場合に呼ばれる
const onWeakPassword = () => {
  resetLoginForm();
  $('#login__password').addClass('has-error');
  $('#login__help')
    .text('6文字以上のパスワードを入力してください')
    .fadeIn();
};

// ログインのときパスワードが間違っている場合に呼ばれる
const onWrongPassword = () => {
  resetLoginForm();
  $('#login__password').addClass('has-error');
  $('#login__help')
    .text('正しいパスワードを入力してください')
    .fadeIn();
};

// ログインのとき試行回数が多すぎてブロックされている場合に呼ばれる
const onTooManyRequests = () => {
  resetLoginForm();
  $('#login__submit-button').prop('disabled', true);
  $('#login__help')
    .text('試行回数が多すぎます。後ほどお試しください。')
    .fadeIn();
};

// ログインのときメールアドレスの形式が正しくない場合に呼ばれる
const onInvalidEmail = () => {
  resetLoginForm();
  $('#login__email').addClass('has-error');
  $('#login__help')
    .text('メールアドレスを正しく入力してください')
    .fadeIn();
};

// その他のログインエラーの場合に呼ばれる
const onOtherLoginError = () => {
  resetLoginForm();
  $('#login__help')
    .text('ログインに失敗しました')
    .fadeIn();
};

/**
 * ---------------------------------------
 * 以下、コールバックやイベントハンドラの登録と、
 * ページ読み込みが完了したタイミングで行うDOM操作
 * ---------------------------------------
 */

/**
 * --------------------
 * ログイン・ログアウト関連
 * --------------------
 */

// ユーザ作成に失敗したことをユーザに通知する
const catchErrorOnCreateUser = (error) => {
  // 作成失敗
  console.error('ユーザ作成に失敗:', error);
  if (error.code === 'auth/weak-password') {
    onWeakPassword();
  } else {
    // その他のエラー
    onOtherLoginError(error);
  }
};

// ログインに失敗したことをユーザーに通知する
const catchErrorOnSignIn = (error) => {
  if (error.code === 'auth/wrong-password') {
    // パスワードの間違い
    onWrongPassword();
  } else if (error.code === 'auth/too-many-requests') {
    // 試行回数多すぎてブロック中
    onTooManyRequests();
  } else if (error.code === 'auth/invalid-email') {
    // メールアドレスの形式がおかしい
    onInvalidEmail();
  } else {
    // その他のエラー
    onOtherLoginError(error);
  }
};

// ログイン状態の変化を監視する
firebase.auth().onAuthStateChanged((user) => {
  // ログイン状態が変化した

  if (user) {
    // ログイン済
    currentUID = user.uid;
    onLogin();
  } else {
    // 未ログイン
    currentUID = null;
    onLogout();
  }
});

// ログインフォームが送信されたらログインする
$('#login-form').on('submit', (e) => {
  e.preventDefault();

  // フォームを初期状態に戻す
  resetLoginForm();

  // ログインボタンを押せないようにする
  $('#login__submit-button')
    .prop('disabled', true)
    .text('送信中…');

  const email = $('#login-email').val();
  const password = $('#login-password').val();

  /**
   * ログインを試みて該当ユーザが存在しない場合は新規作成する
   * まずはログインを試みる
   */
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      console.log('ログイン失敗:', error);
      if (error.code === 'auth/user-not-found') {
        // 該当ユーザが存在しない場合は新規作成する
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            // 作成成功
            console.log('ユーザを作成しました');
          })
          .catch(catchErrorOnCreateUser);
      } else {
        catchErrorOnSignIn(error);
      }
    });
});

// ログアウトがクリックされたらログアウトする
$('#logout__link').on('click', (e) => {
  e.preventDefault();

  // ハンバーガーメニューが開いている場合は閉じる
  $('#navbarSupportedContent').collapse('hide');

  firebase
    .auth()
    .signOut()
    .then(() => {
      // ログアウト成功
      window.location.hash = '';
    })
    .catch((error) => {
      console.error('ログアウトに失敗:', error);
    });
});