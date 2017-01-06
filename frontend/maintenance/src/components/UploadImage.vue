<style lang="less" scoped>
    .upload-image-box {
        position: relative;
        margin-bottom: 15px;
        float: left;
        width: 80px;
        height: 80px;
        border: 1px solid #D9D9D9;
        text-align: center;
        color: #ADADAD;

        input.upload-image-input {
            display: block;
            position: absolute;
            top: 0px;
            left: 0px;
            width: 80px;
            height: 80px;
            opacity: 0;
        }

        .iconfont {
            color: #ADADAD;
            font-size: 30px;
        }

        .update-btn-desc {
            font-size: 12px;
        }
    }
</style>

<template>
    <div class="upload-image-box">
        <i class="iconfont">&#xe618;</i>
        <div class="update-btn-desc">点击上传</div>
        <input type="file" name="{{ name }}" id="{{ name }}" accept="{{ accept }}" multiple="{{ multiple }}" v-on:click="fileInputClick"
            v-on:change="fileInputChange" class="upload-image-input">
    </div>
</template>

<script>

    import { setLoading } from 'actions'

    export default {
        props: {
            name: {
                type: String,
                required: true
            },
            action: {
                type: String,
                required: true
            },
            accept: String,
            multiple: String,
            headers: Object,
            method: String
        },
    data: function() {
        return {
        myFiles: [] // a container for the files in our field
        };
    },
    vuex: {
        actions: {
            setLoading
        }
    },
    methods: {
        fileInputClick: function() {
        // click actually triggers after the file dialog opens
        this.$dispatch('onFileClick', this.myFiles);
        },
        fileInputChange: function() {
        // get the group of files assigned to this field
        var ident = this.id || this.name
        this.myFiles = document.getElementById(ident).files;
        this.setLoading(true)
        this.$dispatch('onFileChange', this.myFiles);
        this.fileUpload();
        },
        _onProgress: function(e) {
        // this is an internal call in XHR to update the progress
        e.percent = (e.loaded / e.total) * 100;
        this.$dispatch('onFileProgress', e);
        },
        _handleUpload: function(file) {
        this.$dispatch('beforeFileUpload', file);
    
        var form = new FormData();
        var xhr = new XMLHttpRequest();
        try {
            form.append('Content-Type', file.type || 'application/octet-stream');
            // our request will have the file in the ['file'] key
            form.append('file', file);
        } catch (err) {
            this.$dispatch('onFileError', file, err);
            return;
        }

        return new Promise(function(resolve, reject) {

            xhr.upload.addEventListener('progress', this._onProgress, false);

            xhr.onreadystatechange = function() {
            if (xhr.readyState < 4) {
                return;
            }
            if (xhr.status < 400) {
                var res = JSON.parse(xhr.responseText);
                this.$dispatch('onFileUpload', file, res);
                resolve(file);
            } else {
                var err = {
                    status: xhr.status,
                    statusText: xhr.statusText
                }
                reject(err);
            }
            }.bind(this);

            xhr.onerror = function() {
                var err = JSON.parse(xhr.responseText);
                
                err.status = xhr.status;
                err.statusText = xhr.statusText;
                this.$dispatch('onFileError', file, err);
                reject(err);
            }.bind(this);

            xhr.open(this.method || "POST", this.action, true);
            if (this.headers) {
                for(var header in this.headers) {
                    xhr.setRequestHeader(header, this.headers[header]);
                }
            }

            xhr.send(form);
            this.$dispatch('afterFileUpload', file);
        }.bind(this));
        },
        fileUpload: function() {
        if(this.myFiles.length > 0) {
            // a hack to push all the Promises into a new array
            var arrayOfPromises = Array.prototype.slice.call(this.myFiles, 0).map(function(file) {
            return this._handleUpload(file);
            }.bind(this));
            // wait for everything to finish
            Promise.all(arrayOfPromises).then(function(allFiles) {
            this.$dispatch('onAllFilesUploaded', allFiles);
            }.bind(this)).catch(function(err) {
            this.$dispatch('onFileError', this.myFiles, err);
            }.bind(this));
        } else {
            // someone tried to upload without adding files
            var err = new Error("No files to upload for this field");
            this.$dispatch('onFileError', this.myFiles, err);
        }
        }
    }
    }
</script>