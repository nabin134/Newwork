// ----------------------------
// Fixed demo credentials
// ----------------------------
const FIXED_CREDENTIALS = {
  username: "winkmecertificate@123gmail.com",
  password: "certificate123",
};

// Demo table data
const withdrawals = [
  {
    user: "MZ136198",
    orderNo: "200152965149404761448880dao",
    amount: "41,378.00",
    actual: "41,378.00",
    fee: "0.00",
    name: "Vasistha",
    accountNo: "4346 1234 5678 9123",
    discount: "No",
    status: "Confirmed",
    operator: "KF006",
  },
  {
    user: "FI100026",
    orderNo: "200152965149404198094981dao",
    amount: "67,680.00",
    actual: "67,680.00",
    fee: "0.00",
    name: "Apala",
    accountNo: "5327 0010 0095 2450",
    discount: "No",
    status: "Confirmed",
    operator: "KF003",
  },
  {
    user: "WJ188328",
    orderNo: "20015432783789741348880dao",
    amount: "92,484.00",
    actual: "92,484.00",
    fee: "0.00",
    name: "Nayana",
    accountNo: "4321 0123 4567 8901",
    discount: "No",
    status: "Confirmed",
    operator: "KF006",
  },
  {
    user: "ON133859",
    orderNo: "200152435489749106547380dao",
    amount: "6,023.00",
    actual: "6,023.00",
    fee: "0.00",
    name: "Kumara",
    accountNo: "4000 1234 5678 9010",
    discount: "No",
    status: "Confirmed",
    operator: "KF005",
  },
];

function cleanUrl() {
  const cleanPath = window.location.pathname.split("/").pop() || "index.html";
  window.history.replaceState({}, document.title, cleanPath);
}

function formatTime(d) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(d);

  const pick = (type) => parts.find((p) => p.type === type)?.value || "00";
  return `${pick("hour")}:${pick("minute")}:${pick("second")} IST`;
}

function showToast(message, kind = "success") {
  const toast = document.getElementById("screenshotToast");
  if (!toast) return;

  toast.hidden = false;
  toast.textContent = message;
  toast.classList.remove("is-success", "is-error");
  toast.classList.add(kind === "error" ? "is-error" : "is-success");

  window.clearTimeout(window.__screenshotToastTimer);
  window.__screenshotToastTimer = window.setTimeout(() => {
    toast.hidden = true;
  }, 2600);
}

let activeHintModal = null;

function formatNoticeStamp(d) {
  const datePart = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
  const timePart = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(d);
  return `${datePart} at ${timePart}`;
}

function getHintConfig(type) {
  if (type === "reputation") {
    return {
      modalId: "reputationHintModal",
      dialogId: "reputationHintDialog",
      bodyId: "reputationHintBody",
      storageKey: "reputationHintContent",
      filePrefix: "winkmeclub-reputation-hint",
      captureBg: "#0a1f2e",
      captureTheme: "reputation",
      toastLabel: "System Hint",
    };
  }
  if (type === "notice") {
    return {
      modalId: "noticeModal",
      dialogId: "noticeDialog",
      bodyId: "noticeInner",
      storageKey: "noticeCertificateContentV16",
      filePrefix: "winkmeclub-notice",
      captureBg: "#2a0c18",
      captureTheme: "notice",
      toastLabel: "Notice",
    };
  }
  return {
    modalId: "systemHintModal",
    dialogId: "systemHintDialog",
    bodyId: "systemHintBody",
    storageKey: "systemHintContent",
    filePrefix: "winkmeclub-system-hint",
    captureBg: "#16082a",
    captureTheme: "large",
    toastLabel: "System Hint",
  };
}

function toggleModalScreenshotBar(show, type = null) {
  const bar = document.getElementById("modalScreenshotBar");
  const printBtn = document.getElementById("modalPrintBtn");
  if (!bar) return;
  bar.classList.toggle("hidden", !show);
  bar.setAttribute("aria-hidden", show ? "false" : "true");
  if (printBtn) {
    // PDF download available for Large Amount, Reputation, and Notice
    const showPrint = !!show;
    printBtn.classList.toggle("hidden", !showPrint);
    printBtn.setAttribute("aria-hidden", showPrint ? "false" : "true");
  }
}

