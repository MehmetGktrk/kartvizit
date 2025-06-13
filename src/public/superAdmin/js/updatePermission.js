let backType = 'users';
let userID;
document.addEventListener("DOMContentLoaded", async function(){
    const params = new URLSearchParams(window.location.search);
    userID = params.get('id');
    backType  = params.get('back');
    const result = await get(`http://localhost:3000/api/superAdmin/getPermission/${userID}`);
    console.log(result)

    writeCompanies(result.data)
})


function writeCompanies(companies){
    const usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = '';

    
    companies.forEach(company => { 
        const rowHTML = `
            <tr>
                <td>${company.kisaltma}</td>
                <td>${company.isletmeAdi}</td>
                <td>${company.ticariTamUnvani}</td>
                
                <td>${setSelected(company.isSelected, company.isletmeAdi)}</td>
            </tr>
        `;
        usersTableBody.innerHTML += rowHTML;
    });
}


function setSelected(status, isletmeAdi){

    if(status == true){
        return `<button style="width: 60px;  height: 40px" class="btn btn-sm btn-danger" onclick="(async () => { await removePermission('${isletmeAdi}'); })()">
                        <i style="margin-right: auto; margin-left: auto;" class="fas fa-minus"></i>
                </button>`
    }

    else{
        return `<button style="width: 60px; background-color: #16a34a; height: 40px" class="btn btn-sm btn-danger" onclick="(async () => { await addPermission('${isletmeAdi}'); })()">
                        <i style="margin-right: auto; margin-left: auto;" class="fas fa-plus"></i>
                </button>`
    }
}


function setBackButton(){
    if(backType == 'users'){
        window.location.href = 'users';
    }
    else if(backType == 'admins'){
        window.location.href = 'admins';
    }
    else{
        alert("Önceki sayfa bulunamadı.")
        window.location.href = 'dashboard';
    }
}


async function addPermission(isletmeAdi){
    const result = await post({ ID: Number(userID), firma: isletmeAdi}, '/api/superAdmin/addPermission');
    console.log(result);

    alert(result.message);

    if(result.code == 200){
        const result = await get(`/api/superAdmin/getPermission/${userID}`);
        console.log(result)

        writeCompanies(result.data)
    }
}

async function removePermission(isletmeAdi) {
    const result = await post({ ID: Number(userID), firma: isletmeAdi },'/api/superAdmin/removePermission');
    console.log(result);

    alert(result.message);

    if(result.code == 200){
        const result = await get(`/api/superAdmin/getPermission/${userID}`);
        console.log(result)

        writeCompanies(result.data)
    }
}