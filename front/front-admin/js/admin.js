const notices = [
  { code: "001/2026", title: "Edital de Cultura e Arte", period: "01/10 a 30/10/2026", status: "Aberto" },
  { code: "002/2026", title: "Programa de Iniciação Científica", period: "05/10 a 05/11/2026", status: "Aberto" },
  { code: "003/2026", title: "Edital de Esporte Universitário", period: "01/09 a 20/09/2026", status: "Encerrado" },
  { code: "004/2026", title: "Programa de Apoio à Extensão", period: "A definir", status: "Rascunho" },
];

const applications = [
  { candidate: "Ana Beatriz Costa", notice: notices[0].title, date: "03/10/2026", status: "Recebida" },
  { candidate: "Lucas Ferreira", notice: notices[0].title, date: "02/10/2026", status: "Em análise" },
  { candidate: "Mariana Oliveira", notice: notices[1].title, date: "01/10/2026", status: "Aguardando correção" },
  { candidate: "Pedro Henrique Lima", notice: notices[1].title, date: "30/09/2026", status: "Aprovada" },
  { candidate: "Sofia Martins", notice: notices[2].title, date: "19/09/2026", status: "Reprovada" },
];

const appeals = [
  { candidate: "Mariana Oliveira", notice: notices[1].title, reason: "Documento comprobatório", status: "Recebido" },
  { candidate: "Pedro Henrique Lima", notice: notices[1].title, reason: "Revisão de pontuação", status: "Em análise" },
  { candidate: "Ana Beatriz Costa", notice: notices[0].title, reason: "Critério de avaliação", status: "Deferido" },
  { candidate: "Lucas Ferreira", notice: notices[0].title, reason: "Documentação", status: "Indeferido" },
];

const users = [
  { name: "Admin Principal", email: "admin@exemplo.edu.br", role: "Administrador", active: true },
  { name: "Camila Santos", email: "camila.santos@exemplo.edu.br", role: "Avaliador", active: true },
  { name: "Rafael Almeida", email: "rafael.almeida@exemplo.edu.br", role: "Avaliador", active: true },
  { name: "Equipe de Consulta", email: "consulta@exemplo.edu.br", role: "Consulta", active: false },
];

const tabTitles = {
  dashboard: "Visão Geral",
  editais: "Editais",
  inscricoes: "Inscrições",
  recursos: "Recursos",
  usuarios: "Usuários",
};

const statusClassNames = {
  Aberto: "aberto",
  Rascunho: "rascunho",
  Encerrado: "encerrado",
  Arquivado: "inativo",
  Recebida: "recebida",
  "Em análise": "em-analise",
  "Aguardando correção": "aguardando",
  Aprovada: "aprovada",
  Reprovada: "reprovada",
  Recebido: "recebido",
  Deferido: "deferido",
  Indeferido: "indeferido",
  Ativo: "ativo",
  Inativo: "inativo",
};

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
})[character]);

const statusBadge = (status) => {
  const className = statusClassNames[status] || "";
  return `<span class="status-badge ${className ? `status-badge--${className}` : ""}">${escapeHtml(status)}</span>`;
};

const renderTable = (body, rows, emptyMessage) => {
  body.innerHTML = rows.length
    ? rows.join("")
    : `<tr><td class="empty-state" colspan="5">${escapeHtml(emptyMessage)}</td></tr>`;
};

const noticeTable = document.querySelector("#notices-table");
const applicationTable = document.querySelector("#applications-table");
const appealTable = document.querySelector("#appeals-table");
const userTable = document.querySelector("#users-table");
const toast = document.querySelector("#toast");
let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.hidden = true;
  }, 3200);
}

function renderNotices() {
  const query = document.querySelector("#notice-search").value.trim().toLocaleLowerCase("pt-BR");
  const selectedStatus = document.querySelector("#notice-status-filter").value;
  const rows = notices
    .filter((notice) => `${notice.code} ${notice.title}`.toLocaleLowerCase("pt-BR").includes(query))
    .filter((notice) => !selectedStatus || notice.status === selectedStatus)
    .map((notice) => `<tr>
      <td>${escapeHtml(notice.code)}</td>
      <td>${escapeHtml(notice.title)}</td>
      <td>${escapeHtml(notice.period)}</td>
      <td>${statusBadge(notice.status)}</td>
      <td><button class="table-action" type="button" data-action="notice-details" data-code="${escapeHtml(notice.code)}">Ver detalhes</button></td>
    </tr>`);
  renderTable(noticeTable, rows, "Nenhum edital corresponde à busca.");
}

