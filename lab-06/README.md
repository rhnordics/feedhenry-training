## Lab 06 - mBaaS Services

The registration form currently generates a verification code and persist it in the Mongo database. An SMS needs to be sent to the user with the generated code in order to verify the registered mobile number. Twilio which is a cloud-based API for text messaging will be used for this purpose.

### Instructions

1. In FeedHenry Studio click on *Services & APIs* on the top menu.

2. Browse the list of mBaaS Services and check if a Twilio service already exists. Skip to step 5 if it is already listed.

3. Click on *Provision mBaaS Service/API* to create a new mBaaS service. Browse the list of available mBaaS Service implementations and choose *Twilio Connector* which is ready-to-use connector for Twilio APIs. Specify a name and click *Next*. Fill in the configuration settings and click on *Next* and then *Finish*.

4. Currently there is a bug in the platform that fails to create environment variables for the configuration settings. Go to *Environment Variables* and create the following environment variables. Click on *Push Environment Variables* afterwards. Verify Twilio service works by using the api browser in *Docs*.

  Environment Variables:
  * TWILIO_NUMBER
  * TWILIO_AUTH
  * TWILIO_SID

5. Go the *Apps, Cloud Apps & Services* of Triply project

6. Click on the plus sign on the right-most column *mBaaS Services* and pick the **Twilio** service created above. Click on *Associate Services* to add that mBaaS service to the project.

  ![Triply Apps](https://github.com/rhnordics/feedhenry-training/blob/master/images/project-apps.png?raw=true)

7. We need to modify the cloud app to use the Twilio service for sending the verification code to the user as an SMS.

8. Open *lib/users.js* and use the *fh.service* App Cloud API, in order to use the Twilio mBaaS Service added above for sending the SMS. Notice the *TWILIO_SERVICE_ID* environment variable used in the code. We will define the value for this environment variable in the following steps.

  ```javascript
  $fh.service({
    "guid": process.env.TWILIO_SERVICE_ID,
    "path": "/cloud/sms",
    "method": "POST",
    "params": {
      "to": mobile,
      "body": 'Verification code ' + code + ' /Triply'
      }
  }, function(err, body, res) {
    if (err) {
      // An error occurred
      console.log('Twilio service call failed: ', err);
    } else {
      console.log('Twilio response Body: ', body);
    }
  });

  res.json({"result": "success", "user":  user });
  ```

You can read more on *$fh.service* API in FeedHenry Docs: http://docs.feedhenry.com/v3/api/cloud_api.html#cloud_api-_fh_service

9. Commit and push the changes to the remote git repo

10. Go to *FeedHenry Studio* and *Environment Variables* tab in the Triply cloud app. Add an environment variable with *TWILIO_SERVICE_ID* as the name and the service id of the Twilio mBaaS Service you created in the beginning of this lab as the value. You can find the Servie ID under the *Details* tab of the Twilio service project. Click on *Push Environment Variables* when done.

11. Go to *Docs* tab and test the cloud app API to verify the SMS function works.
