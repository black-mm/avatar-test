<template>
    <div class="sider">
        <SectionWrapper title="头像形状">
            <Shape :group="SETTINGS.shapeGroup" className="shape-container"></Shape>
        </SectionWrapper>

        <SectionWrapper title="边框颜色">
            <Shape :group="SETTINGS.borderGroup" className="border-container"></Shape>
        </SectionWrapper>
    </div>
</template>

<script setup lang='ts'>
import SectionWrapper from '../components/SectionWrapper.vue';
import Shape from '../components/Shape.vue';
import {SETTINGS} from '@/utils/constant.ts'

</script>

<style scoped lang="scss">
.sider {
    width: $layout-sider-width;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
}
</style>