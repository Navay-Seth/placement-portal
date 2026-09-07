-- ============================================
-- COLLEGE PLACEMENT & RECRUITMENT PLATFORM
-- SQL Queries - V1
-- ============================================


-- ============================================
-- 1. DISPLAY ALL STUDENTS
-- ============================================

SELECT *
FROM student;


-- ============================================
-- 2. DISPLAY ALL OPEN JOBS
-- ============================================

SELECT *
FROM job
WHERE status = 'Open';


-- ============================================
-- 3. STUDENTS WITH CGPA ABOVE 8.5
-- ============================================

SELECT student_id, name, cgpa
FROM student
WHERE cgpa > 8.5
ORDER BY cgpa DESC;


-- ============================================
-- 4. STUDENTS WITH THEIR DEPARTMENT
-- ============================================

SELECT
    s.student_id,
    s.name,
    d.department_name,
    s.cgpa
FROM student s
JOIN department d
    ON s.department_id = d.department_id
ORDER BY s.cgpa DESC;


-- ============================================
-- 5. JOBS WITH COMPANY DETAILS
-- ============================================

SELECT
    j.job_id,
    j.job_title,
    c.company_name,
    j.location,
    j.salary,
    j.job_type,
    j.deadline
FROM job j
JOIN company c
    ON j.company_id = c.company_id
ORDER BY j.deadline;


-- ============================================
-- 6. RECRUITERS WITH THEIR COMPANIES
-- ============================================

SELECT
    r.recruiter_id,
    r.name AS recruiter_name,
    r.email,
    c.company_name
FROM recruiter r
JOIN company c
    ON r.company_id = c.company_id;


-- ============================================
-- 7. JOBS AND THEIR REQUIRED SKILLS
-- ============================================

SELECT
    j.job_title,
    s.skill_name
FROM job j
JOIN job_skill js
    ON j.job_id = js.job_id
JOIN skill s
    ON js.skill_id = s.skill_id
ORDER BY j.job_title, s.skill_name;

-- ============================================
-- 8. NUMBER OF STUDENTS IN EACH DEPARTMENT
-- ============================================

SELECT
    d.department_name,
    COUNT(s.student_id) AS student_count
FROM department d
LEFT JOIN student s
    ON d.department_id = s.department_id
GROUP BY d.department_id, d.department_name
ORDER BY student_count DESC;


-- ============================================
-- 9. AVERAGE CGPA OF EACH DEPARTMENT
-- ============================================

SELECT
    d.department_name,
    ROUND(AVG(s.cgpa), 2) AS average_cgpa
FROM department d
JOIN student s
    ON d.department_id = s.department_id
GROUP BY d.department_id, d.department_name
ORDER BY average_cgpa DESC;


-- ============================================
-- 10. NUMBER OF JOBS POSTED BY EACH COMPANY
-- ============================================

SELECT
    c.company_name,
    COUNT(j.job_id) AS total_jobs
FROM company c
LEFT JOIN job j
    ON c.company_id = j.company_id
GROUP BY c.company_id, c.company_name
ORDER BY total_jobs DESC;


-- ============================================
-- 11. NUMBER OF APPLICATIONS FOR EACH JOB
-- ============================================

SELECT
    j.job_title,
    c.company_name,
    COUNT(a.application_id) AS application_count
FROM job j
JOIN company c
    ON j.company_id = c.company_id
LEFT JOIN application a
    ON j.job_id = a.job_id
GROUP BY j.job_id, j.job_title, c.company_name
ORDER BY application_count DESC;


-- ============================================
-- 12. NUMBER OF APPLICATIONS BY STATUS
-- ============================================

SELECT
    status,
    COUNT(*) AS total_applications
FROM application
GROUP BY status
ORDER BY total_applications DESC;


-- ============================================
-- 13. COMPANIES WITH MORE THAN ONE JOB
-- ============================================

SELECT
    c.company_name,
    COUNT(j.job_id) AS total_jobs
FROM company c
JOIN job j
    ON c.company_id = j.company_id
GROUP BY c.company_id, c.company_name
HAVING COUNT(j.job_id) > 1
ORDER BY total_jobs DESC;


