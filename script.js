const root=document.documentElement;
const themeToggle=document.getElementById('themeToggle');
const menuBtn=document.getElementById('menuBtn');
const navLinks=document.getElementById('navLinks');
const navAnchors=[...document.querySelectorAll('.nav-links a')];
const sections=[...document.querySelectorAll('main section[id]')];
const revealItems=[...document.querySelectorAll('.reveal')];
const tiltCard=document.querySelector('.tilt-card');
const languageButtons=[...document.querySelectorAll('.language-btn')];
const customCursor=document.getElementById('customCursor');
const customCursorParent=customCursor?.parentNode;
const customCursorNextSibling=customCursor?.nextSibling;
const projectDialog=document.getElementById('projectDialog');
const projectDialogClose=document.getElementById('projectDialogClose');
const projectDialogKicker=document.getElementById('projectDialogKicker');
const projectDialogNumber=document.getElementById('projectDialogNumber');
const projectDialogTitle=document.getElementById('projectDialogTitle');
const projectDialogStack=document.getElementById('projectDialogStack');
const projectDialogSummary=document.getElementById('projectDialogSummary');
const projectDialogDetails=document.getElementById('projectDialogDetails');
const projectCards=[...document.querySelectorAll('.project-card[data-project]')];
let currentProjectKey='',lastPointerPosition=null;
function syncCustomCursorPosition(x,y){if(!customCursor)return;const offset=customCursor.parentElement===projectDialog?projectDialog.getBoundingClientRect():{left:0,top:0};customCursor.style.transform=`translate3d(${x-offset.left}px,${y-offset.top}px,0) translate(-50%,-50%)`}

