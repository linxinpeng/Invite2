<template>
    <div class="paypal" :style="`height:${docHeight}px;position: relative;`">
        <div style="height:.1rem;background:#f2f2f2"></div>
        <div class="p-header">
            <span>提现金额：￥</span>
            <span class="h-input">{{cash}}</span>
        </div>
        <div style="height:.1rem;background:#f2f2f2"></div>
        <div class="p-account">
            <div class="a-header">
                <span>支付宝账号</span>
                <!--  -->
                <input v-if="!account || canInput" class="h-input" type="text"   placeholder="请输入支付宝账号" v-model="account" />
                <span  v-else class="h-input">{{account}}</span>
            </div>
            <div class="a-header">
                <span>确认账号</span>
                <input v-if="!reaccount || canInput" class="h-input"  type="text" placeholder="请确认账号" v-model="reaccount" />
                <span v-else class="h-input">{{reaccount}}</span>
            </div>
            <div class="a-header">
                <span>支付宝姓名</span>
                <input v-if="!accountName || canInput" class="h-input" type="text" placeholder="请输入支付宝姓名" v-model="accountName" />
                <span v-else class="h-input">{{accountName}}</span>
            </div>
        </div>
        <div style="height:.1rem;background:#f2f2f2"></div>
        <div class="note">
            <p class="title">注意事项:</p>
            <ul>
                <li>
                    1.提现申请将在2个工作日内审批到账；
                </li>
                <li>
                    2.提现时<span>请务必正确填写支付宝信息(手机号或邮箱账号)；</span>
                </li>
                <li>
                    3.如因个人原因，支付宝账号填写错误，损失将由个人承担；
                </li>
                <li>
                    4.如有疑问，请联系客服；<a :href="href">在线咨询</a>（在线时间工作日9:00-18:00）。
                </li>
            </ul>
        </div>
        <button class="btn"  @click="tixian">立即提现</button>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import qs from 'qs';
export default {
    data(){
        return{
            cash:'',
            account:'',
            reaccount:'',
            accountName:'',
            href:'javascript:void(0)',
            canInput: true,
            docHeight: document.documentElement.clientHeight
        }
    },
    created(){
        console.log(this.$store.state.phoneType)
        let info = JSON.parse(sessionStorage.getItem('account'));
        this.cash = sessionStorage.getItem('getCash')
        if(info.alipay){
            this.canInput = false;
        }
        this.account = info.alipay;
        this.reaccount = info.alipay;
        this.accountName = info.real_name;
        this.getHref();
    },
    methods:{
        async getHref(){
            let app_id = sessionStorage.getItem('AppID');
            let resp = null;
            if(app_id == 3 || app_id == 9){
             resp = await this.axios.post('api/jijiaban/jijiabansys/gettalk_url',{user_id:sessionStorage.getItem('UserID'),appid:app_id});
            }else{
             resp = await this.axios.post('api/shebao/sys/getWebTalkUrl',{user_id:sessionStorage.getItem('UserID'),appid:app_id});
            }
            if(resp.data.code == 1){
                this.href = resp.data.data;
            }else{
                console.log(resp.data.msg)
            }

        },
       tixian(){
           if(!(/^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|^1(3|4|5|7|8)\d{9}$/.test(this.account))){ 
                MessageBox.alert('请输入正确的支付宝账号','提示')
                return false; 
            } 
            if(!(/^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/.test(this.reaccount))){ 
                MessageBox.alert('请输入正确的支付宝账号','提示')
                return false; 
            } 
            if(!this.account){
                MessageBox.alert('支付宝账号不能为空','提示');
                return
            }
            if(!this.reaccount){
                MessageBox.alert('请确认支付宝账号','提示');
                return
            }
            if(!this.accountName){
                MessageBox.alert('请输入支付宝姓名','提示');
                return
            }
            if(this.account != this.reaccount){
                MessageBox.alert('两次账户输入不一致，请检查支付宝账号','提示');
                return
            }
            this.tixian2();
        },
        async tixian2(){   
             const account_info = {
                 cash: this.cash,
                 extract: '支付宝',
                 account: this.account
             }
             let params = qs.stringify({
                user_id:sessionStorage.getItem('UserID'),
                appid:sessionStorage.getItem('AppID'),
                money: this.cash,
                alipay: this.account,
                extract_way: 'alipay',
                device_type: this.$store.state.phoneType == 'Android'?'android':'iphone',
                real_name: this.accountName
            })
            let resp = null;
            let app_id = sessionStorage.getItem('AppID');
            if(app_id == 3 || app_id == 9){
             resp = await this.axios.post('api/jijiaban/jijiabanwallet/extract',params);
            }else{
             resp = await this.axios.post('api/shebao/wallet/extract',params);
            }
            if(resp.data.code == 1){
                this.$router.push(
                    { 
                    name: 'payover', 
                    params: { account_info}
                    })
            }else{
                MessageBox.alert(resp.data.msg,'提示')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .paypal{
        .p-header{
            display: flex;
            align-items: center;
            height: .5rem;
            font-size: .16rem;
            color: #333333;
            span{
                width: 30%;
                padding-left: .2rem;
            }
            .h-input{
                border: none;
                outline: none;
                font-size: .16rem;
                color: #333333;
            }
        }
        .p-account{
            height: 1.51rem;
            .a-header{
                border-bottom: 1px solid #eeeeee;
                display: flex;
                align-items: center;
                height: .5rem;
                font-size: .16rem;
                color: #333333;
                span{
                   width: 30%;
                   padding-left: .2rem;
                }
                .h-input{
                    border: none;
                    outline: none;
                    font-size: .16rem;
                    color: #333333;
                }
            }
        }
        .note{
            padding: 0 2.5%;
            font-size: .14rem;
            color: #333333;
            .title{
                font-size: .14rem;
                color: #333333;
                padding: .15rem 0;
            }
            li{
                line-height: 1.8;
                span{
                    color: #f24848;
                }
            }
        }
        .btn{
            background-color: #ffaa2d;
            border-radius: 8px;
            width: 95%;
            color: #fff;
            height: 44px;
            font-size: 18px;
            position: absolute;
            bottom: 2.5%;
            left: 2.5%;
        }
    }
</style>

