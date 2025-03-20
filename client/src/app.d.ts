// See https://svelte.dev/docs/kit/types#app.d.ts

import type { SessionTable, UserTable } from "$lib/server/schema";

// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: UserTable | null
            session: SessionTable | null
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
