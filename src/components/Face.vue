<template>
    <div v-show="show" class="face" :style="`height:${h}px`">
        <img @load="show = true" class="f-img" src="../assets/image/mdmsm.jpg" />
        <div id="qrcode" ref="qrcode" :style="`margin-left:${-marL}px`"></div>
    </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
    data(){
        return{
            marL: 0,
            h: window.innerHeight,
            show: false
        }
    },
    mounted(){
        this.qrcode();
    },
    methods:{
        qrcode () {
            const w = document.documentElement.clientWidth;
            const w1 = 220 *w /375;
            this.marL = w1 / 2;
            let qrcode = new QRCode('qrcode',{
            width: w1, // 设置宽度，单位像素
            height: w1, // 设置高度，单位像素
            text: this.$route.params.url// 设置二维码内容或跳转地址
        })
    }}
}
</script>
<style lang="scss" scoped>
    .face{
        position: relative;
        background: #d63932;
        .f-img{
            width: 100%;
        }
        #qrcode{
            position: absolute;
            top: 2.11rem;
            left: 50%;
        }
    }
</style>
