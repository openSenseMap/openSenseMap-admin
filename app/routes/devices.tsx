import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, ScrollRestoration } from "@remix-run/react";
import { requireUserId } from "~/utils/session.server";

import maplibregl from "maplibre-gl/dist/maplibre-gl.css"

export type Device = {
  name: string;
  exposure: string;
  model: string;
  grouptag: string[];
  updatedAt: Date;
  currentLocaltion: any[];
  sensors: any[];
  lastMeasurementAt: Date;
  _id: string;
  loc: any[];
  integrations: any[];
  access_token: string;
  useAuth: boolean;
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: maplibregl
    }
  ]
}

export async function getLoaderData(token: string) {
  const res = await fetch(`${process.env.OSEM_API_URL}/management/boxes`, {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "Authorization": `Bearer ${token}`
    }
  })
  const devices = await res.json()

  return devices
}

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);

  return json({});
}

export default function DevicesRoute() {
  return (
    <main className="container mx-auto p-4">
      <Outlet />
      <ScrollRestoration />
    </main>
  );
}