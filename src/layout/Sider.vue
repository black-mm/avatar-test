<template>
    <div class="sider">
        <SectionWrapper title="头像形状">
            <ul>
                <li v-for="item, index in shapeGroup" :key="index" @click="activeChange(index)">
                    <div :class="[ 'shape', item.shape, {'active': currentIndex === index }]"
                        :style="{'background-color':item.color}">
                    </div>
                </li>
            </ul>
        </SectionWrapper>

    </div>
</template>

<script setup lang='ts'>
import SectionWrapper from '../components/SectionWrapper.vue';

let currentIndex = ref(0)

let shapeGroup = [
    {
        shape: 'circle',
        color: 'hsl(211, 19%, 70%)'
    },
    {
        shape: 'square',
        color: 'hsl(211, 19%, 70%)'
    },
    {
        shape: 'squircle',
        color: 'hsl(211, 19%, 70%)'
    }
]
let activeChange = (index) => {
    currentIndex.value = index
}

</script>

<style scoped lang="scss">
.sider {
    width: $layout-sider-width;
    height: 100%;
    border: 1px solid #fff;
    position: fixed;
    top: 0;
    right: 0;
}

.setting-section {
    ul {
        padding: 0 20px 20px 20px;
        display: flex;
        gap: 20px;
    }

    .shape {
        width: 24px;
        height: 24px;
        background-color: hsl(211, 19%, 70%);
    }

    .circle {
        border-radius: 50px;
    }

    .squircle {
        border-radius: 5px;
    }

    .active {
        background-color: hsl(241, 99%, 70%) !important;
    }
}
</style>