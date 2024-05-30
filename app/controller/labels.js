const Label = require('../models/labels');
const Labels = require('../models/labels');
const { labels } = require('./user');

module.exports.get = async (req, res, next) => {
    console.log(req.query)
    let labels = await Labels.find({ name: { $regex: req.query.q, $options: 'i' } }).limit(5).select({
        _id: 0,
        name: 1
    }).lean();
    return res.json({ s: true, d: labels })
}

module.exports.create = async (req, res, next) => {
    console.log(req.body)
    if (req.body.name) {
        let existingLable = await Labels.findOne({ name: req.body.name }).select('name').lean()
        if (!existingLable) {
            let newLable = new Labels({
                name: req.body.name
            })
            let savedLable = await newLable.save()
            return res.json({ s: true, d: { name: savedLable.name }, m: "New Label Created" })
        } else {
            return res.json({ s: false })
        }
    } else {
        return res.json({ s: false, d: 'no labels to create' })
    }
}