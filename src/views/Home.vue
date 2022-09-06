<script setup>
  import Header from "../components/Header.vue";
  import ModelViewer from "../components/ModelViewer.vue";

  const devList = [
    { name: "Vue", icon: "devicon-vuejs-plain", imgUrl: null, desc: "Vue 2 & Vue 3" },
    { name: "AngularJS", icon: "devicon-angularjs-plain", imgUrl: null, desc: "AngularJS 1.5" },
    { name: "Bootstrap", icon: "devicon-bootstrap-plain", imgUrl: null, desc: "Bootstrap 4 & Bootstrap 5" },
    { name: "Ant Design", icon: "", imgUrl: null, desc: "Ant Design 4" },
    { name: "CSS3", icon: "devicon-css3-plain", imgUrl: null, desc: "CSS 3" },
    { name: "SASS", icon: "devicon-sass-original", imgUrl: null, desc: "SASS (SCSS)" },
    { name: "HTML5", icon: "devicon-html5-plain", imgUrl: null, desc: "HTML 5" },
    { name: "Javascript (ES6)", icon: "devicon-javascript-plain", imgUrl: null, desc: "Javascript ES6" },
    { name: "Node.js", icon: "devicon-nodejs-plain", imgUrl: null, desc: "Node.js v18.7.0" },
    { name: "Three.js", icon: "devicon-threejs-original", imgUrl: null, desc: "Three.js r144" },
  ];
  const designList = [
    { name: "Adobe Photoshop", icon: "devicon-photoshop-plain", imgUrl: null, desc: "Adobe Photoshop 2021" },
    { name: "Adobe Illustrator", icon: "devicon-illustrator-plain", imgUrl: null, desc: "Adobe Illustrator 2021" },
    { name: "Adobe XD", icon: "devicon-xd-plain", imgUrl: null, desc: "Adobe Illustrator 2021" },
    { name: "Rhino3D", icon: "", imgUrl: null, desc: "Rhino 7" },
    { name: "Unity", icon: "devicon-unity-original", imgUrl: null, desc: "Unity with C#" },
    { name: "Blender", icon: "devicon-blender-original", imgUrl: null, desc: "Blender 3.2.1" },
    { name: "Keyshot", icon: "", imgUrl: null, desc: "Keyshot 9" },
    { name: "Figma", icon: "devicon-figma-plain", imgUrl: null, desc: "Figma" },
  ];
  const toolList = [
    { name: "Git", icon: "devicon-git-plain", imgUrl: null, desc: "Git & Github & Gitlab" },
    { name: "Firebase", icon: "devicon-firebase-plain", imgUrl: null, desc: "Firebase" },
    { name: "Heroku", icon: "devicon-heroku-original", imgUrl: null, desc: "Heroku" },
    { name: "Chrome DevTools", icon: "devicon-chrome-plain", imgUrl: null, desc: "Chrome DevTools" },
    { name: "Postman", icon: "", imgUrl: null, desc: "Postman" },
  ];
</script>

<template>
  <div class="layout">
    <Header></Header>
    <ModelViewer></ModelViewer>
    <div class="section-divider"></div>

    <section class="bottom-section">
      <div class="bottom-section-title">Bottom Section</div>
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
      滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。
      青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。
    </section>
    <section id="about"></section>
    <section class="skills-section" id="skills">
      <div class="dev-list">
        <div class="item" v-for="devItem in devList">
          <!-- <i class="devicon-threejs-original"></i> -->
          <i :class="devItem.icon"></i> | {{ devItem.name }} | {{ devItem.desc }}
        </div>
      </div>
      --------------
      <div class="design-list">
        <div class="item" v-for="designItem in designList">
          <!-- <i class="devicon-threejs-original"></i> -->
          <i :class="designItem.icon"></i> | {{ designItem.name }} | {{ designItem.desc }}
        </div>
      </div>
      --------------
      <div class="tool-list">
        <div class="item" v-for="toolItem in toolList">
          <!-- <i class="devicon-threejs-original"></i> -->
          <i :class="toolItem.icon"></i> | {{ toolItem.name }} | {{ toolItem.desc }}
        </div>
      </div>
    </section>
    <section id="work"></section>
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .layout {
    min-height: 100vh;
    background: $mainDarkblue;
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
      color: $mainGreen;
      text-align: center;
      width: 800px;
      margin: auto;

      .bottom-section-title {
        font-size: 100px;
        color: $mainGreen;
        text-align: center;
      }
    }

    .skills-section {
      text-align: center;
      width: 800px;
      margin: auto;
      color: #fff;
      font-size: 16px;
    }
  }
</style>