function prepareCaptureSurface(dialog) {
  document.activeElement?.blur?.();
  dialog.classList.add("is-capturing");

  if (dialog.id === "noticeDialog") {
    const modal = document.getElementById("noticeModal");
    if (modal) {
      modal.classList.add("is-capturing-notice");
      modal.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }
}

function cleanupCaptureSurface(dialog) {
  dialog.classList.remove("is-capturing");
  document.getElementById("noticeModal")?.classList.remove("is-capturing-notice");
}

function closeActiveHintModal() {
  if (!activeHintModal) return;
  closeHintModal(activeHintModal);
}

function getCaptureHomeScene(type) {
  if (type === "reputation" || type === "member") {
    return {
      tab: "member",
      view: "dashboard",
      title: "Member System",
      tableTitle: "Recent Member Activity Records",
      chipLabels: [
        "Member List",
        "Member Level",
        "VIP Manage",
        "Member Center",
        "Invite Code",
        "Bind Device",
        "Login Log",
        "Risk Control",
        "Profile Audit",
        "Member Tags",
      ],
      activeChipIndex: 3,
    };
  }
  if (type === "notice" || type === "order") {
    return {
      tab: "order",
      view: "dashboard",
      title: "Order System",
      tableTitle: "Recent Order Records",
      chipLabels: [
        "All Orders",
        "Pending Order",
        "Paid Order",
        "Order Manage",
        "Refund Order",
        "Cancel Order",
        "Ship Status",
        "Order Config",
        "Check Order",
        "Export Order",
      ],
      activeChipIndex: 3,
    };
  }
  if (type === "info") {
    return {
      tab: "info",
      view: "dashboard",
      title: "Info Report",
      tableTitle: "Recent Info Report Records",
      chipLabels: [
        "Daily Report",
        "Weekly Report",
        "Monthly Report",
        "Info Center",
        "User Report",
        "Risk Report",
        "Finance Report",
        "Export Report",
        "Audit Log",
        "Summary",
      ],
      activeChipIndex: 3,
    };
  }
  if (type === "function") {
    return {
      tab: "function",
      view: "dashboard",
      title: "User Function",
      tableTitle: "Recent User Function Records",
      chipLabels: [
        "User List",
        "Role Manage",
        "Permission",
        "User Function",
        "Access Log",
        "Device Bind",
        "Security",
        "Config",
        "Audit",
        "Tools",
      ],
      activeChipIndex: 3,
    };
  }
  return {
    tab: "payment",
    view: "dashboard",
    title: "Cash System",
    tableTitle: "Recent User Withdraw Records",
    chipLabels: [
      "Online Deposit",
      "Payment Platform",
      "Payment Type",
      "Cash System",
      "Recharge Card",
      "Manual Access",
      "Exchange Code",
      "Payment Config",
      "Check & Payment",
      "Online Deposit",
    ],
    activeChipIndex: 3,
  };
}

function snapshotHomeScene() {
  const activeTab = document.querySelector(".tabs-row .tab.active");
  const titleEl = document.getElementById("cashSystemTitle");
  const tableTitleEl = document.getElementById("recordsPanelTitle");
  const chips = Array.from(document.querySelectorAll(".feature-chips .chip"));
  const creditHidden = document.getElementById("creditScoreView")?.classList.contains("hidden");

  return {
    tab: activeTab?.getAttribute("data-tab") || "payment",
    view: creditHidden === false ? "credit" : "dashboard",
    title: titleEl?.textContent || "Cash System",
    tableTitle: tableTitleEl?.textContent || "Recent User Withdraw Records",
    chipLabels: chips.map((chip) => chip.textContent.trim()),
    activeChipIndex: Math.max(
      0,
      chips.findIndex((chip) => chip.classList.contains("is-active") || chip.classList.contains("chip-primary"))
    ),
  };
}

function applyHomeScene(scene) {
  if (!scene) return;

  switchMainView(scene.view || "dashboard");

  document.querySelectorAll(".tabs-row .tab").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === scene.tab);
  });

  const titleEl = document.getElementById("cashSystemTitle");
  if (titleEl && scene.title) titleEl.textContent = scene.title;

  const tableTitleEl = document.getElementById("recordsPanelTitle");
  if (tableTitleEl && scene.tableTitle) tableTitleEl.textContent = scene.tableTitle;

  const chips = Array.from(document.querySelectorAll(".feature-chips .chip"));
  chips.forEach((chip, index) => {
    if (scene.chipLabels?.[index]) chip.textContent = scene.chipLabels[index];
    const isActive = index === (scene.activeChipIndex ?? 3);
    chip.classList.toggle("is-active", isActive);
    chip.classList.toggle("chip-primary", isActive);
  });
}

const FULL_HD = { width: 1920, height: 1080 };

function getFullHdCaptureScale() {
  const widthScale = FULL_HD.width / Math.max(window.innerWidth, 1);
  const heightScale = FULL_HD.height / Math.max(window.innerHeight, 1);
  const dpr = window.devicePixelRatio || 1;
  // At least 2x for crisp text; enough to hit Full HD pixel count
  return Math.min(Math.max(2, dpr, widthScale, heightScale), 3);
}

function ensureFullHdCanvas(sourceCanvas) {
  const out = document.createElement("canvas");
  out.width = FULL_HD.width;
  out.height = FULL_HD.height;
  const ctx = out.getContext("2d");
  if (!ctx) return sourceCanvas;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.fillStyle = "#0a0414";
  ctx.fillRect(0, 0, out.width, out.height);

  const scale = Math.min(out.width / sourceCanvas.width, out.height / sourceCanvas.height);
  const drawW = Math.round(sourceCanvas.width * scale);
  const drawH = Math.round(sourceCanvas.height * scale);
  const dx = Math.round((out.width - drawW) / 2);
  const dy = Math.round((out.height - drawH) / 2);
  ctx.drawImage(sourceCanvas, dx, dy, drawW, drawH);
  return out;
}

function downloadPngCanvas(canvas, filename) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("PNG export failed"));
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = filename;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        resolve();
      },
      "image/png",
      1
    );
  });
}

