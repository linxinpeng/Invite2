<template>
    <div class="box" :style="`height:${docHeight}px;position: relative;`">
        <div style="background: #f2f2f2;height:.1rem;"></div>
        <div class="money">
            <div class="top">
                <span class="jine">
                    <span class="j-s1">余额: <strong>￥</strong></span>
                    <input class="moneys" type="text" v-model="money" @input="money = NumberCheck(money)"  placeholder="请输入提现金额"  autofocus="autofocus" ref="input" />
                </span>
                <span class="allmoney" @click="allCash">全部提现</span>
            </div>
            <div class="bottom">
                满1.00元即可提现，余额：{{account&&account.money || 0}}元
            </div>
        </div>
        <div style="background: #f2f2f2;height:.1rem;"></div>
        <div class="select">
            <!-- <div class="item"  @click="selected = 1">
                <div class="litBox">
                    <img src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/weixinzhifu.png" alt="">
                    <p>微信</p>
                </div>
                <div class="check">
                    <img v-if="selected==1" src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/mark.png" alt="">
                    <img v-else src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/nomark.png" alt="">
                </div>
            </div> -->
            <div class="item"  @click="selected = 2" >
                <div class="litBox">
                    <img src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/zhifubao.png" alt="">
                    <p>支付宝</p>
                </div>
                <div class="check">
                    <img v-if="selected==2" src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/mark.png" alt="">
                    <img v-else src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/nomark.png" alt="">
                </div>
            </div>
        </div>
        <div class="note">
            <p class="title">注意事项:</p>
            <ul>
                <li>
                    1.提现申请后2个工作日内到账。
                </li>
                <li>
                    2.提现无手续费。
                </li>
                <li>
                    3.充值提现遇到问题，可在【我的】-【在线咨询】中反馈你的问题。
                </li>
            </ul>
        </div>
        <button class="btn" @click="onCash">立即提现</button>

    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import qs from 'qs';

