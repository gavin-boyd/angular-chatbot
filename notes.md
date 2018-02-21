{
  "id": "6399b503-1dbb-4b24-9e8e-542f925ac3d2",
  "timestamp": "2018-02-10T20:22:30.083Z",
  "lang": "en",
  "result": {
    "source": "agent",
    "resolvedQuery": "russia",
    "action": "",
    "actionIncomplete": false,
    "parameters": {
      "geo-country": "Russian Federation"
    },
    "contexts": [
      {
        "name": "user-email",
        "parameters": {
          "geo-country.original": "russia",
          "email.original": "g.boyd@ulster.ac.uk",
          "email": [
            "g.boyd@ulster.ac.uk"
          ],
          "geo-country": "Russian Federation"
        },
        "lifespan": 5
      },
      {
        "name": "email-followup",
        "parameters": {
          "geo-country.original": "russia",
          "email.original": "g.boyd@ulster.ac.uk",
          "email": [
            "g.boyd@ulster.ac.uk"
          ],
          "geo-country": "Russian Federation"
        },
        "lifespan": 5
      },
      {
        "name": "user-country",
        "parameters": {
          "geo-country.original": "russia",
          "geo-country": "Russian Federation"
        },
        "lifespan": 5
      }
    ],
    "metadata": {
      "intentId": "f28e050a-44e8-45f6-bd0a-be1252b7d984",
      "webhookUsed": "false",
      "webhookForSlotFillingUsed": "false",
      "intentName": "country"
    },
    "fulfillment": {
      "speech": "Russian Federation! Cool, we have many students from Russian Federation",
      "messages": [
        {
          "type": "simple_response",
          "platform": "google",
          "textToSpeech": "Russian Federation! Cool, we have many students from Russian Federation"
        },
        {
          "type": "simple_response",
          "platform": "google",
          "textToSpeech": "This is a google assistant integration response!"
        },
        {
          "type": 0,
          "speech": "Russian Federation! Cool, we have many students from Russian Federation"
        }
      ]
    },
    "score": 1
  },
  "status": {
    "code": 200,
    "errorType": "success",
    "webhookTimedOut": false
  },
  "sessionId": "55292f4a-f982-46d7-b357-9b4564ad2e21"
}
