// import fs from 'fs';
// import request from 'request-promise-native';
// import async from 'async';

// const client_id = "8f028a96-9fd0-4cab-9c2d-3be5d9dabd22";
// const redirect_uri = "http://localhost:5000/callback";
// const client_secret = "#####";
// const refresh_token = "#####";
// const file = "./sample.zip"; // Filename you want to upload.
// const onedrive_folder = 'SampleFolder'; // Folder on OneDrive
// const onedrive_filename = file; // If you want to change the filename on OneDrive, please set this.

// async function resUpload() {
//     try {
//         const tokenResponse = await request.post({
//             url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
//             form: {
//                 client_id: client_id,
//                 redirect_uri: redirect_uri,
//                 client_secret: client_secret,
//                 grant_type: "refresh_token",
//                 refresh_token: refresh_token,
//             },
//         });

//         const uploadSessionResponse = await request.post({
//             url: 'https://graph.microsoft.com/v1.0/drive/root:/' + onedrive_folder + '/' + onedrive_filename + ':/createUploadSession',
//             headers: {
//                 'Authorization': "Bearer " + JSON.parse(tokenResponse).access_token,
//                 'Content-Type': "application/json",
//             },
//             body: JSON.stringify({
//                 item: {
//                     "@microsoft.graph.conflictBehavior": "rename",
//                     "name": onedrive_filename
//                 }
//             }),
//         });

//         await uploadFile(JSON.parse(uploadSessionResponse).uploadUrl);
//     } catch (error) {
//         console.error(error);
//     }
// }

// async function uploadFile(uploadUrl) {
//     const params = getParams();
//     for (const st of params) {
//         await new Promise((resolve) => setTimeout(resolve, st.stime));
//         fs.readFile(file, async (e, f) => {
//             await request.put({
//                 url: uploadUrl,
//                 headers: {
//                     'Content-Length': st.clen,
//                     'Content-Range': st.cr,
//                 },
//                 body: f.slice(st.bstart, st.bend + 1),
//             });
//         });
//     }
// }

// function getParams() {
//     const allsize = fs.statSync(file).size;
//     const sep = allsize < (60 * 1024 * 1024) ? allsize : (60 * 1024 * 1024) - 1;
//     const ar = [];
//     for (let i = 0; i < allsize; i += sep) {
//         const bstart = i;
//         const bend = i + sep - 1 < allsize ? i + sep - 1 : allsize - 1;
//         const cr = 'bytes ' + bstart + '-' + bend + '/' + allsize;
//         const clen = bend != allsize - 1 ? sep : allsize - i;
//         const stime = allsize < (60 * 1024 * 1024) ? 5000 : 10000;
//         ar.push({
//             bstart: bstart,
//             bend: bend,
//             cr: cr,
//             clen: clen,
//             stime: stime,
//         });
//     }
//     return ar;
// }

// resUpload();
