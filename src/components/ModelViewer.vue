<script>
  import * as THREE from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
  import {
    CaretRightOutlined,
    PauseOutlined,
    TableOutlined,
    QuestionOutlined,
    RedoOutlined,
    DragOutlined,
    ZoomInOutlined,
    DownCircleOutlined,
    UpCircleOutlined,
    FullscreenOutlined,
  } from "@ant-design/icons-vue";
  import CustomSpin from "./CustomSpin.vue";
  import { defineComponent, nextTick } from "vue";

  let mixer, clips, gridHelper, clock;

  export default defineComponent({
    components: {
      CaretRightOutlined,
      PauseOutlined,
      TableOutlined,
      QuestionOutlined,
      RedoOutlined,
      DragOutlined,
      ZoomInOutlined,
      DownCircleOutlined,
      UpCircleOutlined,
      FullscreenOutlined,
      CustomSpin,
    },
    data() {
      return {
        gridSize: 500,
        divisions: 50,
        isStop: true,
        isHideGrid: true,
        isHideScrollDown: false,
        showHello: true,
        showHints: false,
        disableHints: false,
        isClicked: false,
        selectedColor: 0,
        isLoading: false,
        isRotating: false,
        isHome: false,
        currentModel: 0,
        colorList: [
          {
            id: 0,
            name: "bg-red",
            value: "#da6d9c",
            background:
              "linear-gradient(45deg,rgba(199, 103, 150, 1) 0%,rgba(245, 196, 170, 1) 40%,rgba(222, 144, 180, 1) 71%,rgba(204, 69, 187, 1) 100%)",
          },
          {
            id: 1,
            name: "bg-green",
            value: "#6ddaa5",
            background:
              "linear-gradient(135deg,rgba(47, 199, 151, 1) 0%,rgba(170, 245, 221, 1) 40%,rgba(144, 222, 198, 1) 71%,rgba(69, 187, 204, 1) 100%)",
          },
          {
            id: 2,
            name: "bg-blue",
            value: "#73c6f2",
            background:
              "linear-gradient(135deg, rgba(48,117,254,1) 0%, rgba(111,228,252,1) 60%, rgba(140,183,247,1) 85%, rgba(159,169,252,1) 100%)",
          },
          {
            id: 3,
            name: "bg-velvet",
            value: "#bdaff4",
            background:
              "linear-gradient(45deg, rgb(251, 230, 253) 0%, rgb(191, 176, 244) 60%, rgb(104, 153, 228) 100%)",
          },
          {
            id: 4,
            name: "bg-white",
            value: "#fff",
            background:
              "linear-gradient(135deg, rgba(204,206,213,1) 0%, rgba(240,240,240,1) 40%, rgba(233,236,252,1) 71%, rgba(196,196,196,1) 100%)",
          },
          {
            id: 5,
            name: "bg-black",
            value: "#333",
            // background:
            //   "linear-gradient(45deg, rgba(0,85,83,1) 0%, rgba(27,27,27,1) 30%, rgba(33,33,33,1) 71%, rgba(0,18,119,1) 100%)",
            background:
              "linear-gradient(45deg, rgba(36,36,36,1) 0%, rgba(51,51,51,1) 60%, rgba(85,85,85,1) 85%, rgba(111,111,111,1) 100%)",
          },
        ],
      };
    },
    mounted() {
      this.initializeModel(0, false); // ?????????3D??????
      this.dragElement(this.$refs.toolBox); // ?????????????????????????????????
      if (this.$route.name == "Home") {
        this.isHome = true;
      }

      window.addEventListener("scroll", () => {
        if (window.scrollY + 150 > window.innerHeight) {
          this.isHideScrollDown = true;
        } else this.isHideScrollDown = false;
      });
    },
    methods: {
      initializeModel(modelType, rotateModel) {
        this.isLoading = true;

        this.isRotating = rotateModel;
        nextTick(() => {
          this.clearPreviousModel();
          clock = new THREE.Clock();

          // ????????????
          const scene = new THREE.Scene();
          const renderer = new THREE.WebGLRenderer({ antialias: true });
          renderer.setSize(this.$refs.modelCanvas.clientWidth, this.$refs.modelCanvas.clientHeight);
          renderer.setClearColor(0x000000, 0); // set transparent bg

          // ?????????????????????
          // renderer.toneMapping = THREE.ReinhardToneMapping;
          // renderer.toneMappingExposure = 5;
          renderer.outputEncoding = THREE.sRGBEncoding;
          this.$refs.modelCanvas.appendChild(renderer.domElement);
          const pmremGenerator = new THREE.PMREMGenerator(renderer);
          scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 1).texture;

          // ????????????
          const colorCenterLine = 0xffffff;
          const colorGrid = 0xffffff;
          gridHelper = new THREE.GridHelper(this.gridSize, this.divisions, colorCenterLine, colorGrid);
          gridHelper.position.set(0, -5, 0);
          gridHelper.visible = false;
          scene.add(gridHelper);
          //TODO: ??????????????????castShadow

          // ??????gltf??????
          const loader = new GLTFLoader();
          let model;

          const modelSrc = [
            "./static/models/dev.glb",
            "./static/models/vue.glb",
            "./static/models/threejs.glb",
            "./static/models/razer.glb",
          ];
          this.currentModel = modelType ?? this.currentModel;
          loader.load(
            // resource URL
            modelSrc[this.currentModel],
            // called when the resource is loaded
            (gltf) => {
              model = gltf.scene;
              clips = gltf.animations || [];
              model.scale.setScalar(20);
              model.position.set(0, -5, -2);
              model.castShadow = true;
              scene.add(model);
              mixer = new THREE.AnimationMixer(model);
              // clips.forEach((clip) => {
              //   mixer.clipAction(clip).play();
              // });
              animate();
            },
            (xhr) => {
              // console.log(((xhr.loaded / xhr.total) * 100).toFixed(0));
              this.isLoading = false;
            },
            (error) => {
              console.error("An error happened", error);
            }
          );

          // ????????????
          const camera = new THREE.PerspectiveCamera(
            45, //fov
            // this.$refs.modelCanvas.clientWidth / this.$refs.modelCanvas.clientHeight,
            2.2, // ???????????????
            0.5, //near
            5000 //far
          );
          camera.position.x = 0;
          camera.position.y = 5;
          camera.position.z = 25;

          // ?????????????????????????????????
          const controls = new OrbitControls(camera, renderer.domElement);
          // controls.minZoom = 1;
          // controls.maxZoom = 1.5;
          controls.update();

          // ????????????
          // const dLight = new THREE.DirectionalLight(0x404040);
          // dLight.position.set(100, 100, 100);
          // dLight.position.set(0, 1, 0);
          // scene.add(dLight);

          const light = new THREE.PointLight(0xc4c4c4, 1);
          light.position.set(0, 300, 500);
          scene.add(light);
          const light2 = new THREE.PointLight(0xc4c4c4, 1);
          light2.position.set(500, 100, 0);
          scene.add(light2);
          const light3 = new THREE.PointLight(0xc4c4c4, 1);
          light3.position.set(0, 100, -500);
          scene.add(light3);
          const light4 = new THREE.PointLight(0xc4c4c4, 1);
          light4.position.set(-500, 300, 500);
          scene.add(light4);

          // ??????????????????
          function animate() {
            if (rotateModel) model.rotation.y += 0.02;
            // setTimeout(() => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            if (mixer) mixer.update(delta);
            controls.update();
            renderer.render(scene, camera);
            // }, 10);
          }
        });
      },

      toggleAnimation() {
        if (this.isStop) {
          clips.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
        } else {
          clips.forEach((clip) => {
            mixer.clipAction(clip).stop();
          });
        }
        this.isStop = !this.isStop;
      },

      toggleGrid() {
        if (this.isHideGrid) {
          gridHelper.visible = true;
        } else {
          gridHelper.visible = false;
        }
        this.isHideGrid = !this.isHideGrid;
      },

      changeViewerBackground(background) {
        this.$refs.modelViewer.style.opacity = 0.7;
        this.isLoading = true;
        setTimeout(() => {
          this.$refs.modelViewer.style.opacity = 1;
          this.$refs.modelViewer.style.background = background;
          this.isLoading = false;
        }, 1000);
      },

      clearPreviousModel() {
        this.$refs.modelCanvas.innerHTML = "";
        this.isStop = true;
        this.isHideGrid = true;
        clock = null;
        mixer = 0;
        clips = null;
        gridHelper = null;
      },
      // ?????????????????????model canvas?????????????????????????????????
      setClicked() {
        if (!this.disableHints) this.showHints = true;
        this.isClicked = true;
        this.$refs.toolBox.classList.add("fade-in");
        this.$refs.techniqueList.classList.add("fade-in-right");
        this.$refs.hello.classList.add("fade-out");
        setTimeout(() => {
          this.$refs.hello.style.display = "none";
        }, 2000);
      },

      setGrabbing(isGrabbing) {
        if (isGrabbing) {
          this.$refs.toolBox.classList.add("grabbing");
        } else this.$refs.toolBox.classList.remove("grabbing");
      },

      dragElement(elmnt) {
        let pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;
        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        }

        function closeDragElement() {
          /* stop moving when mouse button is released:*/
          document.onmouseup = null;
          document.onmousemove = null;
        }
      },

      scrollToAnchor(location) {
        window.scrollTo({ top: location == "top" ? 0 : window.innerHeight - 90, behavior: "smooth" });
      },
    },
  });
