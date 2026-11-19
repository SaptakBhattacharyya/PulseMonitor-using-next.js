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

export const monitors: Monitor[] = [
  {
    id: "1",
    name: "PulseMonitor API",
    url: "https://api.pulsemonitor.dev",
    method: "GET",
    interval: 5,
    timeout: 30,
    status: "Operational",
    uptime: "99.98%",
    response: "142 ms",
    checked: "Just now",
  },
  {
    id: "2",
    name: "My Portfolio",
    url: "https://saptak.dev",
    method: "GET",
    interval: 5,
    timeout: 30,
    status: "Operational",
    uptime: "99.95%",
    response: "210 ms",
    checked: "1 min ago",
  },
  {
    id: "3",
    name: "E-Commerce Store",
    url: "https://shop.example.com",
    method: "GET",
    interval: 5,
    timeout: 30,
    status: "Down",
    uptime: "96.42%",
    response: "Timeout",
    checked: "2 min ago",
  },
  {
    id: "4",
    name: "Admin Dashboard",
    url: "https://admin.example.com",
    method: "GET",
    interval: 5,
    timeout: 30,
    status: "Operational",
    uptime: "99.89%",
    response: "185 ms",
    checked: "3 min ago",
  },
  {
    id: "5",
    name: "Authentication API",
    url: "https://auth.example.com",
    method: "GET",
    interval: 5,
    timeout: 30,
    status: "Operational",
    uptime: "99.99%",
    response: "98 ms",
    checked: "4 min ago",
  },
];
