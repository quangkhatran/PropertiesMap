import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc, collection, onSnapshot, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔐 PROTECT PAGE
onAuthStateChanged(auth, async (user)=>{
    if(!user){
        window.location.href = "/index.html";
        return;
    }

    const snap = await getDoc(doc(db, "users", user.email.toLowerCase()));

    if(!snap.exists() || snap.data().role !== "admin"){
        alert("Access denied");
        window.location.href = "/index.html";
        return;
    }

    document.getElementById("admin-info").innerText = user.email;

    loadUsers();
});


window.logout = async ()=>{
    await signOut(auth);
    window.location.href = "/index.html";
};

function showToast(msg){
    const t = document.createElement("div");
    t.className = "toast";
    t.innerText = msg;
    document.body.appendChild(t);

    setTimeout(()=>t.remove(),2000);
}

function loadUsers(){
    const container = document.getElementById("view-users");

    onSnapshot(collection(db,"users"), (snapshot)=>{

        container.innerHTML = "";

        let total = 0;
        let pending = 0;

        snapshot.forEach(docSnap=>{
            const u = docSnap.data();
            const email = docSnap.id;

            total++;
            if(u.status !== "approved") pending++;

            const roleClass =
                u.role === "admin" ? "role-admin" :
                u.role === "vip" ? "role-vip" : "role-user";

            const statusClass =
                u.status === "approved" ? "status-approved" : "status-pending";

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <b>${email}</b><br><br>

                <span class="badge ${roleClass}">${u.role}</span>
                <span class="badge ${statusClass}">${u.status}</span>

                <div class="actions">
                    <button class="btn btn-approve">Approve</button>
                    <button class="btn btn-vip">VIP</button>
                    <button class="btn btn-admin">Admin</button>
                    <button class="btn btn-user">User</button>
                    <button class="btn btn-delete">Delete</button>
                </div>
            `;

            const btnApprove = card.querySelector(".btn-approve");
            const btnVIP = card.querySelector(".btn-vip");
            const btnADMIN = card.querySelector(".btn-admin");
            const btnUSER = card.querySelector(".btn-user");
            const btnDELETE = card.querySelector(".btn-delete");

            btnApprove.onclick = async ()=>{
                btnApprove.innerText = "Loading...";
                await approveUser(email);
                showToast("Approved");
            };

            btnVIP.onclick = async ()=>{
                btnVIP.innerText = "Updating...";
                await setUserRole(email,"vip");
                showToast("Set VIP");
            };

            btnADMIN.onclick = async ()=>{
                if(!confirm("Set this user as ADMIN?")) return;

                btnADMIN.innerText = "Updating...";
                await setUserRole(email,"admin");
                showToast("Set Admin");
            };
            btnUSER.onclick = async ()=>{
                if(email === auth.currentUser.email){
                    alert("Không thể tự downgrade chính mình");
                    return;
                }

                if(!confirm("Set this user as BASIC USER?")) return;

                btnUSER.innerText = "Updating...";
                await setUserRole(email,"user");

                showToast("Set USER");
            };
            btnDELETE.onclick = async ()=>{
                if(email === auth.currentUser.email){
                    alert("Không thể xoá chính mình");
                    return;
                }

                if(!confirm("XÓA user này? Không thể hoàn tác!")) return;

                btnDELETE.innerText = "Deleting...";

                await deleteUser(email);

                showToast("User deleted");
            };

            container.appendChild(card);
        });

        document.getElementById("total-users").innerText = "Total: " + total;
        document.getElementById("pending-users").innerText = "Pending: " + pending;

    });
}

window.approveUser = async (email)=>{
    if(email === auth.currentUser.email){
        alert("Cannot modify yourself");
        return;
    }
    
    try{
        await updateDoc(doc(db,"users",email), {
            status:"approved"
        });
    } catch(e) {
        console.log(e.message);
        alert("Error: " + e.message);
    }
};

window.setUserRole = async (email, role)=>{
    if(email === auth.currentUser.email){
        alert("Cannot change your own role");
        return;
    }
    
    try {
        await updateDoc(doc(db,"users",email), {
            role
        });
    } catch(e) {
        console.log(e.message);
        alert("Error: " + e.message);
    }
};

window.deleteUser = async (email)=>{
    try{
        await deleteDoc(doc(db,"users",email));
    }catch(e){
        alert(e.message);
    }
};

window.navigate = (view, el)=>{
    document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
    document.getElementById("view-" + view).classList.add("active");

    document.getElementById("page-title").innerText =
        view.charAt(0).toUpperCase() + view.slice(1);

    // active sidebar
    document.querySelectorAll(".sidebar button").forEach(b=>b.classList.remove("active"));
    el.classList.add("active");

    const searchInput = document.getElementById("search");

    searchInput.oninput = (e)=>{
        const keyword = e.target.value.toLowerCase();
        document.querySelectorAll(".card").forEach(card=>{
            card.style.display = card.innerText.toLowerCase().includes(keyword)
                ? "block"
                : "none";
        });
    };
};



