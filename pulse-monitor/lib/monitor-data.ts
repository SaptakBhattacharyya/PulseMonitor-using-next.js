export type Monitor = {
  id: string;
  name: string;
  url: string;
  method: "GET" | "HEAD" | "POST";
  interval: number;
  timeout: number;

  status: "Operational" | "Down" | "Pending";
  uptime: string;
  response: string;
  checked: string;
};

export const initialMonitors: Monitor[] = [];
export const monitors: Monitor[] = initialMonitors;
