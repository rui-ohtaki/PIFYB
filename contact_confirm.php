<?php
    $coname = $_POST['coname'];
    $name = $_POST['name'];
    $mail = $_POST['mail'];
    $tel = $_POST['tel'];    
    $toiawase = $_POST['toiawase'];

echo "

<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <title>Perfect Images For Your Blog|問い合わせ内容確認</title>
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
  会社名：$coname
  </br>
  お名前：$name
  </br>
  メールアドレス：$mail
  </br>
  電話番号：$tel
  </br>
  お問い合わせ内容
  </br>
  $toiawase
  </br>
  </br>
  <form action='complete.php' method='post'>
  <input type='hidden' name='coname' value='$coname'>
  <input type='hidden' name='name' value='$name'>
  <input type='hidden' name='mail' value='$mail'>
  <input type='hidden' name='tel' value='$tel'>
  <input type='hidden' name='toiawase' value='$toiawase'>
  <input type='button' onclick='history.back()' value='戻る'>
  <input type='submit' value='確認'>
  </form>
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
