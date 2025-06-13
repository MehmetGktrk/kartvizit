const utils = require('../utils/utils');
const config = require('../config/config');
const settings = require('../settings/settings');
const logUtils = require('../utils/logUtils');



exports.dashboard = async(db, adminID) => {
    const userCollection = db.collection('Users');
    const companyCollection = db.collection('Companies');
    const logCollection = db.collection('Logs');

    let users = [];
    let totalView;
    let verifiedUser = [];
    let pendingUser = [];
    let totalAdmin = [];
    let totalCompany = [];
    let totalActiveUser = [];
    let totalInactiveUser = [];

    const admin = await userCollection.findOne({ ID: adminID });

    if(!admin){
        return { code: 400, message: 'Admin bulunamadı.' };
    }

    if(admin.role == 'superAdmin'){
        users = await userCollection.find({ role: 'user' }).toArray();
        totalView = await utils.totalView(users);
        verifiedUser = await userCollection.find({ verified: true }).toArray();
        pendingUser = await userCollection.find({ verified: 'pending' }).toArray();
        totalAdmin = await userCollection.find({ role: 'admin' }).toArray();
        totalCompany = await companyCollection.find().toArray();
        totalActiveUser = await userCollection.find({ isActive: true }).toArray();
        totalActiveUser = await userCollection.find({ isActive: false }).toArray();

    }
    else{
        users = await userCollection.find({ role: 'user', firma: { $in: admin.yetkiliFirmalar } }).toArray();
        totalView = await utils.totalView(users);
        verifiedUser = await userCollection.find({ verified: true, firma: { $in: admin.yetkiliFirmalar } }).toArray();
        pendingUser = await userCollection.find({ verified: 'pending', firma: { $in: admin.yetkiliFirmalar } }).toArray();
    }

   


    const logs = await logCollection.find({}).sort({ date: -1 }).limit(10).toArray();


    const data = {
        totalUser: users.length,
        totalView: totalView,
        verifiedUser: verifiedUser.length,
        pendingUser: pendingUser.length,
        totalAdmin: totalAdmin.length,
        totalCompany: totalCompany.length,
        totalActiveUser: totalActiveUser.length,
        totalInactiveUser: totalInactiveUser.length,
        logs: logs
    }

    return { code: 200, message: 'Veriler Başarıyla Çekildi.', data: data }
}



exports.cards = async(db, adminID) => {
    const userCollection = db.collection('Users');

    const admin = await userCollection.findOne({ ID: adminID });

    if(!admin){
        return { code: 400, message: 'Admin Bulunamadı.' };
    }

    let users;


    if(admin.role == 'superAdmin'){
        users = await userCollection.find({ role: 'user', verified: true }).toArray();
    }
    else{
        users = await userCollection.find({ role: 'user', verified: true, firma: { $in: admin.yetkiliFirmalar } }).toArray();
    }

    let resultUsers = [];

    const safeImage = (value) => (value == null || value === "") ? "https://placehold.co/100x100" : value;


    for(let user of users){
        let userData = {
            ID: user.ID ?? "bilgi yok",
            isim: `${user.isim} ${user.soyad}` ?? "bilgi yok",
            email: user.email ?? "bilgi yok", // public email
            firma: user.firma,
            views: user.views ?? "bilgi yok",
            profilResmi: safeImage(user.profilResmi)
        }

        resultUsers.push(userData);
    }

    return { code: 200, message: 'Veriler Başarıyla Çekildi.', data: resultUsers }
}


exports.pendingUsers = async(db, adminID) => {
    const userCollection = db.collection('Users');

    const admin = await userCollection.findOne({ ID: adminID });

    if(!admin){
        return { code: 400, message: 'Admin Bulunamadı.' };
    }

    let users;

    if(admin.role = 'superAdmin'){
        users = await userCollection.find({ role: 'user', verified: 'pending' }).toArray();
    }
    else {
        users = await userCollection.find({ role: 'user', verified: 'pending', firma: { $in: admin.yetkiliFirmalar } }).toArray();
    }


    const userArray = [];

    const safeImage = (value) => (value == null || value === "") ? "https://placehold.co/100x100" : value;


    for (let user of users){
        const userData = {
            ID: user.ID,
            isim: `${user.isim} ${user.soyad}`,
            firma: user.firma,
            email: user.email,
            kisiselTelefon: user.kisiselTelefon,
            createdAt: user.createdAt,
            profilResmi: safeImage(user.profilResmi)
        }

        userArray.push(userData);
    }

    return { code: 200, message: 'Veriler Başarıyla Çekildi.', data: userArray };
}


