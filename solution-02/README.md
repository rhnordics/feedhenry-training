# FeedHenry Hello World MBaaS Server

This is a blank 'hello world' FeedHenry MBaaS. Use it as a starting point for building your APIs.

# Group Hello World API

# hello [/hello]

'Hello world' endpoint.

## hello [POST]

'Hello world' endpoint.

+ Request (application/json)
    + Body
            {
              "hello": "world"
            }

+ Response 200 (application/json)
    + Body
            {
              "msg": "Hello world"
            }


# bye [/bye?bye]

'Bye world' endpoint.

## bye [GET]

'Bye world' endpoint.

+ Parameters
    + bye: `world` (string, required)
        + Default: `world`

+ Response 200 (application/json)
    + Body
            {
              "msg": "Bye world"
            }
