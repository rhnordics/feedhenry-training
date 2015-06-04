## Lab 06 - mBaaS Services

The registration form currently generates a verification code and persist it in the Mongo database. An SMS needs to be sent to the user with the generated code in order to verify the registered mobile number. Twilio which is a cloud-based API for text messaging will be used for this purpose.

### Instructions

1. In FeedHenry Studio click on *Services & APIs* on the top menu.

2. Browse the list of mBaaS Services and check if a Twilio service already exists. Skip to step 5 if it is already listed.

3. Click on *Provision mBaaS Service/API* to create a new mBaaS service. Browse the list of available mBaaS Service implementations and choose *Twilio Connector* which is ready-to-use connector for Twilio APIs. Specify a name and click *Next*. Fill in the following configuration values and click on *Next* and then *Finish*.

[TBD]

4. Currently there is a bug in the platform that fails to create environment variables for the configuration settings. Go to *Environment Variables* and create the above settings as environment variables. Click on *Push Environment Variables* afterwards. Verify Twilio service works by using the api browser in *Docs*.

5. Go the *Apps, Cloud Apps & Services* of Triply project

6. Click on the plus sign on the right-most column *mBaaS Services* and pick the **Twilio** service created above. Click on *Associate Services* to add that mBaaS service to the project.

![Triply Apps](https://github.com/rhnordics/feedhenry-training/blob/master/images/project-apps.png?raw=true)
