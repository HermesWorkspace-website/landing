export type LegalSlug =
  | 'privacy'
  | 'terms'
  | 'dpa'
  | 'information'
  | 'contact'
  | 'data-deletion'
  | 'parental-control'
  | 'grievance'
  | 'aup';

export type LegalDocSection = {
  id: string;
  title: string;
  content: string;
};

export type LegalDocument = {
  slug: LegalSlug;
  title: string;
  eyebrow: string;
  effective: string;
  intro: string[];
  sections: LegalDocSection[];
};

export const legalDocuments: Record<LegalSlug, LegalDocument> = {
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    eyebrow: 'Legal',
    effective: 'Effective date: May 11, 2026',
    intro: [
      'These Terms of Service govern access to and use of HermesWorkspace by schools, organizations, administrators, teachers, students, and other authorized users.',
      'By accessing or using the Service, the organization or individual accepts these terms and agrees to follow applicable school policies and local law.',
    ],
    sections: [
      {
        id: 'service',
        title: '1. The Service',
        content:
          'HermesWorkspace provides hosted software for school communication, classroom messaging, notices, meetings, resources, and workspace administration. The school or organization is responsible for configuring workspace membership, permissions, and the educational use of the Service.',
      },
      {
        id: 'accounts',
        title: '2. Accounts',
        content:
          'Users may access the Service only through accounts authorized by their school or organization. Schools are responsible for account issuance, password security, access rules, and any duties assigned to guardians or administrators.',
      },
      {
        id: 'use',
        title: '3. Acceptable Use',
        content:
          'Users must not misuse the Service, bypass security controls, upload unauthorized content, harass others, or otherwise violate applicable school policies or law.',
      },
      {
        id: 'privacy',
        title: '4. Privacy',
        content:
          'The school or organization controls most workspace content and may access student communications, reports, and records according to its policies. HermesWorkspace processes data as instructed by the organization and helps protect that data in accordance with our Privacy Policy.',
      },
      {
        id: 'supervision',
        title: '5. Student and Guardian Supervision',
        content:
          'Schools and guardians are responsible for supervising student accounts and ensuring that students follow classroom and platform rules. HermesWorkspace provides tools for reporting concerns and contacting support if help is needed.',
      },
      {
        id: 'termination',
        title: '6. Suspension and Termination',
        content:
          'HermesWorkspace may suspend or terminate access to protect the Service, comply with law, or respond to abuse. The organization may also restrict accounts for safety, policy, or administrative reasons.',
      },
      {
        id: 'contact',
        title: '7. Contact',
        content:
          'Questions about these terms may be directed to support@hermesworkspace.com.',
      },
      {
        id: 'governing-law',
        title: '8. Governing Law',
        content:
          'Disputes are governed by the laws of India. Courts of Jharkhand have exclusive jurisdiction.',
      },
      {
        id: 'limitation-of-liability',
        title: '9. Limitation of Liability',
        content:
          "HermesWorkspace's total liability is limited to fees paid by the school in the 12 months before the claim. We are not liable for indirect, consequential, or incidental damages.",
      },
      {
        id: 'warranty-disclaimer',
        title: '10. Warranty Disclaimer',
        content:
          'The Service is provided as-is and as-available. We make no implied warranties of fitness, merchantability, or uninterrupted availability.',
      },
      {
        id: 'ip-ownership',
        title: '11. IP Ownership',
        content:
          'HermesWorkspace owns the platform and its software. The school owns all workspace data and content uploaded by its users.',
      },
      {
        id: 'force-majeure',
        title: '12. Force Majeure',
        content:
          'Neither party is liable for failures caused by events outside reasonable control — including internet outages, power failures, or government action.',
      },
      {
        id: 'terms-changes',
        title: '13. Terms Changes',
        content:
          'We will notify subscribing schools 30 days before making material changes to these terms.',
      },
      {
        id: 'indemnification',
        title: '14. Indemnification',
        content:
          "The school agrees to indemnify and hold HermesWorkspace harmless from any claims, damages, or legal costs arising from: content uploaded or shared by the school's users, the school's violation of these terms, or the school's failure to obtain required consents for student accounts. HermesWorkspace agrees to indemnify the school from any claims arising from the platform infringing a third party's intellectual property or HermesWorkspace's own negligence or misconduct.",
      },
    ],
  },
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    eyebrow: 'Privacy',
    effective: 'Effective date: May 11, 2026',
    intro: [
      'This Privacy Policy explains how HermesWorkspace collects, uses, discloses, and protects personal data when users access school communication, classroom messaging, meetings, notices, and support services.',
      'Workspaces are typically administered by a school or organization. That organization determines access, membership, content retention, and review of records generated within the workspace.',
    ],
    sections: [
      {
        id: 'scope',
        title: '1. What this policy covers',
        content:
          'This policy covers personal data processed through HermesWorkspace websites, web apps, mobile apps, notifications, and support channels. It does not cover third-party services that are not controlled by HermesWorkspace.',
      },
      {
        id: 'data-collected',
        title: '2. Personal data we collect',
        content:
          'We collect account details, profile information, workspace content, device and technical data, and support communications necessary to provide and secure the Service.',
      },
      {
        id: 'use',
        title: '3. How we use personal data',
        content:
          'We use personal data to operate the Service, authenticate users, deliver notifications, manage meetings, secure accounts, support administrators, and improve platform performance.',
      },
      {
        id: 'sharing',
        title: '4. How we share personal data',
        content:
          'HermesWorkspace may share data with notification services, analytics providers, and support partners. We do not sell personal data.',
      },
      {
        id: 'rights',
        title: '5. Rights and requests',
        content:
          'Users may request access, correction, export, or deletion through their school administrator or by contacting support@hermesworkspace.com.',
      },
      {
        id: 'data-retention',
        title: '6. Data Retention',
        content:
          "We retain personal data for as long as the school's subscription is active. After contract end, workspace data is deleted within 30 days unless the school requests an export first.",
      },
      {
        id: 'grievance-officer',
        title: '7. Grievance Officer',
        content:
          'For privacy concerns, contact our Grievance Officer at grievance@hermesworkspace.com. See our Grievance page for details.',
      },
      {
        id: 'childrens-data',
        title: "8. Children's Data",
        content:
          'Student data is processed on behalf of the school. The school is responsible for obtaining any required parental consent before adding students to the platform.',
      },
      {
        id: 'cross-border-transfers',
        title: '9. Cross-Border Transfers',
        content:
          'Some service providers (storage, notifications, analytics) may process data outside India. We ensure such providers maintain adequate data protection standards.',
      },
    ],
  },
  dpa: {
    slug: 'dpa',
    title: 'Data Processing Addendum',
    eyebrow: 'Data processing',
    effective: 'Effective date: May 11, 2026',
    intro: [
      'This Data Processing Addendum supplements the agreement between HermesWorkspace and the organization that administers a workspace. It applies when HermesWorkspace processes personal data on behalf of that organization.',
      'The organization remains responsible for its legal obligations, user notices, and the lawful basis for processing personal data under applicable privacy law.',
    ],
    sections: [
      {
        id: 'processing',
        title: '1. Processing instructions',
        content:
          'HermesWorkspace processes personal data only as instructed by the organization and to provide, secure, support, maintain, and improve the Service.',
      },
      {
        id: 'subprocessors',
        title: '2. Sub-processors',
        content:
          'HermesWorkspace may engage service providers for storage, messaging, analytics, notifications, security, and support. Sub-processors are bound by obligations to protect personal data.',
      },
      {
        id: 'security',
        title: '3. Security measures',
        content:
          'HermesWorkspace maintains technical and organizational measures designed to protect personal data, including authentication, transport security, monitoring, and backup controls.',
      },
      {
        id: 'requests',
        title: '4. Data subject requests',
        content:
          'HermesWorkspace assists the organization in responding to verified privacy requests, including access, correction, export, and deletion requests.',
      },
      {
        id: 'incidents',
        title: '5. Security incidents',
        content:
          'HermesWorkspace will notify the organization if a security incident involving personal data is confirmed and notification is required by law or agreement.',
      },
    ],
  },
  information: {
    slug: 'information',
    title: 'Information',
    eyebrow: 'Service information',
    effective: 'Updated May 11, 2026',
    intro: [
      'HermesWorkspace is an education communication platform for schools, teachers, students, and administrators.',
      'This page describes service scope, accounts, notifications, and support information for institutions using the platform.',
    ],
    sections: [
      {
        id: 'purpose',
        title: '1. Product purpose',
        content:
          'The Service supports school communication, group channels, notices, meetings, activities, resources, and workspace administration in one platform.',
      },
      {
        id: 'accounts',
        title: '2. Accounts',
        content:
          'Accounts are created or managed by the school or organization. Access is determined by role, workspace membership, and institution policy.',
      },
      {
        id: 'notifications',
        title: '3. Notifications',
        content:
          'Notifications are used for timely chat, meeting, and activity updates. Users can manage device-level permissions and mute channels when needed.',
      },
      {
        id: 'support',
        title: '4. Support',
        content:
          'Students and teachers should contact their school administrator for account and policy questions. Product support can help with technical issues at support@hermesworkspace.com.',
      },
    ],
  },
  contact: {
    slug: 'contact',
    title: 'Contact',
    eyebrow: 'Support and privacy contact',
    effective: 'Updated May 11, 2026',
    intro: [
      'Use these contacts for support, privacy questions, data requests, safety reports, and product inquiries.',
    ],
    sections: [
      {
        id: 'support',
        title: '1. Support',
        content:
          'For login, workspace, or classroom access issues, contact your school administrator. For product support, email support@hermesworkspace.com.',
      },
      {
        id: 'privacy',
        title: '2. Privacy',
        content:
          'For privacy questions, data access, correction, export, or deletion requests, email privacy@hermesworkspace.com with your organization name and account details.',
      },
      {
        id: 'safety',
        title: '3. Safety reports',
        content:
          'Unsafe or abusive content should be reported through the in-app report flow so the correct context can be reviewed and addressed.',
      },
    ],
  },
  'data-deletion': {
    slug: 'data-deletion',
    title: 'Data Deletion',
    eyebrow: 'Account and workspace data requests',
    effective: 'Effective date: May 11, 2026',
    intro: [
      'HermesWorkspace supports deletion requests while recognizing that many workspace records are controlled by a school or organization and may be subject to legal, safety, or audit obligations.',
    ],
    sections: [
      {
        id: 'before-request',
        title: '1. Before you request deletion',
        content:
          'If your account is managed by a school or organization, contact the workspace administrator first to understand how deletion may affect school records.',
      },
      {
        id: 'how-to-request',
        title: '2. How to request deletion',
        content:
          'Email privacy@hermesworkspace.com with your organization name, login ID, role, and request type. You may request account deletion, export, or removal of a specific record.',
      },
      {
        id: 'data-deleted',
        title: '3. Data that can usually be deleted',
        content:
          'Profile details, device tokens, login sessions, personal uploads, and account-level records can usually be deleted after verification when no retention requirement applies.',
      },
      {
        id: 'data-retained',
        title: '4. Data that may be retained',
        content:
          'Messages, notices, meetings, attendance, reports, audit logs, and classroom records may be retained for academic continuity, safety investigations, legal compliance, or organizational audit requirements.',
      },
      {
        id: 'timeline',
        title: '5. Timeline',
        content:
          'Verified requests are normally processed within 30 days. Backup copies may take longer to expire. Deleted accounts lose access to workspace messages, files, and meetings.',
      },
    ],
  },
  'parental-control': {
    slug: 'parental-control',
    title: 'Parental Control Policy',
    eyebrow: 'Student safety and supervision',
    effective: 'Effective date: May 11, 2026',
    intro: [
      'HermesWorkspace is designed for use by schools, teachers, students, and guardians. This Parental Control Policy explains how the platform supports safe student use, parental oversight, and responsible account handling.',
    ],
    sections: [
      {
        id: 'scope',
        title: '1. Scope',
        content:
          'This policy applies to student users under 18, guardians, and school administrators who manage workspace access and safety settings.',
      },
      {
        id: 'supervision',
        title: '2. School and guardian supervision',
        content:
          'Schools are responsible for supervising student accounts and approving access. Guardians should review relevant school policies, support safe device use, and speak with school staff if questions arise.',
      },
      {
        id: 'controls',
        title: '3. Parental controls',
        content:
          'HermesWorkspace provides tools for schools to manage roles, permissions, content access, and visibility of student information. Guardians should work with school administrators when limits or monitoring are needed.',
      },
      {
        id: 'privacy',
        title: '4. Student privacy',
        content:
          'Student data is handled according to applicable privacy laws and the school’s policies. School administrators determine who can view student messages, grades, attendance, and other workspace records.',
      },
      {
        id: 'support',
        title: '5. Support and reporting',
        content:
          'If guardians or students have safety concerns, they should contact their school administrator or email support@hermesworkspace.com for technical help and guidance.',
      },
    ],
  },
  grievance: {
    slug: 'grievance',
    title: 'Grievance Officer',
    eyebrow: 'Indian IT Rules compliance',
    effective: 'Updated May 11, 2026',
    intro: [
      'HermesWorkspace has appointed a Grievance Officer as required under the Digital Personal Data Protection Act 2023 and IT Rules 2011.',
    ],
    sections: [
      {
        id: 'details',
        title: '1. Grievance Officer Details',
        content:
          'Grievance Officer: Mr. Apurav Kumar\nEmail: grievance@hermesworkspace.com',
      },
      {
        id: 'filing',
        title: '2. How to File a Grievance',
        content:
          'To file a grievance, email the above address with your name, contact details, description of the concern, and relevant dates. We will acknowledge within 48 hours and resolve within 30 days.',
      },
      {
        id: 'matters',
        title: '3. Grievance Covered Matters',
        content:
          'Grievances may relate to: privacy complaints, data access or deletion requests, safety concerns, or content disputes.',
      },
      {
        id: 'escalation',
        title: '4. Escalation',
        content:
          'If unresolved, you may escalate to the appropriate authority under Indian law.',
      },
    ],
  },
  aup: {
    slug: 'aup',
    title: 'Acceptable Use Policy',
    eyebrow: 'Policy',
    effective: 'Effective date: May 11, 2026',
    intro: [
      'This policy applies to all users — admins, teachers, students, and parents.',
    ],
    sections: [
      {
        id: 'conduct',
        title: '1. Prohibited Conduct',
        content:
          'Prohibited: harassment, bullying, impersonation, sharing inappropriate content, bypassing access controls, recording classes without permission, uploading malware, spam.',
      },
      {
        id: 'student-rules',
        title: '2. Student Guidelines',
        content:
          'Student rules: do not share login credentials, follow your school\'s platform rules, do not record or screenshot sessions without permission.',
      },
      {
        id: 'admin-responsibility',
        title: '3. Admin Responsibility',
        content:
          'School admin responsibility: enforce this policy within your workspace and report violations to support@hermesworkspace.com.',
      },
      {
        id: 'content-standards',
        title: '4. Content Standards',
        content:
          'Content standards: no adult content, no violent content, nothing that violates Indian law including the IT Act 2000.',
      },
      {
        id: 'consequences',
        title: '5. Consequences',
        content:
          'Consequences: depending on severity — warning, suspension, or permanent termination of access. HermesWorkspace may remove content or suspend accounts without prior notice if required for platform safety.',
      },
      {
        id: 'reporting-takedown',
        title: '6. Reporting and Takedown',
        content:
          "HermesWorkspace provides an in-app report button for users to flag content or behaviour that violates this policy. What can be reported: inappropriate content, harassment, bullying, impersonation, unauthorised recordings, spam, or any content that violates Indian law. What happens after a report: Reports are reviewed by HermesWorkspace within 72 hours. If a violation is confirmed, we may remove the content, restrict the account, or suspend access — without prior notice. For severe violations (illegal content, child safety, threats), we may act immediately and report to relevant authorities. No abuse of the report function: filing false or malicious reports is itself a violation of this policy and may result in your account being suspended. School admin reports: school admins may report workspace-level concerns directly to support@hermesworkspace.com for faster resolution. HermesWorkspace's decision on reported content is final. We are not obligated to explain every moderation decision, but will notify affected parties where required by law.",
      },
    ],
  },
};
