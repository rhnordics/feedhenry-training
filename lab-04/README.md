## Lab 04 - mBaaS APIs - Database Storage

### Instructions
1. Navigate to **Projects** area

2. Click on **New Project**

3. Select **AngularJS Hello World Project** template and give your project a unique name

4. Click on **Finish**

5. Navigate to **Git Quickstart**

6. Clone the cloud app into your local environment

  ```shell
  git clone git@redhat-demos-t.sandbox.feedhenry.com:redhat-demos-t/Triply-Cloud-App.git triply-cloud-app
  ```

  Note that the git repo url will be different from the one above.

7. Copy the provided cloud-app project onto the cloned git repos

  ```shell
  cp -r lab-04/support/triply-cloud-app/ triply-cloud-app
  ```

8. Commit and push the changes to the remote git repo

  ```shell
  cd triply-cloud-app
  git add .
  git commit -a -m "cloud app added"
  git push origin master
  ```

10. In the root of the cloud app, explore *application.js*. There are two routes defined for working with User and Trips:

  ```javascript
  app.use('/trips', require('./lib/trips.js')());
  app.use('/users', require('./lib/users.js')());
  ```

  Open and explore *lib/trips.js*.

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

12. Commit and push the changes to the remote git repo.

13. Use a REST client or *curl* to verify that the *trips* API works correctly. Replace the host with your cloud app url which is listed under *Details* tab in the cloud app project in FeedHenry Studio.

  ![Cloud App Host URL](https://github.com/rhnordics/feedhenry-training/blob/master/images/project-host-url.png?raw=true)

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

14. Now you should be able to add and list Trips through the app in the preview panel or on your device.

15. **OPTIONAL** Use the Cache mBaaS API (*$fh.cache*) to cache the list of trips. Make sure the list is invalidated when a new *Trip* object is created. You can find more details on the Cache API in FeedHenry Docs:

  http://docs.feedhenry.com/v3/api/api_cache.html
