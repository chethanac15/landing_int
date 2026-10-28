const previewContent = document.querySelector("#preview-content");
const previewTabs = [...document.querySelectorAll("[data-preview]")];
const authView = document.querySelector("#auth-view");
const authContent = document.querySelector("#auth-content");
const authTabButtons = [...document.querySelectorAll("[data-auth-tab]")];
const marketingView = document.querySelector("#marketing-view");
const menuToggle = document.querySelector(".mobile-menu-toggle");
const navigation = document.querySelector("#primary-navigation");
let authMode = "signin";

document.querySelector("#current-year").textContent = new Date().getFullYear();

const previewViews = {
  overview: `
    <h3>Project overview</h3><div class="preview-subheading">An at-a-glance view of your project.</div>
    <div class="preview-kpis">
      <div class="preview-kpi"><span>Estimated budget</span><strong>₹24,80,000</strong><small>Approved estimate</small></div>
      <div class="preview-kpi"><span>Committed cost</span><strong>₹15,42,500</strong><small>Across 12 orders</small></div>
      <div class="preview-kpi highlight"><span>Remaining budget</span><strong>₹9,37,500</strong><small>Within project budget</small></div>
    </div>
    <div class="preview-split">
      <div class="preview-box"><div class="preview-box-title">Upcoming milestones <small>VIEW TIMELINE →</small></div>
        <div class="preview-timeline-row"><i class="timeline-dot done"></i><span>Design approval</span><small>Completed · 18 Jun</small></div>
        <div class="preview-timeline-row"><i class="timeline-dot current"></i><span>Material procurement</span><small>In progress · 02 Jul</small></div>
        <div class="preview-timeline-row"><i class="timeline-dot"></i><span>Site execution</span><small>Up next · 15 Jul</small></div>
      </div>
      <div class="preview-box"><div class="preview-box-title">Recent activity</div>
        <div class="activity-row"><i class="activity-dot"></i><span>Estimate revised by Meera S.<small>Today · 10:42 AM</small></span></div>
        <div class="activity-row"><i class="activity-dot"></i><span>Oak flooring order updated<small>Yesterday · 4:18 PM</small></span></div>
      </div>
    </div>`,
  budget: `
    <h3>Budget & estimate</h3><div class="preview-subheading">Compare your estimate with committed and actual costs.</div>
    <div class="preview-kpis">
      <div class="preview-kpi"><span>Approved estimate</span><strong>₹24,80,000</strong><small>Updated 20 Jun</small></div>
      <div class="preview-kpi"><span>Committed</span><strong>₹15,42,500</strong><small>62% of estimate</small></div>
      <div class="preview-kpi highlight"><span>Available</span><strong>₹9,37,500</strong><small>Before final costs</small></div>
    </div>
    <div class="preview-box" style="margin-top:16px">
      <div class="preview-box-title">Estimate breakdown <small>ILLUSTRATIVE AMOUNTS</small></div>
      <div class="preview-table">
        <div class="preview-table-head"><span>CATEGORY</span><span>ESTIMATED</span><span>COMMITTED</span><span>VARIANCE</span></div>
        <div class="preview-table-row"><b>Joinery & cabinetry</b><span>₹8,20,000</span><span>₹6,20,000</span><span>₹2,00,000</span></div>
        <div class="preview-table-row"><b>Flooring & finishes</b><span>₹6,40,000</span><span>₹4,86,500</span><span>₹1,53,500</span></div>
        <div class="preview-table-row"><b>Lighting & electrical</b><span>₹3,10,000</span><span>₹2,14,000</span><span>₹96,000</span></div>
        <div class="preview-table-row"><b>Other project costs</b><span>₹7,10,000</span><span>₹2,22,000</span><span>₹4,88,000</span></div>
      </div>
    </div>`,
  procurement: `
    <h3>Procurement & materials</h3><div class="preview-subheading">Keep orders, vendors and expected deliveries together.</div>
    <div class="preview-kpis">
      <div class="preview-kpi"><span>Active orders</span><strong>12</strong><small>Across 7 vendors</small></div>
      <div class="preview-kpi"><span>In transit</span><strong>3</strong><small>Next delivery · 28 Jun</small></div>
      <div class="preview-kpi highlight"><span>Needs attention</span><strong>1 order</strong><small>Confirm delivery date</small></div>
    </div>
    <div class="preview-table">
      <div class="preview-table-head"><span>MATERIAL</span><span>VENDOR</span><span>DELIVERY</span><span>STATUS</span></div>
      <div class="preview-table-row"><b>Engineered oak flooring</b><span>Wood & Grain Co.</span><span>28 Jun</span><span class="preview-badge">On track</span></div>
      <div class="preview-table-row"><b>Calacatta quartz</b><span>Stone Studio</span><span>02 Jul</span><span class="preview-badge yellow">In transit</span></div>
      <div class="preview-table-row"><b>Brushed brass fittings</b><span>Form & Function</span><span>Received</span><span class="preview-badge green">Delivered</span></div>
      <div class="preview-table-row"><b>Wall lights · pair</b><span>Lightform India</span><span>05 Jul</span><span class="preview-badge yellow">Confirmed</span></div>
    </div>`,
  site: `
    <h3>Site progress</h3><div class="preview-subheading">See what is moving on site and what comes next.</div>
    <div class="preview-kpis">
      <div class="preview-kpi"><span>Overall progress</span><strong>68%</strong><small>Updated today</small><div class="preview-progress-line"><span style="width:68%"></span></div></div>
      <div class="preview-kpi"><span>Milestones</span><strong>4 of 7</strong><small>Completed to date</small></div>
      <div class="preview-kpi highlight"><span>Next on site</span><strong>Cabinet install</strong><small>Planned · 27 Jun</small></div>
    </div>
    <div class="preview-box" style="margin-top:16px">
      <div class="preview-box-title">Work sequence <small>INDIRANAGAR RESIDENCE</small></div>
      <div class="preview-milestones">
        <div class="preview-milestone complete"><b>Electrical rough-in</b><small>Complete · 21 Jun</small></div>
        <div class="preview-milestone current"><b>Cabinet installation</b><small>Next · 27 Jun</small></div>
        <div class="preview-milestone"><b>Countertop fit</b><small>02 Jul</small></div>
        <div class="preview-milestone"><b>Final checks</b><small>12 Aug</small></div>
      </div>
    </div>`,
  decisions: `
    <h3>Client decisions</h3><div class="preview-subheading">Selections and approvals, kept with the project.</div>
    <div class="preview-kpis">
      <div class="preview-kpi highlight"><span>Waiting for a decision</span><strong>1 item</strong><small>Kitchen counter finish</small></div>
      <div class="preview-kpi"><span>Approved selections</span><strong>8</strong><small>Documented in project</small></div>
      <div class="preview-kpi"><span>Last response</span><strong>23 Jun</strong><small>From Priya R.</small></div>
    </div>
    <div class="preview-box" style="margin-top:16px">
      <div class="preview-box-title">Pending approval <span class="preview-badge yellow">Awaiting response</span></div>
      <div class="decision-preview">
        <div class="decision-preview-image" role="img" aria-label="Illustrative warm stone countertop and oak finish selection"></div>
        <div class="decision-preview-details"><h4>Kitchen counter finish</h4><p>Choose the surface that works best with the approved oak cabinetry.</p>
          <div class="decision-option selected"><span>Calacatta Gold · Quartz</span><span>Selected option</span></div>
          <div class="decision-option"><span>Soft Grey · Quartz</span><span>Option B</span></div>
        </div>
      </div>
    </div>`
};

