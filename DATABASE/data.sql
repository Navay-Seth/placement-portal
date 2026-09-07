-- ============================================
-- COLLEGE PLACEMENT & RECRUITMENT PLATFORM
-- Sample Data - V1
-- ============================================


-- ============================================
-- 1. DEPARTMENT
-- ============================================

INSERT INTO department (department_name) VALUES
('Computer Science and Engineering'),
('Information Technology'),
('Electronics and Communication Engineering'),
('Mechanical Engineering'),
('Electrical Engineering');


-- ============================================
-- 2. SKILL
-- ============================================

INSERT INTO skill (skill_name) VALUES
('C++'),
('Java'),
('Python'),
('JavaScript'),
('React'),
('Node.js'),
('SQL'),
('PostgreSQL'),
('MongoDB'),
('Data Structures'),
('Algorithms'),
('Machine Learning'),
('Git'),
('AWS'),
('Docker');


-- ============================================
-- 3. STUDENT
-- ============================================

INSERT INTO student
(name, email, password, phone, department_id, cgpa, graduation_year)
VALUES
('Aarav Sharma', 'aarav.sharma@college.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9876543210', 1, 8.72, 2027),

('Riya Patel', 'riya.patel@college.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9876543211', 2, 9.10, 2027),

('Arjun Mehta', 'arjun.mehta@college.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9876543212', 1, 7.85, 2026),

('Ananya Singh', 'ananya.singh@college.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9876543213', 3, 8.45, 2027),

('Kabir Verma', 'kabir.verma@college.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9876543214', 4, 7.40, 2026),

('Ishita Rao', 'ishita.rao@college.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9876543215', 2, 8.90, 2027),

('Vihaan Kapoor', 'vihaan.kapoor@college.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9876543216', 5, 8.15, 2027),

