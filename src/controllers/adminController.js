const adminService = require('../services/adminService');


exports.dashboard = async(req, res) => {
    try {
        const result = await adminService.dashboard(req.db, req.user.ID);
        return res.status(result.code).json({ code: result.code, message: result.message, data: result.data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}


exports.cards = async(req, res) => {
    try {
        const result = await adminService.cards(req.db, req.user.ID);
        return res.status(result.code).json({ code: result.code, message: result.message, data: result.data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}

exports.pendingUsers = async(req, res) => {
    try {
        const result = await adminService.pendingUsers(req.db, req.user.ID);
        return res.status(result.code).json({ code: result.code, message: result.message, data: result.data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}

exports.verifyUser = async(req, res) => {
    try {
        const { ID } = req.body;
        const result = await adminService.verifyUser(req.db, req.user.ID, ID);
        return res.status(result.code).json({ code: result.code, message: result.message });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}

exports.rejectUser = async(req, res) => {
    try {
        const { ID } = req.body;
        const result = await adminService.rejectUser(req.db, req.user.ID, ID);
        return res.status(result.code).json({ code: result.code, message: result.message });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}


exports.getUsers = async(req, res) => {
    try {
        const result = await adminService.getUsers(req.db, req.user.ID);
        return res.status(result.code).json({ code: result.code, message: result.message, data: result.data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}




exports.getCompanies = async(req, res) => {
    try {
        const result = await adminService.getCompanies(req.db);
        return res.status(result.code).json({ code: result.code, message: result.message, data: result.data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}


exports.addCompany = async(req, res) => {
    try {
        const { kisaltma, isletmeAdi, isletmeAdresi, ticariTamUnvani, VKNBilgileri, mersisNo } = req.body;
        const result = await adminService.addCompany(req.db, kisaltma, isletmeAdi, isletmeAdresi, ticariTamUnvani, VKNBilgileri, mersisNo);
        return res.status(result.code).json({ code: result.code, message: result.message });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
        
    }
}