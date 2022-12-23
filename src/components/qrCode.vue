<template>
  <div v-if="text" class="" class="c-qrcode">
    <span>
      <img :src="image" :alt="text" />
    </span>
    <span class="c-qrcode__label"> {{ label }}</span>
  </div>
</template>
<script>
import QRCode from "qrcode";
export default {
  props: ["text", "label"],
  data() {
    return {
      image: null,
    };
  },
  mounted() {
    QRCode.toDataURL(
      `${this.text}`,
      {
        type: "image/jpeg",
        quality: 0.3,
        width: 140,
        margin: 0,
        color: {
          dark: "#f9b000",
          light: "#00000000",
        },
      },
      (err, url) => {
        this.image = url;
      }
    );
  },
};
</script>
<style lang="scss">
.c-qrcode {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  &__label {
    font-size: 0.55rem;
    margin-bottom: 0.15rem;
    color: #b47f03;
  }
}
</style>
