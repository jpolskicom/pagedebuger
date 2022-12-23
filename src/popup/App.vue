<template>
  <hello-world />
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "App",
  components: { HelloWorld },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
.main {
  width: 720px;
  height: 480px;
  background: #000;
  background: linear-gradient(-15deg, rgb(109, 23, 106) 0%, rgba(0, 0, 0, 1) 50%);
  border-bottom: 3px solid #f9b000;
  font-size: 12px;
  color: #f9b000;
  padding: 14px;
  text-rendering: geometricPrecision;
}
</style>
