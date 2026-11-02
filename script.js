/**
 * ==============================================================================
 * Student Management System (SMS) - Vanilla JavaScript (ES6+)
 * Smart Student Administration & Academic Management Platform
 * BSIT University Web Technology Project
 * ==============================================================================
 */

(function () {
  'use strict';

  /* ============================================================================
     STORAGE KEYS & CONSTANTS
     ============================================================================ */
  const KEYS = {
    STUDENTS: 'SMS_STUDENTS',
    TEACHERS: 'SMS_TEACHERS',
    DEPARTMENTS: 'SMS_DEPARTMENTS',
    CLASSES: 'SMS_CLASSES',
    ATTENDANCE: 'SMS_ATTENDANCE',
    EXAMS: 'SMS_EXAMS',
    RESULTS: 'SMS_RESULTS',
    FEES: 'SMS_FEES',
    TIMETABLE: 'SMS_TIMETABLE',
    NOTIFICATIONS: 'SMS_NOTIFICATIONS',
    AUTH: 'SMS_CURRENT_USER',
    THEME: 'SMS_APP_THEME',
    PROFILE: 'SMS_ADMIN_PROFILE',
  };

  /* ============================================================================
     REALISTIC INITIAL DEMO DATA SEED
     ============================================================================ */
  const INITIAL_DEPARTMENTS = [
    {
      id: 'BSIT',
      name: 'Department of Information Technology',
      head: 'Prof. Dr. Tariq Mahmood',
      desc: 'Focuses on Cloud Systems, Web Engineering, Cybersecurity, and Software Architecture.'
    },
    {
      id: 'BSCS',
      name: 'Department of Computer Science',
      head: 'Dr. Imran Rasheed',
      desc: 'Specializes in Algorithms, Artificial Intelligence, Machine Learning, and Theory.'
    },
    {
      id: 'BBA',
      name: 'Faculty of Business Administration',
      head: 'Engr. Sara Qureshi',
      desc: 'Management Information Systems, Marketing, Corporate Finance, and Entrepreneurship.'
    },
    {
      id: 'English',
      name: 'Department of English & Linguistics',
      head: 'Ms. Hina Bukhari',
      desc: 'Advanced Professional Communication, Technical Writing, and Literature.'
    },
    {
      id: 'Mathematics',
      name: 'Department of Mathematics & Statistics',
      head: 'Prof. Kamran Shah',
      desc: 'Discrete Mathematics, Linear Algebra, Calculus, and Data Modeling.'
    }
  ];

  const INITIAL_TEACHERS = [
    {
      id: 'TCH-101',
      name: 'Prof. Dr. Tariq Mahmood',
      fatherName: 'Mahmood Ali',
      gender: 'Male',
      dept: 'BSIT',
      qualification: 'Ph.D in Software Engineering',
      subject: 'Web Technologies & Cloud Computing',
      phone: '+92 321 9876543',
      email: 'tariq@sms.com',
      joiningDate: '2018-09-01',
      salary: 4500,
      status: 'Active',
      address: 'Faculty Enclave, Sector F-8, Islamabad'
    },
    {
      id: 'TCH-102',
      name: 'Engr. Sara Qureshi',
      fatherName: 'Qureshi Akhtar',
      gender: 'Female',
      dept: 'BSIT',
      qualification: 'MS in Information Systems',
      subject: 'Database Systems & SQL',
      phone: '+92 333 4455667',
      email: 'sara@sms.com',
      joiningDate: '2020-02-15',
      salary: 3800,
      status: 'Active',
      address: 'University Road, Block 4, Lahore'
    },
    {
      id: 'TCH-103',
      name: 'Dr. Imran Rasheed',
      fatherName: 'Rasheed Khan',
      gender: 'Male',
      dept: 'BSCS',
      qualification: 'Ph.D in Computer Science',
      subject: 'Data Structures & Algorithms',
      phone: '+92 300 8765432',
      email: 'imran@sms.com',
      joiningDate: '2016-08-10',
      salary: 4800,
      status: 'Active',
      address: 'Hayatabad Phase 3, Peshawar'
    },
    {
      id: 'TCH-104',
      name: 'Ms. Hina Bukhari',
      fatherName: 'Syed Bukhari',
      gender: 'Female',
      dept: 'English',
      qualification: 'M.Phil English Linguistics',
      subject: 'Technical Communication & Report Writing',
      phone: '+92 312 3344556',
      email: 'hina@sms.com',
      joiningDate: '2021-03-01',
      salary: 3200,
      status: 'Active',
      address: 'Civic Center, Rawalpindi'
    },
    {
      id: 'TCH-105',
      name: 'Prof. Kamran Shah',
      fatherName: 'Shah Nawaz',
      gender: 'Male',
      dept: 'Mathematics',
      qualification: 'M.Sc Applied Mathematics',
      subject: 'Linear Algebra & Discrete Structures',
      phone: '+92 345 5566778',
      email: 'kamran@sms.com',
      joiningDate: '2019-07-20',
      salary: 3900,
      status: 'Active',
      address: 'Gulberg Greens, Islamabad'
    }
  ];

  const INITIAL_CLASSES = [
    { id: 'CLS-BSIT-1A', name: 'BSIT-1A', dept: 'BSIT', semester: 'Semester 1', session: '2024-2028', teacher: 'Prof. Dr. Tariq Mahmood' },
    { id: 'CLS-BSIT-4A', name: 'BSIT-4A', dept: 'BSIT', semester: 'Semester 4', session: '2023-2027', teacher: 'Engr. Sara Qureshi' },
    { id: 'CLS-BSCS-3A', name: 'BSCS-3A', dept: 'BSCS', semester: 'Semester 3', session: '2023-2027', teacher: 'Dr. Imran Rasheed' },
    { id: 'CLS-BSCS-6B', name: 'BSCS-6B', dept: 'BSCS', semester: 'Semester 6', session: '2022-2026', teacher: 'Dr. Imran Rasheed' },
    { id: 'CLS-BBA-2A', name: 'BBA-2A', dept: 'BBA', semester: 'Semester 2', session: '2024-2028', teacher: 'Engr. Sara Qureshi' },
    { id: 'CLS-BBA-4B', name: 'BBA-4B', dept: 'BBA', semester: 'Semester 4', session: '2023-2027', teacher: 'Prof. Dr. Tariq Mahmood' },
    { id: 'CLS-ENG-2A', name: 'ENG-2A', dept: 'English', semester: 'Semester 2', session: '2024-2028', teacher: 'Ms. Hina Bukhari' },
    { id: 'CLS-MATH-1A', name: 'MATH-1A', dept: 'Mathematics', semester: 'Semester 1', session: '2024-2028', teacher: 'Prof. Kamran Shah' }
  ];

  const INITIAL_STUDENTS = [
    {
      id: 'STU-2024-001',
      name: 'Muhammad Hamza',
      fatherName: 'Tariq Mehmood',
      gender: 'Male',
      dob: '2004-03-12',
      cnic: '35201-8765432-1',
      phone: '+92 301 2345678',
      email: 'hamza@student.sms.com',
      address: 'House 42, Street 10, G-9/2, Islamabad',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
      dept: 'BSIT',
      class: 'BSIT-4A',
      semester: 'Semester 4',
      session: '2023-2027',
      admissionDate: '2023-09-15',
      status: 'Active'
    },
    {
      id: 'STU-2024-002',
      name: 'Ayesha Khan',
      fatherName: 'Abdul Sattar Khan',
      gender: 'Female',
      dob: '2004-07-25',
      cnic: '37405-1234567-2',
      phone: '+92 312 9876543',
      email: 'ayesha.khan@student.sms.com',
      address: 'Flat 12, Executive Heights, F-11, Islamabad',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      dept: 'BSIT',
      class: 'BSIT-4A',
      semester: 'Semester 4',
      session: '2023-2027',
      admissionDate: '2023-09-15',
      status: 'Active'
    },
    {
      id: 'STU-2024-003',
      name: 'Bilal Ahmed',
      fatherName: 'Ahmed Raza',
      gender: 'Male',
      dob: '2003-11-05',
      cnic: '38403-4567890-3',
      phone: '+92 333 1122334',
      email: 'bilal.ahmed@student.sms.com',
      address: 'Sector C, Bahria Town, Rawalpindi',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      dept: 'BSCS',
      class: 'BSCS-3A',
      semester: 'Semester 3',
      session: '2023-2027',
      admissionDate: '2023-09-18',
      status: 'Active'
    },
    {
      id: 'STU-2024-004',
      name: 'Fatima Zahra',
      fatherName: 'Syed Zahir Shah',
      gender: 'Female',
      dob: '2005-01-19',
      cnic: '35202-9988776-4',
      phone: '+92 345 9988776',
      email: 'fatima.zahra@student.sms.com',
      address: 'Canal View Society, Lahore',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      dept: 'BSIT',
      class: 'BSIT-1A',
      semester: 'Semester 1',
      session: '2024-2028',
      admissionDate: '2024-09-10',
      status: 'Active'
    },
    {
      id: 'STU-2024-005',
      name: 'Zainab Malik',
      fatherName: 'Malik Shakeel',
      gender: 'Female',
      dob: '2004-09-14',
      cnic: '36302-3344556-6',
      phone: '+92 321 7766554',
      email: 'zainab.malik@student.sms.com',
      address: 'Gulshan-e-Iqbal, Block 7, Karachi',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      dept: 'BBA',
      class: 'BBA-4B',
      semester: 'Semester 4',
      session: '2023-2027',
      admissionDate: '2023-09-20',
      status: 'Active'
    },
    {
      id: 'STU-2024-006',
      name: 'Ali Hassan',
      fatherName: 'Hassan Mir',
      gender: 'Male',
      dob: '2003-05-30',
      cnic: '31102-6655443-7',
      phone: '+92 302 4433221',
      email: 'ali.hassan@student.sms.com',
      address: 'University Model Town, Peshawar',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      dept: 'BSCS',
      class: 'BSCS-6B',
      semester: 'Semester 6',
      session: '2022-2026',
      admissionDate: '2022-09-12',
      status: 'Active'
    },
    {
      id: 'STU-2024-007',
      name: 'Usman Tariq',
      fatherName: 'Tariq Jameel',
      gender: 'Male',
      dob: '2004-12-08',
      cnic: '37201-1122334-9',
      phone: '+92 313 5544332',
      email: 'usman.tariq@student.sms.com',
      address: 'Street 4, I-8/4, Islamabad',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
      dept: 'BSIT',
      class: 'BSIT-4A',
      semester: 'Semester 4',
      session: '2023-2027',
      admissionDate: '2023-09-15',
      status: 'Active'
    },
    {
      id: 'STU-2024-008',
      name: 'Sana Javed',
      fatherName: 'Javed Iqbal',
      gender: 'Female',
      dob: '2005-04-18',
      cnic: '35102-7788990-8',
      phone: '+92 324 8877665',
      email: 'sana.javed@student.sms.com',
      address: 'DHA Phase 5, Lahore',
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
      dept: 'English',
      class: 'ENG-2A',
      semester: 'Semester 2',
      session: '2024-2028',
      admissionDate: '2024-09-14',
      status: 'Active'
    },
    {
      id: 'STU-2024-009',
      name: 'Hassan Raza',
      fatherName: 'Raza Ali',
      gender: 'Male',
      dob: '2004-02-14',
      cnic: '33100-2233445-5',
      phone: '+92 334 6677889',
      email: 'hassan.raza@student.sms.com',
      address: 'Civil Lines, Faisalabad',
      photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
      dept: 'Mathematics',
      class: 'MATH-1A',
      semester: 'Semester 1',
      session: '2024-2028',
      admissionDate: '2024-09-10',
      status: 'Active'
    },
    {
      id: 'STU-2024-010',
      name: 'Maryam Noor',
      fatherName: 'Noor Muhammad',
      gender: 'Female',
      dob: '2002-10-22',
      cnic: '35201-6677889-2',
      phone: '+92 305 3322110',
      email: 'maryam.noor@student.sms.com',
      address: 'Wapda Town, Multan',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      dept: 'BSCS',
      class: 'BSCS-6B',
      semester: 'Semester 8',
      session: '2020-2024',
      admissionDate: '2020-09-10',
      status: 'Graduated'
    },
    {
      id: 'STU-2024-011',
      name: 'Omer Farooq',
      fatherName: 'Farooq Azam',
      gender: 'Male',
      dob: '2004-06-11',
      cnic: '37406-8899001-3',
      phone: '+92 315 7788990',
      email: 'omer.farooq@student.sms.com',
      address: 'Saddar, Rawalpindi',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
      dept: 'BBA',
      class: 'BBA-2A',
      semester: 'Semester 2',
      session: '2024-2028',
      admissionDate: '2024-09-12',
      status: 'Active'
    },
    {
      id: 'STU-2024-012',
      name: 'Mahnoor Baloch',
      fatherName: 'Baloch Khan',
      gender: 'Female',
      dob: '2004-08-30',
      cnic: '54400-3322114-6',
      phone: '+92 346 1122445',
      email: 'mahnoor@student.sms.com',
      address: 'Samungli Road, Quetta',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      dept: 'BSIT',
      class: 'BSIT-1A',
      semester: 'Semester 1',
      session: '2024-2028',
      admissionDate: '2024-09-11',
      status: 'Active'
    },
    {
      id: 'STU-2024-013',
      name: 'Danish Ali',
      fatherName: 'Ali Asghar',
      gender: 'Male',
      dob: '2003-12-01',
      cnic: '35202-5544332-1',
      phone: '+92 322 9988112',
      email: 'danish.ali@student.sms.com',
      address: 'Gulshan Colony, Gujranwala',
      photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
      dept: 'BSCS',
      class: 'BSCS-3A',
      semester: 'Semester 3',
      session: '2023-2027',
      admissionDate: '2023-09-18',
      status: 'Suspended'
    },
    {
      id: 'STU-2024-014',
      name: 'Khadija Rehman',
      fatherName: 'Abdul Rehman',
      gender: 'Female',
      dob: '2004-01-20',
      cnic: '36302-1144778-8',
      phone: '+92 308 4455667',
      email: 'khadija@student.sms.com',
      address: 'Shamsabad, Rawalpindi',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      dept: 'BSIT',
      class: 'BSIT-4A',
      semester: 'Semester 4',
      session: '2023-2027',
      admissionDate: '2023-09-15',
      status: 'Active'
    },
    {
      id: 'STU-2024-015',
      name: 'Shahzaib Baig',
      fatherName: 'Baig Mirza',
      gender: 'Male',
      dob: '2003-09-09',
      cnic: '35201-9988112-9',
      phone: '+92 331 6655443',
      email: 'shahzaib@student.sms.com',
      address: 'Johar Town, Lahore',
      photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
      dept: 'BBA',
      class: 'BBA-4B',
      semester: 'Semester 4',
      session: '2023-2027',
      admissionDate: '2023-09-20',
      status: 'Inactive'
    }
  ];

  const INITIAL_EXAMS = [
    { id: 'EX-2024-01', name: 'Midterm Fall 2024', dept: 'BSIT', class: 'BSIT-4A', subject: 'Web Technologies', date: '2024-11-15', totalMarks: 100, passMarks: 50, teacher: 'Prof. Dr. Tariq Mahmood' },
    { id: 'EX-2024-02', name: 'Midterm Fall 2024', dept: 'BSIT', class: 'BSIT-4A', subject: 'Database Systems', date: '2024-11-17', totalMarks: 100, passMarks: 50, teacher: 'Engr. Sara Qureshi' },
    { id: 'EX-2024-03', name: 'Midterm Fall 2024', dept: 'BSCS', class: 'BSCS-3A', subject: 'Data Structures', date: '2024-11-18', totalMarks: 100, passMarks: 50, teacher: 'Dr. Imran Rasheed' },
    { id: 'EX-2024-04', name: 'Midterm Fall 2024', dept: 'BBA', class: 'BBA-4B', subject: 'Financial Accounting', date: '2024-11-19', totalMarks: 100, passMarks: 50, teacher: 'Engr. Sara Qureshi' },
    { id: 'EX-2024-05', name: 'Midterm Fall 2024', dept: 'English', class: 'ENG-2A', subject: 'Technical Writing', date: '2024-11-20', totalMarks: 100, passMarks: 50, teacher: 'Ms. Hina Bukhari' },
    { id: 'EX-2024-06', name: 'Midterm Fall 2024', dept: 'Mathematics', class: 'MATH-1A', subject: 'Linear Algebra', date: '2024-11-21', totalMarks: 100, passMarks: 50, teacher: 'Prof. Kamran Shah' },
    { id: 'EX-2024-07', name: 'Lab Practical Quiz', dept: 'BSIT', class: 'BSIT-4A', subject: 'Web Technologies Lab', date: '2024-11-25', totalMarks: 50, passMarks: 25, teacher: 'Prof. Dr. Tariq Mahmood' },
    { id: 'EX-2024-08', name: 'Semester Final Exam', dept: 'BSCS', class: 'BSCS-6B', subject: 'Compiler Construction', date: '2024-12-10', totalMarks: 100, passMarks: 50, teacher: 'Dr. Imran Rasheed' },
    { id: 'EX-2024-09', name: 'Project Viva Voce', dept: 'BSIT', class: 'BSIT-4A', subject: 'Full Stack Capstone', date: '2024-12-14', totalMarks: 100, passMarks: 50, teacher: 'Prof. Dr. Tariq Mahmood' },
    { id: 'EX-2024-10', name: 'Semester Final Exam', dept: 'BSIT', class: 'BSIT-1A', subject: 'Intro to Computing', date: '2024-12-18', totalMarks: 100, passMarks: 50, teacher: 'Engr. Sara Qureshi' }
  ];

  const INITIAL_RESULTS = [
    { id: 'RES-001', studentId: 'STU-2024-001', studentName: 'Muhammad Hamza', dept: 'BSIT', class: 'BSIT-4A', semester: 'Semester 4', subject: 'Web Technologies', exam: 'Midterm Fall 2024', totalMarks: 100, obtainedMarks: 94, percentage: 94.0, grade: 'A+', status: 'Pass' },
    { id: 'RES-002', studentId: 'STU-2024-001', studentName: 'Muhammad Hamza', dept: 'BSIT', class: 'BSIT-4A', semester: 'Semester 4', subject: 'Database Systems', exam: 'Midterm Fall 2024', totalMarks: 100, obtainedMarks: 88, percentage: 88.0, grade: 'A', status: 'Pass' },
    { id: 'RES-003', studentId: 'STU-2024-002', studentName: 'Ayesha Khan', dept: 'BSIT', class: 'BSIT-4A', semester: 'Semester 4', subject: 'Web Technologies', exam: 'Midterm Fall 2024', totalMarks: 100, obtainedMarks: 91, percentage: 91.0, grade: 'A+', status: 'Pass' },
    { id: 'RES-004', studentId: 'STU-2024-002', studentName: 'Ayesha Khan', dept: 'BSIT', class: 'BSIT-4A', semester: 'Semester 4', subject: 'Database Systems', exam: 'Midterm Fall 2024', totalMarks: 100, obtainedMarks: 85, percentage: 85.0, grade: 'A', status: 'Pass' },
    { id: 'RES-005', studentId: 'STU-2024-003', studentName: 'Bilal Ahmed', dept: 'BSCS', class: 'BSCS-3A', semester: 'Semester 3', subject: 'Data Structures', exam: 'Midterm Fall 2024', totalMarks: 100, obtainedMarks: 76, percentage: 76.0, grade: 'B', status: 'Pass' },
    { id: 'RES-006', studentId: 'STU-2024-004', studentName: 'Fatima Zahra', dept: 'BSIT', class: 'BSIT-1A', semester: 'Semester 1', subject: 'Intro to Computing', exam: 'Semester Final Exam', totalMarks: 100, obtainedMarks: 82, percentage: 82.0, grade: 'A', status: 'Pass' },
    { id: 'RES-007', studentId: 'STU-2024-005', studentName: 'Zainab Malik', dept: 'BBA', class: 'BBA-4B', semester: 'Semester 4', subject: 'Financial Accounting', exam: 'Midterm Fall 2024', totalMarks: 100, obtainedMarks: 68, percentage: 68.0, grade: 'C', status: 'Pass' },
    { id: 'RES-008', studentId: 'STU-2024-007', studentName: 'Usman Tariq', dept: 'BSIT', class: 'BSIT-4A', semester: 'Semester 4', subject: 'Web Technologies', exam: 'Midterm Fall 2024', totalMarks: 100, obtainedMarks: 58, percentage: 58.0, grade: 'D', status: 'Pass' },
    { id: 'RES-009', studentId: 'STU-2024-008', studentName: 'Sana Javed', dept: 'English', class: 'ENG-2A', semester: 'Semester 2', subject: 'Technical Writing', exam: 'Midterm Fall 2024', totalMarks: 100, obtainedMarks: 90, percentage: 90.0, grade: 'A+', status: 'Pass' },
    { id: 'RES-010', studentId: 'STU-2024-009', studentName: 'Hassan Raza', dept: 'Mathematics', class: 'MATH-1A', semester: 'Semester 1', subject: 'Linear Algebra', exam: 'Midterm Fall 2024', totalMarks: 100, obtainedMarks: 44, percentage: 44.0, grade: 'F', status: 'Fail' },
    { id: 'RES-011', studentId: 'STU-2024-014', studentName: 'Khadija Rehman', dept: 'BSIT', class: 'BSIT-4A', semester: 'Semester 4', subject: 'Web Technologies', exam: 'Midterm Fall 2024', totalMarks: 100, obtainedMarks: 84, percentage: 84.0, grade: 'A', status: 'Pass' }
  ];

  const INITIAL_FEES = [
    { id: 'FEE-2024-01', studentId: 'STU-2024-001', studentName: 'Muhammad Hamza', dept: 'BSIT', class: 'BSIT-4A', feeType: 'Tuition Fee', totalFee: 1400, paidAmount: 1400, remainingAmount: 0, dueDate: '2024-10-15', paymentDate: '2024-10-10', status: 'Paid' },
    { id: 'FEE-2024-02', studentId: 'STU-2024-002', studentName: 'Ayesha Khan', dept: 'BSIT', class: 'BSIT-4A', feeType: 'Tuition Fee', totalFee: 1400, paidAmount: 1400, remainingAmount: 0, dueDate: '2024-10-15', paymentDate: '2024-10-08', status: 'Paid' },
    { id: 'FEE-2024-03', studentId: 'STU-2024-003', studentName: 'Bilal Ahmed', dept: 'BSCS', class: 'BSCS-3A', feeType: 'Tuition Fee', totalFee: 1500, paidAmount: 800, remainingAmount: 700, dueDate: '2024-10-25', paymentDate: '2024-10-20', status: 'Partial' },
    { id: 'FEE-2024-04', studentId: 'STU-2024-004', studentName: 'Fatima Zahra', dept: 'BSIT', class: 'BSIT-1A', feeType: 'Admission Fee', totalFee: 2200, paidAmount: 2200, remainingAmount: 0, dueDate: '2024-09-30', paymentDate: '2024-09-25', status: 'Paid' },
    { id: 'FEE-2024-05', studentId: 'STU-2024-005', studentName: 'Zainab Malik', dept: 'BBA', class: 'BBA-4B', feeType: 'Tuition Fee', totalFee: 1350, paidAmount: 0, remainingAmount: 1350, dueDate: '2024-11-30', paymentDate: '', status: 'Unpaid' },
    { id: 'FEE-2024-06', studentId: 'STU-2024-006', studentName: 'Ali Hassan', dept: 'BSCS', class: 'BSCS-6B', feeType: 'Tuition Fee', totalFee: 1500, paidAmount: 1500, remainingAmount: 0, dueDate: '2024-10-15', paymentDate: '2024-10-12', status: 'Paid' },
    { id: 'FEE-2024-07', studentId: 'STU-2024-007', studentName: 'Usman Tariq', dept: 'BSIT', class: 'BSIT-4A', feeType: 'Examination Fee', totalFee: 300, paidAmount: 150, remainingAmount: 150, dueDate: '2024-11-10', paymentDate: '2024-11-05', status: 'Partial' },
    { id: 'FEE-2024-08', studentId: 'STU-2024-008', studentName: 'Sana Javed', dept: 'English', class: 'ENG-2A', feeType: 'Tuition Fee', totalFee: 1100, paidAmount: 1100, remainingAmount: 0, dueDate: '2024-10-15', paymentDate: '2024-10-14', status: 'Paid' },
    { id: 'FEE-2024-09', studentId: 'STU-2024-009', studentName: 'Hassan Raza', dept: 'Mathematics', class: 'MATH-1A', feeType: 'Admission Fee', totalFee: 2000, paidAmount: 0, remainingAmount: 2000, dueDate: '2024-11-20', paymentDate: '', status: 'Unpaid' },
    { id: 'FEE-2024-10', studentId: 'STU-2024-014', studentName: 'Khadija Rehman', dept: 'BSIT', class: 'BSIT-4A', feeType: 'Tuition Fee', totalFee: 1400, paidAmount: 1400, remainingAmount: 0, dueDate: '2024-10-15', paymentDate: '2024-10-09', status: 'Paid' }
  ];

  const INITIAL_TIMETABLE = [
    { id: 'TT-01', dept: 'BSIT', class: 'BSIT-4A', semester: 'Semester 4', subject: 'Web Technologies', teacher: 'Prof. Dr. Tariq Mahmood', day: 'Monday', startTime: '08:30', endTime: '10:00', room: 'Lab 3 (IT Complex)' },
    { id: 'TT-02', dept: 'BSIT', class: 'BSIT-4A', semester: 'Semester 4', subject: 'Database Systems', teacher: 'Engr. Sara Qureshi', day: 'Monday', startTime: '10:30', endTime: '12:00', room: 'Lecture Hall 2' },
    { id: 'TT-03', dept: 'BSCS', class: 'BSCS-3A', semester: 'Semester 3', subject: 'Data Structures', teacher: 'Dr. Imran Rasheed', day: 'Tuesday', startTime: '09:00', endTime: '10:30', room: 'CS Lab 1' },
    { id: 'TT-04', dept: 'BSIT', class: 'BSIT-4A', semester: 'Semester 4', subject: 'Web Technologies Lab', teacher: 'Prof. Dr. Tariq Mahmood', day: 'Wednesday', startTime: '11:00', endTime: '13:00', room: 'Lab 3 (IT Complex)' },
    { id: 'TT-05', dept: 'English', class: 'ENG-2A', semester: 'Semester 2', subject: 'Technical Writing', teacher: 'Ms. Hina Bukhari', day: 'Wednesday', startTime: '09:00', endTime: '10:30', room: 'Humanities Block A' },
    { id: 'TT-06', dept: 'Mathematics', class: 'MATH-1A', semester: 'Semester 1', subject: 'Linear Algebra', teacher: 'Prof. Kamran Shah', day: 'Thursday', startTime: '10:00', endTime: '11:30', room: 'Math Hall 4' },
    { id: 'TT-07', dept: 'BBA', class: 'BBA-4B', semester: 'Semester 4', subject: 'Financial Accounting', teacher: 'Engr. Sara Qureshi', day: 'Thursday', startTime: '12:00', endTime: '13:30', room: 'BBA Executive Room' },
    { id: 'TT-08', dept: 'BSIT', class: 'BSIT-4A', semester: 'Semester 4', subject: 'Software Architecture', teacher: 'Prof. Dr. Tariq Mahmood', day: 'Friday', startTime: '09:00', endTime: '10:30', room: 'Lecture Hall 2' }
  ];

  const INITIAL_ATTENDANCE = [
    {
      date: '2024-11-01',
      class: 'BSIT-4A',
      records: {
        'STU-2024-001': 'Present',
        'STU-2024-002': 'Present',
        'STU-2024-007': 'Late',
        'STU-2024-014': 'Present'
      }
    },
    {
      date: '2024-10-31',
      class: 'BSIT-4A',
      records: {
        'STU-2024-001': 'Present',
        'STU-2024-002': 'Present',
        'STU-2024-007': 'Absent',
        'STU-2024-014': 'Present'
      }
    },
    {
      date: '2024-10-30',
      class: 'BSIT-4A',
      records: {
        'STU-2024-001': 'Present',
        'STU-2024-002': 'Leave',
        'STU-2024-007': 'Present',
        'STU-2024-014': 'Present'
      }
    }
  ];

  const INITIAL_NOTIFICATIONS = [
    { id: 'NOTIF-1', title: 'New Student Admission', desc: 'Muhammad Hamza has been successfully enrolled into BSIT-4A.', time: '10 mins ago', type: 'success', read: false },
    { id: 'NOTIF-2', title: 'Attendance Logged', desc: 'Daily roll call for BSIT-4A saved with 92% attendance rate.', time: '1 hour ago', type: 'info', read: false },
    { id: 'NOTIF-3', title: 'Fee Payment Received', desc: 'Tuition Fee of $1,400 cleared for Ayesha Khan.', time: '3 hours ago', type: 'success', read: false },
    { id: 'NOTIF-4', title: 'Exam Scheduled', desc: 'Midterm Fall 2024 scheduled for Web Technologies on Nov 15.', time: 'Yesterday', type: 'warning', read: true },
    { id: 'NOTIF-5', title: 'Fee Due Reminder', desc: 'Reminder sent to 3 students with pending Fall semester dues.', time: '2 days ago', type: 'danger', read: true }
  ];

  /* ============================================================================
     LOCALSTORAGE HELPERS
     ============================================================================ */
  function saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to save data to LocalStorage:', err);
    }
  }

  function getData(key, defaultValue) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.error('Failed to read data from LocalStorage:', err);
      return defaultValue;
    }
  }

  function seedDemoDataIfEmpty() {
    if (!localStorage.getItem(KEYS.STUDENTS)) {
      saveData(KEYS.STUDENTS, INITIAL_STUDENTS);
    }
    if (!localStorage.getItem(KEYS.TEACHERS)) {
      saveData(KEYS.TEACHERS, INITIAL_TEACHERS);
    }
    if (!localStorage.getItem(KEYS.DEPARTMENTS)) {
      saveData(KEYS.DEPARTMENTS, INITIAL_DEPARTMENTS);
    }
    if (!localStorage.getItem(KEYS.CLASSES)) {
      saveData(KEYS.CLASSES, INITIAL_CLASSES);
    }
    if (!localStorage.getItem(KEYS.EXAMS)) {
      saveData(KEYS.EXAMS, INITIAL_EXAMS);
    }
    if (!localStorage.getItem(KEYS.RESULTS)) {
      saveData(KEYS.RESULTS, INITIAL_RESULTS);
    }
    if (!localStorage.getItem(KEYS.FEES)) {
      saveData(KEYS.FEES, INITIAL_FEES);
    }
    if (!localStorage.getItem(KEYS.TIMETABLE)) {
      saveData(KEYS.TIMETABLE, INITIAL_TIMETABLE);
    }
    if (!localStorage.getItem(KEYS.ATTENDANCE)) {
      saveData(KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
    }
    if (!localStorage.getItem(KEYS.NOTIFICATIONS)) {
      saveData(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    }
  }

  /* ============================================================================
     STATE MANAGEMENT
     ============================================================================ */
  const state = {
    currentUser: null,
    currentView: 'dashboard',
    theme: 'light',
    studentsPage: 1,
    studentsPerPage: 7,
    chartEnrollment: null,
    chartGrades: null,
    activeReportType: 'students',
    attendanceBuffer: {}, // Roll call state in progress
    deleteCallback: null // Stores pending confirmation action
  };

  /* ============================================================================
     UI UTILITIES (TOASTS, MODALS, NOTIFICATIONS)
     ============================================================================ */
  function showToast(title, message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-solid fa-circle-info';
    if (type === 'success') iconClass = 'fa-solid fa-circle-check';
    if (type === 'error') iconClass = 'fa-solid fa-triangle-exclamation';
    if (type === 'warning') iconClass = 'fa-solid fa-circle-exclamation';

    toast.innerHTML = `
      <div class="toast-icon"><i class="${iconClass}"></i></div>
      <div class="toast-body">
        <div class="toast-title">${escapeHTML(title)}</div>
        <div class="toast-message">${escapeHTML(message)}</div>
      </div>
      <button class="toast-close">&times;</button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.remove();
    });

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  }

  function addNotification(title, desc, type = 'info') {
    const notifs = getData(KEYS.NOTIFICATIONS, []);
    const newNotif = {
      id: 'NOTIF-' + Date.now(),
      title,
      desc,
      time: 'Just now',
      type,
      read: false
    };
    notifs.unshift(newNotif);
    if (notifs.length > 20) notifs.pop(); // keep last 20
    saveData(KEYS.NOTIFICATIONS, notifs);
    renderNotifications();
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
    }
  }

  function openConfirmModal(message, onConfirm) {
    const modal = document.getElementById('modal-confirm');
    const msgEl = document.getElementById('confirm-modal-message');
    if (msgEl) msgEl.textContent = message;
    state.deleteCallback = onConfirm;
    openModal('modal-confirm');
  }

  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ============================================================================
     THEME (LIGHT / DARK)
     ============================================================================ */
  function initTheme() {
    const savedTheme = localStorage.getItem(KEYS.THEME) || 'light';
    applyTheme(savedTheme);

    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const nextTheme = state.theme === 'light' ? 'dark' : 'light';
        applyTheme(nextTheme);
        showToast('Theme Updated', `Switched to ${nextTheme} mode`, 'info');
      });
    }
  }

  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(KEYS.THEME, theme);

    const icon = document.getElementById('theme-icon');
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
      } else {
        icon.className = 'fa-solid fa-moon';
      }
    }

    // Refresh charts if rendered
    if (state.chartEnrollment || state.chartGrades) {
      renderDashboardCharts();
    }
  }

  /* ============================================================================
     AUTHENTICATION & LOGIN (FRONT-END DEMO)
     ============================================================================ */
  function initAuth() {
    const loginView = document.getElementById('login-view');
    const appContainer = document.getElementById('app-container');
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const btnFillAdmin = document.getElementById('btn-fill-admin');
    const btnFillStudent = document.getElementById('btn-fill-student');
    const btnTogglePassword = document.getElementById('toggle-password');
    const passwordEye = document.getElementById('password-eye-icon');
    const linkForgot = document.getElementById('link-forgot-password');

    // Quick demo autofills
    if (btnFillAdmin) {
      btnFillAdmin.addEventListener('click', () => {
        emailInput.value = 'admin@sms.com';
        passwordInput.value = 'admin123';
        clearLoginErrors();
      });
    }

    if (btnFillStudent) {
      btnFillStudent.addEventListener('click', () => {
        emailInput.value = 'student@sms.com';
        passwordInput.value = 'student123';
        clearLoginErrors();
      });
    }

    // Toggle password visibility
    if (btnTogglePassword && passwordInput) {
      btnTogglePassword.addEventListener('click', () => {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        passwordEye.className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
      });
    }

    // Forgot password hint
    if (linkForgot) {
      linkForgot.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Password Recovery', 'Demo Accounts: admin@sms.com (admin123) or student@sms.com (student123)', 'info');
      });
    }

    // Form submit
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearLoginErrors();

        const email = emailInput.value.trim().toLowerCase();
        const pass = passwordInput.value.trim();

        if (!email || !email.includes('@')) {
          document.getElementById('login-email-error').classList.add('visible');
          return;
        }

        if (!pass || pass.length < 5) {
          document.getElementById('login-password-error').classList.add('visible');
          return;
        }

        // Validate demo credentials
        if (email === 'admin@sms.com' && pass === 'admin123') {
          loginUser({
            name: 'Dr. Administrator',
            email: 'admin@sms.com',
            role: 'Super Admin',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            isStudent: false
          });
        } else if (email === 'student@sms.com' && pass === 'student123') {
          loginUser({
            name: 'Muhammad Hamza',
            email: 'student@sms.com',
            role: 'Student (BSIT-4A)',
            studentId: 'STU-2024-001',
            avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
            isStudent: true
          });
        } else {
          showToast('Authentication Failed', 'Invalid credentials! Use demo credentials: admin@sms.com / admin123', 'error');
        }
      });
    }

    // Check existing session
    const savedUser = getData(KEYS.AUTH, null);
    if (savedUser) {
      applyUserSession(savedUser);
    }

    // Logout handlers
    const logoutBtns = [
      document.getElementById('btn-sidebar-logout'),
      document.getElementById('menu-item-logout')
    ];
    logoutBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          openConfirmModal('Are you sure you want to log out of the SMS Portal?', () => {
            logoutUser();
          });
        });
      }
    });
  }

  function clearLoginErrors() {
    const errs = document.querySelectorAll('.form-error-msg');
    errs.forEach(e => e.classList.remove('visible'));
  }

  function loginUser(user) {
    state.currentUser = user;
    saveData(KEYS.AUTH, user);
    applyUserSession(user);
    showToast('Welcome Back!', `Signed in as ${user.name} (${user.role})`, 'success');
  }

  function applyUserSession(user) {
    state.currentUser = user;
    const loginView = document.getElementById('login-view');
    const appContainer = document.getElementById('app-container');

    if (loginView && appContainer) {
      loginView.style.display = 'none';
      appContainer.style.display = 'flex';
    }

    // Update Header and Sidebar User Details
    const nameEls = ['sidebar-user-name', 'header-user-name', 'menu-dropdown-name'];
    nameEls.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = user.name;
    });

    const roleEls = ['sidebar-user-role', 'header-user-role'];
    roleEls.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = user.role;
    });

    const emailEl = document.getElementById('menu-dropdown-email');
    if (emailEl) emailEl.textContent = user.email;

    const avatars = ['sidebar-user-avatar', 'header-avatar'];
    avatars.forEach(id => {
      const el = document.getElementById(id);
      if (el && user.avatar) el.src = user.avatar;
    });

    // Populate all dropdowns & views
    refreshAllViews();
    navigateTo('dashboard');
  }

  function logoutUser() {
    localStorage.removeItem(KEYS.AUTH);
    state.currentUser = null;
    document.getElementById('app-container').style.display = 'none';
    document.getElementById('login-view').style.display = 'flex';
    showToast('Signed Out', 'You have been logged out successfully.', 'info');
  }

  /* ============================================================================
     NAVIGATION & VIEW ROUTING
     ============================================================================ */
  function initNavigation() {
    const navItems = document.querySelectorAll('.sidebar .nav-item[data-view]');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const view = item.getAttribute('data-view');
        navigateTo(view);

        // Close mobile sidebar on navigation
        closeMobileSidebar();
      });
    });

    // Sidebar collapse button
    const collapseBtn = document.getElementById('sidebar-collapse-btn');
    const sidebar = document.getElementById('main-sidebar');
    if (collapseBtn && sidebar) {
      collapseBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
      });
    }

    // Mobile sidebar toggle
    const mobileBtn = document.getElementById('mobile-toggle-btn');
    const overlay = document.getElementById('sidebar-overlay');
    if (mobileBtn && sidebar && overlay) {
      mobileBtn.addEventListener('click', () => {
        sidebar.classList.add('mobile-open');
        overlay.classList.add('active');
      });

      overlay.addEventListener('click', closeMobileSidebar);
    }

    // Profile Dropdown Trigger
    const profileTrigger = document.getElementById('profile-dropdown-trigger');
    const profileDropdown = document.getElementById('profile-dropdown');
    if (profileTrigger && profileDropdown) {
      profileTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('show');
        closeNotifDropdown();
      });
    }

    // Notifications Dropdown Trigger
    const notifBtn = document.getElementById('notif-toggle-btn');
    const notifDropdown = document.getElementById('notif-dropdown');
    if (notifBtn && notifDropdown) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle('show');
        closeProfileDropdown();
      });
    }

    // Dismiss dropdowns on document click
    document.addEventListener('click', () => {
      closeProfileDropdown();
      closeNotifDropdown();
    });

    // Menu settings item
    const menuSettings = document.getElementById('menu-item-settings');
    if (menuSettings) {
      menuSettings.addEventListener('click', () => navigateTo('settings'));
    }

    // Menu reset item
    const menuReset = document.getElementById('menu-item-reset-demo');
    if (menuReset) {
      menuReset.addEventListener('click', () => {
        openConfirmModal('Reset database to realistic default demo data?', resetAllDemoData);
      });
    }

    // Quick Dashboard actions
    const quickAtt = document.getElementById('btn-quick-attendance');
    if (quickAtt) quickAtt.addEventListener('click', () => navigateTo('attendance'));

    const quickExam = document.getElementById('btn-quick-add-exam');
    if (quickExam) quickExam.addEventListener('click', () => openExamModal('add'));

    const quickResult = document.getElementById('btn-quick-add-result');
    if (quickResult) quickResult.addEventListener('click', () => openResultModal('add'));

    const quickFee = document.getElementById('btn-quick-add-fee');
    if (quickFee) quickFee.addEventListener('click', () => openFeeModal('add'));

    const dashAddStudent = document.getElementById('btn-dash-quick-add');
    if (dashAddStudent) dashAddStudent.addEventListener('click', () => openStudentModal('add'));

    const dashRefresh = document.getElementById('btn-dash-refresh');
    if (dashRefresh) dashRefresh.addEventListener('click', () => {
      refreshAllViews();
      showToast('Dashboard Refreshed', 'All statistics and charts up to date.', 'info');
    });

    // Global Search Bar
    const globalSearch = document.getElementById('global-search-input');
    if (globalSearch) {
      globalSearch.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length > 1) {
          // Switch to students and populate search
          navigateTo('students');
          const stuSearch = document.getElementById('students-search-input');
          if (stuSearch) {
            stuSearch.value = query;
            renderStudentsTable();
          }
        }
      });
    }
  }

  function closeMobileSidebar() {
    const sidebar = document.getElementById('main-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
  }

  function closeProfileDropdown() {
    const menu = document.getElementById('profile-dropdown');
    if (menu) menu.classList.remove('show');
  }

  function closeNotifDropdown() {
    const menu = document.getElementById('notif-dropdown');
    if (menu) menu.classList.remove('show');
  }

  function navigateTo(viewId) {
    state.currentView = viewId;

    // Toggle active sidebar items
    const navItems = document.querySelectorAll('.sidebar .nav-item');
    navItems.forEach(item => {
      if (item.getAttribute('data-view') === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Toggle view sections
    const sections = document.querySelectorAll('.content-viewport .view-section');
    sections.forEach(sec => {
      if (sec.id === `view-${viewId}`) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    // Refresh view specific logic
    if (viewId === 'dashboard') {
      renderDashboard();
    } else if (viewId === 'students') {
      renderStudentsTable();
    } else if (viewId === 'teachers') {
      renderTeachersTable();
    } else if (viewId === 'departments') {
      renderDepartmentsTable();
    } else if (viewId === 'classes') {
      renderClassesTable();
    } else if (viewId === 'attendance') {
      renderAttendanceModule();
    } else if (viewId === 'exams') {
      renderExamsTable();
    } else if (viewId === 'results') {
      renderResultsTable();
    } else if (viewId === 'fees') {
      renderFeesTable();
    } else if (viewId === 'timetable') {
      renderTimetableModule();
    } else if (viewId === 'reports') {
      renderReportsModule();
    }
  }

  /* ============================================================================
     NOTIFICATIONS SYSTEM
     ============================================================================ */
  function initNotifications() {
    const markAllBtn = document.getElementById('btn-mark-all-read');
    if (markAllBtn) {
      markAllBtn.addEventListener('click', () => {
        const notifs = getData(KEYS.NOTIFICATIONS, []);
        notifs.forEach(n => (n.read = true));
        saveData(KEYS.NOTIFICATIONS, notifs);
        renderNotifications();
        showToast('Notifications Marked', 'All alerts marked as read.', 'info');
      });
    }

    const clearBtn = document.getElementById('btn-clear-notifications');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        saveData(KEYS.NOTIFICATIONS, []);
        renderNotifications();
        showToast('Cleared', 'Notification tray cleared.', 'info');
      });
    }

    renderNotifications();
  }

  function renderNotifications() {
    const notifs = getData(KEYS.NOTIFICATIONS, []);
    const container = document.getElementById('notif-list-container');
    const badge = document.getElementById('notif-badge');
    const unreadText = document.getElementById('notif-unread-text');

    const unreadCount = notifs.filter(n => !n.read).length;

    if (badge) {
      badge.style.display = unreadCount > 0 ? 'block' : 'none';
    }
    if (unreadText) {
      unreadText.textContent = `${unreadCount} Unread alerts`;
    }

    if (!container) return;

    if (notifs.length === 0) {
      container.innerHTML = `
        <div style="padding: 2rem 1rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          <i class="fa-regular fa-bell-slash" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
          No notifications available
        </div>
      `;
      return;
    }

    container.innerHTML = notifs.map(n => `
      <div class="notification-item ${n.read ? '' : 'unread'}" data-id="${n.id}">
        <div class="notif-icon ${n.type}">
          <i class="${n.type === 'success' ? 'fa-solid fa-check' : n.type === 'danger' ? 'fa-solid fa-exclamation' : n.type === 'warning' ? 'fa-solid fa-triangle-exclamation' : 'fa-solid fa-info'}"></i>
        </div>
        <div class="notif-content">
          <div class="notif-title">${escapeHTML(n.title)}</div>
          <div class="notif-desc">${escapeHTML(n.desc)}</div>
          <div class="notif-time">${escapeHTML(n.time)}</div>
        </div>
      </div>
    `).join('');

    // Clicking an unread item marks it read
    container.querySelectorAll('.notification-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        const list = getData(KEYS.NOTIFICATIONS, []);
        const target = list.find(x => x.id === id);
        if (target) {
          target.read = true;
          saveData(KEYS.NOTIFICATIONS, list);
          renderNotifications();
        }
      });
    });
  }

  /* ============================================================================
     DASHBOARD MODULE
     ============================================================================ */
  function renderDashboard() {
    const students = getData(KEYS.STUDENTS, []);
    const teachers = getData(KEYS.TEACHERS, []);
    const depts = getData(KEYS.DEPARTMENTS, []);
    const classes = getData(KEYS.CLASSES, []);
    const exams = getData(KEYS.EXAMS, []);
    const fees = getData(KEYS.FEES, []);
    const attendance = getData(KEYS.ATTENDANCE, []);

    // 1. Update Statistics Cards
    const totalStudentsEl = document.getElementById('stat-total-students');
    const activeStudentsEl = document.getElementById('stat-active-students');
    if (totalStudentsEl) totalStudentsEl.textContent = students.length;
    if (activeStudentsEl) {
      const activeCount = students.filter(s => s.status === 'Active').length;
      activeStudentsEl.textContent = `${activeCount} Active`;
    }

    const totalTeachersEl = document.getElementById('stat-total-teachers');
    if (totalTeachersEl) totalTeachersEl.textContent = teachers.length;

    const totalClassesEl = document.getElementById('stat-total-classes');
    if (totalClassesEl) totalClassesEl.textContent = classes.length;

    const totalDeptsEl = document.getElementById('stat-total-depts');
    if (totalDeptsEl) totalDeptsEl.textContent = `${depts.length} Departments`;

    const totalExamsEl = document.getElementById('stat-total-exams');
    if (totalExamsEl) totalExamsEl.textContent = exams.length;

    // Fee calculations
    const totalCollected = fees.reduce((sum, f) => sum + Number(f.paidAmount || 0), 0);
    const totalDue = fees.reduce((sum, f) => sum + Number(f.remainingAmount || 0), 0);
    const statTotalFeesEl = document.getElementById('stat-total-fees');
    const statDueFeesEl = document.getElementById('stat-due-fees');
    if (statTotalFeesEl) statTotalFeesEl.textContent = `$${totalCollected.toLocaleString()}`;
    if (statDueFeesEl) statDueFeesEl.textContent = `$${totalDue.toLocaleString()} Due`;

    // Attendance calculation for latest recorded date
    let attRate = 0;
    let presentCount = 0;
    let totalAttRecords = 0;
    if (attendance.length > 0) {
      const latest = attendance[0];
      const records = Object.values(latest.records || {});
      totalAttRecords = records.length;
      presentCount = records.filter(r => r === 'Present' || r === 'Late').length;
      if (totalAttRecords > 0) {
        attRate = ((presentCount / totalAttRecords) * 100).toFixed(1);
      }
    }
    const statAttRateEl = document.getElementById('stat-attendance-rate');
    const statAttCountsEl = document.getElementById('stat-attendance-counts');
    if (statAttRateEl) statAttRateEl.textContent = `${attRate}%`;
    if (statAttCountsEl) statAttCountsEl.textContent = `${presentCount} of ${totalAttRecords} Present`;

    // Sidebar badge counters
    const navStuCount = document.getElementById('nav-student-count');
    if (navStuCount) navStuCount.textContent = students.length;
    const navTchCount = document.getElementById('nav-teacher-count');
    if (navTchCount) navTchCount.textContent = teachers.length;

    // 2. Render Charts
    renderDashboardCharts();

    // 3. Render Recent Students
    renderDashboardRecentStudents(students);

    // 4. Render Upcoming Examinations
    renderDashboardUpcomingExams(exams);

    // 5. Render Activity Feed
    renderDashboardActivityFeed();
  }

  function renderDashboardCharts() {
    const students = getData(KEYS.STUDENTS, []);
    const results = getData(KEYS.RESULTS, []);
    const depts = getData(KEYS.DEPARTMENTS, []);

    // A. Chart 1: Enrollment by Department
    const deptLabels = depts.map(d => d.id);
    const deptCounts = deptLabels.map(id => students.filter(s => s.dept === id).length);

    const canvasEnrollment = document.getElementById('chart-enrollment');
    if (canvasEnrollment && window.Chart) {
      if (state.chartEnrollment) state.chartEnrollment.destroy();

      const isDark = state.theme === 'dark';
      const textColor = isDark ? '#cbd5e1' : '#475569';
      const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';

      state.chartEnrollment = new Chart(canvasEnrollment, {
        type: 'bar',
        data: {
          labels: deptLabels,
          datasets: [{
            label: 'Enrolled Students',
            data: deptCounts,
            backgroundColor: [
              'rgba(37, 99, 235, 0.85)',
              'rgba(99, 102, 241, 0.85)',
              'rgba(16, 185, 129, 0.85)',
              'rgba(245, 158, 11, 0.85)',
              'rgba(239, 68, 68, 0.85)'
            ],
            borderRadius: 8,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', weight: '600' } }
            },
            y: {
              grid: { color: gridColor },
              ticks: { color: textColor, stepSize: 1 }
            }
          }
        }
      });
    }

    // B. Chart 2: Grade Performance Distribution
    const gradesMap = { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
    results.forEach(r => {
      if (gradesMap[r.grade] !== undefined) {
        gradesMap[r.grade]++;
      }
    });

    const canvasGrades = document.getElementById('chart-grades');
    if (canvasGrades && window.Chart) {
      if (state.chartGrades) state.chartGrades.destroy();

      state.chartGrades = new Chart(canvasGrades, {
        type: 'doughnut',
        data: {
          labels: ['A+ (90-100%)', 'A (80-89%)', 'B (70-79%)', 'C (60-69%)', 'D (50-59%)', 'F (Fail)'],
          datasets: [{
            data: [gradesMap['A+'], gradesMap['A'], gradesMap['B'], gradesMap['C'], gradesMap['D'], gradesMap['F']],
            backgroundColor: [
              '#10b981', // A+ emerald
              '#3b82f6', // A blue
              '#6366f1', // B indigo
              '#f59e0b', // C amber
              '#8b5cf6', // D purple
              '#ef4444'  // F red
            ],
            borderWidth: 2,
            borderColor: state.theme === 'dark' ? '#1e293b' : '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: state.theme === 'dark' ? '#cbd5e1' : '#475569',
                font: { size: 11, family: 'Plus Jakarta Sans' },
                padding: 12
              }
            }
          },
          cutout: '68%'
        }
      });
    }
  }

  function renderDashboardRecentStudents(students) {
    const tbody = document.getElementById('dash-recent-students-tbody');
    if (!tbody) return;

    const recent = students.slice(0, 5);
    tbody.innerHTML = recent.map(s => `
      <tr>
        <td class="mono fw-600">${escapeHTML(s.id)}</td>
        <td>
          <div class="user-table-cell">
            <img src="${escapeHTML(s.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80')}" alt="" class="table-avatar">
            <div class="user-cell-meta">
              <span class="user-cell-name">${escapeHTML(s.name)}</span>
              <span class="user-cell-sub">${escapeHTML(s.email)}</span>
            </div>
          </div>
        </td>
        <td><span class="status-badge" style="background: var(--bg-muted);">${escapeHTML(s.dept)}</span></td>
        <td>${escapeHTML(s.class)}</td>
        <td><span class="status-badge ${s.status.toLowerCase()}">${escapeHTML(s.status)}</span></td>
        <td>
          <button class="btn btn-sm btn-secondary" onclick="window.app.viewStudentProfile('${s.id}')">
            <i class="fa-solid fa-eye"></i> View
          </button>
        </td>
      </tr>
    `).join('');
  }

  function renderDashboardUpcomingExams(exams) {
    const container = document.getElementById('dash-upcoming-exams-list');
    if (!container) return;

    const upcoming = exams.slice(0, 3);
    container.innerHTML = upcoming.map(e => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid var(--border-light);">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--warning-light); color: var(--warning-hover); display: flex; align-items: center; justify-content: center; font-size: 1rem;">
            <i class="fa-solid fa-book-bookmark"></i>
          </div>
          <div>
            <div style="font-size: 0.88rem; font-weight: 700; color: var(--text-main);">${escapeHTML(e.subject)}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${escapeHTML(e.name)} &bull; ${escapeHTML(e.class)}</div>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--primary);">${escapeHTML(e.date)}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">${e.totalMarks} Marks</div>
        </div>
      </div>
    `).join('');
  }

  function renderDashboardActivityFeed() {
    const container = document.getElementById('dash-activity-feed');
    if (!container) return;

    const notifs = getData(KEYS.NOTIFICATIONS, []).slice(0, 4);
    container.innerHTML = notifs.map(n => `
      <div style="display: flex; gap: 0.75rem; padding: 0.65rem 0; border-bottom: 1px solid var(--border-light);">
        <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--primary); margin-top: 6px;"></div>
        <div>
          <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-main);">${escapeHTML(n.title)}</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary);">${escapeHTML(n.desc)}</div>
          <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 2px;">${escapeHTML(n.time)}</div>
        </div>
      </div>
    `).join('');
  }

  /* ============================================================================
     STUDENT MANAGEMENT MODULE (CRUD)
     ============================================================================ */
  function initStudentModule() {
    // Open Add Student Modal
    const btnAdd = document.getElementById('btn-open-add-student-modal');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => openStudentModal('add'));
    }

    // Export Students CSV
    const btnExport = document.getElementById('btn-export-students-csv');
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        exportTableToCSV('students', 'university_students.csv');
      });
    }

    // Filter controls
    const searchInput = document.getElementById('students-search-input');
    const filterDept = document.getElementById('students-filter-dept');
    const filterClass = document.getElementById('students-filter-class');
    const filterStatus = document.getElementById('students-filter-status');

    [searchInput, filterDept, filterClass, filterStatus].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          state.studentsPage = 1;
          renderStudentsTable();
        });
        input.addEventListener('change', () => {
          state.studentsPage = 1;
          renderStudentsTable();
        });
      }
    });

    // Form submit
    const studentForm = document.getElementById('form-student');
    if (studentForm) {
      studentForm.addEventListener('submit', handleStudentFormSubmit);
    }

    // Modal Profile Tabs
    const modalTabs = document.querySelectorAll('#modal-student-profile .modal-tab-btn');
    modalTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        modalTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const targetPane = tab.getAttribute('data-tab');
        const panes = document.querySelectorAll('#modal-student-profile .tab-pane');
        panes.forEach(p => {
          if (p.id === targetPane) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
      });
    });
  }

  function populateStudentDepartmentAndClassDropdowns() {
    const depts = getData(KEYS.DEPARTMENTS, []);
    const classes = getData(KEYS.CLASSES, []);

    // Department Filter on Students View
    const filterDept = document.getElementById('students-filter-dept');
    if (filterDept) {
      filterDept.innerHTML = '<option value="ALL">All Departments</option>' +
        depts.map(d => `<option value="${d.id}">${d.id} - ${escapeHTML(d.name)}</option>`).join('');
    }

    // Class Filter on Students View
    const filterClass = document.getElementById('students-filter-class');
    if (filterClass) {
      filterClass.innerHTML = '<option value="ALL">All Classes</option>' +
        classes.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    }

    // Department Dropdown in Student Form
    const formDept = document.getElementById('stu-dept');
    if (formDept) {
      formDept.innerHTML = depts.map(d => `<option value="${d.id}">${d.id} (${escapeHTML(d.name)})</option>`).join('');
    }

    // Class Dropdown in Student Form
    const formClass = document.getElementById('stu-class');
    if (formClass) {
      formClass.innerHTML = classes.map(c => `<option value="${c.name}">${c.name} (${c.dept})</option>`).join('');
    }
  }

  function getFilteredStudents() {
    const students = getData(KEYS.STUDENTS, []);
    const search = (document.getElementById('students-search-input')?.value || '').toLowerCase().trim();
    const dept = document.getElementById('students-filter-dept')?.value || 'ALL';
    const cls = document.getElementById('students-filter-class')?.value || 'ALL';
    const status = document.getElementById('students-filter-status')?.value || 'ALL';

    return students.filter(s => {
      const matchSearch = !search ||
        (s.name && s.name.toLowerCase().includes(search)) ||
        (s.id && s.id.toLowerCase().includes(search)) ||
        (s.phone && s.phone.toLowerCase().includes(search)) ||
        (s.email && s.email.toLowerCase().includes(search));

      const matchDept = dept === 'ALL' || s.dept === dept;
      const matchClass = cls === 'ALL' || s.class === cls;
      const matchStatus = status === 'ALL' || s.status === status;

      return matchSearch && matchDept && matchClass && matchStatus;
    });
  }

  function renderStudentsTable() {
    const filtered = getFilteredStudents();
    const tbody = document.getElementById('students-table-body');
    const badge = document.getElementById('students-count-badge');
    const totalPages = Math.ceil(filtered.length / state.studentsPerPage) || 1;

    if (state.studentsPage > totalPages) state.studentsPage = totalPages;
    if (state.studentsPage < 1) state.studentsPage = 1;

    const startIdx = (state.studentsPage - 1) * state.studentsPerPage;
    const paginated = filtered.slice(startIdx, startIdx + state.studentsPerPage);

    if (badge) badge.textContent = `Showing ${filtered.length} students`;

    if (!tbody) return;

    if (paginated.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
            <i class="fa-solid fa-user-slash" style="font-size: 2rem; margin-bottom: 0.75rem; display: block;"></i>
            No student records found matching the filter criteria.
          </td>
        </tr>
      `;
      renderStudentsPagination(totalPages);
      return;
    }

    tbody.innerHTML = paginated.map(s => `
      <tr>
        <td class="mono fw-700" style="color: var(--primary);">${escapeHTML(s.id)}</td>
        <td>
          <div class="user-table-cell">
            <img src="${escapeHTML(s.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80')}" alt="" class="table-avatar">
            <div class="user-cell-meta">
              <span class="user-cell-name">${escapeHTML(s.name)}</span>
              <span class="user-cell-sub">Father: ${escapeHTML(s.fatherName || '-')}</span>
            </div>
          </div>
        </td>
        <td><span class="status-badge" style="background: var(--bg-muted);">${escapeHTML(s.dept)}</span></td>
        <td>${escapeHTML(s.class)}</td>
        <td>${escapeHTML(s.semester)}</td>
        <td class="mono">${escapeHTML(s.phone)}</td>
        <td><span class="status-badge ${s.status.toLowerCase()}">${escapeHTML(s.status)}</span></td>
        <td style="text-align: right;">
          <div class="action-buttons-group" style="justify-content: flex-end;">
            <button class="btn-action view" title="View Full Profile" onclick="window.app.viewStudentProfile('${s.id}')">
              <i class="fa-solid fa-id-card"></i>
            </button>
            <button class="btn-action edit" title="Edit Student" onclick="window.app.editStudent('${s.id}')">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-action delete" title="Delete Student" onclick="window.app.deleteStudent('${s.id}')">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    renderStudentsPagination(totalPages);
  }

  function renderStudentsPagination(totalPages) {
    const pageNumEl = document.getElementById('students-current-page');
    const totalPagesEl = document.getElementById('students-total-pages');
    const buttonsContainer = document.getElementById('students-pagination-buttons');

    if (pageNumEl) pageNumEl.textContent = state.studentsPage;
    if (totalPagesEl) totalPagesEl.textContent = totalPages;

    if (!buttonsContainer) return;

    let html = `
      <button class="page-btn" ${state.studentsPage <= 1 ? 'disabled' : ''} onclick="window.app.changeStudentPage(${state.studentsPage - 1})">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
      html += `
        <button class="page-btn ${i === state.studentsPage ? 'active' : ''}" onclick="window.app.changeStudentPage(${i})">
          ${i}
        </button>
      `;
    }

    html += `
      <button class="page-btn" ${state.studentsPage >= totalPages ? 'disabled' : ''} onclick="window.app.changeStudentPage(${state.studentsPage + 1})">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    `;

    buttonsContainer.innerHTML = html;
  }

  function openStudentModal(mode, studentId = null) {
    populateStudentDepartmentAndClassDropdowns();

    const form = document.getElementById('form-student');
    const modalTitle = document.getElementById('modal-student-title');
    const modeInput = document.getElementById('student-form-mode');
    const origIdInput = document.getElementById('student-original-id');
    const idInput = document.getElementById('stu-id');

    if (form) form.reset();

    if (mode === 'add') {
      modalTitle.innerHTML = '<i class="fa-solid fa-user-plus" style="color: var(--primary);"></i> Add New Student';
      modeInput.value = 'add';
      origIdInput.value = '';
      idInput.readOnly = false;

      // Suggest next auto ID
      const students = getData(KEYS.STUDENTS, []);
      const nextNum = students.length + 1;
      idInput.value = `STU-2024-${String(nextNum).padStart(3, '0')}`;
      document.getElementById('stu-admission-date').value = new Date().toISOString().split('T')[0];
    } else {
      modalTitle.innerHTML = '<i class="fa-solid fa-user-pen" style="color: var(--warning-hover);"></i> Edit Student Information';
      modeInput.value = 'edit';
      origIdInput.value = studentId;
      idInput.readOnly = true;

      const students = getData(KEYS.STUDENTS, []);
      const stu = students.find(s => s.id === studentId);
      if (!stu) return;

      document.getElementById('stu-name').value = stu.name || '';
      document.getElementById('stu-father-name').value = stu.fatherName || '';
      document.getElementById('stu-gender').value = stu.gender || 'Male';
      document.getElementById('stu-dob').value = stu.dob || '';
      document.getElementById('stu-cnic').value = stu.cnic || '';
      document.getElementById('stu-phone').value = stu.phone || '';
      document.getElementById('stu-email').value = stu.email || '';
      document.getElementById('stu-address').value = stu.address || '';
      document.getElementById('stu-photo').value = stu.photo || '';
      document.getElementById('stu-id').value = stu.id || '';
      document.getElementById('stu-dept').value = stu.dept || '';
      document.getElementById('stu-class').value = stu.class || '';
      document.getElementById('stu-semester').value = stu.semester || 'Semester 1';
      document.getElementById('stu-session').value = stu.session || '2024-2028';
      document.getElementById('stu-admission-date').value = stu.admissionDate || '';
      document.getElementById('stu-status').value = stu.status || 'Active';
    }

    openModal('modal-student');
  }

  function handleStudentFormSubmit(e) {
    e.preventDefault();

    const mode = document.getElementById('student-form-mode').value;
    const origId = document.getElementById('student-original-id').value;
    const id = document.getElementById('stu-id').value.trim();
    const name = document.getElementById('stu-name').value.trim();
    const fatherName = document.getElementById('stu-father-name').value.trim();
    const gender = document.getElementById('stu-gender').value;
    const dob = document.getElementById('stu-dob').value;
    const cnic = document.getElementById('stu-cnic').value.trim();
    const phone = document.getElementById('stu-phone').value.trim();
    const email = document.getElementById('stu-email').value.trim();
    const address = document.getElementById('stu-address').value.trim();
    const photo = document.getElementById('stu-photo').value.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
    const dept = document.getElementById('stu-dept').value;
    const cls = document.getElementById('stu-class').value;
    const semester = document.getElementById('stu-semester').value;
    const session = document.getElementById('stu-session').value.trim();
    const admissionDate = document.getElementById('stu-admission-date').value;
    const status = document.getElementById('stu-status').value;

    if (!id || !name || !email || !phone || !dob || !cnic) {
      showToast('Validation Error', 'Please complete all required fields.', 'error');
      return;
    }

    const students = getData(KEYS.STUDENTS, []);

    // Check duplicate ID
    if (mode === 'add') {
      const exists = students.some(s => s.id.toLowerCase() === id.toLowerCase());
      if (exists) {
        showToast('Duplicate Student ID', `Student ID ${id} already exists! Use a unique ID.`, 'error');
        return;
      }
    }

    const record = {
      id,
      name,
      fatherName,
      gender,
      dob,
      cnic,
      phone,
      email,
      address,
      photo,
      dept,
      class: cls,
      semester,
      session,
      admissionDate,
      status
    };

    if (mode === 'add') {
      students.unshift(record);
      addNotification('Student Enrolled', `${name} (${id}) registered under ${dept}.`, 'success');
      showToast('Success', `Student ${name} successfully registered.`, 'success');
    } else {
      const idx = students.findIndex(s => s.id === origId);
      if (idx !== -1) {
        students[idx] = record;
        addNotification('Student Record Updated', `Information updated for ${name} (${id}).`, 'info');
        showToast('Updated', `Student record ${id} updated successfully.`, 'success');
      }
    }

    saveData(KEYS.STUDENTS, students);
    closeModal('modal-student');
    renderStudentsTable();
    renderDashboard();
  }

  function viewStudentProfile(studentId) {
    const students = getData(KEYS.STUDENTS, []);
    const stu = students.find(s => s.id === studentId);
    if (!stu) return;

    // Set Hero details
    document.getElementById('view-stu-photo').src = stu.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';
    document.getElementById('view-stu-name').textContent = stu.name;
    document.getElementById('view-stu-id').textContent = stu.id;
    document.getElementById('view-stu-dept').textContent = stu.dept;
    document.getElementById('view-stu-class').textContent = stu.class;
    document.getElementById('view-stu-session').textContent = stu.session;

    const badge = document.getElementById('view-stu-status-badge');
    badge.className = `status-badge ${stu.status.toLowerCase()}`;
    badge.textContent = stu.status;

    // Tab 1: Personal
    document.getElementById('vp-father-name').textContent = stu.fatherName || '-';
    document.getElementById('vp-gender').textContent = stu.gender || '-';
    document.getElementById('vp-dob').textContent = stu.dob || '-';
    document.getElementById('vp-cnic').textContent = stu.cnic || '-';
    document.getElementById('vp-phone').textContent = stu.phone || '-';
    document.getElementById('vp-email').textContent = stu.email || '-';
    document.getElementById('vp-address').textContent = stu.address || 'Campus Dorms, University Enclave';

    // Tab 2: Academic
    document.getElementById('vp-id').textContent = stu.id;
    document.getElementById('vp-dept').textContent = stu.dept;
    document.getElementById('vp-class').textContent = stu.class;
    document.getElementById('vp-semester').textContent = stu.semester;
    document.getElementById('vp-session').textContent = stu.session;
    document.getElementById('vp-admission-date').textContent = stu.admissionDate;

    // Tab 3: Attendance History
    const allAttendance = getData(KEYS.ATTENDANCE, []);
    const attTbody = document.getElementById('vp-att-tbody');
    let totalClasses = 0;
    let presentCount = 0;
    let absentCount = 0;
    let rowsHtml = '';

    allAttendance.forEach(att => {
      if (att.records && att.records[studentId]) {
        totalClasses++;
        const st = att.records[studentId];
        if (st === 'Present' || st === 'Late') presentCount++;
        if (st === 'Absent') absentCount++;

        rowsHtml += `
          <tr>
            <td>${escapeHTML(att.date)}</td>
            <td>${escapeHTML(att.class)}</td>
            <td><span class="status-badge ${st.toLowerCase()}">${escapeHTML(st)}</span></td>
          </tr>
        `;
      }
    });

    document.getElementById('vp-att-total').textContent = totalClasses;
    document.getElementById('vp-att-present').textContent = presentCount;
    document.getElementById('vp-att-absent').textContent = absentCount;
    const pct = totalClasses > 0 ? ((presentCount / totalClasses) * 100).toFixed(1) : '100';
    document.getElementById('vp-att-pct').textContent = `${pct}%`;

    attTbody.innerHTML = rowsHtml || `<tr><td colspan="3" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No historical attendance records logged for this student.</td></tr>`;

    // Tab 4: Results
    const allResults = getData(KEYS.RESULTS, []);
    const studentResults = allResults.filter(r => r.studentId === studentId);
    const resTbody = document.getElementById('vp-results-tbody');
    if (studentResults.length === 0) {
      resTbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No examination results on record.</td></tr>`;
    } else {
      resTbody.innerHTML = studentResults.map(r => `
        <tr>
          <td>${escapeHTML(r.exam)}</td>
          <td>${escapeHTML(r.subject)}</td>
          <td>${r.totalMarks}</td>
          <td><strong>${r.obtainedMarks}</strong></td>
          <td>${r.percentage}%</td>
          <td><strong style="color: var(--primary);">${escapeHTML(r.grade)}</strong></td>
          <td><span class="status-badge ${r.status.toLowerCase()}">${escapeHTML(r.status)}</span></td>
        </tr>
      `).join('');
    }

    // Tab 5: Fees
    const allFees = getData(KEYS.FEES, []);
    const studentFees = allFees.filter(f => f.studentId === studentId);
    const feeTbody = document.getElementById('vp-fees-tbody');
    if (studentFees.length === 0) {
      feeTbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No fee vouchers issued.</td></tr>`;
    } else {
      feeTbody.innerHTML = studentFees.map(f => `
        <tr>
          <td>${escapeHTML(f.feeType)}</td>
          <td>$${f.totalFee}</td>
          <td>$${f.paidAmount}</td>
          <td style="color: ${f.remainingAmount > 0 ? 'var(--danger)' : 'var(--success)'}; font-weight: 700;">$${f.remainingAmount}</td>
          <td>${escapeHTML(f.dueDate)}</td>
          <td><span class="status-badge ${f.status.toLowerCase()}">${escapeHTML(f.status)}</span></td>
        </tr>
      `).join('');
    }

    // Reset tabs to personal info tab
    const tabs = document.querySelectorAll('#modal-student-profile .modal-tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    tabs[0].classList.add('active');

    const panes = document.querySelectorAll('#modal-student-profile .tab-pane');
    panes.forEach(p => p.classList.remove('active'));
    panes[0].classList.add('active');

    openModal('modal-student-profile');
  }

  function deleteStudent(studentId) {
    const students = getData(KEYS.STUDENTS, []);
    const stu = students.find(s => s.id === studentId);
    if (!stu) return;

    openConfirmModal(`Permanently delete student ${stu.name} (${stu.id})? All associated records will be removed.`, () => {
      const updated = students.filter(s => s.id !== studentId);
      saveData(KEYS.STUDENTS, updated);
      addNotification('Student Removed', `Student ${stu.name} (${stu.id}) has been removed.`, 'danger');
      showToast('Deleted', `Student ${stu.name} deleted.`, 'info');
      renderStudentsTable();
      renderDashboard();
    });
  }

  /* ============================================================================
     TEACHER MANAGEMENT MODULE (CRUD)
     ============================================================================ */
  function initTeacherModule() {
    const btnAdd = document.getElementById('btn-open-add-teacher-modal');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => openTeacherModal('add'));
    }

    const btnExport = document.getElementById('btn-export-teachers-csv');
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        exportTableToCSV('teachers', 'faculty_directory.csv');
      });
    }

    const searchInput = document.getElementById('teachers-search-input');
    const filterDept = document.getElementById('teachers-filter-dept');
    [searchInput, filterDept].forEach(el => {
      if (el) {
        el.addEventListener('input', renderTeachersTable);
        el.addEventListener('change', renderTeachersTable);
      }
    });

    const form = document.getElementById('form-teacher');
    if (form) {
      form.addEventListener('submit', handleTeacherFormSubmit);
    }
  }

  function populateTeacherDeptDropdown() {
    const depts = getData(KEYS.DEPARTMENTS, []);
    const filterDept = document.getElementById('teachers-filter-dept');
    if (filterDept) {
      filterDept.innerHTML = '<option value="ALL">All Departments</option>' +
        depts.map(d => `<option value="${d.id}">${d.id} - ${escapeHTML(d.name)}</option>`).join('');
    }

    const formDept = document.getElementById('t-dept');
    if (formDept) {
      formDept.innerHTML = depts.map(d => `<option value="${d.id}">${d.id} (${escapeHTML(d.name)})</option>`).join('');
    }
  }

  function renderTeachersTable() {
    populateTeacherDeptDropdown();

    const teachers = getData(KEYS.TEACHERS, []);
    const search = (document.getElementById('teachers-search-input')?.value || '').toLowerCase().trim();
    const dept = document.getElementById('teachers-filter-dept')?.value || 'ALL';
    const tbody = document.getElementById('teachers-table-body');
    const badge = document.getElementById('teachers-count-badge');

    const filtered = teachers.filter(t => {
      const matchSearch = !search ||
        (t.name && t.name.toLowerCase().includes(search)) ||
        (t.id && t.id.toLowerCase().includes(search)) ||
        (t.subject && t.subject.toLowerCase().includes(search));

      const matchDept = dept === 'ALL' || t.dept === dept;
      return matchSearch && matchDept;
    });

    if (badge) badge.textContent = `Showing ${filtered.length} faculty members`;
    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-muted);">No faculty members found.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(t => `
      <tr>
        <td class="mono fw-700">${escapeHTML(t.id)}</td>
        <td>
          <div class="user-table-cell">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--secondary-light); color: var(--secondary); display: flex; align-items: center; justify-content: center; font-weight: 700;">
              ${escapeHTML(t.name.split(' ').map(n=>n[0]).join('').slice(0, 2))}
            </div>
            <div class="user-cell-meta">
              <span class="user-cell-name">${escapeHTML(t.name)}</span>
              <span class="user-cell-sub">${escapeHTML(t.email)}</span>
            </div>
          </div>
        </td>
        <td><span class="status-badge" style="background: var(--bg-muted);">${escapeHTML(t.dept)}</span></td>
        <td>${escapeHTML(t.qualification)}</td>
        <td><strong>${escapeHTML(t.subject)}</strong></td>
        <td class="mono">${escapeHTML(t.phone)}</td>
        <td><span class="status-badge ${t.status === 'Active' ? 'active' : 'suspended'}">${escapeHTML(t.status)}</span></td>
        <td style="text-align: right;">
          <div class="action-buttons-group" style="justify-content: flex-end;">
            <button class="btn-action edit" title="Edit Teacher" onclick="window.app.editTeacher('${t.id}')">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-action delete" title="Delete Teacher" onclick="window.app.deleteTeacher('${t.id}')">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function openTeacherModal(mode, teacherId = null) {
    populateTeacherDeptDropdown();

    const form = document.getElementById('form-teacher');
    const modalTitle = document.getElementById('modal-teacher-title');
    const modeInput = document.getElementById('teacher-form-mode');
    const origIdInput = document.getElementById('teacher-original-id');
    const idInput = document.getElementById('t-id');

    if (form) form.reset();

    if (mode === 'add') {
      modalTitle.innerHTML = '<i class="fa-solid fa-chalkboard-user" style="color: var(--primary);"></i> Add Faculty Member';
      modeInput.value = 'add';
      origIdInput.value = '';
      idInput.readOnly = false;

      const teachers = getData(KEYS.TEACHERS, []);
      idInput.value = `TCH-${100 + teachers.length + 1}`;
      document.getElementById('t-joining-date').value = new Date().toISOString().split('T')[0];
    } else {
      modalTitle.innerHTML = '<i class="fa-solid fa-pen-to-square" style="color: var(--warning-hover);"></i> Edit Faculty Details';
      modeInput.value = 'edit';
      origIdInput.value = teacherId;
      idInput.readOnly = true;

      const teachers = getData(KEYS.TEACHERS, []);
      const t = teachers.find(x => x.id === teacherId);
      if (!t) return;

      document.getElementById('t-id').value = t.id;
      document.getElementById('t-name').value = t.name;
      document.getElementById('t-father-name').value = t.fatherName || '';
      document.getElementById('t-gender').value = t.gender || 'Male';
      document.getElementById('t-dept').value = t.dept;
      document.getElementById('t-qualification').value = t.qualification;
      document.getElementById('t-subject').value = t.subject;
      document.getElementById('t-phone').value = t.phone;
      document.getElementById('t-email').value = t.email;
      document.getElementById('t-joining-date').value = t.joiningDate;
      document.getElementById('t-salary').value = t.salary || '';
      document.getElementById('t-status').value = t.status || 'Active';
      document.getElementById('t-address').value = t.address || '';
    }

    openModal('modal-teacher');
  }

  function handleTeacherFormSubmit(e) {
    e.preventDefault();

    const mode = document.getElementById('teacher-form-mode').value;
    const origId = document.getElementById('teacher-original-id').value;
    const id = document.getElementById('t-id').value.trim();
    const name = document.getElementById('t-name').value.trim();
    const fatherName = document.getElementById('t-father-name').value.trim();
    const gender = document.getElementById('t-gender').value;
    const dept = document.getElementById('t-dept').value;
    const qualification = document.getElementById('t-qualification').value.trim();
    const subject = document.getElementById('t-subject').value.trim();
    const phone = document.getElementById('t-phone').value.trim();
    const email = document.getElementById('t-email').value.trim();
    const joiningDate = document.getElementById('t-joining-date').value;
    const salary = Number(document.getElementById('t-salary').value) || 0;
    const status = document.getElementById('t-status').value;
    const address = document.getElementById('t-address').value.trim();

    if (!id || !name || !email || !qualification || !subject) {
      showToast('Validation Error', 'Please complete all required faculty fields.', 'error');
      return;
    }

    const teachers = getData(KEYS.TEACHERS, []);

    if (mode === 'add') {
      const exists = teachers.some(t => t.id.toLowerCase() === id.toLowerCase());
      if (exists) {
        showToast('Duplicate Teacher ID', `Teacher ID ${id} is already taken!`, 'error');
        return;
      }
    }

    const record = {
      id,
      name,
      fatherName,
      gender,
      dept,
      qualification,
      subject,
      phone,
      email,
      joiningDate,
      salary,
      status,
      address
    };

    if (mode === 'add') {
      teachers.push(record);
      addNotification('Faculty Appointed', `${name} joined ${dept} Department.`, 'success');
      showToast('Faculty Added', `Faculty member ${name} recorded.`, 'success');
    } else {
      const idx = teachers.findIndex(t => t.id === origId);
      if (idx !== -1) {
        teachers[idx] = record;
        showToast('Faculty Updated', `Details updated for ${name}.`, 'success');
      }
    }

    saveData(KEYS.TEACHERS, teachers);
    closeModal('modal-teacher');
    renderTeachersTable();
    renderDashboard();
  }

  function deleteTeacher(teacherId) {
    const teachers = getData(KEYS.TEACHERS, []);
    const t = teachers.find(x => x.id === teacherId);
    if (!t) return;

    openConfirmModal(`Permanently delete faculty record for ${t.name} (${t.id})?`, () => {
      const updated = teachers.filter(x => x.id !== teacherId);
      saveData(KEYS.TEACHERS, updated);
      addNotification('Faculty Removed', `Teacher record ${t.name} removed.`, 'danger');
      showToast('Deleted', `Faculty record ${t.name} deleted.`, 'info');
      renderTeachersTable();
      renderDashboard();
    });
  }

  /* ============================================================================
     DEPARTMENT MANAGEMENT MODULE (CRUD)
     ============================================================================ */
  function initDepartmentModule() {
    const btnAdd = document.getElementById('btn-open-add-dept-modal');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => openDepartmentModal('add'));
    }

    const searchInput = document.getElementById('dept-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', renderDepartmentsTable);
    }

    const form = document.getElementById('form-department');
    if (form) {
      form.addEventListener('submit', handleDepartmentFormSubmit);
    }
  }

  function renderDepartmentsTable() {
    const depts = getData(KEYS.DEPARTMENTS, []);
    const students = getData(KEYS.STUDENTS, []);
    const teachers = getData(KEYS.TEACHERS, []);
    const search = (document.getElementById('dept-search-input')?.value || '').toLowerCase().trim();
    const tbody = document.getElementById('departments-table-body');

    const filtered = depts.filter(d => {
      return !search ||
        d.id.toLowerCase().includes(search) ||
        d.name.toLowerCase().includes(search) ||
        d.head.toLowerCase().includes(search);
    });

    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">No departments found.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(d => {
      const studentCount = students.filter(s => s.dept === d.id).length;
      const teacherCount = teachers.filter(t => t.dept === d.id).length;

      return `
        <tr>
          <td class="mono fw-700" style="color: var(--primary);">${escapeHTML(d.id)}</td>
          <td><strong style="color: var(--text-main);">${escapeHTML(d.name)}</strong></td>
          <td>${escapeHTML(d.head)}</td>
          <td style="color: var(--text-secondary); max-width: 320px;">${escapeHTML(d.desc || '-')}</td>
          <td><span class="status-badge" style="background: var(--primary-light); color: var(--primary); font-size: 0.82rem;">${studentCount} Students</span></td>
          <td><span class="status-badge" style="background: var(--secondary-light); color: var(--secondary); font-size: 0.82rem;">${teacherCount} Faculty</span></td>
          <td style="text-align: right;">
            <div class="action-buttons-group" style="justify-content: flex-end;">
              <button class="btn-action edit" title="Edit Department" onclick="window.app.editDepartment('${d.id}')">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="btn-action delete" title="Delete Department" onclick="window.app.deleteDepartment('${d.id}')">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function openDepartmentModal(mode, deptId = null) {
    const form = document.getElementById('form-department');
    const modalTitle = document.getElementById('modal-dept-title');
    const modeInput = document.getElementById('dept-form-mode');
    const origIdInput = document.getElementById('dept-original-id');
    const idInput = document.getElementById('d-id');

    if (form) form.reset();

    if (mode === 'add') {
      modalTitle.innerHTML = '<i class="fa-solid fa-building-columns" style="color: var(--primary);"></i> Add Academic Department';
      modeInput.value = 'add';
      origIdInput.value = '';
      idInput.readOnly = false;
    } else {
      modalTitle.innerHTML = '<i class="fa-solid fa-pen-to-square" style="color: var(--warning-hover);"></i> Edit Department';
      modeInput.value = 'edit';
      origIdInput.value = deptId;
      idInput.readOnly = true;

      const depts = getData(KEYS.DEPARTMENTS, []);
      const d = depts.find(x => x.id === deptId);
      if (!d) return;

      document.getElementById('d-id').value = d.id;
      document.getElementById('d-name').value = d.name;
      document.getElementById('d-head').value = d.head;
      document.getElementById('d-desc').value = d.desc || '';
    }

    openModal('modal-department');
  }

  function handleDepartmentFormSubmit(e) {
    e.preventDefault();

    const mode = document.getElementById('dept-form-mode').value;
    const origId = document.getElementById('dept-original-id').value;
    const id = document.getElementById('d-id').value.trim().toUpperCase();
    const name = document.getElementById('d-name').value.trim();
    const head = document.getElementById('d-head').value.trim();
    const desc = document.getElementById('d-desc').value.trim();

    if (!id || !name || !head) {
      showToast('Validation Error', 'Department Code, Name, and Head of Department are required.', 'error');
      return;
    }

    const depts = getData(KEYS.DEPARTMENTS, []);

    if (mode === 'add') {
      const exists = depts.some(d => d.id.toLowerCase() === id.toLowerCase());
      if (exists) {
        showToast('Duplicate ID', `Department ID ${id} already exists!`, 'error');
        return;
      }
    }

    const record = { id, name, head, desc };

    if (mode === 'add') {
      depts.push(record);
      addNotification('Department Created', `New department ${name} (${id}) created.`, 'success');
      showToast('Created', `Department ${id} added successfully.`, 'success');
    } else {
      const idx = depts.findIndex(d => d.id === origId);
      if (idx !== -1) {
        depts[idx] = record;
        showToast('Updated', `Department ${id} updated.`, 'success');
      }
    }

    saveData(KEYS.DEPARTMENTS, depts);
    closeModal('modal-department');
    renderDepartmentsTable();
    populateStudentDepartmentAndClassDropdowns();
    renderDashboard();
  }

  function deleteDepartment(deptId) {
    const depts = getData(KEYS.DEPARTMENTS, []);
    const d = depts.find(x => x.id === deptId);
    if (!d) return;

    openConfirmModal(`Permanently delete ${d.name} (${d.id})? Warning: Students and classes in this department will remain.`, () => {
      const updated = depts.filter(x => x.id !== deptId);
      saveData(KEYS.DEPARTMENTS, updated);
      addNotification('Department Deleted', `Department ${d.id} deleted.`, 'danger');
      showToast('Deleted', `Department ${d.id} deleted.`, 'info');
      renderDepartmentsTable();
      populateStudentDepartmentAndClassDropdowns();
      renderDashboard();
    });
  }

  /* ============================================================================
     CLASS MANAGEMENT MODULE (CRUD)
     ============================================================================ */
  function initClassModule() {
    const btnAdd = document.getElementById('btn-open-add-class-modal');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => openClassModal('add'));
    }

    const searchInput = document.getElementById('class-search-input');
    const filterDept = document.getElementById('class-filter-dept');
    [searchInput, filterDept].forEach(el => {
      if (el) {
        el.addEventListener('input', renderClassesTable);
        el.addEventListener('change', renderClassesTable);
      }
    });

    const form = document.getElementById('form-class');
    if (form) {
      form.addEventListener('submit', handleClassFormSubmit);
    }
  }

  function populateClassFormDropdowns() {
    const depts = getData(KEYS.DEPARTMENTS, []);
    const teachers = getData(KEYS.TEACHERS, []);

    const filterDept = document.getElementById('class-filter-dept');
    if (filterDept) {
      filterDept.innerHTML = '<option value="ALL">All Departments</option>' +
        depts.map(d => `<option value="${d.id}">${d.id} - ${escapeHTML(d.name)}</option>`).join('');
    }

    const formDept = document.getElementById('c-dept');
    if (formDept) {
      formDept.innerHTML = depts.map(d => `<option value="${d.id}">${d.id} (${escapeHTML(d.name)})</option>`).join('');
    }

    const formTeacher = document.getElementById('c-teacher');
    if (formTeacher) {
      formTeacher.innerHTML = teachers.map(t => `<option value="${escapeHTML(t.name)}">${escapeHTML(t.name)} (${t.dept})</option>`).join('');
    }
  }

  function renderClassesTable() {
    populateClassFormDropdowns();

    const classes = getData(KEYS.CLASSES, []);
    const students = getData(KEYS.STUDENTS, []);
    const search = (document.getElementById('class-search-input')?.value || '').toLowerCase().trim();
    const dept = document.getElementById('class-filter-dept')?.value || 'ALL';
    const tbody = document.getElementById('classes-table-body');

    const filtered = classes.filter(c => {
      const matchSearch = !search ||
        c.name.toLowerCase().includes(search) ||
        c.id.toLowerCase().includes(search) ||
        (c.teacher && c.teacher.toLowerCase().includes(search));

      const matchDept = dept === 'ALL' || c.dept === dept;
      return matchSearch && matchDept;
    });

    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-muted);">No classes registered.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(c => {
      const stuCount = students.filter(s => s.class === c.name).length;

      return `
        <tr>
          <td class="mono fw-700">${escapeHTML(c.id)}</td>
          <td><strong style="color: var(--primary);">${escapeHTML(c.name)}</strong></td>
          <td><span class="status-badge" style="background: var(--bg-muted);">${escapeHTML(c.dept)}</span></td>
          <td>${escapeHTML(c.semester)}</td>
          <td>${escapeHTML(c.session)}</td>
          <td><strong>${escapeHTML(c.teacher)}</strong></td>
          <td><span class="status-badge active">${stuCount} Enrolled</span></td>
          <td style="text-align: right;">
            <div class="action-buttons-group" style="justify-content: flex-end;">
              <button class="btn-action edit" title="Edit Class" onclick="window.app.editClass('${c.id}')">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="btn-action delete" title="Delete Class" onclick="window.app.deleteClass('${c.id}')">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function openClassModal(mode, classId = null) {
    populateClassFormDropdowns();

    const form = document.getElementById('form-class');
    const modalTitle = document.getElementById('modal-class-title');
    const modeInput = document.getElementById('class-form-mode');
    const origIdInput = document.getElementById('class-original-id');
    const idInput = document.getElementById('c-id');

    if (form) form.reset();

    if (mode === 'add') {
      modalTitle.innerHTML = '<i class="fa-solid fa-users-rectangle" style="color: var(--primary);"></i> Add Class &amp; Section';
      modeInput.value = 'add';
      origIdInput.value = '';
      idInput.readOnly = false;

      const classes = getData(KEYS.CLASSES, []);
      idInput.value = `CLS-NEW-${classes.length + 1}`;
    } else {
      modalTitle.innerHTML = '<i class="fa-solid fa-pen-to-square" style="color: var(--warning-hover);"></i> Edit Class';
      modeInput.value = 'edit';
      origIdInput.value = classId;
      idInput.readOnly = true;

      const classes = getData(KEYS.CLASSES, []);
      const c = classes.find(x => x.id === classId);
      if (!c) return;

      document.getElementById('c-id').value = c.id;
      document.getElementById('c-name').value = c.name;
      document.getElementById('c-dept').value = c.dept;
      document.getElementById('c-semester').value = c.semester;
      document.getElementById('c-session').value = c.session;
      document.getElementById('c-teacher').value = c.teacher;
    }

    openModal('modal-class');
  }

  function handleClassFormSubmit(e) {
    e.preventDefault();

    const mode = document.getElementById('class-form-mode').value;
    const origId = document.getElementById('class-original-id').value;
    const id = document.getElementById('c-id').value.trim();
    const name = document.getElementById('c-name').value.trim();
    const dept = document.getElementById('c-dept').value;
    const semester = document.getElementById('c-semester').value;
    const session = document.getElementById('c-session').value.trim();
    const teacher = document.getElementById('c-teacher').value;

    if (!id || !name || !dept || !teacher) {
      showToast('Validation Error', 'Please complete all required fields.', 'error');
      return;
    }

    const classes = getData(KEYS.CLASSES, []);

    if (mode === 'add') {
      const exists = classes.some(c => c.id.toLowerCase() === id.toLowerCase() || c.name.toLowerCase() === name.toLowerCase());
      if (exists) {
        showToast('Duplicate Class', `Class ID ${id} or Name ${name} is already registered!`, 'error');
        return;
      }
    }

    const record = { id, name, dept, semester, session, teacher };

    if (mode === 'add') {
      classes.push(record);
      addNotification('Class Created', `Class section ${name} initialized.`, 'success');
      showToast('Created', `Class ${name} registered.`, 'success');
    } else {
      const idx = classes.findIndex(c => c.id === origId);
      if (idx !== -1) {
        classes[idx] = record;
        showToast('Updated', `Class ${name} updated.`, 'success');
      }
    }

    saveData(KEYS.CLASSES, classes);
    closeModal('modal-class');
    renderClassesTable();
    populateStudentDepartmentAndClassDropdowns();
    renderDashboard();
  }

  function deleteClass(classId) {
    const classes = getData(KEYS.CLASSES, []);
    const c = classes.find(x => x.id === classId);
    if (!c) return;

    openConfirmModal(`Permanently delete Class ${c.name}?`, () => {
      const updated = classes.filter(x => x.id !== classId);
      saveData(KEYS.CLASSES, updated);
      addNotification('Class Removed', `Class ${c.name} removed.`, 'danger');
      showToast('Deleted', `Class ${c.name} deleted.`, 'info');
      renderClassesTable();
      populateStudentDepartmentAndClassDropdowns();
      renderDashboard();
    });
  }

  /* ============================================================================
     ATTENDANCE MANAGEMENT MODULE
     ============================================================================ */
  function initAttendanceModule() {
    const selectClass = document.getElementById('att-select-class');
    const datePicker = document.getElementById('att-date-picker');
    const btnLoad = document.getElementById('btn-load-attendance');
    const btnSave = document.getElementById('btn-save-attendance');
    const btnAllPresent = document.getElementById('btn-mark-all-present');
    const btnExport = document.getElementById('btn-export-att-csv');

    if (datePicker && !datePicker.value) {
      datePicker.value = new Date().toISOString().split('T')[0];
    }

    if (btnLoad) {
      btnLoad.addEventListener('click', loadAttendanceSheet);
    }

    if (btnSave) {
      btnSave.addEventListener('click', saveCurrentAttendance);
    }

    if (btnAllPresent) {
      btnAllPresent.addEventListener('click', markAllPresent);
    }

    if (btnExport) {
      btnExport.addEventListener('click', () => {
        exportTableToCSV('attendance', 'attendance_sheet.csv');
      });
    }
  }

  function renderAttendanceModule() {
    const classes = getData(KEYS.CLASSES, []);
    const selectClass = document.getElementById('att-select-class');
    if (selectClass && classes.length > 0) {
      const curVal = selectClass.value;
      selectClass.innerHTML = classes.map(c => `<option value="${c.name}">${c.name} (${c.dept})</option>`).join('');
      if (curVal) selectClass.value = curVal;
    }

    loadAttendanceSheet();
  }

  function loadAttendanceSheet() {
    const cls = document.getElementById('att-select-class')?.value;
    const date = document.getElementById('att-date-picker')?.value || new Date().toISOString().split('T')[0];
    const tbody = document.getElementById('attendance-sheet-tbody');
    const students = getData(KEYS.STUDENTS, []).filter(s => s.class === cls && s.status === 'Active');
    const attendanceHistory = getData(KEYS.ATTENDANCE, []);

    // Check if attendance already exists for this class and date
    const existing = attendanceHistory.find(a => a.class === cls && a.date === date);
    state.attendanceBuffer = existing ? { ...existing.records } : {};

    // For any student without a record yet, default to 'Present'
    students.forEach(s => {
      if (!state.attendanceBuffer[s.id]) {
        state.attendanceBuffer[s.id] = 'Present';
      }
    });

    if (!tbody) return;

    if (students.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">No active students found enrolled in ${cls}.</td></tr>`;
      updateAttendanceStats(0, 0, 0, 0, 0);
      return;
    }

    tbody.innerHTML = students.map(s => {
      const currentStatus = state.attendanceBuffer[s.id] || 'Present';
      return `
        <tr>
          <td class="mono fw-700">${escapeHTML(s.id)}</td>
          <td>
            <div class="user-table-cell">
              <img src="${escapeHTML(s.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80')}" alt="" class="table-avatar">
              <div class="user-cell-meta">
                <span class="user-cell-name">${escapeHTML(s.name)}</span>
                <span class="user-cell-sub">${escapeHTML(s.email)}</span>
              </div>
            </div>
          </td>
          <td><span class="status-badge" style="background: var(--bg-muted);">${escapeHTML(s.dept)}</span></td>
          <td>${escapeHTML(s.class)}</td>
          <td>${escapeHTML(s.semester)}</td>
          <td style="text-align: center;">
            <div class="attendance-mark-btn-group" data-student-id="${s.id}">
              <button type="button" class="btn-att-mark ${currentStatus === 'Present' ? 'active-p' : ''}" onclick="window.app.setStudentAttendanceStatus('${s.id}', 'Present')">Present</button>
              <button type="button" class="btn-att-mark ${currentStatus === 'Absent' ? 'active-a' : ''}" onclick="window.app.setStudentAttendanceStatus('${s.id}', 'Absent')">Absent</button>
              <button type="button" class="btn-att-mark ${currentStatus === 'Late' ? 'active-l' : ''}" onclick="window.app.setStudentAttendanceStatus('${s.id}', 'Late')">Late</button>
              <button type="button" class="btn-att-mark ${currentStatus === 'Leave' ? 'active-lv' : ''}" onclick="window.app.setStudentAttendanceStatus('${s.id}', 'Leave')">Leave</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    calculateAttendanceBufferStats(students.length);
  }

  function setStudentAttendanceStatus(studentId, status) {
    state.attendanceBuffer[studentId] = status;

    // Update DOM buttons for this student row
    const group = document.querySelector(`.attendance-mark-btn-group[data-student-id="${studentId}"]`);
    if (group) {
      const btns = group.querySelectorAll('.btn-att-mark');
      btns.forEach(btn => {
        btn.className = 'btn-att-mark';
        if (btn.textContent === status) {
          if (status === 'Present') btn.classList.add('active-p');
          if (status === 'Absent') btn.classList.add('active-a');
          if (status === 'Late') btn.classList.add('active-l');
          if (status === 'Leave') btn.classList.add('active-lv');
        }
      });
    }

    const totalStudents = Object.keys(state.attendanceBuffer).length;
    calculateAttendanceBufferStats(totalStudents);
  }

  function markAllPresent() {
    Object.keys(state.attendanceBuffer).forEach(id => {
      state.attendanceBuffer[id] = 'Present';
    });

    const groups = document.querySelectorAll('.attendance-mark-btn-group');
    groups.forEach(g => {
      const btns = g.querySelectorAll('.btn-att-mark');
      btns.forEach(btn => {
        btn.className = 'btn-att-mark';
        if (btn.textContent === 'Present') btn.classList.add('active-p');
      });
    });

    calculateAttendanceBufferStats(Object.keys(state.attendanceBuffer).length);
    showToast('Updated', 'All students marked as Present.', 'info');
  }

  function calculateAttendanceBufferStats(total) {
    const values = Object.values(state.attendanceBuffer);
    const present = values.filter(v => v === 'Present').length;
    const absent = values.filter(v => v === 'Absent').length;
    const late = values.filter(v => v === 'Late').length;
    const leave = values.filter(v => v === 'Leave').length;

    updateAttendanceStats(total, present, absent, late, leave);
  }

  function updateAttendanceStats(total, present, absent, late, leave) {
    const statTotal = document.getElementById('att-stat-total');
    const statPresent = document.getElementById('att-stat-present');
    const statAbsent = document.getElementById('att-stat-absent');
    const statLate = document.getElementById('att-stat-late');
    const statLeave = document.getElementById('att-stat-leave');
    const statPct = document.getElementById('att-stat-percentage');

    if (statTotal) statTotal.textContent = total;
    if (statPresent) statPresent.textContent = present;
    if (statAbsent) statAbsent.textContent = absent;
    if (statLate) statLate.textContent = late;
    if (statLeave) statLeave.textContent = leave;

    // Formula: (Present / Total) * 100
    const pct = total > 0 ? (((present + late) / total) * 100).toFixed(1) : '0.0';
    if (statPct) statPct.textContent = `${pct}%`;
  }

  function saveCurrentAttendance() {
    const cls = document.getElementById('att-select-class')?.value;
    const date = document.getElementById('att-date-picker')?.value;

    if (!cls || !date) {
      showToast('Error', 'Please choose a class and date.', 'error');
      return;
    }

    const attendanceHistory = getData(KEYS.ATTENDANCE, []);
    const existingIndex = attendanceHistory.findIndex(a => a.class === cls && a.date === date);

    const record = {
      date,
      class: cls,
      records: { ...state.attendanceBuffer }
    };

    if (existingIndex !== -1) {
      attendanceHistory[existingIndex] = record;
    } else {
      attendanceHistory.unshift(record);
    }

    saveData(KEYS.ATTENDANCE, attendanceHistory);
    addNotification('Attendance Saved', `Roll call for ${cls} on ${date} saved to register.`, 'success');
    showToast('Saved!', `Attendance for ${cls} successfully saved.`, 'success');
    renderDashboard();
  }

  /* ============================================================================
     EXAMINATION MANAGEMENT MODULE (CRUD)
     ============================================================================ */
  function initExamModule() {
    const btnAdd = document.getElementById('btn-open-add-exam-modal');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => openExamModal('add'));
    }

    const btnExport = document.getElementById('btn-export-exams-csv');
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        exportTableToCSV('exams', 'examination_schedule.csv');
      });
    }

    const searchInput = document.getElementById('exams-search-input');
    const filterDept = document.getElementById('exams-filter-dept');
    const filterSem = document.getElementById('exams-filter-semester');
    [searchInput, filterDept, filterSem].forEach(el => {
      if (el) {
        el.addEventListener('input', renderExamsTable);
        el.addEventListener('change', renderExamsTable);
      }
    });

    const form = document.getElementById('form-exam');
    if (form) {
      form.addEventListener('submit', handleExamFormSubmit);
    }
  }

  function populateExamFormDropdowns() {
    const depts = getData(KEYS.DEPARTMENTS, []);
    const classes = getData(KEYS.CLASSES, []);
    const teachers = getData(KEYS.TEACHERS, []);

    const filterDept = document.getElementById('exams-filter-dept');
    if (filterDept) {
      filterDept.innerHTML = '<option value="ALL">All Departments</option>' +
        depts.map(d => `<option value="${d.id}">${d.id} - ${escapeHTML(d.name)}</option>`).join('');
    }

    const formDept = document.getElementById('ex-dept');
    if (formDept) {
      formDept.innerHTML = depts.map(d => `<option value="${d.id}">${d.id} (${escapeHTML(d.name)})</option>`).join('');
    }

    const formClass = document.getElementById('ex-class');
    if (formClass) {
      formClass.innerHTML = classes.map(c => `<option value="${c.name}">${c.name} (${c.dept})</option>`).join('');
    }

    const formTeacher = document.getElementById('ex-teacher');
    if (formTeacher) {
      formTeacher.innerHTML = teachers.map(t => `<option value="${escapeHTML(t.name)}">${escapeHTML(t.name)} (${t.dept})</option>`).join('');
    }
  }

  function renderExamsTable() {
    populateExamFormDropdowns();

    const exams = getData(KEYS.EXAMS, []);
    const search = (document.getElementById('exams-search-input')?.value || '').toLowerCase().trim();
    const dept = document.getElementById('exams-filter-dept')?.value || 'ALL';
    const sem = document.getElementById('exams-filter-semester')?.value || 'ALL';
    const tbody = document.getElementById('exams-table-body');

    const filtered = exams.filter(e => {
      const matchSearch = !search ||
        e.id.toLowerCase().includes(search) ||
        e.name.toLowerCase().includes(search) ||
        e.subject.toLowerCase().includes(search);

      const matchDept = dept === 'ALL' || e.dept === dept;
      return matchSearch && matchDept;
    });

    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 2rem; color: var(--text-muted);">No examinations scheduled.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(e => `
      <tr>
        <td class="mono fw-700">${escapeHTML(e.id)}</td>
        <td><strong style="color: var(--text-main);">${escapeHTML(e.name)}</strong></td>
        <td><span class="status-badge" style="background: var(--bg-muted);">${escapeHTML(e.dept)}</span></td>
        <td>${escapeHTML(e.class)}</td>
        <td><strong style="color: var(--primary);">${escapeHTML(e.subject)}</strong></td>
        <td><span style="font-size: 0.82rem; font-weight: 600;"><i class="fa-regular fa-calendar"></i> ${escapeHTML(e.date)}</span></td>
        <td><strong>${e.totalMarks}</strong> / ${e.passMarks}</td>
        <td>${escapeHTML(e.teacher)}</td>
        <td style="text-align: right;">
          <div class="action-buttons-group" style="justify-content: flex-end;">
            <button class="btn-action edit" title="Edit Exam" onclick="window.app.editExam('${e.id}')">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-action delete" title="Delete Exam" onclick="window.app.deleteExam('${e.id}')">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function openExamModal(mode, examId = null) {
    populateExamFormDropdowns();

    const form = document.getElementById('form-exam');
    const modalTitle = document.getElementById('modal-exam-title');
    const modeInput = document.getElementById('exam-form-mode');
    const origIdInput = document.getElementById('exam-original-id');
    const idInput = document.getElementById('ex-id');

    if (form) form.reset();

    if (mode === 'add') {
      modalTitle.innerHTML = '<i class="fa-solid fa-calendar-plus" style="color: var(--primary);"></i> Schedule Examination';
      modeInput.value = 'add';
      origIdInput.value = '';
      idInput.readOnly = false;

      const exams = getData(KEYS.EXAMS, []);
      idInput.value = `EX-2024-${String(exams.length + 1).padStart(2, '0')}`;
      document.getElementById('ex-date').value = new Date().toISOString().split('T')[0];
    } else {
      modalTitle.innerHTML = '<i class="fa-solid fa-pen-to-square" style="color: var(--warning-hover);"></i> Edit Examination';
      modeInput.value = 'edit';
      origIdInput.value = examId;
      idInput.readOnly = true;

      const exams = getData(KEYS.EXAMS, []);
      const e = exams.find(x => x.id === examId);
      if (!e) return;

      document.getElementById('ex-id').value = e.id;
      document.getElementById('ex-name').value = e.name;
      document.getElementById('ex-dept').value = e.dept;
      document.getElementById('ex-class').value = e.class;
      document.getElementById('ex-subject').value = e.subject;
      document.getElementById('ex-date').value = e.date;
      document.getElementById('ex-total-marks').value = e.totalMarks;
      document.getElementById('ex-pass-marks').value = e.passMarks;
      document.getElementById('ex-teacher').value = e.teacher;
    }

    openModal('modal-exam');
  }

  function handleExamFormSubmit(e) {
    e.preventDefault();

    const mode = document.getElementById('exam-form-mode').value;
    const origId = document.getElementById('exam-original-id').value;
    const id = document.getElementById('ex-id').value.trim();
    const name = document.getElementById('ex-name').value.trim();
    const dept = document.getElementById('ex-dept').value;
    const cls = document.getElementById('ex-class').value;
    const subject = document.getElementById('ex-subject').value.trim();
    const date = document.getElementById('ex-date').value;
    const totalMarks = Number(document.getElementById('ex-total-marks').value) || 100;
    const passMarks = Number(document.getElementById('ex-pass-marks').value) || 50;
    const teacher = document.getElementById('ex-teacher').value;

    if (!id || !name || !subject || !date) {
      showToast('Validation Error', 'Please complete all required fields.', 'error');
      return;
    }

    const exams = getData(KEYS.EXAMS, []);

    if (mode === 'add') {
      const exists = exams.some(x => x.id.toLowerCase() === id.toLowerCase());
      if (exists) {
        showToast('Duplicate Exam ID', `Exam ID ${id} is already taken!`, 'error');
        return;
      }
    }

    const record = { id, name, dept, class: cls, subject, date, totalMarks, passMarks, teacher };

    if (mode === 'add') {
      exams.push(record);
      addNotification('Exam Scheduled', `${name} (${subject}) scheduled for ${date}.`, 'warning');
      showToast('Scheduled', `Examination ${name} added.`, 'success');
    } else {
      const idx = exams.findIndex(x => x.id === origId);
      if (idx !== -1) {
        exams[idx] = record;
        showToast('Updated', `Examination ${name} updated.`, 'success');
      }
    }

    saveData(KEYS.EXAMS, exams);
    closeModal('modal-exam');
    renderExamsTable();
    renderDashboard();
  }

  function deleteExam(examId) {
    const exams = getData(KEYS.EXAMS, []);
    const e = exams.find(x => x.id === examId);
    if (!e) return;

    openConfirmModal(`Permanently delete exam ${e.name} (${e.subject})?`, () => {
      const updated = exams.filter(x => x.id !== examId);
      saveData(KEYS.EXAMS, updated);
      addNotification('Exam Cancelled', `Exam ${e.name} removed.`, 'danger');
      showToast('Deleted', `Exam ${e.name} deleted.`, 'info');
      renderExamsTable();
      renderDashboard();
    });
  }

  /* ============================================================================
     RESULT MANAGEMENT MODULE (CRUD & AUTO COMPUTATION)
     ============================================================================ */
  function initResultModule() {
    const btnAdd = document.getElementById('btn-open-add-result-modal');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => openResultModal('add'));
    }

    const btnExport = document.getElementById('btn-export-results-csv');
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        exportTableToCSV('results', 'student_examination_results.csv');
      });
    }

    const searchInput = document.getElementById('results-search-input');
    const filterDept = document.getElementById('results-filter-dept');
    const filterStatus = document.getElementById('results-filter-status');
    [searchInput, filterDept, filterStatus].forEach(el => {
      if (el) {
        el.addEventListener('input', renderResultsTable);
        el.addEventListener('change', renderResultsTable);
      }
    });

    // Live calculation listeners in Add Result Form
    const totalMarksInput = document.getElementById('res-total-marks');
    const obtainedMarksInput = document.getElementById('res-obtained-marks');
    [totalMarksInput, obtainedMarksInput].forEach(inp => {
      if (inp) inp.addEventListener('input', updateResultLiveCalculation);
    });

    const form = document.getElementById('form-result');
    if (form) {
      form.addEventListener('submit', handleResultFormSubmit);
    }
  }

  function populateResultFormDropdowns() {
    const students = getData(KEYS.STUDENTS, []);
    const exams = getData(KEYS.EXAMS, []);
    const depts = getData(KEYS.DEPARTMENTS, []);

    const filterDept = document.getElementById('results-filter-dept');
    if (filterDept) {
      filterDept.innerHTML = '<option value="ALL">All Departments</option>' +
        depts.map(d => `<option value="${d.id}">${d.id} - ${escapeHTML(d.name)}</option>`).join('');
    }

    const stuSelect = document.getElementById('res-student-select');
    if (stuSelect) {
      stuSelect.innerHTML = students.map(s => `
        <option value="${s.id}" data-name="${escapeHTML(s.name)}" data-dept="${s.dept}" data-class="${s.class}" data-sem="${s.semester}">
          ${s.id} - ${escapeHTML(s.name)} (${s.dept} / ${s.class})
        </option>
      `).join('');
    }

    const examSelect = document.getElementById('res-exam-select');
    if (examSelect) {
      examSelect.innerHTML = exams.map(e => `
        <option value="${escapeHTML(e.name)}" data-subject="${escapeHTML(e.subject)}" data-total="${e.totalMarks}">
          ${escapeHTML(e.name)} - ${escapeHTML(e.subject)} (${e.class})
        </option>
      `).join('');

      examSelect.addEventListener('change', () => {
        const opt = examSelect.selectedOptions[0];
        if (opt) {
          const sub = opt.getAttribute('data-subject');
          const tot = opt.getAttribute('data-total');
          if (sub) document.getElementById('res-subject').value = sub;
          if (tot) document.getElementById('res-total-marks').value = tot;
          updateResultLiveCalculation();
        }
      });
    }
  }

  function updateResultLiveCalculation() {
    const total = Number(document.getElementById('res-total-marks')?.value) || 100;
    const obtained = Number(document.getElementById('res-obtained-marks')?.value) || 0;

    let pct = 0;
    if (total > 0) {
      pct = ((obtained / total) * 100);
    }
    const pctFixed = pct.toFixed(1);

    // Grading System:
    // 90–100 = A+
    // 80–89 = A
    // 70–79 = B
    // 60–69 = C
    // 50–59 = D
    // Below 50 = F
    let grade = 'F';
    let status = 'Fail';

    if (pct >= 90) { grade = 'A+'; status = 'Pass'; }
    else if (pct >= 80) { grade = 'A'; status = 'Pass'; }
    else if (pct >= 70) { grade = 'B'; status = 'Pass'; }
    else if (pct >= 60) { grade = 'C'; status = 'Pass'; }
    else if (pct >= 50) { grade = 'D'; status = 'Pass'; }
    else { grade = 'F'; status = 'Fail'; }

    const pctEl = document.getElementById('res-preview-pct');
    const gradeEl = document.getElementById('res-preview-grade');
    const statusEl = document.getElementById('res-preview-status');

    if (pctEl) pctEl.textContent = `${pctFixed}%`;
    if (gradeEl) {
      gradeEl.textContent = grade;
      gradeEl.style.color = status === 'Pass' ? 'var(--success)' : 'var(--danger)';
    }
    if (statusEl) {
      statusEl.innerHTML = `<span class="status-badge ${status.toLowerCase()}">${status}</span>`;
    }
  }

  function renderResultsTable() {
    populateResultFormDropdowns();

    const results = getData(KEYS.RESULTS, []);
    const search = (document.getElementById('results-search-input')?.value || '').toLowerCase().trim();
    const dept = document.getElementById('results-filter-dept')?.value || 'ALL';
    const status = document.getElementById('results-filter-status')?.value || 'ALL';
    const tbody = document.getElementById('results-table-body');

    const filtered = results.filter(r => {
      const matchSearch = !search ||
        r.studentId.toLowerCase().includes(search) ||
        r.studentName.toLowerCase().includes(search) ||
        r.subject.toLowerCase().includes(search);

      const matchDept = dept === 'ALL' || r.dept === dept;
      const matchStatus = status === 'ALL' || r.status === status;

      return matchSearch && matchDept && matchStatus;
    });

    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="11" style="text-align: center; padding: 2rem; color: var(--text-muted);">No student examination results on record.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(r => `
      <tr>
        <td class="mono fw-700">${escapeHTML(r.studentId)}</td>
        <td><strong style="color: var(--text-main);">${escapeHTML(r.studentName)}</strong></td>
        <td>${escapeHTML(r.dept)} (${escapeHTML(r.class)})</td>
        <td>${escapeHTML(r.exam)}</td>
        <td><strong style="color: var(--primary);">${escapeHTML(r.subject)}</strong></td>
        <td>${r.totalMarks}</td>
        <td><strong>${r.obtainedMarks}</strong></td>
        <td class="fw-700">${r.percentage}%</td>
        <td><strong style="font-size: 1.05rem; color: ${r.status === 'Pass' ? 'var(--success)' : 'var(--danger)'};">${escapeHTML(r.grade)}</strong></td>
        <td><span class="status-badge ${r.status.toLowerCase()}">${escapeHTML(r.status)}</span></td>
        <td style="text-align: right;">
          <div class="action-buttons-group" style="justify-content: flex-end;">
            <button class="btn-action view" title="Print Result Card" onclick="window.app.showResultCard('${r.id}')">
              <i class="fa-solid fa-award"></i>
            </button>
            <button class="btn-action delete" title="Delete Result" onclick="window.app.deleteResult('${r.id}')">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function openResultModal(mode, resultId = null) {
    populateResultFormDropdowns();

    const form = document.getElementById('form-result');
    const modalTitle = document.getElementById('modal-result-title');
    const modeInput = document.getElementById('res-form-mode');
    const origIdInput = document.getElementById('res-original-id');

    if (form) form.reset();

    modalTitle.innerHTML = '<i class="fa-solid fa-square-poll-vertical" style="color: var(--primary);"></i> Record Student Result';
    modeInput.value = 'add';
    origIdInput.value = '';

    // Default subject if exams exist
    const examSelect = document.getElementById('res-exam-select');
    if (examSelect && examSelect.selectedOptions[0]) {
      const sub = examSelect.selectedOptions[0].getAttribute('data-subject');
      if (sub) document.getElementById('res-subject').value = sub;
    }

    updateResultLiveCalculation();
    openModal('modal-result');
  }

  function handleResultFormSubmit(e) {
    e.preventDefault();

    const stuSelect = document.getElementById('res-student-select');
    const opt = stuSelect.selectedOptions[0];
    if (!opt) {
      showToast('Error', 'Please select a student.', 'error');
      return;
    }

    const studentId = opt.value;
    const studentName = opt.getAttribute('data-name');
    const dept = opt.getAttribute('data-dept');
    const cls = opt.getAttribute('data-class');
    const semester = opt.getAttribute('data-sem');

    const exam = document.getElementById('res-exam-select').value;
    const subject = document.getElementById('res-subject').value.trim();
    const totalMarks = Number(document.getElementById('res-total-marks').value) || 100;
    const obtainedMarks = Number(document.getElementById('res-obtained-marks').value) || 0;

    if (obtainedMarks < 0 || obtainedMarks > totalMarks) {
      showToast('Validation Error', `Obtained marks must be between 0 and ${totalMarks}.`, 'error');
      return;
    }

    const results = getData(KEYS.RESULTS, []);

    // Prevent duplicate result entries for same student and exam
    const duplicate = results.some(r => r.studentId === studentId && r.exam === exam && r.subject.toLowerCase() === subject.toLowerCase());
    if (duplicate) {
      showToast('Duplicate Entry', `Result for ${studentName} on ${exam} (${subject}) already exists!`, 'error');
      return;
    }

    const pct = ((obtainedMarks / totalMarks) * 100);
    const pctFixed = Number(pct.toFixed(1));

    let grade = 'F';
    let status = 'Fail';
    if (pct >= 90) { grade = 'A+'; status = 'Pass'; }
    else if (pct >= 80) { grade = 'A'; status = 'Pass'; }
    else if (pct >= 70) { grade = 'B'; status = 'Pass'; }
    else if (pct >= 60) { grade = 'C'; status = 'Pass'; }
    else if (pct >= 50) { grade = 'D'; status = 'Pass'; }
    else { grade = 'F'; status = 'Fail'; }

    const record = {
      id: 'RES-' + Date.now(),
      studentId,
      studentName,
      dept,
      class: cls,
      semester,
      subject,
      exam,
      totalMarks,
      obtainedMarks,
      percentage: pctFixed,
      grade,
      status
    };

    results.unshift(record);
    saveData(KEYS.RESULTS, results);
    addNotification('Result Published', `Exam score recorded for ${studentName}: ${obtainedMarks}/${totalMarks} (${grade}).`, 'success');
    showToast('Result Added', `Result for ${studentName} successfully logged.`, 'success');

    closeModal('modal-result');
    renderResultsTable();
    renderDashboard();
  }

  function showResultCard(resultId) {
    const results = getData(KEYS.RESULTS, []);
    const r = results.find(x => x.id === resultId);
    if (!r) return;

    document.getElementById('rc-name').textContent = r.studentName;
    document.getElementById('rc-id').textContent = r.studentId;
    document.getElementById('rc-dept').textContent = r.dept;
    document.getElementById('rc-class').textContent = `${r.class} &bull; ${r.semester}`;
    document.getElementById('rc-exam').textContent = r.exam;
    document.getElementById('rc-subject').textContent = r.subject;

    document.getElementById('rc-obtained').textContent = r.obtainedMarks;
    document.getElementById('rc-total').textContent = r.totalMarks;
    document.getElementById('rc-pct').textContent = `${r.percentage}%`;

    const gradeEl = document.getElementById('rc-grade');
    gradeEl.textContent = r.grade;
    gradeEl.style.color = r.status === 'Pass' ? 'var(--success)' : 'var(--danger)';

    document.getElementById('rc-date').textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    openModal('modal-result-card');
  }

  function deleteResult(resultId) {
    const results = getData(KEYS.RESULTS, []);
    const r = results.find(x => x.id === resultId);
    if (!r) return;

    openConfirmModal(`Permanently delete result record for ${r.studentName} (${r.subject})?`, () => {
      const updated = results.filter(x => x.id !== resultId);
      saveData(KEYS.RESULTS, updated);
      showToast('Deleted', 'Result record removed.', 'info');
      renderResultsTable();
      renderDashboard();
    });
  }

  /* ============================================================================
     FEE MANAGEMENT MODULE
     ============================================================================ */
  function initFeeModule() {
    const btnAdd = document.getElementById('btn-open-add-fee-modal');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => openFeeModal('add'));
    }

    const btnExport = document.getElementById('btn-export-fees-csv');
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        exportTableToCSV('fees', 'fee_collection_ledger.csv');
      });
    }

    const searchInput = document.getElementById('fees-search-input');
    const filterStatus = document.getElementById('fees-filter-status');
    const filterType = document.getElementById('fees-filter-type');
    [searchInput, filterStatus, filterType].forEach(el => {
      if (el) {
        el.addEventListener('input', renderFeesTable);
        el.addEventListener('change', renderFeesTable);
      }
    });

    const form = document.getElementById('form-fee');
    if (form) {
      form.addEventListener('submit', handleFeeFormSubmit);
    }

    // Live remaining balance listener
    const totalInp = document.getElementById('fee-total');
    const paidInp = document.getElementById('fee-paid');
    [totalInp, paidInp].forEach(inp => {
      if (inp) {
        inp.addEventListener('input', () => {
          const tot = Number(totalInp.value) || 0;
          const paid = Number(paidInp.value) || 0;
          const rem = Math.max(0, tot - paid);
          const preview = document.getElementById('fee-preview-remaining');
          if (preview) preview.textContent = `$${rem}`;
        });
      }
    });
  }

  function populateFeeStudentDropdown() {
    const students = getData(KEYS.STUDENTS, []);
    const select = document.getElementById('fee-student-select');
    if (select) {
      select.innerHTML = students.map(s => `
        <option value="${s.id}" data-name="${escapeHTML(s.name)}" data-dept="${s.dept}" data-class="${s.class}">
          ${s.id} - ${escapeHTML(s.name)} (${s.dept})
        </option>
      `).join('');
    }
  }

  function renderFeesTable() {
    populateFeeStudentDropdown();

    const fees = getData(KEYS.FEES, []);
    const search = (document.getElementById('fees-search-input')?.value || '').toLowerCase().trim();
    const status = document.getElementById('fees-filter-status')?.value || 'ALL';
    const type = document.getElementById('fees-filter-type')?.value || 'ALL';
    const tbody = document.getElementById('fees-table-body');

    // Update Top Metric Cards
    const totalAssessed = fees.reduce((sum, f) => sum + Number(f.totalFee || 0), 0);
    const totalCollected = fees.reduce((sum, f) => sum + Number(f.paidAmount || 0), 0);
    const totalDue = fees.reduce((sum, f) => sum + Number(f.remainingAmount || 0), 0);
    const paidCount = fees.filter(f => f.status === 'Paid').length;
    const unpaidCount = fees.filter(f => f.status === 'Unpaid').length;

    const elTotal = document.getElementById('fee-stat-total');
    const elColl = document.getElementById('fee-stat-collected');
    const elDue = document.getElementById('fee-stat-outstanding');
    const elPaidCount = document.getElementById('fee-stat-paid-count');
    const elUnpaidCount = document.getElementById('fee-stat-unpaid-count');

    if (elTotal) elTotal.textContent = `$${totalAssessed.toLocaleString()}`;
    if (elColl) elColl.textContent = `$${totalCollected.toLocaleString()}`;
    if (elDue) elDue.textContent = `$${totalDue.toLocaleString()}`;
    if (elPaidCount) elPaidCount.textContent = paidCount;
    if (elUnpaidCount) elUnpaidCount.textContent = unpaidCount;

    const filtered = fees.filter(f => {
      const matchSearch = !search ||
        f.studentId.toLowerCase().includes(search) ||
        f.studentName.toLowerCase().includes(search);

      const matchStatus = status === 'ALL' || f.status === status;
      const matchType = type === 'ALL' || f.feeType === type;

      return matchSearch && matchStatus && matchType;
    });

    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 2rem; color: var(--text-muted);">No fee vouchers match your query.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(f => `
      <tr>
        <td class="mono fw-700">${escapeHTML(f.studentId)}</td>
        <td><strong style="color: var(--text-main);">${escapeHTML(f.studentName)}</strong></td>
        <td>${escapeHTML(f.dept)} (${escapeHTML(f.class)})</td>
        <td><span class="status-badge" style="background: var(--bg-muted);">${escapeHTML(f.feeType)}</span></td>
        <td class="fw-700">$${Number(f.totalFee).toLocaleString()}</td>
        <td style="color: var(--success); font-weight: 700;">$${Number(f.paidAmount).toLocaleString()}</td>
        <td style="color: ${f.remainingAmount > 0 ? 'var(--danger)' : 'var(--success)'}; font-weight: 700;">$${Number(f.remainingAmount).toLocaleString()}</td>
        <td>${escapeHTML(f.dueDate)}</td>
        <td><span class="status-badge ${f.status.toLowerCase()}">${escapeHTML(f.status)}</span></td>
        <td style="text-align: right;">
          <div class="action-buttons-group" style="justify-content: flex-end;">
            ${f.remainingAmount > 0 ? `
              <button class="btn btn-sm btn-success" title="Collect Payment" onclick="window.app.quickCollectPayment('${f.id}')" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">
                <i class="fa-solid fa-hand-holding-dollar"></i> Collect
              </button>
            ` : ''}
            <button class="btn-action delete" title="Delete Fee" onclick="window.app.deleteFee('${f.id}')">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function openFeeModal(mode, feeId = null) {
    populateFeeStudentDropdown();

    const form = document.getElementById('form-fee');
    const modalTitle = document.getElementById('modal-fee-title');
    const modeInput = document.getElementById('fee-form-mode');
    const origIdInput = document.getElementById('fee-original-id');

    if (form) form.reset();

    modalTitle.innerHTML = '<i class="fa-solid fa-receipt" style="color: var(--primary);"></i> Issue Fee Voucher';
    modeInput.value = 'add';
    origIdInput.value = '';

    // Set default due date
    const d = new Date();
    d.setDate(d.getDate() + 30);
    document.getElementById('fee-due-date').value = d.toISOString().split('T')[0];
    document.getElementById('fee-preview-remaining').textContent = '$0';

    openModal('modal-fee');
  }

  function handleFeeFormSubmit(e) {
    e.preventDefault();

    const stuSelect = document.getElementById('fee-student-select');
    const opt = stuSelect.selectedOptions[0];
    if (!opt) {
      showToast('Error', 'Please select a student.', 'error');
      return;
    }

    const studentId = opt.value;
    const studentName = opt.getAttribute('data-name');
    const dept = opt.getAttribute('data-dept');
    const cls = opt.getAttribute('data-class');

    const feeType = document.getElementById('fee-type').value;
    const totalFee = Number(document.getElementById('fee-total').value) || 0;
    const paidAmount = Number(document.getElementById('fee-paid').value) || 0;
    const dueDate = document.getElementById('fee-due-date').value;
    const paymentDate = document.getElementById('fee-payment-date').value;

    if (totalFee <= 0 || !dueDate) {
      showToast('Validation Error', 'Please enter a valid total fee and due date.', 'error');
      return;
    }

    const remainingAmount = Math.max(0, totalFee - paidAmount);
    let status = 'Unpaid';
    if (remainingAmount === 0 && paidAmount > 0) status = 'Paid';
    else if (paidAmount > 0 && remainingAmount > 0) status = 'Partial';

    const fees = getData(KEYS.FEES, []);
    const record = {
      id: 'FEE-' + Date.now(),
      studentId,
      studentName,
      dept,
      class: cls,
      feeType,
      totalFee,
      paidAmount,
      remainingAmount,
      dueDate,
      paymentDate,
      status
    };

    fees.unshift(record);
    saveData(KEYS.FEES, fees);
    addNotification('Fee Record Generated', `Fee voucher of $${totalFee} issued for ${studentName}.`, 'info');
    showToast('Success', `Fee voucher issued for ${studentName}.`, 'success');

    closeModal('modal-fee');
    renderFeesTable();
    renderDashboard();
  }

  function quickCollectPayment(feeId) {
    const fees = getData(KEYS.FEES, []);
    const f = fees.find(x => x.id === feeId);
    if (!f) return;

    openConfirmModal(`Confirm collection of remaining $${f.remainingAmount} balance for ${f.studentName}?`, () => {
      f.paidAmount = f.totalFee;
      f.remainingAmount = 0;
      f.status = 'Paid';
      f.paymentDate = new Date().toISOString().split('T')[0];

      saveData(KEYS.FEES, fees);
      addNotification('Fee Cleared', `Remaining dues cleared by ${f.studentName}.`, 'success');
      showToast('Payment Recorded', `Full fee cleared for ${f.studentName}.`, 'success');
      renderFeesTable();
      renderDashboard();
    });
  }

  function deleteFee(feeId) {
    const fees = getData(KEYS.FEES, []);
    const f = fees.find(x => x.id === feeId);
    if (!f) return;

    openConfirmModal(`Delete fee record for ${f.studentName} ($${f.totalFee})?`, () => {
      const updated = fees.filter(x => x.id !== feeId);
      saveData(KEYS.FEES, updated);
      showToast('Deleted', 'Fee record deleted.', 'info');
      renderFeesTable();
      renderDashboard();
    });
  }

  /* ============================================================================
     TIMETABLE MANAGEMENT MODULE
     ============================================================================ */
  function initTimetableModule() {
    const btnAdd = document.getElementById('btn-open-add-timetable-modal');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => openTimetableModal('add'));
    }

    const filterClass = document.getElementById('timetable-filter-class');
    const filterDay = document.getElementById('timetable-filter-day');
    [filterClass, filterDay].forEach(el => {
      if (el) {
        el.addEventListener('change', renderTimetableModule);
      }
    });

    const form = document.getElementById('form-timetable');
    if (form) {
      form.addEventListener('submit', handleTimetableFormSubmit);
    }
  }

  function populateTimetableDropdowns() {
    const classes = getData(KEYS.CLASSES, []);
    const teachers = getData(KEYS.TEACHERS, []);

    const filterClass = document.getElementById('timetable-filter-class');
    if (filterClass) {
      const cur = filterClass.value;
      filterClass.innerHTML = '<option value="ALL">All Classes (Full Schedule)</option>' +
        classes.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
      if (cur) filterClass.value = cur;
    }

    const formClass = document.getElementById('tt-class');
    if (formClass) {
      formClass.innerHTML = classes.map(c => `<option value="${c.name}">${c.name} (${c.dept})</option>`).join('');
    }

    const formTeacher = document.getElementById('tt-teacher');
    if (formTeacher) {
      formTeacher.innerHTML = teachers.map(t => `<option value="${escapeHTML(t.name)}">${escapeHTML(t.name)}</option>`).join('');
    }
  }

  function renderTimetableModule() {
    populateTimetableDropdowns();

    const timetable = getData(KEYS.TIMETABLE, []);
    const filterClass = document.getElementById('timetable-filter-class')?.value || 'ALL';
    const filterDay = document.getElementById('timetable-filter-day')?.value || 'ALL';

    const filtered = timetable.filter(slot => {
      const matchClass = filterClass === 'ALL' || slot.class === filterClass;
      const matchDay = filterDay === 'ALL' || slot.day === filterDay;
      return matchClass && matchDay;
    });

    // 1. Render Visual Weekly Grid
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    days.forEach(day => {
      const col = document.getElementById(`grid-col-${day}`);
      if (!col) return;

      const daySlots = timetable.filter(s => s.day === day && (filterClass === 'ALL' || s.class === filterClass));
      if (daySlots.length === 0) {
        col.innerHTML = '<div style="font-size: 0.72rem; color: var(--text-muted); text-align: center; padding: 1rem 0;">No lectures</div>';
      } else {
        col.innerHTML = daySlots.map(s => `
          <div class="timetable-slot-card">
            <div class="slot-subject">${escapeHTML(s.subject)}</div>
            <div class="slot-time"><i class="fa-regular fa-clock"></i> ${s.startTime} - ${s.endTime}</div>
            <div class="slot-room"><i class="fa-solid fa-location-dot"></i> ${escapeHTML(s.room)}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">${escapeHTML(s.class)} &bull; ${escapeHTML(s.teacher)}</div>
          </div>
        `).join('');
      }
    });

    // 2. Render List Table
    const tbody = document.getElementById('timetable-table-body');
    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">No timetable periods found.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(s => `
      <tr>
        <td><strong>${escapeHTML(s.day)}</strong></td>
        <td class="mono fw-600">${escapeHTML(s.startTime)} - ${escapeHTML(s.endTime)}</td>
        <td><strong style="color: var(--primary);">${escapeHTML(s.subject)}</strong></td>
        <td>${escapeHTML(s.class)}</td>
        <td><span class="status-badge" style="background: var(--bg-muted);">${escapeHTML(s.room)}</span></td>
        <td>${escapeHTML(s.teacher)}</td>
        <td style="text-align: right;">
          <div class="action-buttons-group" style="justify-content: flex-end;">
            <button class="btn-action delete" title="Delete Slot" onclick="window.app.deleteTimetableSlot('${s.id}')">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function openTimetableModal(mode, slotId = null) {
    populateTimetableDropdowns();

    const form = document.getElementById('form-timetable');
    const modalTitle = document.getElementById('modal-timetable-title');
    const modeInput = document.getElementById('tt-form-mode');
    const origIdInput = document.getElementById('tt-original-id');

    if (form) form.reset();

    modalTitle.innerHTML = '<i class="fa-solid fa-calendar-plus" style="color: var(--primary);"></i> Add Timetable Period';
    modeInput.value = 'add';
    origIdInput.value = '';

    openModal('modal-timetable');
  }

  function handleTimetableFormSubmit(e) {
    e.preventDefault();

    const cls = document.getElementById('tt-class').value;
    const day = document.getElementById('tt-day').value;
    const subject = document.getElementById('tt-subject').value.trim();
    const startTime = document.getElementById('tt-start-time').value;
    const endTime = document.getElementById('tt-end-time').value;
    const room = document.getElementById('tt-room').value.trim();
    const teacher = document.getElementById('tt-teacher').value;

    if (!cls || !day || !subject || !startTime || !endTime || !room || !teacher) {
      showToast('Validation Error', 'Please complete all timetable fields.', 'error');
      return;
    }

    const timetable = getData(KEYS.TIMETABLE, []);
    const record = {
      id: 'TT-' + Date.now(),
      class: cls,
      day,
      subject,
      startTime,
      endTime,
      room,
      teacher
    };

    timetable.push(record);
    saveData(KEYS.TIMETABLE, timetable);
    addNotification('Timetable Updated', `Period added for ${subject} (${cls}) on ${day}.`, 'info');
    showToast('Success', `Timetable slot added for ${cls}.`, 'success');

    closeModal('modal-timetable');
    renderTimetableModule();
  }

  function deleteTimetableSlot(slotId) {
    const timetable = getData(KEYS.TIMETABLE, []);
    const s = timetable.find(x => x.id === slotId);
    if (!s) return;

    openConfirmModal(`Delete timetable slot for ${s.subject} (${s.day})?`, () => {
      const updated = timetable.filter(x => x.id !== slotId);
      saveData(KEYS.TIMETABLE, updated);
      showToast('Deleted', 'Timetable slot removed.', 'info');
      renderTimetableModule();
    });
  }

  /* ============================================================================
     REPORTS & ANALYTICS MODULE (CSV EXPORT & PRINT)
     ============================================================================ */
  function initReportsModule() {
    const tabs = document.querySelectorAll('#view-reports .modal-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        state.activeReportType = tab.getAttribute('data-report');
        renderReportsModule();
      });
    });

    const btnPrint = document.getElementById('btn-print-active-report');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        const printMeta = document.getElementById('print-report-meta');
        if (printMeta) {
          printMeta.textContent = `Report: ${state.activeReportType.toUpperCase()} | Generated on ${new Date().toLocaleString()} by SMS Administrator`;
        }
        window.print();
      });
    }

    const btnExport = document.getElementById('btn-export-active-report-csv');
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        exportTableToCSV(state.activeReportType, `sms_${state.activeReportType}_report.csv`);
      });
    }
  }

  function renderReportsModule() {
    const titleEl = document.getElementById('report-title-display');
    const descEl = document.getElementById('report-desc-display');
    const timeEl = document.getElementById('report-timestamp');
    const thead = document.getElementById('report-table-head');
    const tbody = document.getElementById('report-table-body');

    if (timeEl) timeEl.textContent = new Date().toLocaleString();

    if (state.activeReportType === 'students') {
      titleEl.textContent = 'University Student Enrollment Report';
      descEl.textContent = 'Complete record of registered students across all academic cohorts.';
      thead.innerHTML = `
        <tr>
          <th>Student ID</th>
          <th>Student Name</th>
          <th>Father Name</th>
          <th>Department</th>
          <th>Class</th>
          <th>Semester</th>
          <th>Phone</th>
          <th>Status</th>
        </tr>
      `;
      const students = getData(KEYS.STUDENTS, []);
      tbody.innerHTML = students.map(s => `
        <tr>
          <td class="mono fw-700">${escapeHTML(s.id)}</td>
          <td><strong>${escapeHTML(s.name)}</strong></td>
          <td>${escapeHTML(s.fatherName)}</td>
          <td>${escapeHTML(s.dept)}</td>
          <td>${escapeHTML(s.class)}</td>
          <td>${escapeHTML(s.semester)}</td>
          <td class="mono">${escapeHTML(s.phone)}</td>
          <td><span class="status-badge ${s.status.toLowerCase()}">${escapeHTML(s.status)}</span></td>
        </tr>
      `).join('');
    } else if (state.activeReportType === 'departments') {
      titleEl.textContent = 'Academic Departmental Summary Report';
      descEl.textContent = 'Summary of departments, faculty head, and live enrolled counts.';
      thead.innerHTML = `
        <tr>
          <th>Code</th>
          <th>Department Name</th>
          <th>Head of Department</th>
          <th>Enrolled Students</th>
          <th>Assigned Faculty</th>
        </tr>
      `;
      const depts = getData(KEYS.DEPARTMENTS, []);
      const students = getData(KEYS.STUDENTS, []);
      const teachers = getData(KEYS.TEACHERS, []);
      tbody.innerHTML = depts.map(d => {
        const sCount = students.filter(s => s.dept === d.id).length;
        const tCount = teachers.filter(t => t.dept === d.id).length;
        return `
          <tr>
            <td class="mono fw-700">${escapeHTML(d.id)}</td>
            <td><strong>${escapeHTML(d.name)}</strong></td>
            <td>${escapeHTML(d.head)}</td>
            <td><span class="status-badge active">${sCount} Students</span></td>
            <td><span class="status-badge" style="background: var(--secondary-light); color: var(--secondary);">${tCount} Faculty</span></td>
          </tr>
        `;
      }).join('');
    } else if (state.activeReportType === 'attendance') {
      titleEl.textContent = 'Institutional Attendance Register Report';
      descEl.textContent = 'Detailed logs of attendance sessions recorded.';
      thead.innerHTML = `
        <tr>
          <th>Date</th>
          <th>Class</th>
          <th>Students Logged</th>
          <th>Present</th>
          <th>Absent</th>
          <th>Rate (%)</th>
        </tr>
      `;
      const atts = getData(KEYS.ATTENDANCE, []);
      tbody.innerHTML = atts.map(a => {
        const records = Object.values(a.records || {});
        const total = records.length;
        const present = records.filter(r => r === 'Present' || r === 'Late').length;
        const absent = records.filter(r => r === 'Absent').length;
        const pct = total > 0 ? ((present / total) * 100).toFixed(1) : '0';
        return `
          <tr>
            <td class="mono fw-700">${escapeHTML(a.date)}</td>
            <td><strong>${escapeHTML(a.class)}</strong></td>
            <td>${total}</td>
            <td style="color: var(--success); font-weight: 700;">${present}</td>
            <td style="color: var(--danger); font-weight: 700;">${absent}</td>
            <td><strong>${pct}%</strong></td>
          </tr>
        `;
      }).join('');
    } else if (state.activeReportType === 'results') {
      titleEl.textContent = 'Academic Examination Results & Performance Report';
      descEl.textContent = 'Official student transcripts, grades, percentages, and pass/fail standing.';
      thead.innerHTML = `
        <tr>
          <th>Student ID</th>
          <th>Student Name</th>
          <th>Exam</th>
          <th>Subject</th>
          <th>Obtained / Total</th>
          <th>Percentage</th>
          <th>Grade</th>
          <th>Status</th>
        </tr>
      `;
      const results = getData(KEYS.RESULTS, []);
      tbody.innerHTML = results.map(r => `
        <tr>
          <td class="mono fw-700">${escapeHTML(r.studentId)}</td>
          <td><strong>${escapeHTML(r.studentName)}</strong></td>
          <td>${escapeHTML(r.exam)}</td>
          <td>${escapeHTML(r.subject)}</td>
          <td>${r.obtainedMarks} / ${r.totalMarks}</td>
          <td>${r.percentage}%</td>
          <td><strong style="color: ${r.status === 'Pass' ? 'var(--success)' : 'var(--danger)'};">${escapeHTML(r.grade)}</strong></td>
          <td><span class="status-badge ${r.status.toLowerCase()}">${escapeHTML(r.status)}</span></td>
        </tr>
      `).join('');
    } else if (state.activeReportType === 'fees') {
      titleEl.textContent = 'Tuition & Fee Collection Ledger';
      descEl.textContent = 'Summary of assessed institutional fees, collected payments, and pending dues.';
      thead.innerHTML = `
        <tr>
          <th>Student ID</th>
          <th>Student Name</th>
          <th>Fee Type</th>
          <th>Total Fee</th>
          <th>Paid Amount</th>
          <th>Remaining</th>
          <th>Due Date</th>
          <th>Status</th>
        </tr>
      `;
      const fees = getData(KEYS.FEES, []);
      tbody.innerHTML = fees.map(f => `
        <tr>
          <td class="mono fw-700">${escapeHTML(f.studentId)}</td>
          <td><strong>${escapeHTML(f.studentName)}</strong></td>
          <td>${escapeHTML(f.feeType)}</td>
          <td>$${Number(f.totalFee).toLocaleString()}</td>
          <td style="color: var(--success); font-weight: 700;">$${Number(f.paidAmount).toLocaleString()}</td>
          <td style="color: ${f.remainingAmount > 0 ? 'var(--danger)' : 'var(--success)'}; font-weight: 700;">$${Number(f.remainingAmount).toLocaleString()}</td>
          <td>${escapeHTML(f.dueDate)}</td>
          <td><span class="status-badge ${f.status.toLowerCase()}">${escapeHTML(f.status)}</span></td>
        </tr>
      `).join('');
    } else if (state.activeReportType === 'teachers') {
      titleEl.textContent = 'Faculty & Staff Roster';
      descEl.textContent = 'Directory of university professors, qualifications, and specializations.';
      thead.innerHTML = `
        <tr>
          <th>ID</th>
          <th>Faculty Name</th>
          <th>Department</th>
          <th>Qualification</th>
          <th>Subject Specialization</th>
          <th>Phone</th>
          <th>Status</th>
        </tr>
      `;
      const teachers = getData(KEYS.TEACHERS, []);
      tbody.innerHTML = teachers.map(t => `
        <tr>
          <td class="mono fw-700">${escapeHTML(t.id)}</td>
          <td><strong>${escapeHTML(t.name)}</strong></td>
          <td>${escapeHTML(t.dept)}</td>
          <td>${escapeHTML(t.qualification)}</td>
          <td>${escapeHTML(t.subject)}</td>
          <td class="mono">${escapeHTML(t.phone)}</td>
          <td><span class="status-badge active">${escapeHTML(t.status)}</span></td>
        </tr>
      `).join('');
    }
  }

  function exportTableToCSV(dataType, filename) {
    let rows = [];

    if (dataType === 'students') {
      const students = getData(KEYS.STUDENTS, []);
      rows.push(['Student ID', 'Full Name', 'Father Name', 'Gender', 'DOB', 'CNIC', 'Phone', 'Email', 'Department', 'Class', 'Semester', 'Session', 'Admission Date', 'Status']);
      students.forEach(s => {
        rows.push([s.id, s.name, s.fatherName, s.gender, s.dob, s.cnic, s.phone, s.email, s.dept, s.class, s.semester, s.session, s.admissionDate, s.status]);
      });
    } else if (dataType === 'teachers') {
      const teachers = getData(KEYS.TEACHERS, []);
      rows.push(['Teacher ID', 'Name', 'Father Name', 'Department', 'Qualification', 'Specialization', 'Phone', 'Email', 'Joining Date', 'Status']);
      teachers.forEach(t => {
        rows.push([t.id, t.name, t.fatherName, t.dept, t.qualification, t.subject, t.phone, t.email, t.joiningDate, t.status]);
      });
    } else if (dataType === 'exams') {
      const exams = getData(KEYS.EXAMS, []);
      rows.push(['Exam ID', 'Exam Name', 'Department', 'Class', 'Subject', 'Date', 'Total Marks', 'Passing Marks', 'Teacher']);
      exams.forEach(e => {
        rows.push([e.id, e.name, e.dept, e.class, e.subject, e.date, e.totalMarks, e.passMarks, e.teacher]);
      });
    } else if (dataType === 'results') {
      const results = getData(KEYS.RESULTS, []);
      rows.push(['Student ID', 'Student Name', 'Department', 'Class', 'Semester', 'Exam', 'Subject', 'Total Marks', 'Obtained Marks', 'Percentage', 'Grade', 'Status']);
      results.forEach(r => {
        rows.push([r.studentId, r.studentName, r.dept, r.class, r.semester, r.exam, r.subject, r.totalMarks, r.obtainedMarks, r.percentage, r.grade, r.status]);
      });
    } else if (dataType === 'fees') {
      const fees = getData(KEYS.FEES, []);
      rows.push(['Student ID', 'Student Name', 'Department', 'Class', 'Fee Type', 'Total Fee', 'Paid Amount', 'Remaining Amount', 'Due Date', 'Status']);
      fees.forEach(f => {
        rows.push([f.studentId, f.studentName, f.dept, f.class, f.feeType, f.totalFee, f.paidAmount, f.remainingAmount, f.dueDate, f.status]);
      });
    } else if (dataType === 'attendance') {
      const atts = getData(KEYS.ATTENDANCE, []);
      rows.push(['Date', 'Class', 'Student ID', 'Attendance Status']);
      atts.forEach(a => {
        Object.entries(a.records || {}).forEach(([stuId, st]) => {
          rows.push([a.date, a.class, stuId, st]);
        });
      });
    } else {
      // Default fallback
      const students = getData(KEYS.STUDENTS, []);
      rows.push(['Student ID', 'Name', 'Department', 'Class', 'Status']);
      students.forEach(s => rows.push([s.id, s.name, s.dept, s.class, s.status]));
    }

    // Convert array of arrays to clean CSV string
    const csvContent = rows.map(r => r.map(field => {
      const str = field === null || field === undefined ? '' : String(field);
      return `"${str.replace(/"/g, '""')}"`;
    }).join(',')).join('\n');

    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('CSV Download Started', `Exported ${filename} successfully.`, 'success');
  }

  /* ============================================================================
     SETTINGS & PROFILE MODULE
     ============================================================================ */
  function initSettingsModule() {
    const profileForm = document.getElementById('admin-profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('setting-admin-name').value.trim();
        const email = document.getElementById('setting-admin-email').value.trim();
        const title = document.getElementById('setting-admin-title').value.trim();

        if (name && email) {
          const user = getData(KEYS.AUTH, { name: 'Dr. Administrator', role: 'Super Admin' });
          user.name = name;
          user.email = email;
          user.role = title || 'Administrator';
          saveData(KEYS.AUTH, user);
          applyUserSession(user);
          showToast('Profile Saved', 'Administrative credentials updated.', 'success');
        }
      });
    }

    const passForm = document.getElementById('change-password-form');
    if (passForm) {
      passForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const p1 = document.getElementById('setting-new-pass').value;
        const p2 = document.getElementById('setting-confirm-pass').value;

        if (!p1 || p1.length < 6) {
          showToast('Error', 'New password must have at least 6 characters.', 'error');
          return;
        }
        if (p1 !== p2) {
          showToast('Error', 'New passwords do not match.', 'error');
          return;
        }

        showToast('Password Updated', 'Demo password successfully updated.', 'success');
        passForm.reset();
      });
    }

    const btnReset = document.getElementById('btn-setting-reset-data');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        openConfirmModal('Reset and re-populate LocalStorage with realistic university demo data?', resetAllDemoData);
      });
    }

    const btnExportJson = document.getElementById('btn-setting-export-json');
    if (btnExportJson) {
      btnExportJson.addEventListener('click', exportCompleteJSONBackup);
    }

    const btnClearAll = document.getElementById('btn-setting-clear-all');
    if (btnClearAll) {
      btnClearAll.addEventListener('click', () => {
        openConfirmModal('Wipe all LocalStorage application records completely?', () => {
          localStorage.clear();
          showToast('Database Wiped', 'All records cleared. Reloading demo dataset...', 'warning');
          setTimeout(() => {
            seedDemoDataIfEmpty();
            location.reload();
          }, 1000);
        });
      });
    }
  }

  function resetAllDemoData() {
    saveData(KEYS.STUDENTS, INITIAL_STUDENTS);
    saveData(KEYS.TEACHERS, INITIAL_TEACHERS);
    saveData(KEYS.DEPARTMENTS, INITIAL_DEPARTMENTS);
    saveData(KEYS.CLASSES, INITIAL_CLASSES);
    saveData(KEYS.EXAMS, INITIAL_EXAMS);
    saveData(KEYS.RESULTS, INITIAL_RESULTS);
    saveData(KEYS.FEES, INITIAL_FEES);
    saveData(KEYS.TIMETABLE, INITIAL_TIMETABLE);
    saveData(KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
    saveData(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);

    refreshAllViews();
    showToast('Demo Data Restored', 'Complete sample university dataset loaded.', 'success');
  }

  function exportCompleteJSONBackup() {
    const backup = {
      exportedAt: new Date().toISOString(),
      students: getData(KEYS.STUDENTS, []),
      teachers: getData(KEYS.TEACHERS, []),
      departments: getData(KEYS.DEPARTMENTS, []),
      classes: getData(KEYS.CLASSES, []),
      exams: getData(KEYS.EXAMS, []),
      results: getData(KEYS.RESULTS, []),
      fees: getData(KEYS.FEES, []),
      timetable: getData(KEYS.TIMETABLE, []),
      attendance: getData(KEYS.ATTENDANCE, [])
    };

    const str = JSON.stringify(backup, null, 2);
    const blob = new Blob([str], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `sms_database_backup_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Backup Created', 'Full JSON database export downloaded.', 'success');
  }

  /* ============================================================================
     GLOBAL MODAL DISMISSAL & CONFIRMATION
     ============================================================================ */
  function initModalDismissHandlers() {
    // Buttons with data-close-modal="modal-id"
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close-modal');
        closeModal(modalId);
      });
    });

    // Close when clicking modal backdrop
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('show');
        }
      });
    });

    // Confirmation dialog confirm action
    const btnConfirm = document.getElementById('btn-confirm-delete-action');
    if (btnConfirm) {
      btnConfirm.addEventListener('click', () => {
        if (typeof state.deleteCallback === 'function') {
          state.deleteCallback();
        }
        closeModal('modal-confirm');
        state.deleteCallback = null;
      });
    }

    // Escape key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show'));
      }
    });
  }

  /* ============================================================================
     APP REFRESH ALL
     ============================================================================ */
  function refreshAllViews() {
    populateStudentDepartmentAndClassDropdowns();
    populateTeacherDeptDropdown();
    populateClassFormDropdowns();
    populateExamFormDropdowns();
    populateResultFormDropdowns();
    populateFeeStudentDropdown();
    populateTimetableDropdowns();

    renderDashboard();
    renderStudentsTable();
    renderTeachersTable();
    renderDepartmentsTable();
    renderClassesTable();
    renderExamsTable();
    renderResultsTable();
    renderFeesTable();
    renderTimetableModule();
    renderReportsModule();
    renderNotifications();
  }

  /* ============================================================================
     PUBLIC EXPORTS (ACCESSIBLE TO ONCLICK IN HTML)
     ============================================================================ */
  window.app = {
    navigateTo,
    viewStudentProfile,
    editStudent: (id) => openStudentModal('edit', id),
    deleteStudent,
    changeStudentPage: (p) => { state.studentsPage = p; renderStudentsTable(); },
    editTeacher: (id) => openTeacherModal('edit', id),
    deleteTeacher,
    editDepartment: (id) => openDepartmentModal('edit', id),
    deleteDepartment,
    editClass: (id) => openClassModal('edit', id),
    deleteClass,
    setStudentAttendanceStatus,
    editExam: (id) => openExamModal('edit', id),
    deleteExam,
    showResultCard,
    deleteResult,
    quickCollectPayment,
    deleteFee,
    deleteTimetableSlot
  };

  /* ============================================================================
     INITIALIZATION ON DOM READY
     ============================================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    seedDemoDataIfEmpty();
    initTheme();
    initAuth();
    initNavigation();
    initNotifications();
    initStudentModule();
    initTeacherModule();
    initDepartmentModule();
    initClassModule();
    initAttendanceModule();
    initExamModule();
    initResultModule();
    initFeeModule();
    initTimetableModule();
    initReportsModule();
    initSettingsModule();
    initModalDismissHandlers();
  });

})();
