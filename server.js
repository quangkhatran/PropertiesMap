import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "AIzaSyCdiUVAybjsQqysEAZOzsNlBesXU0bII-8";

// ===== NEARBY =====
app.get("/api/nearby", async (req, res) => {
    const { lat, lng } = req.query;

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&keyword=restaurant|cafe|supermarket|convenience&key=${API_KEY}`;

    const r = await fetch(url);
    const data = await r.json();

    // 🔥 STEP QUAN TRỌNG: lấy thêm ảnh từ Place Details
    const enriched = await Promise.all(
        data.results.slice(0,10).map(async (p) => {

            if(!p.place_id) return p;

            try {
                const detailUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${p.place_id}&fields=photos&key=${API_KEY}`;

                const r2 = await fetch(detailUrl);
                const d2 = await r2.json();

                return {
                    ...p,
                    photos: d2.result?.photos || []
                };
            } catch(err){
                return p;
            }
        })
    );

    res.json({ results: enriched });
});

// ===== DETAIL =====
app.get("/api/place", async (req, res) => {
    const { place_id } = req.query;

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,rating,opening_hours,reviews,url&key=${API_KEY}`;

    const r = await fetch(url);
    const data = await r.json();

    res.json(data);
});

app.get("/api/photo", async (req, res) => {
    const { ref } = req.query;

    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ref}&key=${API_KEY}`;

    // 🔥 IMPORTANT: redirect = manual
    const r = await fetch(url, { redirect: "manual" });

    const redirectUrl = r.headers.get("location");

    if(!redirectUrl){
        return res.status(404).send("No image");
    }

    // 👉 fetch ảnh thật
    const imgRes = await fetch(redirectUrl);
    const buffer = await imgRes.buffer();

    res.set("Content-Type", imgRes.headers.get("content-type"));
    res.send(buffer);
});

app.listen(3000, () => console.log("Server running on port 3000"));