-- ============================================
-- 14. SKILLS REQUIRED BY MORE THAN ONE JOB
-- ============================================

SELECT
    s.skill_name,
    COUNT(js.job_id) AS jobs_requiring_skill
FROM skill s
JOIN job_skill js
    ON s.skill_id = js.skill_id
GROUP BY s.skill_id, s.skill_name
HAVING COUNT(js.job_id) > 1
ORDER BY jobs_requiring_skill DESC;

-- ============================================
-- 15. STUDENTS WITH CGPA ABOVE THE OVERALL
--     AVERAGE CGPA
-- ============================================

SELECT
    student_id,
    name,
    cgpa
FROM student
WHERE cgpa > (
    SELECT AVG(cgpa)
    FROM student
)
ORDER BY cgpa DESC;


-- ============================================
-- 16. HIGHEST CGPA STUDENT
-- ============================================

SELECT
    student_id,
    name,
    cgpa
FROM student
WHERE cgpa = (
    SELECT MAX(cgpa)
    FROM student
);


-- ============================================
-- 17. STUDENTS ELIGIBLE FOR A PARTICULAR JOB
--     BASED ON CGPA AND GRADUATION YEAR
-- ============================================

SELECT
    s.student_id,
    s.name,
    s.cgpa,
    s.graduation_year
FROM student s
JOIN job_eligibility je
    ON s.graduation_year = je.graduation_year
WHERE je.job_id = 1
  AND s.cgpa >= je.min_cgpa;


-- ============================================
-- 18. STUDENTS ELIGIBLE FOR EACH JOB
-- ============================================

SELECT
    j.job_title,
    s.name AS student_name,
    s.cgpa,
    s.graduation_year
FROM job j
JOIN job_eligibility je
    ON j.job_id = je.job_id
JOIN student s
    ON s.cgpa >= je.min_cgpa
   AND s.graduation_year = je.graduation_year
JOIN job_department jd
    ON j.job_id = jd.job_id
   AND s.department_id = jd.department_id
ORDER BY j.job_title, s.cgpa DESC;


-- ============================================
-- 19. STUDENTS WHO HAVE APPLIED FOR AT LEAST
--     ONE JOB
-- ============================================

SELECT
    s.student_id,
    s.name
FROM student s
WHERE EXISTS (
    SELECT 1
    FROM application a
    WHERE a.student_id = s.student_id
);


-- ============================================
-- 20. STUDENTS WHO HAVE NOT APPLIED FOR ANY JOB
-- ============================================

SELECT
    s.student_id,
    s.name
FROM student s
WHERE NOT EXISTS (
    SELECT 1
    FROM application a
    WHERE a.student_id = s.student_id
);


-- ============================================
-- 21. JOBS THAT HAVE AT LEAST ONE APPLICATION
-- ============================================

SELECT
    j.job_id,
    j.job_title
FROM job j
WHERE EXISTS (
    SELECT 1
    FROM application a
    WHERE a.job_id = j.job_id
);


-- ============================================
-- 22. JOBS WITH NO APPLICATIONS
-- ============================================

SELECT
    j.job_id,
    j.job_title
FROM job j
WHERE NOT EXISTS (
    SELECT 1
    FROM application a
    WHERE a.job_id = j.job_id
);

-- ============================================
-- 23. STUDENT APPLICATION HISTORY
-- ============================================

SELECT
    s.name AS student_name,
    j.job_title,
    c.company_name,
    a.application_date,
    a.status
FROM application a
JOIN student s
    ON a.student_id = s.student_id
JOIN job j
    ON a.job_id = j.job_id
JOIN company c
    ON j.company_id = c.company_id
ORDER BY a.application_date DESC;


-- ============================================
-- 24. SHORTLISTED CANDIDATES
-- ============================================

SELECT
    s.name AS student_name,
    j.job_title,
    c.company_name,
    s.cgpa
FROM application a
JOIN student s
    ON a.student_id = s.student_id
JOIN job j
    ON a.job_id = j.job_id
JOIN company c
    ON j.company_id = c.company_id
