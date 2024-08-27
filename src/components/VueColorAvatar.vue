<template>
    <div class="vue-color-avatar">
        <div class="avatar-payload" v-html="svgContent"></div>
    </div>
    <div class="options">
        <img src="@/assets/preview/mouth/frown.svg" alt="" @click="optionChange('mounth', frown)">
        <img src="@/assets/preview/mouth/laughing.svg" alt="" @click="optionChange('mounth', laughing)">
        <img src="@/assets/preview/ear/attached.svg" alt="" @click="optionChange('ear', attached)">
        <img src="@/assets/preview/ear/detached.svg" alt="" @click="optionChange('ear', detached)">
    </div>
</template>

<script setup lang='ts'>
import { log } from 'console';
import { off } from 'process';
import { onMounted, ref } from 'vue';

let svgContent = ref('')

let frown = `  <g transform="translate(75, 160)">
    <title>mouth - frown</title>
    <path
      d="M2 41C5.21065 33.0427 17.1069 16.2329 39.0069 12.6522C60.9069 9.07139 72.1273 21.1068 75 27.5721"
      stroke="black"
      stroke-width="4"
    />
  </g>`
let laughing = ` <g transform="translate(85, 158)">
    <title>mouth - laughing</title>
    <path
      d="M69.9204 13.3305C69.7501 11.263 67.6363 10.1117 65.8448 10.8176C61.6161 12.4839 47.6267 17.7834 37.7627 19.1403C26.9401 20.6291 10.5503 18.821 5.80622 18.2319C3.87694 17.9923 2.15721 19.6504 2.49021 21.6654C3.14178 25.6081 4.48399 29.4088 6.45857 32.8914C8.6608 36.7754 11.6065 40.1877 15.1274 42.9333C18.6484 45.679 22.6757 47.7042 26.9793 48.8935C31.283 50.0827 35.7787 50.4126 40.2099 49.8644C44.6411 49.3162 48.9208 47.9005 52.8049 45.6983C56.689 43.4961 60.1012 40.5504 62.8469 37.0294C65.5925 33.5085 67.6178 29.4812 68.807 25.1775C69.8726 21.3212 70.2483 17.3106 69.9204 13.3305Z"
      fill="#171921"
      stroke="#171921"
      stroke-width="4"
    />
    <mask
      id="mouthLaughing"
      style="mask-type: alpha"
      maskUnits="userSpaceOnUse"
      x="4"
      y="12"
      width="65"
      height="37"
    >
      <path
        d="M67.7931 12.1925C68.3091 16.363 67.9985 20.5943 66.8793 24.6448C65.76 28.6953 63.8539 32.4857 61.2697 35.7996C58.6856 39.1134 55.474 41.8858 51.8185 43.9585C48.1629 46.0312 44.1348 47.3636 39.9643 47.8795C35.7938 48.3955 31.5625 48.085 27.512 46.9657C23.4615 45.8464 19.6712 43.9403 16.3573 41.3562C13.0435 38.772 10.2711 35.5605 8.19838 31.9049C6.12569 28.2493 4.79332 24.2213 4.27734 20.0508L67.7931 12.1925Z"
        fill="#171921"
      />
    </mask>
    <g mask="url(#mouthLaughing)">
      <circle
        cx="40.5221"
        cy="52.3146"
        r="21.5"
        transform="rotate(-7.05286 40.5221 52.3146)"
        fill="#FC909F"
      />
    </g>
  </g>`
let attached = ` <g transform="translate(5, 130.5)">
    <title>ear - attached</title>
    <path
      d="M30.5 6.17556C28.17 5.40834 25.6547 5 23.08 5C12.5866 5 4.08007 11.5 5.08001 23.5C6.12162 36 13.5866 40.5 24.08 40.5C25.2476 40.5 26.3906 40.3975 27.5 40.2011C28.7105 39.9869 29.8811 39.6609 31 39.2347"
      stroke="#000"
      stroke-width="8"
    />
    <path
      d="M31.5 39.0361C29.2204 39.9786 26.7127 40.5 24.08 40.5C13.5866 40.5 6.12162 36 5.08001 23.5C4.08007 11.5 12.5866 5 23.08 5C26.2175 5 29.2667 5.60635 32 6.72957L31.5 39.0361Z"
      fill="$fillColor"
    />
    <path
      d="M27.5 13.5004C23.5 11.6671 14.7 10.7004 11.5 21.5004"
      stroke="#000"
      stroke-width="4"
    />
    <path
      d="M17 14C19.1667 15.8333 23.3 21.5 22.5 29.5"
      stroke="#000"
      stroke-width="4"
    />
  </g>`
let detached = `<g transform="translate(2.5, 129)">
    <title>ear - detached</title>
    <path
      d="M36.466 43.1111L37 42.5357V41.7506V8.24948V7.13022L36.046 6.54483C32.3122 4.25363 27.7717 3 23.08 3C17.4397 3 12.1591 4.74745 8.39775 8.29504C4.59419 11.8824 2.54206 17.1274 3.08692 23.6661C3.61786 30.0378 5.75693 34.7272 9.30474 37.8433C9.01338 38.8425 8.92733 39.9197 9.06236 41.0533C9.45166 44.3216 11.1039 46.6766 13.6572 48.1277C16.0911 49.511 19.2061 49.9998 22.5242 49.9998C28.0033 49.9998 32.8077 47.0528 36.466 43.1111Z"
      stroke="black"
      stroke-width="4"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M42.972 23.984C43.0434 23.3322 43.08 22.6703 43.08 22C43.08 11.7827 33.5734 5 23.08 5C12.5866 5 4.08007 11.5 5.08001 23.5C5.63643 30.1774 8.02584 34.5719 11.7307 37.2171C11.1423 38.2409 10.8848 39.4436 11.0483 40.8167C11.6774 46.0984 16.1862 47.9998 22.5242 47.9998C33.6292 47.9998 42.4159 33.9534 42.972 23.984Z"
      fill="$fillColor"
    />
    <path
      d="M27.5 13.5004C23.5 11.6671 14.7 10.7004 11.5 21.5004"
      stroke="#000"
      stroke-width="4"
    />
    <path
      d="M17 14C19.1667 15.8333 23.3 21.5 22.5 29.5"
      stroke="#000"
      stroke-width="4"
    />
  </g>`

let svgOptions:{
    [key:string]:number | string
} = {
    mounth:'123',
    ear:'',
}

let optionChange = (type:string, svgValue:string) => {
    svgOptions[type]= svgValue
    let svgStr = ''
    Object.keys(svgOptions).forEach(key=>{
        svgStr += svgOptions[key]
    })
    svgContent.value = `
     <svg 
        width='250' height='250'
        preserveAspectRatio="xMidYMax meet"
        fill="none"
        xmlns='http://wwww.w3.org/2000/svg'>
        ${svgStr}
    </svg>
    `
}   

onMounted(() => {
})

</script>
<style scoped lang='scss'>
.vue-color-avatar {
    width: 280px;
    height: 280px;
    border-radius: 25px;
    // background-color: pink;
    border: 1px solid pink;
    background-color: #fff;
}

.options {
    margin-top: 20px;
    background-color: #d4d4d4;
}
</style>