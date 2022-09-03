import { createApp } from "vue";
import i18n from "./plugins/i18n"
import App from "./App.vue";
import router from "./router";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "./assets/scss/main.scss";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCTy9PC5peiauK7WZwlfUJaP9QhVLidtBc",
    authDomain: "kenhsu-dev.firebaseapp.com",
    projectId: "kenhsu-dev",
    storageBucket: "kenhsu-dev.appspot.com",
    messagingSenderId: "1031857146471",
    appId: "1:1031857146471:web:85ad87d578b51680dd22c2",
    measurementId: "G-X26BKVSG8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createApp(App).use(i18n).use(Antd).use(router).mount("#app")
