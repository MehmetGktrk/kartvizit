const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../config/config');
const settings = require('../settings/settings');
const utils = require('../utils/utils');
const logUtils = require('../utils/logUtils');


exports.getCompanies = async(db) => {
    const companyCollection = db.collection('Companies');

    const companies = await companyCollection.find({}).toArray();

    let companiesName = [];

    for (let company of companies){
        companiesName.push(company.isletmeAdi)
    }

    return { code: 200, message: 'Veriler Başarıyla Çekildi.', data: companiesName };

}



exports.register = async(db, name, surname, email, phone, firma, password) => {
    const userCollection = db.collection('Users');
    const companyCollection = db.collection('Companies');

    const company = await companyCollection.findOne({ isletmeAdi: firma });

    const user = await userCollection.findOne({
        $or: [
            { personalPhone: phone },
            { email: email }
        ]
    })

    if(user){
        if(user.personalPhone == phone){
            return { code: 400, message: 'Bu telefon numarası kayıtlı.' };
        }
        else if(user.email){
            return { code: 400, message: 'Bu e-posta kayıtlı.' };
        }
    }

    if(!company){
        return { code: 400, message: 'Firma bulunamadı.' };
    }


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const now = new Date();
    const userID = await utils.createID(db);

    const newUser = {
        ID: userID,
        role: 'user',
        views: 0,
        verified: 'pending',
        isim: name,
        soyad: surname,
        email: email, //
        isActive: true,
        password: hashedPassword, //
        pozisyon: "",
        firma: firma,
        dogumGunu: "",
        aciklama: "",
        profilResmi: "",
        kisiselTelefon: phone,
        isTelefonu: "",
        acikEmail: "",
        adres: "",
        faks: "", 
        onEk: "",
        // unvan: "", //
        // calistigiBirim: "", //
        sirketAdi: "",
        // cagriCihazi: "", //
        // isMobilNo: "", //
        website: "",
        // kategori: "", //
        not: "",
        sokak: "",
        ilce: "", // ilce olarak değiştir
        il: "",
        postaKodu: "",
        ulke: "",
        socials: {},
        visibleSocials: [],
        createdAt: now
    }

    await userCollection.insertOne(newUser);
    await logUtils.addLog(db, newUser.isim, newUser.soyad, newUser.email, 0 );
    return { code: 200, message: 'Kayıt Başarılı.' }
}



exports.login = async(db, email, password) => {
    const userCollection = db.collection('Users');

    const user = await userCollection.findOne({ email: email })

    if(!user){
        return { code: 400, message: 'Kullanıcı Bulunamadı.' };
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword){
        return { code: 400, message: 'Şifre yanlış.' };
    }

    const token = jwt.sign(
        {
            ID: user.ID,
            role: user.role,        
        },
        config.jwtSecret,
        { expiresIn: settings.jwtExpire }
    )

    return { code: 200, message: 'Giriş başarılı.', ID: user.ID, role: user.role, verified: user.verified, token:token };
}