const translations={
  en:{
    'nav.about':'About','nav.experience':'Experience','nav.projects':'Projects','nav.contact':'Contact',
    'hero.location':'Surabaya, Indonesia','hero.title':'Building useful products<br />','hero.gradient':'from backend to interface.','hero.description':"I'm <strong>Djatu Hamidan Ardiwinanto (Danar)</strong>, a Full Stack Web Developer focused on dependable backend systems, clean APIs, and maintainable web applications.",'hero.explore':'Explore my work','hero.talk':"Let's talk",'hero.currentRole':'Current role','hero.currentCompany':'Current company',
    'profile.label':'PROFILE / 2026','profile.role':'FULL STACK DEVELOPER','profile.backend':'Backend-focused','profile.systems':'Web systems',
    'about.kicker':'About','about.title':'Systems that stay readable<br />after they grow.','about.p1':'My work spans web application development, transactional workflows, internal business tools, database-heavy systems, and API integrations. At Printsoft, I work on software used in printing-business operations including POS, order management, bookkeeping, and reporting.','about.p2':'I also built a reusable internal CodeIgniter 3 query-builder library to help the team write database queries that are cleaner, safer, and easier to maintain.','about.gpa':'Years Experience','about.projects':'Projects in portfolio','about.coreStack':'Core stack',
    'experience.kicker':'Experience','experience.title':'From database design<br />to production systems.','experience.presentDate':'Nov 2024 — Present','experience.current':'CURRENT','experience.printsoft1':'Develop and maintain web systems for printing-business operations, including POS, order management, bookkeeping, and reporting.','experience.printsoft2':'Build full-stack applications with CodeIgniter and MySQL.','experience.printsoft3':'Designed a reusable internal CI3 query-builder library for cleaner and more maintainable database access.','experience.printsoft4':'Design and implement REST APIs for transactional and operational workflows.','experience.gocement1':'Developed, maintained, troubleshot, and improved backend systems handling customer data.','experience.gocement2':'Implemented backend features with focus on speed, robustness, and security.','experience.gocement3':'Integrated Algolia product search and Twilio for 2FA and marketing needs.','experience.internRole':'Software Developer Intern','experience.bmi1':'Designed database structures using CDM/PDM.','experience.bmi2':'Built an investment monitoring & evaluation system with Python/Django.','experience.bmi3':'Built a seafood warehouse inventory system with Python/Django.','experience.labRole':'Database Design Lab Assistant','experience.lab1':'Assisted lecturers in teaching and guiding students on database-related topics.','experience.lab2':'Helped students solve database questions and acted as liaison between students and lecturers.',
    'projects.kicker':'Selected projects','projects.title':"Things I've designed<br />and shipped.",'projects.cqb':'A drop-in, backward-compatible extension of CodeIgniter 3 Query Builder with Laravel-inspired eager loading, aggregate subqueries, WHERE EXISTS / WHERE HAS, chunking, and more.','projects.cqbMeta':'99 documented public methods · 118-test MySQL & SQLite suites','projects.github':'View on GitHub','projects.pos':'A point-of-sale system for sales and inventory management, built to monitor stock and track inventory history efficiently.','projects.libraryTitle':'Campus Library Visitor Dashboard','projects.library':'Flexible dashboard showing visitor percentages across study programs, lecturers, staff, and external guests.','projects.chat':'Room-based real-time messaging application implemented with WebSocket and MySQL.','projects.investmentTitle':'Investment Monitoring & Evaluation','projects.investment':'Tracks target versus realization using the Hanumm Curve / S-Curve method, with investment data refreshed every five seconds.','projects.employeeTitle':'Employee Recruitment DSS','projects.employee':'A decision-support system that ranks recruitment recommendations based on selected HR criteria.','projects.guesthouseTitle':'Guesthouse Booking System','projects.guesthouse':'Room availability, booking, and post-stay review workflow built with Laravel and MySQL.','projects.laptopTitle':'Laptop Purchase DSS','projects.laptop':'Recommendation system combining AHP and SAW methods to rank laptops from user-selected criteria.',
    'education.kicker':'Education','education.title':'Foundation in<br />Information Systems.','education.degree':'Bachelor Degree in Sistem Informasi',
    'contact.kicker':'Contact','contact.title':'Have a project or<br />an opportunity in mind?','contact.copy':'Reach me directly by email, WhatsApp, or LinkedIn.','footer.built':'Designed & built with HTML, CSS & JavaScript.'
  },
  id:{
    'nav.about':'Tentang','nav.experience':'Pengalaman','nav.projects':'Proyek','nav.contact':'Kontak',
    'hero.location':'Surabaya, Indonesia','hero.title':'Membangun produk yang berguna<br />','hero.gradient':'dari backend hingga antarmuka.','hero.description':'Saya <strong>Djatu Hamidan Ardiwinanto (Danar)</strong>, seorang Full Stack Web Developer dengan fokus pada sistem backend yang andal, API yang rapi, dan aplikasi web yang mudah dipelihara.','hero.explore':'Lihat karya saya','hero.talk':'Mari bicara','hero.currentRole':'Posisi saat ini','hero.currentCompany':'Perusahaan saat ini',
    'profile.label':'PROFIL / 2026','profile.role':'FULL STACK DEVELOPER','profile.backend':'Fokus backend','profile.systems':'Sistem web',
    'about.kicker':'Tentang','about.title':'Sistem yang tetap mudah dibaca<br />meski terus berkembang.','about.p1':'Pekerjaan saya mencakup pengembangan aplikasi web, alur transaksi, tools internal bisnis, sistem yang berat di database, dan integrasi API. Di Printsoft, saya mengembangkan software untuk operasional bisnis percetakan seperti POS, manajemen pesanan, pembukuan, dan pelaporan.','about.p2':'Saya juga membangun library query builder internal CodeIgniter 3 yang reusable agar tim dapat menulis query database yang lebih bersih, aman, dan mudah dipelihara.','about.gpa':'Tahun Pengalaman','about.projects':'Proyek dalam portfolio','about.coreStack':'Stack utama',
    'experience.kicker':'Pengalaman','experience.title':'Dari desain database<br />hingga sistem produksi.','experience.presentDate':'Nov 2024 — Sekarang','experience.current':'SEKARANG','experience.printsoft1':'Mengembangkan dan memelihara sistem web untuk operasional bisnis percetakan, termasuk POS, manajemen pesanan, pembukuan, dan pelaporan.','experience.printsoft2':'Membangun aplikasi full-stack dengan CodeIgniter dan MySQL.','experience.printsoft3':'Merancang library query builder internal CI3 yang reusable untuk akses database yang lebih bersih dan mudah dipelihara.','experience.printsoft4':'Merancang dan mengimplementasikan REST API untuk alur kerja transaksional dan operasional.','experience.gocement1':'Mengembangkan, memelihara, melakukan troubleshooting, dan meningkatkan sistem backend yang menangani data pelanggan.','experience.gocement2':'Mengimplementasikan fitur backend dengan fokus pada kecepatan, ketahanan, dan keamanan.','experience.gocement3':'Mengintegrasikan pencarian produk Algolia dan Twilio untuk 2FA serta kebutuhan pemasaran.','experience.internRole':'Software Developer (Magang)','experience.bmi1':'Merancang struktur database menggunakan CDM/PDM.','experience.bmi2':'Membangun sistem monitoring & evaluasi investasi dengan Python/Django.','experience.bmi3':'Membangun sistem inventori gudang hasil laut dengan Python/Django.','experience.labRole':'Asisten Laboratorium Desain Database','experience.lab1':'Membantu dosen mengajar dan membimbing mahasiswa terkait topik database.','experience.lab2':'Membantu mahasiswa menyelesaikan pertanyaan database dan menjadi penghubung antara mahasiswa dan dosen.',
    'projects.kicker':'Proyek pilihan','projects.title':'Hal yang saya rancang<br />dan bangun.','projects.cqb':'Ekstensi drop-in dan backward-compatible untuk CodeIgniter 3 Query Builder dengan fitur bergaya Laravel seperti eager loading, aggregate subqueries, WHERE EXISTS / WHERE HAS, chunking, dan lainnya.','projects.cqbMeta':'99 public method terdokumentasi · 118 test untuk MySQL & SQLite','projects.github':'Lihat di GitHub','projects.pos':'Sistem point-of-sale untuk pengelolaan penjualan dan inventori, dirancang untuk memantau stok dan riwayat inventori secara efisien.','projects.libraryTitle':'Dashboard Pengunjung Perpustakaan Kampus','projects.library':'Dashboard fleksibel yang menampilkan persentase pengunjung dari program studi, dosen, karyawan, dan tamu eksternal.','projects.chat':'Aplikasi pesan realtime berbasis room yang dibangun menggunakan WebSocket dan MySQL.','projects.investmentTitle':'Monitoring & Evaluasi Investasi','projects.investment':'Membandingkan target dan realisasi menggunakan metode Kurva Hanumm / Kurva-S, dengan data investasi diperbarui setiap lima detik.','projects.employeeTitle':'SPK Penerimaan Karyawan','projects.employee':'Sistem pendukung keputusan yang memberi peringkat rekomendasi perekrutan berdasarkan kriteria SDM.','projects.guesthouseTitle':'Sistem Pemesanan Guesthouse','projects.guesthouse':'Alur ketersediaan kamar, pemesanan, dan ulasan setelah menginap menggunakan Laravel dan MySQL.','projects.laptopTitle':'SPK Pembelian Laptop','projects.laptop':'Sistem rekomendasi yang menggabungkan metode AHP dan SAW untuk memberi peringkat laptop berdasarkan kriteria pengguna.',
    'education.kicker':'Pendidikan','education.title':'Fondasi di bidang<br />Sistem Informasi.','education.degree':'Sarjana Sistem Informasi',
    'contact.kicker':'Kontak','contact.title':'Punya proyek atau<br />peluang untuk dibicarakan?','contact.copy':'Hubungi saya langsung melalui email, WhatsApp, atau LinkedIn.','footer.built':'Dirancang & dibangun dengan HTML, CSS & JavaScript.'
  }
};

