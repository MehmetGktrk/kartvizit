var cardData;

async function getCardData(){
    try{
        
        const result = await get(`/api/card/previewCardData`);


        cardData = result.cardData;

        console.log(cardData)


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




// let cardData = {
//     name: 'Mehmet Göktürk',
//     position: 'Yazılım Geliştirici',
//     description: 'Merhaba! Ben Mehmet, tutkulu bir yazılım geliştiriciyim. Modern web teknolojileri ve mobil uygulama geliştirme konularında uzmanım.',
//     personalPhone: '+90 555 123 45 67',
//     workPhone: '+90 212 123 45 67',
//     email: 'mehmet@example.com',
//     address: 'İstanbul, Türkiye',
//     profileImage: 'indir.png',
//     social: {
//         linkedin: 'https://linkedin.com',
//         twitter: 'https://twitter.com',
//         instagram: 'https://instagram.com',
//         github: 'https://github.com',
//     },
//     socialVisibility: {
//         linkedin: true,
//         twitter: true,
//         instagram: true,
//         github: true
//     },
//     company: '',
//     department: '',
//     note: ''
// };


// QR kod instance'ı
let qrCodeInstance = null;

// Sayfa yüklendiğinde verileri yükle
document.addEventListener('DOMContentLoaded', async function() {
    await getCardData();
    updateCardDisplay();
});



// Kartvizit görünümünü güncelle
function updateCardDisplay() {

    let profilePhoto = "https://placehold.co/100x100";

    if(cardData.profilResmi != ""){
        profilePhoto = cardData.profilResmi;
    }

    document.getElementById('fullName').textContent = `${cardData.isim} ${cardData.soyad}`;
    document.getElementById('position').textContent = cardData.pozisyon;
    document.getElementById('description').textContent = cardData.aciklama;
    document.getElementById('personalPhone').textContent = cardData.kisiselTelefon;
    document.getElementById('personalPhone').href = `tel:${cardData.kisiselTelefon.replace(/\s/g, '')}`;
    document.getElementById('workPhone').textContent = cardData.isTelefonu;
    document.getElementById('workPhone').href = `tel:${cardData.isTelefonu.replace(/\s/g, '')}`;
    document.getElementById('email').textContent = cardData.acikEmail;
    document.getElementById('email').href = `mailto:${cardData.acikEmail}`;
    document.getElementById('profileImage').src = profilePhoto;

    const socialArray = Object.entries(cardData.social);

    for(let social of socialArray){
        const platform = social[0];
        const url = social[1];

        const socialMediaDiv = document.querySelector('.social-media');

        // 2. a etiketi oluştur
        const newLink = document.createElement('a');
        newLink.href = url;
        newLink.target = '_blank';
        newLink.className = 'social-link';

        // 3. ikon etiketi (i) oluştur ve a etiketine ekle
        const icon = document.createElement('i');
        icon.className = `fab fa-${platform}`; // Font Awesome sınıfı
        newLink.appendChild(icon);

        // 4. a etiketini div'e ekle
        socialMediaDiv.appendChild(newLink);

    }

    
}




document.getElementById('saveContactButton').addEventListener("click", async function (){
    const vcardString = generateVCardString(cardData);

    const fullName = `${cardData.isim}_${cardData.soyad}`;

    const blob = new Blob([vcardString], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${fullName || 'vcard'}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
})

// Paylaş fonksiyonu
function shareCard() {
    const shareData = {
        title: `${cardData.isim} ${cardData.soyad} - Dijital Kartvizit`,
        text: `${cardData.isim} ${cardData.soyad} - ${cardData.pozisyon}\n${cardData.acikEmail}\n${cardData.kisiselTelefon}`,
        url: `/card?id=${id}`
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
        text: `http://localhost:3000/card?id=${id}`,
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



function generateVCardString(vcardData) {

    vcardData['phoneNumbers'] = [{ number: vcardData.kisiselTelefon, label: 'cep' }]
    let vcard = `BEGIN:VCARD\nVERSION:3.0\n`;

    // FN (Formatted Name) her zaman olmalı
    const fullName = `${vcardData.isim || ''} ${vcardData.middleName || ''} ${vcardData.soyad || ''}`.trim();
    if (fullName) {
        vcard += `FN:${fullName}\n`;
    } else {
        vcard += `FN:Bilinmeyen Kişi\n`;
    }

    if (vcardData.soyad || vcardData.isim || vcardData.middleName || vcardData.onEk || vcardData.suffix) {
        vcard += `N:${vcardData.soyad || ''};${vcardData.isim || ''};${vcardData.middleName || ''};${vcardData.onEk || ''};${vcardData.suffix || ''}\n`;
    }

    if (vcardData.sirketAdi) {
        vcard += `ORG:${vcardData.sirketAdi}\n`;
    }

    if (vcardData.pozisyon) {
        vcard += `TITLE:${vcardData.pozisyon}\n`;
    }

    // Resim URL'si ekleme (PHOTO özelliği)
    if (vcardData.profilResmi) {
        vcard += `PHOTO;VALUE=URI:${vcardData.profilResmi}\n`;
    }

    if (Array.isArray(vcardData.phoneNumbers)) {
        vcardData.phoneNumbers.forEach(phone => {
            const typePart = phone.label ? `TYPE=${phone.label}` : 'TYPE=VOICE';
            vcard += `TEL;${typePart}:${phone.number}\n`;
        });
    }

    if (vcardData.acikEmail) {
        vcard += `EMAIL:${vcardData.acikEmail}\n`;
    }

    if (vcardData.website) {
        vcard += `URL:${vcardData.website}\n`;
    }

    if (vcardData.dogumGunu) {
        vcard += `BDAY:${vcardData.dogumGunu.replace(/-/g, '')}\n`;
    }

    // Adres bilgileri
    const addrComponents = [
        vcardData.sokak || '',
        vcardData.il || '',
        vcardData.ilce || '',
        vcardData.postaKodu || '',
        vcardData.ulke || ''
    ];
    if (addrComponents.some(comp => comp !== '')) {
        vcard += `ADR;TYPE=HOME:;;${vcardData.sokak || ''};${vcardData.il || ''};${vcardData.ilce || ''};${vcardData.postaKodu || ''};${vcardData.ulke || ''}\n`;
    }

    if (vcardData.not) {
        vcard += `NOTE:${vcardData.not}\n`;
    }

    vcard += `END:VCARD`;

    return vcard;
}