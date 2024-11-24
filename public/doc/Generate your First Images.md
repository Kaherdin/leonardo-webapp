Generate your First Images
Now that you have your API key, you’re ready to generate your first images on Leonardo!

Follow this recipe to generate your first images:

Generate your First Images
Open Recipe
The guide will recreate the following functionality in the Web UI via API.

Creating Prompt to generate a series of images with model and style specified
Creating Prompt to generate a series of images with model and style specified

Generating Images via API tester
Use the inbuilt tester from our API documentation to generate some images using the default example. Simply add in your API key and select Try It!.

Running on API tester in documentation
Running on API tester in documentation

Below is an example response.

Use the generationId for the Get a Single Generation in the next call for you to view the images. Below is an expected example response

📘
Tip

Use Webhooks to get notified in real time when your Images have completed generating.
View all the generations ever created from your account using the Get generations by user ID API call.
🚧
Heads up

API credit costs will vary depending on the image size, model and features such as Alchemy.

To help you plan ahead, check out our handy guide here. Want to avoid running low on credits? Consider setting up Auto-top up for peace of mind.

Sample Request

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"height": 512,
"modelId": "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3",
"prompt": "An oil painting of a cat",
"width": 512
}
'
Be sure to check out the Image Generation guides for more customisation options and how to use the right combination of parameters to get the result you're looking for.

Generate Images Using Leonardo Phoenix Model
📘
Leonardo Phoenix is currently in preview.

For questions and feedback, please reach out via the support button on the lower right of the web app.

Follow this recipes to generate images using the Leonardo Phoenix model.

Generate Images Using Leonardo Phoenix Model in Ultra Mode
Open Recipe
Generate Images Using Leonardo Phoenix Model in Quality Mode
Open Recipe
The guide will recreate the following functionality in the Web UI via API.

Sample Request

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"modelId": "6b645e3a-d64f-4341-a6d8-7a3690fbf042",
"contrast": 3.5,
"prompt": "an orange cat standing on a blue basketball with the text PAWS",
"num_images": 4,
"width": 1472,
"height": 832,
"alchemy": true,
"styleUUID": "111dc692-d470-4eec-b791-3475abac4c46",
"enhancePrompt": false
}
'
Sample Output
Leonardo Phoenix with the prompt "an orange cat standing on a blue basketball with the text PAWS"
Leonardo Phoenix with the prompt "an orange cat standing on a blue basketball with the text PAWS"

Required Parameters
modelId - Should be set to 6b645e3a-d64f-4341-a6d8-7a3690fbf042 for Leonardo Phoenix.
prompt - Text prompt to use for generation.
Supported Parameters
alchemy (Generation Mode - Fast / Quality)

Generation Mode Value
Fast alchemy:false
Quality alchemy:true
Generation Mode uses the alchemy pipeline.

contrast

Contrast Value
Low 3
Medium 3.5
High 4
Accepts [1.0, 1.3, 1.8, 2.5, 3, 3.5, 4, 4.5]. If alchemy is true, contrast needs to be 2.5 or higher.

enhancePrompt (Prompt Enhance)

Set to false for OFF.
Set to true for ON and specify enhancePromptInstruction: "INSTRUCTION_AS_STRING".
height - Height input resolution.

num_images - Number of images.

styleUUID (Preset Style)

