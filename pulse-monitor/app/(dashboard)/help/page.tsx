"use client";

import { useMemo, useState } from "react";
import {
  Search,
  BookOpen,
  Monitor,
  Activity,
  Bell,
  ShieldCheck,
  MessageCircle,
  Mail,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Zap,
  LifeBuoy,
  ExternalLink,
} from "lucide-react";

const helpCategories = [
  {
    title: "Getting Started",
    description: "Learn the basics of PulseMonitor and set up your workspace.",
    icon: BookOpen,
    color: "bg-[#eaf0e8]",
    iconColor: "text-[#58745e]",
    articles: 5,
  },
  {
    title: "Monitor Setup",
    description: "Create monitors and configure your website health checks.",
    icon: Monitor,
    color: "bg-[#f3eee1]",
    iconColor: "text-[#a38b4d]",
    articles: 8,
  },
  {
    title: "Incidents & Alerts",
    description: "Understand downtime, incidents, recovery, and alerting.",
    icon: Bell,
    color: "bg-[#f8e9e5]",
    iconColor: "text-[#bd6959]",
    articles: 6,
  },
  {
    title: "Analytics & Reports",
    description: "Understand uptime metrics, response time, and performance.",
    icon: Activity,
    color: "bg-[#e9edf1]",
    iconColor: "text-[#607b8e]",
    articles: 4,
  },
  {
    title: "Account & Security",
    description: "Manage account settings and security preferences.",
    icon: ShieldCheck,
    color: "bg-[#ece8f3]",
    iconColor: "text-[#7a698e]",
    articles: 5,
  },
  {
    title: "Notifications",
    description: "Configure notifications and monitoring alerts.",
    icon: Zap,
    color: "bg-[#f4ebe3]",
    iconColor: "text-[#b1845c]",
    articles: 4,
  },
];

const faqs = [
  {
    question: "What is a monitor?",
    answer:
      "A monitor is a website or API endpoint that PulseMonitor checks periodically to determine whether it is responding correctly. Each monitor tracks its status, response time, uptime, and recent check history.",
  },
  {
    question: "How do I add a new website monitor?",
    answer:
      "Navigate to the Monitors page and click Add Monitor. Enter a monitor name, website URL, HTTP method, checking interval, and timeout. Once created, the monitor will appear in your monitor list.",
  },
  {
    question: "What does Operational mean?",
    answer:
      "Operational means the endpoint responded successfully to the monitoring request according to the monitor's configured health-check rules.",
  },
  {
    question: "What happens when my website goes down?",
    answer:
      "When monitoring detects repeated failures, the system can identify an incident and mark the monitor as down. Once the endpoint recovers, the incident can be resolved and recovery recorded.",
  },
  {
    question: "What is uptime percentage?",
    answer:
      "Uptime represents the percentage of monitored time during which a service was available. For example, 99.9% uptime means the service was available for 99.9% of the selected monitoring period.",
  },
  {
    question: "What is response time?",
    answer:
      "Response time measures how long your website or API takes to respond to a monitoring request. Lower response times generally indicate a faster response, although actual user experience may vary.",
  },
  {
    question: "Can I change my monitoring interval?",
    answer:
      "Yes. You can configure the check interval while creating a monitor. The interval determines how frequently monitoring checks are scheduled.",
  },
  {
    question: "Why is my monitor showing Pending?",
    answer:
      "A monitor may show Pending when it has been newly created and has not completed its first health check yet.",
  },
  {
    question: "Are my monitoring settings saved automatically?",
    answer:
      "Your settings depend on the current configuration of PulseMonitor. Some preferences may be saved locally in your browser, while account-wide persistence will be available through the backend.",
  },
];

type FAQItemProps = {
  question: string;
  answer: string;
};