WHERE a.status = 'Shortlisted'
ORDER BY s.cgpa DESC;


-- ============================================
-- 25. SELECTED STUDENTS
-- ============================================

SELECT
    s.name AS student_name,
    j.job_title,
    c.company_name,
    a.application_date
FROM application a
JOIN student s
    ON a.student_id = s.student_id
JOIN job j
    ON a.job_id = j.job_id
JOIN company c
    ON j.company_id = c.company_id
WHERE a.status = 'Selected'
ORDER BY a.application_date;


-- ============================================
-- 26. INTERVIEW SCHEDULE
-- ============================================

SELECT
    s.name AS student_name,
    j.job_title,
    c.company_name,
    i.interview_date,
    i.interview_mode,
    i.status
FROM interview i
JOIN application a
    ON i.application_id = a.application_id
JOIN student s
    ON a.student_id = s.student_id
JOIN job j
    ON a.job_id = j.job_id
JOIN company c
    ON j.company_id = c.company_id
ORDER BY i.interview_date;


-- ============================================
-- 27. UPCOMING / SCHEDULED INTERVIEWS
-- ============================================

SELECT
    s.name AS student_name,
    j.job_title,
    c.company_name,
    i.interview_date,
    i.interview_mode
FROM interview i
JOIN application a
    ON i.application_id = a.application_id
JOIN student s
    ON a.student_id = s.student_id
JOIN job j
    ON a.job_id = j.job_id
JOIN company c
    ON j.company_id = c.company_id
WHERE i.status = 'Scheduled'
ORDER BY i.interview_date;


-- ============================================
-- 28. OFFER DETAILS
-- ============================================

SELECT
    s.name AS student_name,
    c.company_name,
    j.job_title,
    o.offer_date,
    o.salary,
    o.status
FROM offer o
JOIN application a
    ON o.application_id = a.application_id
JOIN student s
    ON a.student_id = s.student_id
JOIN job j
    ON a.job_id = j.job_id
JOIN company c
    ON j.company_id = c.company_id
ORDER BY o.offer_date;


-- ============================================
-- 29. ACCEPTED OFFERS
-- ============================================

SELECT
    s.name AS student_name,
    c.company_name,
    j.job_title,
    o.salary,
    o.offer_date
FROM offer o
JOIN application a
    ON o.application_id = a.application_id
JOIN student s
    ON a.student_id = s.student_id
JOIN job j
    ON a.job_id = j.job_id
JOIN company c
    ON j.company_id = c.company_id
WHERE o.status = 'Accepted'
ORDER BY o.salary DESC;


-- ============================================
-- 30. STUDENTS WHO RECEIVED AN OFFER
-- ============================================

SELECT DISTINCT
    s.student_id,
    s.name
FROM student s
JOIN application a
    ON s.student_id = a.student_id
JOIN offer o
    ON a.application_id = o.application_id;


-- ============================================
-- 31. NUMBER OF APPLICATIONS RECEIVED BY
--     EACH COMPANY
-- ============================================

SELECT
    c.company_name,
    COUNT(a.application_id) AS total_applications
FROM company c
JOIN job j
    ON c.company_id = j.company_id
LEFT JOIN application a
    ON j.job_id = a.job_id
GROUP BY c.company_id, c.company_name
ORDER BY total_applications DESC;


-- ============================================
-- 32. NUMBER OF SELECTED STUDENTS BY COMPANY
-- ============================================

SELECT
    c.company_name,
    COUNT(a.application_id) AS selected_students
FROM company c
JOIN job j
    ON c.company_id = j.company_id
JOIN application a
    ON j.job_id = a.job_id
WHERE a.status = 'Selected'
GROUP BY c.company_id, c.company_name
ORDER BY selected_students DESC;


-- ============================================
-- 33. AVERAGE OFFER SALARY BY COMPANY
-- ============================================

SELECT
    c.company_name,
    ROUND(AVG(o.salary), 2) AS average_offer_salary
FROM company c
JOIN job j
    ON c.company_id = j.company_id
JOIN application a
    ON j.job_id = a.job_id
