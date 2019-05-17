<template>
    <div class="payover">
        <div class="top">
            <div class="litBox">
                <img src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/mark.png" alt="">
                <p>提现申请已提交</p>
            </div>
            <div class="litBox">
                <div class="br"></div>
            </div>
            <div class="litBox">
                <div>
                    <img src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/morepoint2.png" alt="">
                    <div class="br1 be3"></div>
                    <div class="br1 be3"></div>
                </div>
                <p>预计到账时间<br /><span class="time">{{time}}到账</span></p>
            </div>
            <div class="litBox" style="display: block;margin-top:-2px;">
                <div class="br1"></div>
                <div class="br1"></div>
            </div>
            <div class="litBox">
                <img src="http://cdn.shebao.dai58.cn/html/shebao-daka/daka/morepoint.png" alt="">
                <p>提现申请已提交</p>
            </div>
        </div>
        <div style="height:.1rem;background:#f2f2f2"></div>
        <div class="o-result">
            <div class="r-item">
                <span>提现金额</span>
                <span class="s2">￥{{cash}}</span>
            </div>
            <div class="r-item">
                <span>提现方式</span>
                <span class="s2">支付宝</span>
            </div>
            <div class="r-item">
                <span>提现账号</span>
                <span class="s2">{{account}}</span>
            </div>
        </div>
        <div class="o-get">
            <div class="g-title">到账查询</div>
            <p>1.支付宝：我的账单</p>
            <p>2.我-钱包-零钱-零钱明细</p>
        </div>
        <button class="btn"  @click="ok">知道了</button>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import moment from 'moment'
export default {
    data(){
        return{
            disabled: false,
            time: '',
            cash: 0,
            account: null
        }
    },
    created(){
        this.time = moment().add(2, 'days').format("M月DD号");
        this.cash = this.$route.params.account_info.cash;
        this.account = this.$route.params.account_info.account;
    },
    methods:{
        ok(){
           let t = this.$store.state.phoneType;
           t == 'Android'?mylistner.doFinish():doFinish();
        }
    }
}
</script>
<style lang="scss" scoped>
    .payover{
        .br {
        width: 2px;
        height: 20px;
        background-image: url('http://cdn.shebao.dai58.cn/html/shebao-daka/daka/br1.png');
        background-size: 100%;
        margin-left: 10px;
    }



    .br1 {
        width: 2px;
        height: 10px;
        background-image: url('http://cdn.shebao.dai58.cn/html/shebao-daka/daka/br2.png');
        background-size: 100%;
        margin-left: 10px;
    }

    .be3 {
        background-image: url('http://cdn.shebao.dai58.cn/html/shebao-daka/daka/br1.png');
    }
        .top {
            height: 190px;
            width: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            img {
                width: 20px;
                height: 20px;
                display: block;
                margin-right: 14px;
            }
            .litBox {
                width: 90%;
                padding-left: 5%;
                font-size: 16px;
                display: flex;
                justify-content: flex-start;
                color: #333;
                .time {
                    color: #999;
                }
            }
        }
        .o-result{
            padding: 0 5%;
            border-bottom: 1px solid #eeeeee;
            .r-item{
                font-size: .13rem;
                color: #999999;
                display: flex;
                align-items: center;
                padding-bottom: .115rem;
                span.s2{
                    margin-left: auto;
                    color: #333333;
                }
            }
            .r-item:nth-child(1){
                padding-top: .115rem;
            }
            .r-item:nth-child(3){
                padding-bottom: .2rem;
            }
        }
        .o-get{
            padding: 0 5%;
            .g-title{
                font-size: .14rem;
                color: #333333;
                padding: .1rem 0;
            }
            p{
                font-size: .12rem;
                color: #333333;
                line-height: 1.8;
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
