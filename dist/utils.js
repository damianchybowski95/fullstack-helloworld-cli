import { exec } from "child_process";
import { readdir } from "fs/promises";
import { readFileSync } from "fs";
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
        exec("java --version", (error, stdout, stderr) => {
            if (error) {
                resolve(null);
            }
            else if (stderr) {
                resolve(null);
            }
            else {
                const versionLine = stdout.trim().split("\n")[0];
                resolve(versionLine ? versionLine : null);
            }
        });
    });
};
export const getProjectsInSubfolders = async (projectType) => {
    let projects = {};
    const entries = await readdir(process.cwd(), { withFileTypes: true });
    const folders = entries
        .filter(entry => entry.isDirectory())
        .map(directory => directory.name);
    for (const folder of folders) {
        const folderEntries = await readdir(`${process.cwd()}/${folder}`, { withFileTypes: true });
        const packageJsonFile = folderEntries.find(entry => entry.isFile() && entry.name === "package.json");
        if (packageJsonFile) {
            const packageJsonPath = `${process.cwd()}/${folder}/package.json`;
            const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
            if (packageJson.dependencies && packageJson.dependencies[projectType.packageJsonDependancy]) {
                projects[folder] = projectType;
            }
        }
    }
    return projects;
};
//# sourceMappingURL=utils.js.map