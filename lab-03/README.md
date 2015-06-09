## Lab 03 - Hello World Client App

### Instructions
1. Go to the **Editor** section of the **Cordova Light App**

2. Add a new button to index.html for the "bye" REST endpoint. The html will look like this:

  ```html
  <button id="say_hello" type="button" class="say-hello-button">Say Hello From The Cloud</button>
  <button id="say_bye" type="button" class="say-hello-button">Say Bye From The Cloud</button>
  ```
3. Add the following snippet to the end of **www/hello.js**:

  ```javascript
  document.getElementById('say_bye').onclick = function () {
    document.getElementById('cloudResponse').innerHTML = "<p>Calling Cloud.....</p>";
    $fh.cloud(
        {
          path: 'bye?bye=' + document.getElementById('hello_to').value,
          method: 'GET'
        },
        function (res) {
          document.getElementById('cloudResponse').innerHTML = "<p>" + res.msg + "</p>";
        },
        function (code, errorprops, params) {
          alert('An error occured: ' + code + ' : ' + errorprops);
        }
    );
  };
  ```
4. Verify the changes in the preview panel

5. Go to **Build** section and create binaries for your device. Notice the selection of Cloud App.

6. Install the app on your device and verify it works!

7. [OPTIONAL] Change the app icon for your device, rebuild and reinstall the app.
