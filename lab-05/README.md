## Lab 05 - mBaaS APIs - Cloud

### Instructions

1. Clone the client app from the previous lab onto your local environment

  ```shell
  git clone git@redhat-demos-t.sandbox.feedhenry.com:redhat-demos-t/Triply-App.git triply-app
  ```

  Note that the git repo url will be different from the one above.

2. Copy the provided app project onto the cloned git repos

  ```shell
  cp -r lab-05/support/triply-app/ triply-app
  ```

3. Commit and push the changes the remote git repo

  ```shell
  cd triply-app
  git add .
  git commit -a -m "mobile app added"
  git push origin master
  ```

4. Check out the app in the **Preview** panel in **FeedHenry Studio** and try to create a new Trip. The Trip list won't get updated since it's not wired to the backend (that's what you will be doing next!)

  ![Triply App](https://github.com/rhnordics/feedhenry-training/blob/master/images/preview-trips-empty.png?raw=true)


5. Open *www/trip-list.html* and add a cloud call using the Cloud API (*$fh.cloud*) in order to retrieve the list of Trips.

  ```javascript
  $fh.cloud({
    "path": "/trips",
    "method": "GET",
    "contentType": "application/json",
    "timeout": 10000
  }, function(res) {
    document.querySelector('trip-list').trips = res;

  }, function(msg,err) {
    console.log(err);
  });
  ```

6. Open *www/trip-add.html* and using the Cloud API (*$fh.cloud*), add a cloud call to save the new Trip.

  ```javascript
  $fh.cloud({
    "path": "/trips",
    "method": "POST",
    "data": { "from": this.from, "to": this.to, "date": this.date, "userId": this.$.globals.values.user.id, "userName": this.$.globals.values.user.name },
    "contentType": "application/json",
    "timeout": 10000
  }, function(res) {
  }, function(msg,err) {
  });
  ```

7. Commit and push the changes the remote git repo.

8. Verify adding new Trips and Trip list works properly in the Preview panel in FeedHenry Studio. Alternative install the app on your device to verify the functionality.

9. The app currently doesn't include user registration. Enable the registration view by adding the following snippet to the end of the last ```<script>``` block in . Explore *www/user-register.html* and *www/user-verify.html* to locate the cloud calls for registration and verification of user's identity.

  ```javascript
  window.addEventListener('polymer-ready', function(e) {
    if (globals.isUserVerified()) { // already registered and verified
      globals.load();
      pages.selected = 0;
    } else {
      pages.selected = 2;
    }
  });
  ```

9. Commit and push the changes the remote git repo and check out the app in the **Preview**. Try to register with your name and mobile number. The backend is not connected to any SMS service yet. In order to verify your account go to **FeedHenry Studio** and **Data Browser** in triply-cloud-app. Find the verification code and enter the code to verify your account.

  ![Triply App Registration](https://github.com/rhnordics/feedhenry-training/blob/master/images/preview-register.png?raw=true)
  ![Triply App Registration](https://github.com/rhnordics/feedhenry-training/blob/master/images/preview-verification.png?raw=true)

10. **OPTIONAL Install** the app on your phone!
