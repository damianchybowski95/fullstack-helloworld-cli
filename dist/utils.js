import { exec } from "child_process";
export const getOperatingSystem = () => {
    return process.platform.includes("win") ? "windows" :
        process.platform.includes("linux") ? "linux" : null;
};
export const getNodeVersion = () => {
    return process.version;
};
export const getNpmVersion = async () => {
    return new Promise((resolve, reject) => {
        exec("npm -v", (error, stdout, stderr) => {
            if (error) {
                reject(null);
            }
            else if (stderr) {
                reject(null);
            }
            else {
                resolve(stdout.trim());
            }
        });
    });
};
export const getJavaVersion = async () => {
    return new Promise((resolve) => {
        exec("java -version", (error, stdout, stderr) => {
            if (error) {
                resolve(null);
            }
            else if (stderr) {
                resolve(null);
            }
            else {
                resolve(stdout.trim());
            }
        });
    });
};
export const getDocumentationProjects = async () => {
    return [];
};
export const getFronendProjects = async () => {
    return [];
};
export const getBackendProjects = async () => {
    return [];
};
export const getMobileProjects = async () => {
    return [];
};
//# sourceMappingURL=utils.js.map