Preset Style UUID
3D Render debdf72a-91a4-467b-bf61-cc02bdeb69c6
Bokeh 9fdc5e8c-4d13-49b4-9ce6-5a74cbb19177
Cinematic a5632c7c-ddbb-4e2f-ba34-8456ab3ac436
Cinematic Concept 33abbb99-03b9-4dd7-9761-ee98650b2c88
Creative 6fedbf1f-4a17-45ec-84fb-92fe524a29ef
Dynamic 111dc692-d470-4eec-b791-3475abac4c46
Fashion 594c4a08-a522-4e0e-b7ff-e4dac4b6b622
Graphic Design Pop Art 2e74ec31-f3a4-4825-b08b-2894f6d13941
Graphic Design Vector 1fbb6a68-9319-44d2-8d56-2957ca0ece6a
HDR 97c20e5c-1af6-4d42-b227-54d03d8f0727
Illustration 645e4195-f63d-4715-a3f2-3fb1e6eb8c70
Macro 30c1d34f-e3a9-479a-b56f-c018bbc9c02a
Minimalist cadc8cd6-7838-4c99-b645-df76be8ba8d8
Moody 621e1c9a-6319-4bee-a12d-ae40659162fa
None 556c1ee5-ec38-42e8-955a-1e82dad0ffa1
Portrait 8e2bc543-6ee2-45f9-bcd9-594b6ce84dcd
Ray Traced b504f83c-3326-4947-82e1-7fe9e839ec0f
Sketch (B&W) be8c6b58-739c-4d44-b9c1-b032ed308b61
Sketch (Color) 093accc3-7633-4ffd-82da-d34000dfc0d6
Stock Photo 5bdc3f2a-1be6-4d1c-8e77-992a30824a2c
Vibrant dee282d3-891f-4f73-ba02-7f8131e5541b
ultra (Generation Mode - Ultra) - Set to true to turn on ultra.

width - Width input resolution.

Cost
Please refer to the in-app Pricing Calculator, or use the Pricing Calculator API similar to below.

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/pricing-calculator \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"serviceParams": {
"IMAGE_GENERATION": {
"isUltra": true,
"imageHeight": 832,
"imageWidth": 1472,
"numImages": 4,
"inferenceSteps": 10,
"promptMagic": false,
"alchemyMode": false,
"highResolution": false,
"isModelCustom": false,
"isSDXL": false
}
},
"service": "IMAGE_GENERATION"
}
'
🚧
Caution

The in-app Pricing Calculator does not have a setting for adding image guidance (ControlNets). Please use the Pricing Calculator API or refer to the apiCreditCost in the API response.

Generate Images Using PhotoReal
Follow this recipe to generate images using PhotoReal v2

Generate Images Using PhotoReal v2
Open Recipe
PhotoReal v2
The guide will recreate the following functionality in the Web UI via API. This is the default version used in Presets with the current UI.

Specify PhotoReal v2 using "photoRealVersion":"v2", if not specified, the default PhotoReal version will be v1.

📘
Tip

Alchemy needs to be set to true (e.g"alchemy": true)
modelId for PhotoReal v2 needs to be specified as Leonardo Kino XL, Leonardo Diffusion XL or Leonardo Vision XL
photoRealStrength is not required for PhotoReal v2
Preset Styles available

Style Value
Bokeh BOKEH
Cinematic CINEMATIC
Cinematic (Closeup) CINEMATIC_CLOSEUP
Creative CREATIVE
Fashion FASHION
Film FILM
Food FOOD
HDR HDR
Long Exposure LONG_EXPOSURE
Macro MACRO
Minimalistic MINIMALISTIC
Monochrome MONOCHROME
Moody MOODY
Neutral NEUTRAL
Portrait PORTRAIT
Retro RETRO
Stock Photo STOCK_PHOTO
Vibrant VIBRANT
Unprocessed UNPROCESSED
Sample Request

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"height": 512,
"prompt": "A majestic cat in the snow",
"negative_prompt": "trees",
"modelId": "aa77f04e-3eec-4034-9c07-d0f619684628",//Leonardo Kino XL model
"width": 512,
"alchemy": true,
"presetStyle": "DYNAMIC",
"photoReal": true,
"photoRealVersion":"v2"
}
'
PhotoReal v1
Follow this recipe to generate images using PhotoReal v1

Generate Images Using PhotoReal
Open Recipe
The guide will recreate the following functionality in the Web UI via API.

📘
Tip

Alchemy needs to be set to true (e.g"alchemy": true)
modelId does not need to be specified in the API body when using PhotoReal v1.
Preset Styles available

Style Value
Cinematic CINEMATIC
Creative CREATIVE
Vibrant VIBRANT
Sample Request

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"height": 512,
"prompt": "A cat staring at a window",
"width": 512,
"alchemy": true,
"photoReal": true,
"photoRealStrength": 0.5,
"presetStyle": "CINEMATIC"
}
'

Generate Images Using Alchemy
The guide will recreate the following functionality in the Web UI via API.

