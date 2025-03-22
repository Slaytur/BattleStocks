// See https://svelte.dev/docs/kit/types#app.d.ts

import type { SessionDoc, UserDoc } from "$lib/server/schema";

// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: UserDoc | null
            session: SessionDoc | null
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