function renderApplications() {
  const query = document.querySelector("#application-search").value.trim().toLocaleLowerCase("pt-BR");
  const selectedStatus = document.querySelector("#application-status-filter").value;
  const rows = applications
    .filter((item) => `${item.candidate} ${item.notice}`.toLocaleLowerCase("pt-BR").includes(query))
    .filter((item) => !selectedStatus || item.status === selectedStatus)
    .map((item) => {
      const complete = item.status === "Aprovada" || item.status === "Reprovada";
      const actionLabel = item.status === "Recebida" ? "Iniciar análise" : complete ? "Concluída" : "Avançar etapa";
      return `<tr>
        <td>${escapeHtml(item.candidate)}</td>
        <td>${escapeHtml(item.notice)}</td>
        <td>${escapeHtml(item.date)}</td>
        <td>${statusBadge(item.status)}</td>
        <td><button class="table-action" type="button" data-action="advance-application" data-index="${applications.indexOf(item)}" ${complete ? "disabled" : ""}>${actionLabel}</button></td>
      </tr>`;
    });
  renderTable(applicationTable, rows, "Nenhuma inscrição corresponde à busca.");
}

function renderAppeals() {
  const query = document.querySelector("#appeal-search").value.trim().toLocaleLowerCase("pt-BR");
  const selectedStatus = document.querySelector("#appeal-status-filter").value;
  const rows = appeals
    .filter((item) => `${item.candidate} ${item.notice}`.toLocaleLowerCase("pt-BR").includes(query))
    .filter((item) => !selectedStatus || item.status === selectedStatus)
    .map((item) => {
      const complete = item.status === "Deferido" || item.status === "Indeferido";
      const actionLabel = item.status === "Recebido" ? "Analisar" : complete ? "Decisão registrada" : "Registrar decisão";
      return `<tr>
        <td>${escapeHtml(item.candidate)}</td>
        <td>${escapeHtml(item.notice)}</td>
        <td>${escapeHtml(item.reason)}</td>
        <td>${statusBadge(item.status)}</td>
        <td><button class="table-action" type="button" data-action="advance-appeal" data-index="${appeals.indexOf(item)}" ${complete ? "disabled" : ""}>${actionLabel}</button></td>
      </tr>`;
    });
  renderTable(appealTable, rows, "Nenhum recurso corresponde à busca.");
}

function renderUsers() {
  const query = document.querySelector("#user-search").value.trim().toLocaleLowerCase("pt-BR");
  const selectedRole = document.querySelector("#user-role-filter").value;
  const rows = users
    .filter((user) => `${user.name} ${user.email}`.toLocaleLowerCase("pt-BR").includes(query))
    .filter((user) => !selectedRole || user.role === selectedRole)
    .map((user) => {
      const index = users.indexOf(user);
      const access = user.active ? "Ativo" : "Inativo";
      return `<tr>
        <td>${escapeHtml(user.name)}</td>
        <td>${escapeHtml(user.email)}</td>
        <td>${escapeHtml(user.role)}</td>
        <td>${statusBadge(access)}</td>
        <td><button class="table-action" type="button" data-action="toggle-user" data-index="${index}">${user.active ? "Desativar" : "Ativar"}</button></td>
      </tr>`;
    });
  renderTable(userTable, rows, "Nenhum usuário corresponde à busca.");
}

function updateDashboard() {
  document.querySelector("#open-notice-count").textContent = notices.filter((item) => item.status === "Aberto").length;
  document.querySelector("#application-count").textContent = applications.length.toLocaleString("pt-BR");
  document.querySelector("#pending-appeal-count").textContent = appeals.filter((item) => ["Recebido", "Em análise"].includes(item.status)).length;
}

function renderAll() {
  renderNotices();
  renderApplications();
  renderAppeals();
  renderUsers();
  updateDashboard();
}