function setPreview(tabName, moveFocus = false) {
  if (!previewViews[tabName]) return;
  previewTabs.forEach((tab) => {
    const active = tab.dataset.preview === tabName;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && moveFocus) tab.focus();
  });
  previewContent.innerHTML = previewViews[tabName];
  previewContent.setAttribute("aria-labelledby", `tab-${tabName}`);
}

previewTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => setPreview(tab.dataset.preview));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0
      : event.key === "End" ? previewTabs.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : -1) + previewTabs.length) % previewTabs.length;
    setPreview(previewTabs[nextIndex].dataset.preview, true);
  });
});
setPreview("overview");

function fieldMarkup(id, label, type, placeholder, icon, autocomplete, options = {}) {
  const toggle = options.passwordToggle
    ? `<button class="password-toggle" type="button" aria-label="Show password" aria-pressed="false"><svg class="icon"><use href="#i-eye"></use></svg></button>`
    : "";
  const hint = options.hint ? `<small class="field-hint">${options.hint}</small>` : "";
  const required = options.required === false ? "" : "required";
  const minLength = options.minLength ? `minlength="${options.minLength}"` : "";
  return `<div class="field"><label for="${id}">${label}</label><div class="input-wrap${options.passwordToggle ? " has-toggle" : ""}"><svg class="icon" aria-hidden="true"><use href="#${icon}"></use></svg><input id="${id}" name="${id}" type="${type}" placeholder="${placeholder}" autocomplete="${autocomplete}" ${required} ${minLength}>${toggle}</div>${hint}</div>`;
}

