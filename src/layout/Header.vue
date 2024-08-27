<template>
    <div class="logo-container">
        <img src="@/assets/logo.svg" alt="" class="logo">
        <span class="title">Color Avatar</span>
        <button class="github-button">
            <img src="@/assets/icons/icon-github.svg" alt="">
            <span class="git">GitHub</span>
        </button>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang="scss">
.logo-container {
    width: 100%;
    padding: 1rem 2rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    height: 6rem;

    .logo {
        width: 40px;
        height: 40px;
    }

    .title {
        font-size: 1.9rem;
        font-weight: bold;
    }

    .github-button {
        margin-left: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        width: 9rem;
        height: 2.6rem;
        color: hsl(211, 19%, 70%);
        z-index: 1;
        font-weight: bold;
        font-size: 1.05rem;
        background-color: hsl(216, 14%, 14%);
        border-radius: 0.6rem;
        cursor: pointer;
      
      
    }



}
</style>