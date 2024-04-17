// import { App } from "vue";
import markdownit from "markdown-it";
import mila from "markdown-it-link-attributes";


const md = markdownit().use(mila, {
    attrs: {
        target: "_blank",
        rel: "noopener noreferrer"
    }
});

export const vMarkdown = {
    mounted(el: HTMLElement) {
        const html = md.render(el.innerText.replace(/\[br\]/g, "\n"));
        
        console.log({ val: el.innerText});
        el.innerHTML = html;
        el.classList.add("v-markdown-rendered");
    }
};