<template>
  <main class="main">
    <Container>
      <div class="content-warpper">
        <Header />
        <div class="playground">
          <VueColorAvatar></VueColorAvatar>
        </div>
        <div class="gradient-bg">
          <div class="gradient-top"></div>
          <div class="gradient-bottom"></div>
        </div>
      </div>
    </Container>
    <sider />
  </main>
</template>

<script setup lang="ts">
import Container from './layout/container.vue';
import Sider from './layout/Sider.vue';
import Header from './layout/Header.vue';
import VueColorAvatar from './components/VueColorAvatar.vue';


</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100vh;
  background-color: #14161a;

  .content-warpper {
    width: 100%;
    height: 100%;
    transform: scale(1);
  }
}

.playground {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 140px;
  flex-direction: column;
}

.gradient-bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

  @mixin gradient-style($color) {
    position: absolute;
    width: 100vh;
    height: 100vh;
    background-image: radial-gradient(rgba($color, 0.8) 20%,
        rgba($color, 0.6) 40%,
        rgba($color, 0.4) 60%,
        rgba($color, 0.2) 80%,
        transparent 100%);
    border-radius: 50%;
    opacity: 0.2;
    filter: blur(4rem);
  }

  .gradient-top {
    @include gradient-style($color-secondary);

    top: -50%;
    right: -20%;
  }

  .gradient-bottom {
    @include gradient-style($color-accent);

    bottom: -50%;
    left: -20%;
  }
}
</style>
