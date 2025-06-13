
document.addEventListener("DOMContentLoaded", async function(){
    await loadPage();
})

async function loadPage() {
    const cardData = await getCardData();
    writeInput(cardData);

    const platforms = cardData.socials;
    const visibleSocials = cardData.visibleSocials;

    const convertArray = Object.entries(platforms);

    removeAllSocialMedia();
    
    for (let data of convertArray){
        let platform = data[0];
        let url = data[1];
        let visible = false;

        if(visibleSocials.includes(platform)){
            visible = true
        }

        addSocialMediaPlatform(platform, { url: url, visible: visible })
    }
}


async function getCardData() {
    const result = await get('/api/card/getCardAllData');

    if(result.code != 200){
        showNotification(result.message, 400)
    }
    return result.cardData;
}


async function updateData() {
    
    await getAllInput();
    await getSocial();
    await getVisible();

    console.log(dataObject)

    const body = {
        newData: dataObject
    }
    const result = await post(body, '/api/card/updateCard')

    showNotification(result.message, result.code);
    console.log(result);
}





let dataObject = {};



async function getAllInput() {
    let inputValues = {};

    const formGroups = document.querySelectorAll('.form-group');


    for (let form of formGroups){

        const label = form.querySelector('label');
        const input = form.querySelector('input, textarea');


        const key = label.dataset.key;
        const value = input.value || '';

        inputValues[key] = value;

        // const label = document.querySelector(`label[for="${input.id}"]`)
        // const labelKey = label ? label.getAttribute('data-key') || '' : '';

        //inputValues[labelKey] = input.value
    }

    dataObject = inputValues;

}




function writeInput(object){
    const formGroups = document.querySelectorAll('.form-group');
   
    for(let form of formGroups){

        const label = form.querySelector('label');
        const input = form.querySelector('input, textarea');


        const key = label.dataset.key;

        input.value = object[key];
    }
}




async function getSocial(){
    var socials = {};

    const socialInputs = document.querySelectorAll("input[data-socialMedia]");

    for (let input of socialInputs){
        const platform = input.getAttribute('data-socialMedia');
        const value = input.value;

        socials[platform] = value;
    }

    dataObject['socials'] = socials;

    console.log(socials);
}

async function getVisible(){
    var visibles = []

    const checkBoxs = document.querySelectorAll('input[data-checkBox]');

    for (let checkBox of checkBoxs){
        const platform = checkBox.getAttribute('data-checkBox');
        const isVisible = checkBox.checked;

        if(isVisible){
            visibles.push(platform);
        }
    }

    dataObject['visibleSocials'] = visibles;

    console.log(visibles);
}


document.getElementById("saveButton").addEventListener("click", async function(){
    await updateData();
    await loadPage();
})


// Platform bilgileri
const socialPlatforms = {
    facebook: { icon: 'fab fa-facebook', placeholder: 'https://facebook.com/kullanici' },
    youtube: { icon: 'fab fa-youtube', placeholder: 'https://youtube.com/channel/...' },
    tiktok: { icon: 'fab fa-tiktok', placeholder: 'https://tiktok.com/@kullanici' },
    pinterest: { icon: 'fab fa-pinterest', placeholder: 'https://pinterest.com/kullanici' },
    whatsapp: { icon: 'fab fa-whatsapp', placeholder: 'https://wa.me/905551234567' },
    telegram: { icon: 'fab fa-telegram', placeholder: 'https://t.me/kullanici' },
    discord: { icon: 'fab fa-discord', placeholder: 'Discord kullanıcı adı' },
    medium: { icon: 'fab fa-medium', placeholder: 'https://medium.com/@kullanici' },
    behance: { icon: 'fab fa-behance', placeholder: 'https://behance.net/kullanici' },
    dribbble: { icon: 'fab fa-dribbble', placeholder: 'https://dribbble.com/kullanici' }
};


document.getElementById("addSocial").addEventListener("click", addSocialMedia);

function addSocialMedia() {
    const select = document.getElementById('newSocialPlatform');
    const platform = select.value;
    
    if (!platform) {
        showNotification('Lütfen bir platform seçin', 400);
        return;
    }
    
    // Platform zaten ekliyse
    if (document.querySelector(`[data-platform="${platform}"]`)) {
        showNotification('Bu platform zaten ekli', 400);
        return;
    }
    
    addSocialMediaPlatform(platform);
    select.value = '';
}


function addSocialMediaPlatform(platform, data = {}) {
    const platformInfo = socialPlatforms[platform];
    if (!platformInfo) return;
    
    const container = document.getElementById('socialMediaContainer');
    const socialItem = document.createElement('div');
    socialItem.className = 'social-item';
    socialItem.setAttribute('data-platform', platform);
    
    socialItem.innerHTML = `
        <div class="social-content">
            <div class="social-icon">
                <i class="${platformInfo.icon}"></i>
            </div>
            <div class="social-input-group">
                <label>${platform.charAt(0).toUpperCase() + platform.slice(1)}</label>
                <input data-socialMedia="${platform}" type="url" id="edit${platform}" placeholder="${platformInfo.placeholder}" value="${data.url || ''}">
            </div>
            <div class="social-actions">
                <label class="toggle-small">
                    <input data-checkBox=${platform} type="checkbox" id="${platform}Visible" ${data.visible !== false ? 'checked' : ''}>
                    <span class="slider-small"></span>
                </label>
                <button type="button" class="remove-social" onclick="removeSocialMedia('${platform}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    
    container.appendChild(socialItem);
}


// Sosyal medya platformunu kaldır
function removeSocialMedia(platform) {
    const item = document.querySelector(`[data-platform="${platform}"]`);
    if (item) {
        item.remove();
    }
}

function removeAllSocialMedia(){
    document.getElementById("socialMediaContainer").innerHTML = "";
}

function showNotification(message, httpCode) {
    // Mevcut bildirimleri kaldır

    var type = 'success';

    if(httpCode == 200){
      type = 'success';
    }else{
      type = 'error';
    }

    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 3 saniye sonra kaldır
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 1200);
} 