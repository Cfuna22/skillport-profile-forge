
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SKILLPORT_BACKEND_CANISTER_ID: string;
  readonly VITE_INTERNET_IDENTITY_CANISTER_ID: string;
  readonly DFX_NETWORK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
