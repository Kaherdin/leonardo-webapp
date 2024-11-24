Upscale with Universal Upscaler
Follow this recipe to create high resolution upscale images using Universal Upscaler.

Use Universal Upscaler in Ultra Mode with Uploaded Images
Open Recipe
Use Universal Upscaler in Legacy Mode with Generated Images
Open Recipe
Upscaling using Universal Upscaler Ultra Mode
The section will recreate the Ultra Universal Upscaler functionality in the Web UI via API.

Upscale settings in Universal Upscaler (Ultra)
Upscale settings in Universal Upscaler (Ultra)

Sample Request

curl --request GET \
 --url https://cloud.leonardo.ai/api/rest/v1//variations/universal-upscaler \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>'

{
"ultraUpscaleStyle": "ARTISTIC",
"creativityStrength": 5,
"detailContrast": 5,
"similarity": 5
"upscaleMultiplier": 2,
"generatedImageId": "<YOUR_GENERATED_IMAGE_ID>",
}
Note: To retrieve the image URL, run the Get Variation ID endpoint after this step or receive the image URL via webhook callback.

Parameters
ultraUpscaleStyle - Choose between Artistic and Realistic. This will greatly affect the result. It is highly recommended to use Artistic when using Ultra with 2D style imagery.
creativityStrength - Determines how much creative deviation occurs when adding additional detail to the image. Note that higher strengths will greatly change the image from the original.
upscaleMultiplier - Determines how large the image will be upscaled to.
detailContrast: Similar to the HDR options on other upscale services, this affects the contrast levels of details within the image. This effect can be very pronounced on the edges of objects and may look unrealistic if set to extremely high levels. (Similar to an extreme Unsharp Mask effect in Photoshop or Structure / Sharpness in photo editors.)
similarity - This determines how far the overall image structure will retain similarity or diverge from the original. Useful when using with Creativity Strength to preserve some semblance of the original image.
📘
Tip

Set creativityStrength, detailContrast, and similarity to 5 as the starting point and adjust accordingly depending on your desired results.
The maximum upscaled image size is 20MP.
Cost
Refer to the Pricing Calculator API to calculate the API credits cost of the upscale job. Below is an example.

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/pricing-calculator \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"serviceParams": {
"UNIVERSAL_UPSCALER_ULTRA": {
"upscaleMultiplier": 2,
"inputWidth": 1472,
"inputHeight": 2240
}
},
"service": "UNIVERSAL_UPSCALER_ULTRA"
}
'
Upscaling using Universal Upscaler Legacy Mode
The section will recreate the Legacy Universal Upscaler functionality in the Web UI via API.

Universal Upscaler on Leonardo.AI Web
Universal Upscaler on Leonardo.AI Web

Upscale settings in Universal Upscaler
Upscale settings in Universal Upscaler (Legacy)

📘
Tip

The parametercreativityStrength refers to how 'creative' the AI will be on the original image. The higher it is, the more details will be applied.
The upscaleMultiplier must be between 1 and 2. The bigger the value, the higher the resolution.
The maximum upscaled image size is 20MP.
Sample Request

curl --request GET \
 --url https://cloud.leonardo.ai/api/rest/v1//variations/universal-upscaler \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>'

{
"upscalerStyle": "CINEMATIC",
"creativityStrength": 8,
"upscaleMultiplier": 2,
"generatedImageId": "<YOUR_GENERATED_IMAGE_ID>",
}
Ensure that you run the Get Variation ID endpoint to retrieve the image URL after this step

Cost
The cost is based on the output megapixel size.

Megapixels Credits
1-5 60
6 80
7 100
8 120
9 140
10 160
11 180
12 200
13 220
14 240
15 260
16 280
17 300
18 320
19 340
20 360
Updated 2 months ago