function setSelectedAuthTab() {
  const selectedMode = authMode === "forgot" ? "signin" : authMode.startsWith("demo") ? "demo" : authMode;
  authTabButtons.forEach((button) => {
    const selected = button.dataset.authTab === selectedMode;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
    if (selected) authContent.setAttribute("aria-labelledby", button.id);
  });
}

function signInMarkup() {
  return `<div class="auth-heading"><h2>Welcome back</h2><p>Sign in to your workspace</p></div>
    <div class="auth-demo-notice">Preview only: this form is not connected to an authentication service.</div>
    <form class="auth-form" data-form="signin" novalidate>
      ${fieldMarkup("work-email", "Work email", "email", "you@studio.com", "i-mail", "email")}
      ${fieldMarkup("password", "Password", "password", "Enter your password", "i-lock", "current-password", { passwordToggle: true })}
      <div class="form-row"><label class="check-label"><input type="checkbox" name="remember"> Remember me</label><a class="forgot-link" href="#forgot">Forgot password?</a></div>
      <button class="button button-blue auth-submit" type="submit">Sign in <svg class="icon"><use href="#i-arrow"></use></svg></button>
      <div class="auth-message" role="status" aria-live="polite"></div>
    </form>
    <div class="auth-divider"><span>NEW TO APNI ESTATE?</span></div>
    <div class="auth-trial"><a href="#create" data-auth-switch="create">Start 15-Day Free Trial</a></div>`;
}

function createMarkup() {
  return `<div class="auth-heading"><h2>Create your workspace</h2><p>Bring your studio’s projects into one place.</p></div>
    <div class="auth-demo-notice">Preview only: submitting this form will not create a real account.</div>
    <form class="auth-form" data-form="create" novalidate>
      ${fieldMarkup("full-name", "Full name", "text", "Your name", "i-users", "name")}
      ${fieldMarkup("create-email", "Work email", "email", "you@studio.com", "i-mail", "email")}
      ${fieldMarkup("studio-name", "Studio name", "text", "Your interior studio", "i-building", "organization")}
      ${fieldMarkup("create-password", "Password", "password", "At least 8 characters", "i-lock", "new-password", { passwordToggle: true, minLength: 8, hint: "Use at least 8 characters." })}
      <button class="button button-blue auth-submit" type="submit">Create account <svg class="icon"><use href="#i-arrow"></use></svg></button>
      <div class="auth-message" role="status" aria-live="polite"></div>
    </form>`;
}

function demoMarkup() {
  return `<div class="auth-heading"><h2>Explore the workspace</h2><p>See how Apni Estate can organize an interior project.</p></div>
    <div class="auth-demo-notice">This local demo uses illustrative sample data. It does not create an account or connect to a live service.</div>
    <div class="demo-preview" aria-label="Illustrative project summary">
      <div class="demo-preview-top"><span>Indiranagar Residence</span><span>Sample project</span></div>
      <div class="demo-preview-row"><span>Estimated budget</span><b>₹24,80,000</b></div>
      <div class="demo-preview-row"><span>Procurement</span><b>3 orders in progress</b></div>
      <div class="demo-preview-row"><span>Site progress</span><b>68% · Illustrative</b></div>
      <div class="demo-preview-row"><span>Client decisions</span><b>1 awaiting response</b></div>
    </div>
    <button class="button button-blue auth-submit demo-launch" type="button" data-demo-launch>Open sample workspace <svg class="icon"><use href="#i-arrow"></use></svg></button>`;
}

function demoActiveMarkup() {
  return `<div class="auth-result-icon"><svg class="icon"><use href="#i-grid"></use></svg></div>
    <div class="auth-heading"><h2>Sample workspace</h2><p>Illustrative project view · Demo mode</p></div>
    <div class="auth-demo-notice">You are viewing example project information only. No account or authenticated session has been created.</div>
    <div class="demo-preview" aria-label="Sample project budget summary">
      <div class="demo-preview-top"><span>Indiranagar Residence</span><span>In progress</span></div>
      <div class="demo-preview-row"><span>Estimated budget</span><b>₹24,80,000</b></div>
      <div class="demo-preview-row"><span>Committed cost</span><b>₹15,42,500</b></div>
      <div class="demo-preview-row"><span>Next milestone</span><b>Material procurement · 02 Jul</b></div>
      <div class="demo-preview-row"><span>Client decision</span><b>Kitchen counter finish</b></div>
    </div>
    <a class="button button-outline auth-submit auth-footer-link" href="#home">Return to landing page <svg class="icon"><use href="#i-arrow"></use></svg></a>`;
}