V2 Alchemy
V2 Alchemy

V1 Alchemy
V1 Alchemy

📘
Tip

There is no need to specify which version of Alchemy is required, the models will automatically apply the appropriate Alchemy version.

Generating with Alchemy will produce a higher Output Resolution than the Input dimensions specified in the API body. Find out your Image dimension via the Web App like this.

Sample Request

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"height": 512,
"prompt": "A beautiful sleeping white cat",
"modelId": "aa77f04e-3eec-4034-9c07-d0f619684628",//Leonardo Kino XL model
"width": 512,
"alchemy": true,
"presetStyle": "CINEMATIC",
}
'
Models and Alchemy Version
This is not a full comprehensive list of all Models. To view all platform models, use the List Platform Models endpoint.

Alchemy Applied Example Models
V2 Leonardo Lightning XL
Leonardo Anime XL
Leonardo Kino XL
Leonardo Vision XL
Leonardo Diffusion XL
AlbedoBase XL
SDXL 1.0
SDXL 0.9
V1 Absolute Reality v1.6
Anime Pastel Dream
Dreamshaper v7
Stable Diffusion 1.5
Stable Diffusion 2.1
An easy way to view which Alchemy pipeline will be used for your model is to view it on the Web. Any XL model will be using Alchemy v2. A list of all models on the Web can also be found here.

Generate Images Using Image Guidance
This feature allows for uploaded or generated Images as reference, apply ControlNet and add finer adjustments to your image appearance.

👍
Update

Image guidance via API now supports multiple ControlNets

Follow these recipes with code snippets to generate images using image guidance

Generate with Image to Image Guidance using Generated Images
Open Recipe
Generate with Image Guidance using multiple ControlNets
Open Recipe
Style Reference
This guide will recreate the following Style Reference functionality in the Web UI via API.

Using multiple Style Reference on the Web App
Using multiple Style Reference on the Web App

Generation using multiple Style Reference
Generation using multiple Style Reference

Parameter breakdown:

Specify your image type in initImageType as either GENERATED for Leonardo.Ai generated images or UPLOADED if you upload your own image.
The parameter strengthType is a string comprised of the values Low, Mid, High, Ultra, and Max. For Content Reference and Character Reference, Low, Mid, and High are supported. Style Reference supports Low to Max.
influence will only appear if multiple Style References are used, and only used for Style Reference. This is a ratio of the influence of the two images. i.e. The right image from the example will have a higher influence on the output.
E.g. If Image A has an influence of 1 and Image B also has an influence of 1, their ratio will be 1:1. Similarly, if Image A has an influence of 0.5 and Image B has an influence of 0.5, the ratio remains 1:1. It's important to note that the total of both image influences does not necessarily need to add up to 1.

If only using one style reference image, you don’t need to include influence in the body parameter.
Sample Request

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"height": 512,
"modelId": "aa77f04e-3eec-4034-9c07-d0f619684628",//Leonardo Kino XL
"prompt": "A wistful young woman stands in the beaming doorway of a sunlit room",
"presetStyle":"CINEMATIC",
"width": 1024,
"photoReal": true,
"photoRealVersion":"v2",
"alchemy":true,
"controlnets": [
{
"initImageId": <YOUR_GENERATED_IMAGE_ID>,
"initImageType": "GENERATED",
"preprocessorId": 67, //Style Reference ID
"strengthType": "High",
"influence": 0.39
},
{
"initImageId": <YOUR_INIT_IMAGE_ID>,
"initImageType": "UPLOADED",
"preprocessorId": 67,
"strengthType": "High",
"influence": 0.64
}
]
}
Character Reference
This guide will recreate the following functionality in the Web UI via API.

Using Character Reference with Style Reference
Using Character Reference with Style Reference

Generation using Character and Style Reference
Generation using Character and Style Reference

Parameter breakdown:

Specify your image type in initImageType as either GENERATED for Leonardo.Ai generated images or UPLOADED if you upload your own image.
The parameter weight is a numeric value between 0-2, and 'strengthType' is a string comprised of the values between Low-Max. This will be bucketed under these settings:
strengthType weight Description
Low 0-0.66 Provide greatest flexibility at the cost of resemblance
Mid 0.66-1.32 Display reasonable flexibility and more resemblance.
High 0.32-2 Less flexible but have the best resemblance.
📘
Note

