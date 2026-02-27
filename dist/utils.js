export const detectOperatingSystem = () => {
    return process.platform.includes("win") ? "windows" :
        process.platform.includes("linux") ? "linux" : "unknown";
};
export const detectNpmVersion = async () => {
    const { exec } = await import("child_process");
    return new Promise((resolve, reject) => {
        exec("npm -v", (error, stdout, stderr) => {
            if (error) {
                reject(`Error executing npm -v: ${error.message}`);
            }
            else if (stderr) {
                reject(`Error executing npm -v: ${stderr}`);
            }
            else {
                resolve(stdout.trim());
            }
        });
    });
};
//# sourceMappingURL=utils.js.map