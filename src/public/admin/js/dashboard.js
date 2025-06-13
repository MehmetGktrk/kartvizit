document.addEventListener('DOMContentLoaded', async function() {
    console.log('Dashboard sayfası yüklendi');

    const result = await get('http://localhost:3000/api/admin/dashboard')

    updateDashboard(result.data);
    getLogs(result.data.logs);
});


function updateDashboard(data) {
    document.getElementById("totalUser").innerText = data.totalUser;
    document.getElementById("totalView").innerText = data.totalView;
    document.getElementById("verifiedUser").innerText = data.verifiedUser;
    document.getElementById("pendingUser").innerText = data.pendingUser;
}

function getLogs(logs){

    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';

    for(let log of logs){

        let typeData = getIcon(log.code);
        let date = zamanHesapla(new Date(log.date));

        const activity = `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${typeData.icon}"></i>
                </div>
                <div class="activity-content">
                    <p><strong>${typeData.type}:</strong> ${log.user}</p>
                    <span class="activity-time">${date}</span>
                </div>
            </div>
        `;
        activityList.innerHTML += activity;
    } 
}


function getIcon(code){
    let icon = 'fas fa-question';
    let type = 'Bilinmiyor';


    switch (code) {
        case 0:
            type = 'Yeni Kullanıcı Kaydı';
            icon = 'fas fa-user-plus';
            break;
    
        case 1:
            type = 'Kullanıcı Onaylandı';
            icon = 'fas fa-check';
            break;

        case 2:
            type = 'Kullanıcı Reddedildi';
            icon = 'fas fa-x'
            break;

        case 3:
            type = 'Kartvizit Güncellendi';
            icon = 'fas fa-edit';
            break;

        case 4:
            type = 'Kullanıcı Silindi';
            icon = 'fas fa-trash'
            break;
            
        default:
            type = 'Bilinmiyor';
            icon = 'fas fa-question';
            break;
    }

    return { type, icon }
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