async function captureDashboardScreenshot(triggerEl = null) {
  const trigger =
    triggerEl ||
    document.getElementById("modalScreenshotBtn") ||
    document.getElementById("screenshotBtn");

  if (!trigger) return;
  if (typeof window.html2canvas !== "function") {
    showToast("Screenshot library failed to load.", "error");
    return;
  }

  if (!activeHintModal) {
    showToast("Open Large Amount, Reputation Points, or Notice first.", "error");
    return;
  }

  const config = getHintConfig(activeHintModal);
  const dialog = document.getElementById(config.dialogId);
  const dashboard = document.getElementById("dashboardScreen");
  if (!dialog) return;

  const previousTitle = trigger.getAttribute("title") || "Take screenshot";
  const themeClass = `capture-theme-${config.captureTheme || "large"}`;
  const previousScene = snapshotHomeScene();
  const captureScene = getCaptureHomeScene(activeHintModal);
  const captureScale = getFullHdCaptureScale();

  try {
    trigger.classList.add("is-busy");
    trigger.setAttribute("aria-busy", "true");
    trigger.setAttribute("title", "Capturing Full HD...");

    // Each modal screenshot uses a different home page section
    applyHomeScene(captureScene);
    prepareCaptureSurface(dialog);
    document.body.classList.add("is-capture-home", "is-capture-hd");
    if (dashboard) {
      dashboard.classList.remove(
        "capture-theme-large",
        "capture-theme-reputation",
        "capture-theme-notice"
      );
      dashboard.classList.add(themeClass);
    }

    await new Promise((resolve) => setTimeout(resolve, 200));

    const isNotice = activeHintModal === "notice";
    const dialogRect = dialog.getBoundingClientRect();
    const captureWidth = window.innerWidth;
    // Notice can grow taller than the viewport — capture the full certificate
    const captureHeight = isNotice
      ? Math.ceil(
          Math.max(
            window.innerHeight,
            dialogRect.bottom + 64,
            dialog.scrollHeight + 120,
            document.documentElement.scrollHeight
          )
        )
      : window.innerHeight;

    const rawCanvas = await window.html2canvas(document.body, {
      backgroundColor: config.captureBg || "#16082a",
      scale: captureScale,
      width: captureWidth,
      height: captureHeight,
      windowWidth: captureWidth,
      windowHeight: captureHeight,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      useCORS: true,
      allowTaint: true,
      logging: false,
      imageTimeout: 15000,
      removeContainer: true,
      ignoreElements: (el) =>
        el.id === "modalScreenshotBar" ||
        el.id === "screenshotToast" ||
        el.id === "loginScreen",
      onclone: (clonedDoc) => {
        const clonedBody = clonedDoc.body;
        if (clonedBody) {
          clonedBody.classList.add("is-capture-home", "is-capture-hd");
          clonedBody.style.width = `${captureWidth}px`;
          clonedBody.style.minHeight = `${captureHeight}px`;
          clonedBody.style.height = isNotice ? "auto" : `${captureHeight}px`;
          clonedBody.style.overflow = isNotice ? "visible" : "hidden";
        }
        const clonedNoticeModal = clonedDoc.getElementById("noticeModal");
        if (clonedNoticeModal) {
          clonedNoticeModal.classList.add("is-capturing-notice");
          clonedNoticeModal.style.overflow = "visible";
          clonedNoticeModal.style.height = "auto";
          clonedNoticeModal.style.minHeight = `${captureHeight}px`;
          clonedNoticeModal.style.position = "absolute";
          clonedNoticeModal.style.inset = "0 auto auto 0";
          clonedNoticeModal.style.width = "100%";
        }
        const clonedPaper = clonedDoc.querySelector(".notice-paper");
        if (clonedPaper) {
          clonedPaper.style.overflow = "visible";
        }
        const brand = clonedDoc.querySelector(".notice-brand-name");
        if (brand) {
          brand.style.background = "none";
          brand.style.webkitBackgroundClip = "border-box";
          brand.style.backgroundClip = "border-box";
          brand.style.color = "#e11d48";
        }
        const icon = clonedDoc.querySelector(".notice-emblem-icon");
        if (icon) {
          icon.style.mixBlendMode = "normal";
          icon.style.filter = "none";
          icon.style.opacity = "1";
        }
        const scallop = clonedDoc.querySelector(".notice-emblem-scallop");
        if (scallop) {
          scallop.style.background = "#fff8fb";
        }
        const watermark = clonedDoc.querySelector(".notice-watermark-layer");
        if (watermark) {
          watermark.style.opacity = "0.28";
        }
        clonedDoc.querySelectorAll(".notice-watermark-item").forEach((el) => {
          el.style.color = "#5f5f68";
          el.style.opacity = "1";
        });
        clonedDoc.querySelectorAll(".notice-watermark-item img").forEach((img) => {
          img.style.opacity = "0.95";
          img.style.filter = "grayscale(1) brightness(0.88) contrast(1.15)";
        });
        const clonedDash = clonedDoc.getElementById("dashboardScreen");
        if (clonedDash) {
          clonedDash.classList.add(themeClass);
          clonedDash.classList.remove("hidden");
        }
      },
    });

    // Notice: keep full height so every paragraph is in the PNG.
    // Other modals: ensure at least Full HD canvas size.
    const hdCanvas =
      isNotice || (rawCanvas.width >= FULL_HD.width && rawCanvas.height >= FULL_HD.height)
        ? rawCanvas
        : ensureFullHdCanvas(rawCanvas);

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    await downloadPngCanvas(hdCanvas, `${config.filePrefix}-fullhd-${timestamp}.png`);

    showToast(`${config.toastLabel} Full HD screenshot downloaded.`, "success");
  } catch (error) {
    console.error(error);
    showToast("Unable to capture screenshot.", "error");
  } finally {
    cleanupCaptureSurface(dialog);
    document.body.classList.remove("is-capture-home", "is-capture-hd");
    if (activeHintModal) {
      applyHomeScene(getCaptureHomeScene(activeHintModal));
      applyDashboardTheme(activeHintModal);
      setModalHomeVisible(true);
    } else {
      applyHomeScene(previousScene);
      clearDashboardTheme();
      setModalHomeVisible(false);
    }
    trigger.classList.remove("is-busy");
    trigger.setAttribute("aria-busy", "false");
    trigger.setAttribute("title", previousTitle);
  }
}

