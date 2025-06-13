

document.addEventListener("DOMContentLoaded", async function () {
    const result = await get('/api/superAdmin/getAdmins')
    console.log(result);
    writeAdmins(result.data)
})


function writeAdmins(admins) {
    const usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = '';

    
    admins.forEach(admin => {
        const rowHTML = `
            <tr data-id="${admin.ID}">
                <td>
                    <div class="user-cell">
                        <img src="${admin.profilResmi}" alt="${admin.isim}" class="user-avatar-small">
                        <span>${admin.isim}</span>
                    </div>
                </td>
                <td>${admin.firma}</td>
                <td>${admin.email}</td>
                <td>${formatYetki(admin.yetkiliFirmalar)}</td>
                
                <td>
                    <button style="width: 60px; background-color: #16a34a; height: 40px" class="btn btn-sm btn-danger" onclick="permissionPage(${admin.ID})">
                        <i style="margin-right: auto; margin-left: auto;" class="fas fa-user-cog"></i>
                    </button>
                    <button style="width: 60px; height: 40px" class="btn btn-sm btn-danger" onclick="(async () => { await deleteAdmin(${admin.ID}); })()">
                        <i style="margin-right: auto; margin-left: auto;" class="fas fa-user-shield"></i>
                    </button>

                </td>
            </tr>
        `;
        usersTableBody.innerHTML += rowHTML;
    });
}

function formatYetki(yetkiler){
    if (!yetkiler || yetkiler.length === 0) return '—';
    return yetkiler.join('<br>');
}

function permissionPage(ID){
    window.location.href = `updatePermission?id=${ID}&back=admins`
}

async function deleteAdmin(ID){
    const result = await post({ ID: ID }, '/api/superAdmin/deleteAdmin');
    console.log(result);
    alert(result.message);

    if(result.code == 200){
        const result = await get('/api/superAdmin/getAdmins')
        console.log(result);
        writeAdmins(result.data)
    }
}