const projectDetailLabels={
  en:{title:'Project detail',close:'Close project details',overview:'Overview',stack:'Tech Stack',role:'My Role',features:'Key Features',highlights:'Technical Highlights',challenge:'Challenges & Solutions',result:'Result',links:'Links',openLink:'Open link'},
  id:{title:'Detail proyek',close:'Tutup detail proyek',overview:'Ringkasan',stack:'Tech Stack',role:'Peran Saya',features:'Fitur Utama',highlights:'Highlight Teknis',challenge:'Tantangan & Solusi',result:'Hasil',links:'Tautan',openLink:'Buka tautan'}
};
const projectDetailFields=['role','features','highlights','challenge','result','links'];
const projectStackIcons={'PHP':'fa-brands fa-php','CodeIgniter 3':'fa-solid fa-fire-flame-curved','MySQL':'fa-solid fa-database','SQLite':'fa-solid fa-database','Laravel 10':'fa-brands fa-laravel','Laravel':'fa-brands fa-laravel','REST API':'fa-solid fa-diagram-project','Oracle':'fa-solid fa-database','Ruby on Rails':'fa-solid fa-gem','WebSocket':'fa-solid fa-bolt','Django':'fa-solid fa-code','AJAX':'fa-solid fa-arrows-rotate','Node.js':'fa-brands fa-node-js','AHP':'fa-solid fa-ranking-star','AHP + SAW':'fa-solid fa-ranking-star'};
const projectDetails={
  'custom-query-builder':{
    en:{overview:'A drop-in, backward-compatible extension of CodeIgniter 3 Query Builder with Laravel-inspired eager loading, aggregate subqueries, WHERE EXISTS / WHERE HAS, chunking, and more.',stack:'PHP, CodeIgniter 3, MySQL, SQLite',role:'Library Designer & Developer',features:['Laravel-inspired eager loading','Aggregate subqueries','WHERE EXISTS / WHERE HAS','Chunking'],highlights:'99 documented public methods and 118 tests across MySQL and SQLite.',challenge:'',result:'',links:[{label:'View on GitHub',url:'https://github.com/danarreichi/custom-query-builder'}]},
    id:{overview:'Ekstensi drop-in dan backward-compatible untuk CodeIgniter 3 Query Builder dengan fitur bergaya Laravel seperti eager loading, aggregate subqueries, WHERE EXISTS / WHERE HAS, chunking, dan lainnya.',stack:'PHP, CodeIgniter 3, MySQL, SQLite',role:'Perancang & Pengembang Library',features:['Eager loading bergaya Laravel','Aggregate subqueries','WHERE EXISTS / WHERE HAS','Chunking'],highlights:'99 public method terdokumentasi dan 118 test untuk MySQL serta SQLite.',challenge:'',result:'',links:[{label:'Lihat di GitHub',url:'https://github.com/danarreichi/custom-query-builder'}]}
  },
  'pos-system':{
    en:{overview:'A point-of-sale system for sales and inventory management, built to monitor stock and track inventory history efficiently.',stack:'Laravel 10, MySQL, REST API',role:'',features:['Sales management','Inventory management','Stock monitoring','Inventory history'],highlights:'REST API',challenge:'',result:'',links:[]},
    id:{overview:'Sistem point-of-sale untuk pengelolaan penjualan dan inventori, dirancang untuk memantau stok dan riwayat inventori secara efisien.',stack:'Laravel 10, MySQL, REST API',role:'',features:['Pengelolaan penjualan','Pengelolaan inventori','Pemantauan stok','Riwayat inventori'],highlights:'REST API',challenge:'',result:'',links:[]}
  },
  'library-dashboard':{
    en:{overview:'Flexible dashboard showing visitor percentages across study programs, lecturers, staff, and external guests.',stack:'Laravel 10, Oracle',role:'',features:['Visitor percentage dashboard','Breakdown by study program, lecturers, staff, and external guests'],highlights:'Oracle-backed dashboard',challenge:'',result:'',links:[]},
    id:{overview:'Dashboard fleksibel yang menampilkan persentase pengunjung dari program studi, dosen, karyawan, dan tamu eksternal.',stack:'Laravel 10, Oracle',role:'',features:['Dashboard persentase pengunjung','Rincian berdasarkan program studi, dosen, karyawan, dan tamu eksternal'],highlights:'Dashboard berbasis Oracle',challenge:'',result:'',links:[]}
  },
  'realtime-chat':{
    en:{overview:'Room-based real-time messaging application implemented with WebSocket and MySQL.',stack:'Ruby on Rails, WebSocket, MySQL',role:'',features:['Room-based conversations','Real-time messaging'],highlights:'WebSocket communication',challenge:'',result:'',links:[]},
    id:{overview:'Aplikasi pesan realtime berbasis room yang dibangun menggunakan WebSocket dan MySQL.',stack:'Ruby on Rails, WebSocket, MySQL',role:'',features:['Percakapan berbasis room','Pesan realtime'],highlights:'Komunikasi menggunakan WebSocket',challenge:'',result:'',links:[]}
  },
  'investment-monitoring':{
    en:{overview:'Tracks target versus realization using the Hanumm Curve / S-Curve method, with investment data refreshed every five seconds.',stack:'Django, AJAX, MySQL',role:'',features:['Target versus realization tracking','Hanumm Curve / S-Curve visualization','Automatic refresh every five seconds'],highlights:'AJAX data refresh',challenge:'',result:'',links:[]},
    id:{overview:'Membandingkan target dan realisasi menggunakan metode Kurva Hanumm / Kurva-S, dengan data investasi diperbarui setiap lima detik.',stack:'Django, AJAX, MySQL',role:'',features:['Pemantauan target dan realisasi','Visualisasi Kurva Hanumm / Kurva-S','Pembaruan otomatis setiap lima detik'],highlights:'Pembaruan data menggunakan AJAX',challenge:'',result:'',links:[]}
  },
  'employee-recruitment':{
    en:{overview:'A decision-support system that ranks recruitment recommendations based on selected HR criteria.',stack:'Node.js, AHP, MySQL',role:'',features:['HR criteria selection','Recruitment recommendation ranking'],highlights:'AHP-based decision support',challenge:'',result:'',links:[]},
    id:{overview:'Sistem pendukung keputusan yang memberi peringkat rekomendasi perekrutan berdasarkan kriteria SDM.',stack:'Node.js, AHP, MySQL',role:'',features:['Pemilihan kriteria SDM','Pemeringkatan rekomendasi perekrutan'],highlights:'Sistem pendukung keputusan berbasis AHP',challenge:'',result:'',links:[]}
  },
  'guesthouse-booking':{
    en:{overview:'Room availability, booking, and post-stay review workflow built with Laravel and MySQL.',stack:'Laravel, MySQL',role:'',features:['Room availability','Booking workflow','Post-stay reviews'],highlights:'End-to-end booking workflow',challenge:'',result:'',links:[]},
    id:{overview:'Alur ketersediaan kamar, pemesanan, dan ulasan setelah menginap menggunakan Laravel dan MySQL.',stack:'Laravel, MySQL',role:'',features:['Ketersediaan kamar','Alur pemesanan','Ulasan setelah menginap'],highlights:'Alur pemesanan end-to-end',challenge:'',result:'',links:[]}
  },
  'laptop-purchase':{
    en:{overview:'Recommendation system combining AHP and SAW methods to rank laptops from user-selected criteria.',stack:'PHP, AHP + SAW, MySQL',role:'',features:['User-selected criteria','AHP and SAW ranking','Laptop recommendations'],highlights:'AHP + SAW decision model',challenge:'',result:'',links:[]},
    id:{overview:'Sistem rekomendasi yang menggabungkan metode AHP dan SAW untuk memberi peringkat laptop berdasarkan kriteria pengguna.',stack:'PHP, AHP + SAW, MySQL',role:'',features:['Kriteria pilihan pengguna','Pemeringkatan AHP dan SAW','Rekomendasi laptop'],highlights:'Model keputusan AHP + SAW',challenge:'',result:'',links:[]}
  }
};

