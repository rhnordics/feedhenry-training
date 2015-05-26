## Lab 04 - mBaaS APIs - Data Storage

### Instructions
1. Navigate to **Projects** area
2. Click on **New Project**
3. Select **AngularJS Hello World Project** template and give your project a unique name
4. Click on **Finish**
5. Navigate to **Git Quickstart**
6. Clone the client and cloud apps onto your local environment

  ```shell
  git clone git@redhat-demos-t.sandbox.feedhenry.com:redhat-demos-t/Triply-Cloud-App.git triply-cloud-app
  git clone git@redhat-demos-t.sandbox.feedhenry.com:redhat-demos-t/Triply-Triply.git triply-client
  ```

Note that the git repo url will be different from the ones above.

7. Copy the provided client and cloud-app project onto the cloned git repos

  ```shell
  cp -r lab-04/support/triply-client/ triply-client
  cp -r lab-04/support/triply-cloud-app/ triply-cloud-app
  ```

8. Commit and push the changes on the client app to the remote git repo

  ```shell
  cd triply-client
  git add .
  git commit -a -m "client app added"
  git push origin master
  ```

9. Commit and push the changes on the cloud app to the remote git repo

  ```shell
  cd triply-cloud-app
  git add .
  git commit -a -m "cloud app added"
  git push origin master
  ```

11. Check out the preview in FeedHenry Studio to verify the app is deployed correctly.

  [PIC preview-trips-empty.png]

10. Explore **application.js**. There are two routes defined for working with User and Trips:

  ```javascript
  app.use('/trips', require('./lib/trips.js')());
  app.use('/users', require('./lib/users.js')());
  ```

Open and check out **lib/trips.js**.

11. Add a *POST* request handler that uses the mBaaS Database Storage API (*$fh.db*) to create a Trip object using the query parameters *from*, *to*, *date*, *userId* and *userName*. The Trip object is persisted in a MongoDB instance on FeedHenry platform.

  ```javascript
    var options = {
      "act": "create",
      "type": "trip",
      "fields": {
        "from": req.body.from,
        "to": req.body.to,
        date: req.body.date,
        userId: req.body.userId,
        userName: req.body.userName
      }
    };

    $fh.db(options, function (err, data) {
      if (err) {
        console.error("Error " + err);
        res.json({"result": "error", "message":  err });
      } else {
        console.log(JSON.stringify(data));
        res.json({result: 'success'});
      }
    });
  ```


11. Add a *GET* request handler that uses the mBaaS Database Storage API (*$fh.db*) to retrieve and return all Trip objects from the MongoDB database.

  ```javascript
  var options = {
    "act": "list",
    "type": "trip"
  };

  $fh.db(options, function (err, data) {
    if (err) {
      console.error("Error " + err);
    } else {

      if (data.count == 0) {
        res.json([]);
      } else {
        var list = [];
        for (var i = 0; i < data.list.length; i++) {
          list[i] = data.list[i].fields;
        }

        res.json(list.reverse());
      }
    }
  });
```

12. Commit and push the changes to the gir repository.

  ```shell
  git commit -a -m "trips req handler updated"
  git push
  ```

13. Use a REST client or *curl* to verify that the *trips* API works correctly. Replace the host with your cloud app url which is listed under *Details* tab in the project in FeedHenry Studio.

  [PIC project-host-url.png]

  Add Trip
  ```shell
  curl -X POST \
   -H 'Content-Type: application/json' \
   -d '{"from":"Stockholm", "to":"Bercelona","date":"2015-08-21","userId":"666","userName":"Siamak"}' \
   https://projectid.feedhenry.com/trips
  ```

  List Trips
  ```shell
  curl https://projectid.feedhenry.com/trips
  # pretty print if python 2.6+ installed
  curl https://projectid.feedhenry.com/trips | python -m json.tool

  ```

14. Now you should be able to add and list Trips through the client app in the preview panel or on your device.

15. OPTIONAL Add the *users* REST API for registering users with *name*, *mobile*, *code*
and *verified* attributes and verifying their identity through the generate verification code.

  Register
  ```javascript
  var name = req.body.name;
  var mobile = req.body.mobile;
  // random number as verification code
  var code = Math.round(Math.random() * (999999 - 100000) + 100000);
  console.log("code = " + code);

  var options = {
    "act": "create",
    "type": "user",
    "fields": {
      "name": name,
      "mobile": mobile,
      "code": code,
      "verified": false
    }
  };

  $fh.db(options, function (err, data) {
    if (err) {
      console.error("Error " + err);
      res.json({"result": "error", "message":  err });
    } else {
      var user = data.fields;
      user.id = data.guid;

      res.json({"result": "success", "user":  user });
    }
  });
  ```

  Verify

```javascript
  var options = {
      "act": "read",
      "type": "user",
      "guid": req.body.id
  }

  $fh.db(options, function (err, data) {
    if (err) {
      console.error("Error " + err);
      res.json({"result": "error", "message":  err });
    } else {
      if (data.fields.code == req.body.code) {
        // update user
        options = {
          "act": "update",
          "type": "user",
          "guid": req.body.id,
          "fields": {
            "verified": true
          }
        };

        $fh.db(options, function (err, data) {
          if (err) {
             // handle error
             res.json({"result": "fail", "msg":  'Something went wrong' });
             return;
          } else {
            // handle success
          }
        });


        res.json({"result": "success"});

      } else {
        res.json({"result": "fail", "msg":  'Invalid code' });
      }
    }
  });
```

16. OPTIONAL Verify the *users* API works

  Register User
  ```shell
  curl -X POST \
   -H 'Content-Type: application/json' \
   -d '{"name":"Sarah", "mobile":"+46731112222"}' \
   https://projectid.feedhenry.com/users/register
  ```

  Verify User
  ```shell
  curl -X POST \
   -H 'Content-Type: application/json' \
   -d '{"id":"REPLACE-WITH-USER-ID", "code":"REPLACE-WITH-CODE"}' \
   https://projectid.feedhenry.com/users/verify
  ```
