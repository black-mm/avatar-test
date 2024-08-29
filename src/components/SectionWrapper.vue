<template>
    <div class="setting-section">
        <div class="title">{{ title }}</div>
        <div>
            <slot />
        </div>
    </div>
</template>

<script setup lang='ts'>
let props = defineProps(['title'])
</script>

<style scoped lang='scss'>
.setting-section {
    padding: 1.8rem 1rem;

    .title {
        margin-bottom: 1.5rem;
        font-weight: bold;
        line-height: 23px;
        color: hsl(211, 19%, 70%);
    }
}
</style>