const savedTheme=localStorage.getItem('portfolio-theme');
const preferredTheme=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
root.dataset.theme=savedTheme||preferredTheme;
themeToggle?.addEventListener('click',()=>{const next=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=next;localStorage.setItem('portfolio-theme',next)});

function setActiveNav(id){
  navAnchors.forEach(link=>link.classList.toggle('active',link.getAttribute('href').slice(1)===id));
}

menuBtn?.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open))});
navAnchors.forEach(a=>a.addEventListener('click',()=>{
  navLinks.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded','false');
  setActiveNav(a.getAttribute('href').slice(1));
}));

let currentLanguage='en',languageTransitionId=0;
function applyLanguage(lang){const d=translations[lang]||translations.en;document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(d[k]!=null)el.textContent=d[k]});document.querySelectorAll('[data-i18n-html]').forEach(el=>{const k=el.dataset.i18nHtml;if(d[k]!=null)el.innerHTML=d[k]});root.lang=lang;localStorage.setItem('portfolio-language',lang);languageButtons.forEach(b=>{const active=b.dataset.lang===lang;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});currentLanguage=lang;if(currentProjectKey)renderProjectDialog()}
function setLanguage(lang,animate=true){if(!translations[lang])lang='en';if(lang===currentLanguage)return;const id=++languageTransitionId;if(!animate||matchMedia('(prefers-reduced-motion: reduce)').matches){root.classList.remove('language-leaving','language-entering');applyLanguage(lang);return}root.classList.remove('language-entering');root.classList.add('language-leaving');setTimeout(()=>{if(id!==languageTransitionId)return;applyLanguage(lang);root.classList.remove('language-leaving');root.classList.add('language-entering');setTimeout(()=>{if(id===languageTransitionId)root.classList.remove('language-entering')},300)},160)}
languageButtons.forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang,true)));
const savedLanguage=localStorage.getItem('portfolio-language');
const browserLanguage=navigator.language?.toLowerCase().startsWith('id')?'id':'en';
applyLanguage(savedLanguage&&translations[savedLanguage]?savedLanguage:browserLanguage);

