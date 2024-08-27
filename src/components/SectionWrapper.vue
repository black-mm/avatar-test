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
.title {
    font-size: 16px;
    font-weight: bold;
    padding: 20px;
}
</style>