function navigateToTab(tab) {
  const activeTab = Object.hasOwn(tabTitles, tab) ? tab : "dashboard";
  document.querySelectorAll(".view-panel").forEach((panel) => {
    panel.hidden = panel.id !== `view-${activeTab}`;
  });
  document.querySelectorAll("[data-tab]").forEach((link) => {
    if (link.dataset.tab === activeTab) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
  document.querySelector("#page-title").textContent = tabTitles[activeTab];
  if (window.location.hash !== `#${activeTab}`) {
    window.history.replaceState(null, "", `#${activeTab}`);
  }
}

document.querySelectorAll("[data-tab]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    navigateToTab(link.dataset.tab);
  });
});

window.addEventListener("hashchange", () => navigateToTab(window.location.hash.slice(1)));

[
  ["#notice-search", renderNotices],
  ["#notice-status-filter", renderNotices],
  ["#application-search", renderApplications],
  ["#application-status-filter", renderApplications],
  ["#appeal-search", renderAppeals],
  ["#appeal-status-filter", renderAppeals],
  ["#user-search", renderUsers],
  ["#user-role-filter", renderUsers],
].forEach(([selector, render]) => {
  document.querySelector(selector).addEventListener("input", render);
  document.querySelector(selector).addEventListener("change", render);
});

document.querySelector("#new-notice-button").addEventListener("click", () => {
  document.querySelector("#notice-dialog").showModal();
});

document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => document.querySelector("#notice-dialog").close());
});

document.querySelector("[data-close-appeal]").addEventListener("click", () => {
  document.querySelector("#appeal-dialog").close();
});

document.querySelectorAll("[data-appeal-decision]").forEach((button) => {
  button.addEventListener("click", () => {
    const appeal = appeals[Number(document.querySelector("#appeal-dialog").dataset.index)];
    appeal.status = button.dataset.appealDecision;
    document.querySelector("#appeal-dialog").close();
    renderAll();
    showToast(`Recurso ${appeal.status.toLocaleLowerCase("pt-BR")}.`);
  });
});

document.querySelector("#notice-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const start = String(data.get("start"));
  const end = String(data.get("end"));
  if (end < start) {
    form.elements.end.setCustomValidity("A data final deve ser posterior à data inicial.");
    form.elements.end.reportValidity();
    form.elements.end.setCustomValidity("");
    return;
  }
  const formatDate = (date) => new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR");
  notices.unshift({
    code: `${String(notices.length + 1).padStart(3, "0")}/2026`,
    title: String(data.get("title")).trim(),
    period: `${formatDate(start)} a ${formatDate(end)}`,
    status: String(data.get("status")),
  });
  form.reset();
  document.querySelector("#notice-dialog").close();
  renderAll();
  showToast("Edital demonstrativo adicionado.");
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const { action, index } = button.dataset;
  if (action === "notice-details") {
    const notice = notices.find((item) => item.code === button.dataset.code);
    if (notice) showToast(`${notice.code} · ${notice.title} · ${notice.status}`);
  } else if (action === "advance-application") {
    const application = applications[Number(index)];
    const nextStatus = {
      Recebida: "Em análise",
      "Em análise": "Aguardando correção",
      "Aguardando correção": "Aprovada",
      Aprovada: "Aprovada",
      Reprovada: "Reprovada",
    };
    application.status = nextStatus[application.status] || application.status;
    renderAll();
    showToast(`Situação demonstrativa atualizada: ${application.status}.`);
  } else if (action === "advance-appeal") {
    const appeal = appeals[Number(index)];
    if (appeal.status === "Recebido") {
      appeal.status = "Em análise";
      renderAll();
      showToast("Recurso atualizado para análise.");
    } else if (appeal.status === "Em análise") {
      const dialog = document.querySelector("#appeal-dialog");
      dialog.dataset.index = index;
      document.querySelector("#appeal-summary").textContent = `${appeal.candidate} · ${appeal.reason}`;
      dialog.showModal();
    }
  } else if (action === "toggle-user") {
    const user = users[Number(index)];
    user.active = !user.active;
    renderUsers();
    showToast(`Acesso demonstrativo ${user.active ? "ativado" : "desativado"}.`);
  }
});

document.querySelectorAll("[data-demo-notice]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.demoNotice));
});

renderAll();
navigateToTab(window.location.hash.slice(1));
