const companies = [
  {
    id: "demo-company-asteron",
    name: "Asteron Engineering",
    website: "https://example.com",
    location: "Abu Dhabi, UAE",
    industry: "Engineering & Construction",
    size: "501–1,000 employees",
    vision: "Build resilient infrastructure that improves how cities work.",
    mission: "Deliver complex projects with disciplined engineering, clear communication, and accountable execution.",
    values: "Safety, ownership, clarity, continuous improvement",
  },
  {
    id: "demo-company-northline",
    name: "Northline Digital",
    website: "https://example.com",
    location: "Dubai, UAE",
    industry: "Software & Technology",
    size: "201–500 employees",
    vision: "Make business software quieter, faster, and easier to use.",
    mission: "Build focused digital products for operational teams across the region.",
    values: "Craft, simplicity, reliability, customer context",
  },
  {
    id: "demo-company-meridian",
    name: "Meridian Project Systems",
    website: "https://example.com",
    location: "Abu Dhabi, UAE",
    industry: "Project Management",
    size: "101–200 employees",
    vision: "Give project teams a clearer view of delivery risk.",
    mission: "Connect planning, controls, commercial data, and field execution in one operating model.",
    values: "Transparency, discipline, collaboration, measurable outcomes",
  },
  {
    id: "demo-company-orbit",
    name: "Orbit Energy Solutions",
    website: "https://example.com",
    location: "Sharjah, UAE",
    industry: "Energy & Utilities",
    size: "1,001–5,000 employees",
    vision: "Accelerate practical energy transformation across essential infrastructure.",
    mission: "Combine engineering capability with reliable operations and modern technology.",
    values: "Integrity, safety, stewardship, performance",
  },
];

