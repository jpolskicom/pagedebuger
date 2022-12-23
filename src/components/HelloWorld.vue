<template>
  <div class="main">
    <template v-if="pageProps && pageProps.url">
      <div class="main__col main__col--first">
        <qrCode :text="pageProps.url" label="Sprawdź na innym urządzeniu" />
        <pagePreview :pageProps="pageProps" :previewScreenshot="previewScreenshot" />
        <small>
          Czas ładowania: <b>{{ pageProps.pgloadtime }}s</b>
          <br />
          Rozmiar HTML: <b>{{ pageSize }}</b>
          <br />
          Technologie: <b>{{ [pageProps.frameworks].join(",") }}</b>
        </small>
      </div>
      <div class="main__col main__col--last">
        <seo :seo="{ ...pageProps.seo, url: pageProps.url }" />
      </div>
    </template>
    <template v-else>
      <span>{{ status }}</span>
    </template>
  </div>
</template>

<script>
import pagePreview from "./pagePreview.vue";
import qrCode from "./qrCode.vue";
import Seo from "./seo.vue";

export default {
  name: "HelloWorld",
  components: {
    pagePreview,
    qrCode,
    Seo,
  },
  data() {
    return {
      pageProps: {},
      previewScreenshot: "",
      status: "Ładowanie...",
    };
  },
  computed: {
    pageSize() {
      const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      let l = 0,
        n = parseInt(this.pageProps.pagekbytes, 10) || 0;

      while (n >= 1024 && ++l) {
        n = n / 1024;
      }

      return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
    },
  },
  methods: {
    getData() {
      browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
        browser.tabs
          .sendMessage(tabs[0].id, { action: "init" })
          .then(async (response) => {
            this.pageProps = await response;
          });
        browser.tabs
          .sendMessage(tabs[0].id, { action: "previewScreenshot" })
          .then(async (response) => {
            this.previewScreenshot = await response;
          });
      });
    },
  },
  mounted() {
    this.getData();
    var count = 0;
    if (this.pageProps && !this.pageProps.url) {
      var intervalId = setInterval(() => {
        if (this.pageProps && !this.pageProps.url) {
          this.getData();
          count = count + 1;
          this.status =
            count % 2 > 0
              ? "Ładowanie..."
              : "Problem podczas pobierania informacji o stronie";
        } else {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, 2000);
    }
  },
};
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #ffd90041;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #f9b000;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #f9b000;
}
.main {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  &__col {
    max-width: 100%;
    &--first {
      height: 100%;
      width: 25%;
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      justify-content: flex-end;
    }
    &--last {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      justify-content: flex-start;
      padding: 0 0.3rem;
    }
  }
}
</style>
