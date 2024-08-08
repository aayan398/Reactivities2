/// <reference types="vite/client" />

interface ImportMetaEmv{
    readonly VITE_API_URL: string
    readonly VITE_CHAT_URL: string
}

interface ImportMeta{
    readonly env: ImportMetaEmv
}