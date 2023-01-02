const redirect_uri = "https://dpes8693.github.io/line-login-example/"
// const redirect_uri = "http://127.0.0.1:5500/index.html"
const client_id = "1657784682"
const client_secret = "155645340d8a3034e8dc47f413b5c54d"
const queryObject = {};
function init() {
    // 解析是否是line跳轉過來的
    const myURL = new URL('http://127.0.0.1:5500/index.html?code=rkovOchoIvJ9KIonkTlS&state=login')
    // 透過物件的解構賦值，取出 URL 物件的屬性值
    const { href, protocol, hostname, pathname, search, searchParams } = myURL

    // 透過陣列的解構賦值，取得網址參數部分
    for (let [key, value] of searchParams.entries()) {
        queryObject[key] = value
    }
    console.log(queryObject)

}

// const lineLoginBtn = document.getElementById("lineLoginBtn")
function loginToLine() {
    /* GET https://access.line.me/oauth2/v2.1/authorize */
    // 這邊分開寫比較好閱讀
    let link = 'https://access.line.me/oauth2/v2.1/authorize?'
    link += 'response_type=code'
    link += '&client_id=' + client_id
    link += '&redirect_uri=' + redirect_uri
    link += '&state=login'
    link += '&scope=openid%20profile'

    window.location.href = link;
}

// POST https://api.line.me/oauth2/v2.1/token
async function getLineToken() {
    const url = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1234567890&redirect_uri=https%3A%2F%2Fexample.com%2Fauth%3Fkey%3Dvalue&state=12345abcde&scope=profile%20openid&nonce=09876xyz"
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    const body = {
        grant_type: "authorization_code",
        code: queryObject.code, //第一次拿的code
        redirect_uri,
        client_id, //Channel ID
        client_secret //Channel secret
    }
    const response = await postApi(url, headers, body)
    console.log(response)

    function postApi(url, headers, body) {
        return fetch(url, {
            method: "POST",
            headers: headers,
            //別忘了把主體参數轉成字串，否則資料會變成[object Object]，它無法被成功儲存在後台
            body: JSON.stringify(body)
        })
            .then(response => response.json())
/**
 * response
    {
    "access_token": "bNl4YEFPI/hjFWhTqexp4MuEw5YPs...",
    "expires_in": 2592000,
    "id_token": "eyJhbGciOiJIUzI1NiJ9...",
    "refresh_token": "Aa1FdeggRhTnPNNpxr8p",
    "scope": "profile",
    "token_type": "Bearer"
    }         
*/
    }
}