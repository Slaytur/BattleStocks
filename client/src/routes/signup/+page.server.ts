import { redirect } from "@sveltejs/kit";
import type { Actions, RequestEvent } from "../$types";

export async function load (event: RequestEvent) {
    if (event.locals.session !== null && event.locals.user !== null) return redirect(302, "/");
    return {};
}

export const actions = {
    signup: async (event) => {
        return redirect(302, "/");
    }
} satisfies Actions;
