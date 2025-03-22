import { redirect } from "@sveltejs/kit";
import type { Actions, RequestEvent } from "../$types";
import { createUserFromCreds } from "../../../../shared/src/modules/User";

export async function load (event: RequestEvent) {
    if (event.locals.session !== null && event.locals.user !== null) return redirect(302, "/");
    return {};
}

export const actions: Actions = {
    signup: async ({ cookies, request, url }) => {
        const data = await request.formData();
        const user = {
            email: data.get("email") as string,
            password: data.get("password") as string
        };
        const res = await createUserFromCreds(user.email, user.password);

        console.log(res);
    }
};
