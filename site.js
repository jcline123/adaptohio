(() => {
  const pages = [
    ["first-steps.html", "First Steps"],
    ["school.html", "School & Education"],
    ["sports.html", "Sports & Activities"],
    ["groups.html", "Groups & Community"],
    ["playgrounds.html", "Accessible Playgrounds"],
    ["camps.html", "Camps & Programs"],
    ["vacations.html", "Travel & Vacations"],
    ["representation.html", "Movies, TV & Public Figures"],
    ["toys-and-clothing.html", "Toys & Dolls"],
    ["clothing.html", "Clothing"],
    ["prosthetics.html", "Prosthetics & Equipment"],
    ["care-teams.html", "Care Teams & Providers"],
    ["books.html", "Books About Disability & Differences"],
    ["resources.html", "Support & Community Resources"],
    ["surgery.html", "Surgery Journey"]
  ];

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    const relationships = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
    relationships.add("noopener");
    relationships.add("noreferrer");
    link.setAttribute("rel", Array.from(relationships).join(" "));

    if (!link.querySelector(".visually-hidden")) {
      const notice = document.createElement("span");
      notice.className = "visually-hidden";
      notice.textContent = " (opens in a new tab)";
      link.append(notice);
    }
  });

  document.querySelectorAll("[data-site-navigation]").forEach((navigation) => {
    navigation.replaceChildren();

    const home = document.createElement("a");
    home.className = "site-footer-nav__home";
    home.href = "index.html";
    home.textContent = "Adapt Ohio";
    navigation.append(home);

    const links = document.createElement("div");
    links.className = "site-footer-nav__links";

    pages.forEach(([href, label]) => {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      if (href === currentPage) {
        link.setAttribute("aria-current", "page");
      }
      links.append(link);
    });

    navigation.append(links);
  });

  const main = document.querySelector("main.container");
  if (!main) return;

  const tocMode = main.getAttribute("data-toc");
  const sectionHeadings = Array.from(main.querySelectorAll("h2"));
  const groupedToc = tocMode === "grouped";
  const tocHeadings = groupedToc
    ? Array.from(main.querySelectorAll("h2, h3, h4"))
    : sectionHeadings;

  const assignHeadingId = (heading, index, usedIds) => {
    let id = heading.id || heading.textContent
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || `section-${index + 1}`;

    const baseId = id;
    let suffix = 2;
    while (usedIds.has(id) || (document.getElementById(id) && document.getElementById(id) !== heading)) {
      id = `${baseId}-${suffix}`;
      suffix += 1;
    }
    heading.id = id;
    usedIds.add(id);
    return id;
  };

  const createTocLinkItem = (heading, index, usedIds) => {
    const id = assignHeadingId(heading, index, usedIds);
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${id}`;
    link.textContent = heading.textContent.trim();
    item.append(link);
    return item;
  };

  const buildFlatTocList = (headings, usedIds) => {
    const list = document.createElement("ol");
    headings.forEach((heading, index) => {
      list.append(createTocLinkItem(heading, index, usedIds));
    });
    return list;
  };

  const buildGroupedTocList = (headings, usedIds) => {
    const root = document.createElement("ol");
    let h2List = null;
    let h3List = null;

    headings.forEach((heading, index) => {
      const level = Number(heading.tagName.slice(1));
      const item = createTocLinkItem(heading, index, usedIds);

      if (level === 2) {
        root.append(item);
        h2List = document.createElement("ol");
        item.append(h2List);
        h3List = null;
        return;
      }

      if (level === 3) {
        const parent = h2List || root;
        parent.append(item);
        h3List = document.createElement("ol");
        item.append(h3List);
        return;
      }

      (h3List || h2List || root).append(item);
    });

    root.querySelectorAll("ol").forEach((list) => {
      if (!list.children.length) list.remove();
    });

    return root;
  };

  if (groupedToc || sectionHeadings.length >= 6) {
    const usedIds = new Set();
    const tableOfContents = document.createElement("details");
    tableOfContents.className = groupedToc ? "page-toc page-toc--grouped" : "page-toc";

    const summary = document.createElement("summary");
    summary.textContent = "On this page";
    tableOfContents.append(summary);
    tableOfContents.append(
      groupedToc
        ? buildGroupedTocList(tocHeadings, usedIds)
        : buildFlatTocList(tocHeadings, usedIds)
    );

    const backButton = main.querySelector(".back-button");
    if (backButton) {
      backButton.insertAdjacentElement("afterend", tableOfContents);
    } else {
      main.prepend(tableOfContents);
    }
  }

  if (sectionHeadings.length >= 6 || document.documentElement.scrollHeight > 1800) {
    const backToTop = document.createElement("a");
    backToTop.className = "back-to-top";
    backToTop.href = "#top";
    backToTop.setAttribute("aria-label", "Back to top");
    backToTop.textContent = "↑";
    document.body.append(backToTop);
  }

  const ambientVideos = Array.from(document.querySelectorAll("video[autoplay][muted][loop]"));
  if (ambientVideos.length && "IntersectionObserver" in window) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const visibility = new WeakMap();

    const updatePlayback = (video) => {
      if (reducedMotion.matches || document.hidden || !visibility.get(video)) {
        video.pause();
        return;
      }
      video.play().catch(() => {});
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        visibility.set(entry.target, entry.isIntersecting);
        updatePlayback(entry.target);
      });
    }, { rootMargin: "120px 0px" });

    ambientVideos.forEach((video) => {
      video.muted = true;
      visibility.set(video, false);
      observer.observe(video);
      if (reducedMotion.matches) video.pause();
    });

    const updateAllVideos = () => ambientVideos.forEach(updatePlayback);
    reducedMotion.addEventListener?.("change", updateAllVideos);
    document.addEventListener("visibilitychange", updateAllVideos);
  }
})();
