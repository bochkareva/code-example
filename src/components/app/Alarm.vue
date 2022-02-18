<template>
  <div class="app-alarm">
    <slot/>
    <img src="../../assets/images/alert-triangle.svg" alt="Alert">
  </div>
</template>

<script>
export default {
  name: 'app-alarm',
}
</script>

<style>
.app-alarm {
  position: relative;
  padding: 16px 48px 16px 16px;

  background: var(--alarmBackground);
  border-radius: 8px;

  font-size: 14px;
  line-height: 20px;
  color: var(--textColor);
  width: 520px;

  margin-top: 20px;
}

.app-alarm img {
    position: absolute;
    top: 16px;
    right: 16px;
}

@media screen and (max-width: 768px) {
  .app-alarm {
    width: calc(100% - 64px);
  }
}
</style>