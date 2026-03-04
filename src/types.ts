export type ProjectType = 
    { type: "documentation", framework: "docosaurus",        packageJsonDependancy: "@docusaurus/core" } |   
    { type: "frontend",      framework: "react",             packageJsonDependancy: "react" } |
    { type: "frontend",      framework: "next",              packageJsonDependancy: "next" } |
    { type: "backend",       framework: "express",           packageJsonDependancy: "express" } |
    // { type: "backend",       framework: "spring",         packageJsonDependancy: "spring" } |
    { type : "mobile",       framework: "react-native-expo", packageJsonDependancy: "react-native-expo" } |
    { type : "mobile",       framework: "ionic",             packageJsonDependancy: "ionic" }

export type Projects = {
    [ key : string ] : ProjectType
}