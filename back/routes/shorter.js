import express from 'express'
import { UrlModel } from '../models/urlModel.js';
import shortId from 'shortid';

const router = express.Router()

router.post('/shorten', async (req, res) => {
    try {
        const url = new UrlModel({ fullUrl: req.body.fullUrl, shortUrl: `${req.protocol}://${req.get('host')}/short/${shortId.generate()}` });
        await url.save();
        res.status(201).json(url).end();
    } catch (error) {
        res.status(400).send('Invalid URL');
    }
});

router.get('/', async (req, res) => {
    try {
        const urls = await UrlModel.find();
        // res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(urls).end();
    } catch (error) {
        res.status(400).send('Internal server error');
    }
});

router.get('/short/:shortUrl', async (req, res) => {
    try {
        const shortUrl = req.params.shortUrl;
        const url = await UrlModel.findOne({ shortUrl: `${req.protocol}://${req.get('host')}/short/${shortUrl}` });
        if (!url) {
            return res.status(400).json({message:'URL not found'}).end();
        }
        res.status(301).redirect(url.fullUrl);
    } catch (error) {
        res.status(400).send('URL not found');
    }
});

export default router;
