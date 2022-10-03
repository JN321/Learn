<template>
  <div class="canvas">
    shape
    <div id="shapeCanvas" class="canvas-container"></div>
  </div>
</template>

<script>
export default {
  name: "CanvasModule",
  mounted() {
    const shapeCanvas = document.getElementById("shapeCanvas");
    // 开始渲染
  },
};
</script>
