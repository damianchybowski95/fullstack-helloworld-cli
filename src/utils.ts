export const getOperatingSystem = () : "windows" | "linux" | null => {
    return process.platform.includes("win")   ? "windows" :
           process.platform.includes("linux") ? "linux"   : null;
}

export const getNpmVersion = async () : Promise<string | null> => {
    const { exec } = await import("child_process");
    return new Promise((resolve, reject) => {
        exec("npm -v", (error, stdout, stderr) => {
            if (error) {
                reject(null);
            } else if (stderr) {
                reject(null);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

export const getJavaVersion = async () : Promise<string | null> => {
    const { exec } = await import("child_process");
    return new Promise((resolve) => {
        exec("java -version", (error, stdout, stderr) => {
            if (error) {                
                resolve(null);            
            } else if ( stderr) {
                resolve(null);
            } else {
                resolve(stdout.trim());
            }        
        });
    });    
}