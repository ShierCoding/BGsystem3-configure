<template>
    <BlockComponent title="课程表">
        <span v-markdown>
            权重为被选中概率，权重越大被选中概率越大，权重为0则不会被选中。
        </span>
        <p>
            <DataTable :value="TableValue" paginator :rows="5" :rowsPerPageOptions="[7, 20]">
                <Column field="id" header="学号" sortable></Column>
                <Column field="name" header="姓名" sortable></Column>
                <Column field="val" header="权重" sortable>
                    <template #body="slotProps">
                        {{ typeof slotProps.data.val == "number" ? slotProps.data.val : "默认值 10" }}
                    </template>
                </Column>
            </DataTable>
            <Accordion>
                <AccordionTab header="编辑代码">
                    <div v-markdown>
                        代码格式为[`JSON`](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/JSON)。`ID`为学号，`name`为姓名，`val`为权重，权重为可选值，默认为10。
                    </div>
                    <InlineMessage severity="error" v-if="codeError">
                        <div class="code" style="color: #f33">{{ codeError }}</div>
                    </InlineMessage>
                    <div style="margin: 1em;" v-if="codeError"></div>
                    <VMonaco v-model:modelValue="dataCode" height="30em" language="json" @change="ChangeCode"></VMonaco>
                </AccordionTab>
            </Accordion>
        </p>
        <p class="item">
            公平模式（所有人权重相同）：
            <InputSwitch v-model="configStore.fn.random.fairMode" />
        </p>
        <p class="item">
            随机选人过程及结果中显示ID：
            <InputSwitch v-model="configStore.fn.random.showId" />
        </p>
        <p class="item">
            随机选人过程及结果中显示姓名：
            <InputSwitch v-model="configStore.fn.random.showName" />
        </p>
        <p class="item">
            随机选人摇人显示时长：
            <Slider v-model="configStore.fn.random.shuffleDuration" style="flex-grow: 1; margin: 0 .6em 0 0.2em;"
                :min="0" :max="2000" :step="100" />
            {{ configStore.fn.random.shuffleDuration }}ms
        </p>
        <p class="item">
            随机选人结果显示时长：
            <Slider v-model="configStore.fn.random.displayDuration" style="flex-grow: 1; margin: 0 .6em 0 0.2em;"
                :min="1000" :max="5000" :step="100" />
            {{ configStore.fn.random.displayDuration }}ms
        </p>
    </BlockComponent>
</template>
<script setup lang="ts">
import { useConfigStore } from "@/store/config";
import BlockComponent from "../comp/BlockComponent.vue";
import VMonaco from "../monaco/VMonaco.vue";
import { computed, onMounted, ref, watch } from "vue";

import { vMarkdown } from "@/vMarkdown";
import { useSignalStore } from "@/store/signal";

import _ from "lodash";

const configStore = useConfigStore();
const signalStore = useSignalStore();

const dataCode = computed(() => {
    return JSON.stringify(TableValue.value, null, 4);
});

const codeError = ref("");


const TableValue = ref<any[]>([]);

const dataFormater = (data: { [key: number]: string }[]): { [key: string]: string }[] => {
    data = _.cloneDeep(data);
    console.log(data);
    return data.map((x) => {
        console.log(x);

        const res = {} as { [key: string]: string };

        // 将键改为string
        for (const key in x) {
            res["key" + key] = x[key];
            console.log(key);
        }

        return res;
    });
};

watch([() => signalStore.reloadSignal, () => configStore.fn.schedule.data], () => {
    TableValue.value = dataFormater(configStore.fn.schedule.data);
    console.log(configStore.fn.schedule.data, TableValue.value);
});

// setInterval(() => {
//     TableValue.value = dataFormater(configStore.fn.schedule.data);
// }, 1000);



const ChangeCode = (code: string) => {
    try {
        configStore.fn.schedule.data = JSON.parse(code);
        codeError.value = "";
    } catch (e: any) {
        console.error(e);
        codeError.value = e.message as string;
    }
};
</script>

<style scoped>
.item {
    display: flex;
    align-items: center;
}
</style>