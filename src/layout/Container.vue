<template>
    <section class="container">
        <slot />
    </section>
    
</template>

<script setup lang='ts'>

</script>

<style scoped lang="scss">
 .container{
    height: 100%;
    padding-right:$layout-sider-width;
    color: hsl(211, 19%, 70%);
  }
</style>