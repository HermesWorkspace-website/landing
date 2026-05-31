export type LegalSlug =
  | 'privacy'
  | 'terms'
  | 'dpa'
  | 'information'
  | 'contact'
  | 'data-deletion'
  | 'parental-control';

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
          'HermesWorkspace may share data with hosting providers, notification services, analytics providers, and support partners. We do not sell personal data.',
      },
      {
        id: 'rights',
        title: '5. Rights and requests',
        content:
          'Users may request access, correction, export, or deletion through their school administrator or by contacting support@hermesworkspace.com.',
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
          'HermesWorkspace may engage service providers for hosting, storage, messaging, analytics, notifications, security, and support. Sub-processors are bound by obligations to protect personal data.',
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
};
