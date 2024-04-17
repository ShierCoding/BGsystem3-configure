import { window, invoke } from "@tauri-apps/api";
import { Ref, watch } from "vue";
import { Buffer } from "buffer";


/**
 * 延迟触发回调函数的监听器。
 * @param source - 要监听的源对象。
 * @param callback - 当源对象发生变化时要执行的回调函数。
 * @param delay - 延迟时间（以毫秒为单位）。默认值为 500 毫秒。
 */
export const delayWatch = (source: Ref, callback: () => void, delay = 500) => {
    let timer: NodeJS.Timeout | null = null;

    watch(source, () => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            callback();
        }, delay);
    });
};


/**
 * 创建一个 Tauri Webview 窗口。
 * @param link 链接地址
 * @param title 窗口标题
 * @param allowNew 是否允许创建新窗口，默认为 false
 * @returns 创建的 Webview 窗口实例
 */
export const open = async (link: string, title: string, allowNew: boolean = false) => {

    let id = title;

    if (allowNew) {
        id = await invoke("get_window_id");
    }

    const webview = new window.WebviewWindow(id, {
        url: link,
        title: title,
    });

    return webview;
};



/**
 * 将字符串转换为十六进制表示形式。
 * @param str 要转换的字符串。
 * @returns 转换后的十六进制字符串。
 */
export const Str2Hex = (str: string) => {
    return Buffer.from(str).toString("hex");
};


/**
 * 将十六进制字符串转换为字符串。
 * @param hex - 十六进制字符串
 * @returns 转换后的字符串
 */
export const Hex2Str = (hex: string) => {
    return Buffer.from(hex, "hex").toString();
};