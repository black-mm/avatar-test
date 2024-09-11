<template>
    <ul :class="[className]">
        <li v-for="item,index in group" :key="index">
            <div :class="itemClassObj(item)" :style="{ 'background-color': item }"
                @click="itemChange(item)">
            </div>
        </li>
    </ul>
</template>

<script setup lang='ts'>
import { useStore } from '@/store/index.ts'

let Store = useStore()
let props = defineProps(['group', 'className'])
let currentIndex = ref('')

let itemClassObj = computed((item) => {
    return (item) => {
        return [
            'itemDiv',
            props.className==='shape-container'? item:'',
            { 'active': currentIndex.value === item }
        ]
    }
})

let itemChange = (item) => {
    if (props.className === 'shape-container') {
        Store.avatarShape = item
    } else if (props.className === 'border-container') {
        Store.avatarBorder = item
    }
    currentIndex.value = item
}
onMounted(() => {
    if (props.className === 'shape-container') {
        currentIndex.value =  Store.avatarShape
    } else if (props.className === 'border-container') {
        currentIndex.value =  Store.avatarBorder
    }
})
</script>

<style scoped lang='scss'>
ul {
    display: flex;
    gap: 20px;
}

.shape-container {
    .itemDiv {
        width: 24px;
        height: 24px;
        background-color: hsl(211, 19%, 70%);
        cursor: pointer;
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

.border-container {
    flex-wrap: wrap;

    .itemDiv {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: relative;
        box-shadow: 0 0 0.05em 0.2em hsl(216, 14%, 14%);
        cursor: pointer;

        &.transparent {
            background: #fff !important;

            &::after {
                position: absolute;
                top: 50%;
                left: 50%;
                z-index: 1;
                color: #ff4757;
                font-weight: bold;
                font-size: 1.8rem;
                transform: translate(-50%, -50%) scale(0.5);
                opacity: 1;
                content: '\\';
            }
        }

        &::before {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: -1;
            width: 100%;
            height: 100%;
            background: inherit;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.5;
            transition: width 0.15s, height 0.15s;
            content: '';
        }

        &::after {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1;
            color: hsl(216, 14%, 14%);
            font-size: 1.5rem;
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
            transition: opacity 0.15s;
            content: '\2714';
        }

        &.active::before {
            width: 160%;
            height: 160%;
        }

        &.active::after {
            opacity: 1;
        }
    }
}
</style>