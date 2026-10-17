/* Mi espacio: demostración independiente, local y sin validez oficial. */
(() => {
  'use strict';
  const STORAGE_KEY = 'mi-espacio-demo:v1';
  const VERSION = 1;
  const EMPTY_PROFILE = Object.freeze({
    firstName: 'Alex', lastName: 'Ejemplo', document: '00000000',
    birthDate: '2000-01-01', sex: 'X', nationality: 'Argentina',
    address: 'Calle de ejemplo 123', city: 'Ciudad de ejemplo', province: 'Buenos Aires',
    photo: '', bloodType: '', coverage: '', allergies: '', emergencyName: '', emergencyPhone: '',
    updatedAt: ''
  });
  const icons = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    back: '<path d="m11 4-8 8 8 8M3 12h18"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    car: '<path d="m3 14 1-5 4-1 3-4h7l3 7v6h-3M7 17h7M3 14v3h1"/><circle cx="6" cy="17" r="2"/><circle cx="16" cy="17" r="2"/>',
    work: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12l9 3 9-3M10 14v3h4v-3"/>',
    money: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 6v12M15 9c-1-2-6-2-6 1s6 1 6 4-5 3-6 1"/>',
    file: '<path d="M5 2h9l5 5v15H5ZM14 2v6h5M8 12h8M8 16h8"/>',
    ticket: '<path d="M6 2a6 6 0 0 0 12 0h3v20h-3a6 6 0 0 0-12 0H3V2Z"/><path d="M8 9h8M8 15h8M9 11v2M12 11v2M15 11v2"/>',
    family: '<circle cx="8" cy="7" r="3"/><circle cx="18" cy="8" r="3"/><path d="M1 22v-3a7 7 0 0 1 14 0v3M16 15a6 6 0 0 1 7 6v1"/>',
    news: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10M7 11h4v6H7ZM14 11h3M14 14h3M14 17h3"/>',
    help: '<path d="M4 5h16v13H9l-5 4ZM12 5V2M9 2h6M7 9v3M17 9v3M9 15h6"/>',
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
    document: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="10" r="1.5"/><path d="M5.5 15c.3-2.8 4.7-2.8 5 0M13 9h5M13 12h5M13 15h3"/>',
    heart: '<path d="M20.8 4.8a5.4 5.4 0 0 0-7.6 0L12 6l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.6a5.4 5.4 0 0 0 0-7.6Z"/><path d="M4 12h4l2-4 4 8 2-4h4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
    arrow: '<path d="m9 5 7 7-7 7"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    edit: '<path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14Z"/>',
    shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    photo: '<rect x="3" y="5" width="18" height="16" rx="2"/><circle cx="8" cy="10" r="2"/><path d="m21 17-5-5-8 9M8 5l2-3h4l2 3"/>',
    trash: '<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12l4 4v12a2 2 0 0 1-2 2Z"/><path d="M7 3v6h10V3M7 21v-8h10v8"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    drop: '<path d="M12 2S4 11 4 16a8 8 0 0 0 16 0c0-5-8-14-8-14Z"/>',
    hospital: '<path d="M4 21V5h16v16M2 21h20M9 21v-5h6v5M12 7v6M9 10h6"/>',
    phone: '<path d="m5 3 4 1 1 5-3 2a14 14 0 0 0 6 6l2-3 5 1 1 4c-1 6-8 1-12-3S0 4 5 3Z"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 7a8 8 0 0 1 13-3L20 7M4 17l1.5 3a8 8 0 0 0 13-3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>'
  };
  const icon = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.info}</svg>`;
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const $ = (selector, root = document) => root.querySelector(selector);
  const main = $('#main');
  const dialog = $('#app-dialog');
  const dialogBody = $('#dialog-body');
  let profile = readProfile();
  let draft = { ...profile };
  let route = '';
  let healthTab = 'datos';
  let dirty = false;
  let photoBusy = false;
  let photoJob = 0;
  let toastTimer;
  let navigationTarget = null;
  let dialogKind = '';
  let storageAvailable = true;
  let noticeDismissed = false;

  // Only permit photo data produced by this app, never arbitrary URLs or SVG.
  function isSafePhoto(value) {
    return typeof value === 'string' && value.length <= 1500000 && /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(value);
  }

  function readProfile() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...EMPTY_PROFILE };
      const saved = JSON.parse(raw);
      if (saved.version !== VERSION || !saved.profile || typeof saved.profile !== 'object') return { ...EMPTY_PROFILE };
      const result = { ...EMPTY_PROFILE };
      for (const key of Object.keys(EMPTY_PROFILE)) {
        const value = saved.profile[key];
        if (typeof value === 'string') result[key] = value.slice(0, key === 'photo' ? 1500000 : key === 'allergies' ? 500 : 160);
      }
      if (!isSafePhoto(result.photo)) result.photo = '';
      if (!/^\d{4}-\d{2}-\d{2}$/.test(result.birthDate)) result.birthDate = '';
      if (!/^\d{7,8}$/.test(result.document)) result.document = '00000000';
      if (!['F','M','X'].includes(result.sex)) result.sex = 'X';
      if (result.updatedAt && !Number.isFinite(new Date(result.updatedAt).getTime())) result.updatedAt = '';
      return result;
    } catch {
      return { ...EMPTY_PROFILE };
    }
  }

  function persist(next) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: VERSION, profile: next }));
      storageAvailable = true;
      $('#storage-warning').hidden = true;
      return true;
    } catch {
      storageAvailable = false;
      $('#storage-warning').textContent = 'El navegador no pudo guardar los datos. Los cambios se conservarán solo mientras esta página esté abierta.';
      $('#storage-warning').hidden = false;
      return false;
    }
  }

  function today() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  }
  const fullName = (p) => [p.firstName, p.lastName].filter(Boolean).join(' ') || 'Tu nombre';
  const initials = (p) => `${p.firstName.charAt(0)}${p.lastName.charAt(0)}`.toUpperCase() || 'ME';
  const docNumber = (p) => p.document.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const avatar = (p) => isSafePhoto(p.photo) ? `<img class="avatar-image" src="${p.photo}" alt="">` : escape(initials(p));
  function formatDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Sin completar';
    return value.split('-').reverse().join('/');
  }
  function updatedText() {
    if (!profile.updatedAt) return 'Datos de ejemplo · Podés editarlos en Mi salud';
    return `Guardado en este navegador: ${new Intl.DateTimeFormat('es-AR', { dateStyle:'short', timeStyle:'short' }).format(new Date(profile.updatedAt))}`;
  }
  function toast(message) {
    const el = $('#toast');
    clearTimeout(toastTimer);
    el.textContent = message;
    el.classList.add('visible');
    toastTimer = setTimeout(() => el.classList.remove('visible'), 3800);
  }

  function sampleCard(p = profile) {
    const photo = isSafePhoto(p.photo) ? `<img class="avatar-image" src="${p.photo}" alt="Foto elegida para la ficha de demostración">` : icon('user');
    return `<article class="sample-card" aria-label="Ficha de identidad de muestra. Sin validez oficial">
      <div class="sample-head"><span>FICHA DE IDENTIDAD · DEMO</span>${icon('document')}</div>
      <div class="sample-body">
        <div><div class="sample-photo">${photo}</div><div class="sample-number"><span>NÚMERO DE PRUEBA</span>DEMO · ${escape(docNumber(p))}</div></div>
        <div class="sample-fields">
          <div class="sample-field"><label>Apellido</label><strong>${escape(p.lastName.toUpperCase() || 'APELLIDO')}</strong></div>
          <div class="sample-field"><label>Nombres</label><strong>${escape(p.firstName.toUpperCase() || 'NOMBRES')}</strong></div>
          <div class="sample-field-pair"><div class="sample-field"><label>Nacimiento</label><strong>${escape(formatDate(p.birthDate))}</strong></div><div class="sample-field"><label>Sexo</label><strong>${escape(p.sex)}</strong></div></div>
          <div class="sample-field"><label>Nacionalidad</label><strong>${escape(p.nationality || 'Sin completar')}</strong></div>
        </div>
      </div><div class="sample-footer">MUESTRA · SIN VALIDEZ OFICIAL</div>
    </article>`;
  }

  function renderHome() {
    const services = [
      ['Documentos','document','documentos'], ['Vehículos','car'], ['Trabajo','work'], ['Salud','heart','salud'],
      ['Cobros','money'], ['Trámites','file'], ['Turnos','ticket'], ['Hijos','family']
    ];
    return `<div class="welcome home-content"><h1 class="sr-only">Inicio</h1>
      ${noticeDismissed ? '' : `<section class="notice-card"><button class="notice-close icon-button" data-action="dismiss-notice" aria-label="Cerrar aviso">${icon('close')}</button><h2>Completá tu perfil: cargá tus datos y tu foto</h2><p>Desde Salud podés actualizar tu información. Después, consultá tu ficha de prueba en Documentos.</p></section>`}
      <section class="appointment-card card"><span class="appointment-illustration">${icon('ticket')}</span><div><h2>No tenés turnos programados</h2><button class="button small-button" data-action="scope" data-label="Turnos">Ver turnos</button></div></section>
      <button class="credential-banner" data-action="nav-documents"><strong>Tu ficha de demostración<br>está lista para consultar</strong><span class="credential-art" aria-hidden="true"><span class="credential-paper">${icon('document')}</span><span class="credential-check">${icon('check')}</span></span></button>
      <section class="home-services" aria-labelledby="services-title"><h2 id="services-title">¿Qué necesitás hoy?</h2><div class="service-grid">${services.map(([label,symbol,target])=>target ? `<a class="service-tile" href="#${target}" aria-label="${target==='salud'?'Mi salud':'Mis documentos'}"><span>${icon(symbol)}</span><span>${label}</span></a>` : `<button class="service-tile" data-action="scope" data-label="${label}" aria-label="${label}, fuera del alcance de la demo"><span>${icon(symbol)}</span><span>${label}</span></button>`).join('')}</div></section>
      <button class="profile-promo" data-action="edit-profile"><span class="profile-art" aria-hidden="true">${icon('user')}</span><span><strong>Completá tu perfil</strong><small>Mantené tus datos de prueba actualizados.</small><b>Editar mis datos ${icon('arrow')}</b></span></button>
      <button class="home-document-link" data-action="view-document">${icon('document')} Ver mi ficha de demostración ${icon('arrow')}</button>
      <p class="home-footnote">Demo independiente. Los datos se guardan en este navegador.</p>
      </div>`;
  }

  function documentRow(id, title, sub, symbol, color, content, expanded = false) {
    return `<section class="card document-entry"><h2><button class="document-summary" data-action="toggle-document" aria-expanded="${expanded}" aria-controls="${id}-content"><span class="document-symbol ${color}">${icon(symbol)}</span><span class="document-label"><strong>${title}</strong><small>${sub}</small></span>${icon('down','document-arrow')}</button></h2><div class="document-content" id="${id}-content" ${expanded ? '' : 'hidden'}>${content}</div></section>`;
  }

  function detailsList(items) {
    return `<dl class="details-list">${items.map(([label,value])=>`<div><dt>${escape(label)}</dt><dd>${escape(value || 'Sin completar')}</dd></div>`).join('')}</dl>`;
  }

  function renderDocuments() {
    return `<div class="section-lead card"><h2>Tus documentos, en un solo lugar</h2><p>Consultá tus datos personales y tu ficha de demostración.</p></div>
      <div class="document-list">
      ${documentRow('identity', 'Documento de identidad', 'Muestra editable · Sin validez oficial', 'document', 'cyan', `<div class="document-person"><strong>${escape(fullName(profile))}</strong><span class="demo-tag">SOLO DEMO</span></div>${sampleCard()}<p class="updated-at">${escape(updatedText())}</p><div class="document-actions"><button class="button" data-action="view-document">${icon('eye')}Ampliar ficha</button><button class="button secondary" data-action="edit-profile">${icon('edit')}Editar datos</button></div>`)}
      ${documentRow('personal', 'Datos personales', 'Domicilio y datos de tu perfil', 'user', 'purple', `${detailsList([['Nombre completo',fullName(profile)],['Nacimiento',formatDate(profile.birthDate)],['Nacionalidad',profile.nationality],['Domicilio',profile.address],['Localidad',profile.city],['Provincia',profile.province]])}<div class="document-actions"><button class="button secondary" data-action="edit-profile">Editar mis datos</button></div>`)}
      ${documentRow('medical', 'Ficha de salud', 'Información que agregaste en Mi salud', 'heart', 'pink', `${detailsList([['Grupo sanguíneo',profile.bloodType],['Cobertura',profile.coverage],['Alergias',profile.allergies],['Contacto de emergencia',profile.emergencyName],['Teléfono',profile.emergencyPhone]])}<div class="document-actions"><button class="button secondary" data-action="edit-medical">Editar datos de salud</button></div>`)}
      </div>
      <div class="info-note below-note">${icon('info')}<p>La ficha es una muestra editable sin validez oficial. No reemplaza tu DNI ni modifica información de Mi Argentina o RENAPER.</p></div>`;
  }

  function inputField(key, label, {type='text', wide=false, hint='', required=false, max=80, inputmode='', options}={}) {
    const attrs = `id="field-${key}" name="${key}" ${required ? 'required' : ''} aria-describedby="hint-${key} error-${key}"`;
    let input;
    if (options) input = `<select ${attrs}>${options.map(([value,text])=>`<option value="${escape(value)}" ${draft[key]===value?'selected':''}>${escape(text)}</option>`).join('')}</select>`;
    else if (type==='textarea') input = `<textarea ${attrs} maxlength="${max}" rows="3">${escape(draft[key])}</textarea>`;
    else input = `<input ${attrs} type="${type}" value="${escape(draft[key])}" ${type==='date' ? `min="1900-01-01" max="${today()}"` : `maxlength="${max}"`} ${inputmode ? `inputmode="${inputmode}"` : ''} autocomplete="off">`;
    return `<label class="field ${wide?'wide':''}" for="field-${key}"><span>${label}${required?' *':''}</span>${input}<small id="hint-${key}">${hint}</small><small id="error-${key}" class="field-error"></small></label>`;
  }

  function renderEditor() {
    return `<div class="health-layout"><form id="profile-form" novalidate>
      <div class="card form-card"><div class="form-title">${icon('user')}<div><h2>Datos de tu ficha</h2><p>Los campos con * son obligatorios.</p></div></div>
      <div class="photo-editor"><div id="photo-preview" class="photo-preview">${isSafePhoto(draft.photo) ? `<img class="avatar-image" src="${draft.photo}" alt="Vista previa de la foto seleccionada">` : icon('user')}</div><div class="photo-controls"><div class="photo-controls-row"><button type="button" class="button secondary" data-action="upload-photo">${icon('photo')}Elegir foto</button><button type="button" class="button quiet" data-action="remove-photo" ${draft.photo?'':'hidden'}>Quitar</button></div><p>JPG, PNG o WebP. Hasta 10 MB.</p><input id="photo-input" class="sr-only" type="file" accept="image/jpeg,image/png,image/webp" tabindex="-1" aria-label="Seleccionar foto de prueba"></div></div>
      <div id="form-error" class="error-message" role="alert"></div>
      <div class="field-grid">
        ${inputField('firstName','Nombres',{required:true,max:60})}${inputField('lastName','Apellido',{required:true,max:60})}
        ${inputField('document','Número de prueba',{required:true,max:8,inputmode:'numeric',hint:'7 u 8 dígitos. Se mostrará con el prefijo DEMO.'})}
        ${inputField('birthDate','Fecha de nacimiento',{type:'date',required:true})}
        ${inputField('sex','Sexo',{options:[['X','X'],['F','Femenino'],['M','Masculino']]})}${inputField('nationality','Nacionalidad',{required:true,max:60})}
      </div></div>
      <div class="card form-card"><div class="form-title">${icon('home')}<div><h2>Domicilio</h2><p>Información opcional para tu perfil.</p></div></div><div class="field-grid">
        ${inputField('address','Calle, número y departamento',{wide:true,max:120})}${inputField('city','Localidad',{max:80})}${inputField('province','Provincia',{max:80})}
      </div></div>
      <div class="card form-card"><div class="form-title">${icon('heart')}<div><h2>Datos de salud</h2><p>Completá solo la información que quieras.</p></div></div><div class="field-grid">
        ${inputField('bloodType','Grupo sanguíneo',{options:[['','Sin completar'],...['A+','A−','B+','B−','AB+','AB−','O+','O−'].map(v=>[v,v])]})}${inputField('coverage','Cobertura médica',{max:100})}
        ${inputField('allergies','Alergias y observaciones',{type:'textarea',wide:true,max:500,hint:'Máximo 500 caracteres.'})}
        ${inputField('emergencyName','Contacto de emergencia',{max:80})}${inputField('emergencyPhone','Teléfono de contacto',{type:'tel',max:30,inputmode:'tel'})}
      </div></div>
      <div class="save-bar"><p id="save-status">No hay cambios pendientes</p><div class="save-bar-buttons"><button type="button" class="button secondary" data-action="cancel-edit">Descartar</button><button id="save-button" type="submit" class="button">${icon('save')}Guardar cambios</button></div></div>
      <div class="info-note privacy-note">${icon('shield')}<p>Tus datos y tu foto quedan en este navegador. Usá datos ficticios para probar la demo.</p></div>
      </form><aside class="preview-panel" aria-label="Vista previa de tu ficha"><div class="card"><h3>Así se verá tu ficha</h3><p>Vista previa de Mis documentos.</p><div id="live-preview">${sampleCard(draft)}</div><p id="preview-state" class="preview-state">${icon('check')}Sin cambios pendientes</p></div></aside></div>`;
  }

  function renderMedical() {
    return `<div class="health-summary">
      <section class="card health-item">${icon('drop')}<h3>Grupo sanguíneo</h3><strong>${escape(profile.bloodType || 'Sin completar')}</strong><p>Información de tu perfil de prueba.</p></section>
      <section class="card health-item">${icon('hospital')}<h3>Cobertura médica</h3><strong>${escape(profile.coverage || 'Sin completar')}</strong><p>Agregala desde Editar mis datos.</p></section>
      <section class="card health-item wide">${icon('heart')}<h3>Alergias y observaciones</h3><strong class="health-notes">${escape(profile.allergies || 'No agregaste observaciones.')}</strong></section>
      <section class="card health-item wide">${icon('phone')}<h3>Contacto de emergencia</h3><strong>${escape(profile.emergencyName || 'Sin completar')}</strong><p>${escape(profile.emergencyPhone || 'No agregaste un teléfono.')}</p></section>
      </div><div class="health-summary-footer"><button class="button secondary" data-action="edit-profile">${icon('edit')}Editar mis datos</button><div class="info-note below-note">${icon('info')}<p>Información de demostración. No es una historia clínica ni está validada por un profesional.</p></div></div>`;
  }

  function renderHealth() {
    return `<div class="section-lead card health-lead">${icon('heart')}<div><h2>Tu información personal y de salud</h2><p>Los cambios que guardes se verán en Documentos.</p></div></div><div class="tab-bar" role="tablist" aria-label="Secciones de Mi salud"><button id="tab-datos" class="tab-button" role="tab" data-action="health-tab" data-tab="datos" aria-controls="health-panel" aria-selected="${healthTab==='datos'}" tabindex="${healthTab==='datos'?0:-1}">Editar mis datos</button><button id="tab-resumen" class="tab-button" role="tab" data-action="health-tab" data-tab="resumen" aria-controls="health-panel" aria-selected="${healthTab==='resumen'}" tabindex="${healthTab==='resumen'?0:-1}">Mi ficha de salud</button></div><section id="health-panel" role="tabpanel" aria-labelledby="tab-${healthTab}">${healthTab==='datos' ? renderEditor() : renderMedical()}</section>`;
  }

  function render({focus=false} = {}) {
    document.body.dataset.page=route;
    main.innerHTML = route==='documentos' ? renderDocuments() : route==='salud' ? renderHealth() : renderHome();
    $('#profile-button').innerHTML = avatar(profile);
    const isHome=route==='inicio';
    $('.brand').hidden=!isHome;
    $('#profile-button').hidden=!isHome;
    $('#more-button').hidden=isHome;
    $('#header-page-title').hidden=isHome;
    $('#header-page-title').textContent=route==='documentos'?'Documentos':'Salud';
    $('#header-greeting').hidden=!isHome;
    $('#header-greeting').textContent=`¡Hola ${profile.firstName}!`;
    $('#menu-button').innerHTML=icon(isHome?'menu':'back');
    $('#menu-button').setAttribute('aria-label',isHome?'Abrir menú':'Volver al inicio');
    document.querySelectorAll('[data-route]').forEach(link => {
      link.setAttribute('aria-current',isHome?'page':'location');
    });
    document.title = `${({inicio:'Inicio',documentos:'Mis documentos',salud:'Mi salud'})[route]} · Mi espacio DEMO`;
    if (focus) main.focus({preventScroll:true});
  }

  function openDialog(title, body, kind='general') {
    if (dialog.open) dialog.close();
    $('#dialog-title').textContent = title;
    dialogBody.innerHTML = body;
    dialogKind = kind;
    dialog.dataset.kind=kind;
    dialog.showModal();
    document.body.classList.add('modal-open');
  }
  function closeDialog() {
    if (dialog.open) dialog.close();
    document.body.classList.remove('modal-open');
  }
  dialog.addEventListener('close',()=>{
    // A queued close event may arrive after a replacement dialog has opened.
    if (!dialog.open) document.body.classList.remove('modal-open');
  });

  function askBeforeLeaving(callback) {
    if (photoBusy) return toast('Esperá a que termine de procesarse la foto.');
    if (!dirty) return callback();
    navigationTarget = callback;
    openDialog('Tenés cambios sin guardar', `<div class="dialog-copy"><p>Podés guardarlos antes de continuar o salir y descartar los cambios.</p></div><div class="dialog-actions"><button class="button quiet" data-action="stay">Seguir editando</button><button class="button secondary" data-action="discard-and-leave">Descartar</button><button class="button" data-action="save-and-leave">Guardar</button></div>`, 'unsaved');
  }

  function navigate(next, tab) {
    if (!['inicio','documentos','salud'].includes(next)) next='inicio';
    if (next===route && (!tab || healthTab===tab)) return;
    askBeforeLeaving(()=>{
      closeDialog();
      draft = { ...profile };
      dirty=false;
      route=next;
      if (tab) healthTab=tab;
      history.replaceState(null,'',`#${route}`);
      render({focus:true});
      window.scrollTo({top:0,behavior:'instant'});
      if (tab==='datos') requestAnimationFrame(()=>$('#field-firstName')?.focus({preventScroll:true}));
    });
  }

  function updateDirty() {
    dirty = Object.keys(EMPTY_PROFILE).some(key=>draft[key]!==profile[key]);
    const status = $('#save-status');
    if (status) status.textContent=photoBusy ? 'Procesando foto…' : dirty ? 'Tenés cambios sin guardar' : 'No hay cambios pendientes';
    const state = $('#preview-state');
    if (state) {
      state.classList.toggle('dirty',dirty);
      state.innerHTML=dirty ? `${icon('clock')}Cambios sin guardar` : `${icon('check')}Sin cambios pendientes`;
    }
    const preview=$('#live-preview');
    if (preview) preview.innerHTML=sampleCard(draft);
  }

  function validateDraft() {
    const errors = {};
    for (const key of ['firstName','lastName','nationality']) {
      if (!draft[key].trim()) errors[key]='Completá este campo.';
    }
    if (!/^\d{7,8}$/.test(draft.document)) errors.document='Ingresá 7 u 8 dígitos, sin puntos.';
    const parts=draft.birthDate.split('-').map(Number);
    const date=new Date(`${draft.birthDate}T12:00:00`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.birthDate) || !Number.isFinite(date.getTime()) || date.getFullYear()!==parts[0] || date.getMonth()+1!==parts[1] || date.getDate()!==parts[2] || draft.birthDate<'1900-01-01' || draft.birthDate>today()) errors.birthDate='Elegí una fecha válida, entre 1900 y hoy.';
    if (draft.emergencyPhone && !/^[+\d\s().-]{5,30}$/.test(draft.emergencyPhone)) errors.emergencyPhone='Usá números, espacios y los signos + ( ) . -.';
    return errors;
  }

  function saveProfile() {
    if (photoBusy) { toast('Esperá a que termine de procesarse la foto.'); return false; }
    Object.keys(draft).forEach(key=>{if(key!=='photo') draft[key]=draft[key].trim();});
    const errors=validateDraft();
    document.querySelectorAll('.field-error').forEach(el=>el.textContent='');
    document.querySelectorAll('[aria-invalid]').forEach(el=>el.removeAttribute('aria-invalid'));
    Object.entries(errors).forEach(([key,message])=>{
      const input=$(`#field-${key}`);
      if (input) {input.setAttribute('aria-invalid','true');$(`#error-${key}`).textContent=message;}
    });
    const errorBox=$('#form-error');
    if (Object.keys(errors).length) {
      if (errorBox) errorBox.textContent='Revisá los campos marcados antes de guardar.';
      toast('Revisá los campos marcados.');
      return false;
    }
    profile={...draft,updatedAt:new Date().toISOString()};
    const saved=persist(profile);
    draft={...profile};
    dirty=false;
    render();
    toast(saved?'Datos y foto guardados. Ya se actualizaron en Mis documentos.':'Cambios aplicados solo a esta sesión.');
    return true;
  }

  async function processPhoto(file) {
    if (!file) return;
    if (!['image/jpeg','image/png','image/webp'].includes(file.type)) return toast('Elegí una imagen JPG, PNG o WebP.');
    if (file.size>10*1024*1024) return toast('La imagen supera los 10 MB. Elegí una más pequeña.');
    const job=++photoJob;
    photoBusy=true;
    $('#save-button').disabled=true;
    updateDirty();
    let bitmap;
    try {
      // createImageBitmap applies EXIF orientation in current Chrome/Safari/Firefox.
      // The fallback uses Image when bitmap decoding is unavailable.
      bitmap = await decodeImage(file);
      if (job!==photoJob) return;
      const sourceWidth=bitmap.width, sourceHeight=bitmap.height;
      if (!sourceWidth || !sourceHeight) throw new Error('invalid dimensions');
      // Center-crop to portrait and encode only a small local JPEG.
      const ratio=3/4;
      let cropWidth=sourceWidth, cropHeight=sourceWidth/ratio;
      if (cropHeight>sourceHeight) {cropHeight=sourceHeight;cropWidth=sourceHeight*ratio;}
      const canvas=document.createElement('canvas');
      canvas.width=450;canvas.height=600;
      const ctx=canvas.getContext('2d');
      ctx.fillStyle='#fff';ctx.fillRect(0,0,450,600);
      ctx.drawImage(bitmap,(sourceWidth-cropWidth)/2,(sourceHeight-cropHeight)/2,cropWidth,cropHeight,0,0,450,600);
      draft.photo=canvas.toDataURL('image/jpeg',.85);
      $('#photo-preview').innerHTML=`<img class="avatar-image" src="${draft.photo}" alt="Vista previa de la foto seleccionada">`;
      $('[data-action="remove-photo"]').hidden=false;
      toast('Foto lista. Guardá los cambios para actualizar tu ficha.');
    } catch {
      if (job===photoJob) toast('No se pudo leer la imagen. Probá con otro archivo.');
    } finally {
      bitmap?.close?.();
      if (job===photoJob) {
        photoBusy=false;
        if ($('#save-button')) $('#save-button').disabled=false;
        updateDirty();
      }
    }
  }

  async function decodeImage(file) {
    if ('createImageBitmap' in window) {
      try {return await createImageBitmap(file,{imageOrientation:'from-image'});} catch { /* Image fallback below. */ }
    }
    return new Promise((resolve,reject)=>{
      const url=URL.createObjectURL(file);
      const image=new Image();
      image.onload=()=>{URL.revokeObjectURL(url);resolve(image);};
      image.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('decode failed'));};
      image.src=url;
    });
  }

  function showDocument() {
    openDialog('Ficha de demostración',`<div class="document-person"><strong>${escape(fullName(profile))}</strong><span class="demo-tag">SOLO DEMO</span></div>${sampleCard()}<p class="updated-at">${escape(updatedText())}</p><div class="info-note below-note">${icon('info')}<p>Esta ficha no es un DNI. Es una muestra sin validez oficial.</p></div><div class="dialog-actions"><button class="button secondary" data-action="edit-profile">${icon('edit')}Editar datos</button><button class="button" data-action="close-dialog">Listo</button></div>`,'document');
  }
  function showMenu() {
    openDialog('Mi espacio · DEMO',`<div class="menu-profile"><span class="menu-avatar">${avatar(profile)}</span><strong>${escape(fullName(profile))}</strong><small>Perfil de demostración</small></div><div class="menu-links"><button data-action="nav-home">${icon('home')}Inicio</button><button data-action="nav-documents">${icon('document')}Mis documentos</button><button data-action="nav-health">${icon('heart')}Mi salud</button></div><div class="menu-divider"></div><div class="menu-links"><button data-action="about">${icon('info')}Acerca de esta demo</button><button data-action="reset">${icon('refresh')}Restablecer datos de ejemplo</button></div><p class="menu-meta">Versión 1.1 · Demo independiente</p>`,'menu');
  }
  function showAbout() {
    openDialog('Acerca de esta demo',`<div class="dialog-copy"><p><strong>Mi espacio</strong> es una demostración independiente inspirada en patrones visuales de apps de servicios públicos. No está afiliada a Mi Argentina ni a organismos públicos.</p><p>Probá los cambios en <strong>Mi salud → Editar mis datos</strong>, guardalos y consultá el resultado en <strong>Mis documentos</strong>.</p><p>Todo funciona localmente. No hay cuentas, validación de identidad, conexión a RENAPER ni envío de datos a servidores. Los campos y las fotos se guardan en el almacenamiento de este navegador, sin cifrado.</p><p>La ficha siempre se identifica como muestra, sin validez oficial. Para borrar la información guardada, usá “Restablecer datos de ejemplo” en el menú.</p></div><div class="dialog-actions"><button class="button" data-action="close-dialog">Entendido</button></div>`,'about');
  }

  const actions = {
    'edit-profile':()=>{closeDialog();navigate('salud','datos');},
    'edit-medical':()=>{closeDialog();navigate('salud','datos');requestAnimationFrame(()=>$('#field-bloodType')?.scrollIntoView({block:'center'}));},
    'view-document':showDocument,
    'about':showAbout,
    'close-dialog':closeDialog,
    'nav-home':()=>{closeDialog();navigate('inicio');},
    'nav-documents':()=>{closeDialog();navigate('documentos');},
    'nav-health':()=>{closeDialog();navigate('salud');},
    'dismiss-notice':()=>{noticeDismissed=true;render();},
    'scope':button=>openDialog(button.dataset.label||'Servicios',`<div class="dialog-copy"><p>Este acceso forma parte de la pantalla de inicio de referencia. Esta demostración incluye <strong>Inicio, Documentos y Salud</strong>.</p><p>Podés editar tus datos y tu foto desde Salud y consultar la ficha de prueba en Documentos.</p></div><div class="dialog-actions"><button class="button secondary" data-action="nav-documents">Documentos</button><button class="button" data-action="edit-profile">Ir a Salud</button></div>`,'scope'),
    'toggle-document':(button)=>{const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));document.getElementById(button.getAttribute('aria-controls')).hidden=open;},
    'health-tab':(button)=>{navigate('salud',button.dataset.tab);},
    'upload-photo':()=>$('#photo-input').click(),
    'remove-photo':()=>{++photoJob;photoBusy=false;draft.photo='';$('#photo-preview').innerHTML=icon('user');$('[data-action="remove-photo"]').hidden=true;$('#photo-input').value='';$('#save-button').disabled=false;updateDirty();},
    'cancel-edit':()=>{if(photoBusy)return toast('Esperá a que termine de procesarse la foto.');if(!dirty)return toast('No hay cambios para descartar.');openDialog('¿Descartar los cambios?',`<div class="dialog-copy"><p>Tu ficha conservará los últimos datos guardados.</p></div><div class="dialog-actions"><button class="button secondary" data-action="close-dialog">Seguir editando</button><button class="button" data-action="confirm-discard">Descartar cambios</button></div>`,'discard');},
    'confirm-discard':()=>{closeDialog();draft={...profile};dirty=false;render();toast('Cambios descartados.');},
    'stay':closeDialog,
    'discard-and-leave':()=>{const next=navigationTarget;navigationTarget=null;closeDialog();draft={...profile};dirty=false;next?.();},
    'save-and-leave':()=>{const next=navigationTarget;navigationTarget=null;closeDialog();if(saveProfile())next?.();else $('[aria-invalid=true]')?.focus();},
    'reset':()=>openDialog('¿Restablecer la demo?',`<div class="dialog-copy"><p>Se borrarán la foto y los datos guardados en este navegador y se cargarán los datos de ejemplo.</p></div><div class="dialog-actions"><button class="button secondary" data-action="close-dialog">Cancelar</button><button class="button danger" data-action="confirm-reset">Restablecer datos</button></div>`,'reset'),
    'confirm-reset':()=>{++photoJob;photoBusy=false;closeDialog();profile={...EMPTY_PROFILE};persist(profile);draft={...profile};dirty=false;render();toast(storageAvailable?'Datos de ejemplo restablecidos.':'Datos restablecidos solo para esta sesión.');}
  };

  document.addEventListener('click',(event)=>{
    const button=event.target.closest('[data-action]');
    if(button && !button.disabled){event.preventDefault();actions[button.dataset.action]?.(button);return;}
    const link=event.target.closest('a[href^="#"]');
    if(link && link.getAttribute('href')!=='#main'){event.preventDefault();navigate(link.getAttribute('href').slice(1));}
  });
  document.addEventListener('input',(event)=>{
    const input=event.target;
    if(!input.closest('#profile-form') || !Object.prototype.hasOwnProperty.call(draft,input.name))return;
    draft[input.name]=input.value;
    if(input.hasAttribute('aria-invalid')){input.removeAttribute('aria-invalid');$(`#error-${input.name}`).textContent='';}
    const errorBox=$('#form-error');if(errorBox)errorBox.textContent='';
    updateDirty();
  });
  document.addEventListener('change',(event)=>{
    if(event.target.id==='photo-input')processPhoto(event.target.files[0]);
    else if(event.target.tagName==='SELECT' && event.target.closest('#profile-form')){
      draft[event.target.name]=event.target.value;updateDirty();
    }
  });
  document.addEventListener('submit',(event)=>{
    if(event.target.id==='profile-form'){event.preventDefault();if(!saveProfile())$('[aria-invalid=true]')?.focus();}
  });
  document.addEventListener('keydown',(event)=>{
    const tab=event.target.closest('[role="tab"]');
    if(!tab || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();
    const next=event.key==='Home'?'datos':event.key==='End'?'resumen':healthTab==='datos'?'resumen':'datos';
    navigate('salud',next);requestAnimationFrame(()=>$(`#tab-${healthTab}`)?.focus());
  });
  $('#menu-button').innerHTML=icon('menu');
  $('#menu-button').addEventListener('click',()=>route==='inicio'?showMenu():navigate('inicio'));
  $('#more-button').innerHTML=icon('more');
  $('#more-button').addEventListener('click',showMenu);
  $('#profile-button').addEventListener('click',()=>navigate('salud','datos'));
  $('#dialog-close').innerHTML=icon('close');
  $('#dialog-close').addEventListener('click',closeDialog);
  document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=icon(el.dataset.icon);});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const bounds=dialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)closeDialog();}});
  window.addEventListener('beforeunload',event=>{if(dirty||photoBusy){event.preventDefault();event.returnValue='';}});
  window.addEventListener('hashchange',()=>{
    const target=location.hash.slice(1);
    if(target!==route){history.replaceState(null,'',`#${route}`);navigate(target);}
  });
  // Confirm availability without overwriting any user data.
  try {localStorage.setItem(`${STORAGE_KEY}:probe`,'1');localStorage.removeItem(`${STORAGE_KEY}:probe`);} catch {persist(profile);}
  route=['inicio','documentos','salud'].includes(location.hash.slice(1))?location.hash.slice(1):'inicio';
  history.replaceState(null,'',`#${route}`);
  render();
})();