Character Reference is not intended as a face swap feature and does not guarantee a perfect replica of a person in the output.

Sample Request

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"height": 576,
"modelId": "aa77f04e-3eec-4034-9c07-d0f619684628",//Leonardo Kino XL
"prompt": "A mesmerizing lady with cascading strands of blonde hair gazes through a misty train window",
"presetStyle":"CINEMATIC",
"width": 1024,
"photoReal": true,
"photoRealVersion":"v2",
"alchemy":true,
"controlnets": [
{
"initImageId": <YOUR_INIT_IMAGE_ID>,
"initImageType": "UPLOADED",
"preprocessorId": 133,//Character Reference Id
"strengthType": "Mid",
},
{
"initImageId": <YOUR_GENERATED_IMAGE_ID>,
"initImageType": "GENERATED",
"preprocessorId": 67,//Style Reference Id
"strengthType": "High",
}
]
}
Image to Image Guidance
Using Image to Image with Style Reference
Using Image to Image with Style Reference

Sample Request
Image to Image does not require ControlNet preprocessor IDs, below is an example request.

📘
Note

Image to Image with multiple ControlNets is incompatible with most SDXL models, except for Style Reference (67) and Character Reference (133) Preprocessor IDs.

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"height": 644,
"modelId": "b24e16ff-06e3-43eb-8d33-4416c2d75876" //Leonardo Lightning XL,
"prompt": "Vibrant makeup bottle in a showroom",
"presetStyle":"DYNAMIC",
"width": 1040,
"alchemy":true,
"controlnets": [
{
"initImageId":<YOUR_GENERATED_IMAGE_ID>,
"initImageType": "GENERATED",
"preprocessorId": 67, //Style Reference ID
"strengthType": "High",
}

    ],

"init_image_id": <YOUR_INIT_IMAGE_ID> ,
"init_strength": 0.5,
}
Other ControlNets
Image Guidance uses different preprocessor IDs depending on the base model for different ControlNets. Refer to the table below to combine multiple ControlNets.

ControlNet SD1.5 SD2.1 SDXL PHOENIX
Style Reference x x 67 166
Character Reference x x 133 x
Content Reference x x 100 x
Edge to Image 1 12 19 x
Depth to Image 3 13 20 x
Pose to Image 7 16 21 x
Text Image Input 11 18 22 x
Sketch to Image 10 17 x x
Normal Map 6 15 x x
Line Art 5 x x x
Pattern to Image 8 x x x
QR Code to Image 9 x x x
Sample Request

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"height": 512,
"modelId": "aa77f04e-3eec-4034-9c07-d0f619684628",//Leonardo Kino XL
"prompt": "Intricately swirling nebulas dance across a vividly colored galactic map",
"width": 1024,
"alchemy":true,
"controlnets": [
{
"initImageId": <YOUR_GENERATED_IMAGE_ID>,
"initImageType": "GENERATED",
"preprocessorId": 19, //Edge to Image ID
"weight": "0.5"
}
 ]
}
Image Guidance using Uploaded or Generated Images (Legacy format)
The guide will recreate the following functionality in the Web UI via API.

Applying previously generated image as Image to Image Guidance
Applying previously generated image as Image to Image Guidance

🚧
Limitations

Legacy Image Guidance features on API does not have full parity with the Web UI.
controlNetType,controlNet and weighting are now legacy ControlNet parameters.

ControlNet controlNetType
Edge to Image CANNY
Pose to Image POSE
Depth to Image DEPTH
Sample Request For Uploaded Images
This request has no ControlNets added, it is only using Image to Image Guidance.

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"height": 512,
"modelId": "1e60896f-3c26-4296-8ecc-53e2afecc132",
"prompt": "An oil painting of an orange cat",
"width": 512,
"init_image_id": <YOUR_INIT_IMAGE_ID> ,
"init_strength": 0.5,
}

Sample Request for Generated Images
🚧
Legacy Feature

The following request is a legacy ControlNet parameter and will be soon be deprecating. We recommend to use the new ControlNet parameters which also allows for multiple ControlNets.