function applyNoticeCaptureFixes(clonedDoc) {
  const brand = clonedDoc.querySelector(".notice-brand-name");
  if (brand) {
    brand.style.background = "none";
    brand.style.webkitBackgroundClip = "border-box";
    brand.style.backgroundClip = "border-box";
    brand.style.color = "#e11d48";
  }
  const icon = clonedDoc.querySelector(".notice-emblem-icon");
  if (icon) {
    icon.style.mixBlendMode = "normal";
    icon.style.filter = "none";
    icon.style.opacity = "1";
  }
  const scallop = clonedDoc.querySelector(".notice-emblem-scallop");
  if (scallop) {
    scallop.style.background = "#fff8fb";
  }
  const watermark = clonedDoc.querySelector(".notice-watermark-layer");
  if (watermark) {
    watermark.style.opacity = "0.28";
  }
  clonedDoc.querySelectorAll(".notice-watermark-item").forEach((el) => {
    el.style.color = "#5f5f68";
    el.style.opacity = "1";
  });
  clonedDoc.querySelectorAll(".notice-watermark-item img").forEach((img) => {
    img.style.opacity = "0.95";
    img.style.filter = "grayscale(1) brightness(0.88) contrast(1.15)";
  });
  const paper = clonedDoc.querySelector(".notice-paper");
  if (paper) paper.style.overflow = "visible";
}

async function captureModalDialogCanvas(dialog, options = {}) {
  const scale = options.scale || Math.min(Math.max(getFullHdCaptureScale(), 2.5), 3);
  const backgroundColor = options.backgroundColor || null;

  return window.html2canvas(dialog, {
    backgroundColor,
    scale,
    useCORS: true,
    allowTaint: true,
    logging: false,
    imageTimeout: 15000,
    removeContainer: true,
    scrollX: 0,
    scrollY: 0,
    onclone: (clonedDoc) => {
      const clonedDialog = clonedDoc.getElementById(dialog.id) || clonedDoc.querySelector(`#${dialog.id}`);
      if (clonedDialog) {
        clonedDialog.classList.add("is-capturing");
        clonedDialog.style.width = `${dialog.offsetWidth}px`;
        clonedDialog.style.maxWidth = "none";
        clonedDialog.style.margin = "0";
        clonedDialog.style.transform = "none";
        clonedDialog.style.overflow = "visible";
      }
      applyNoticeCaptureFixes(clonedDoc);
      if (typeof options.onclone === "function") options.onclone(clonedDoc);
    },
  });
}

function canvasToJpegDataUrl(canvas, quality = 0.95) {
  return canvas.toDataURL("image/jpeg", quality);
}

async function buildHdPdfFromCanvas(canvas, filename) {
  const jsPdfNamespace = window.jspdf;
  const JsPDF = jsPdfNamespace?.jsPDF || window.jsPDF;
  if (typeof JsPDF !== "function") {
    throw new Error("PDF library failed to load");
  }

  // A4-width HD page; height grows with content so nothing is cropped
  const pdfWidthMm = 210;
  const pdfHeightMm = Math.max(297, (canvas.height / canvas.width) * pdfWidthMm);
  const pdf = new JsPDF({
    orientation: pdfHeightMm >= pdfWidthMm ? "portrait" : "landscape",
    unit: "mm",
    format: [pdfWidthMm, pdfHeightMm],
    compress: true,
  });

  const imgData = canvasToJpegDataUrl(canvas, 0.96);
  pdf.addImage(imgData, "JPEG", 0, 0, pdfWidthMm, pdfHeightMm, undefined, "FAST");
  pdf.save(filename);
}

