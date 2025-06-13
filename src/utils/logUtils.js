exports.addLog = async(db, name, surname, email, code) => {
    const logCollection = db.collection('Logs');

    // CODE
    // 0 -> Yeni Kullanıcı Kaydı
    // 1 -> Kullanıcı Onaylandı
    // 2 -> Kullanıcı Reddedildi
    // 3 -> Kartvizit Güncellendi
    // 4 -> Kullanıcı Silindi

    let type;

    switch (code) {
        case 0:
            type = 'Yeni Kullanıcı Kaydı';
            break;
    
        case 1:
            type = 'Kullanıcı Onaylandı';
            break;

        case 2:
            type = 'Kullanıcı Reddedildi';
            break;

        case 3:
            type = 'Kartvizit Güncellendi';
            break;

        case 4:
            type = 'Kullanıcı Silindi';
            break;
            
        default:
            type = 'Bilinmiyor';
            break;
    }
    
    const newLog = {
        date: new Date(),
        type: type,
        user: `${name} ${surname}`,
        userEmail: email,
        code: code
    }

    await logCollection.insertOne(newLog);

    return true
}