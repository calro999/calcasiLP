export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://calcasi-lp.vercel.app";

export function stripHtmlTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildSupplementalSection(title: string, category: string): string {
  const safeTitle = title.replace(/[<>]/g, "");
  const safeCategory = category.replace(/[<>]/g, "");

  return `
    <section class="mt-16 rounded-2xl border border-amber-500/20 bg-[#0d1117] p-6 md:p-8">
      <h2 class="text-2xl font-extrabold text-amber-300 mb-4">Original Editorial Add-on: Practical Playbook</h2>
      <p class="text-gray-300 leading-8 mb-4">
        This section is an original add-on written for ${safeTitle}. It turns the core ideas of this ${safeCategory}
        guide into a practical framework you can apply session by session.
      </p>
      <h3 class="text-xl font-bold text-white mb-3">How to use this guide in real play</h3>
      <ul class="list-disc pl-6 space-y-2 text-gray-300">
        <li>Define one session goal before you bet: bankroll growth, strategy testing, or risk control.</li>
        <li>Track 10 to 20 rounds in a simple note. Do not optimize based on one short streak.</li>
        <li>Use fixed stop-loss and stop-win levels so emotions do not rewrite your plan mid-session.</li>
        <li>Review after each session and keep only the tactics that remain profitable over time.</li>
      </ul>
      <h3 class="text-xl font-bold text-white mt-8 mb-3">Common mistakes to avoid</h3>
      <p class="text-gray-300 leading-8">
        Most losses happen when players increase stake size without statistical edge, chase results after a bad run,
        or ignore wagering terms and game RTP details. Stay process-driven, not outcome-driven.
      </p>
      <h3 class="text-xl font-bold text-white mt-8 mb-3">Checklist before your next session</h3>
      <p class="text-gray-300 leading-8">
        Confirm your bankroll limit, preferred game type, expected variance, and a strict exit trigger.
        If one of these is unclear, postpone the session. Good discipline protects long-term performance.
      </p>
    </section>
  `;
}
