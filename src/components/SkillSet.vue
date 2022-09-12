<script setup>
  import { ref } from "vue";

  const skillSetDesc = ref(null);
  const skillSetDescText = ref(null);
  const selectedSkillSet = ref(0);
  const selectedSkill = ref({ id: null, desc: "" });
  const skillSetList = [
    {
      id: 0,
      name: "Development",
      content: [
        { id: 0, name: "Vue", icon: "devicon-vuejs-plain", img: null, desc: "Vue 2 & Vue 3" },
        { id: 1, name: "Javascript ES6", icon: "devicon-javascript-plain", img: null, desc: "Javascript ES6" },
        {
          id: 2,
          name: "HTML5",
          icon: "devicon-html5-plain",
          img: null,
          desc: "青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。滾滾長江東逝水，浪花淘盡英雄。是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，慣看秋月春風。一壺濁酒喜相逢，古今多少事，都付笑談中。",
        },
        { id: 3, name: "CSS3", icon: "devicon-css3-plain", img: null, desc: "CSS 3 / SCSS" },
        { id: 4, name: "Bootstrap", icon: "devicon-bootstrap-plain", img: null, desc: "Bootstrap 4 & Bootstrap 5" },
        { id: 5, name: "Ant Design", icon: null, img: "ant-design", desc: "Ant Design 4" },
        { id: 6, name: "Three.js", icon: "devicon-threejs-original", img: null, desc: "Three.js r144" },
        { id: 7, name: "Node.js", icon: "devicon-nodejs-plain", img: null, desc: "Node.js v18.7.0" },
        { id: 8, name: "AngularJS", icon: "devicon-angularjs-plain", img: null, desc: "AngularJS 1.5" },
        { id: 9, name: "Unity", icon: "devicon-unity-original", img: null, desc: "Unity with C#" },
      ],
    },
    {
      id: 1,
      name: "Design",
      content: [
        { id: 0, name: "Photoshop", icon: "devicon-photoshop-plain", img: null, desc: "Adobe Photoshop 2021" },
        {
          id: 1,
          name: "Illustrator",
          icon: "devicon-illustrator-plain",
          img: null,
          desc: "Adobe Illustrator 2021",
        },
        { id: 2, name: "Adobe XD", icon: "devicon-xd-plain", img: null, desc: "Adobe XD" },
        { id: 3, name: "Rhino 3D", icon: null, img: "rhino", desc: "Rhino 7" },
        { id: 5, name: "Blender", icon: "devicon-blender-original", img: null, desc: "Blender 3.2.1" },
        { id: 6, name: "Keyshot", icon: null, img: "keyshot", desc: "Keyshot 9" },
        { id: 7, name: "Figma", icon: "devicon-figma-plain", img: null, desc: "Figma" },
      ],
    },
    {
      id: 2,
      name: "Tools",
      content: [
        { id: 0, name: "Git", icon: "devicon-git-plain", img: null, desc: "Git" },
        { id: 1, name: "Github", icon: "devicon-github-plain", img: null, desc: "Github & Gitlab" },
        { id: 2, name: "Firebase", icon: "devicon-firebase-plain", img: null, desc: "Firebase" },
        { id: 3, name: "Docker", icon: "devicon-docker-plain", img: null, desc: "Docker" },
        { id: 4, name: "Webpack", icon: "devicon-webpack-plain", img: null, desc: "Webpack" },
        { id: 5, name: "DevTools", icon: "devicon-chrome-plain", img: null, desc: "Chrome DevTools" },
        { id: 6, name: "Postman", icon: null, img: "postman", desc: "Postman" },
      ],
    },
  ];

  function chooseSkillSet(id) {
    selectedSkillSet.value = id;
    selectedSkill.value = { id: null, desc: "" };
    skillSetDesc.value.classList.remove("w-100");
  }

  function chooseSkill(item) {
    skillSetDesc.value.classList.remove("w-100");
    skillSetDescText.value.classList.remove("slide-in");

    selectedSkill.value.id = item.id;
    selectedSkill.value.desc = "";

    setTimeout(() => {
      skillSetDesc.value.classList.add("w-100");
    }, 100);
    setTimeout(() => {
      selectedSkill.value.desc = item.desc;
      skillSetDescText.value.classList.add("slide-in");
    }, 500);
  }

  function getImageUrl(img) {
    return new URL(`../assets/images/${img}.svg`, import.meta.url).href;
  }
