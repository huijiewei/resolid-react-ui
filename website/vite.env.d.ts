/// <reference types="vite/client" />
/// <reference types="@react-router/node" />

interface ImportMetaEnv {
  readonly VITE_VERCEL_URL?: string;
  readonly VITE_VERCEL_GIT_COMMIT_SHA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
