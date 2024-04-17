<template>
    <BlockComponent title="样式设置">
        <p class="item">
            主题颜色：
            <Dropdown v-model="theme" :options="themeOpt" optionLabel="name" placeholder="请选择一个主题"
                class="w-full md:w-14rem" />
        </p>
        <p class="item">主题前景色：<ColorPicker v-model="themeFront"></ColorPicker>
        </p>
        <p class="item">主题背景色：<ColorPicker v-model="themeBack"></ColorPicker>
        </p>
        <Divider />


        <p class="item">
            背景图片：
            <FileUpload mode="basic" name="demo[]" accept="image/*" customUpload @select="ImgUploader">
                <template #empty>
                    <p>Drag and drop files to here to upload.</p>
                </template>
            </FileUpload>
        </p>
        <p v-if="imgFilename">
            <ProgressBar v-if="!imgUrl" mode="indeterminate" style="height: 4px"></ProgressBar>
            <Image class="img-container" width="100%" :src="imgUrl" preview />
        </p>
        <Divider />

        <p class="item" v-tooltip="{ value: '可能会导致页面模糊\n但大概率看不出来', pt: { text: { style: { 'text-align': 'center' } } } }">
            页面缩放：
            <Slider v-model="zoom" style="flex-grow: 1; margin: 0 .6em 0 0.2em;" :min="-1" :max="1" :step="0.05" />
            {{ (computedZoom * 100).toFixed(0) }}%
        </p>
        <Divider />

        <p class="item">
            工具栏距底部距离：
            <Slider v-model="marginBottom" style="flex-grow: 1; margin: 0 .6em 0 0.2em;" :min="0" :max="300"
                :step="1" />
            {{ marginBottom }}像素
        </p>
        <Divider />

        <p class="item">
            启用背景视频：
            <InputSwitch v-model="configStore.style.backgroundVideo" />
        </p>
        <template v-if="configStore.style.backgroundVideo">
            <p>
                <Message severity="warn" :closable="false">
                    由于软件限制，上传的视频将会被服务器转码为WEBM格式
                </Message>
            </p>
            <p>
                <FileUpload mode="basic" name="demo[]" accept="video/*" customUpload @select="VideoUploader">
                    <template #empty>
                        <p>Drag and drop files to here to upload.</p>
                    </template>
                </FileUpload>
            </p>
            <p v-if="videoUrl">
                <video class="img-container" :src="videoUrl" controls loop></video>
            <div v-if="videoOriginalFileName">原文件名：{{ videoOriginalFileName }}</div>
            <div v-if="videoFileName">新文件名：{{ videoFileName }}</div>
            <div v-if="configStore.style.backgroundVideoSrc">存储位置：{{ configStore.style.backgroundVideoSrc }}</div>
            </p>
        </template>
    </BlockComponent>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import BlockComponent from "../comp/BlockComponent.vue";
import { FileUploadSelectEvent } from "primevue/fileupload";
import { useConfigStore } from "@/store/config";

import { path } from "@tauri-apps/api";
import { UploadFile, DownloadFile, File2Url } from "@/core/uploader";

import { delayWatch } from "@/core/utils";

const configStore = useConfigStore();


const theme = ref<{ name: string, code: "dark" | "light" }>({ name: "", code: "light" });
const themeOpt = ref([
    { name: "Light", code: "light" },
    { name: "Dark", code: "dark" },
]);

const themeFront = ref(configStore.style.color.light.font);
const themeBack = ref(configStore.style.color.light.font);

watch(theme, () => {
    console.log(theme.value.code);
    if (theme.value.code == "light") {
        themeFront.value = "#000000";
        themeBack.value = "#ffffff";
    } else if (theme.value.code == "dark") {
        themeFront.value = "#ffffff";
        themeBack.value = "#000000";
    }
});

const imgFilename = ref("");
const imgUrl = ref("");

// 上传图片
const ImgUploader = async (event: FileUploadSelectEvent) => {

    console.log(event);
    const file: File = (Array.isArray(event.files) ? event.files[0] : event.files) as File;

    const filePath = await UploadFile(file, await path.extname(file.name));

    imgFilename.value = await path.basename(filePath);

    LoadImg();
};

// 加载图片
const LoadImg = async () => {
    if (!imgFilename.value) return;

    imgUrl.value = File2Url(await DownloadFile(
        await path.basename(configStore.style.background)
    ));
};

const zoom = ref(0);
const computedZoom = computed(() => {
    return 10 ** zoom.value;
});

const marginBottom = ref(80);

const videoUrl = ref("");
const videoOriginalFileName = ref("");
const videoFileName = ref("");

// 上传视频
const VideoUploader = async (event: FileUploadSelectEvent) => {
    console.log(event.files);

    videoOriginalFileName.value = event.files[0].name;

    const video = await UploadFile(event.files[0], await path.extname(event.files[0].name));

    videoFileName.value = await path.basename(video);
    
    LoadVideo();
};

const LoadVideo = async () => {

    console.log("Loading video");

    videoUrl.value = File2Url(await DownloadFile(
        await path.basename(configStore.style.backgroundVideoSrc)
    ));
    console.log("Loading video");
};


// 主题颜色
watch(theme, () => {
    configStore.style.theme = theme.value.code;
});

// 主题前景色
watch(themeFront, () => {
    configStore.style.color.dark.font = themeFront.value;
    configStore.style.color.light.font = themeFront.value;
});

// 主题背景色
watch(themeBack, () => {
    configStore.style.color.dark.back = themeBack.value;
    configStore.style.color.light.back = themeBack.value;
});

// zoom
delayWatch(computedZoom, () => {
    configStore.style.zoom = (computedZoom.value * 100).toFixed(0) + "%";
});

// 视频文件名
watch(videoFileName, async () => {
    configStore.style.backgroundVideoSrc = await path.join("config", videoFileName.value);

    LoadVideo();
});

delayWatch(marginBottom, () => {
    configStore.style.footerBottom = marginBottom.value + "px";
    console.log(configStore.style.footerBottom);
});


let subscribing = true;
configStore.$subscribe(async () => {
    console.log(configStore);

    if (!subscribing) return;

    theme.value = themeOpt.value.find((item) => item.code == configStore.style.theme) as { name: string, code: "dark" | "light" };
    themeFront.value = configStore.style.color.dark.font;
    themeBack.value = configStore.style.color.dark.back;

    imgFilename.value = await path.basename(configStore.style.background);

    LoadImg();
    LoadVideo();

    marginBottom.value = (() => {
        // 创建dom，宽度设置为configStore.style.footerBottom
        const div = document.createElement("div");
        div.style.width = configStore.style.footerBottom;
        document.body.appendChild(div);
        const width = div.offsetWidth;
        document.body.removeChild(div);

        return width;
    })();

    subscribing = false;
});

</script>

<style scoped>
.item {
    display: flex;
    align-items: center;
}

.img-container {
    width: -webkit-fill-available;
}

hr {
    border: 1px solid #fff3;
    color: #fff3;
    overflow: visible;
    text-align: center;
    height: 0;
}
</style>@/core/uploader