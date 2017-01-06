<style lang="less" scoped>
    .xc-fault-item-page {
        .xc-normal-panel {
            position: relative;
            margin-bottom: 10px;
            background-color: #FFFFFF;

            .xc-normal-title {
                padding-left: 15px;
                height: 52px;
                display: flex;
                line-height: 52px;
                .iconfont {
                    margin-right: 8px;
                }
            }

            .xc-fault-categories {
                position: relative;
                padding-left: 15px;
                padding-bottom: 5px;
                text-align: center;

                .xc-fault-category {
                    margin-right: 10px;
                    position: relative;
                    margin-bottom: 10px;
                    float: left;
                    width: 78px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    border: 1px solid #888888;
                    color: #888888;
                    border-radius: 1px;

                    .iconfont {
                        display: none;
                        width: 14px;
                        height: 14px;
                    }
                }

                .xc-fault-category.xc-category-active {
                    position: relative;
                    color: #44A7EF;
                    border: 1px solid #44A7EF;

                    .iconfont {
                        position: absolute;
                        display: block;
                        font-size: 14px;
                        bottom: 12px;
                        right: 0px;
                    }
                }
            }
        }
    }

    .xc-fault-items-panel {
        margin-top: 10px;
        .xc-fault-items-body {
            position: relative;
            padding-left: 15px;
            padding-bottom: 5px;

            .xc-fault-item {
                position: relative;
                padding-bottom: 5px;
                width: 33%;
                display: flex;
                float: left;

                .xc-item-iconfont {
                    display: inline-block;
                    width: 24px;
                    flex: none;
                }

                .xc-fault-item-name {
                    flex: 1;
                    position: relative;
                    top: 3px;
                    left: 0px;
                    padding-right: 2px;
                }
            }
        }
    }

    .xc-fault-remark {
        margin-top: 10px;
        background-color: #FFFFFF;
        padding-left: 15px;
        height: 60px;
        line-height: 60px;

        .xc-remark-field {
            height: 56px;
            line-height: 60px;
            border: 0;
            outline: 0;
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
        margin-bottom: 75px !important;
    }

    .xc-baoxian-image {
        flex: 1;
        text-align: right;
        padding-right: 15px;
    }

    .xc-item-iconfont {
        .iconfont {
            position: relative;
            top: 2px;
            font-size: 16px;
        }
    }

</style>

<template>
    <div class="xc-fault-item-page">
        <div class="xc-fault-category-panel xc-normal-panel">
            <div class="xc-fault-category-title xc-normal-title">
                <i class="iconfont">&#xe605;</i>选择故障分类
            </div>
            <div class="xc-fault-categories xc-normal-body xc-floatfix">
                <div class="xc-fault-category" 
                    v-for="category in categories" 
                    @click="selectCategory(category)"
                    v-bind:class="{'xc-category-active':isSelectedCategory(category)}">
                    {{ category.name }}
                    <i class="iconfont">&#xe617;</i>
                </div>
            </div>
        </div>

        <div class="xc-fault-items-panel xc-normal-panel" v-if="selectedCategory.items.length">
            <div class="xc-fault-items-title xc-normal-title">
                <i class="iconfont">&#xe619;</i>故障描述(可多选)
            </div>
            <div class="xc-fault-items-body xc-normal-body xc-floatfix">
                <div class="xc-fault-item" v-for="item in selectedCategory.items" @click="selectItem(item)">
                    <div class="xc-item-iconfont">
                        <i v-if="selectedItems.indexOf(item.id) != -1" class="iconfont">&#xe610;</i>
                        <i v-else class="iconfont" style="color:#979797;">&#xe60f;</i>
                    </div>
                    <div class="xc-fault-item-name">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>

        <div class="xc-fault-remark">
            <i class="iconfont">&#xe604;</i>
            <input type="text" v-model="remark" placeholder="添加更多故障描述" class="xc-remark-field">
        </div>

        <div class="xc-normal-panel xc-upload-img-box">
            <div class="xc-fault-items-title xc-normal-title">
                <i class="iconfont">&#xe60e;</i>上传故障图片
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
                    v-if="images.length <3"></upload-image>
            </div>
        </div>

        <div class="xc-group-footer">
            <a class="xc-group-footer-btn xc-group-footer-confirm" @click="confirm">确认添加</a>
        </div>
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
        data: function() {
            return {
                id:0,
                categories: [],
                selectedCategory: {
                    id: 0,
                    items: []
                },
                images: [],
                selectedItems: [],
                remark: ""
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
            selectCategory(category) {
                if (this.selectedCategory.id == category.id) {
                    this.selectedCategory = {id:0,items:[]}
                } else {
                    this.selectedCategory = category;
                }
                this.selectedItems = [];
            },
            isSelectedCategory(category) {
                return category.id == this.selectedCategory.id;
            },
            selectItem(item) {
                if (this.selectedItems.indexOf(item.id) != -1) {
                    this.selectedItems = this.selectedItems.filter(it => {
                        return it != item.id;
                    });
                } else {
                    this.selectedItems.push(item.id);
                }
            },
            confirm() {
                const self = this;
                let itemId = self.$route.params.itemId
                let postUrl = "/v2/new_maintenance/create_maintenance_reservation_auto_fault_item"
                if (itemId) {
                    postUrl = "/v2/new_maintenance/edit_maintenance_reservation_auto_fault_item"
                }

                if (self.selectedItems.length == 0) {
                    self.showToast("请选择故障项目")
                    return ;
                }

                self.$http({
                    url: postUrl,
                    method: "POST",
                    params: {auto_fault_items:self.selectedItems,images:self.images.map(image => {
                        return image.id
                    }),description:self.remark,id:self.id}
                }).then(res => {
                    if (res.data.status.code != 200) {
                        self.showToast(res.data.status.msg)
                        return;
                    }
                    if (self.selectedCategory.id > 0) {
                        if (itemId > 0) {
                            res.data.data.id = self.id
                        }
                        
                        self.setFaultItems(res.data.data);
                    }
                    self.$router.go({name:"Guzhang"})
                }, res => {
                    
                });
            }

        },
        ready() {
            const self = this
            const state = self.$store.state
            let itemId = self.$route.params.itemId
            // this.setLoading(true)
            this.$http.get('/v2/new_maintenance/auto_fault_item_list')
                .then(res => {
                    self.setLoading(false)
                    self.categories = res.data.data;
                    
                }, res => {
                    
                }).then(() => {
                    self.categories.forEach(cat => {
                        if (cat.id == itemId) {
                            self.selectedCategory = cat
                        }
                    })

                    state.faultItems.forEach(item => {
                        if (item.cat_id == itemId) {
                            self.images = item.images
                            self.remark = item.description
                            self.id = item.id
                            self.selectedItems = item.auto_fault_items.map(it => {
                                return it.id
                            })
                        }
                    })

                    if (!itemId) {
                        self.selectedCategory = self.categories[0]
                    }
                }) 
                ;  
        },
        vuex: {
            actions: {
                setLoading,
                showToast,
                setOrderInfo,
                setFaultItems
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
            onFileError: function(file,err) {
                this.setLoading(false)
                this.showToast('文件上传错误')
            }
        }
    }
</script>