This request adds Edge to Image ControlNet using your previously generated image.

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"height": 512,
"modelId": "1e60896f-3c26-4296-8ecc-53e2afecc132",
"prompt": "An oil painting of an orange cat",
"width": 512
"init_generation_image_id": "<YOUR_GENERATED_IMAGE_ID>",
"init_strength": 0.5,
"controlNet": True,
"controlNetType": "CANNY"  
}

Generate Images Using Canvas Inpainting
This feature allows for uploaded or generated Images as reference, apply ControlNet and add finer adjustments to your image appearance.

Follow this recipes with code snippets to generate images using Canvas Inpainting

Generate Images with Canvas Inpainting
Open Recipe
Inpainting
This guide will recreate the following Canvas Inpainting functionality in the Web UI via API.

Generation using multiple Style Reference
Inpainting Feature in Canvas Editor on web

Generated Inpaint Image
Generated Inpaint Image

Canvas Parameter Breakdown

Image dimensions for images uploaded to canvasInitId and canvasMaskId must be divisible by 8.
Ensure canvasRequest is set to True when using Canvas Editor features.
Models can be specified using modelId. All models except for Leonardo Lightning XL, Leonardo Anime XL and Phoenix can be used with Canvas Inpainting. A list of model Ids can be found here
Inpaint Strength is init_strength, which must be subtracted from 1 to match the equivalent value. E.g. In the example above, the Inpaint strength is 0.85, which equates to init_strength:0.15.
Max Inpaint strength is init_strenght:0.8.
Default values for num_images is 4, init_strength is 0,guidance_scale is 7.
Accepted file formats are jpg, png, jpeg, webp.
Uploading Mask
📘
Note

Masks must be uploaded as a white element against a black background. Inpainting will be applied on the white area.
Additional colour can be applied on the init image.
Mask and Init Image dimensions must match, otherwise image generation will fail.
Mask image upload as a white area on black background to apply Canvas Inpainting
Mask image upload as a white area on black background to apply Canvas Inpainting

Image Dimension Generation Limit
Max height and width dimensions for both canvasInitId and canvasMaskIdis 1536x1536. This table shows the allowed number of images based on the image dimension of the init and mask image.

Dimensions num_images
512x512 8
768x768 8
512x1024 4
768x1024 4

> 1024x1024 2
> Sample Request
> 🚧
> Parameter compatibility

Parameters other than those listed below are not compatible with Canvas Inpainting, i.e. alchemy, photoReal.

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"prompt": "a bright sun",
"canvasRequest": True,
"num_images": 4,
"init_strength": 0.15, // Inpaint strength 0.85
"canvasRequestType": "INPAINT",
"guidance_scale": 7,
"modelId": "1e60896f-3c26-4296-8ecc-53e2afecc132", // Leonardo Diffusion XL
"canvasInitId": init_image_id,
"canvasMaskId": masks_image_id
}

Generate Images with Realtime Canvas
📘
Note

Realtime Canvas uses Latent Consistency Model (LCM) for fast generation.

Generate Images in Realtime
Follow this recipe to generate Latent Consistency Models (LCM) images, allowing you to create AI images in realtime.

Generating an LCM image
Open Recipe
The guide recreates the following Realtime Canvas functionality in the Leonardo Web App via API.

Uploading and Image to use for Image Guidance
Generating base Image using Realtime Canvas.

📘
Tip

Use a base64 image encoder such as https://www.base64-image.de to convert your images when testing.
Use a decoder such as https://base64.guru/converter/decode/image to view your images.
Ensure the images in the imageDataURL are in JPEG format
Sample Request
This will take the base64 image of the drawing on the left and create the LCM image on the right in realtime.

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations-lcm \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"width": 512,
"height": 512,
"prompt": "Bouquet of pink roses in the garden ",
"style": "DYNAMIC",
"strength": 0.7
}

The response will return an LCM image as a base64 image in realtime. Keep uploading your drawings in real-time to theimageDataUrlparameter. Once you're satisfied with the LCM image, you can apply Instant Refine in the following step.

Perform Instant Refine
Follow this recipe to generate a LCM image and apply Instant Refine in realtime.