function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#eeece5] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-medium text-[#465848]">{question}</span>

        <ChevronDown
          size={17}
          className={`shrink-0 text-[#8b958b] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="pb-5 pr-8 text-sm leading-7 text-[#899188]">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return faqs;

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return helpCategories;

    return helpCategories.filter(
      (category) =>
        category.title.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#faf8f2] px-6 py-9 lg:px-10">
      {/* Header */}
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#8c978b]">
        <LifeBuoy size={14} />
        Support Center
      </div>

      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#294638]">
        Help & Support
      </h1>

      <p className="mt-2 text-sm text-[#899187]">
        Find answers, learn how PulseMonitor works, and get help when you need it.
      </p>

      {/* Hero Search */}
      <section className="relative mt-8 overflow-hidden rounded-[24px] bg-[#294b3b] p-7 text-white sm:p-10">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/10" />
        <div className="absolute -right-5 -top-12 h-48 w-48 rounded-full border border-white/10" />
        <div className="absolute bottom-[-90px] right-[30%] h-48 w-48 rounded-full bg-[#8da48e]/10 blur-3xl" />

        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 text-xs tracking-wide text-[#d3dfd1]">
            <CircleHelp size={15} />
            HOW CAN WE HELP?
          </div>

          <h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
            Find the answers
            <br />
            you're looking for.
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#d1dbd0]">
            Explore guides, discover solutions, and get the most out of your
            monitoring workspace.
          </p>

          {/* Search */}
          <div className="mt-7 flex items-center rounded-xl border border-white/10 bg-white px-4 py-1 shadow-lg">
            <Search size={18} className="shrink-0 text-[#859486]" />

            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, questions, topics..."
              className="w-full border-0 bg-transparent px-3 py-3 text-sm text-[#3e5143] outline-none placeholder:text-[#a1a69e]"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-[#6b806e]"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Support Cards */}
      <section className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
        <SupportCard
          icon={<BookOpen size={19} />}
          title="Quick Start Guide"
          description="Get your monitoring workspace up and running."
          label="Explore guide"
          color="bg-[#eaf0e8] text-[#57735e]"
        />

        <SupportCard
          icon={<MessageCircle size={19} />}
          title="Common Questions"
          description="Find quick answers to frequently asked questions."
          label="Browse FAQs"
          color="bg-[#f3eee1] text-[#a38b4d]"
          onClick={() =>
            document
              .getElementById("faq-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />

        <SupportCard
          icon={<Mail size={19} />}
          title="Contact Support"
          description="Need assistance? Reach out to our support team."
          label="Get in touch"
          color="bg-[#e9edf1] text-[#607b8e]"
          onClick={() =>
            document
              .getElementById("contact-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />
      </section>

      {/* Help Categories */}
      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#98a096]">
              Browse by topic
            </p>

            <h2 className="mt-2 text-xl font-semibold text-[#405443]">
              Help Categories
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCategories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.title}
                onClick={() => {
                  setSearchQuery(category.title.split(" ")[0]);
                  document
                    .getElementById("faq-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group rounded-2xl border border-[#e9e5dc] bg-white p-5 text-left shadow-[0_4px_20px_rgba(48,67,50,0.02)] transition hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${category.color} ${category.iconColor}`}
                >
                  <Icon size={20} />
                </div>

                <h3 className="mt-4 font-semibold text-[#415443]">
                  {category.title}
                </h3>

                <p className="mt-2 min-h-[40px] text-sm leading-6 text-[#92988f]">
                  {category.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-[#a0a49b]">
                    {category.articles} articles
                  </span>

                  <ChevronRight
                    size={16}
                    className="text-[#849285] transition group-hover:translate-x-1"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {filteredCategories.length === 0 && searchQuery && (
          <div className="rounded-2xl border border-[#e9e5dc] bg-white p-6 text-sm text-[#92988f]">
            No categories matched your search.
          </div>
        )}
      </section>

      {/* FAQs */}
      <section
        id="faq-section"
        className="mt-10 rounded-2xl border border-[#e9e5dc] bg-white p-6 sm:p-8"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf0e8] text-[#57735e]">
            <CircleHelp size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-[#405443]">
              Frequently Asked Questions
            </h2>

            <p className="mt-1 text-xs text-[#969b92]">
              Quick answers to common questions.
            </p>
          </div>
        </div>

        <div className="mt-5">
          {filteredFAQs.map((faq) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <p className="py-8 text-center text-sm text-[#969b92]">
            No questions matched your search. Try a different keyword.
          </p>
        )}
      </section>

      {/* Contact Support */}
      <section
        id="contact-section"
        className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_0.7fr]"
      >
        <div className="rounded-2xl border border-[#e9e5dc] bg-white p-6 sm:p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf0e8] text-[#57735e]">
            <MessageCircle size={20} />
          </div>

          <h2 className="mt-4 text-xl font-semibold text-[#405443]">
            Still need help?
          </h2>

          <p className="mt-2 max-w-lg text-sm leading-6 text-[#91988f]">
            Couldn't find what you were looking for? Send us your question and
            we'll help you figure things out.
          </p>

          <a
            href="mailto:support@pulsemonitor.dev?subject=PulseMonitor%20Support"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#294b3b] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#1e3b2e]"
          >
            Contact Support
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* System Status */}
        <div className="rounded-2xl border border-[#e9e5dc] bg-[#f3f5ef] p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8ab497] opacity-50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#6d997a]" />
            </span>

            <span className="text-xs font-medium text-[#6f8673]">
              SYSTEM STATUS
            </span>
          </div>

          <h3 className="mt-4 text-lg font-semibold text-[#405443]">
            All systems operational
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#91988f]">
            Everything appears to be running smoothly.
          </p>

          <button className="mt-5 flex items-center gap-2 text-sm font-medium text-[#57735e] transition hover:text-[#294b3b]">
            View system status
            <ExternalLink size={14} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-[#e9e5dc] pt-5 sm:flex-row sm:items-center">
        <p className="text-xs text-[#a0a49b]">
          PulseMonitor Support Center
        </p>

        <p className="text-xs text-[#a0a49b]">
          Built to keep your services running.
        </p>
      </footer>
    </div>
  );
}

/* ---------- Support Card ---------- */

function SupportCard({
  icon,
  title,
  description,
  label,
  color,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  label: string;
  color: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group rounded-2xl border border-[#e9e5dc] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}
      >
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-[#415443]">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-[#92988f]">{description}</p>

      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[#617a65]">
        {label}
        <ArrowUpRight
          size={14}
          className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </button>
  );
}

