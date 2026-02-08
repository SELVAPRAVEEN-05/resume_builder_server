// db schema
// Resume Builder Database Diagram (Normalized)

Table users {
  id objectid [primary key]
  name varchar
  email varchar [unique]
  password varchar
}

Table resumes {
  id objectid [primary key]
  userId objectid [not null]
  templateId objected
  objective text
}

Table templates {
  id objectid [primary key]
  name varchar
  description text
  filePath varchar [not null]
  isActive boolean
  previewUrl varchar
}


/* =======================
   Personal Details
======================= */

Table personalDetails {
  id objectid [primary key]
  resumeId objectid [not null]
  fullName varchar
  address varchar
  email varchar
  phone varchar
  website varchar
  linkedin varchar
  github varchar
  dateOfBirth varchar
  imageUrl varchar
}

/* =======================
   Colleges & Education
======================= */

Table colleges {
  id objectid [primary key]
  collegeName varchar
  degree varchar
  specialization varchar
}

Table education {
  id objectid [primary key]
  resumeId objectid [not null]
  collegeId objectid [not null]
  grade float
  graduationYear varchar
}

/* =======================
   Skills
======================= */

Table skills {
  id objectid [primary key]
  skillName varchar
}

Table resumeSkills {
  id objectid [primary key]
  resumeId objectid [not null]
  skillId objectid [not null]
}

/* =======================
   Languages
======================= */

Table languages {
  id objectid [primary key]
  languageName varchar
}

Table resumeLanguages {
  id objectid [primary key]
  resumeId objectid [not null]
  languageId objectid [not null]
}

/* =======================
   Companies & Experience
======================= */

Table companies {
  id objectid [primary key]
  companyName varchar
}

Table experience {
  id objectid [primary key]
  resumeId objectid [not null]
  companyId objectid [not null]
  jobTitle varchar
  startDate varchar
  endDate varchar
  description text
}

/* =======================
   Projects
======================= */

Table projects {
  id objectid [primary key]
  resumeId objectid [not null]
  title varchar
  description text
  techStack varchar
}

/* =======================
   Certifications
======================= */

Table certifications {
  id objectid [primary key]
  resumeId objectid [not null]
  name varchar
  grade float
  date varchar
  link varchar
  description text
}

/* =======================
   Relationships
======================= */


Ref: resumes.userId > users.id

Ref: personalDetails.resumeId > resumes.id

Ref: education.resumeId > resumes.id
Ref: education.collegeId > colleges.id

Ref: resumeSkills.resumeId > resumes.id
Ref: resumeSkills.skillId > skills.id

Ref: resumeLanguages.resumeId > resumes.id
Ref: resumeLanguages.languageId > languages.id
Ref: templates.id < templates.name

Ref: experience.resumeId > resumes.id
Ref: experience.companyId > companies.id

Ref: projects.resumeId > resumes.id
Ref: certifications.resumeId > resumes.id


Ref: templates.id < resumes.templateId
