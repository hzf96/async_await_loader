import axios from 'axios';
window.$ajax = axios;

function test () {
    let { data } = window.$ajax({
        url: 'https://www.fastmock.site/mock/27fb729bc15bd866b0b1d34fbf3b5610/apps/test'
    });
    alert(data.data);
}

test();