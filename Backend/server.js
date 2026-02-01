// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// const FormData = require('form-data');

// const app = express();
// const port = 8000;

// app.use(cors());
// // Body limit ko 50mb rakha hai taaki heavy images crash na karein
// app.use(express.json({ limit: '50mb' }));

// // 1. Proxy Endpoint: Jewellery image ko fetch karke Base64 banane ke liye
// app.get('/api/proxy-image', async (req, res) => {
//     const imageUrl = req.query.url;
//     if (!imageUrl) return res.status(400).json({ error: 'URL missing' });

//     try {
//         const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
//         const buffer = Buffer.from(response.data);
//         const base64 = buffer.toString('base64');
//         const contentType = response.headers['content-type'] || 'image/jpeg';
        
//         res.json({ base64: `data:${contentType};base64,${base64}` });
//     } catch (error) {
//         res.status(500).json({ error: 'Image fetch failed', details: error.message });
//     }
// });

// app.post('/api/try-on', async (req, res) => {
//     const { model_photo, clothing_photo } = req.body;
//     const API_KEY = '21H3KYWLGV3AAAG2TQKK15J5OENO1Q';

//     try {
//         console.log("Preparing data as per documentation...");

//         const form = new FormData();
        
//         // Documentation kehti hai URL chahiye, par kai baar ye Base64 string bhi accept kar lete hain
//         // Agar ye fail ho, toh aapko pehle images upload karke unka URL yahan dena hoga.
//         form.append('model_photo', model_photo); 
//         form.append('clothing_photo', clothing_photo);
        
//         // YE DO FIELDS DOCUMENTATION MEIN REQUIRED HAIN:
//         form.append('prompt', 'A person wearing luxury jewellery'); 
//         form.append('ratio', 'auto');

//         console.log("Sending Request to AI API...");

//         const apiResponse = await axios.post(
//             `https://thenewblack.ai/api/1.1/wf/vto_stream?api_key=${API_KEY}`,
//             form,
//             {
//                 headers: {
//                     ...form.getHeaders(),
//                 }
//             }
//         );

//         console.log("Success!");
//         res.json(apiResponse.data);

//     } catch (error) {
//         if (error.response) {
//             console.error("AI API Error Detail:", error.response.data);
//             res.status(400).json(error.response.data);
//         } else {
//             console.error('SERVER ERROR:', error.message);
//             res.status(500).json({ error: 'System Error' });
//         }
//     }
// });

// app.listen(port, () => console.log(`Server running at http://localhost:${port}`));




const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cloudinary = require('cloudinary').v2; // <--- YE MISSING THA

const app = express();
const port = 8000;

app.use(cors());
// Body limit 50mb for high-res images
app.use(express.json({ limit: '50mb' }));

// Cloudinary Setup
cloudinary.config({ 
  cloud_name: 'dg1jp2bnq', 
  api_key: '362782742649224', 
  api_secret: 'vyc-SnMu8UH1CNOqWwjHMrn_RHM' 
});

// 1. Proxy Endpoint: External image ko base64 banane ke liye
app.get('/api/proxy-image', async (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) return res.status(400).json({ error: 'URL missing' });

    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);
        const base64 = buffer.toString('base64');
        const contentType = response.headers['content-type'] || 'image/jpeg';
        
        res.json({ base64: `data:${contentType};base64,${base64}` });
    } catch (error) {
        res.status(500).json({ error: 'Image fetch failed', details: error.message });
    }
});

// app.post('/api/try-on', async (req, res) => {
//     const { model_photo, clothing_photo, attire } = req.body;
//     const API_KEY = '21H3KYWLGV3AAAG2TQKK15J5OENO1Q';

//     try {
//         console.log("1. Starting Upload to Cloudinary...");

//         // Ensure photos have correct format for Cloudinary
//         const modelImg = model_photo.startsWith('data:') ? model_photo : `data:image/jpeg;base64,${model_photo}`;
//         const clothingImg = clothing_photo.startsWith('data:') ? clothing_photo : `data:image/jpeg;base64,${clothing_photo}`;

//         // User Photo upload
//         const modelRes = await cloudinary.uploader.upload(modelImg, {
//             folder: "virtual_tryon/users",
//             resource_type: "auto"
//         });
//         console.log("Model Uploaded:", modelRes.secure_url);

//         // Jewellery Image upload
//         const clothingRes = await cloudinary.uploader.upload(clothingImg, {
//             folder: "virtual_tryon/assets",
//             resource_type: "auto"
//         });
//         console.log("Jewellery Uploaded:", clothingRes.secure_url);

