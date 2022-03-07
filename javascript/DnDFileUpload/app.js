$(document).ready(function () {
    var files;
    var fileList = {};
    var fileSizeList = {};
    var fileNameList = {};
    var fileIdx = 0;
    $("#file-input").on("change", function (e) {
        files = this.files;
        fileListHandler(files);
    });
    const dropZone = $(".dnd-file-drop-zone");
    dropZone.on("drop", function (e) {
        e.preventDefault();
        files = e.originalEvent.dataTransfer.files;
        fileListHandler(files);
    });
    dropZone.on("dragenter", function (e) {
        e.preventDefault();
    });
    dropZone.on("dragover", function (e) {
        e.preventDefault();
    });
    dropZone.on("dragleave", function (e) {
        e.preventDefault();
    });

    $('.dnd-file-upload-btn').on("click", function (e) {
        
        var keys = Object.keys(fileList);
        // if (keys.length < 1) return false;
        // var formData = new FormData($('#uploadFile')[0]);
        var arr = new Array();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
            console.log(key)
            console.log(fileList[key])
            // formData.append('fileList[]', fileList[key])
            arr.push(fileList[keys])
        }
        $.ajax({
            // xhr: function () {
            //     var xhr = new window.XMLHttpRequest();
            //     console.log('adsdas')
            //     xhr.upload.addEventListener("progress", function (evt) {
            //         console.log(evt)
            //     });
            //     return xhr;

            // },
            url: "http://127.0.0.1:5000/api/fileupload",
            data: {file:arr},
            type: 'POST',
            // enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            dataType: 'json',
            cache: false,
            success: function (res) {
                console.log(res)
                alert(res.result)
                e.preventDefault();
                return false;
            },complete:function(res){
                console.log(res)
                alert(res.result)
                e.preventDefault()
                $('.dnd-file-list-view').append('body')

            }

        });
        return false;

    });

    function fileListHandler(files) {

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var fileName = file.name;
            var fileSize = file.size / 1024 / 2024;
            fileList[fileIdx] = file;
            fileNameList[fileIdx] = fileName;
            fileSizeList[fileIdx] = fileSize;
            viewFileList(fileIdx, fileName, fileSize);
            fileIdx += 1;
        }
        console.log(fileList)
    }

    function viewFileList(i, fileName, fileSize) {
        var script = "<div class='dnd-file-list' idx='" + i + "'>"
        script += "<div class='dnd-file-name'>"
        script += fileName
        script += "</div>"
        script += "<div class='dnd-file-size'>"
        script += fileSize.toFixed(2) + "MB"
        script += '</div>'
        script += "<div class='dnd-file-del' idx='" + i + "'>"
        script += "del"
        script += '</div>'
        script += '</div>'
        $('.dnd-file-list-view').append(script)
    }

    $(document).on('click', '.dnd-file-del', function () {
        var idx = $(this).attr('idx');
        delete fileList[idx]
        delete fileNameList[idx]
        delete fileSizeList[idx]
        $('.dnd-file-list[idx="' + idx + '"]').remove();
        console.log(fileList)
    });

    function sendFileData(url, formData, x_cb, s_cb) {

    }
});