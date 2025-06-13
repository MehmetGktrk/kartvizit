document.addEventListener("DOMContentLoaded", async function () {
    
    const result = await get(`/api/card/getVerified`);

    console.log(result)

    const settings = setIcon(result.data)

    document.getElementById('verifiedIcon').className = settings.icon;
    document.getElementById('verifiedText').innerText = settings.text;
    document.getElementById('verifiedSection').style.color = settings.color;

    if(result.data == true){
        window.location.href = '/previewCard';
    }
})


function setIcon(status){
    let icon = 'fas fa-times-circle'; // Red
    let text = 'İsteğiniz Reddedildi';
    let color = '#dc2626';

    if(status == true){
        icon = 'fas fa-check-circle';
        text = 'Onaylandı';
        color = '#16a34a';
    }

    else if(status == 'pending'){
        icon = 'fas fa-clock';
        text = 'Onay Bekleniyor';
        color = '#f59e0b'
    }

    return { icon, text, color }

}