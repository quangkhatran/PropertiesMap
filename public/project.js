 // lấy id từ URL
<script src="data.js"></script>

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// tìm project
const project = projects.find(p => p.id === id);

const container = document.getElementById("project");

if(project){

    container.innerHTML = `
        <div class="hero" style="background-image:url('${project.images?.[0]}')">
            <h1>${project.name}</h1>
        </div>

        <div class="section">

            <div class="grid">
                <div class="info-box">
                    <h3>Thông tin</h3>
                    <p>${project.location}</p>
                    <p>${project.floors}</p>
                    <p>Tenant: ${project.tenant}</p>
                </div>

                <div class="info-box">
                    <h3>Investment</h3>
                    <p>Price: ${project.price || "Updating"}</p>
                    <p>ROI: ${project.roi || "-"}</p>
                </div>
            </div>

            <h3 style="margin-top:40px">Gallery</h3>
            <div class="gallery">
                ${project.images.map(img => `<img src="${img}">`).join("")}
            </div>

            <div id="map"></div>

            <div class="cta">
                Contact for investment →
            </div>

        </div>
    `;

    // MAP
    const map = L.map('map').setView([project.lat, project.lng], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    L.marker([project.lat, project.lng]).addTo(map);
}