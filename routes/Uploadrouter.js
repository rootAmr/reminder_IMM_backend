// import express from 'express';
// const router = express.Router();
// import {getAuthCodeUrl,acquireTokenByCode,uploadFile} from '../controllers/Upload.js';

// router.get('/login', (req, res) => {
//     const authCodeUrl = getAuthCodeUrl();
//     res.redirect(authCodeUrl);
// });

// router.get('/callback', async (req, res) => {
//     const code = req.query.code;
//     const accessToken = await acquireTokenByCode(code);
//     req.session.accessToken = accessToken;
//     res.redirect('/upload');
// });

// router.get('/upload', (req, res) => {
//     if (!req.session.accessToken) {
//         res.redirect('/login');
//     } else {
//         res.sendFile(__dirname + '/upload.html');
//     }
// });

// router.post('/upload', async (req, res) => {
//     const accessToken = req.session.accessToken;
//     const file = req.files.file;

//     try {
//         const response = await uploadFile(accessToken, file);
//         res.send(response);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// export default router;
