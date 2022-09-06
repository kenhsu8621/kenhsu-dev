<script setup>
  import { watch, onMounted, ref } from "vue";
  import { GlobalOutlined } from "@ant-design/icons-vue";
  const showLangList = ref(false);
  const expandLangList = ref(false);
  const locale = ref("");

  function setActiveLang(lang) {
    expandLangList.value = false;
    showLangList.value = false;
    if (locale.value == lang) return;
    locale.value = lang;
    localStorage.setItem("locale", lang === 0 ? "tw" : "en");
    setTimeout(() => {
      history.go(0);
    }, 300);
  }

  function toggleLangList() {
    if (showLangList.value) {
      expandLangList.value = false;
      showLangList.value = false;
    } else {
      expandLangList.value = true;
      setTimeout(() => {
        showLangList.value = true;
      }, 300);
    }
  }

  watch(locale, (newlocale) => {
    localStorage.setItem("locale", newlocale);
  });

  onMounted(() => {
    locale.value = localStorage.getItem("locale") ?? "tw";
  });
</script>

<template>
  <div class="navbar">
    <a-row>
      <a-col :span="6" class="left">
        <a class="dev-logo">
          <img class="dev-logo-default" src="../assets/images/dev-gradient.svg" alt="dev-logo" width="50" />
          <img class="dev-logo-alt" src="../assets/images/dev-alt.svg" alt="dev-logo" width="50" />
          <span class="my-name">KEN HSU</span>
        </a>
      </a-col>
      <a-col :span="12" class="center">
        <a class="nav-link">{{ $t("header.home") }}</a>
        <a class="nav-link">{{ $t("header.catagories") }}</a>
        <a class="nav-link">{{ $t("header.about") }}</a>
        <a class="nav-link">{{ $t("header.links") }}</a>
      </a-col>
      <a-col :span="6" class="right">
        <div class="lang-select" :class="{ expand: expandLangList }">
          <GlobalOutlined class="lang-icon" @click="toggleLangList" />
          <div class="current-lang" v-if="!showLangList">
            <span class="tw" v-if="locale == 'tw'">中文</span>
            <span class="en" v-if="locale == 'en'">EN</span>
          </div>

          <div class="lang-list" v-if="showLangList">
            <button class="tw" :class="locale == 'tw' ? 'btn-active' : 'btn-inactive'" @click="setActiveLang('tw')">
              中文
            </button>
            <button class="en" :class="locale == 'en' ? 'btn-active' : 'btn-inactive'" @click="setActiveLang('en')">
              English
            </button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .navbar {
    position: fixed;
    z-index: 9;
    width: 100%;
    height: 70px;
    background-color: $bgThreeQuartersOpacity;
    background-color: #fff;
    filter: blur(0px);
    box-shadow: $mainBoxShadow;
    .ant-col {
      line-height: 70px;
    }

    .center {
      display: flex;
      justify-content: center;
      .nav-link {
        font-size: 20px;
        height: 100%;
        color: $mainBlack;
        padding: 0 15px;

        &:hover {
          color: $mainDarkgreen;
          animation: move 0.3s infinite linear alternate;

          @keyframes move {
            to {
              translate: 0 -2px;
            }
          }
        }
      }
    }

    .left {
      position: relative;
      .dev-logo {
        margin-left: 15px;
        .dev-logo-default {
          position: absolute;
          top: 10px;
          opacity: 1;
          transition: $mainTransition;

          &:hover {
            opacity: 0;
          }
        }
        .dev-logo-alt {
          position: absolute;
          top: 10px;
          left: 15px;
          opacity: 0;
          transition: $mainTransition;

          &:hover {
            opacity: 1;
          }
        }

        .my-name {
          color: $mainBlack;
          font-size: 20px;
          margin-left: 60px;
        }
      }
    }

    .right {
      .lang-select {
        width: 70px;
        height: 37px;
        line-height: 22px;
        position: absolute;
        padding: 6px;
        top: 16px;
        right: 15px;
        color: $mainDarkgrey;
        background-color: $bgThreeQuartersOpacity;
        border-radius: 19px;
        border: 1px solid #ddd;
        transition: $mainTransition;
        box-shadow: $antBtnBoxShadow;
        cursor: pointer;

        svg {
          margin-top: 2px;
          margin-right: 2px;
          font-size: 20px;
        }

        .lang-icon {
          font-size: 20px;
          position: absolute;
          top: 8px;
          right: 8px;
          border-radius: 50%;
          transition: $mainTransition;

          &:hover {
            background-color: $mainLightgreen;
          }
        }

        .current-lang {
          font-size: 14px;
          font-weight: bold;
          line-height: 24px;
          padding-left: 3px;
        }

        .en {
          margin-left: 6px;
        }

        .lang-list {
          width: 146px;

          .btn-active,
          .btn-inactive {
            width: 38%;
            height: 23px;
            padding: 0 6px;
            font-size: 12px;
            font-weight: bold;
            border-radius: 15px;
            cursor: pointer;
            box-shadow: $antBtnBoxShadow;

            &:hover {
              background-color: $mainLightgreen;
            }
          }

          .btn-active {
            background-color: $mainLightgreen;
            border: 1px solid #ddd;
          }

          .btn-inactive {
            color: $mainDarkgrey;
            background-color: transparent;
            border: 1px solid #ddd;
          }
        }
      }

      .expand {
        width: 160px;
        transition: $mainTransition;

        &:hover {
          background-color: $bgThreeQuartersOpacity;
        }
      }
    }
  }
</style>