</script>

<template>
  <div class="skill-set">
    <div class="left">
      <div
        class="skill-set-tab"
        v-for="skillSet in skillSetList"
        :class="{ 'active-tab': skillSet.id == selectedSkillSet }"
        @click="chooseSkillSet(skillSet.id)"
      >
        {{ skillSet.name }}
      </div>
    </div>
    <div class="right">
      <div
        class="skill-set-list"
        v-for="skillSet in skillSetList"
        :class="[skillSet.id == selectedSkillSet ? 'visible' : 'hidden']"
      >
        <div
          class="skill-set-item-container"
          v-for="skillSetItem in skillSet.content"
          :style="[{ transitionDelay: skillSetItem.id * 0.1 + 's' }]"
        >
          <div
            class="skill-set-item"
            :class="{ selected: skillSetItem.id == selectedSkill.id }"
            @click="chooseSkill(skillSetItem)"
          >
            <div class="skill-set-item-inner">
              <i :class="skillSetItem.icon" v-if="skillSetItem.icon"></i>
              <img :src="getImageUrl(skillSetItem.img)" v-if="skillSetItem.img" />
              <div class="skill-set-item-title">{{ skillSetItem.name }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="skill-set-desc" ref="skillSetDesc">
        <div class="skill-set-desc-bar"></div>
        <div class="skill-set-desc-text" ref="skillSetDescText">{{ selectedSkill.desc }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";
  .skill-set {
    display: grid;
    grid-template-columns: 1fr 5fr;
    gap: 30px;

    .left {
      .skill-set-tab {
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        text-align: left;
        padding-left: 20px;
        cursor: pointer;
        border-left: 1px solid $lightestNavy;
        transition: 0.2s linear;
        &:hover {
          background-color: $lightNavy;
          border-left: 2px solid $velvet;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }

      .active-tab {
        color: $green;
        border-left: 3px solid $green;
      }
    }

    .right {
      position: relative;

      .skill-set-list {
        position: absolute;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 15px;

        .skill-set-item-container {
          background-color: $lightestNavy;
          aspect-ratio: 1/1;
          border-radius: 10px;

          .skill-set-item {
            height: 100%;
            padding: 20px;
            border-radius: 10px;
            cursor: pointer;

            &:hover {
              background: linear-gradient(to right, $darkGreen 49.9%, transparent 0);
              background-size: 200% 100%;
              background-position: right;
              animation: makeItfadeIn 0.5s ease-in-out forwards;
              @keyframes makeItfadeIn {
                100% {
                  background-position: left;
                }
              }
            }

            .skill-set-item-inner {
              padding-top: 10px;
              i {
                font-size: 50px;
              }

              img {
                height: 50px;
                line-height: 50px;
                margin-bottom: 5px;
              }

              .skill-set-item-title {
                margin-top: 10px;
              }
            }
          }

          .selected {
            background-color: $darkGreen;
          }
        }
      }
      .skill-set-desc {
        position: absolute;
        top: 335px;
        width: 0;

        .skill-set-desc-bar {
          background-color: $green;
          height: 2px;
          border-radius: 1.5px;
          margin-bottom: 15px;
        }

        .skill-set-desc-text {
          text-align: left;
          translate: 0 -10px;
          opacity: 0;
          transition: $mainTransition;
          width: 50%;
        }

        .slide-in {
          translate: 0;
          opacity: 1;
        }
      }

      .w-100 {
        width: 100%;
        transition: 0.5s ease-in-out;
      }
    }

    .visible {
      visibility: visible;
      opacity: 1;
      transition: all 0.3s linear;
    }

    .hidden {
      visibility: hidden;
      opacity: 0;
      transition: all 0.3s linear;
    }
  }
</style>
