<template>
    <Card>
        <template #content>
            <TabView>
                <TabPanel header="技术细节">
                    <ScrollPanel style="height: calc(-129px + 100vh);">
                        <h3>前端技术栈（BGsystem3-frontend）</h3>
                        作者：
                        <AuthorComp name="HowardZhangdqs" link="https://github.com/Howardzhangdqs" />
                        <ul>
                            <li><a target="_blank" href="https://vitejs.dev/">Vite</a>：构建工具</li>
                            <li><a target="_blank" href="https://vuejs.org/">Vue 3</a>：前端框架</li>
                            <li><a target="_blank" href="https://www.typescriptlang.org/">TypeScript</a>：静态类型检查</li>
                            <li><a target="_blank" href="https://pinia.vuejs.org/">Pinia</a>：状态管理</li>
                            <li><a target="_blank" href="https://router.vuejs.org/">Vue Router</a>：Vue.js 路由</li>
                            <li><a target="_blank" href="https://eslint.org/">ESLint</a>：代码风格检查</li>
                        </ul>
                        <Divider />

                        <h3>后端技术栈（BGsystem3-server）</h3>
                        作者：
                        <AuthorComp name="HowardZhangdqs" link="https://github.com/Howardzhangdqs" />
                        <ul>
                            <li><a target="_blank" href="https://fastapi.tiangolo.com/">FastAPI</a>：服务器框架</li>
                            <li><a target="_blank" href="https://www.pyinvoke.org/">Invoke</a>：命令行工具</li>
                        </ul>
                        <Divider />

                        <h3>壁纸映射工具技术栈</h3>
                        作者：
                        <AuthorComp name="SFKgroup" link="https://github.com/SFKgroup" />
                        <ul>
                            <li><a target="_blank" href="https://www.qt.io/product/qt6">QT6</a>：软件开发框架</li>
                        </ul>
                        <Divider />

                        <h3>配置工具技术栈（BGsystem3-configure）</h3>
                        作者：
                        <AuthorComp name="HowardZhangdqs" link="https://github.com/Howardzhangdqs" />
                        <ul>
                            <li><a target="_blank" href="https://tauri.app/">Tauri</a>：软件框架（Rust+WebView）</li>
                            <li><a target="_blank" href="https://vitejs.dev/">Vite</a>：构建工具</li>
                            <li><a target="_blank" href="https://vuejs.org/">Vue 3</a>：前端框架</li>
                            <li><a target="_blank" href="https://www.typescriptlang.org/">TypeScript</a>：静态类型检查</li>
                            <li><a target="_blank" href="https://router.vuejs.org/">Vue Router</a>：Vue.js 路由</li>
                            <li><a target="_blank" href="https://pinia.vuejs.org/">Pinia</a>：状态管理</li>
                            <li><a target="_blank" href="https://eslint.org/">ESLint</a>：代码风格检查</li>
                            <li><a target="_blank" href="https://primevue.org/">PrimeVue</a>：UI组件库</li>
                        </ul>
                    </ScrollPanel>
                </TabPanel>
                <TabPanel header="我的情况">
                    <ScrollPanel style="height: calc(-129px + 100vh);">
                        <p>我们个屁，就我一个人。</p>
                        <p>大家好，我是HowardZhangdqs，我是一坨屎。</p>
                        <p>我的生活像一坨屎，成绩像一坨屎，身体状况像一坨屎。</p>
                        <p>我除了是一坨屎以外还是一个重度抑郁重度焦虑患者，有严重的偏执型人格。</p>
                        <p>希望大家能喜欢这个项目，这样显得我这坨屎还有点价值 :P</p>
                        <p style="color: #0000; display: none;">
                            我的语文老师，包亮，在明知我的精神状态的情况下极尽它所能羞辱我，多次在我已经应激时持续输出，导致我多次差点轻生。
                            他在最紧张的冲刺阶段，班上公开宣读我写的对它乱传谣言不满的文章，让我在全年级面前被凌辱，持续数周无法正常学习。
                            我想要让它付出代价。
                        </p>
                    </ScrollPanel>
                </TabPanel>
            </TabView>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AuthorComp from "@/components/comp/AuthorComp.vue";

const visible = ref(true);

defineExpose({
    visible
});
</script>

<style scoped>
p {
    margin: 1em 0;
    text-indent: 2em;
}

a {
    color: var(--primary-color);
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
