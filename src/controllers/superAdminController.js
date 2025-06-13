const superAdminService = require('../services/superAdminService');

exports.getAdmins = async(req, res) => {
    try {
        const result = await superAdminService.getAdmins(req.db);
        return res.status(result.code).json({ code: result.code, message: result.message, data: result.data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}


exports.createAdmin = async(req, res) => {
    try {
        const { ID } = req.body;
        console.log
        const result = await superAdminService.createAdmin(req.db, ID);
        return res.status(result.code).json({ code: result.code, message: result.message });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}

exports.addPermission = async(req, res) => {
    try {
        const { ID, firma } = req.body;
        const result = await superAdminService.addPermission(req.db, ID, firma);
        return res.status(result.code).json({ code: result.code, message: result.message });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}

exports.removePermission = async(req, res) => {
    try {
        const { ID, firma } = req.body;
        const result = await superAdminService.removePermission(req.db, ID, firma);
        return res.status(result.code).json({ code: result.code, message: result.message });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}


exports.deleteAdmin = async(req, res) => {
    try {
        const { ID } = req.body;
        const result = await superAdminService.deleteAdmin(req.db, ID);
        return res.status(result.code).json({ code: result.code, message: result.message })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}

exports.inactiveUser = async(req, res) => {
    try {
        const { ID } = req.body;
        const result = await superAdminService.inactiveUser(req.db, ID);
        return res.status(result.code).json({ code: result.code, message: result.message });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}


exports.activeUser = async(req, res) => {
    try {
        const { ID } = req.body;
        const result = await superAdminService.activeUser(req.db, ID);
        return res.status(result.code).json({ code: result.code, message: result.message })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu' });
    }
}

exports.getPermission = async(req, res) => {
    try {
        var id = req.params.id;
        id = Number(id)
        const result = await superAdminService.getPermission(req.db, id);
        return res.status(result.code).json({ code: result.code, message: result.message, data: result.data })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu' });
    }
}

