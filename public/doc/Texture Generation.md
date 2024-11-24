Generate Textures on 3D model
Follow this recipe to upload 3D model and generate a 3D texture on the model:

Upload and Generate Texture on 3D Model
Open Recipe
The guide will recreate the following functionality in the Web UI via API.

Select Upload New object to create Texture Generation
Select Upload New object to create Texture Generation

Learn more about uploading via a presigned URL here

🚧
Notice

Only 3D models in .OBJ format can be accepted as the file extension.
Models need to have a UV mapping to generate Textures.
Inserting prompt to Generate preview of Texture
Inserting prompt to Generate preview of Texture

📘
Tip

Already have a model uploaded? Find your model ID using the Get 3D models by user ID API endpoint
Use Webhooks to get notified in real time when your Textures have completed generating.
View your textures using the Get Texture Generation by ID API call after creating the Texture Generation.
Model icon preview won't appear on the Texture Generation Web UI but can still be viewed when clicked into.
Generate multiple textures for the same model example.

Example textures generated on 3D model
Example textures generated on 3D model

Sample Request

curl --request POST \
 --url https://cloud.leonardo.ai/api/rest/v1/generations-texture \
 --header 'accept: application/json' \
 --header 'authorization: Bearer <YOUR_API_KEY>' \
 --header 'content-type: application/json' \
 --data '
{
"prompt": "sword, silver high metallic, low roughness, leather wrapped handle, black guard",
"preview": True,
"modelAssetId": <YOUR_MODEL_ID>
}
Cost
Request Cost
Preview Generation 30 credits
Full Texture Generation 150 credits
