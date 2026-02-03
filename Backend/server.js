
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cloudinary = require('cloudinary').v2; // <--- YE MISSING THA


const app = express();
const port = 8000;

app.use(cors({
    origin: '*', // Sabhi origins allow karein (development ke liye easy hai)
    methods: ['GET', 'POST'],
    credentials: true
}));
// Body limit 50mb for high-res images
app.use(express.json({ limit: '50mb' }));

// Cloudinary Setup
// Cloudinary Setup ab process.env use karega
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
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



app.post('/api/try-on', async (req, res) => {
    const { model_photo, clothing_photo, attire } = req.body;
    const API_KEY = '21H3KYWLGV3AAAG2TQKK15J5OENO1Q';

    if (!model_photo || !clothing_photo) {
        return res.status(400).json({ error: "Missing images. Please upload both photos." });
    }

    try {
        console.log("1. Starting Parallel Uploads...");

        // Ensure strings are valid before calling startsWith
        const modelImg = String(model_photo).startsWith('data:') ? model_photo : `data:image/jpeg;base64,${model_photo}`;
        const clothingImg = String(clothing_photo).startsWith('data:') ? clothing_photo : `data:image/jpeg;base64,${clothing_photo}`;

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