JOIN offer o
    ON a.application_id = o.application_id
GROUP BY c.company_id, c.company_name
ORDER BY average_offer_salary DESC;


-- ============================================
-- 34. STUDENTS WITH THEIR SKILLS
-- ============================================

SELECT
    s.name AS student_name,
    STRING_AGG(sk.skill_name, ', ') AS skills
FROM student s
JOIN student_skill ss
    ON s.student_id = ss.student_id
JOIN skill sk
    ON ss.skill_id = sk.skill_id
GROUP BY s.student_id, s.name
ORDER BY s.name;


-- ============================================
-- 35. JOBS WITH THEIR REQUIRED SKILLS
-- ============================================

SELECT
    j.job_title,
    STRING_AGG(sk.skill_name, ', ') AS required_skills
FROM job j
JOIN job_skill js
    ON j.job_id = js.job_id
JOIN skill sk
    ON js.skill_id = sk.skill_id
GROUP BY j.job_id, j.job_title
ORDER BY j.job_title;


-- ============================================
-- 36. STUDENTS WHO HAVE ALL THE REQUIRED
--     SKILLS FOR A PARTICULAR JOB
-- ============================================

SELECT
    s.student_id,
    s.name
FROM student s
WHERE NOT EXISTS (
    SELECT 1
    FROM job_skill js
    WHERE js.job_id = 1
      AND NOT EXISTS (
          SELECT 1
          FROM student_skill ss
          WHERE ss.student_id = s.student_id
            AND ss.skill_id = js.skill_id
      )
);


-- ============================================
-- 37. NUMBER OF SKILLS MATCHED BY EACH STUDENT
--     FOR A PARTICULAR JOB
-- ============================================

SELECT
    s.student_id,
    s.name,
    COUNT(ss.skill_id) AS matched_skills
FROM student s
JOIN student_skill ss
    ON s.student_id = ss.student_id
JOIN job_skill js
    ON ss.skill_id = js.skill_id
WHERE js.job_id = 1
GROUP BY s.student_id, s.name
ORDER BY matched_skills DESC;


-- ============================================
-- 38. BEST SKILL MATCHES FOR A PARTICULAR JOB
--     WITH MATCH PERCENTAGE
-- ============================================

SELECT
    s.student_id,
    s.name,
    COUNT(DISTINCT ss.skill_id) AS matched_skills,
    (
        SELECT COUNT(*)
        FROM job_skill
        WHERE job_id = 1
    ) AS total_required_skills,
    ROUND(
        COUNT(DISTINCT ss.skill_id) * 100.0 /
        (
            SELECT COUNT(*)
            FROM job_skill
            WHERE job_id = 1
        ),
        2
    ) AS match_percentage
FROM student s
JOIN student_skill ss
    ON s.student_id = ss.student_id
JOIN job_skill js
    ON ss.skill_id = js.skill_id
WHERE js.job_id = 1
GROUP BY s.student_id, s.name
ORDER BY match_percentage DESC;


-- ============================================
-- 39. STUDENTS WHO ARE ELIGIBLE AND HAVE
--     AT LEAST ONE REQUIRED SKILL
-- ============================================

SELECT DISTINCT
    s.student_id,
    s.name,
    s.cgpa,
    s.graduation_year
FROM student s
JOIN job_eligibility je
    ON s.cgpa >= je.min_cgpa
   AND s.graduation_year = je.graduation_year
JOIN job_department jd
    ON s.department_id = jd.department_id
   AND je.job_id = jd.job_id
JOIN student_skill ss
    ON s.student_id = ss.student_id
JOIN job_skill js
    ON ss.skill_id = js.skill_id
   AND js.job_id = je.job_id
WHERE je.job_id = 1;


-- ============================================
-- 40. STUDENTS WITH THE HIGHEST NUMBER
--     OF SKILLS
-- ============================================

SELECT
    s.student_id,
    s.name,
    COUNT(ss.skill_id) AS skill_count
FROM student s
LEFT JOIN student_skill ss
    ON s.student_id = ss.student_id
GROUP BY s.student_id, s.name
ORDER BY skill_count DESC;

