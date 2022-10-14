<p align="center"><img src="https://www.rickklaasboer.nl/img/logo-black.svg" height="100px"/></p>

# discord-pinginator

Lamda function for pinging specific users using a discord webhook.

This project uses serverless to deploy to AWS.

## How to use

You should just use serverless to deploy to AWS

```sh
WEBHOOK_URL="https://discord.com/api/webhooks/123/abc"
yarn sls deploy
```

This will automagically create a S3 bucket for you to keep track of users to ping. This lambda expects a file called `pinginator.json` to be present in this bucket before running for the first time. The format should look something like this:

```json
{
    "<discord_user_id>": {
        "username": "<any name>",
        "avatar_url": "<any direct image link>",
        "content": "<any message, supports everything that discord does. Also replaces %day% with the current day>.",
        "day": 1
    }
}
```

# License (MIT)

Copyright 2022 Rick Klaasboer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
