import { redirect } from "@sveltejs/kit";
import type { Actions, RequestEvent } from "../$types";

// todo: get available servers
export async function load (event: RequestEvent) {
    if (event.locals.session !== null && event.locals.user !== null) return redirect(302, "/");
    return {};
}
