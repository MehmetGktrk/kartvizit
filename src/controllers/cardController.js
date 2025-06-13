const cardService = require('../services/cardService');

exports.getCardData = async(req, res) => {
    try {
        var id = req.params.id;
        id = Number(id)
        const result = await cardService.getCardData(req.db, id);
        return res.status(result.code).json({ code: result.code, message: result.message, cardData: result.cardData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' })
    }
}


exports.updateCard = async(req, res) => {
    try {
        const { newData } = req.body;
        const result = await cardService.updateCard(req.db, req.user.ID, newData);
        return res.status(result.code).json({ code: result.code, message: result.message });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' })
    }
}

exports.getCardAllData = async(req, res) => {
    try {
        const result = await cardService.getCardAllData(req.db, req.user.ID);
        return res.status(result.code).json({ code: result.code, message: result.message, cardData: result.cardData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' })
    }
}

exports.previewCardData = async(req, res) => {
    try {
        const result = await cardService.previewCardData(req.db, req.user.ID);
        return res.status(result.code).json({ code: result.code, message: result.message, cardData: result.cardData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' })
    }
}

exports.getViewCard = async(req, res) => {
    try {
        let ID = req.params.id;
        ID = Number(ID);

        const result = await cardService.getViewCard(req.db, ID);

        return res.status(result.code).json({ code: result.code, message: result.message, cardData: result.cardData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}


exports.getVisitorCard = async(req, res) => {
    try {
        let ID = req.params.id;
        ID = Number(ID);

        const result = await cardService.getVisitorCard(req.db, ID);

        return res.status(result.code).json({ code: result.code, message: result.message, cardData: result.cardData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}


exports.getVerified = async(req, res) => {
    try {
        const result = await cardService.getVerified(req.db, req.user.ID);
        return res.status(result.code).json({ code: result.code, message: result.message, data: result.data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Beklenmeyen bir hata oluştu.' });
    }
}