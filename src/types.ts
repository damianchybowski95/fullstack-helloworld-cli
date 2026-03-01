export type ProjectType = 
    { type : "documentation", framework?: "docosaurus" } |
    { type : "frontend",      framework?: "nextjs" | "react" } |
    { type : "backend",       framework?: "express" | "spring" } |
    { type : "mobile",        framework?: "react-native" };