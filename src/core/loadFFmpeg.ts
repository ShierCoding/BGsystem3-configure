import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

// import ffmpeg_core_wasm from "/node_modules/@ffmpeg/core-mt/dist/esm/ffmpeg-core.wasm?url";
// import ffmpeg_core_js from "/node_modules/@ffmpeg/core-mt/dist/esm/ffmpeg-core.js?url";
// import ffmpeg_core_worker from "/node_modules/@ffmpeg/core-mt/dist/esm/ffmpeg-core.worker.js?url";

let ffmpeg_loaded: boolean = false, ffmpeg: FFmpeg;

export default async () => {

    if (ffmpeg_loaded) return ffmpeg;

    ffmpeg = new FFmpeg();

    ffmpeg.on("log", ({ message: msg }) => {
        console.log(msg);
    });

    ffmpeg.on("progress", (msg) => {
        console.log(msg);
    });

    console.log(ffmpeg);

    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";

    await ffmpeg.load(
        {
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
            workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript")
        }
    );

    // await ffmpeg.load({
    //     coreURL: ffmpeg_core_js,
    //     wasmURL: ffmpeg_core_wasm,
    //     workerURL: ffmpeg_core_worker,
    // });

    console.log(ffmpeg);

    ffmpeg_loaded = true;

    return ffmpeg;
};