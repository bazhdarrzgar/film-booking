// Logout API endpoint

import { Handlers } from "$fresh/server.ts";
import { destroySessionResponse } from "../../utils/session.ts";

export const handler: Handlers = {
  async GET(req) {
    const response = new Response(null, {
      status: 302,
      headers: { Location: "/" }
    });
    
    return await destroySessionResponse(req, response);
  }
};