$(document).ready(function () {


})

var api_key = "85SVNYrwH8xXJbjJgkYoSQsBQqzKtn7WO1JdYfXeeMT37b9Br6ClP7F4gnruv%2FN4aY6wdkDHWNvzieim1yz98A%3D%3D"
// var api_key = "85SVNYrwH8xXJbjJgkYoSQsBQqzKtn7WO1JdYfXeeMT37b9Br6ClP7F4gnruv/N4aY6wdkDHWNvzieim1yz98A=="
// var url = "https://api.odcloud.kr/api/15077586/v1/centers"
// var url = "https://api.odcloud.kr/api/15077756/v1/vaccine-stat"
var url = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson"
var return_type = "JSON"
var xhr = new XMLHttpRequest();
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + encodeURIComponent(api_key); /*Service Key*/
queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20210301'); /**/
queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20210401'); /**/
// queryParams += '&' + encodeURIComponent('page') + '=' + encodeURIComponent('1'); /**/
// queryParams += '&' + encodeURIComponent('perPage') + '=' + encodeURIComponent('10'); /**/
// queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent(return_type); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        alert('Status: ' + this.status + 'nHeaders: ' + JSON.stringify(this.getAllResponseHeaders()) + 'nBody: ' + this.responseText);
    }
};

xhr.send('');
const detectLng = (data) => {
    const lng = new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + api_key; /*Service Key*/
        queryParams += '&' + encodeURIComponent('page') + '=' + encodeURIComponent('1'); /**/
        queryParams += '&' + encodeURIComponent('perPage') + '=' + encodeURIComponent('10'); /**/
        queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent(return_type); /**/
        xhr.open('GET', url + queryParams);
        xhr.onload = function () {
            if (xhr.status === 200 && xhr.readyState === XMLHttpRequest.DONE) {

                resolve(xhr.responseText)
            } else {
                reject(xhr.responseText)
            }
        };
        xhr.onerror = function () {
            reject(xhr.statusText)
        }

        xhr.send('');
    });
    return lng
};
async function asd() {
    var table_obj = {}
    await detectLng().then((res) => {
        var data = {}
        if (return_type === "JSON") {
            data = JSON.parse(res).data

        } else if (return_type === "XML") {
            data = xmlParsing(res).data
        }

        displaydataTable(data)


    }).catch((err) => {
        console.log(err)
    })
}

asd()

function xmlParsing(data) {
    var obj = {}
    var key_list = [];
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data, "text/xml");
    x = xmlDoc.documentElement.childNodes
    for (i = 0; i < x.length; i++) {
        var chi = x[i].childNodes[0]
        if (getType(chi) === "Text") {
            obj[x[i].nodeName] = chi.nodeValue
        } else {
            var dataArr = []
            var item = x[i].childNodes
            for (var idx = 0; idx < item.length; idx++) {
                var cols = item[idx].childNodes
                var col_obj = {}
                for (var cIdx = 0; cIdx < cols.length; cIdx++) {
                    var col = cols[cIdx]
                    var c_key = col.getAttribute('name')
                    var c_val = col.childNodes[0].nodeValue??'';
                    if (!key_list.includes(c_key)) {
                        key_list.push(c_key)
                        
                    }
                    col_obj[c_key] = c_val
                }
                dataArr.push(col_obj)
            }
            obj[x[i].nodeName] = dataArr
        }
    }
    return obj
}

function getType(data) {
    var type = Object.prototype.toString.call(data).slice(8, -1)
    return type
}

function displaydataTable(data) {
    var table = $('<table border="1"></table>');
    $('body').append(table)
    var header = $('<tr></tr>')
    var key_list = makeKeyList(data);
    key_list.map((key) => {
        var col = $('<td></td>');
        col.text(key)
        header.append(col)
    })
    table.append(header)
    data.map((el, i) => {
        console.log(el)
        var row = $('<tr></tr>')
        key_list.map((key) => {
            var val = el[key]
            var cell = $('<td></td>');

            if (!el.hasOwnProperty(key)) {
                console.log(el, key)
                val = ''
            }
            cell.text(val)
            row.append(cell)
        });
        table.append(row)

    })
}

function makeKeyList(data) {
    var key_list = []
    data.map((el, i) => {
        Object.keys(el).map((key) => {
            if (!key_list.includes(key)) {
                key_list.push(key)
            };
        })
    });
    return key_list

}
// function makeTableData(data,table_obj,keys="table"){
//     if(getType(data)==='Array'){
//         var arrType = checkArrayType(data)
//         table_obj[keys] = arrType
//         return table_obj
//     }else if(getType(data)==="Object"){
//         Object.keys(data).map((key,i)=>{
//             var val = data[key];
//             table_obj=makeTableData(val,table_obj,key)
//         })
//         return table_obj
//     }else{
//         console.log(keys,data)
//         table_obj[keys] = data
//         return table_obj

//     }
// }

// function checkArrayType(arr){
//     var t = getType(arr[0])
//     if(t==="Array"){
//         return "nArray"
//     }else if(t ==="Object"){
//         return "ObjectArray"
//     }else{
//         return t
//     }
// }
