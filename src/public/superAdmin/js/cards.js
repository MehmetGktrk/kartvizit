document.addEventListener("DOMContentLoaded", async function(){

    const result = await get('http://localhost:3000/api/admin/cards');

    console.log(result);
    await loadCards(result.data)
})

async function loadCards(cardsData) {
    const usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = '';

    
    // Örnek kullanıcılar
    const users = cardsData;
    
    users.forEach(user => {
        const rowHTML = `
            <tr data-id="${user.ID}">
                <td>
                    <div class="user-cell">
                        <img src="${user.profilResmi}" alt="${user.isim}" class="user-avatar-small">
                        <span>${user.isim}</span>
                    </div>
                </td>
                <td>${user.firma}</td>
                <td>${user.ID}</td>
                <td>${user.email}</td>
                <td>${user.views}</td>
            </tr>
        `;
        usersTableBody.innerHTML += rowHTML;
    });
}


function viewCard(ID){
    window.open(`http://localhost:3000/card?id=${ID}`)
}


// Durum ikonunu getir
function getStatusIcon(status) {
    switch(status) {
        case 'pending': return '<i class="fas fa-clock"></i>';
        case true: return '<i class="fas fa-check-circle"></i>';
        case false: return '<i class="fas fa-times-circle"></i>';
        default: return '';
    }
}

// Durum metnini getir
function getStatusText(status) {
    switch(status) {
        case 'pending': return 'Beklemede';
        case 'approved': return 'Onaylı';
        case 'rejected': return 'Reddedildi';
        default: return '';
    }
}


// Sayı formatlama
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


