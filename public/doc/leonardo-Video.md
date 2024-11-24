Generate Motion Using Generated Images
Example for generating a video (motion) from images generated on Leonardo.Ai

Follow this recipe to generate motion using generated images:

Generate Motion Using Generated Images
Open Recipe
The guide will recreate the following functionality in the Web UI via API.

Selecting Images from Recent Generations for Motion
Selecting Images from Recent Generations for Motion

Selecting Motion Strength and Visibility for Motion
Selecting Motion Strength and Visibility for Motion

📘
Tip

Be sure to use the id from the Get Single Generation API call as the imageIdin your request, instead of the generationId from the Create Generation of Images API call. This way, you'll apply Motion to the exact image you're aiming for, and avoid any errors if applied to the generation of images.

Sample Request

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations-motion-svd \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"imageId": "<YOUR_GENERATED_IMAGE_ID>",
"motionStrength": 3,
"isPublic": true
}
'

Generate Motion Using Uploaded Images
Example for generating a video (motion) from your own image

Follow this recipe to generate motion using uploaded images:

Generate Motion Using Uploaded Images
Open Recipe
The guide will recreate the following functionality in the Web UI via API.

Selecting Images from Recent Generations for Motion
Use Images from Uploaded Images for Motion

Creating Motion with Uploaded Image
Creating Motion with Uploaded Image

📘
Tip

The API endpoints to upload init images or dataset images return a presigned URL. Use this URL to upload the image file to S3. View more details on how to create a presigned URL here

Sample Request

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations-motion-svd \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"imageId": "<YOUR_INIT_IMAGE_ID>",
"motionStrength": 3,
"isInitImage": True
}
'
