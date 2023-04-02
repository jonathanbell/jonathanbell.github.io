---
title: Microsoft Cognitive Services with PHP
description: My first use of 3rd party AI
pubDate: 2018-04-11
layout: ../../layouts/Post.astro
---

## Checking Out Microsoft Cognitive Services with PHP

I was listening to [the Shoptalk Show podcast](https://shoptalkshow.com/episodes/299-machine-learning-paige-bailey/) the other day and heard about this crazy new(?) thing that Microsoft and some of the other big data players are cooking up.

[Cognitive services](http://microsoft.com/cognitive) is a form of artificial intelligence because you have to train it first on a controlled dataset and then it gets smarter and more accurate based on its previous models.

Naturally, I was just curious enough to see if I could get some semi-decent data out of the thing. Here's what I did.

### Really really really simple example in PHP

First off, choose which service you'd like to check out. [There are lots.](https://azure.microsoft.com/en-us/services/cognitive-services/) I was interested in the [Vision](https://azure.microsoft.com/en-us/services/cognitive-services/directory/vision/) and [Face Verification](https://azure.microsoft.com/en-us/services/cognitive-services/face/) APIs.

I don't want to share my API keys with you so you'll have to go and get your own (for each cognitive API that you'd like to checkout). For the Microsoft Vision API, poke your nose around here: <https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/vision-api-how-to-topics/howtosubscribe>

Once you have your API keys setup, you can view all of them at this URL: <https://azure.microsoft.com/en-us/try/cognitive-services/my-apis/>

**Note that at the time of writing your trial API keys will expire after 30 days.** (April 2018) After that, you'll have to sign up but [the costs are pretty low](https://azure.microsoft.com/en-ca/pricing/details/cognitive-services/face-api/).

#### Vision API Example in PHP

Let's start with an image on the Internet. Just pick one. Any one... I'll wait... Actually.. um, how about this one:

![a man and a woman posing for a photo](/pictures/istockphoto-926595016-170667a.jpg)

Cool, ok.. Let's create a script that will feed that image to the MS Cognitive Services!

```php
<?php

$body = '{"url": "https://media.istockphoto.com/id/926595016/photo/he-vs-she-happy-together-close-up-portrait-of-attractive-caucasian-lovely-cute-adult-couple-in.jpg"}';

// Create a stream
$opts = [
  "http" => [
    "method" => "POST",
    "header" => "Ocp-Apim-Subscription-Key: YOUR_API_KEY_GOES_HERE\r\n" .
      "Content-Type: application/json\r\n",
    "content" => $body,
    sprintf('Content-Length: %d', strlen($body))
  ]
];

$context = stream_context_create($opts);

// Open the JSON response using the HTTP headers set above
$json = file_get_contents('https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories,Tags,Description,Faces,Adult&language=en', false, $context);

echo $json.PHP_EOL;
```

If we save that script with a name like `example.php`, we can then call it from the command line.

```bash
php example.php
```

Which returns JSON from Cognitive Services with pretty accurate information about our photo!

```json
{
  "categories": [
    { "name": "others_", "score": 0.00390625 },
    { "name": "people_", "score": 0.69140625, "detail": { "celebrities": [] } }
  ],
  "tags": [
    { "name": "person", "confidence": 0.99869954586029053 },
    {
      "name": "standing",
      "confidence": 0.92608910799026489
    },
    { "name": "posing", "confidence": 0.86872708797454834 }
  ],
  "description": {
    "tags": [
      "person",
      "standing",
      "posing",
      "photo",
      "woman",
      "man",
      "white",
      "black",
      "couple",
      "young",
      "dress",
      "wedding",
      "holding",
      "wearing",
      "cake",
      "people",
      "group",
      "room"
    ],
    "captions": [
      {
        "text": "a man and a woman posing for a photo",
        "confidence": 0.88769173848231653
      }
    ]
  },
  "faces": [
    {
      "age": 21,
      "gender": "Male",
      "faceRectangle": { "top": 94, "left": 240, "width": 82, "height": 82 }
    },
    {
      "age": 27,
      "gender": "Female",
      "faceRectangle": { "top": 114, "left": 317, "width": 80, "height": 80 }
    }
  ],
  "adult": {
    "isAdultContent": false,
    "adultScore": 0.19785866141319275,
    "isRacyContent": false,
    "racyScore": 0.20760928094387054
  },
  "requestId": "edadd256-4a47-4717-9e08-fbb3d174658c",
  "metadata": { "height": 667, "width": 500, "format": "Jpeg" }
}
```

Look at all that tasty data! For example the `description.tags` section contains: _person_, _standing_, and _posing_ and the confidence is very high for each of those tags. These tags could be used to sort and classify your images.

The `captions.text` value could be used to create automatic `alt` attributes in your HTML. Just a thought for a practical use case of this tech.

One glitch might be; the female's age has been guessed a little high at 27.

Now just close your eyes and picture [that scene in The Terminator](https://youtu.be/9UjqWSAF7uE?t=3m15s) where Arnold is looking for Sarah Connor and he scans people's faces and other pieces of the real world and the data values come up on his internal HUD display like:

```
gender: female
age: 27
height: 170cm
target_match: false
```

In the future the Skynet could use this technology against us but for the time being, I think it's pretty cool. 😉

### Links

* [MS Face API PHP quickstart example](https://docs.microsoft.com/en-us/azure/cognitive-services/face/quickstarts/php) (official docs)
* [Obtaining Azue subscription keys](https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/vision-api-how-to-topics/howtosubscribe) (official docs)