function projectValueMarkup(value){
  if(!value||(Array.isArray(value)&&!value.length))return '';
  if(Array.isArray(value))return `<ul>${value.map(item=>`<li>${item}</li>`).join('')}</ul>`;
  return `<p>${value}</p>`;
}
function projectStackMarkup(stack){
  if(!stack)return '';
  return stack.split(',').map(label=>label.trim()).filter(Boolean).map(label=>`<span class="project-stack-pill"><i class="${projectStackIcons[label]||'fa-solid fa-code'}" aria-hidden="true"></i>${label}</span>`).join('');
}
function renderProjectDialog(){
  const card=document.querySelector(`[data-project="${currentProjectKey}"]`);
  const language=projectDetailLabels[root.lang]?root.lang:'en';
  const labels=projectDetailLabels[language];
  const detail=projectDetails[currentProjectKey]?.[language]||projectDetails[currentProjectKey]?.en;
  if(!card||!detail||!projectDialog)return;
  projectDialogKicker.textContent=labels.title;
  projectDialogNumber.textContent=card.querySelector('.project-number')?.textContent.trim()||'';
  projectDialogTitle.textContent=card.querySelector('h3')?.textContent.trim()||'';
  projectDialogStack.innerHTML=projectStackMarkup(detail.stack);
  projectDialogStack.setAttribute('aria-label',labels.stack);
  projectDialogSummary.textContent=card.querySelector('[data-i18n]')?.textContent.trim()||'';
  projectDialogClose.setAttribute('aria-label',labels.close);
  projectDialogDetails.innerHTML=projectDetailFields.map(key=>{
    const value=detail[key];
    const empty=!value||(Array.isArray(value)&&!value.length);
    const content=empty?'':key==='links'?`<div class="project-detail-links">${value.map(link=>`<a href="${link.url}" target="_blank" rel="noreferrer">${link.label}<span aria-hidden="true">↗</span></a>`).join('')}</div>`:projectValueMarkup(value);
    return `<section class="project-detail-block${empty?' is-empty':''}"><p class="project-detail-label">${labels[key]}</p><div class="project-detail-value">${content}</div></section>`;
  }).join('');
}
function openProjectDialog(key){
  if(!projectDialog||!projectDetails[key])return;
  currentProjectKey=key;
  renderProjectDialog();
  projectDialog.classList.remove('is-closing');
  if(!projectDialog.open)projectDialog.showModal();
  if(customCursor&&customCursor.parentElement!==projectDialog)projectDialog.append(customCursor);
  if(lastPointerPosition)syncCustomCursorPosition(lastPointerPosition.x,lastPointerPosition.y);
}
function closeProjectDialog(){
  if(!projectDialog?.open||projectDialog.classList.contains('is-closing'))return;
  projectDialog.classList.add('is-closing');
  projectDialog.addEventListener('animationend',()=>{
    projectDialog.classList.remove('is-closing');
    projectDialog.close();
    if(customCursor&&customCursorParent)customCursorParent.insertBefore(customCursor,customCursorNextSibling);
    if(lastPointerPosition)syncCustomCursorPosition(lastPointerPosition.x,lastPointerPosition.y);
    currentProjectKey='';
  },{once:true});
}
projectCards.forEach(card=>{
  const open=()=>openProjectDialog(card.dataset.project);
  card.addEventListener('click',event=>{if(event.target.closest('a,button'))return;open()});
  card.addEventListener('keydown',event=>{if(event.key!=='Enter'&&event.key!==' ')return;event.preventDefault();open()});
});
projectDialogClose?.addEventListener('click',closeProjectDialog);
projectDialog?.addEventListener('cancel',event=>{event.preventDefault();closeProjectDialog()});
projectDialog?.addEventListener('click',event=>{if(event.target===projectDialog)closeProjectDialog()});

