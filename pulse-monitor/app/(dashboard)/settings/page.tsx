"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Activity,
  Palette,
  Mail,
  Clock,
  Save,
  Check,
  ChevronRight,
  Globe,
  Lock,
  AlertTriangle,
} from "lucide-react";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "monitoring", label: "Monitoring", icon: Activity },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "Saptak Bhattacharyya",
    email: "saptak@example.com",
    role: "Administrator",
    timezone: "Asia/Kolkata",
  });

  const [monitoring, setMonitoring] = useState({
    interval: "5",
    timeout: "30",
    retries: "3",
  });

  const [notifications, setNotifications] = useState({
    downtime: true,
    recovery: true,
    slowResponse: false,
    weeklyReport: true,
    email: true,
  });

  const [appearance, setAppearance] = useState({
    theme: "light",
    compact: false,
  });

  function handleSave() {
    const settings = {
      profile,
      monitoring,
      notifications,
      appearance,
    };

    localStorage.setItem("pulse-monitor-settings", JSON.stringify(settings));

    setSaved(true);

    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="min-h-screen bg-[#faf8f2] px-6 py-9 lg:px-10">

      {/* Header */}
      <div className="mb-9">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#8c978b]">
          <Shield size={14} />
          Workspace Configuration
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#294638]">
          Settings
        </h1>

        <p className="mt-2 text-sm text-[#899187]">
          Manage your account, monitoring preferences, and notifications.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">

        {/* Settings Navigation */}
        <aside className="h-fit rounded-2xl border border-[#e9e5dc] bg-white p-3 shadow-sm">
          <p className="px-3 pb-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a0a49b]">
            Preferences
          </p>

          {sections.map((section) => {
            const Icon = section.icon;
            const active = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`mb-1 flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm transition ${
                  active
                    ? "bg-[#eaf0e8] font-medium text-[#355640]"
                    : "text-[#7e897f] hover:bg-[#f7f6f1]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={17} />
                  {section.label}
                </span>

                {active && <ChevronRight size={15} />}
              </button>
            );
          })}

          {/* Workspace Card */}
          <div className="mt-5 rounded-xl bg-[#f6f5ef] p-4">
            <div className="flex items-center gap-2 text-[#56725b]">
              <Globe size={16} />
              <span className="text-xs font-medium">PulseMonitor</span>
            </div>

            <p className="mt-2 text-xs leading-5 text-[#8c9389]">
              Your monitoring workspace is configured and ready.
            </p>
          </div>
        </aside>

        {/* Settings Content */}
        <div className="min-w-0 space-y-6">

          {/* PROFILE */}
          {activeSection === "profile" && (
            <SettingsCard
              title="Profile Information"
              description="Manage your personal account details."
              icon={<User size={18} />}
            >
              <div className="flex items-center gap-4 border-b border-[#efede6] pb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8eee6] text-xl font-semibold text-[#46634d]">
                  SB
                </div>

                <div>
                  <p className="font-medium text-[#405443]">
                    {profile.name}
                  </p>

                  <p className="mt-1 text-sm text-[#92998f]">
                    Workspace Administrator
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <InputField
                  label="Full Name"
                  value={profile.name}
                  onChange={(value) =>
                    setProfile({ ...profile, name: value })
                  }
                />

                <InputField
                  label="Email Address"
                  value={profile.email}
                  onChange={(value) =>
                    setProfile({ ...profile, email: value })
                  }
                  type="email"
                />

                <InputField
                  label="Role"
                  value={profile.role}
                  onChange={(value) =>
                    setProfile({ ...profile, role: value })
                  }
                />

                <SelectField
                  label="Timezone"
                  value={profile.timezone}
                  onChange={(value) =>
                    setProfile({ ...profile, timezone: value })
                  }
                  options={[
                    { label: "India Standard Time", value: "Asia/Kolkata" },
                    { label: "UTC", value: "UTC" },
                    { label: "Eastern Time", value: "America/New_York" },
                    { label: "Pacific Time", value: "America/Los_Angeles" },
                    { label: "London", value: "Europe/London" },
                  ]}
                />
              </div>
            </SettingsCard>
          )}

          {/* MONITORING */}
          {activeSection === "monitoring" && (
            <>
              <SettingsCard
                title="Monitoring Preferences"
                description="Configure default settings for new monitors."
                icon={<Activity size={18} />}
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <SelectField
                    label="Default Check Interval"
                    value={monitoring.interval}
                    onChange={(value) =>
                      setMonitoring({ ...monitoring, interval: value })
                    }
                    options={[
                      { label: "Every 1 minute", value: "1" },
                      { label: "Every 5 minutes", value: "5" },
                      { label: "Every 10 minutes", value: "10" },
                      { label: "Every 15 minutes", value: "15" },
                      { label: "Every 30 minutes", value: "30" },
                    ]}
                  />

                  <SelectField
                    label="Request Timeout"
                    value={monitoring.timeout}
                    onChange={(value) =>
                      setMonitoring({ ...monitoring, timeout: value })
                    }
                    options={[
                      { label: "5 seconds", value: "5" },
                      { label: "10 seconds", value: "10" },
                      { label: "15 seconds", value: "15" },
                      { label: "30 seconds", value: "30" },
                    ]}
                  />

                  <SelectField
                    label="Retry Attempts"
                    value={monitoring.retries}
                    onChange={(value) =>
                      setMonitoring({ ...monitoring, retries: value })
                    }
                    options={[
                      { label: "1 attempt", value: "1" },
                      { label: "2 attempts", value: "2" },
                      { label: "3 attempts", value: "3" },
                      { label: "5 attempts", value: "5" },
                    ]}
                  />
                </div>

                <div className="mt-6 rounded-xl border border-[#e9e5dc] bg-[#faf9f5] p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 text-[#718574]" size={17} />

                    <div>
                      <p className="text-sm font-medium text-[#516353]">
                        Monitoring behavior
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#91988f]">
                        These preferences are used as defaults when creating new
                        monitors. Changing them will not automatically modify
                        existing monitors.
                      </p>
                    </div>
                  </div>
                </div>
              </SettingsCard>
            </>
          )}

          {/* NOTIFICATIONS */}
          {activeSection === "notifications" && (
            <SettingsCard
              title="Notification Preferences"
              description="Choose which events should trigger notifications."
              icon={<Bell size={18} />}
            >
              <div className="mb-6 rounded-xl bg-[#f7f6f1] p-4">
                <div className="flex items-center gap-3">
                  <Mail size={17} className="text-[#617966]" />

                  <div>
                    <p className="text-sm font-medium text-[#435746]">
                      Email Notifications
                    </p>

                    <p className="mt-1 text-xs text-[#92998f]">
                      Enable or disable email notifications globally.
                    </p>
                  </div>
                </div>
              </div>

              <ToggleRow
                title="Email notifications"
                description="Receive monitoring alerts via email."
                checked={notifications.email}
                onChange={(checked) =>
                  setNotifications({ ...notifications, email: checked })
                }
              />

              <ToggleRow
                title="Monitor downtime"
                description="Alert me when a website or API becomes unavailable."
                checked={notifications.downtime}
                onChange={(checked) =>
                  setNotifications({ ...notifications, downtime: checked })
                }
              />

              <ToggleRow
                title="Monitor recovery"
                description="Notify me when a failed monitor becomes operational again."
                checked={notifications.recovery}
                onChange={(checked) =>
                  setNotifications({ ...notifications, recovery: checked })
                }
              />

              <ToggleRow
                title="Slow response alerts"
                description="Alert me when response time exceeds acceptable limits."
                checked={notifications.slowResponse}
                onChange={(checked) =>
                  setNotifications({ ...notifications, slowResponse: checked })
                }
              />

              <ToggleRow
                title="Weekly report"
                description="Receive a weekly summary of uptime and performance."
                checked={notifications.weeklyReport}
                onChange={(checked) =>
                  setNotifications({ ...notifications, weeklyReport: checked })
                }
              />
            </SettingsCard>
          )}

          {/* APPEARANCE */}
          {activeSection === "appearance" && (
            <SettingsCard
              title="Appearance"
              description="Customize how PulseMonitor looks on your screen."
              icon={<Palette size={18} />}
            >
              <p className="mb-4 text-sm font-medium text-[#526254]">
                Interface Theme
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { id: "light", title: "Light", color: "bg-[#faf8f2]" },
                  { id: "dark", title: "Dark", color: "bg-[#24362c]" },
                  { id: "system", title: "System", color: "bg-gradient-to-r from-[#faf8f2] to-[#24362c]" },
                ].map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() =>
                      setAppearance({ ...appearance, theme: theme.id })
                    }
                    className={`rounded-xl border p-3 text-left transition ${
                      appearance.theme === theme.id
                        ? "border-[#65836c] ring-2 ring-[#65836c]/10"
                        : "border-[#e8e5dd] hover:border-[#c6d0c3]"
                    }`}
                  >
                    <div
                      className={`h-20 rounded-lg border border-black/5 ${theme.color}`}
                    />

                    <p className="mt-3 text-sm font-medium capitalize text-[#526254]">
                      {theme.title}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <ToggleRow
                  title="Compact layout"
                  description="Reduce spacing across the interface."
                  checked={appearance.compact}
                  onChange={(checked) =>
                    setAppearance({ ...appearance, compact: checked })
                  }
                />
              </div>
            </SettingsCard>
          )}

          {/* SECURITY */}
          {activeSection === "security" && (
            <SettingsCard
              title="Security & Account"
              description="Manage account security preferences."
              icon={<Lock size={18} />}
            >
              <div className="rounded-xl border border-[#e9e5dc] bg-[#faf9f5] p-4">
                <div className="flex items-start gap-3">
                  <Shield size={18} className="mt-0.5 text-[#718574]" />

                  <div>
                    <p className="text-sm font-medium text-[#4c5f4e]">
                      Account Security
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#91988f]">
                      Security settings will be connected to authentication when
                      account management is implemented.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <SecurityItem
                  title="Password"
                  description="Change your account password."
                  action="Change Password"
                />

                <SecurityItem
                  title="Active Sessions"
                  description="Manage devices signed into your account."
                  action="Manage Sessions"
                />

                <SecurityItem
                  title="Two-Factor Authentication"
                  description="Add an extra layer of security to your account."
                  action="Configure"
                />
              </div>

              <div className="mt-6 rounded-xl border border-[#f0d8c8] bg-[#fbf3eb] p-4">
                <div className="flex gap-3">
                  <AlertTriangle
                    size={17}
                    className="mt-0.5 shrink-0 text-[#bd8959]"
                  />

                  <p className="text-xs leading-5 text-[#a27e5c]">
                    Authentication and security controls are visual placeholders
                    until backend authentication is implemented.
                  </p>
                </div>
              </div>
            </SettingsCard>
          )}

          {/* Save Button */}
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e9e5dc] bg-white p-5 sm:flex-row sm:items-center">
            <p className="text-sm text-[#92988e]">
              Remember to save your changes before leaving.
            </p>

            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#294b3b] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1e3b2e]"
            >
              {saved ? <Check size={16} /> : <Save size={16} />}
              {saved ? "Changes Saved" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Settings Card ---------- */

function SettingsCard({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#e9e5dc] bg-white shadow-[0_4px_20px_rgba(48,67,50,0.03)]">
      <div className="flex items-center gap-3 border-b border-[#efede6] px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf0e8] text-[#55745d]">
          {icon}
        </div>

        <div>
          <h2 className="font-semibold text-[#3b5141]">{title}</h2>
          <p className="mt-1 text-xs text-[#92998f]">{description}</p>
        </div>
      </div>

      <div className="p-6">{children}</div>
    </section>
  );
}

/* ---------- Input Field ---------- */

function InputField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#526254]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#e3e1d9] bg-[#fcfbf8] px-4 py-3 text-sm text-[#455748] outline-none transition focus:border-[#708b77] focus:ring-2 focus:ring-[#708b77]/10"
      />
    </div>
  );
}

/* ---------- Select Field ---------- */

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#526254]">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#e3e1d9] bg-[#fcfbf8] px-4 py-3 text-sm text-[#455748] outline-none transition focus:border-[#708b77]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ---------- Toggle ---------- */

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#f0ede7] py-4 last:border-0">
      <div>
        <p className="text-sm font-medium text-[#526254]">{title}</p>
        <p className="mt-1 text-xs leading-5 text-[#969b92]">{description}</p>
      </div>

      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-[#52745a]" : "bg-[#d8dcd4]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

/* ---------- Security Item ---------- */

function SecurityItem({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-3 rounded-xl border border-[#eae7df] p-4 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-medium text-[#526254]">{title}</p>
        <p className="mt-1 text-xs text-[#92998f]">{description}</p>
      </div>

      <button
        disabled
        className="cursor-not-allowed rounded-lg border border-[#e5e3dc] px-3 py-2 text-xs font-medium text-[#a0a49b]"
      >
        {action}
      </button>
    </div>
  );
}

