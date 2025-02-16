import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import { CssBaseline } from "@mui/material";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <CssBaseline /> */}
    <App />
  </StrictMode>
);

//   // <StrictMode> {/* </StrictMode> */} needs to be around everything --> dispabled becouse cousing issue with spotify api getting the code twice

// Error during authorization code grant: WebapiAuthenticationError: An authentication error occurred while communicating with Spotify's Web API.
// Details: invalid_grant Invalid authorization code.
//     at _toError (C:\Users\Win11 User\VsCode_2024\MERN\spotify-clone\backend\node_modules\spotify-web-api-node\src\http-manager.js:43:12)
//     at C:\Users\Win11 User\VsCode_2024\MERN\spotify-clone\backend\node_modules\spotify-web-api-node\src\http-manager.js:71:25
//     at Request.callback (C:\Users\Win11 User\VsCode_2024\MERN\spotify-clone\backend\node_modules\superagent\lib\node\index.js:905:3)
//     at C:\Users\Win11 User\VsCode_2024\MERN\spotify-clone\backend\node_modules\superagent\lib\node\index.js:1127:20
//     at IncomingMessage.<anonymous> (C:\Users\Win11 User\VsCode_2024\MERN\spotify-clone\backend\node_modules\superagent\lib\node\parsers\json.js:22:7)
//     at Stream.emit (node:events:518:28)
//     at Unzip.<anonymous> (C:\Users\Win11 User\VsCode_2024\MERN\spotify-clone\backend\node_modules\superagent\lib\node\unzip.js:53:12)
//     at Unzip.emit (node:events:518:28)
//     at endReadableNT (node:internal/streams/readable:1698:12)
//     at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
//   body: {
//     error: 'invalid_grant',
//     error_description: 'Invalid authorization code'
//   },
//   headers: {
//     date: 'Sun, 09 Feb 2025 15:41:04 GMT',
//     'content-type': 'application/json',
//     'x-request-id': 'a0382846-c168-4253-a883-7a22a8b31d99',
//     'set-cookie': [
//       '__Host-device_id=AQD2ufxoSnO_2Dt3eMRWxZANw4Q6ZURaXLhXbz16LIQ__M6GqHhSjZSryTLUQE7Xcnz8L4vjyFDXXYIDnBpvwaR2d9HuQHl8IEU;Version=1;Path=/;Max-Age=2147483647;Secure;HttpOnly;SameSite=Lax',
//       'sp_tr=false;Version=1;Domain=accounts.spotify.com;Path=/;Secure;SameSite=Lax'
//     ],
//     'sp-trace-id': '38df6b3b34bf0104',
//     'x-envoy-upstream-service-time': '20',
//     server: 'envoy',
//     'strict-transport-security': 'max-age=31536000',
//     'x-content-type-options': 'nosniff',
//     'content-encoding': 'gzip',
//     vary: 'Accept-Encoding',
//     via: 'HTTP/2 edgeproxy, 1.1 google',
//     'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
//     connection: 'close',
//     'transfer-encoding': 'chunked'
//   },
//   statusCode: 400
// }
