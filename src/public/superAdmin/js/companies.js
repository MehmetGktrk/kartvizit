document.addEventListener("DOMContentLoaded", async function(){
    const result = await get('http://localhost:3000/api/admin/getCompanies');
    console.log(result)

    loadCompanies(result.data)
})


function loadCompanies(companies){
    const usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = '';


    companies.forEach(companie => {
        const rowHTML = `
            <tr data-id="${companie.isletmeAdi}">
                <td>${companie.kisaltma}</td>
                <td>${companie.isletmeAdi}</td>
                <td>${companie.isletmeAdresi}</td>
                <td>${companie.ticariTamUnvani}</td>
                <td>${companie.VKNBilgileri}</td>
                <td>${companie.mersisNo}</td>
            </tr>
        `;
        usersTableBody.innerHTML += rowHTML;
    });
}

document.getElementById('addCompanyButton').addEventListener("click", function(){
    window.location.href = 'addCompany'
})