import type { ProjectType } from "./types.js";
export declare const getOperatingSystem: () => "windows" | "linux" | null;
export declare const getNodeVersion: () => string;
export declare const getNpmVersion: () => Promise<string | null>;
export declare const getJavaVersion: () => Promise<string | null>;
export declare const getProjectsInSubfolders: (projectType: ProjectType) => Promise<{
    [key: string]: ProjectType;
}>;
//# sourceMappingURL=utils.d.ts.map