Generate Enhanced Prompts
Improve your prompts or create random prompts via API

Improve Prompt
The guide will recreate the following functionality in the Web UI via API.

Improve prompt functionality on web
Improve prompt functionality on web

📘
Tip

The prompt parameter has a limit of 200 characters

Sample Request

curl --request POST \
 --url 'https://cloud.leonardo.ai/api/rest/v1/prompt/improve' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"prompt": "Meridian sea",
}
An example response

{
"promptGeneration": {
"prompt": "A luminously shimmering Meridian sea, its surface a kaleidoscope of captivating hues that shift with the touch of the sun. Beneath the crystalline waters, vibrant aquatic life dances amid coral reefs in a mesmerizing display of colors and shapes. This breathtaking scene is captured in a stunningly detailed painting, where every brushstroke seems to breathe life into the underwater world. The image emanates a sense of peacefulness and wonder, drawing viewers into a tranquil realm of beauty and serenity.",
"apiCreditCost": 4
}
}
New Random Prompt
The guide will recreate the following functionality in the Web UI via API.

New Random Prompt functionality on web
New Random Prompt functionality on web

Sample Request

curl --request POST \
 --url 'https://cloud.leonardo.ai/api/rest/v1/prompt/random' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
An example response

{
"promptGeneration": {
"prompt": "A luridly glowing nightmare dragon, its jagged scales shimmering with an eerie light that seems to emanate from within. The dragon is depicted in a vivid gouache painting, the fantastical creature appearing almost tangible against the dark, fantastical background. The artist's attention to detail is impeccable - each scale and claw is rendered with exquisite precision, drawing the viewer into the mesmerizing world of the creature. The overall effect is haunting yet strangely beautiful, a testament to the artist's skill and imagination.",
"apiCreditCost": 4
}
}

Cost
Request Cost
Improve Prompt 4 credits
New Random Prompt 4 credits
