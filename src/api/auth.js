import api from './api'

export default {
    login(auth) {
        // let headers = {
        //     'Content-Type': 'application/json;charset=utf-8'
        // };

        // headers['TOKEN'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZjM2YzViMzAwYzE0OGM1MmM2N2ZmMzAzMjc1ZGI0ZmUxYzA3ZDg4YmQ5YTY1ZDNlMmRhNjY2NDE5ZGZjOWU0ZDJmMGVjZjBjZTgxZTMxMzUiLCJpYXQiOjE2MzE4ODIzMjUuMTE5NDc4LCJuYmYiOjE2MzE4ODIzMjUuMTE5NDg2LCJleHAiOjE2NjM0MTgzMjUuMTEzNzE3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.tPb7RJBp45N73n9l1I6VGp5Kpn7l_xWKwEfizP6gWVKoHkDrx0x9gzN0hNkMAKtXXkcq4qYnYQ1hQLFUU3QOwXlpBbR-5bQ0pSmaV1QcomEEICAmAXl9sKiaR-ga2WtIk1e_9-5-aJrD5Zbn3gJ2J1o5Pv5eG3Sh5t1siEgR6OoxOwvkOF8x1k6PFfoTcXK9Xb92vjF8HFrAsr6f-pX0einx6WZIpUrAo0rI_u2sJagWf-fmyossr523MgL2mgnqXzIwW7Bq08p9alQN3dAqeWoVeJ_aCWDhCvSLUK4xqu0xRur-FW457WAKcngN8YF411IVFGFG-qWYmLp5r0HtCQcrtNKTduMH_UALmt-JiveoEDo7z8VGU5ueDyBtE3eku-fUGiLVOSgCN6CTVSasHt0i_A6Qfwo0ywLogCqj-KUc4S9mBEirQkMzK1ANFTR1zlRCKzaeIihJbFgPCxpR30c7RQllbQ-dKMF3d-76Wj9W4ja6kX1Scd-iSut1YOWJAsdVBILyleqphHwu3_vfpho3OUrDCSIHJYUKAPlf0YBJhxK4CU4Wlu5RpnUpJpM3HE93yxkWgLIgP9WA6DQPoPyRm1bWqB1pJ3aOrs9XlpJd8mFQbww0ZjMFrB5YlVnKLwirlaFUb1bL66JcawHx_0vwtucQNlhsuA4_E3yzipQ'

        return api.post('login', auth)
    },
}