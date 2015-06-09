## Lab 02 - Hello World Cloud App

1. Login to FeedHenry Studio

2. Navigate to **Projects** area

3. Click on **New Project**

4. Select **Hello World Project** template

5. Click on **Finish**

6. Explore the project

7. Go to the **Editor** section of **Cloud App**

8. Modify **application.js** and add the **bye** REST endpoint:

  ```javascript
  app.use('/hello', require('./lib/hello.js')());
  app.use('/bye', require('./lib/bye.js')());
  ```
9. Create a new file called **bye.js** in the **lib** folder with the following content:

  ```javascript
  var express = require('express');
  var bodyParser = require('body-parser');
  var cors = require('cors');

  function byeRoute() {
    var bye = new express.Router();
    bye.use(cors());
    bye.use(bodyParser());

    bye.get('/', function(req, res) {
      console.log(new Date(), 'In bye route GET / req.query=', req.query);
      var world = req.query && req.query.bye ? req.query.bye : 'World';

      // see http://expressjs.com/4x/api.html#res.json
      res.json({msg: 'Bye ' + world});
    });

    return bye;
  }

  module.exports = byeRoute;
  ```

10. Deploy the **Cloud App**

11. Verify the the **bye** endpoint works in the browser by going to:
*http://appdomain/bye?bye=North*

12. **OPTIONAL** Modify *README.md* to generate docs for the */bye* REST endpoint