('Meera Nair', 'meera.nair@college.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '9876543217', 1, 9.35, 2027);


-- ============================================
-- 4. STUDENT_SKILL
-- ============================================

INSERT INTO student_skill (student_id, skill_id) VALUES
-- Aarav
(1, 1),
(1, 3),
(1, 7),
(1, 10),
(1, 11),
(1, 13),

-- Riya
(2, 3),
(2, 4),
(2, 5),
(2, 7),
(2, 8),
(2, 13),

-- Arjun
(3, 1),
(3, 2),
(3, 7),
(3, 10),
(3, 11),

-- Ananya
(4, 3),
(4, 4),
(4, 5),
(4, 12),
(4, 13),

-- Kabir
(5, 1),
(5, 7),
(5, 10),
(5, 15),

-- Ishita
(6, 3),
(6, 4),
(6, 5),
(6, 6),
(6, 7),
(6, 13),
(6, 14),

-- Vihaan
(7, 1),
(7, 2),
(7, 7),
(7, 10),
(7, 11),

-- Meera
(8, 3),
(8, 4),
(8, 5),
(8, 7),
(8, 8),
(8, 12),
(8, 13),
(8, 14);


-- ============================================
-- 5. COMPANY
-- ============================================

INSERT INTO company
(company_name, email, website)
VALUES
('TechNova Solutions', 'hr@technova.com', 'https://www.technova.com'),
('CloudSphere Technologies', 'careers@cloudsphere.com', 'https://www.cloudsphere.com'),
('FinEdge Systems', 'recruitment@finedge.com', 'https://www.finedge.com'),
('AutoCore Industries', 'jobs@autocore.com', 'https://www.autocore.com');


-- ============================================
-- 6. RECRUITER
-- ============================================

INSERT INTO recruiter
(name, email, password, company_id)
VALUES
('Rahul Malhotra', 'rahul@technova.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 1),

('Sneha Kapoor', 'sneha@cloudsphere.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 2),

('Karan Shah', 'karan@finedge.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 3),

('Neha Joshi', 'neha@autocore.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 4);


-- ============================================
-- 7. JOB
-- ============================================

INSERT INTO job
(job_title, description, company_id, recruiter_id, location, salary, job_type, deadline, status)
VALUES
(
    'Software Development Engineer',
    'Develop scalable software applications and backend services.',
    1,
    1,
    'Bangalore',
    900000,
    'Full-Time',
    '2026-09-30',
    'Open'
),

(
    'Frontend Developer',
    'Build responsive and interactive web applications using modern frontend technologies.',
    2,
    2,
    'Hyderabad',
    750000,
    'Full-Time',
    '2026-10-05',
    'Open'
),

(
    'Data Analyst',
    'Analyze business data and generate actionable insights using SQL and Python.',
    3,
    3,
    'Mumbai',
    700000,
    'Full-Time',
    '2026-09-25',
    'Open'
),

(
    'Cloud Engineer',
    'Design and maintain cloud infrastructure and deployment pipelines.',
    2,
    2,
    'Pune',
    850000,
    'Full-Time',
    '2026-10-10',
    'Open'
),

(
    'Graduate Engineer Trainee',
    'Engineering trainee position involving product development and technical operations.',
    4,
    4,
    'Chennai',
    600000,
    'Full-Time',
    '2026-09-20',
    'Open'
);


-- ============================================
-- 8. JOB_SKILL
-- ============================================

INSERT INTO job_skill (job_id, skill_id) VALUES
-- Software Development Engineer
(1, 1),
(1, 3),
(1, 7),
(1, 10),
(1, 11),
(1, 13),

-- Frontend Developer
(2, 4),
(2, 5),
(2, 7),
(2, 13),

-- Data Analyst
(3, 3),
(3, 7),
(3, 12),

-- Cloud Engineer
(4, 3),
(4, 13),
(4, 14),
(4, 15),

-- Graduate Engineer Trainee
(5, 1),
(5, 7),
(5, 10);


-- ============================================
-- 9. JOB_ELIGIBILITY
-- ============================================

INSERT INTO job_eligibility
(job_id, min_cgpa, graduation_year)
VALUES
(1, 7.50, 2027),
(2, 8.00, 2027),
(3, 7.00, 2027),
(4, 8.00, 2027),
(5, 7.00, 2026);


-- ============================================
-- 10. JOB_DEPARTMENT
-- ============================================

INSERT INTO job_department (job_id, department_id) VALUES
-- SDE
(1, 1),
(1, 2),

-- Frontend Developer
(2, 1),
(2, 2),
(2, 3),

-- Data Analyst
(3, 1),
(3, 2),

-- Cloud Engineer
(4, 1),
(4, 2),

-- Graduate Engineer Trainee
(5, 1),
(5, 3),
(5, 4),
(5, 5);


-- ============================================
-- 11. APPLICATION
-- ============================================

INSERT INTO application
(student_id, job_id, application_date, status)
VALUES
-- Aarav
(1, 1, '2026-09-01', 'Shortlisted'),
(1, 4, '2026-09-02', 'Applied'),

-- Riya
(2, 2, '2026-09-01', 'Selected'),
(2, 3, '2026-09-03', 'Shortlisted'),

-- Arjun
(3, 1, '2026-08-28', 'Rejected'),
(3, 5, '2026-09-01', 'Applied'),

-- Ananya
(4, 2, '2026-09-02', 'Shortlisted'),

-- Kabir
(5, 5, '2026-09-01', 'Applied'),

-- Ishita
(6, 2, '2026-09-01', 'Selected'),
(6, 4, '2026-09-02', 'Shortlisted'),

-- Vihaan
(7, 5, '2026-09-03', 'Applied'),

-- Meera
(8, 1, '2026-09-01', 'Selected'),
(8, 3, '2026-09-02', 'Shortlisted');


-- ============================================
-- 12. INTERVIEW
-- ============================================

INSERT INTO interview
(application_id, interview_date, interview_mode, status)
VALUES
(1, '2026-09-10 10:00:00', 'Online', 'Scheduled'),
(3, '2026-09-11 11:00:00', 'Online', 'Completed'),
(4, '2026-09-12 14:00:00', 'Online', 'Scheduled'),
(7, '2026-09-13 10:30:00', 'Offline', 'Scheduled'),
(9, '2026-09-14 15:00:00', 'Online', 'Completed'),
(11, '2026-09-15 11:00:00', 'Offline', 'Scheduled'),
(13, '2026-09-16 12:00:00', 'Online', 'Completed');


-- ============================================
-- 13. OFFER
-- ============================================

INSERT INTO offer
(application_id, offer_date, salary, status)
VALUES
(3, '2026-09-15', 750000, 'Accepted'),
(9, '2026-09-16', 850000, 'Offered'),
(12, '2026-09-17', 900000, 'Accepted');


-- ============================================
-- 14. ADMIN
-- ============================================

INSERT INTO admin
(name, email, password)
VALUES
('Placement Admin', 'admin@college.edu',
 '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');