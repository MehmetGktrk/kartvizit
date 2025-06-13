

exports.getAdmins = async(db) => {
    const userCollection = db.collection('Users');

    const admins = await userCollection.find({ role: 'admin' }).toArray();

    let adminsData = [];

    const safeImage = (value) => (value == null || value === "") ? "https://placehold.co/100x100" : value;

    for (let admin of admins){
        let adminObject = {
            ID: admin.ID,
            isim: `${admin.isim} ${admin.soyad}`,
            firma: admin.firma,
            email: admin.email,
            yetkiliFirmalar: admin.yetkiliFirmalar,
            profilResmi: safeImage(admin.profilResmi)
        }

        adminsData.push(adminObject);
    }
    

    return { code: 200, message: 'Veriler Başarıyla Çekildi', data: adminsData };
    
}


exports.createAdmin = async(db, ID) => {
    const userCollection = db.collection('Users');

    const user = await userCollection.findOne({ ID: ID });

    if(!user){
        return { code: 400, message: 'Kullanıcı bulunamadı.' }; 
    }

    if(user.role == 'admin'){
        return { code: 400, message: 'Bu kullanıcı zaten admin.' };
    }

    await userCollection.updateOne({ ID: ID }, {
        $set: {
            role: 'admin',
            yetkiliFirmalar: []
        }
    }, { upsert: true });

    return { code: 200, message: 'Kullanıcıya admin yetkisi verildi.' };
}



exports.addPermission = async(db, ID, firma) =>{
    const userCollection = db.collection('Users');
    const companyCollection = db.collection('Companies');

    const checkUser = await userCollection.findOne({ ID: ID });
    const company = await companyCollection.findOne({ isletmeAdi: firma });


    if(!checkUser){
        return { code: 400, message: 'Kullanıcı bulunamadı.' };
    }

    if(!company){
        return { code: 400, message: 'Firma bulunamadı.' };
    }


    if(checkUser.yetkiliFirmalar.includes(firma)){
        return { code: 400, message: 'Bu firmaya zaten yetkisi var.'}
    }


    await userCollection.updateOne({ ID: ID }, {
        $push: {
            yetkiliFirmalar: firma
        }
    }, { upsert: true });

    return { code: 200, message: 'Yetki verildi.' };
}


exports.removePermission = async(db, ID, firma) => {
    const userCollection = db.collection('Users');

    const user = await userCollection.findOne({ ID: ID });

    const companies = user.yetkiliFirmalar;

    if(!user){
        return { code: 400, message: 'Kullanıcı Bulunamadı.' };
    }

    if(!companies.includes(firma)){
        return { code: 400, message: 'Kullanıcı Zaten bu yetkiye sahip değil.' }
    }

    await userCollection.updateOne({ ID: ID }, {
        $pull: {
            yetkiliFirmalar: firma
        }
    })

    return { code: 200, message: 'Yetki kaldırıldı.' };
}

exports.deleteAdmin = async(db, ID) => {
    const userCollection = db.collection('Users');

    const user = await userCollection.findOne({ ID: ID });

    if(!user){
        return { code: 400, message: 'Kullanıcı bulunamadı.' };
    }

    if(user.role != 'admin'){
        return { code: 400, message: 'Bu kullanıcı zaten admin değil.' };
    }

    await userCollection.updateOne({ ID: ID }, {
        $set:{
            role: 'user',
        },

        $unset: {
            yetkiliFirmalar: ''
        }
    })

    return { code: 200, message: 'Kullanıcıdan admin yetkisi alındı.' };
}

exports.inactiveUser = async(db, ID) => {
    const userCollection = db.collection('Users');

    const user = await userCollection.findOne({ ID: ID });

    if(!user){
        return { code: 400, message: 'Kullanıcı bulunamadı.' };
    }

    if(!user.isActive){
        return { code: 400, message: 'Bu kullanıcı zaten pasif.' };
    }

    await userCollection.updateOne({ ID: ID }, {
        $set:{
            isActive: false
        }
    })

    return { code: 200, message: 'Kullanıcı pasife alındı.' };
}


exports.activeUser = async(db, ID) => {
    const userCollection = db.collection('Users');

    const user = await userCollection.findOne({ ID: ID });

    if(!user){
        return { code: 400, message: 'Kullanıcı bulunamadı.' };
    }

    if(user.isActive){
        return { code: 400, message: 'Bu kullanıcı zaten aktif.' };
    }

    await userCollection.updateOne({ ID: ID }, {
        $set: {
            isActive: true
        }
    })

    return { code: 400, message: 'Kullanıcı aktife alındı.' };
}


exports.getPermission = async(db, ID) => {
    const userCollection = db.collection('Users');
    const companyCollection = db.collection('Companies');

    const user = await userCollection.findOne({ ID: ID });
    const companies = await companyCollection.find().toArray();


    if(!user){
        return { code: 400, message: 'Kullanıcı Bulunamadı.' };
    }

    const companiesDate = [];

    for (let company of companies){
        let isSelected = false;


        if(user.yetkiliFirmalar){
            if(user.yetkiliFirmalar.includes(company.isletmeAdi)){
                isSelected = true;
            }
        }

        const companyObject = {
            kisaltma: company.kisaltma,
            isletmeAdi: company.isletmeAdi,
            ticariTamUnvani: company.ticariTamUnvani,
            isSelected: isSelected
        }


        companiesDate.push(companyObject);
    }

    return { code: 200, message: 'Veriler başarıyla çekildi.', data: companiesDate };
}