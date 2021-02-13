<?php

$coname = $_POST['coname'];
$name = $_POST['name'];
$mail = $_POST['mail'];
$tel = $_POST['tel'];
$toiawase = $_POST['toiawase'];

$mailTO = $mail;
$mailHeader = "From: Perfect Images For Your Blog Contact";

$mailSubject = "お問い合わせありがとうございます";
$mailBody = $name . "様 お問い合わせありがとうございます";
$mailBody .= "お問い合わせの内容は、受付日から3営業日以内をめどにご返信いたします。";

mail($mailTO, $mailSubject, $mailBody, $mailHeader);

echo "

<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <title>Perfect Images For Your Blog|送信完了</title>
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <!-- Webフォント -->
  <link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet">
  <!-- Bootstrap CSS -->
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
  <!-- その他のライブラリのCSS -->
  <link href="css/vendor/animate.css" rel="stylesheet">
  <link href="css/vendor/magnific-popup.css" rel="stylesheet">
  <link href="css/main.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js">
  </script>
  <noscript>
  <!-- JavaScriptが無効化されている場合の追加スタイルシート -->
  <link href="css/noscript.css" rel="stylesheet">
  </noscript>
</head>

<body data-spy="scroll" data-target="#navbar">
  <div class="top">
    <!-- ナビゲーションバー -->
    <nav class="navbar fixed-top navbar-expand-md navbar-light bg-light">
      <div class="container-fluid">
        <!-- ホームリンク -->
         <a aria-label="ホーム" class="navbar-brand" href="#">
           <i aria-hidden="true" class="fab fa-blogger fa-2x"></i>
         </a>
         <!-- 画面幅が狭い時に表示されるハンバーガーメニュー -->
         <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler" data-target="#navbarSupportedContent" data-toggle="collapse" type="button">
           <span class="navbar-toggler-icon"></span>
         </button>
         <!-- メニュー -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="#top">Top</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">FAQ</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./contact.html">Contact</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./index.html">Logout</a>
            </li>
          </ul>
        </div>
        <!--/.nav-collapse -->
      </div>
      <!--/.container-fluid -->
    </nav>
    <div id="main_visual">
        <img src="img/thumbnail/contact.jpg" alt="お問い合わせ">
    </div>
  </div>
    <div class="container">
        <h1 class="mt-4 pb-4 border-bottom">送信完了</h1>
        <p>ありがとうございました。送信を受け付けました。</p>
        <p>3営業日以内をめどにご返信いたしますので、しばらくお待ちください。</p>
        <div class="text-center mb-4">
            <!-- 「戻る」ボタンを緑色にする設定を追加 -->
            <a href="contact.html" class="btn btn-success">戻る</a>
        </div>
    </div>
</body>

  <footer>
    &copy; 2021 Perfect Images for Your Blog
  </footer>

<!-- まずjQuery -->
  <script src="https://code.jquery.com/jquery-3.4.1.min.js">
  </script>
<!-- Popper.js, 次に Bootstrap JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js">
  </script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js">
  </script>
<!-- その他のライブラリのJavaScript -->
  <script src="js/vendor/jquery.waypoints.min.js">
  </script>
  <script src="js/vendor/jquery.magnific-popup.min.js">
  </script>
  <script src="js/vendor/mobile-detect.min.js">
  </script> <!-- Vue.js -->

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js">
  </script>
  <script src="js/vue-gallery.js">
  </script>
  <script src="js/main.js">
  </script> <!-- Font Awesome -->

  <script defer src="https://use.fontawesome.com/releases/v5.7.2/js/all.js">
  </script>
</body>

</html>";