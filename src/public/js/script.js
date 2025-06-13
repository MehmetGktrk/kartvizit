async function getCardData(){
    try{

        const params = new URLSearchParams(window.location.search);
        const id = params.get('ID');
        
        const result = await get('/auth/login');


        if(result.code != 200){
            showNotification('Kartvizit bilgileri alınamadı', 'error');
            return;
        }


    }catch(err){
        console.error(err);
        showNotification('Kartvizit bilgileri alınamadı', 'error');
        return;
    }
}



let cardData = {
    name: 'Mehmet Göktürk',
    position: 'Yazılım Geliştirici',
    description: 'Merhaba! Ben Mehmet, tutkulu bir yazılım geliştiriciyim. Modern web teknolojileri ve mobil uygulama geliştirme konularında uzmanım.',
    personalPhone: '+90 555 123 45 67',
    workPhone: '+90 212 123 45 67',
    email: 'mehmet@example.com',
    address: 'İstanbul, Türkiye',
    profileImage: 'indir.png',
    social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
        github: 'https://github.com',
    },
    socialVisibility: {
        linkedin: true,
        twitter: true,
        instagram: true,
        github: true
    },
    company: '',
    department: '',
    note: ''
};

// QR kod instance'ı
let qrCodeInstance = null;

// Sayfa yüklendiğinde verileri yükle
document.addEventListener('DOMContentLoaded', function() {
    loadCardData();
});

// Kartvizit verilerini yükle
function loadCardData() {
    // LocalStorage'dan verileri al
    const savedData = localStorage.getItem('cardData');
    if (savedData) {
        cardData = JSON.parse(savedData);
    }
    
    // Verileri sayfaya yerleştir
    updateCardDisplay();
}

// Kartvizit görünümünü güncelle
function updateCardDisplay() {
    document.getElementById('fullName').textContent = cardData.name;
    document.getElementById('position').textContent = cardData.position;
    document.getElementById('description').textContent = cardData.description;
    document.getElementById('personalPhone').textContent = cardData.personalPhone;
    document.getElementById('personalPhone').href = `tel:${cardData.personalPhone.replace(/\s/g, '')}`;
    document.getElementById('workPhone').textContent = cardData.workPhone;
    document.getElementById('workPhone').href = `tel:${cardData.workPhone.replace(/\s/g, '')}`;
    document.getElementById('email').textContent = cardData.email;
    document.getElementById('email').href = `mailto:${cardData.email}`;
    document.getElementById('address').textContent = cardData.address;
    document.getElementById('profileImage').src = cardData.profileImage;
    
    // Sosyal medya linklerini güncelle ve görünürlüğü kontrol et
    const socialPlatforms = ['linkedin', 'twitter', 'instagram', 'github'];
    socialPlatforms.forEach(platform => {
        const element = document.getElementById(platform);
        if (element) {
            element.href = cardData.social[platform];
            // Görünürlük kontrolü
            if (cardData.socialVisibility && cardData.socialVisibility[platform] === false) {
                element.style.display = 'none';
            } else {
                element.style.display = 'flex';
            }
        }
    });
}

// Kişilere ekle fonksiyonu
function saveContact() {
    // vCard formatında veri oluştur
    let vcard = `BEGIN:VCARD
VERSION:3.0
FN:${cardData.name}
TITLE:${cardData.position}`;
    
    // Şirket bilgileri varsa ekle
    if (cardData.company || cardData.department) {
        vcard += `\nORG:${cardData.company || ''}${cardData.department ? ';' + cardData.department : ''}`;
    }
    
    vcard += `
TEL;TYPE=CELL:${cardData.personalPhone}
TEL;TYPE=WORK:${cardData.workPhone}
EMAIL:${cardData.email}
ADR:;;;${cardData.address};;;`;
    
    // Görünür sosyal medya linklerini ekle
    if (cardData.socialVisibility?.linkedin !== false && cardData.social?.linkedin) {
        vcard += `\nURL:${cardData.social.linkedin}`;
    }
    
    // Not varsa ekle
    if (cardData.note) {
        vcard += `\nNOTE:${cardData.note}`;
    }
    
    vcard += `\nEND:VCARD`;
    
    // vCard dosyası olarak indir
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cardData.name.replace(/\s/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Kişi bilgileri indirildi!');
}

// Paylaş fonksiyonu
function shareCard() {
    const shareData = {
        title: `${cardData.name} - Dijital Kartvizit`,
        text: `${cardData.name} - ${cardData.position}\n${cardData.email}\n${cardData.personalPhone}`,
        url: window.location.href
    };
    
    // Web Share API'yi kontrol et
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => showNotification('Kartvizit paylaşıldı!'))
            .catch((error) => console.log('Paylaşım iptal edildi'));
    } else {
        // Fallback: URL'yi kopyala
        copyToClipboard(window.location.href);
        showNotification('Kartvizit linki kopyalandı!');
    }
}

// Panoya kopyala
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Bildirim göster
function showNotification(message) {
    // Bildirim elementi oluştur
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary-color);
        color: white;
        padding: 16px 24px;
        border-radius: 50px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideUp 0.3s ease;
    `;
    
    // Animasyon ekle
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                transform: translateX(-50%) translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // 3 saniye sonra kaldır
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ESC tuşuna basıldığında modalı kapat
window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeQRModal();
    }
});

// QR Kod göster
function showQRCode() {
    const modal = document.getElementById('qrModal');
    modal.classList.add('active');
    
    // QR kod container'ını temizle
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';
    
    // Yeni QR kod oluştur
    qrCodeInstance = new QRCode(qrContainer, {
        text: window.location.href,
        width: 200,
        height: 200,
        colorDark: '#1f2937',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
}

// QR Kod modalını kapat
function closeQRModal() {
    const modal = document.getElementById('qrModal');
    modal.classList.remove('active');
}

// QR modal dışına tıklandığında kapat
window.addEventListener('click', function(e) {
    const qrModal = document.getElementById('qrModal');
    if (e.target === qrModal) {
        closeQRModal();
    }
}); 