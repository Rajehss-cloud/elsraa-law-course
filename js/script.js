const appState = {
  currentLanguage: localStorage.getItem('al_israa_lang') || 'ar',
  theme: localStorage.getItem('al_israa_theme') || 'dark',
  users: JSON.parse(localStorage.getItem('al_israa_users') || '[]'),
  enrollments: JSON.parse(localStorage.getItem('al_israa_enrollments') || '[]'),
  notices: JSON.parse(localStorage.getItem('al_israa_notices') || '[]'),
};

const translations = {
  ar: {
    hero_badge: 'مركز الإسراء للحقوق',
    hero_title: 'تعليم قانوني متقدم للحقوق<br />في جامعة الزقازيق',
    hero_subtitle: 'منصة تعليمية متكاملة تحت إشراف الدكتورة إسراء الدسوقي، تقدم شرحًا متقدمًا لجميع المواد الدراسية بكلية الحقوق، مع محتوى تفاعلي، محاضرات متقدمة، وتجربة تعليمية حديثة ثلاثية الأبعاد.',
    browse_courses: 'استكشف المقررات',
    join_now: 'انضم الآن',
    stat_courses: 'مادة قانونية',
    stat_students: 'طالب وطالبة',
    stat_success: 'نسبة متابعة',
    trusted_label: 'معتمد من:',
    about_eyebrow: 'من نحن',
    about_title: 'تعليم قانوني مستدام، أسلوب فخم، وتأثير فعلي',
    teacher_role: 'إشراف أكاديمي',
    teacher_bio: 'مدرّسة ومحاضرة متخصصة في الفقه والقانون، تعمل على توظيف أحدث أساليب التعليم التفاعلي، مع دعم الطلاب في الفهم العميق للمواد القانونية وتحويلهم إلى باحثين وممارسين فعليين.',
    feature_one_title: 'محاضرات قانونية متقدمة',
    feature_one_text: 'مخرجات تعليمية منظمة ومبسطة للمقررات الأساسية والحالات العملية.',
    feature_two_title: 'دعم تربوي مستمر',
    feature_two_text: 'مراجعات، أسئلة التطبيق، ومتابعة مباشرة عبر المجتمع التفاعلي.',
    feature_three_title: 'تعلم ثلاثي الأبعاد',
    feature_three_text: 'تجربة بصرية عالية الجودة تجمع بين التفاعل، التصميم، ومحتوى أكاديمي متقدم.',
    featured_eyebrow: 'المقررات المميزة',
    featured_title: 'المناهج الجامعية الأكثر طلبًا',
    view_all: 'عرض الكل',
    curriculum_eyebrow: 'المسار الأكاديمي',
    curriculum_title: 'نظرة سريعة على مناهج كلية الحقوق – جامعة الزقازيق',
  },
  en: {
    hero_badge: 'Al-Israa Law Center',
    hero_title: 'Advanced legal education<br />at Zagazig University',
    hero_subtitle: 'A fully integrated learning platform supervised by Dr. Israa El-Desouky, delivering advanced law teaching, interactive resources, and rich 3D educational experiences.',
    browse_courses: 'Browse Courses',
    join_now: 'Join Now',
    stat_courses: 'law subjects',
    stat_students: 'students',
    stat_success: 'engagement rate',
    trusted_label: 'Trusted by:',
    about_eyebrow: 'About us',
    about_title: 'Sustainable legal education, premium experience, real impact',
    teacher_role: 'Academic supervision',
    teacher_bio: 'An experienced law lecturer and educator who combines pedagogical excellence with modern interactive teaching tools to deepen students’ understanding of legal concepts and practical application.',
    feature_one_title: 'Advanced Legal Lectures',
    feature_one_text: 'Well-structured educational content covering core law topics and applied case studies.',
    feature_two_title: 'Continuous Academic Support',
    feature_two_text: 'Reviews, application exercises, and direct guidance through an active student community.',
    feature_three_title: '3D Learning Experience',
    feature_three_text: 'A premium visual design that merges technology, creativity, and academic excellence.',
    featured_eyebrow: 'Featured Courses',
    featured_title: 'Most Requested Law Curriculum Tracks',
    view_all: 'View all',
    curriculum_eyebrow: 'Academic Path',
    curriculum_title: 'Quick overview of the Faculty of Law curriculum at Zagazig University',
  }
};

const demoUsers = [
  { id: 1, name: 'محمد علي', faculty: 'كلية الحقوق - جامعة الزقازيق', year: 'الفرقة الثانية', email: 'student@example.com', phone: '01000000000', password: '123456', role: 'student' },
  { id: 2, name: 'Admin Master', faculty: 'Administration', year: 'Admin', email: 'admin@elsraa.com', phone: '0000000000', password: 'admin123', role: 'admin' },
];

const demoEnrollments = [
  { id: 1, studentId: 1, course: 'القانون المدني', status: 'approved', code: 'A-LC-1001' },
  { id: 2, studentId: 1, course: 'القانون الجنائي', status: 'pending', code: '' },
];

