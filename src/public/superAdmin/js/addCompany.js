

async function addCompany() {
    const kisaltma = document.getElementById('kisaltma').value;
    const isletmeAdi = document.getElementById('isletmeAdi').value;
    const isletmeAdresi = document.getElementById('isletmeAdresi').value;
    const ticariTamUnvani = document.getElementById('ticariTamUnvani').value;
    const VKNBilgileri = document.getElementById('VKNBilgileri').value;
    const mersisNo = document.getElementById('mersisNo').value;


    console.log(kisaltma);
    console.log(isletmeAdi);
    console.log(isletmeAdresi);
    console.log(ticariTamUnvani);
    console.log(VKNBilgileri);
    console.log(mersisNo);
    
    const newCompany = {
        kisaltma: kisaltma,
        isletmeAdi: isletmeAdi,
        isletmeAdresi: isletmeAdresi,
        ticariTamUnvani: ticariTamUnvani,
        VKNBilgileri: VKNBilgileri,
        mersisNo: mersisNo
    }

    const result = await post(newCompany ,'http://localhost:3000/api/admin/addCompany')
    console.log(result)

    alert(result.message);
}

document.getElementById('ekleButton').addEventListener("click", async function(){
    await addCompany();
})


document.getElementById('geriDonButton').addEventListener("click", function(){
    window.location.href = 'companies';
})


function writeInputs(){
    const kisaltma = document.getElementById('kisaltma')
    const isletmeAdi = document.getElementById('isletmeAdi')
    const isletmeAdresi = document.getElementById('isletmeAdresi')
    const ticariTamUnvani = document.getElementById('ticariTamUnvani')
    const VKNBilgileri = document.getElementById('VKNBilgileri')
    const mersisNo = document.getElementById('mersisNo')


    kisaltma.value = 'AGB'
    isletmeAdi.value = 'AGROMAR (Bergama Şubesi)'
    isletmeAdresi.value = 'Maltepe Mh. Kaymakam Kemal Bey Cd. No: 91/5 Bergama/İzmir';
    ticariTamUnvani.value = 'AGROMAR Marmara Tarım Ürünleri Sanayi ve Ticaret A.Ş.';
    VKNBilgileri.value = 'Antalya Kurumlar - 00800 71284';
    mersisNo.value = '0008 0071 2840 0011';
}