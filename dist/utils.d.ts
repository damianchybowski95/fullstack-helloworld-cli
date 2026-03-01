import type { ProjectType } from "./types.js";
export declare const getOperatingSystem: () => "windows" | "linux" | null;
export declare const getNodeVersion: () => string;
export declare const getNpmVersion: () => Promise<string | null>;
export declare const getJavaVersion: () => Promise<string | null>;
export declare const getDocumentationProjects: () => Promise<[{
    name: string;
    type: ProjectType;
}] | []>;
export declare const getFronendProjects: () => Promise<[{
    name: string;
    type: ProjectType;
}] | []>;
export declare const getBackendProjects: () => Promise<[{
    name: string;
    type: ProjectType;
}] | []>;
export declare const getMobileProjects: () => Promise<[{
    name: string;
    type: ProjectType;
}] | []>;
//# sourceMappingURL=utils.d.ts.map