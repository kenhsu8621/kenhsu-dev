<script setup>
  import Header from "../components/Header.vue";
  import ModelViewer from "../components/ModelViewer.vue";
  import SkillSet from "../components/SkillSet.vue";
</script>

<template>
  <div class="layout">
    <Header></Header>
    <ModelViewer></ModelViewer>
    <div class="section-divider"></div>
    <!-- <section class="bottom-section">
      <div class="bottom-section-title">Bottom Section</div>
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
    </section> -->
    <section id="about"></section>
    <section class="section-container" id="skill-set">
      <h1 class="section-title">Skill Set <img src="../assets/images/dev-flat.svg" /></h1>
      <SkillSet></SkillSet>
    </section>
    <div class="section-divider"></div>

    <section id="work"></section>
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .layout {
    min-height: 100vh;
    background: $navy;
    .section-divider {
      height: 20px;
      background: linear-gradient(
        -90deg,
        rgb(24, 252, 176),
        rgb(127, 255, 212),
        rgb(20, 45, 80),
        rgb(10, 25, 46),
        rgb(20, 45, 80),
        rgb(127, 255, 212),
        rgb(24, 252, 176)
      );
      background-size: 500% 500%;
      animation: gradient 20s ease-in-out infinite alternate;

      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    }

    .bottom-section {
      min-height: 100vh;
      padding-top: 3vh;
      font-size: 18px;
      color: $green;
      text-align: center;
      width: 1000px;
      margin: auto;

      .bottom-section-title {
        font-size: 100px;
        color: $green;
        text-align: center;
      }
    }

    .section-container {
      text-align: center;
      width: 1000px;
      height: 80vh;
      margin: 20vh auto;
      color: #fff;
      font-size: 16px;

      .section-title {
        text-align: left;
        color: $green;
        font-size: 60px;
        margin-bottom: 1em;

        img {
          width: 25px;
          line-height: 50px;
          margin-left: 10px;
          rotate: 180deg;
        }
      }
    }
  }
</style>
