"use strict";

// No cookies, storage, analytics or requests; language travels in local page links.
function selectLanguage(language) {
  const selected = language === "en" ? "en" : "tr";
  document.documentElement.lang = selected;
  document.querySelectorAll("[data-lang]").forEach(section => {
    section.hidden = section.dataset.lang !== selected;
  });
  document.querySelectorAll("[data-select-lang]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.selectLang === selected));
  });
  document.querySelectorAll("a[data-page]").forEach(link => {
    const target = new URL(link.href);
    target.searchParams.set("lang", selected);
    link.href = target.href;
  });
  const current = new URL(window.location.href);
  current.searchParams.set("lang", selected);
  window.history.replaceState(null, "", current);
}

document.querySelectorAll("[data-select-lang]").forEach(button => {
  button.addEventListener("click", () => selectLanguage(button.dataset.selectLang));
});
selectLanguage(new URLSearchParams(window.location.search).get("lang"));