async function downloadModalHdPdf(triggerEl = null) {
  const trigger = triggerEl || document.getElementById("modalPrintBtn");

  if (!activeHintModal) {
    showToast("Open Large Amount, Reputation Points, or Notice first.", "error");
    return;
  }
  if (typeof window.html2canvas !== "function") {
    showToast("Screenshot library failed to load.", "error");
    return;
  }

  const jsPdfNamespace = window.jspdf;
  const JsPDF = jsPdfNamespace?.jsPDF || window.jsPDF;
  if (typeof JsPDF !== "function") {
    showToast("PDF library failed to load.", "error");
    return;
  }

  const config = getHintConfig(activeHintModal);
  const dialog = document.getElementById(config.dialogId);
  if (!dialog) return;

  const previousTitle = trigger?.getAttribute("title") || "Download Full HD PDF";

  try {
    trigger?.classList.add("is-busy");
    trigger?.setAttribute("aria-busy", "true");
    trigger?.setAttribute("title", "Building Full HD PDF...");

    prepareCaptureSurface(dialog);
    document.body.classList.add("is-capture-hd");
    await new Promise((resolve) => setTimeout(resolve, 180));

    const canvas = await captureModalDialogCanvas(dialog, {
      backgroundColor: activeHintModal === "notice" ? "#855486" : config.captureBg || "#16082a",
      scale: 3,
    });

    // Ensure at least Full HD width pixels for crisp PDF embedding
    let exportCanvas = canvas;
    if (canvas.width < FULL_HD.width) {
      const boosted = document.createElement("canvas");
      const ratio = FULL_HD.width / canvas.width;
      boosted.width = FULL_HD.width;
      boosted.height = Math.round(canvas.height * ratio);
      const ctx = boosted.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(canvas, 0, 0, boosted.width, boosted.height);
        exportCanvas = boosted;
      }
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    await buildHdPdfFromCanvas(exportCanvas, `${config.filePrefix}-fullhd-${timestamp}.pdf`);
    showToast(`${config.toastLabel} Full HD PDF downloaded.`, "success");
  } catch (error) {
    console.error(error);
    showToast("Unable to download Full HD PDF.", "error");
  } finally {
    cleanupCaptureSurface(dialog);
    document.body.classList.remove("is-capture-hd");
    trigger?.classList.remove("is-busy");
    trigger?.setAttribute("aria-busy", "false");
    trigger?.setAttribute("title", previousTitle);
  }
}

function printNoticeDocument() {
  // Kept as fallback: browser print dialog
  if (activeHintModal !== "notice") {
    showToast("Open Notice first to print.", "error");
    return;
  }

  const dialog = document.getElementById("noticeDialog");
  if (!dialog) return;

  prepareCaptureSurface(dialog);
  document.body.classList.add("is-printing-notice");

  const cleanup = () => {
    cleanupCaptureSurface(dialog);
    document.body.classList.remove("is-printing-notice");
    window.removeEventListener("afterprint", cleanup);
  };

  window.addEventListener("afterprint", cleanup);
  window.setTimeout(() => window.print(), 80);
}

function applyDashboardTheme(type) {
  const dashboard = document.getElementById("dashboardScreen");
  if (!dashboard) return;
  dashboard.classList.remove(
    "capture-theme-large",
    "capture-theme-reputation",
    "capture-theme-notice"
  );
  const theme = getHintConfig(type).captureTheme || type || "large";
  dashboard.classList.add(`capture-theme-${theme}`);
}

function clearDashboardTheme() {
  document.getElementById("dashboardScreen")?.classList.remove(
    "capture-theme-large",
    "capture-theme-reputation",
    "capture-theme-notice"
  );
}

function setModalHomeVisible(show) {
  document.body.classList.toggle("modal-home-visible", !!show);
}

function openSystemHintModal(type = "large") {
  const config = getHintConfig(type);
  const modal = document.getElementById(config.modalId);
  if (!modal) return;

  closeAllHintModals(false);

  // Each action opens a different background page on the home dashboard
  applyHomeScene(getCaptureHomeScene(type));
  applyDashboardTheme(type);
  setModalHomeVisible(true);

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  activeHintModal = type;
  toggleModalScreenshotBar(true, type);

  if (type === "notice") {
    const stamp = document.getElementById("noticeStampTime");
    const noticeLogo = document.querySelector(".notice-emblem-icon");
    if (stamp) stamp.textContent = formatNoticeStamp(new Date());
    if (noticeLogo && window.WINK_NOTICE_ICON_SRC) noticeLogo.src = window.WINK_NOTICE_ICON_SRC;
    normalizeNoticeParagraphs(document.getElementById("noticeBodyEditor"));
  }
}

function closeHintModal(type) {
  const config = getHintConfig(type);
  const modal = document.getElementById(config.modalId);
  if (!modal) return;

  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  saveHintContent(type);

  if (activeHintModal === type) activeHintModal = null;
  if (!activeHintModal) {
    toggleModalScreenshotBar(false, null);
    setModalHomeVisible(false);
    clearDashboardTheme();
  }
}

function closeAllHintModals(save = true) {
  ["large", "reputation", "notice"].forEach((type) => {
    const config = getHintConfig(type);
    const modal = document.getElementById(config.modalId);
    if (!modal) return;
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    if (save) saveHintContent(type);
  });
  activeHintModal = null;
  toggleModalScreenshotBar(false, null);
  setModalHomeVisible(false);
  clearDashboardTheme();
}

function saveHintContent(type) {
  const config = getHintConfig(type);
  const body = document.getElementById(config.bodyId);
  if (!body) return;
  localStorage.setItem(config.storageKey, body.innerHTML);
}

function loadHintContent(type) {
  const config = getHintConfig(type);
  const body = document.getElementById(config.bodyId);
  const saved = localStorage.getItem(config.storageKey);
  if (body && saved) body.innerHTML = saved;
}