</script>

<template>
  <div class="model-viewer" ref="modelViewer" @mousedown="setClicked" @mouseup="showHints = false">
    <!-- <div class="transition-mask" refs="transitionMask" v-show="isLoading"></div> -->
    <CustomSpin v-show="isLoading" :size="40"></CustomSpin>
    <div class="model-canvas" ref="modelCanvas"></div>
    <div class="hello" ref="hello" v-show="showHello && isHome">
      {{ $t("model_viewer.hello") }}
    </div>

    <div class="tool-box" ref="toolBox" @mousedown="setGrabbing(true)" @mouseup="setGrabbing(false)">
      <div class="draggable-indicator"></div>
      <div class="color-picker">
        <div class="tool-title">{{ $t("model_viewer.color_picker") }}</div>
        <a-space class="color-picker-container">
          <div class="color-picker-grid" v-for="color in colorList">
            <button
              class="color-picker-btn"
              :style="{ background: color.value }"
              @click="changeViewerBackground(color.background)"
            >
              &nbsp;
            </button>
          </div>
        </a-space>
      </div>

      <div class="model-select">
        <div class="tool-title">{{ $t("model_viewer.model_select") }}</div>

        <a-space class="model-select-container">
          <a-button shape="round" @click="initializeModel(0, false)" :class="{ 'active-model': currentModel == 0 }"
            ><img src="../assets/images/dev-black.svg"
          /></a-button>
          <a-button shape="round" @click="initializeModel(1, false)" :class="{ 'active-model': currentModel == 1 }"
            ><i class="devicon-vuejs-plain"></i
          ></a-button>
          <a-button shape="round" @click="initializeModel(2, false)" :class="{ 'active-model': currentModel == 2 }"
            ><i class="devicon-threejs-original"></i
          ></a-button>
          <a-button shape="round" @click="initializeModel(3, false)" :class="{ 'active-model': currentModel == 3 }"
            ><img src="../assets/images/razer.svg"
          /></a-button>
        </a-space>
      </div>

      <div class="model-tools">
        <div class="tool-title">{{ $t("model_viewer.model_tools") }}</div>
        <a-space class="model-tools-container">
          <a-button shape="round" @click="toggleAnimation">
            <span v-if="isStop"><CaretRightOutlined :style="{ fontSize: '20px', paddingLeft: '5px' }" /></span>
            <span v-if="!isStop"><PauseOutlined :style="{ fontSize: '20px' }" /></span>
          </a-button>
          <a-button :class="{ 'active-model': !isHideGrid }" shape="round" @click="toggleGrid">
            <span><TableOutlined :style="{ fontSize: '20px' }" /></span
          ></a-button>
          <a-button :class="{ 'active-model': !disableHints }" shape="round" @click="disableHints = !disableHints">
            <span><QuestionOutlined :style="{ fontSize: '20px' }" /></span
          ></a-button>
          <a-button
            :class="{ 'active-model': isRotating }"
            shape="round"
            @click="initializeModel(null, isRotating ? false : true)"
          >
            <span><RedoOutlined :style="{ fontSize: '20px' }" /></span
          ></a-button>
          <router-link :to="{ name: 'ModelViewer' }" target="_blank">
            <a-button shape="round">
              <span><FullscreenOutlined :style="{ fontSize: '20px' }" /></span
            ></a-button>
          </router-link>
        </a-space>
      </div>
    </div>

    <div class="hint-box" v-if="showHints">
      <div class="hint-title">{{ $t("model_viewer.hints") }}</div>
      <div class="hint-item">
        <RedoOutlined /><span>{{ $t("model_viewer.rotate") }}</span>
      </div>
      <div class="hint-item">
        <DragOutlined /><span>{{ $t("model_viewer.move") }}</span>
      </div>
      <div class="hint-item">
        <ZoomInOutlined /><span>{{ $t("model_viewer.zoom") }}</span>
      </div>
    </div>

    <div class="technique-list" ref="techniqueList">
      <label>built with</label>
      <a href="https://threejs.org/" target="_blank">
        <a-tooltip title="three.js" color="rgba(255, 255, 255, 0.2)">
          <i class="devicon-threejs-original"></i> </a-tooltip
      ></a>
      <span class="divider">+</span>
      <a href="https://www.rhino3d.com/" target="_blank">
        <a-tooltip title="rhino3d" color="rgba(255, 255, 255, 0.2)">
          <img class="custom-icon" src="../assets/images/rhino.svg" alt="kh-logo" /> </a-tooltip
      ></a>
      <span class="divider">+</span>
      <a href="https://www.blender.org/" target="_blank">
        <a-tooltip title="blender" color="rgba(255, 255, 255, 0.2)">
          <i class="devicon-blender-original"></i> </a-tooltip
      ></a>
    </div>

    <DownCircleOutlined
      class="scroll-btn scroll-down"
      :class="{ 'fade-in': !isHideScrollDown }"
      v-if="isClicked && isHome"
      @click="scrollToAnchor('bottom')"
    />
    <UpCircleOutlined
      class="scroll-btn scroll-to-top"
      :class="{ 'fade-in': isHideScrollDown }"
      v-if="isHome"
      @click="scrollToAnchor('top')"
    />
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .model-viewer {
    position: relative;
    transition: 1s all;
    height: 100vh;
    width: 100vw;
    background: linear-gradient(
      135deg,
      rgba(204, 206, 213, 1) 0%,
      rgba(240, 240, 240, 1) 40%,
      rgba(233, 236, 252, 1) 71%,
      rgba(196, 196, 196, 1) 100%
    );
    box-shadow: $mainBoxShadow;

    .model-canvas {
      aspect-ratio: 2/1;
      margin: 0 auto;
      overflow: hidden;

      @media (max-width: 1440px) {
        aspect-ratio: 16/9;
      }
      @media (max-width: 1024px) {
        aspect-ratio: 5/3;
      }
    }

    .hello {
      position: absolute;
      width: 600px;
      top: 10vh;
      left: 0;
      right: 0;
      margin: 0 auto;
      text-align: center;
      font-size: 8vw;
      background: linear-gradient(90deg, #71efb6, #7aa4e0);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      cursor: default;

      @media (min-width: 1920px) {
        font-size: 6vw;
      }
    }

    .tool-box {
      position: absolute;
      width: 150px;
      border-radius: 12px;
      padding: 10px;
      background: $bgThreeQuartersOpacity;
      top: 90px;
      left: 30px;
      opacity: 0;
      box-shadow: $mainBoxShadow;
      cursor: grab;

      .tool-title {
        font-size: 16px;
        text-align: center;
        margin-bottom: 5px;
        color: #666;
        cursor: default;
      }

      .draggable-indicator {
        width: 50px;
        height: 4px;
        margin: auto;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 2px;
      }

      .color-picker {
        padding: 10px 0;

        .color-picker-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          .color-picker-grid {
            text-align: center;
            .color-picker-btn {
              cursor: pointer;
              width: 25px;
              height: 25px;
              border-radius: 50%;
              border: 2px solid #ddd;
              box-shadow: $antBtnBoxShadow;
            }
          }
        }
      }

      .model-select,
      .model-tools {
        padding: 10px 0;
        border-top: 1px solid #ddd;

        .model-select-container,
        .model-tools-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .ant-btn {
          width: 60px;

          i {
            font-size: 25px;
            font-weight: bold;
            color: $darkGrey;
          }

          img {
            width: 25px;
            margin-top: -3px;
            margin-left: -3px;
          }
        }
        .active-model {
          background: $lightGreen;
        }
      }
    }

    .grabbing {
      cursor: grabbing !important;
    }
    .hint-box {
      position: absolute;
      width: 220px;
      border-radius: 12px;
      padding: 10px;
      background: $bgThreeQuartersOpacity;
      bottom: 4vh;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      box-shadow: $mainBoxShadow;

      .hint-title {
        font-size: 16px;
        text-align: center;
        margin-bottom: 5px;
        color: #666;
        cursor: default;
      }

      .hint-item {
        span {
          margin-left: 10px;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .anticon {
          font-size: 16px;
          color: $darkGreen;
        }

        .anticon-redo {
          animation: rotateIcon 1s infinite linear;

          @keyframes rotateIcon {
            from {
              rotate: 0;
            }
            to {
              rotate: 360deg;
            }
          }
        }

        .anticon-drag {
          margin-left: 9px;
          animation: move 1s infinite linear alternate;

          @keyframes move {
            to {
              translate: 3px;
            }
          }
        }

        .anticon-zoom-in {
          animation: zoom 1s infinite linear alternate;

          @keyframes zoom {
            to {
              scale: 1.3;
            }
          }
        }
      }
    }

    .technique-list {
      position: absolute;
      bottom: 2vh;
      right: 0;
      opacity: 0;

      label {
        color: #fff;
      }
      .divider {
        font-size: 20px;
        color: #fff;
        margin: 0 3px;
      }
      i {
        font-size: 30px;
        font-weight: bold;
        color: #fff;
      }
      .custom-icon {
        width: 40px;
        margin-top: -15px;
      }
    }

    // .transition-mask {
    //   position: absolute;
    //   top: 0;
    //   bottom: 0;
    //   left: 0;
    //   right: 0;
    //   background: rgba(255, 255, 255, 0.5);
    //   transition: all ease-in-out 1s;
    // }

    .scroll-btn {
      bottom: 15px;
      left: 20px;
      font-size: 25px;
      transition: $mainTransition;
      animation: pulse 1s infinite ease-in-out alternate;
      opacity: 0;
    }

    @keyframes pulse {
      to {
        bottom: 10px;
      }
    }

    .scroll-down {
      position: absolute;
      color: $darkGrey;
      left: 35px;
      z-index: 999;
      &:hover {
        color: $darkGreen;
      }
    }

    .scroll-to-top {
      position: fixed;
      color: $darkGreen;
      &:hover {
        color: $green;
      }
    }

    .fade-in {
      opacity: 1;
      transition: opacity ease-in-out 0.5s;
    }

    .fade-in-right {
      translate: -3vw;
      opacity: 1;
      transition: all ease-in-out 1.5s;
    }

    .fade-out {
      opacity: 0;
      transition: ease-in-out 2s;
    }

  }
</style>
