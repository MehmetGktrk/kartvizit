

document.addEventListener("DOMContentLoaded", async function(){
    await loadPendingCards();
})




async function loadPendingCards() {

     const usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = '';

    const result = await get('http://localhost:3000/api/admin/pendingUsers');

    console.log(result)
    
    // Örnek kullanıcılar
    const users = result.data;
    
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
                <td>${user.email}</td>
                <td>${user.kisiselTelefon}</td>
                <td>${zamanHesapla(new Date(user.createdAt))} </td>
                <td>
                    <button style="width: 60px; background-color: #16a34a; height: 40px" class="btn btn-sm" onclick="verifyUser(${user.ID})">
                        <i style="color: white; margin-right: auto; margin-left: auto;" class="fas fa-check"></i>
                    </button>
                    <button style="width: 60px; height: 40px" class="btn btn-sm btn-danger" onclick="rejectUser(${user.ID})">
                        <i style="margin-right: auto; margin-left: auto;" class="fas fa-x"></i>
                    </button>
                </td>
            </tr>
        `;
        usersTableBody.innerHTML += rowHTML;
    });
}


async function verifyUser(ID) {
    const result = await post({ ID: ID }, 'http://localhost:3000/api/admin/verifyUser');
    console.log(result);
    showNotification(result.message, result.code);

    if(result.code == 200){
        const element = document.querySelector(`[data-id="${ID}"]`);
        element.remove();
    }

}

async function rejectUser(ID) {
    const result = await post({ ID: ID }, 'http://localhost:3000/api/admin/rejectUser');
    console.log(result);
    showNotification(result.message, result.code);

    if(result.code == 200){
        const element = document.querySelector(`[data-id="${ID}"]`);
        element.remove();
    }

}


function zamanHesapla(tarih1) {

    const tarih2 = new Date();

    const saniyeFarki = Math.floor((tarih2 - tarih1) / 1000);

    const dakika = Math.floor(saniyeFarki / 60);
    const saat = Math.floor(dakika / 60);
    const gun = Math.floor(saat / 24);

    if (saniyeFarki < 60) return "az önce";
    if (dakika < 60) return `${dakika} dakika önce`;
    if (saat < 24) return `${saat} saat önce`;
    if (gun < 30) return `${gun} gün önce`;

    // İsteğe bağlı: ay/yıl hesaplamak isterseniz
    const ay = Math.floor(gun / 30);
    if (ay < 12) return `${ay} ay önce`;

    const yil = Math.floor(ay / 12);
    return `${yil} yıl önce`;
}





function showNotification(message, httpCode) {

    let type = "error";

    if(httpCode == 200){
        type = 'success';
    }
    else {
        type = 'error';
    }
    // Mevcut bildirimleri kaldır
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
        background: ${type === 'success' ? '#16a34a' : 
                     type === 'error' ? '#dc2626' :
                     '#f59e0b'};
        color: white;
    `;
    
    document.body.appendChild(notification);
    
    // 3 saniye sonra kaldır
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}