function ensureSeedData() {
  if (!appState.users.length) {
    appState.users = demoUsers;
    localStorage.setItem('al_israa_users', JSON.stringify(appState.users));
  }

  if (!appState.enrollments.length) {
    appState.enrollments = demoEnrollments;
    localStorage.setItem('al_israa_enrollments', JSON.stringify(appState.enrollments));
  }
}

function applyTheme() {
  document.body.classList.toggle('theme-dark', appState.theme === 'dark');
  document.body.classList.toggle('theme-light', appState.theme === 'light');
  const themeIcon = document.querySelector('.theme-toggle i');
  if (themeIcon) {
    themeIcon.textContent = appState.theme === 'dark' ? '☀' : '☾';
  }
  localStorage.setItem('al_israa_theme', appState.theme);
}

function applyLanguage() {
  const lang = appState.currentLanguage;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  localStorage.setItem('al_israa_lang', lang);
}

function bindLanguageToggle() {
  const toggle = document.querySelector('.lang-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    appState.currentLanguage = appState.currentLanguage === 'ar' ? 'en' : 'ar';
    applyLanguage();
    const label = toggle.querySelector('span');
    if (label) label.textContent = appState.currentLanguage === 'ar' ? 'EN' : 'AR';
  });

  const label = toggle.querySelector('span');
  if (label) label.textContent = appState.currentLanguage === 'ar' ? 'EN' : 'AR';
}

function bindThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
  });
}

function validateForm(form) {
  return form.checkValidity();
}

function buildUserProfile() {
  const currentUser = JSON.parse(localStorage.getItem('al_israa_current_user') || 'null');
  if (!currentUser) return;

  const studentName = document.getElementById('studentName');
  const studentFaculty = document.getElementById('studentFaculty');
  const studentCode = document.getElementById('studentCode');
  const antiPiracyCode = document.getElementById('antiPiracyCode');

  if (studentName) studentName.textContent = currentUser.name;
  if (studentFaculty) studentFaculty.textContent = currentUser.faculty;

  const code = generateAccessCode(currentUser.id);
  if (studentCode) studentCode.textContent = code;
  if (antiPiracyCode) antiPiracyCode.textContent = code;
}

function generateAccessCode(studentId) {
  const suffix = String(studentId).padStart(4, '0');
  return `A-LC-${suffix}`;
}

function renderStudentCourses() {
  const currentUser = JSON.parse(localStorage.getItem('al_israa_current_user') || 'null');
  const list = document.getElementById('studentCourses');
  if (!list || !currentUser) return;

  const courses = [
    { name: 'القانون المدني', progress: '72%', status: 'قيد التقدم' },
    { name: 'القانون الجنائي', progress: '54%', status: 'قيد التقدم' },
    { name: 'القانون الإداري', progress: '88%', status: 'مكتمل جزئيًا' },
  ];

  list.innerHTML = courses
    .map((course) => `
      <div class="course-item">
        <div>
          <strong>${course.name}</strong>
          <small>${course.status}</small>
        </div>
        <span>${course.progress}</span>
      </div>
    `)
    .join('');
}

function renderAdminRequests() {
  const requests = JSON.parse(localStorage.getItem('al_israa_enrollments') || '[]');
  const target = document.getElementById('adminRequests');
  if (!target) return;

  target.innerHTML = requests
    .map((req) => `
      <div class="request-item">
        <div>
          <strong>${req.course}</strong>
          <small>Status: ${req.status}</small>
        </div>
        <div class="request-actions">
          <button class="approve-btn" data-id="${req.id}">Approve</button>
          <button class="reject-btn" data-id="${req.id}">Reject</button>
        </div>
      </div>
    `)
    .join('');

  document.querySelectorAll('.approve-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const list = JSON.parse(localStorage.getItem('al_israa_enrollments') || '[]');
      const updated = list.map((item) =>
        item.id === id ? { ...item, status: 'approved', code: generateAccessCode(item.studentId || 1) } : item
      );
      localStorage.setItem('al_israa_enrollments', JSON.stringify(updated));
      renderAdminRequests();
      renderStudentDirectory();
    });
  });

  document.querySelectorAll('.reject-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const list = JSON.parse(localStorage.getItem('al_israa_enrollments') || '[]');
      const updated = list.map((item) =>
        item.id === id ? { ...item, status: 'rejected', code: '' } : item
      );
      localStorage.setItem('al_israa_enrollments', JSON.stringify(updated));
      renderAdminRequests();
    });
  });
}

