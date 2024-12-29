/// <reference types="vite/client" />
/// <reference types="@react-router/node" />

interface ImportMetaEnv {
  readonly VITE_VERCEL_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
