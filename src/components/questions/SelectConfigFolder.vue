<template>
    <p>
        <Button @click="selectConfigFolder">选择配置文件夹</Button>
    </p>
</template>

<script setup lang="ts">
import { path, fs, dialog } from "@tauri-apps/api";
import { useConfigStore } from "@/store/config";
import { useInfoStore } from "@/store/info";


const configStore = useConfigStore();
const infoStore = useInfoStore();

const emit = defineEmits(["update"]);

const selectConfigFolder = async () => {
    const result = await dialog.open({
        directory: true,
        multiple: false,
    }) as string;
    console.log(result);


    // 如果存在config.json就读取
    if (result) {
        infoStore.path = result;
        const configPath = await path.join(result, "default.json");
        const configExist = await fs.exists(configPath);
        console.log(configPath, configExist);
        if (configExist) {
            const configContent = await fs.readTextFile(configPath);
            configStore.updateConfig(JSON.parse(configContent));

            console.log(configStore);
            emit("update", result);
        }
    }

};
</script>