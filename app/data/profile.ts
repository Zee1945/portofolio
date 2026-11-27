// ─────────────────────────────────────────────────────────────
//  Semua konten website ada di file ini.
//  Ganti teks, link, dan project di bawah dengan data kamu sendiri.
// ─────────────────────────────────────────────────────────────

export type IconName =
  | 'github' | 'linkedin' | 'instagram' | 'mail' | 'arrow-right' | 'arrow-up-right'
  | 'sun' | 'moon' | 'menu' | 'x' | 'download' | 'map-pin' | 'copy' | 'check' | 'code' | 'arrow-up' | 'briefcase' | 'building' | 'users'

export interface Project {
  title: string
  /** Company or client the project was built for */
  client: string
  /** Your role on the project */
  role: string
  description: string
  /** Shown in the project detail popup */
  highlights: string[]
  tags: string[]
  /** Warna latar thumbnail kalau belum ada screenshot */
  color: string
  /** Path screenshot di folder /public, contoh: '/projects/sirapel.webp' */
  image?: string
  demo?: string
  repo?: string
  featured?: boolean
}

export interface Experience {
  period: string
  role: string
  type: string
  company: string
  location: string
  highlights: string[]
  tags: string[]
  current?: boolean
}

export const profile = {
  name: 'Zul Fachrie',
  shortName: 'Zul',
  handle: 'zulfachrie.dev',
  initials: 'ZF',
  role: 'Full Stack Web Developer',
  location: 'Jakarta, Indonesia',
  available: true,
  availableText: 'Open to new opportunities',
  tagline:
    'Full Stack Web Developer with 4 years of experience building end-to-end apps for document management, approval workflows, and ERP.',
  email: 'zulfahrie12@gmail.com',
  /** Taruh file PDF di /public lalu isi misal '/resume.pdf'. Kosongkan untuk menyembunyikan tombol. */
  resumeUrl: '',
  /** Foto profil di /public, contoh '/avatar.webp'. Kosongkan untuk menampilkan inisial. */
  avatar: '',

  socials: [
    { label: 'GitHub', href: 'https://github.com/', icon: 'github' }, // TODO: link GitHub kamu
    { label: 'LinkedIn', href: 'https://linkedin.com/in/', icon: 'linkedin' }, // TODO: link LinkedIn kamu
  ] satisfies { label: string; href: string; icon: IconName }[],

  heroStack: ['Laravel', 'Vue', 'PostgreSQL'],
  /** Words that rotate at the end of the hero headline. Keep them short (≤ 16 characters). */
  heroWords: ['simple workflows', 'fast approvals', 'tidy documents'],

  /** Filter buttons above the projects. A project matches if one of its tags starts with the filter. */
  projectFilters: ['Laravel', 'Livewire', 'CodeIgniter', 'Ember.js', 'PostgreSQL', 'MySQL'],

  about: [
    "I'm a full stack web developer based in Surabaya. For the past 4 years I've been building end-to-end apps that replace slow, paper-heavy processes: document management, approval flows, correspondence tracking, and ERP.",
    "I like owning the whole journey: gathering requirements with clients, designing the database, building the backend and UI, then deploying and maintaining it on the server. Laravel, CodeIgniter 4, Ember.js, Vue.js, and PostgreSQL are my daily tools.",
  ],

  stats: [
    { value: '4+', label: 'Years of experience', icon: 'briefcase' },
    { value: '30+', label: 'SaaS tenants served', icon: 'building' },
    { value: '800+', label: 'Active users on my apps', icon: 'users' },
  ] satisfies { value: string; label: string; icon: IconName }[],

  currently:
    'Building SaaS document systems at PT. Integra Teknologi Solusi and freelancing on approval apps.',

  stack: {
    Backend: ['PHP', 'Laravel', 'CodeIgniter', 'RESTful API', 'Swagger', 'SQL'],
    Frontend: ['JavaScript', 'Vue.js', 'Ember.js', 'Livewire', 'Next.js', 'Tailwind', 'Bootstrap'],
    'Data & DevOps': ['PostgreSQL', 'MySQL', 'MinIO S3', 'Docker', 'CI/CD', 'Nginx', 'Linux / VPS'],
  } as Record<string, string[]>,

  projects: [
    {
      title: 'SIRAPEL UIN SUKA',
      client: 'CV. Azco Indo Karya',
      role: 'Lead developer (end to end)',
      description:
        'Approval & document generator for UIN Sunan Kalijaga Yogyakarta. Automates proposals, correspondence, and financial accountability reports (LPJ), turning a weeks-long manual process into a digital workflow for 40+ users and 200+ workshop programs. I led it end to end, from requirements and database design to VPS deployment.',
      highlights: [
        'Planned and analysed the Business Requirements Specification (BRS) and turned it into system workflows and user journeys.',
        'Designed the database structure and built the app with Laravel 12 and Livewire 3, including role-based access control.',
        'Integrated OnlyOffice for PDF conversion and MinIO for object storage, with cron jobs for background document processing.',
        'Handled server setup, domain, deployment, and ongoing maintenance on a VPS.',
      ],
      tags: ['Laravel 12', 'Livewire 3', 'MySQL', 'Docker', 'MinIO', 'OnlyOffice'],
      color: '#4361EE',
      featured: true,
    },
    {
      title: 'Inoffice Neo',
      client: 'PT. Integra Teknologi Solusi',
      role: 'Full stack developer',
      description:
        'SaaS for mail and correspondence monitoring. Built frontend and backend features, and designed RESTful APIs following the JSON:API standard, consumed through Ember Data.',
      highlights: [
        'Built frontend and backend features based on client requirements.',
        'Translated stakeholder needs into technical requirements, user flows, and system architecture.',
        'Designed RESTful APIs following the JSON:API standard and integrated them with Ember Data.',
      ],
      tags: ['Ember.js', 'CodeIgniter 4', 'PostgreSQL', 'Docker'],
      color: '#475569',
    },
    {
      title: 'DocSys',
      client: 'PT. Integra Teknologi Solusi',
      role: 'Full stack developer',
      description:
        'Document system with a Google Drive-style file manager: view, copy, move, and browse every document and folder.',
      highlights: [
        'Developed the file manager module so users can view, copy, move, and browse documents and folders like in Google Drive.',
        'Built on a modular Laravel 11 architecture with Livewire 3.',
      ],
      tags: ['Laravel 11', 'Livewire 3', 'Bootstrap'],
      color: '#B45309',
    },
    {
      title: 'DISMT PLN',
      client: 'PT. Integra Teknologi Solusi',
      role: 'Full stack developer',
      description:
        'Work-procedure document browser for PLN with search and filters by date, work unit, document type, and approval status, plus a responsive UI for every device.',
      highlights: [
        'Built the browse module to find work-procedure documents with search and filters by date, work unit, document type, and approval status.',
        'Made the frontend responsive so it works well on every device.',
      ],
      tags: ['Laravel 9', 'Livewire 2', 'PostgreSQL'],
      color: '#047857',
    },
    {
      title: 'SCM APG BUMN',
      client: 'PT. Nusa Teknologi Inovasi',
      role: 'Junior programmer',
      description:
        'Supply chain modules for a state-owned company: bulk Excel import/export for purchase orders and subcontractor comparisons, plus a dynamic PDF invoice generator.',
      highlights: [
        'Built custom Excel ↔ SQL import and export for Purchase Order, Analysis, Statement, and subcontractor comparison modules, so data updates in one action.',
        'Designed an HTML purchase order invoice template that matches the company\'s existing invoices.',
        'Generated Excel reports of subcontractor winners for the company archive.',
      ],
      tags: ['Laravel 8', 'Bootstrap', 'MySQL'],
      color: '#6D28D9',
    },
  ] as Project[],

  experience: [
    {
      period: 'Jan 2025 — Now',
      role: 'Software Engineer',
      type: 'Freelance',
      company: 'CV. Azco Indo Karya',
      location: 'Serang',
      highlights: [
        'Led end-to-end development of a document submission and reporting system, cutting manual processing from weeks to a streamlined digital workflow for 40+ users.',
        'Built it from scratch: database design, role-based access control, and two core modules, with OnlyOffice for PDF conversion and MinIO for storage.',
        'Deployed and run it on a VPS (Git, Nginx, cron jobs for background document processing), and work directly with the client on requirements and demos.',
      ],
      tags: ['Laravel', 'Livewire', 'MinIO', 'Nginx'],
      current: true,
    },
    {
      period: 'Aug 2023 — Oct 2026',
      role: 'Full Stack Web Developer',
      type: 'Contract',
      company: 'PT. Integra Teknologi Solusi',
      location: 'Surabaya',
      highlights: [
        'Develop a SaaS app serving 30+ tenants and 800+ active users, and helped migrate it from a monolith to an SPA + API architecture.',
        'Build custom features for tenant needs and improve performance by optimizing database queries.',
        'Do R&D on technical solutions and work with QA and project leads on testing and planning.',
      ],
      tags: ['Ember.js', 'CodeIgniter 4', 'Laravel', 'PostgreSQL'],
      current: false,
    },
    {
      period: 'Jan 2023 — Aug 2023',
      role: 'Full Stack Web Developer',
      type: 'Freelance',
      company: 'DosenDeso',
      location: 'Malang',
      highlights: [
        'Built the scheduling feature for a civil-servant exam prep course platform, working closely with the CEO and a senior programmer.',
        'Maintained the existing website and handled backend and frontend fixes.',
      ],
      tags: ['Laravel', 'Vue.js', 'Vuetify', 'MySQL'],
    },
    {
      period: 'Nov 2021 — Apr 2022',
      role: 'Junior Programmer',
      type: 'Contract',
      company: 'PT. Nusa Teknologi Inovasi',
      location: 'Remote',
      highlights: [
        'Built bulk data import from Excel uploads, making data entry much faster.',
        'Created a dynamic PDF invoice generator and turned HTML templates into app UI.',
      ],
      tags: ['Laravel', 'Bootstrap', 'MySQL'],
    },
    {
      period: 'May 2020 — Jul 2020',
      role: 'Project Lead & Backend Developer',
      type: 'Internship',
      company: 'Faculty of Dentistry, Brawijaya University',
      location: 'Malang',
      highlights: [
        'Led a team of 6 to build and deploy a lecturer profile system that helps external companies find lecturers by specialization.',
        'Gathered requirements with stakeholders and built core backend features.',
      ],
      tags: ['CodeIgniter 4', 'MySQL'],
    },
  ] as Experience[],

  education: {
    school: 'UIN Maulana Malik Ibrahim Malang',
    degree: 'Bachelor of Informatics Engineering',
    period: '2018 — 2022',
    note: 'GPA 3.51 / 4.00, Cum Laude',
  },

  achievements: [
    { title: '1st Place, National Scientific Research', issuer: 'Tracival Untirta', year: '' },
    { title: 'Full-Stack Laravel 11 & Next.js 14: Web Rent House', issuer: 'BuildWithAngga', year: '2025' },
    { title: 'Full-Stack Web Developer (Laravel)', issuer: 'BuildWithAngga', year: '2023' },
  ],
}
