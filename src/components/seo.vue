<template>
  <div class="c-seo" v-if="seo">
    <template v-if="!details">
      <div class="c-seo__score">
        Wynik SEO<br /><b>{{ getSEOScore }}%</b>
        <div class="c-seo__score__chart">
          <div class="c-seo__score__chart__line" :style="`width: ${getSEOScore}%`"></div>
        </div>
      </div>

      <div v-if="seo.title">
        <span class="c-seo__title">Title:</span>
        <span
          v-if="checkTitle.length > 0"
          class="c-seo__validation c-seo__validation--error"
        >
          ✖ {{ checkTitle.join(",") }}
        </span>
        <span v-else class="c-seo__validation c-seo__validation--valid">✔ Poprawny</span>
        <div class="c-seo__value c-seo__title-text">
          <span>
            <img
              :src="`https://s2.googleusercontent.com/s2/favicons?domain_url=${seo.url}`"
              alt="[]"
            />
          </span>
          <div>
            <b>
              {{ seo.title }}
            </b>
          </div>
        </div>
      </div>

      <div>
        <span class="c-seo__title">Description:</span>
        <span
          v-if="checkMetaDescription.length > 0"
          class="c-seo__validation c-seo__validation--error"
        >
          ✖ {{ checkMetaDescription.join(",") }}
        </span>
        <span v-else class="c-seo__validation c-seo__validation--valid">✔ Poprawny</span>
        <div class="c-seo__value">
          {{ getMetaDescription }}
        </div>
      </div>
    </template>
    <template v-else>
      <p>
        <span class="c-seo__title">Meta:</span>
        <input
          type="text"
          v-model="metaNeedle"
          class="c-seo__input"
          placeholder="Szukaj"
        />
      </p>
      <div class="c-seo__meta">
        <div v-for="item in getMetaFiltered" :key="item.name" class="c-seo__meta__row">
          <div class="c-seo__meta__col">
            {{ item.name }}
          </div>
          <div class="c-seo__meta__col">
            <small>{{ item.content }}</small>
          </div>
        </div>
      </div>
    </template>

    <div class="c-seo__toggle" v-on:click="details = !details">
      {{ details ? "❮ Podstawowe" : "Szczegóły ❯" }}
    </div>
  </div>
</template>
<script>
export default {
  props: ["seo"],
  data() {
    return { metaNeedle: "", seoScoreMax: 4, details: false };
  },
  computed: {
    getMetaFiltered() {
      return this.seo.meta.filter(
        (e) =>
          this.metaNeedle == "" ||
          `${e.name} ${e.content}`.toLowerCase().includes(this.metaNeedle.toLowerCase())
      );
    },
    getMetaDescription() {
      let description = this.seo.meta.find((e) =>
        `${e.name}`.toLowerCase().includes("description")
      );
      return description && description.content ? description.content : "";
    },
    checkMetaDescription() {
      let description = this.getMetaDescription;
      let errors = [];
      if (description.length < 150) {
        errors.push("Za krótki (" + description.length + " - min. 150 znaków)");
      } else if (description.length > 165) {
        errors.push("Za długi (" + description.length + " - max. 165 znaków)");
      }
      return errors;
    },
    checkTitle() {
      let title = this.seo.title;
      let errors = [];
      if (title.length < 40) {
        errors.push("Za krótki (" + title.length + " - min. 40 znaków)");
      } else if (title.length > 70) {
        errors.push("Za długi (" + title.length + " - max. 70 znaków)");
      }
      return errors;
    },
    getSEOScore() {
      let score = this.checkTitle.length + this.checkMetaDescription.length;
      return 100 - (score / this.seoScoreMax) * 100;
    },
  },
};
</script>
<style lang="scss">
.c-seo {
  height: 100%;
  width: 100%;
  position: relative;
  border-bottom: 1px solid #f9b000;
  max-height: 140px;
  overflow: hidden;
  p {
    margin: 0 0 0.25rem 0;
  }
  &__score {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.5rem;
    background: #f9b000;
    color: #000;
    text-align: center;
    padding-top: 0.15rem;
    border-radius: 4px;
    overflow: hidden;
    border: 2px solid #000;
    box-shadow: 3px 3px 0px 0px rgb(63, 63, 63);
    b {
      font-size: 1rem;
    }
    &__chart {
      width: 45px;
      background-color: #741870;
      height: 4px;
      margin-top: 0.15rem;
      &__line {
        background-color: #0bb521;
        height: 4px;
      }
    }
  }
  &__value {
    border-left: 1px solid #f9b000;
    padding-left: 0.25rem;
  }
  &__meta {
    max-height: 88px;
    overflow-y: auto;
    &__row {
      display: flex;
      justify-content: flex-start;
      border-bottom: 1px solid #2e2000;
    }
    &__col {
      padding: 0.25rem;
      width: 100%;
      max-width: 400px;
      word-break: break-all;
      &:first-of-type {
        width: 25%;
      }
    }
  }
  &__title {
    color: #b47f03;
    font-style: italic;
    margin-bottom: 0.25rem;
    display: inline-block;
  }
  &__title-text {
    padding-left: 0.15rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    max-width: 480px;
    margin-bottom: 0.5rem;
    img {
      margin: 0 0.25rem;
      line-height: 0;
    }
  }
  &__validation {
    font-size: 0.6rem;
    margin-left: 0.25rem;
    &--valid {
      color: #0bb521;
    }
    &--error {
      color: #b527b0;
    }
  }
  &__input {
    border: 0;
    border-bottom: 1px solid #b47f03;
    padding: 0.15rem;
    margin: 0 0 0 0.15rem;
    background: transparent;
    font-size: 10px;
    color: #b47f03;
    outline: 0;
    max-width: 128px;
    &:focus {
      border-color: #f9b000;
      color: #f9b000;
    }
  }
  &__toggle {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 0.7rem;
    padding: 0.5rem;
    cursor: pointer;
  }
}
</style>
