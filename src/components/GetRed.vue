<template>
    <div class="getred" :style="`height:${h}px`">
        <img src="http://cdn.shebao.info/upload/portal/20190403/eb0e25ac7e96f858031631c99e67f9a8.jpg" @click="onClick"/>
        <input class="g-phone" type="text" v-model="phone" maxlength="11" placeholder="请输入手机号码领取" @input="phone = phone.replace(/[^\d]/g,'')"/>
        <div class="g-btn" @click="btnClick"></div>
        <p>33万人已领取，赶紧加入吧~</p>
        <mt-popup class="mt-popup" v-model="onPhone" :modal="false" position="top">手机号码输入有误，请重新输入！</mt-popup>
    </div>
</template>
<script>
import qs from 'qs';
import { MessageBox } from 'mint-ui';
import { Popup } from 'mint-ui';

export default {
    data(){
        return{
            h: window.innerHeight || 667,
            phone:'',
            onPhone: false,
            phoneType: this.$store.state.phoneType || 'Android',
            invite_id: '',
            appid: null,
            downURL:'',
            times: 0
        }
    },
    watch:{
        onPhone(val){
            if(val){
                setTimeout(()=>{
                    this.onPhone = false;
                },2000)
            }
        }
    },
    created(){
        
        var url = location.href.split('?')[1].split('&');
        var a = url.find(v => v.indexOf('invite_id')>-1);
        this.invite_id = a.split('=')[1];
    },
    methods:{
        onClick(){
            return false
        },
        btnClick(){
            
            if(/^1(3|4|5|7|8)\d{9}$/.test(this.phone)){ 
                this.times += 1
                if(this.times <= 6){
                    this.sendInvite();
                }else{
                    MessageBox({
                        titile:'提示',
                        message:'领取次数已超过限制，请勿频繁操作',
                        confirmButtonText: '知道了'
                    })
                }
            }else{
                this.onPhone = true;
            }
        },
        //邀请好友接口
        async sendInvite(){
            
            let pamans = qs.stringify({
                invite_id: this.invite_id,
                mobile: this.phone
            })
            const resp = await this.axios.post('api/jijiaban/invite/invite',pamans)
            if(resp.data.code == 1){
                if(resp.data.msg == '成功'){
                    MessageBox({
                        titile:'提示',
                        message:'领取成功，下载app提现红包',
                        confirmButtonText: '知道了'
                    });
                }else{
                     MessageBox.alert(resp.data.msg)
                }
                let app_id = resp.data.data.appid;
                if(this.phoneType == 'Android'){
                    if(app_id == 1){//社保一点通
                        this.downURL = '#'
                    }else if(app_id == 3){//记加班
                        this.downURL = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.dai58.jijiaban.yidiantong'
                    }else if(app_id == 4){//人人社保
                        this.downURL = 'http://zhushou.360.cn/detail/index/soft_id/4004003'
                    }else if(app_id == 5){//社保一账通
                        this.downURL = 'http://zhushou.360.cn/detail/index/soft_id/3976174'
                    }
                }
                if(this.phoneType == 'IOS'){
                    if(app_id == 1){//社保一点通
                        this.downURL = 'itms-apps://itunes.apple.com/app/id1369681341'
                    }else if(app_id == 3){//记加班
                        this.downURL = 'itms-apps://itunes.apple.com/app/id1408494878'
                    }else if(app_id == 4){//人人社保
                        this.downURL = 'itms-apps://itunes.apple.com/app/id1437622796'
                    }else if(app_id == 5){//社保一账通
                        this.downURL = 'itms-apps://itunes.apple.com/app/id1433887224'
                    }
                }
                if(this.downURL){
                    setTimeout(()=>{
                        location.href = this.downURL;
                    },3000)
                }else{
                    MessageBox.alert('下载链接不存在','提示')
                }
            }else{
                MessageBox.alert(resp.data.msg)
            }
        }
    }
}
</script>
<style>
    .mint-msgbox{
        width: 71% !important;
        border-radius: 10px !important;
    }
    /* .mint-msgbox-content{
        border-bottom: none !important;
    }
    .mint-msgbox-btns{
        height: auto !important;
        justify-content: center !important;
    }
    .mint-msgbox-btn {
        flex: none !important;
    }*/
    .mint-msgbox-confirm{
       font-size: 16px !important;
    } 
    
</style>


<style lang="scss" scoped>
        
    .mt-popup{
        width: 100%;
        font-size: .14rem;
        background: rgba(0,0,0,.7);
        color: #ffffff;
        line-height: .5rem;
        backface-visibility: hidden;
        text-align: center;
    }
    .getred{
        position: relative;
        width: 100%;
        background: #cd2223;
        img{
            width: 100%;
        }
        .g-phone{
            position: absolute;
            top: 3.5rem;
            left: 50%;
            margin-left: -1.3rem;
            width: 2.5rem;
            height: .5rem;
            border-radius: 5px;
            border: none;
            padding-left: .1rem;
            outline: none;
            font-size: .18rem;
            color: #aaaaaa;
        }
        .g-phone::-webkit-input-placeholder{
            color: #aaaaaa;
        }
        .g-phone::-moz-placeholder{  
            color: #aaaaaa;        
        }
        .g-phone:-ms-input-placeholder{  
            color: #aaaaaa;        
        }
        .g-btn{
            width: 2.6rem;
            height: .5rem;
            position: absolute;
            top: 4.23rem;
            left: 50%;
            margin-left: -1.3rem;
            background-image: url(../assets/image/ljlq.png);
            background-size: 100%;
        }
        p{
            font-size: .14rem;
            color: #ffffff;
            position: absolute;
            top: 4.8rem;
            left: 0;
            width: 100%;
            text-align: center;
        }
    }
</style>

