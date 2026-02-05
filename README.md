db schema
Resume Builder Database Diagram (Normalized)

Table users {
  id objectid [primary key]
  name varchar
  email varchar [unique]
  password varchar
  created_at timestamp
  updated_at timestamp
}

Table resumes {
  id objectid [primary key]
  user_id objectid [not null]
  objective text
  created_at timestamp
  updated_at timestamp
}

/* =======================
   Personal Details
======================= */

Table personal_details {
  id objectid [primary key]
  resume_id objectid [not null]
  full_name varchar
  address varchar
  email varchar
  phone varchar
  website varchar
  linkedin varchar
  github varchar
  date_of_birth varchar
  image_url varchar
}

/* =======================
   Colleges & Education
======================= */

Table colleges {
  id objectid [primary key]
  college_name varchar
  degree varchar
  specialization varchar
}

Table education {
  id objectid [primary key]
  resume_id objectid [not null]
  college_id objectid [not null]
  grade float
  graduation_year varchar
}

/* =======================
   Skills
======================= */

Table skills {
  id objectid [primary key]
  skill_name varchar
}

Table resume_skills {
  id objectid [primary key]
  resume_id objectid [not null]
  skill_id objectid [not null]
}

/* =======================
   Languages
======================= */

Table languages {
  id objectid [primary key]
  language_name varchar
}

Table resume_languages {
  id objectid [primary key]
  resume_id objectid [not null]
  language_id objectid [not null]
}

/* =======================
   Companies & Experience
======================= */

Table companies {
  id objectid [primary key]
  company_name varchar
}

Table experience {
  id objectid [primary key]
  resume_id objectid [not null]
  company_id objectid [not null]
  job_title varchar
  start_date varchar
  end_date varchar
  description text
}

/* =======================
   Projects
======================= */

Table projects {
  id objectid [primary key]
  resume_id objectid [not null]
  title varchar
  description text
  tech_stack varchar
}

/* =======================
   Certifications
======================= */

Table certifications {
  id objectid [primary key]
  resume_id objectid [not null]
  name varchar
  grade float
  date varchar
  link varchar
  description text
}

/* =======================
   Relationships
======================= */

Ref: resumes.user_id > users.id

Ref: personal_details.resume_id > resumes.id

Ref: education.resume_id > resumes.id
Ref: education.college_id > colleges.id

Ref: resume_skills.resume_id > resumes.id
Ref: resume_skills.skill_id > skills.id

Ref: resume_languages.resume_id > resumes.id
Ref: resume_languages.language_id > languages.id

Ref: experience.resume_id > resumes.id
Ref: experience.company_id > companies.id

Ref: projects.resume_id > resumes.id
Ref: certifications.resume_id > resumes.id

