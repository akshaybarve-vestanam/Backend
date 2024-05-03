const Label = require('../models/labels');
const Labels = require('../models/labels');
const { labels } = require('./user');

module.exports.get = async (req, res, next) => {
    let labels = await Labels.find().select({
        _id: 0,
        name: 1
    }).lean();
    console.log("labels", 'labels')
    return res.json({ s: true, d: labels })
}

module.exports.create = async (req, res, next) => {
    if (req.body.labels) {
        for (const lb of req.body.labels) {
            let existingLable = await Labels.findOne({ name: lb }).select('name').lean()
            if (!existingLable) {
                let newLable = new Labels({
                    name: lb
                })
                await newLable.save()
            }
        }
        return res.json({ s: true })
    } else {
        return res.json({ s: false, d: 'no labels to create' })
    }
}