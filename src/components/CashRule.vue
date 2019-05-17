<template>
    <div class="cashrule">
        <h3>注册奖励规则：</h3>
        <p v-for="(item,index) in rule1" :key="index" >{{item}}</p>
        <h3>邀请奖励规则：</h3>
        <p v-for="(item,index) in rule2" :key="index">{{item}}</p>
        <h3>返现券说明：</h3>
        <p v-for="(item,index) in rule3" :key="index">{{item}}</p>
        <p class="meno">注：本活动一切解释权归记加班记账所有，如有违规，将取消一切活动参与资格与奖励。</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            rule1:[
                '1.  活动期间，新注册用户可获得1元现金红包、20元返现券；',
                '2. 现金红包1元注册后可立即提现；',
                '3. 返现券20元即用户活动期间在平台上完成自助缴纳社保或公积金激活后可提现；',
                '4. . 一个支付宝账号仅可绑定一个注册手机账号，提现申请后将在2个工作日内发放至支付宝账号。'
            ],
            rule2:[
                '1. 活动期间，用户成功邀请一个好友注册，即可双方各获得1元现金红包，每个用户最高奖励6元；',
                '2. 被邀请方在平台上完成自助缴纳社保/公积金，即邀请方获得10元返现红包，每个用户最高奖励60元；',
                '3. 邀请的好友越多，奖励越多。'
            ],
            rule3:[
                '1、自动返现支持24个城市：北京、常州、成都、大连、东莞、广州、杭州、合肥、呼和浩特、湖州、济南、昆山、南京、宁波、上海、深圳、苏州（市区）、苏州（园区）、天津、无锡、武汉、义乌、中山、珠海。',
                '2、其他城市代缴返现，请联系客服返现。'
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
    .cashrule{
        width: 95%;
        margin: 0 auto;
        h3{
            font-size: .16rem;
            color: #333333;
            margin: .2rem auto;
        }
        p{
            font-size: .13rem;
            color: #333333;
            line-height: 1.8;
        }
        .meno{
            margin-top: .4rem;
            font-size: .12rem;
            color:#333333;
        }
    }
</style>