function renderStudentDirectory() {
  const users = JSON.parse(localStorage.getItem('al_israa_users') || '[]');
  const target = document.getElementById('studentDirectory');
  if (!target) return;

  const rows = users
    .filter((user) => user.role === 'student')
    .map(
      (user) => `
        <div class="directory-row">
          <span>${user.name}</span>
          <span>${user.year}</span>
          <span>${user.faculty}</span>
          <span>${user.phone}</span>
          <span>${user.email}</span>
        </div>
      `
    )
    .join('');

  target.innerHTML = `
    <div class="directory-header">
      <span>الاسم</span>
      <span>الفرقة</span>
      <span>الكلية</span>
      <span>الهاتف</span>
      <span>البريد</span>
    </div>
    ${rows}
  `;
}

function loginUser(email, password) {
  const storedUsers = JSON.parse(localStorage.getItem('al_israa_users') || '[]');
  const user = storedUsers.find((item) => item.email === email && item.password === password);
  if (!user) {
    alert('بيانات الدخول غير صحيحة');
    return;
  }
  localStorage.setItem('al_israa_current_user', JSON.stringify(user));
  if (user.role === 'admin') {
    window.location.href = 'admin.html';
  } else {
    window.location.href = 'dashboard.html';
  }
}

function registerUser(payload) {
  const storedUsers = JSON.parse(localStorage.getItem('al_israa_users') || '[]');
  const exists = storedUsers.some((user) => user.email === payload.email);
  if (exists) {
    alert('هذا البريد الإلكتروني موجود بالفعل');
    return;
  }

  const newUser = {
    id: Date.now(),
    name: payload.name,
    faculty: payload.faculty,
    year: payload.year,
    phone: payload.phone,
    email: payload.email,
    password: payload.password,
    role: 'student',
  };

  const nextUsers = [...storedUsers, newUser];
  localStorage.setItem('al_israa_users', JSON.stringify(nextUsers));
  localStorage.setItem('al_israa_current_user', JSON.stringify(newUser));
  alert('تم إنشاء الحساب بنجاح، سيتم مراجعة طلبك من الإدارة.');
  window.location.href = 'dashboard.html';
}

function handleLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    loginUser(email, password);
  });
}

function handleRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    registerUser({
      name: document.getElementById('fullName').value.trim(),
      faculty: document.getElementById('faculty').value.trim(),
      year: document.getElementById('academicYear').value,
      phone: document.getElementById('phone').value.trim(),
      email: document.getElementById('email').value.trim(),
      password: document.getElementById('password').value.trim(),
    });
  });
}

function handleForgotPassword() {
  const form = document.getElementById('forgotForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني');
  });
}

function initCoursesTabs() {
  const tabs = document.querySelectorAll('.year-tab');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const year = tab.dataset.year;
      tabs.forEach((item) => item.classList.toggle('active', item === tab));
      document.querySelectorAll('.year-panel').forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.panel === year);
      });
    });
  });
}

function initCommunityTabs() {
  const tabs = document.querySelectorAll('.community-tab');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach((item) => item.classList.toggle('active', item === tab));
      document.querySelectorAll('.community-panel').forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.panel === target);
      });
    });
  });
}

function initChat() {
  const publicInput = document.getElementById('publicChatInput');
  const publicBtn = document.getElementById('sendPublicChat');
  const privateInput = document.getElementById('privateChatInput');
  const privateBtn = document.getElementById('sendPrivateChat');

  if (publicInput && publicBtn) {
    publicBtn.addEventListener('click', () => {
      const value = publicInput.value.trim();
      if (!value) return;
      const chat = document.getElementById('publicChatMessages');
      const row = document.createElement('div');
      row.className = 'chat-message';
      row.innerHTML = `<strong>أنت:</strong> ${value}`;
      chat.appendChild(row);
      publicInput.value = '';
    });
  }

  if (privateInput && privateBtn) {
    privateBtn.addEventListener('click', () => {
      const value = privateInput.value.trim();
      if (!value) return;
      const chat = document.getElementById('privateChatMessages');
      const row = document.createElement('div');
      row.className = 'chat-message';
      row.innerHTML = `<strong>أنت:</strong> ${value}`;
      chat.appendChild(row);
      privateInput.value = '';
    });
  }
}

function initTiltCards() {
  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1200px) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    });
  });
}

function initDemoNotice() {
  const asks = [
    { course: 'القانون المدني', student: 'محمد علي', status: 'pending' },
    { course: 'القانون الجنائي', student: 'سارة أحمد', status: 'pending' },
  ];
  const noticeTarget = document.querySelector('.notif-count');
  if (noticeTarget) {
    noticeTarget.textContent = String(asks.length);
  }
}

function initApp() {
  ensureSeedData();
  applyTheme();
  applyLanguage();
  bindLanguageToggle();
  bindThemeToggle();
  initCoursesTabs();
  initCommunityTabs();
  initChat();
  initTiltCards();
  initDemoNotice();
  renderStudentCourses();
  buildUserProfile();
  renderAdminRequests();
  renderStudentDirectory();
  handleLoginForm();
  handleRegisterForm();
  handleForgotPassword();
}

document.addEventListener('DOMContentLoaded', initApp);
