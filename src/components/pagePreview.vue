<template>
  <div class="c-page" v-if="pageProps">
    <div class="c-page__container">
      <div
        class="c-page__box"
        :style="{ height: `calc(100% * ${calculateRatio[0] / calculateRatio[1]}%)` }"
      >
        <span class="c-page__label"
          >Wymiary okna: <br />RATIO:{{ calculateRatio[0] }}/{{ calculateRatio[1] }}</span
        >
        <span class="c-page__width">szer.{{ pageProps.width }}px</span>
        <span class="c-page__height">wys.{{ pageProps.height }}px</span>
      </div>
      <img
        :src="previewScreenshot"
        alt="page preview"
        v-if="previewScreenshot"
        class="c-page__image"
      />
    </div>
    <button class="c-page__button" v-on:click="copyImageToClipboard()">
      Skopiuj zrzut do schowka
    </button>
  </div>
</template>
<script>
import { copyImageToClipboard } from "copy-image-clipboard";

export default {
  props: ["pageProps", "previewScreenshot"],
  computed: {
    calculateRatio() {
      let num_1 = this.pageProps.width;
      let num_2 = this.pageProps.height;

      var ratio = [
        10 * Number(num_1 / num_2).toFixed(2),
        10 * Number(num_2 / num_1).toFixed(2),
      ];
      return ratio;
    },
  },
  methods: {
    copyImageToClipboard() {
      getBlobFromImageElement(this.previewScreenshot)
        .then((blob) => {
          return copyBlobToClipboard(blob);
        })
        .then(() => {
          console.log("Blob Copied");
        })
        .catch((e) => {
          console.log("Error: ", e.message);
        });
    },
  },
};
</script>
<style lang="scss">
.c-page {
  width: 100%;
  height: 100%;
  &__container {
    position: relative;
    width: 100%;
    font-size: 12px;
    height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
    color: #ddd;
  }
  &__box {
    height: 56px;
    border-left: 1px solid #f9b000;
    border-bottom: 1px solid #f9b000;
    z-index: 2;
    position: sticky;
    top: 0;
    background-color: #00000086;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
  }
  &__image {
    width: calc(100% - 1px);
    height: auto;
    z-index: 1;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
  }
  &__label {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    font-weight: bold;
  }
  &__width {
    position: absolute;
    bottom: 4px;
    left: 4px;
  }
  &__height {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: 6px;
  }
  &__button {
    border: 0;
    border: 1px solid #b47f03;
    background: transparent;
    color: #f9b000;
    font-size: 10px;
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    padding: 0.25rem;
    cursor: pointer;
    &:hover {
      border-color: #f9b000;
    }
  }
}
</style>