function normalizeNoticeParagraphs(editor) {
  if (!editor) return;

  Array.from(editor.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? "";
      if (!text.trim()) {
        node.remove();
        return;
      }
      const p = document.createElement("p");
      p.className = "notice-line";
      p.textContent = text;
      editor.replaceChild(p, node);
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node;

    if (el.tagName === "DIV" || el.tagName === "SPAN") {
      const p = document.createElement("p");
      p.className = "notice-line";
      p.innerHTML = el.innerHTML || "<br>";
      editor.replaceChild(p, el);
      return;
    }

    if (el.tagName === "BR") {
      const p = document.createElement("p");
      p.className = "notice-line";
      p.innerHTML = "<br>";
      editor.replaceChild(p, el);
      return;
    }

    if (el.tagName === "P" && !el.classList.contains("notice-line")) {
      el.classList.add("notice-line");
    }
  });

  if (!editor.querySelector("p")) {
    const p = document.createElement("p");
    p.className = "notice-line";
    p.innerHTML = "<br>";
    editor.appendChild(p);
  }
}

function insertNoticeParagraph() {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return false;

  const range = selection.getRangeAt(0);
  range.deleteContents();

  let block = range.startContainer;
  if (block.nodeType === Node.TEXT_NODE) block = block.parentElement;
  while (block && block !== document.body) {
    if (block.nodeType === Node.ELEMENT_NODE && block.tagName === "P") break;
    block = block.parentElement;
  }

  const editor = document.getElementById("noticeBodyEditor");
  if (!editor || !block || !editor.contains(block)) {
    document.execCommand("insertParagraph", false);
    return true;
  }

  const current = block;
  const newP = document.createElement("p");
  newP.className = "notice-line";
  newP.innerHTML = "<br>";

  const afterRange = document.createRange();
  afterRange.setStart(range.startContainer, range.startOffset);
  afterRange.setEnd(current, current.childNodes.length);
  const trailing = afterRange.extractContents();
  if (trailing.textContent?.trim() || trailing.querySelector?.("img,strong,em,b,i,u")) {
    newP.innerHTML = "";
    newP.appendChild(trailing);
  }

  if (!current.textContent?.trim() && !current.querySelector("img")) {
    current.innerHTML = "<br>";
  }

  current.after(newP);

  const nextRange = document.createRange();
  nextRange.setStart(newP, 0);
  nextRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(nextRange);
  return true;
}

function initNoticeFreeEditor() {
  const editor = document.getElementById("noticeBodyEditor");
  if (!editor) return;

  editor.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
    event.preventDefault();
    insertNoticeParagraph();
    saveHintContent("notice");
  });

  editor.addEventListener("paste", (event) => {
    event.preventDefault();
    const text = event.clipboardData?.getData("text/plain") || "";
    const lines = text.replace(/\r\n/g, "\n").split("\n");
    const html = lines
      .map((line) => `<p class="notice-line">${line ? line.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "<br>"}</p>`)
      .join("");
    document.execCommand("insertHTML", false, html || '<p class="notice-line"><br></p>');
    normalizeNoticeParagraphs(editor);
    saveHintContent("notice");
  });

  editor.addEventListener("input", () => {
    saveHintContent("notice");
  });

  editor.addEventListener("blur", () => {
    normalizeNoticeParagraphs(editor);
    saveHintContent("notice");
  });
}

function initSystemHintModal() {
  loadHintContent("large");
  loadHintContent("reputation");
  loadHintContent("notice");
  normalizeNoticeParagraphs(document.getElementById("noticeBodyEditor"));
  initNoticeFreeEditor();

  document.getElementById("largeAmountBtn")?.addEventListener("click", () => {
    openSystemHintModal("large");
  });

  document.getElementById("reputationPointsBtn")?.addEventListener("click", () => {
    openSystemHintModal("reputation");
  });

  document.getElementById("noticeBtn")?.addEventListener("click", () => {
    openSystemHintModal("notice");
  });

  document.getElementById("systemHintOkBtn")?.addEventListener("click", () => {
    closeHintModal("large");
  });

  document.getElementById("reputationHintOkBtn")?.addEventListener("click", () => {
    closeHintModal("reputation");
  });

  document.getElementById("noticeBackdrop")?.addEventListener("click", () => {
    closeHintModal("notice");
  });

  document.getElementById("modalCloseTopBtn")?.addEventListener("click", () => {
    closeActiveHintModal();
  });

  document.getElementById("modalScreenshotBtn")?.addEventListener("click", (event) => {
    captureDashboardScreenshot(event.currentTarget);
  });

  document.getElementById("modalPrintBtn")?.addEventListener("click", (event) => {
    downloadModalHdPdf(event.currentTarget);
  });

  document.getElementById("systemHintBackdrop")?.addEventListener("click", () => {
    closeHintModal("large");
  });

  document.getElementById("reputationHintBackdrop")?.addEventListener("click", () => {
    closeHintModal("reputation");
  });

  document.getElementById("systemHintBody")?.addEventListener("input", () => {
    saveHintContent("large");
  });

  document.getElementById("reputationHintBody")?.addEventListener("input", () => {
    saveHintContent("reputation");
  });

  document.getElementById("noticeInner")?.addEventListener("input", () => {
    saveHintContent("notice");
  });
}

