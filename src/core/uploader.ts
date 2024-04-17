import { path, fs } from "@tauri-apps/api";
import { useInfoStore } from "@/store/info";
import calcFileHash from "./calcFileHash";


export const UploadFile = async (file: File, suffix: string): Promise<string> => {
    const infoStore = useInfoStore();
    
    const hash = await calcFileHash(file);
    const fileName = `${hash}.${suffix}`;
    const filePath = await path.join(infoStore.path, fileName);

    await fs.writeBinaryFile(
        filePath,
        new Uint8Array(await file.arrayBuffer())
    );
    
    return filePath;
};

export const DownloadFile = async (name: string): Promise<File> => {
    const infoStore = useInfoStore();

    const filePath = await path.join(infoStore.path, name);
    const file = await fs.readBinaryFile(filePath);

    return new File([file], name);
};

export const File2Url = (file: File): string => {
    return URL.createObjectURL(file);
};