const experienceMetric=document.querySelector('#about .mini-card .mini-number');
if(experienceMetric)experienceMetric.textContent='3+';

revealItems.forEach(i=>i.style.setProperty('--delay',`${Number(i.dataset.delay||0)}ms`));
const revealObserver=new IntersectionObserver((entries,obs)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -30px'});
revealItems.forEach(i=>revealObserver.observe(i));

// Scrollspy based on a fixed viewport marker instead of intersection ratio.
// This stays reliable even for very tall sections such as Experience and Projects.
let scrollSpyQueued=false;
function syncActiveNav(){
  scrollSpyQueued=false;
  const marker=Math.min(window.innerHeight*.28,220);
  let activeId='';

  for(const section of sections){
    const rect=section.getBoundingClientRect();
    if(rect.top<=marker&&rect.bottom>marker){
      activeId=section.id;
      break;
    }
  }

  if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-4){
    activeId='contact';
  }

  if(navAnchors.some(link=>link.getAttribute('href')===`#${activeId}`)){
    setActiveNav(activeId);
  }else{
    navAnchors.forEach(link=>link.classList.remove('active'));
  }
}
function queueScrollSpy(){
  if(scrollSpyQueued)return;
  scrollSpyQueued=true;
  requestAnimationFrame(syncActiveNav);
}
window.addEventListener('scroll',queueScrollSpy,{passive:true});
window.addEventListener('resize',queueScrollSpy,{passive:true});
window.addEventListener('hashchange',()=>{
  const id=location.hash.slice(1);
  if(navAnchors.some(link=>link.getAttribute('href')===`#${id}`))setActiveNav(id);
  queueScrollSpy();
});
queueScrollSpy();

if(tiltCard&&matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){tiltCard.addEventListener('pointermove',e=>{const r=tiltCard.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;tiltCard.style.transform=`rotateX(${(0.5-py)*7}deg) rotateY(${(px-.5)*7}deg) translateY(-2px)`});tiltCard.addEventListener('pointerleave',()=>tiltCard.style.transform='rotateX(0deg) rotateY(0deg) translateY(0)')}

if(customCursor&&matchMedia('(pointer:fine)').matches&&matchMedia('(hover:hover)').matches){root.classList.add('custom-cursor-enabled');const move=e=>{lastPointerPosition={x:e.clientX,y:e.clientY};syncCustomCursorPosition(e.clientX,e.clientY);customCursor.classList.add('is-visible')};window.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerover',e=>customCursor.classList.toggle('is-hovering',!!e.target.closest('a,button,[role="button"]')));document.addEventListener('pointerdown',()=>customCursor.classList.add('is-pressed'));document.addEventListener('pointerup',()=>customCursor.classList.remove('is-pressed'));document.addEventListener('mouseleave',()=>customCursor.classList.remove('is-visible'))}

document.getElementById('year').textContent=new Date().getFullYear();
