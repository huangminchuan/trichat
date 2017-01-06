<style lang="less" scoped>
    .xc-page-container {

        .xc-top-banner {
            display: none;
            margin-bottom: 10px;
            background-color: #FFFFFF;
            height: 110px;
            color: #44A7EF;
            line-height: 110px;
            text-align: center;
        }

        .xc-user-info {
            margin-bottom: 10px;
            position: relative;
            padding-left: 15px;
            background-color: #FFFFFF;    
        }

        .xc-user-remark {
            background-color: #FFFFFF;
            padding-left: 15px;
        }
    }

    .xc-form-group {
        position: relative;
        width: 100%;
        height: 60px;
        line-height: 60px;
        display: flex;
        align-items: center;

        .iconfont {
            flex: none;
            display: inline-block;
        }

        input {
            flex: 1;
            position: relative;
            display: inline-block;
            padding-left: 5px;
            padding-right: 15px;
            height: 22px;
            border: 0;
            outline: 0;
            -webkit-appearance: none;
            background-color: transparent;
            font-size: inherit;
            color: inherit;
            height: 1.41176471em;
            line-height: 1.41176471;
        }
    }

    .xc-uploaded-images {
        position: relative;
        padding-left: 15px;

        .xc-uploaded-file {
            float: left;
            position: relative;
            margin-right: 8px;
            margin-bottom: 15px;  
            width: 80px;
            height: 80px;
            border: 1px solid #D9D9D9;

            .xc-uploaded-img {
                width: 80px;
                height: 80px;
            }

            .xc-uploaded-img-del {
                position: absolute;
                top: -7px;
                right: -7px;
                width:14px;
                height: 14px;
                line-height: 14px;

                .iconfont {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    font-size: 16px;
                    color: #F43530;
                }
            }
        }
    }

    .xc-upload-img-box {
        margin-top: 10px;
        position: relative;
        margin-bottom: 10px;
        background-color: #FFFFFF;

        .xc-normal-title {
            position: relative;
            padding-left: 15px;
            display: flex;
            height: 52px;
            line-height: 52px;
            .iconfont {
                margin-right: 8px;
            }

            .xc-baoxian-image {
                flex: 1;
                text-align: right;
                padding-right: 15px;
            }        
        }
    }

    .xc-desc-remark {
        margin-bottom: 10px;
        padding: 0 15px;
        font-size: 14px;
    }

    .xc-desc-remark {
        margin-bottom: 70px;
    }
    
</style>

<template>
    <div class="xc-page-container">
        <div class="xc-top-banner">
            Banner
        </div>

        <div class="xc-user-info">
            <div class="xc-user-name xc-form-group">
                <i class="iconfont">&#xe606;</i>
                <input type="text" placeholder="请输入您的姓名" v-model="contact">
            </div>
            <div class="xc-user-mobile xc-form-group xc-1px-top">
                <i class="iconfont">&#xe608;</i>
                <input type="text" placeholder="请输入您的手机号" v-model="mobile">
            </div>
        </div>

        <div class="xc-user-remark xc-form-group">
            <i class="iconfont">&#xe604;</i>
            <input type="text" placeholder="请输入您的特殊需求" v-model="user_remark">
        </div>

        <div class="xc-normal-panel xc-upload-img-box">
            <div class="xc-fault-items-title xc-normal-title">
                <i class="iconfont">&#xe60e;</i>上传保险材料
                <span class="xc-baoxian-image">{{ images.length }}/3</span>
            </div>
            <div class="xc-normal-body xc-floatfix xc-uploaded-images">
                <div class="xc-uploaded-file" v-for="image in images">
                    <img class="xc-uploaded-img" :src="image.src">
                    <div class="xc-uploaded-img-del" @click="delImage($index)"><i class="iconfont">&#xe61a;</i></div>
                </div>

                <upload-image 
                    action="/v2/new_maintenance/upload_image" 
                    method="post" 
                    name="file" 
                    accept="image/*"
                    v-if="images.length < 3"></upload-image>
            </div>
        </div>

        <div class="xc-desc-remark">
            提交后24小时内，客服将会与您联系，有问题致电
            <a href="tel:4000026666" style="color:#44A7EF;text-decoration:underline;">400-002-6666</a>
        </div>

        <div class="xc-group-footer">
            <a class="xc-group-footer-btn xc-group-footer-confirm" @click="save">立即预约</a>
        </div
    </div>
</template>

<script>
    import UploadImage from 'components/UploadImage'
    import { 
        setLoading,
        showToast,
        setOrderInfo,
        setFaultItems
    } from 'actions'


    export default {
        data: () => {
            return {
                contact:"",
                mobile:"",
                user_remark:"",
                images: []
            }
        },
        methods: {
            delImage(index) {
                const self = this
                let imgId = this.images[index].id
                this.images.splice(index, 1)
                this.$http({
                    url: '/v2/new_maintenance/delete_image',
                    method: 'POST',
                    params: {
                        id: imgId
                    }
                }).then(res => {
                    if (res.data.status.code == 200) {
                        self.showToast('删除成功')
                    } else {
                        self.showToast(res.data.status.msg)
                    }
                }, res => {
                    self.showToast('系统出错了')
                })
            },
            save() {
                const self = this

                if (!self.contact) {
                    self.showToast('请输入联系人')
                    return ;
                }

                if (!self.mobile) {
                    self.showToast('请输入手机号')
                    return ;
                }

                if (self.images.length  == 0) {
                    self.showToast('请上传保险材料')
                    return ;
                }
                self.$http({
                    url: '/v2/new_maintenance/create_insurance_reservation',
                    method: 'POST',
                    params:{
                        contact: self.contact,
                        mobile: self.mobile,
                        user_remark: self.user_remark || "",
                        images: self.images.map(image => image.id)
                    }
                })
                .then((res) => {
                    if (res.data.status.code == 200) {
                        self.$router.go({name:'BaoxianDetail', params: {reservationId:res.data.data.id}});
                    } else {
                        self.showToast(res.data.status.msg)
                        return false
                    }
                }, res => {
                    self.showToast('系统繁忙,请稍后再试.')
                })
            }
        },
        components: {
            UploadImage
        },
        events: {
            onFileUpload: function(file,res) {
                const self = this;
                this.setLoading(false)
                if (res.status.code == 200) {
                    this.showToast(res.status.msg)
                    self.images.push(res.data[0]);
                } else {
                    this.showToast(res.status.msg)
                }
            },
            onFileError: function(err) {
                this.setLoading(false)
                alert("文件上传错误")
            }
        },
        vuex: {
            actions: {
                setLoading,
                showToast,
                setOrderInfo,
                setFaultItems
            }
        }
    }
</script>