function switchMainView(view = "dashboard") {
  const dashboard = document.getElementById("dashboardView");
  const credit = document.getElementById("creditScoreView");
  const homeBtn = document.getElementById("sidebarHomeBtn");
  const profileBtn = document.getElementById("sidebarProfileBtn");
  const isCredit = view === "credit";

  dashboard?.classList.toggle("hidden", isCredit);
  credit?.classList.toggle("hidden", !isCredit);
  homeBtn?.classList.toggle("active", !isCredit);
  profileBtn?.classList.toggle("active", isCredit);
}

function initSidebarNavigation() {
  document.getElementById("sidebarHomeBtn")?.addEventListener("click", () => {
    switchMainView("dashboard");
    applyHomeScene(getCaptureHomeScene("payment"));
    document.querySelectorAll(".side-nav .side-item").forEach((item) => item.classList.remove("active"));
    document.getElementById("sidebarHomeBtn")?.classList.add("active");
  });

  document.getElementById("sidebarProfileBtn")?.addEventListener("click", () => {
    switchMainView("credit");
    document.querySelectorAll(".side-nav .side-item").forEach((item) => item.classList.remove("active"));
    document.getElementById("sidebarProfileBtn")?.classList.add("active");
  });

  document.querySelectorAll(".side-nav .side-item").forEach((btn) => {
    if (btn.id === "sidebarHomeBtn" || btn.id === "sidebarProfileBtn") return;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".side-nav .side-item").forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");
      switchMainView("dashboard");
      const label = btn.getAttribute("aria-label") || "Section";
      showToast(`${label} opened.`, "success");
    });
  });
}

function renderWithdrawals(rows) {
  const tableBody = document.getElementById("withdrawTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = rows
    .map(
      (row) => `
      <tr>
        <td><span class="cell-user">${row.user}</span></td>
        <td><span class="cell-order">${row.orderNo}</span></td>
        <td><span class="cell-amount">${row.amount}</span></td>
        <td><span class="cell-amount cell-amount-soft">${row.actual}</span></td>
        <td><span class="cell-fee">${row.fee}</span></td>
        <td><span class="cell-name">${row.name}</span></td>
        <td><span class="cell-account">${row.accountNo}</span></td>
        <td><span class="pill pill-discount">${row.discount}</span></td>
        <td><span class="pill pill-status">${row.status}</span></td>
        <td><span class="cell-operator">${row.operator}</span></td>
      </tr>
    `
    )
    .join("");
}

function applySearchFilter() {
  const q = (document.getElementById("orderSearch")?.value || "").trim().toLowerCase();
  if (!q) return renderWithdrawals(withdrawals);

  const filtered = withdrawals.filter((row) => {
    const haystack = `${row.user} ${row.orderNo} ${row.name} ${row.operator}`.toLowerCase();
    return haystack.includes(q);
  });
  renderWithdrawals(filtered);
}

function setLoggedIn(loggedIn) {
  const loginScreen = document.getElementById("loginScreen");
  const dashboardScreen = document.getElementById("dashboardScreen");
  if (loginScreen && dashboardScreen) {
    loginScreen.classList.toggle("hidden", loggedIn);
    dashboardScreen.classList.toggle("hidden", !loggedIn);
  }
  if (loggedIn) sessionStorage.setItem("loggedIn", "1");
  else sessionStorage.removeItem("loggedIn");
}

function startDashboard() {
  // Prevent duplicate listeners/intervals on re-login.
  if (window.__dashboardStarted) return;
  window.__dashboardStarted = true;

  // Time display
  const updateTime = () => {
    const el = document.getElementById("currentTime");
    if (el) el.textContent = formatTime(new Date());
  };
  updateTime();
  setInterval(updateTime, 1000);

  // Default hint text (mock)
  const hintUser = document.getElementById("hintUser");
  const hintAmount = document.getElementById("hintAmount");
  if (hintUser) hintUser.textContent = "DQ199305";
  if (hintAmount) hintAmount.textContent = "144,427 rupees";

  // Metrics most recent values (mock)
  const mostRecentPayment = document.getElementById("mostRecentPayment");
  const mostRecentDeposit = document.getElementById("mostRecentDeposit");
  if (mostRecentPayment) mostRecentPayment.textContent = "712,680.00";
  if (mostRecentDeposit) mostRecentDeposit.textContent = "45,000.00";

  // Initial table render
  renderWithdrawals(withdrawals);

  // Search
  document.getElementById("orderSearch")?.addEventListener("input", () => {
    applySearchFilter();
  });

  // Refresh button (mock refresh)
  document.getElementById("refreshBtn")?.addEventListener("click", () => {
    const shouldAuto = !!document.getElementById("chkAutoRefresh")?.checked;
    if (!shouldAuto) {
      // still update UI once
    }
    applySearchFilter();
  });

  // Reset controls (mock)
  document.getElementById("resetBtn")?.addEventListener("click", () => {
    const chkIsAdmin = document.getElementById("chkIsAdmin");
    const chkBindPhone = document.getElementById("chkBindPhone");
    const chkAutoRefresh = document.getElementById("chkAutoRefresh");
    const chkOnTone = document.getElementById("chkOnTone");
    if (chkIsAdmin) chkIsAdmin.checked = true;
    if (chkBindPhone) chkBindPhone.checked = true;
    if (chkAutoRefresh) chkAutoRefresh.checked = true;
    if (chkOnTone) chkOnTone.checked = false;
    applySearchFilter();
  });

  // Export Excel file (mock download)
  document.getElementById("exportBtn")?.addEventListener("click", () => {
    const rows = withdrawals;
    const csv = [
      "User Account,Order No.,Withdrawal Amount,Actual Payment,Withdraw Service Fee,Name,Deposit Account No.,Discount Deduction,Status,Operator",
      ...rows.map((r) =>
        [
          r.user,
          r.orderNo,
          r.amount,
          r.actual,
          r.fee,
          r.name,
          r.accountNo,
          r.discount,
          r.status,
          r.operator,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "withdraw_records_demo.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  // Logout
  const logoutModal = document.getElementById("logoutConfirmModal");
  const openLogoutConfirm = () => {
    if (!logoutModal) return;
    logoutModal.classList.remove("hidden");
    logoutModal.setAttribute("aria-hidden", "false");
  };
  const closeLogoutConfirm = () => {
    if (!logoutModal) return;
    logoutModal.classList.add("hidden");
    logoutModal.setAttribute("aria-hidden", "true");
  };

  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    openLogoutConfirm();
  });

  document.getElementById("logoutConfirmCancel")?.addEventListener("click", () => {
    closeLogoutConfirm();
  });

  document.getElementById("logoutConfirmBackdrop")?.addEventListener("click", () => {
    closeLogoutConfirm();
  });

  document.getElementById("logoutConfirmOk")?.addEventListener("click", () => {
    closeLogoutConfirm();
    closeAllHintModals(false);
    setLoggedIn(false);
    cleanUrl();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && logoutModal && !logoutModal.classList.contains("hidden")) {
      closeLogoutConfirm();
    }
  });

  document.getElementById("screenshotBtn")?.addEventListener("click", () => {
    captureDashboardScreenshot();
  });

  initSystemHintModal();
  initSidebarNavigation();

  // Tabs — each opens a different home page section
  document.querySelectorAll(".tabs-row .tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-tab") || "payment";
      applyHomeScene(getCaptureHomeScene(tab));
      showToast(`${btn.textContent.replace("×", "").trim()} opened.`, "success");
    });
  });

  // Feature chips — all clickable
  document.querySelectorAll(".feature-chips .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".feature-chips .chip").forEach((c) => {
        c.classList.remove("is-active", "chip-primary");
      });
      chip.classList.add("is-active", "chip-primary");
      showToast(`${chip.textContent.trim()} selected.`, "success");
    });
  });
}

