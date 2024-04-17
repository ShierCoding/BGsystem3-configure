import Crypto from "crypto-js";

// 返回文件的哈希值
export default (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target) {
                const hash = Crypto.MD5(Crypto.enc.Latin1.parse(e.target.result as string)).toString();
                resolve(hash);
            } else {
                reject(e);
            }
        };
        reader.onerror = (e) => {
            reject(e);
        };
        reader.readAsBinaryString(file);
    });
};