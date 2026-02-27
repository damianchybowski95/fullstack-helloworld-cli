import { get } from "node:http";
import { getOperatingSystem } from "./utils.js";

/**
 * Detect the operating system, and print it to the console
 * It may be useful, to change commands for managing sdks
 * @returns  "windows" | "linux" | null
 */
export const detectOperatingSystem = () : "windows" | "linux" | null => {
    console.log(`current platform: ${process.platform}`);
    return getOperatingSystem();
}