Generating an LCM image and perform instant refine
Open Recipe
Using the generated LCM image, perform Instant Refine as you would on the Web UI below.

Using a recently generated image as input image
Instant Refine on Realtime Canvas

New prompts or a different style or creativity strength can be added in this step

📘
Tip

The parameterstrengthrefers to Creativity Strength. The higher it is, the more creative the LCM generation gets from your input image. The lower it is, the more similar it will be to your input image.

Sample Request

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/lcm-instant-refine \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"width": 512,
"height": 512,
"imageDataUrl": "data:image/jpeg;base64,xxxx"
"prompt": "A bouquet of pink roses with a bee",
"strength": 0.65,
"style": "CINEMATIC"
}
'
Perform Inpainting
Follow this recipe to generate an LCM image and perform Inpainting using a Mask.

Generating an LCM image and performing Inpainting
Open Recipe
The guide recreates the following Inpainting Realtime Canvas functionality in the Leonardo Web App via API.

📘
Note

Masks must be uploaded as a white element against a black background. Inpainting will be applied on the white area.
Additional colour sketch may be applied on the Input image.
Mask image uploaded with black background to apply Inpainting
Mask image uploaded with black background to apply Inpainting

🚧
Caution

Ensure that your image dimension in the maskDataUrl matches the dimensions of your imageDataUrl. This ensures precise coverage of the intended areas

Sample Request

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/lcm-inpainting \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"width": 1024,
"height": 1024,
"maskDataUrl": "data:image/jpeg;base64,xxxx"
"imageDataUrl": "data:image/jpeg;base64,xxxx"
"prompt": "a yellow rose",
"guidance": 5
}
'
Keep uploading your inpainting image into imageDataUrl in real-time with the mask area into themaskDataUrlparameter. Once you're satisfied with the image, you can perform instant refine or Alchemy upscaler in the next step to improve the image quality.

Apply Alchemy Upscaler
Follow this recipe to generate an LCM image and perform an Alchemy upscale in real time

Generating an LCM image and perform Alchemy Upscale
Open Recipe
The guide recreates the following Alchemy Upscale feature in the Leonardo Web App via API.

This endpoint will return a variation image, and also returns a generationId which you can use to Get a Single Generation.

📘
Tip

To use Smooth Mode, include "refineCreative": truein your API body.

Sample Request

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations-lcm \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"width": 512,
"height": 512,
"imageDataUrl": "data:image/jpeg;base64,xxx"
"prompt": "a beautiful bouquet of roses",
"refineCreative": true,
"strength": 0.7
}
'

Generate Images Using Transparency
The Transparency feature enables you to generate images with a transparent background.

This guide recreates the following Transparency setting in the Leonardo Web App via API.

Generating with the Transparency feature on the web app
Generating with the Transparency feature on the web app

Sample Request
This request will generated an image without a background.

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"alchemy": false,
"prompt": "an orange cat",
"width": 512,
"height": 512,
"modelId": "aa77f04e-3eec-4034-9c07-d0f619684628",
"transparency": "foreground_only",
"elements": [
{
"akUUID": "5f3e58d8-7af3-4d5b-92e3-a3d04b9a3414",
"weight": 0.5
}
]
}
'
"transparency": "foreground_only" - Enables the transparency foreground only feature. The foreground image will be generated and the background will be removed.
"modelId": "aa77f04e-3eec-4034-9c07-d0f619684628" - Sets the model to Leonardo Kino XL, one of the compatible models to transparency feature.
"elements.[0].akUUID": "5f3e58d8-7af3-4d5b-92e3-a3d04b9a3414" - Sets the element to Simple Flat Illustration, one of the compatible elements to transparency feature.
📘
Tip

To learn more about the recommended models and elements, please refer to the compatibility list.

Sample Output
Below is a sample output corresponding the the sample request above where transparency is set to foreground_only. The output generated is a PNG file with no background.

Sample output using Leonardo Kino XL model, Simple Flat Illustration element, and the prompt "an orange cat"
Sample output using Leonardo Kino XL model, Simple Flat Illustration element, and the prompt "an orange cat"

Updated 8 months ago