function forgotMarkup() {
  return `<div class="auth-heading"><h2>Reset your password</h2><p>Enter your work email to receive password-reset instructions.</p></div>
    <div class="auth-demo-notice">Password reset is not connected in this preview. No email will be sent.</div>
    <form class="auth-form" data-form="forgot" novalidate>
      ${fieldMarkup("reset-email", "Work email", "email", "you@studio.com", "i-mail", "email")}
      <button class="button button-blue auth-submit" type="submit">Send reset instructions <svg class="icon"><use href="#i-arrow"></use></svg></button>
      <div class="auth-message" role="status" aria-live="polite"></div>
    </form>
    <a class="forgot-link auth-footer-link" href="#signin" data-auth-switch="signin">← Back to sign in</a>`;
}

function renderAuth() {
  setSelectedAuthTab();
  const templates = {
    signin: signInMarkup,
    create: createMarkup,
    demo: demoMarkup,
    "demo-active": demoActiveMarkup,
    forgot: forgotMarkup
  };
  authContent.innerHTML = (templates[authMode] || signInMarkup)();
  bindAuthInteractions();
}

function bindAuthInteractions() {
  authContent.querySelectorAll("[data-auth-switch]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      authMode = link.dataset.authSwitch;
      renderAuth();
    });
  });

  authContent.querySelector(".forgot-link[href='#forgot']")?.addEventListener("click", (event) => {
    event.preventDefault();
    authMode = "forgot";
    renderAuth();
  });

  authContent.querySelectorAll(".password-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const input = toggle.closest(".input-wrap").querySelector("input");
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      toggle.setAttribute("aria-label", show ? "Hide password" : "Show password");
      toggle.setAttribute("aria-pressed", String(show));
    });
  });

  const form = authContent.querySelector(".auth-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = form.querySelector(".auth-message");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const button = form.querySelector('[type="submit"]');
      const originalLabel = button.innerHTML;
      button.disabled = true;
      button.textContent = "Please wait…";
      message.className = "auth-message";
      window.setTimeout(() => {
        button.disabled = false;
        button.innerHTML = originalLabel;
        if (form.dataset.form === "signin") {
          message.textContent = "No sign-in was attempted. Connect an authentication service before launch.";
          message.classList.add("error");
        } else if (form.dataset.form === "create") {
          message.textContent = "No account was created. Connect an account service before launch.";
          message.classList.add("error");
        } else {
          message.textContent = "No reset email was sent. Connect an email and password-reset service before launch.";
          message.classList.add("error");
        }
      }, 450);
    });
  }

  authContent.querySelector("[data-demo-launch]")?.addEventListener("click", () => {
    authMode = "demo-active";
    renderAuth();
  });
}

function openAuth(mode = "signin", updateHistory = true) {
  authMode = mode;
  marketingView.hidden = true;
  authView.hidden = false;
  document.body.classList.add("auth-mode");
  document.title = "Workspace access — Apni Estate";
  renderAuth();
  authTabButtons.find((button) => button.getAttribute("aria-selected") === "true")?.focus();
  if (updateHistory && window.location.hash !== "#auth") {
    window.history.pushState({ auth: true }, "", "#auth");
  }
}

function closeAuth() {
  authView.hidden = true;
  marketingView.hidden = false;
  document.body.classList.remove("auth-mode");
  document.title = "Apni Estate — Interior Studio Workspace";
}

document.querySelectorAll("[data-auth-mode]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openAuth(link.dataset.authMode);
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

authTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    authMode = button.dataset.authTab;
    renderAuth();
  });
  button.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = authTabButtons.indexOf(button);
    const nextIndex = event.key === "Home" ? 0
      : event.key === "End" ? authTabButtons.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : -1) + authTabButtons.length) % authTabButtons.length;
    const nextTab = authTabButtons[nextIndex];
    authMode = nextTab.dataset.authTab;
    renderAuth();
    nextTab.focus();
  });
});

document.querySelectorAll("[data-preview-tab]").forEach((link) => {
  link.addEventListener("click", () => setPreview(link.dataset.previewTab));
});

function renderRoute() {
  if (window.location.hash === "#auth") {
    if (authView.hidden) openAuth("signin", false);
    return;
  }
  if (!authView.hidden) closeAuth();
}
window.addEventListener("hashchange", renderRoute);
window.addEventListener("popstate", renderRoute);
renderRoute();

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuToggle.querySelector("use").setAttribute("href", isOpen ? "#i-close" : "#i-menu");
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.querySelector("use").setAttribute("href", "#i-menu");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.querySelector("use").setAttribute("href", "#i-menu");
    menuToggle.focus();
  }
});
