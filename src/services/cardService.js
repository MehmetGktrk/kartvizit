const logUtils = require('../utils/logUtils');

exports.getCardData = async(db, ID) => {

    const userCollection = db.collection('Users');

    const user = await userCollection.findOne({ ID: ID });


    if(!user){
        return { code: 400, message: 'Kartvizit Bulunamadı.' }
    }

   const defaultValue = (value) => value ?? 'Boş';
   const defaultProfileImage = (value) => value ?? 'indir.png'

    const cardData = {
        name: `${defaultValue(user.isim)} ${defaultValue(user.soyad)}`,
        position: defaultValue(user.pozisyon),
        description: defaultValue(user.aciklama),
        personalPhone: defaultValue(user.kisiselTelefon),
        workPhone: defaultValue(user.isTelefonu),
        email: defaultValue(user.acikEmail),
        profileImage: defaultProfileImage(user.profilResmi),
        social: defaultValue(user.socials),
        socialVisibility: defaultValue(user.visibleSocials),
        company: defaultValue(user.sirketAdı),
        departman: defaultValue(user.calistigiBirim),
        note: defaultValue(user.not)
    };
    return { code: 200, message: 'Kartvizit Bilgileri Çekildi.', cardData: cardData }
}


exports.getCardAllData = async(db, ID) => {
    const userCollection = db.collection('Users');

    const user = await userCollection.findOne({ ID: ID });

    if(!user){
        return { code: 400, message: 'Kartvizit Bulunamadı' };
    }

    delete user._id
    delete user.ID;
    delete user.email;
    delete user.password;
    delete user.createdAt;


    return { code: 200, message: 'Kartvizit Bilgileri Çekildi.', cardData: user };
}

exports.updateCard = async(db, ID, newData) => {
    const userCollection = db.collection('Users');

    const user = await userCollection.findOne({ ID: ID });


    if(!user){
        return { code: 400, message: 'Kartvizit Bulunamadı' };
    }

    if(!newData){
        return { code: 400, message: 'Yeni Verilere Ulaşılamadı' };
    }

    const updatedData = {
        ID: user.ID,
        role: user.role,
        views: user.views,
        verified: user.verified,
        email: user.email,
        password: user.password,
        firma: user.firma,
        ...(user.yetkiliFirmalar ? { yetkiliFirmalar: user.yetkiliFirmalar } : {}),
        isActive: user.isActive,
        ...newData
    }

    await userCollection.updateOne({ ID: ID },{
        $set: updatedData
    })

    await logUtils.addLog(db, user.isim, user.soyad, user.email, 3 );
    return { code: 200, message: 'Bilgiler Güncellendi' };
}


exports.previewCardData = async(db, ID) => {

    const userCollection = db.collection('Users');

    const user = await userCollection.findOne({ ID: ID });


    if(!user){
        return { code: 400, message: 'Kartvizit Bulunamadı.' }
    }

    const cardData = { ...user };

    delete cardData._id
    delete cardData.ID;
    delete cardData.socials
    delete cardData.email;
    delete cardData.password;
    delete cardData.createdAt;

    // set social

    const visibleSocials = user.visibleSocials

    socials = {};

    for (let platform of visibleSocials){
        let url = user.socials[platform];
        socials[platform] = url
    }
    
    cardData["social"] = socials

    return { code: 200, message: 'Kartvizit Bilgileri Çekildi.', cardData: cardData }
}


exports.getViewCard = async(db, ID) => {
    const userCollection = db.collection('Users');

    const user = await userCollection.findOne({ ID: ID });


    if(!user){
        return { code: 400, message: 'Kartvizit Bulunamadı.' }
    }

    const cardData = { ...user };

    delete cardData._id
    delete cardData.ID;
    delete cardData.socials
    delete cardData.email;
    delete cardData.password;
    delete cardData.createdAt;

    // set social

    const visibleSocials = user.visibleSocials

    socials = {};

    for (let platform of visibleSocials){
        let url = user.socials[platform];
        socials[platform] = url
    }
    
    cardData["social"] = socials

    return { code: 200, message: 'Kartvizit Bilgileri Çekildi.', cardData: cardData }
}


exports.getVisitorCard = async(db, ID) => {
    const userCollection = db.collection('Users');

    const user = await userCollection.findOne({ ID: ID, verified: true });


    if(!user){
        return { code: 400, message: 'Kartvizit Bulunamadı.' }
    }

    const cardData = { ...user };

    delete cardData._id
    delete cardData.ID;
    delete cardData.socials
    delete cardData.email;
    delete cardData.password;
    delete cardData.createdAt;

    // set social

    const visibleSocials = user.visibleSocials

    socials = {};

    for (let platform of visibleSocials){
        let url = user.socials[platform];
        socials[platform] = url
    }
    
    cardData["social"] = socials

    await userCollection.updateOne({ ID: ID },{
        $inc: {
            views: +1
        }
    })

    return { code: 200, message: 'Kartvizit Bilgileri Çekildi.', cardData: cardData }
}


exports.getVerified = async(db, ID) => {
    const userCollection = db.collection('Users');

    const user = await userCollection.findOne({ ID: ID });

    if(!user){
        return { code: 400, message: 'Kullanıcı bulunamadı.' };
    }

    return { code: 200, message: 'Veriler Çekildi', data: user.verified };
}