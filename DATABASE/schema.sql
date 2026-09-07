-- ============================================
-- COLLEGE PLACEMENT & RECRUITMENT PLATFORM
-- Database Schema - V1
-- ============================================


-- 1. DEPARTMENT
CREATE TABLE department (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE
);


-- 2. STUDENT
CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    department_id INT NOT NULL,
    cgpa DECIMAL(4,2),
    graduation_year INT NOT NULL,

    CONSTRAINT fk_student_department
        FOREIGN KEY (department_id)
        REFERENCES department(department_id),

    CONSTRAINT chk_student_cgpa
        CHECK (cgpa >= 0 AND cgpa <= 10)
);


-- 3. SKILL
CREATE TABLE skill (
    skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR(100) NOT NULL UNIQUE
);


-- 4. STUDENT_SKILL
CREATE TABLE student_skill (
    student_id INT NOT NULL,
    skill_id INT NOT NULL,

    PRIMARY KEY (student_id, skill_id),

    FOREIGN KEY (student_id)
        REFERENCES student(student_id)
        ON DELETE CASCADE,

    FOREIGN KEY (skill_id)
        REFERENCES skill(skill_id)
        ON DELETE CASCADE
);


-- 5. COMPANY
CREATE TABLE company (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(150) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    website VARCHAR(255)
);


-- 6. RECRUITER
CREATE TABLE recruiter (
    recruiter_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    company_id INT NOT NULL,

    FOREIGN KEY (company_id)
        REFERENCES company(company_id)
        ON DELETE CASCADE
);


-- 7. JOB
CREATE TABLE job (
    job_id SERIAL PRIMARY KEY,
    job_title VARCHAR(150) NOT NULL,
    description TEXT,
    company_id INT NOT NULL,
    recruiter_id INT NOT NULL,
    location VARCHAR(150),
    salary DECIMAL(12,2),
    job_type VARCHAR(50) NOT NULL,
    deadline DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Open',

    FOREIGN KEY (company_id)
        REFERENCES company(company_id),

    FOREIGN KEY (recruiter_id)
        REFERENCES recruiter(recruiter_id),

    CONSTRAINT chk_job_salary
        CHECK (salary >= 0),

    CONSTRAINT chk_job_status
        CHECK (status IN ('Open', 'Closed'))
);


-- 8. JOB_SKILL
CREATE TABLE job_skill (
    job_id INT NOT NULL,
    skill_id INT NOT NULL,

    PRIMARY KEY (job_id, skill_id),

    FOREIGN KEY (job_id)
        REFERENCES job(job_id)
        ON DELETE CASCADE,

    FOREIGN KEY (skill_id)
        REFERENCES skill(skill_id)
        ON DELETE CASCADE
);


-- 9. JOB_ELIGIBILITY
CREATE TABLE job_eligibility (
    eligibility_id SERIAL PRIMARY KEY,
    job_id INT NOT NULL UNIQUE,
    min_cgpa DECIMAL(4,2),
    graduation_year INT,

    FOREIGN KEY (job_id)
        REFERENCES job(job_id)
        ON DELETE CASCADE,

    CONSTRAINT chk_min_cgpa
        CHECK (min_cgpa >= 0 AND min_cgpa <= 10)
);


-- 10. JOB_DEPARTMENT
CREATE TABLE job_department (
    job_id INT NOT NULL,
    department_id INT NOT NULL,

    PRIMARY KEY (job_id, department_id),

    FOREIGN KEY (job_id)
        REFERENCES job(job_id)
        ON DELETE CASCADE,

    FOREIGN KEY (department_id)
        REFERENCES department(department_id)
        ON DELETE CASCADE
);


-- 11. APPLICATION
CREATE TABLE application (
    application_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    job_id INT NOT NULL,
    application_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(30) NOT NULL DEFAULT 'Applied',

    FOREIGN KEY (student_id)
        REFERENCES student(student_id)
        ON DELETE CASCADE,

    FOREIGN KEY (job_id)
        REFERENCES job(job_id)
        ON DELETE CASCADE,

    CONSTRAINT chk_application_status
        CHECK (status IN ('Applied', 'Shortlisted', 'Rejected', 'Selected')),

    CONSTRAINT unique_student_job
        UNIQUE (student_id, job_id)
);


-- 12. INTERVIEW
CREATE TABLE interview (
    interview_id SERIAL PRIMARY KEY,
    application_id INT NOT NULL,
    interview_date TIMESTAMP NOT NULL,
    interview_mode VARCHAR(30),
    status VARCHAR(30),

    FOREIGN KEY (application_id)
        REFERENCES application(application_id)
        ON DELETE CASCADE
);


-- 13. OFFER
CREATE TABLE offer (
    offer_id SERIAL PRIMARY KEY,
    application_id INT NOT NULL UNIQUE,
    offer_date DATE NOT NULL,
    salary DECIMAL(12,2) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Offered',

    FOREIGN KEY (application_id)
        REFERENCES application(application_id)
        ON DELETE CASCADE,

    CONSTRAINT chk_offer_salary
        CHECK (salary >= 0),

    CONSTRAINT chk_offer_status
        CHECK (status IN ('Offered', 'Accepted', 'Rejected'))
);


-- 14. ADMIN
CREATE TABLE admin (
    admin_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);