const jobs = [
  {
    id: "demo-job-backend",
    companyId: "demo-company-northline",
    title: "Senior Backend Engineer",
    description: "Design and maintain reliable application services for operational products used by project and commercial teams. You will work closely with frontend engineers and product stakeholders to simplify workflows, improve API performance, and strengthen platform reliability.",
    requirements: "Strong backend engineering experience; practical knowledge of relational databases and API design; experience with automated testing and CI/CD; ability to communicate technical trade-offs clearly.",
    location: "Dubai, UAE",
    type: "full-time",
    experience: 5,
    education: "Bachelor's degree or equivalent professional experience",
    salary: "AED 20,000–26,000",
    deadline: new Date("2026-11-30T23:59:59+04:00"),
    available: true,
    createdAt: new Date("2026-09-30T09:00:00+04:00"),
  },
  {
    id: "demo-job-project-engineer",
    companyId: "demo-company-asteron",
    title: "Project Engineer",
    description: "Support multidisciplinary construction delivery from technical coordination through site execution. The role works across engineering, procurement, subcontractors, and field teams to keep deliverables aligned with programme and quality requirements.",
    requirements: "Construction project experience; confident coordination across technical disciplines; strong reporting and document-control habits; familiarity with project schedules and site workflows.",
    location: "Abu Dhabi, UAE",
    type: "full-time",
    experience: 4,
    education: "Bachelor's degree in Engineering",
    salary: "AED 14,000–18,000",
    deadline: new Date("2026-11-18T23:59:59+04:00"),
    available: true,
    createdAt: new Date("2026-10-01T08:30:00+04:00"),
  },
  {
    id: "demo-job-controls",
    companyId: "demo-company-meridian",
    title: "Project Controls Specialist",
    description: "Own reporting, schedule analysis, progress measurement, and management visibility for a portfolio of active projects. You will turn project data into clear decisions for project managers and commercial teams.",
    requirements: "Experience in planning or project controls; strong Excel and reporting skills; working knowledge of Primavera P6 or equivalent planning tools; ability to explain schedule and performance variances.",
    location: "Abu Dhabi, UAE",
    type: "full-time",
    experience: 5,
    education: "Engineering, Construction Management, or related degree",
    salary: "AED 16,000–21,000",
    deadline: new Date("2026-12-05T23:59:59+04:00"),
    available: true,
    createdAt: new Date("2026-09-28T10:15:00+04:00"),
  },
  {
    id: "demo-job-product",
    companyId: "demo-company-northline",
    title: "Product Designer",
    description: "Design clear enterprise workflows for users who spend their day managing projects, approvals, documents, and operational data. The role combines product thinking, interaction design, prototyping, and design-system ownership.",
    requirements: "Strong product design portfolio; experience with complex SaaS workflows; strong information architecture and interaction design fundamentals; comfortable working closely with engineers.",
    location: "Remote · UAE",
    type: "full-time",
    experience: 4,
    education: "Design degree preferred but not required",
    salary: "AED 17,000–22,000",
    deadline: new Date("2026-11-24T23:59:59+04:00"),
    available: true,
    createdAt: new Date("2026-09-27T14:00:00+04:00"),
  },
  {
    id: "demo-job-commercial",
    companyId: "demo-company-asteron",
    title: "Commercial Manager",
    description: "Lead commercial governance across active projects, including subcontract administration, cost reporting, change management, and contractual correspondence. Partner with delivery teams to maintain commercial discipline without slowing execution.",
    requirements: "Substantial construction commercial experience; contract administration capability; strong written communication; experience managing variations, claims, forecasting, and subcontractor accounts.",
    location: "Abu Dhabi, UAE",
    type: "full-time",
    experience: 8,
    education: "Quantity Surveying, Commercial Management, or related degree",
    salary: "AED 28,000–36,000",
    deadline: new Date("2026-12-12T23:59:59+04:00"),
    available: true,
    createdAt: new Date("2026-09-25T11:45:00+04:00"),
  },
  {
    id: "demo-job-data",
    companyId: "demo-company-orbit",
    title: "Data Analyst",
    description: "Build operational reporting and decision-support models across energy projects and service operations. You will work with business teams to improve data quality, define practical KPIs, and automate recurring analysis.",
    requirements: "Strong SQL and spreadsheet skills; experience with BI tools; practical understanding of data quality and KPI design; ability to communicate insights to non-technical stakeholders.",
    location: "Sharjah, UAE",
    type: "full-time",
    experience: 3,
    education: "Data, Engineering, Finance, or related discipline",
    salary: "AED 12,000–16,000",
    deadline: new Date("2026-11-20T23:59:59+04:00"),
    available: true,
    createdAt: new Date("2026-09-29T13:20:00+04:00"),
  },
  {
    id: "demo-job-frontend",
    companyId: "demo-company-northline",
    title: "Frontend Engineer",
    description: "Build responsive, accessible interfaces for a modern enterprise SaaS platform. Work with product design and backend teams to create fast, calm, information-dense workflows without unnecessary complexity.",
    requirements: "Strong React and modern JavaScript experience; solid CSS and accessibility fundamentals; experience building reusable component systems; attention to performance and interaction detail.",
    location: "Dubai, UAE",
    type: "contract",
    experience: 3,
    education: "Degree optional",
    salary: "AED 16,000–20,000",
    deadline: new Date("2026-11-15T23:59:59+04:00"),
    available: true,
    createdAt: new Date("2026-10-01T16:10:00+04:00"),
  },
  {
    id: "demo-job-graduate",
    companyId: "demo-company-meridian",
    title: "Graduate Planning Engineer",
    description: "Join the project controls team and learn practical planning, progress measurement, reporting, and schedule coordination across live projects.",
    requirements: "Recent engineering graduate; strong analytical mindset; good written communication; willingness to learn planning tools and project controls practices.",
    location: "Abu Dhabi, UAE",
    type: "internship",
    experience: 0,
    education: "Bachelor's degree in Engineering",
    salary: "AED 6,000–8,000",
    deadline: new Date("2026-12-20T23:59:59+04:00"),
    available: true,
    createdAt: new Date("2026-09-26T09:30:00+04:00"),
  },
];

function companyFor(companyId) {
  return companies.find((company) => company.id === companyId) || null;
}

function hydrateJob(job) {
  const company = companyFor(job.companyId);
  return company ? { ...job, company } : job;
}

export function getDemoJobs(filters = {}) {
  const search = String(filters.search || "").trim().toLowerCase();
  const location = String(filters.location || "").trim().toLowerCase();
  const type = String(filters.type || "").trim().toLowerCase();

  return jobs
    .filter((job) => {
      if (search) {
        const haystack = [job.title, job.description, companyFor(job.companyId)?.name]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(search)) return false;
      }

      if (location && !job.location.toLowerCase().includes(location)) return false;
      if (type && job.type.toLowerCase() !== type) return false;

      return job.available && job.deadline >= new Date();
    })
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(hydrateJob);
}

export function getDemoJob(jobId) {
  const job = jobs.find((item) => item.id === jobId);
  return job ? hydrateJob(job) : null;
}

export function getDemoCompanies() {
  return companies
    .map((company) => ({
      ...company,
      _count: {
        jobs: jobs.filter((job) => job.companyId === company.id && job.available).length,
      },
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getDemoCompany(companyId) {
  const company = companyFor(companyId);
  if (!company) return null;

  return {
    ...company,
    jobs: jobs
      .filter((job) => job.companyId === companyId && job.available && job.deadline >= new Date())
      .sort((a, b) => b.createdAt - a.createdAt),
  };
}
