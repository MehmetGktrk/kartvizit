const authService = require('../services/authService');

exports.getCompanies = async(req, res) => {
    try {
        const result = await authService.getCompanies(req.db);
        return res.status(result.code).json({ code: result.code, message: result.message, data: result.data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}


exports.register = async(req, res) => {
    try {
        const { name, surname, email, phone, firma, password } = req.body;
        const result = await authService.register(req.db, name, surname, email, phone, firma, password);
        return res.status(result.code).json({ code: result.code, message: result.message });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}


exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(req.db, email, password);

        if(result.code == 200){
            res.cookie('token', result.token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000,
            })
        }

        return res.status(result.code).json({ code: result.code, message: result.message, ID: result.ID, role: result.role, verified: result.verified, token:result.token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' })
    }
}


exports.logout = async(req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });
        return res.status(200).json({ code: 200, message: 'Çıkış yapıldı.' })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' })
    }
}