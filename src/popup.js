import initApp from './app/index.jsx'
import VeggiePopup from './app/components/VeggiePopup/VeggiePopup.jsx'

/*
<!doctype html>
<html>
  <head>
    <title>Veggie Chrome Extension Dev Tool</title>
    <style>
      .Veggie-popup {
        display: inline-block;
        min-width: 200px;
        text-align: center;
      }

      .Veggie-message--success,
      .Veggie-message--failed {
        display: none;
      }

      .Veggie-popup.success .Veggie-message--success {
        display: inline-block;
      }

      .Veggie-popup.failed .Veggie-message--failed {
        display: inline-block;
      }
    </style>
  </head>
  <body>
    <meta charset="utf-8">
    <div id="veggie-popup" class="Veggie-popup">
      <p class="Veggie-message Veggie-message--failed">
        Veggie not detected...
      </p>
      <p class="Veggie-message Veggie-message--success">
        Veggie detected! Open DevTools and look for the Veggie panel.
      </p>
    </div>
    <script src="popup.js"></script>
  </body>
</html>
*/

initApp(VeggiePopup)