exports.verifyUser = async(db, adminID, ID) => {
    const userCollection = db.collection('Users');

    const user = await userCollection.findOne({ ID: ID });
    const admin = await userCollection.findOne({ ID: adminID });


    if(!user){
        return { code: 400, message: 'Kullanıcı Bulunamadı.' };
    }

    if(!admin){
        return { code: 400, message: 'Admin Bulunamadı.' };
    }

    if(admin.role != 'superAdmin' && !admin.yetkiliFirmalar.includes(user.firma)){
        return { code: 400, message: 'Bu firmada yetkiniz yok.' };
    }

    if(user.verified == false){
        return { code: 400, message: 'Bu Kullanıcı daha önce reddetilmiş.' }
    }

    else if(user.verified == true){
        return { code: 400, message: 'Bu kullanıcı zaten onaylanmış.' };
    }

    await userCollection.updateOne({ ID: ID }, {
        $set: {
            verified: true
        }
    })

    await logUtils.addLog(db, user.isim, user.soyad, user.email, 1 );
    return { code: 200, message: 'Kullanıcı onaylandı.' };
}



exports.rejectUser = async(db, adminID, ID) => {
    const userCollection = db.collection('Users');

    const user = await userCollection.findOne({ ID: ID });
    const admin = await userCollection.findOne({ ID: adminID });

    if(!user){
        return { code: 400, message: 'Kullanıcı bulunamadı.' };
    }

    if(!admin){
        return { code: 400, message: 'Admin Bulunamadı.' };
    }

    if(admin.role != 'superAdmin' && admin.yetkiliFirmalar.includes(user.firma)){
        return { code: 400, message: 'Bu firmada yetkiniz yok.' };
    }

    if(user.verified == false){
        return { code: 400, message: 'Bu kullanıcı zaten reddedilmiş.' }
    }
    
    else if(user.verified == true){
        return  { code: 400, message: 'Bu kullanıcı daha önce onaylanmış.' };
    }

    await userCollection.updateOne({ ID: ID }, {
        $set: {
            verified: false
        }
    })

    await logUtils.addLog(db, user.isim, user.soyad, user.email, 2 );
    return { code: 200, message: 'Kullanıcı reddedildi.' };
}


exports.getUsers = async(db, adminID) => {
    const userCollection = db.collection('Users');

    const admin = await userCollection.findOne({ ID: adminID });

    if(!admin){
        return { code: 400, message: 'Admin bulunamadı.' };
    }

    let users;

    if(admin.role == 'superAdmin'){
        users = await userCollection.find({ role: 'user' }).toArray();
    }
    else {
        users = await userCollection.find({ role: 'user', firma: { $in: admin.yetkiliFirmalar } }).toArray();
    }


    const allUserData = [];

    const safeImage = (value) => (value == null || value === "") ? "https://placehold.co/100x100" : value;


    for(let user of users){
        let userData = {
            ID: user.ID,
            profilResmi: safeImage(user.profilResmi),
            firma: user.firma,
            isim: `${user.isim} ${user.soyad}`,
            email: user.email,
            isActive: user.isActive,
            createdAt: user.createdAt,
            verified: user.verified,
        }

        allUserData.push(userData);
    }

    return { code: 200, message: 'Veriler Başarıyla Çekildi.', data: allUserData };
}




exports.getCompanies = async(db) => {
    const companyCollection = db.collection('Companies');

    const companies = await companyCollection.find().toArray();

    return { code: 200, message: 'Veriler Başarıyla Çekildi.', data: companies };
}

exports.addCompany = async(db, kisaltma, isletmeAdi, isletmeAdresi, ticariTamUnvani, VKNBilgileri, mersisNo) => {
    const companyCollection = db.collection('Companies');

    function checkParam(param){

        let strParam = param.toString()

        if(strParam.length <= 1) return false;        
        else return true;
    }


    if(!checkParam(kisaltma) || !checkParam(isletmeAdi) || !checkParam(isletmeAdresi) || !checkParam(ticariTamUnvani) || !checkParam(VKNBilgileri) || !checkParam(mersisNo)){
        return ({ code: 400, message: 'Her bir veri 1 karakterden büyük olmalı.' });
    }

    const newCompany = {
        kisaltma: kisaltma,
        isletmeAdi: isletmeAdi,
        isletmeAdresi: isletmeAdresi,
        ticariTamUnvani: ticariTamUnvani,
        VKNBilgileri: VKNBilgileri,
        mersisNo: mersisNo
    }

    await companyCollection.insertOne(newCompany);

    return { code: 200, message: 'Yeni firma Eklendi.' }
}