export default {
   data() {
        return {
            selected: 2,
            money:'',
            inputNum: '',
            account: null,
            extract: false,
            docHeight: document.documentElement.clientHeight
        }
    },
    created(){
        var account = JSON.stringify(sessionStorage.getItem('account'));
        var getCash = sessionStorage.getItem('getCash');
        if(account&&getCash){
            this.money = getCash;
            this.account = account;
        }
        this.getAccount();
    },

    methods:{
    
        allCash(){
          this.money = this.account&&this.account.money;
        },
        onCash(){
            if(!this.extract){
                MessageBox.alert('一天只能提现一次','提示');
                return false
            }
            if(parseFloat(this.money) > parseFloat(this.account.money)){
                MessageBox.alert('账户余额不足','提示')
            }else{
                if(parseFloat(this.money) >= 1){
                    sessionStorage.setItem('getCash',this.money)
                    this.$router.push({ 
                        name: `paypal`, 
                        params: { info: this.account,cash: this.money}
                        }
                    )
                }else{
                    MessageBox.alert('提现金额不能少于1元','提示')
                }
            }
        },
         NumberCheck(num) {
            var str = num;
            var len1 = str.substr(0, 1);
            var len2 = str.substr(1, 1);
            //如果第一位是0，第二位不是点，就用数字把点替换掉
            if (str.length > 1 && len1 == 0 && len2 != ".") {
                str = str.substr(1, 1);
            }
            //第一位不能是.
            if (len1 == ".") {
                str = "";
            }
            //限制只能输入一个小数点
            if (str.indexOf(".") != -1) {
                var str_ = str.substr(str.indexOf(".") + 1);
                if (str_.indexOf(".") != -1) {
                str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
                }
            }
            //正则替换，保留数字和小数点
            str = str.replace(/[^\d^\.]+/g,'')
            //如果需要保留小数点后两位，则用下面公式
            str = str.replace(/\.\d{3}$/,'')
            return str;
         },
        async getAccount(){
            const params = qs.stringify({
                user_id: sessionStorage.getItem('UserID'),
                appid: sessionStorage.getItem('AppID')
            })
            let app_id = sessionStorage.getItem('AppID');
            let resp = null;
            if(app_id == 3 || app_id == 9){
             resp = await this.axios.post('api/jijiaban/jijiabanwallet/get_user_account',params);
            }else{
             resp = await this.axios.post('api/shebao/wallet/getUserAccount',params); 
            }
            if(resp.data.code == 1){
                this.account = resp.data.data;
                this.extract = resp.data.data.extract == 0?true:false;
                sessionStorage.setItem('account',JSON.stringify(resp.data.data))
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .box{
        .money{
            background: #ffffff;
            height: .94rem;
            box-sizing: border-box;
            .top{
                font-size: .16rem;
                color: #333333;
                height: .6rem;
                border-bottom: 1px solid #eee;
                .jine{
                    width: 70%;
                    float: left;
                    box-sizing: border-box;
                    padding-left: .1rem;
                    height: .6rem;
                    line-height: .6rem;
                    .j-s1{
                        width: 30%;
                        text-align: center;
                        display: inline-block;
                    }
                    .moneys{
                        width: 50%;
                        outline: none;
                        border: none;
                        height: 70%;
                        color: #333333;
                        font-weight: bold;
                        font-size: .2rem;
                    }
                    .moneys::-webkit-input-placeholder{
                        font-size: .14rem;
                        font-weight: 400;
                        color: #aaaaaa;
                    }
                    .moneys::-moz-placeholder{  
                        font-size: .14rem;
                        font-weight: 400;
                        color: #aaaaaa;        
                    }
                    .moneys:-ms-input-placeholder{ 
                        font-size: .14rem; 
                        font-weight: 400;
                        color: #aaaaaa;        
                    }
                }
                .allmoney{
                    width: 30%;
                    float: left;
                    height: 100%;
                    text-align: center;
                    line-height: .6rem;
                    font-size: .16rem;
                    color: #ffaa2d;
                }
            }
            // .top{
            //     display: flex;
            //     height: .5rem;
            //     border-bottom: .01rem solid #eee;
            //     padding-bottom: .1rem;
            //     .jine{
            //         width: 70%;
            //         font-size: .16rem;
            //         color: #333333;
            //         height: 100%;
            //         .j-s1{
            //             width: 30%;
            //             height: 100%;
            //             float: left;
            //             font-size: .16rem;
            //             color: #333333;
            //             line-height: .5rem;
            //             text-align: center;
            //             strong{
            //                 font-size: .2rem;
            //             }
            //         }
            //         .moneys{
            //             outline: none;
            //             border: none;
            //             height: 100%;
            //             line-height: .6rem;
            //             font-size: .2rem;
            //             width: 50%;
            //             color: #333333;
            //             font-weight: bold;
            //         }
            //          .moneys::-webkit-input-placeholder{
            //              font-size: .14rem;
            //             font-weight: 400;
            //             color: #aaaaaa;
            //         }
            //         .moneys::-moz-placeholder{  
            //              font-size: .14rem;
            //             font-weight: 400;
            //             color: #aaaaaa;        
            //         }
            //         .moneys:-ms-input-placeholder{ 
            //              font-size: .14rem; 
            //             font-weight: 400;
            //             color: #aaaaaa;        
            //         }

            //     }
            //     .allmoney{
            //         width: 30%;
            //         font-size: .16rem;
            //         color: #ffaa2d;
            //         text-align: center;
            //         line-height: .5rem;
            //     }
            // }
            .bottom{
                font-size: .12rem;
                color: #f24848;
                height: .34rem;
                line-height: .34rem;
                padding-left: .1rem;
            }
            
        }
        .select{
            background: #ffffff;
            .item{
                display: flex;
                height: .6rem;
                align-items: center;
                border-bottom: 1px solid #eeeeee;
                .litBox{
                    width: 80%;
                    display: flex;
                    align-items: center;
                    img{
                        width: .34rem;
                        height: .34rem;
                        margin-left: .2rem;
                    }
                    p{
                        font-size: .16rem;
                        color: #333333;
                        padding-left: .2rem;
                    }
                }
                .check{
                    width: 20%;
                    height: .23rem;
                    img{
                        width: .23rem;
                        height: .23rem;
                        display: block;
                        margin: auto;
                    }
                }
            }
        }
        .note{
            background: #ffffff;
            font-size: .14rem;
            color: #333333;
            padding: 0 2.5%;
            .title{
                font-size: .14rem;
                line-height: .4rem;
            }
            ul{
                padding: 0;
                margin: 0;
                li{
                    list-style: none;
                    line-height: 2;
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
            left: 2.5%;
            bottom: 2.5%;
            outline: none;
            border: none;
        }
    }
</style>

