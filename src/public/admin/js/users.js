document.addEventListener("DOMContentLoaded", async function () {
    await loadUsers();
})



async function loadUsers() {
    const usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = '';

    const result = await get('http://localhost:3000/api/admin/getUsers');

    console.log(result)
    
    // Örnek kullanıcılar
    const users = result.data;
    
    users.forEach(user => {
        
        console.log(user)
        const rowHTML = `
            <tr data-id="${user.ID}">
                <td>
                    <div class="user-cell">
                        <img src="${user.profilResmi}" alt="${user.isim}" class="user-avatar-small">
                        <span>${user.isim}</span>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>${formatDate(user.createdAt)}</td>
                <td>
                    <span class="status-badge ${formatStatus(user.verified)}">
                        ${formatStatusText(user.verified)}
                    </span>
                </td>
                <td>
                    <span class="status-badge ${formatActive(user.isActive)}">
                        ${formatActiveText(user.isActive)}
                    </span>
                </td>
            </tr>
        `;
        usersTableBody.innerHTML += rowHTML;
    });
}


async function deleteUser(ID) {
    if(confirm("Bu kullanıcıyı silmek istediğinize emin misiniz ?")){
        const result = await post({ ID: ID }, 'http://localhost:3000/api/admin/deleteUser');
        console.log(result)

        showNotification(result.message, result.code);

        if(result.code == 200){
            const element = document.querySelector(`[data-id="${ID}"]`);
            element.remove();
        }
    }
}


function formatStatus(status){
    if(status == true){
        return 'active';
    }

    else if(status == 'pending'){
        return 'pending';
    }
    else{
        return 'inactive'
    }
}


function formatActive(status){
    if(status == true){
        return 'active';
    }
    else{
        return 'inactive';
    }
}

function formatActiveText(status){
    if(status == true){
        return 'Aktif'
    }
    else{
        return 'Pasif'
    }
}

function formatStatusText(status){
    if(status == true){
        return 'Onaylandı'
    }
    else if(status == 'pending'){
        return 'Beklemede';
    }
    else{
        return 'Red'
    }
}



function formatDate(tarih) {

    const date = new Date(tarih);
    const aylar = [
        "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
        "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];

    const gun = date.getDate();
    const ay = aylar[date.getMonth()];
    const yil = date.getFullYear();

    return `${gun} ${ay} ${yil}`;
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