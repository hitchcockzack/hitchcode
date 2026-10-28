import type { ConciergeSummary } from '@/lib/ai-concierge/types';

export interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

interface LeadLike {
  name?: string | null;
  phone?: string | null;
  company?: string | null;
  email?: string | null;
  problem_hint?: string | null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function nl2br(value: string): string {
  return escapeHtml(value).replace(/\n/g, '<br/>');
}

const BRAND = '#D4A574';

function wrap(title: string, inner: string): string {
  // Inline styles only — email clients ignore <style> blocks / external CSS.
  return `<!doctype html><html><body style="margin:0;background:#0c0a09;padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#e7e5e4;">
  <div style="max-width:640px;margin:0 auto;background:#1c1917;border:1px solid #292524;border-radius:16px;overflow:hidden;">
    <div style="padding:20px 24px;border-bottom:1px solid #292524;">
      <span style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${BRAND};">Hitchcode AI Concierge</span>
      <h1 style="margin:8px 0 0;font-size:20px;color:#fafaf9;">${escapeHtml(title)}</h1>
    </div>
    <div style="padding:24px;font-size:14px;line-height:1.6;color:#d6d3d1;">${inner}</div>
  </div></body></html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 12px 6px 0;color:#a8a29e;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
    <td style="padding:6px 0;color:#f5f5f4;">${nl2br(value || '—')}</td>
  </tr>`;
}

function nameOrCompany(lead: LeadLike): string {
  return lead.name?.trim() || lead.company?.trim() || lead.phone?.trim() || 'Unknown lead';
}

/** Internal notification sent to INTERNAL_LEAD_EMAIL after every call. */
export function buildInternalEmail(params: {
  lead: LeadLike;
  summary: ConciergeSummary;
  transcript: string;
}): EmailContent {
  const { lead, summary, transcript } = params;
  const followUp = summary.follow_up_requested ? 'Yes' : 'No';
  const subject = `New AI Concierge Lead: ${nameOrCompany(lead)} — Score ${summary.lead_score}${
    summary.follow_up_requested ? ' — wants follow-up' : ''
  }`;

  const table = `<table style="width:100%;border-collapse:collapse;font-size:14px;">
    ${row('Name', lead.name ?? '')}
    ${row('Phone', lead.phone ?? '')}
    ${row('Company', lead.company ?? '')}
    ${row('Email', lead.email ?? '')}
    ${row('Problem hint', lead.problem_hint ?? '')}
  </table>`;

  const summaryTable = `<table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:8px;">
    ${row('Lead score', String(summary.lead_score))}
    ${row('Wants follow-up', followUp)}
    ${row('Business type', summary.business_type)}
    ${row('Pain point', summary.main_pain_point)}
    ${row('Current workflow', summary.current_workflow)}
    ${row('Tools mentioned', (summary.tools_mentioned ?? []).join(', '))}
    ${row('Urgency', summary.urgency)}
    ${row('Budget signal', summary.budget_signal)}
    ${row('Complexity', summary.complexity_estimate)}
    ${row('Recommended solution', summary.recommended_solution)}
    ${row('MVP scope', summary.mvp_scope)}
    ${row('Suggested follow-up', summary.suggested_follow_up_message)}
    ${row('Internal notes', summary.internal_notes)}
  </table>`;

  const inner = `
    <h2 style="font-size:15px;color:${BRAND};margin:0 0 8px;">Lead</h2>
    ${table}
    <h2 style="font-size:15px;color:${BRAND};margin:20px 0 8px;">Overview</h2>
    <p style="margin:0;">${nl2br(summary.overview)}</p>
    <h2 style="font-size:15px;color:${BRAND};margin:20px 0 8px;">Sales summary</h2>
    ${summaryTable}
    <h2 style="font-size:15px;color:${BRAND};margin:20px 0 8px;">Full transcript</h2>
    <pre style="white-space:pre-wrap;background:#0c0a09;border:1px solid #292524;border-radius:10px;padding:14px;font-size:12px;color:#d6d3d1;overflow:auto;">${escapeHtml(
      transcript || '(no transcript captured)',
    )}</pre>
  `;

  const text = [
    subject,
    '',
    `Name: ${lead.name ?? ''}`,
    `Phone: ${lead.phone ?? ''}`,
    `Company: ${lead.company ?? ''}`,
    `Email: ${lead.email ?? ''}`,
    `Problem hint: ${lead.problem_hint ?? ''}`,
    '',
    `Overview: ${summary.overview}`,
    `Pain point: ${summary.main_pain_point}`,
    `Recommended solution: ${summary.recommended_solution}`,
    `MVP scope: ${summary.mvp_scope}`,
    `Urgency: ${summary.urgency}`,
    `Budget signal: ${summary.budget_signal}`,
    `Lead score: ${summary.lead_score}`,
    `Wants follow-up: ${followUp}`,
    '',
    '--- Transcript ---',
    transcript || '(no transcript captured)',
  ].join('\n');

  return { subject, html: wrap(subject, inner), text };
}

/** Optional recap sent to the lead when an email was provided. */
export function buildLeadEmail(params: {
  lead: LeadLike;
  summary: ConciergeSummary;
}): EmailContent {
  const { lead, summary } = params;
  const subject = 'Your Hitchcode AI concierge recap';
  const greetingName = lead.name?.trim() ? `, ${escapeHtml(lead.name.trim().split(' ')[0])}` : '';
  const closing = summary.follow_up_requested
    ? 'You asked for a personal follow-up, so Zack will reach out to you directly.'
    : "Zack will review the call and follow up personally if there's a strong fit. No pressure either way.";

  const inner = `
    <p style="margin:0 0 14px;">Thanks for taking the AI concierge call${greetingName}. Here's a quick recap of what we captured.</p>
    <h2 style="font-size:15px;color:${BRAND};margin:18px 0 8px;">What we heard</h2>
    <p style="margin:0 0 6px;">${nl2br(summary.overview)}</p>
    <p style="margin:0;color:#a8a29e;">Main focus: ${nl2br(summary.main_pain_point || '—')}</p>
    <h2 style="font-size:15px;color:${BRAND};margin:18px 0 8px;">The likely first build</h2>
    <p style="margin:0 0 6px;">${nl2br(summary.recommended_solution || '—')}</p>
    <p style="margin:0;color:#a8a29e;">A focused first version could look like: ${nl2br(summary.mvp_scope || '—')}</p>
    <p style="margin:18px 0 0;">${escapeHtml(closing)}</p>
    <p style="margin:18px 0 0;color:#a8a29e;">— The Hitchcode AI concierge, on behalf of Zack Hitchcock</p>
  `;

  const text = [
    `Thanks for taking the AI concierge call${lead.name ? `, ${lead.name.split(' ')[0]}` : ''}.`,
    '',
    'What we heard:',
    summary.overview,
    `Main focus: ${summary.main_pain_point || '—'}`,
    '',
    'The likely first build:',
    summary.recommended_solution || '—',
    `A focused first version: ${summary.mvp_scope || '—'}`,
    '',
    closing,
    '',
    '— The Hitchcode AI concierge, on behalf of Zack Hitchcock',
  ].join('\n');

  return { subject, html: wrap('Your AI concierge recap', inner), text };
}
