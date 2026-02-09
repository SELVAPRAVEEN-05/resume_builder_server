// =======================
// USERS
// =======================

Table users {
  id objectid [primary key]
  name varchar
  email varchar [unique]
  password varchar
  createdAt timestamp
}

// =======================
// RESUMES
// =======================

Table resumes {
  id objectid [primary key]
  userId objectid [not null]
  templateKey varchar   // eg: modern_1, classic_2
  objective text
  createdAt timestamp
  updatedAt timestamp
}

// =======================
// PERSONAL DETAILS
// =======================

Table personal_details {
  id objectid [primary key]
  resumeId objectid [not null]
  fullName varchar
  address varchar
  email varchar
  phone varchar
  website varchar
  linkedin varchar
  github varchar
  dateOfBirth date
  imageUrl varchar
}

// =======================
// EDUCATION MASTER TABLES
// =======================

Table colleges {
  id objectid [primary key]
  collegeName varchar
}

Table degrees {
  id objectid [primary key]
  degreeName varchar
}

Table specializations {
  id objectid [primary key]
  specializationName varchar
}

// =======================
// EDUCATION
// =======================

Table education {
  id objectid [primary key]
  resumeId objectid [not null]
  collegeId objectid [not null]
  degreeId objectid [not null]
  specializationId objectid [not null]
  grade float
  graduationYear int
  orderIndex int
}

// =======================
// SKILLS
// =======================

Table skills {
  id objectid [primary key]
  skillName varchar
}

Table resume_skills {
  id objectid [primary key]
  resumeId objectid [not null]
  skillId objectid [not null]
  orderIndex int
}

// =======================
// LANGUAGES
// =======================

Table languages {
  id objectid [primary key]
  languageName varchar
}

Table resume_languages {
  id objectid [primary key]
  resumeId objectid [not null]
  languageId objectid [not null]
  orderIndex int
}

// =======================
// COMPANIES
// =======================

Table companies {
  id objectid [primary key]
  companyName varchar
}

// =======================
// EXPERIENCE
// =======================

Table experience {
  id objectid [primary key]
  resumeId objectid [not null]
  companyId objectid [not null]
  jobTitle varchar
  startDate date
  endDate date
  description text
  orderIndex int
}

// =======================
// PROJECTS
// =======================

Table projects {
  id objectid [primary key]
  resumeId objectid [not null]
  title varchar
  description text
  techStack varchar
  orderIndex int
}

// =======================
// CERTIFICATIONS
// =======================

Table certifications {
  id objectid [primary key]
  resumeId objectid [not null]
  name varchar
  grade float
  date date
  link varchar
  description text
  orderIndex int
}

// =======================
// SECTION VISIBILITY & ORDER (TEMPLATE SUPPORT)
// =======================

Table resume_sections {
  id objectid [primary key]
  resumeId objectid [not null]
  sectionKey varchar   // education, skills, projects, etc
  isVisible boolean
  orderIndex int
}

// =======================
// RELATIONSHIPS
// =======================

Ref: users.id > resumes.userId

Ref: personal_details.resumeId > resumes.id

Ref: education.resumeId > resumes.id
Ref: education.collegeId > colleges.id
Ref: education.degreeId > degrees.id
Ref: education.specializationId > specializations.id

Ref: resume_skills.resumeId > resumes.id
Ref: resume_skills.skillId > skills.id

Ref: resume_languages.resumeId > resumes.id
Ref: resume_languages.languageId > languages.id

Ref: experience.resumeId > resumes.id
Ref: experience.companyId > companies.id

Ref: projects.resumeId > resumes.id
Ref: certifications.resumeId > resumes.id

Ref: resume_sections.resumeId > resumes.id