//         console.log("2. Sending to AI API...");

//         const apiResponse = await axios.post(
//             `https://thenewblack.ai/api/1.1/wf/vto_stream?api_key=${API_KEY}`,
//             {
//                 model_photo: modelRes.secure_url,
//                 clothing_photo: clothingRes.secure_url,
//                 prompt: `A high-quality professional photo of a person wearing luxury jewellery, style: ${attire || 'Elegant'}.`,
//                 ratio: 'auto'
//             }
//         );

//         console.log("3. AI Response Received Success!");
//         res.json(apiResponse.data);

//     } catch (error) {
//         console.error("--- DETAILED ERROR LOG ---");
//         // Detailed error logging
//         if (error.response) {
//             console.error("API Error Data:", error.response.data);
//             res.status(400).json({ error: "API Error", details: error.response.data });
//         } else if (error.request) {
//             console.error("No response from server");
//             res.status(500).json({ error: "No response from AI server" });
//         } else {
//             console.error("Error Message:", error.message);
//             res.status(500).json({ error: error.message });
//         }
//     }
// });


app.post('/api/try-on', async (req, res) => {
    const { model_photo, clothing_photo, attire } = req.body;
    const API_KEY = '21H3KYWLGV3AAAG2TQKK15J5OENO1Q';

    try {
        console.log("1. Starting Parallel Uploads to Cloudinary...");

        // Photos format ensure karna taaki Cloudinary reject na kare
        const modelImg = model_photo.startsWith('data:') ? model_photo : `data:image/jpeg;base64,${model_photo}`;
        const clothingImg = clothing_photo.startsWith('data:') ? clothing_photo : `data:image/jpeg;base64,${clothing_photo}`;

        // Strategy: Dono uploads ko ek saath start karna (Time saving)
        const [modelRes, clothingRes] = await Promise.all([
            cloudinary.uploader.upload(modelImg, { 
                folder: "vto/users",
                transformation: [{ width: 1024, crop: "limit" }] // Size optimization
            }),
            cloudinary.uploader.upload(clothingImg, { 
                folder: "vto/assets",
                transformation: [{ width: 1024, crop: "limit" }]
            })
        ]);

        console.log("2. Generating AI Prompt for:", attire);

        // Advanced Prompt Engineering: AI ko outfit aur jewellery balance samjhane ke liye
customPrompt = `A high-quality professional close-up portrait. The person is perfectly wearing luxury jewellery. 
                Ensure the earrings are precisely attached to the earlobes and the necklace is naturally draped around the neck contour. 
                Highly detailed gems, realistic shadows on skin, 8k resolution, professional studio lighting.`;  
                      
        if (attire === 'Saree') {
            customPrompt = `A high-fashion portrait of a person wearing an elegant designer Silk Saree, beautifully draped, wearing ${customPrompt.toLowerCase()}, heritage Indian style, cinematic lighting.`;
        } else if (attire === 'Business Formal') {
            customPrompt = `A professional editorial photo of a person wearing a sharp business suit with a blazer, styled with premium jewellery, corporate luxury aesthetic, studio lighting.`;
        } else if (attire === 'Business Casual') {
            customPrompt = `A person wearing a smart-casual modern outfit, a minimalist blouse and trousers, adorned with luxury jewellery, soft natural lifestyle lighting.`;
        } else {
            // Default Case: Agar "Original Photo" ya kuch aur ho
// Default Case: Jab user apni original photo pe jewellery try kare
customPrompt = `A professional photo of a person wearing high-end jewellery, dressed in ${attire || 'luxury outfit'}. High quality, realistic.`;        }

        console.log("3. Calling AI API...");

        const apiResponse = await axios.post(
            `https://thenewblack.ai/api/1.1/wf/vto_stream?api_key=${API_KEY}`,
            {
                model_photo: modelRes.secure_url,
                clothing_photo: clothingRes.secure_url,
                prompt: customPrompt,
                ratio: 'auto'
            },
            { timeout: 90000 } // Extended timeout (AI sometimes takes 40-50s)
        );

        console.log("4. Success! AI Generated Result.");

        // Safe Response handling: Check karein ki data kis format mein hai
        const result = apiResponse.data;
        res.json(result);

    } catch (error) {
        console.error("--- DETAILED ATELIER ERROR ---");
        
        // Agar AI API ne specific error bheiha ho (e.g. invalid photo)
        const errorDetail = error.response ? error.response.data : error.message;
        console.error(errorDetail);
        
        res.status(500).json({ 
            error: "The AI Atelier is currently busy or the image was incompatible.", 
            details: errorDetail 
        });
    }
});

app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));