function startLogin() {
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");
  const passwordInput = document.getElementById("password");
  const usernameInput = document.getElementById("username");
  const togglePassword = document.getElementById("togglePassword");
  const togglePasswordIcon = document.getElementById("togglePasswordIcon");
  const toggleUsername = document.getElementById("toggleUsername");
  const toggleUsernameIcon = document.getElementById("toggleUsernameIcon");
  const loginLogo = document.getElementById("loginLogo");
  const sidebarLogo = document.getElementById("sidebarLogo");
  const topbarLogo = document.getElementById("topbarLogo");
  const noticeLogo = document.querySelector(".notice-emblem-icon");

  if (window.WINK_LOGO_SRC) {
    if (loginLogo) loginLogo.src = window.WINK_LOGO_SRC;
    if (sidebarLogo) sidebarLogo.src = window.WINK_LOGO_SRC;
    if (topbarLogo) topbarLogo.src = window.WINK_LOGO_SRC;
  }
  if (window.WINK_NOTICE_ICON_SRC && noticeLogo) {
    noticeLogo.src = window.WINK_NOTICE_ICON_SRC;
  }

  toggleUsername?.addEventListener("click", () => {
    if (!usernameInput) return;
    const shouldShow = usernameInput.type === "password";
    // If currently masked, show it; otherwise hide it.
    usernameInput.type = shouldShow ? "text" : "password";
    toggleUsername.setAttribute("aria-pressed", shouldShow ? "true" : "false");
    toggleUsername.setAttribute("aria-label", shouldShow ? "Hide username" : "Show username");
    if (toggleUsernameIcon) {
      toggleUsernameIcon.textContent = shouldShow ? "Hide" : "Show";
    }
  });

  togglePassword?.addEventListener("click", () => {
    if (!passwordInput) return;
    const shouldShow = passwordInput.type === "password";
    passwordInput.type = shouldShow ? "text" : "password";
    togglePassword.setAttribute("aria-pressed", shouldShow ? "true" : "false");
    togglePassword.setAttribute("aria-label", shouldShow ? "Hide password" : "Show password");
    if (togglePasswordIcon) {
      togglePasswordIcon.textContent = shouldShow ? "Hide" : "Show";
    }
  });

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const u = document.getElementById("username")?.value || "";
    const p = document.getElementById("password")?.value || "";

    const ok = u === FIXED_CREDENTIALS.username && p === FIXED_CREDENTIALS.password;
    if (!ok) {
      if (loginError) {
        loginError.hidden = false;
        loginError.textContent = "Invalid username or password.";
      }
      return;
    }

    setLoggedIn(true);
    cleanUrl();
    startDashboard();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cleanUrl();

  const loggedIn = sessionStorage.getItem("loggedIn") === "1";
  startLogin();
  if (loggedIn) {
    setLoggedIn(true);
    startDashboard();
  }
});
