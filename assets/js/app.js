/* TRIXX front-end behaviour.
   Vanilla ES2020, no dependencies. Every feature degrades to usable HTML when
   JavaScript is unavailable: forms still submit, listings still render, links
   still work. */

(function () {
  'use strict';

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const money = (n) => 'KES ' + Math.round(n).toLocaleString('en-KE');
  const shortMoney = (n) => {
    if (n >= 1e9) return `KES ${(n / 1e9).toFixed(1)}B`;
    if (n >= 1e6) return `KES ${(n / 1e6).toFixed(1)}M`;
    if (n >= 1e3) return `KES ${(n / 1e3).toFixed(0)}K`;
    return money(n);
  };

  /* ---------- storage (namespaced, fails soft in private mode) ---------- */

  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(`trixx.${key}`);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (err) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(`trixx.${key}`, JSON.stringify(value));
      } catch (err) { /* storage unavailable; features stay in-memory only */ }
    },
  };

  /* ---------- reveal on scroll ---------- */

  function initReveal() {
    const targets = $$('.section-head, .grid > .card, .grid > .stat, .grid > .panel, .app-card, .app-showcase, .pkg-card, .design-slideshow, .inspiration-card, .product-visual, .technology-gallery figure, .brand-material-card, .searchbar');
    if (!targets.length) return;
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('reveal', 'is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    targets.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', `${Math.min(i % 6, 5) * 55}ms`);
      io.observe(el);
    });
  }

  /* ---------- architectural concept slideshows ---------- */

  function initSlideshows() {
    $$('[data-slideshow]').forEach((slideshow) => {
      const slides = $$('[data-slide]', slideshow);
      if (slides.length < 2) return;

      const dots = $$('[data-slide-go]', slideshow);
      const status = $('[data-slideshow-status]', slideshow);
      const toggle = $('[data-slideshow-toggle]', slideshow);
      const current = $('[data-slideshow-current]', slideshow);
      const interval = Number(slideshow.dataset.interval) || 6500;
      slideshow.style.setProperty('--slide-interval', `${interval}ms`);
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      let index = Math.max(0, slides.findIndex((slide) => !slide.hidden));
      let paused = reducedMotion.matches;
      let timer = null;

      const setToggle = () => {
        if (!toggle) return;
        const label = paused ? toggle.dataset.playLabel : toggle.dataset.pauseLabel;
        toggle.textContent = label;
        toggle.setAttribute('aria-label', paused ? slideshow.dataset.startLabel : slideshow.dataset.stopLabel);
      };

      const show = (next, announce) => {
        index = (next + slides.length) % slides.length;
        slides.forEach((slide, i) => {
          slide.hidden = i !== index;
          slide.classList.toggle('is-active', i === index);
          slide.setAttribute('aria-hidden', String(i !== index));
        });
        dots.forEach((dot, i) => {
          dot.classList.toggle('is-active', i === index);
          dot.setAttribute('aria-pressed', String(i === index));
        });
        if (current) current.textContent = String(index + 1).padStart(2, '0');
        if (announce && status) status.textContent = `${slideshow.dataset.slideNoun} ${index + 1} / ${slides.length}: ${slides[index].dataset.label}`;
      };

      const stopTimer = () => {
        if (timer !== null) window.clearTimeout(timer);
        timer = null;
        slideshow.classList.remove('is-timing');
      };

      const schedule = () => {
        stopTimer();
        if (paused || document.hidden || slideshow.matches(':hover') || slideshow.contains(document.activeElement)) return;
        // Restart the progress bar on the active dot so it tracks the timer.
        void slideshow.offsetWidth;
        slideshow.classList.add('is-timing');
        timer = window.setTimeout(() => {
          show(index + 1, false);
          schedule();
        }, interval);
      };

      const move = (delta) => {
        show(index + delta, true);
        schedule();
      };

      $('[data-slideshow-prev]', slideshow)?.addEventListener('click', () => move(-1));
      $('[data-slideshow-next]', slideshow)?.addEventListener('click', () => move(1));
      dots.forEach((dot) => dot.addEventListener('click', () => {
        show(Number(dot.dataset.slideGo), true);
        schedule();
      }));
      toggle?.addEventListener('click', () => {
        paused = !paused;
        setToggle();
        schedule();
      });

      slideshow.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          move(event.key === 'ArrowLeft' ? -1 : 1);
        }
      });
      slideshow.addEventListener('mouseenter', stopTimer);
      slideshow.addEventListener('mouseleave', schedule);
      slideshow.addEventListener('focusin', stopTimer);
      slideshow.addEventListener('focusout', schedule);
      document.addEventListener('visibilitychange', schedule);
      reducedMotion.addEventListener?.('change', (event) => {
        if (event.matches) {
          paused = true;
          setToggle();
        }
        schedule();
      });

      setToggle();
      schedule();
    });
  }

  /* ---------- homepage hero crossfade ---------- */

  function initHeroSlides() {
    $$('[data-hero-slides]').forEach((root) => {
      const images = $$('img', root);
      if (images.length < 2) return;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      let index = 0;
      window.setInterval(() => {
        if (document.hidden || reducedMotion.matches) return;
        const prev = images[index];
        index = (index + 1) % images.length;
        const next = images[index];
        prev.classList.remove('is-active');
        prev.setAttribute('aria-hidden', 'true');
        next.classList.add('is-active');
        next.removeAttribute('aria-hidden');
      }, 5500);
    });
  }

  /* ---------- count-up for headline figures ---------- */

  function initCountUp() {
    const values = $$('.stat__value').filter((el) => /\d/.test(el.textContent));
    if (!values.length || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const run = (el) => {
      const text = el.textContent;
      const match = text.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/);
      if (!match) return;
      const [, prefix, raw, suffix] = match;
      const target = parseFloat(raw.replace(/,/g, ''));
      const decimals = (raw.split('.')[1] || '').length;
      const grouped = raw.includes(',');
      const format = (n) => {
        const fixed = n.toFixed(decimals);
        return grouped ? Number(fixed).toLocaleString('en-KE', { minimumFractionDigits: decimals }) : fixed;
      };
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = `${prefix}${format(target * eased)}${suffix}`;
        if (p < 1) window.requestAnimationFrame(tick);
        else el.textContent = text;
      };
      window.requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          io.unobserve(entry.target);
          run(entry.target);
        }
      });
    }, { threshold: 0.6 });
    values.forEach((el) => io.observe(el));
  }

  /* ---------- accessible floor-plan enlargement ---------- */

  function initFloorPlanDialog() {
    const dialog = $('[data-plan-dialog]');
    if (!dialog) return;
    const title = $('[data-plan-dialog-title]', dialog);
    const drawing = $('[data-plan-dialog-drawing]', dialog);

    $$('[data-plan-open]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const card = document.getElementById(link.hash.slice(1));
        const svg = card && $('.card__media--plan svg', card);
        if (!svg) return;
        if (typeof dialog.showModal !== 'function') return;
        event.preventDefault();
        title.textContent = card.dataset.planTitle || 'Concept floor plan';
        drawing.replaceChildren(svg.cloneNode(true));
        dialog.showModal();
      });
    });

    $('[data-plan-dialog-close]', dialog)?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && dialog.open) {
        event.preventDefault();
        dialog.close();
      }
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  /* ---------- scroll progress ---------- */

  function initProgress() {
    const bar = $('[data-progress]');
    if (!bar) return;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = max > 0 ? `${Math.min(100, (window.scrollY / max) * 100)}%` : '0%';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ---------- mobile drawer ---------- */

  function initDrawer() {
    const drawer = $('[data-drawer-open]') && $('#drawer');
    if (!drawer) return;
    const openers = $$('[data-drawer-open]');
    const closers = $$('[data-drawer-close]');
    let lastFocus = null;

    const open = () => {
      lastFocus = document.activeElement;
      drawer.dataset.open = 'true';
      openers.forEach((b) => b.setAttribute('aria-expanded', 'true'));
      document.body.style.overflow = 'hidden';
      const first = drawer.querySelector('a, button');
      if (first) first.focus();
    };

    const close = () => {
      drawer.dataset.open = 'false';
      openers.forEach((b) => b.setAttribute('aria-expanded', 'false'));
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };

    openers.forEach((b) => b.addEventListener('click', open));
    closers.forEach((b) => b.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (drawer.dataset.open !== 'true') return;
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = $$('a[href], button:not([disabled])', drawer);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ---------- forms (client-side confirmation, no backend in this build) ---------- */

  function initForms() {
    $$('form[data-form]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        const msg = form.parentElement.querySelector('[data-form-msg]')
          || form.querySelector('[data-form-msg]');
        if (msg) {
          msg.hidden = false;
          msg.textContent = form.dataset.form === 'newsletter'
            ? 'Thank you. You are on the list.'
            : 'Thank you. We have your details and will reply within one working day.';
        }
        form.reset();
      });
    });

    // Chat widget on listing pages.
    $$('[data-chat]').forEach((chat) => {
      const form = $('[data-chat-form]', chat);
      const input = $('[data-chat-input]', chat);
      const log = $('[data-chat-log]', chat);
      if (!form) return;

      const replies = [
        'Thanks — let me check the build record and come back to you.',
        'Yes, that is available. Would a viewing on Saturday morning work?',
        'The smart tier is already commissioned, so it is live from handover.',
        'I can send the floor plan and the service schedule by email today.',
      ];
      let replyIndex = 0;

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = (input.value || '').trim();
        if (!text) return;
        const now = new Date();
        const stamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const mine = document.createElement('div');
        mine.className = 'bubble bubble--me';
        mine.textContent = text;
        const time = document.createElement('time');
        time.textContent = stamp;
        mine.appendChild(time);
        log.appendChild(mine);
        input.value = '';
        log.scrollTop = log.scrollHeight;

        window.setTimeout(() => {
          const reply = document.createElement('div');
          reply.className = 'bubble bubble--them';
          reply.textContent = replies[replyIndex % replies.length];
          replyIndex += 1;
          log.appendChild(reply);
          log.scrollTop = log.scrollHeight;
        }, 900);
      });
    });
  }

  /* ---------- search: filtering, sorting, view toggle, save, favorites ---------- */

  function initSearch() {
    const form = $('[data-search-form][data-live="true"]');
    if (!form) {
      initFavoritesAndCompare();
      return;
    }

    const grid = $('[data-results-grid]');
    const cards = $$('[data-listing-card]', grid);
    const count = $('[data-results-count]');
    const empty = $('[data-empty-state]');
    const mapPanel = $('[data-view-panel="map"]');
    const sortSelect = $('[data-sort]');
    let sourceFilter = 'all';

    const readCard = (card) => ({
      purpose: card.dataset.purpose,
      county: card.dataset.county,
      style: card.dataset.style,
      tier: card.dataset.tier,
      price: Number(card.dataset.price),
      bedrooms: Number(card.dataset.bedrooms),
      source: card.dataset.source,
      el: card,
    });

    const apply = () => {
      const data = new FormData(form);
      const purpose = data.get('purpose') || '';
      const county = data.get('county') || '';
      const style = data.get('style') || '';
      const tier = data.get('tier') || '';
      const bedrooms = Number(data.get('bedrooms') || 0);
      const min = Number(data.get('min') || 0);
      const max = Number(data.get('max') || 0);

      let visible = 0;
      cards.forEach((card) => {
        const c = readCard(card);
        let show = true;
        if (purpose && c.purpose !== purpose) show = false;
        if (county && c.county !== county) show = false;
        if (style && c.style !== style) show = false;
        if (tier && c.tier !== tier) show = false;
        if (bedrooms && c.bedrooms < bedrooms) show = false;
        if (min && c.price < min) show = false;
        if (max && c.price > max) show = false;
        if (sourceFilter === 'trixx' && c.source !== 'trixx') show = false;
        if (sourceFilter === 'owner' && c.source !== 'owner') show = false;
        if (sourceFilter === 'verified' && card.querySelector('.badge--verified') === null) show = false;
        card.hidden = !show;
        if (show) visible += 1;
      });

      if (count) count.textContent = `${visible} properties found`;
      if (empty) empty.hidden = visible !== 0;
      updateMapVisibility();
    };

    const sortCards = () => {
      const mode = sortSelect ? sortSelect.value : 'new';
      const sorted = cards.slice().sort((a, b) => {
        const ca = readCard(a);
        const cb = readCard(b);
        if (mode === 'price-asc') return ca.price - cb.price;
        if (mode === 'price-desc') return cb.price - ca.price;
        if (mode === 'beds') return cb.bedrooms - ca.bedrooms;
        return 0;
      });
      sorted.forEach((card) => grid.appendChild(card));
    };

    const updateMapVisibility = () => {
      const activeView = $('[data-view="map"]');
      const isMap = activeView && activeView.getAttribute('aria-pressed') === 'true';
      if (mapPanel) mapPanel.hidden = !isMap;
      if (grid) grid.hidden = !!isMap;
    };

    form.addEventListener('input', () => {
      apply();
      sortCards();
    });
    form.addEventListener('change', () => {
      apply();
      sortCards();
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      apply();
      sortCards();
    });

    const resetBtn = $('[data-filter-reset]', form);
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        window.setTimeout(() => {
          sourceFilter = 'all';
          $$('[data-source-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.sourceFilter === 'all')));
          apply();
          sortCards();
        }, 0);
      });
    }

    $$('[data-source-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        sourceFilter = btn.dataset.sourceFilter;
        $$('[data-source-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        apply();
      });
    });

    if (sortSelect) sortSelect.addEventListener('change', sortCards);

    $$('[data-view]').forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('[data-view]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        updateMapVisibility();
      });
    });

    // Map pins open the corresponding listing card.
    $$('.map-pin').forEach((pin) => {
      const open = () => {
        const id = pin.dataset.listing;
        const card = grid.querySelector(`[data-listing-card="${id}"]`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.style.outline = '2px solid var(--teal)';
          window.setTimeout(() => { card.style.outline = ''; }, 1600);
        }
      };
      pin.addEventListener('click', open);
      pin.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });

    // Saved searches, kept per browser.
    const saveBtn = $('[data-save-search]');
    const saveMsg = $('[data-save-search-msg]');
    const savedList = $('[data-saved-searches]');
    const savedEmpty = $('[data-saved-empty]');

    const renderSaved = () => {
      const saved = store.get('searches', []);
      if (!savedList) return;
      $$('.chip-row', savedList).forEach((n) => n.remove());
      if (savedEmpty) savedEmpty.hidden = saved.length > 0;
      saved.forEach((entry, i) => {
        const row = document.createElement('div');
        row.className = 'chip-row';
        row.innerHTML = `<span>${entry.label}<span class="chip-row__meta" style="display:block">${entry.count} results</span></span>`;
        const actions = document.createElement('span');
        actions.className = 'cluster';
        const go = document.createElement('a');
        go.className = 'btn btn--outline btn--sm';
        go.href = `?${entry.query}`;
        go.textContent = 'Apply';
        const del = document.createElement('button');
        del.className = 'btn btn--quiet btn--sm';
        del.type = 'button';
        del.textContent = 'Remove';
        del.addEventListener('click', () => {
          const list = store.get('searches', []);
          list.splice(i, 1);
          store.set('searches', list);
          renderSaved();
        });
        actions.append(go, del);
        row.appendChild(actions);
        savedList.appendChild(row);
      });
    };

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const data = new FormData(form);
        const parts = [];
        const labels = [];
        for (const [key, value] of data.entries()) {
          if (value) {
            parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            labels.push(value);
          }
        }
        const query = parts.join('&');
        const saved = store.get('searches', []);
        saved.unshift({
          query,
          label: labels.length ? labels.join(' · ') : 'All properties',
          count: Number((count ? count.textContent : '0').split(' ')[0]) || 0,
        });
        store.set('searches', saved.slice(0, 6));
        renderSaved();
        if (saveMsg) {
          saveMsg.hidden = false;
          saveMsg.textContent = 'Search saved.';
          window.setTimeout(() => { saveMsg.hidden = true; }, 2400);
        }
      });
    }

    renderSaved();
    apply();
    updateMapVisibility();
    initFavoritesAndCompare();
  }

  /* ---------- favorites and comparison ---------- */

  function initFavoritesAndCompare() {
    const favs = store.get('favorites', []);
    const compare = store.get('compare', []);
    const compareBar = $('[data-compare-bar]');
    const compareItems = $('[data-compare-items]');

    const syncFavButtons = () => {
      $$('[data-fav]').forEach((btn) => {
        const on = favs.includes(btn.dataset.fav);
        btn.setAttribute('aria-pressed', String(on));
        if (btn.textContent.trim().startsWith('♡') || btn.textContent.trim().startsWith('♥')) {
          btn.textContent = btn.textContent.replace(/[♡♥]/, on ? '♥' : '♡');
        }
      });
    };

    const renderFavoritesPanel = () => {
      const panel = $('[data-favorites]');
      const emptyMsg = $('[data-favorites-empty]');
      if (!panel) return;
      $$('.chip-row', panel).forEach((n) => n.remove());
      if (emptyMsg) emptyMsg.hidden = favs.length > 0;
      favs.forEach((id) => {
        const card = document.querySelector(`[data-listing-card="${id}"]`);
        const title = card ? (card.querySelector('.card__title a') || {}).textContent : id;
        const row = document.createElement('div');
        row.className = 'chip-row';
        row.innerHTML = `<span>${title || id}<span class="chip-row__meta" style="display:block">${id}</span></span>`;
        const del = document.createElement('button');
        del.className = 'btn btn--quiet btn--sm';
        del.type = 'button';
        del.textContent = 'Remove';
        del.addEventListener('click', () => {
          const list = store.get('favorites', []);
          list.splice(list.indexOf(id), 1);
          store.set('favorites', list);
          favs.length = 0;
          favs.push(...list);
          syncFavButtons();
          renderFavoritesPanel();
        });
        row.appendChild(del);
        panel.appendChild(row);
      });
    };

    const renderCompareBar = () => {
      if (!compareBar || !compareItems) return;
      compareItems.innerHTML = '';
      compare.forEach((id) => {
        const chip = document.createElement('span');
        chip.className = 'compare-bar__chip';
        chip.innerHTML = `<span>${id}</span>`;
        const del = document.createElement('button');
        del.type = 'button';
        del.setAttribute('aria-label', `Remove ${id}`);
        del.textContent = '×';
        del.addEventListener('click', () => {
          const list = store.get('compare', []);
          list.splice(list.indexOf(id), 1);
          store.set('compare', list);
          compare.length = 0;
          compare.push(...list);
          syncCompareButtons();
          renderCompareBar();
          renderComparePage();
        });
        chip.appendChild(del);
        compareItems.appendChild(chip);
      });
      compareBar.dataset.open = String(compare.length > 0);
    };

    const syncCompareButtons = () => {
      $$('[data-compare-add]').forEach((btn) => {
        btn.setAttribute('aria-pressed', String(compare.includes(btn.dataset.compareAdd)));
      });
    };

    $$('[data-fav]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.fav;
        const list = store.get('favorites', []);
        const idx = list.indexOf(id);
        if (idx === -1) list.push(id);
        else list.splice(idx, 1);
        store.set('favorites', list);
        favs.length = 0;
        favs.push(...list);
        syncFavButtons();
        renderFavoritesPanel();
      });
    });

    $$('[data-compare-add]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.compareAdd;
        const list = store.get('compare', []);
        const idx = list.indexOf(id);
        if (idx !== -1) {
          list.splice(idx, 1);
        } else {
          if (list.length >= 3) {
            btn.textContent = 'Max 3';
            window.setTimeout(() => { btn.textContent = 'Compare'; }, 1500);
            return;
          }
          list.push(id);
        }
        store.set('compare', list);
        compare.length = 0;
        compare.push(...list);
        syncCompareButtons();
        renderCompareBar();
        renderComparePage();
      });
    });

    const clearBtn = $('[data-compare-clear]');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        store.set('compare', []);
        compare.length = 0;
        syncCompareButtons();
        renderCompareBar();
        renderComparePage();
      });
    }

    /* On the compare page, replace the static presets with the user's picks. */
    function renderComparePage() {
      const root = $('[data-compare-root]');
      if (!root) return;
      const grid = $('[data-compare-grid]', root);
      const blank = $('[data-compare-blank]', root);
      const cols = $$('[data-compare-col]', grid);

      if (!compare.length) {
        cols.forEach((col) => { col.hidden = true; });
        if (blank) blank.hidden = false;
        return;
      }
      if (blank) blank.hidden = true;
      cols.forEach((col) => {
        col.hidden = !compare.includes(col.dataset.compareCol);
      });
      // Keep the visible order matching the selection order.
      const visible = compare
        .map((id) => grid.querySelector(`[data-compare-col="${id}"]`))
        .filter(Boolean);
      visible.forEach((col) => grid.appendChild(col));
      // A pick with no static column yet gets one built from the card on the page.
      compare.forEach((id) => {
        if (!grid.querySelector(`[data-compare-col="${id}"]`)) {
          const card = document.querySelector(`[data-listing-card="${id}"]`);
          if (!card) return;
          const col = document.createElement('div');
          col.className = 'compare-col';
          col.dataset.compareCol = id;
          const title = (card.querySelector('.card__title a') || {}).textContent || id;
          const price = (card.querySelector('.card__price') || {}).textContent || '';
          col.innerHTML = `<div class="compare-col__head">
              <h3 style="margin:0.75rem 0 0;font-size:1.05rem">${title}</h3>
              <div class="cluster" style="margin-top:0.5rem"><span class="badge">${id}</span></div>
            </div>
            <dl><dt>Price</dt><dd>${price}</dd></dl>`;
          grid.appendChild(col);
        }
      });
    }

    syncFavButtons();
    syncCompareButtons();
    renderFavoritesPanel();
    renderCompareBar();
    renderComparePage();

    // Share button on listing pages.
    $$('[data-share]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const data = { title: document.title, url: window.location.href };
        try {
          if (navigator.share) await navigator.share(data);
          else {
            await navigator.clipboard.writeText(window.location.href);
            btn.textContent = 'Link copied';
            window.setTimeout(() => { btn.textContent = 'Share'; }, 1800);
          }
        } catch (err) { /* the user cancelled; nothing to do */ }
      });
    });
  }

  /* ---------- listing media viewer and 360 tour ---------- */

  function initTourViewer() {
    const viewers = $$('[data-tour-viewer]');
    if (!viewers.length) return;
    /* Room names are translated server-side and carried on the viewer so the
       label for a room with no button on this page still reads correctly. */
    const fallbackRooms = ['Living room', 'Kitchen', 'Primary bedroom', 'Bathroom', 'Terrace', 'Garden court'];
    const roomsFor = (viewer) => {
      if (viewer.dataset.tourRooms) {
        try {
          const parsed = JSON.parse(viewer.dataset.tourRooms);
          if (Array.isArray(parsed) && parsed.length) return parsed;
        } catch (err) { /* fall back to the English defaults below */ }
      }
      return fallbackRooms;
    };

    /* Frames are large, so each style's eight angles live in their own script
       that is injected the first time a viewer for that style is used. */
    const loadFrames = (style) => new Promise((resolve) => {
      window.TRIXX_TOUR_FRAMES = window.TRIXX_TOUR_FRAMES || {};
      const cacheKey = `${style}-${document.body.dataset.locale || 'en'}`;
      if (window.TRIXX_TOUR_FRAMES[cacheKey]) {
        resolve(window.TRIXX_TOUR_FRAMES[cacheKey]);
        return;
      }
      const script = document.createElement('script');
      script.src = `/assets/data/tour-${cacheKey}.js`;
      script.onload = () => resolve(window.TRIXX_TOUR_FRAMES[style] || null);
      script.onerror = () => resolve(null);
      document.head.appendChild(script);
    });

    viewers.forEach((viewer) => {
      const stage = $('[data-tour-stage]', viewer);
      const label = $('[data-tour-label]', viewer);
      const style = viewer.dataset.style;
      const rooms = roomsFor(viewer);
      let angle = Number(viewer.dataset.angle || 0);
      let frames = null;
      let loaded = false;

      const draw = () => {
        if (!frames) return;
        const key = String(((angle % 360) + 360) % 360);
        const svg = frames[key] || frames[Object.keys(frames)[0]];
        if (svg) stage.innerHTML = svg;
        if (label) {
          const index = Math.floor((((angle % 360) + 360) % 360) / (360 / rooms.length));
          label.textContent = rooms[index] || rooms[0];
        }
      };

      const ensureLoaded = () => {
        if (loaded) return;
        loaded = true;
        loadFrames(style).then((data) => {
          frames = data;
          draw();
        });
      };

      // Only fetch when the viewer is actually near the viewport.
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              ensureLoaded();
              io.disconnect();
            }
          });
        }, { rootMargin: '200px' });
        io.observe(viewer);
      } else {
        ensureLoaded();
      }

      $$('[data-tour-turn]', viewer).forEach((btn) => {
        btn.addEventListener('click', () => {
          ensureLoaded();
          angle += Number(btn.dataset.tourTurn);
          draw();
        });
      });

      $$('[data-tour-room]', viewer).forEach((btn) => {
        btn.addEventListener('click', () => {
          ensureLoaded();
          const index = btn.dataset.roomIndex !== undefined
            ? Number(btn.dataset.roomIndex)
            : rooms.indexOf(btn.dataset.tourRoom);
          if (index >= 0) {
            angle = index * (360 / rooms.length);
            draw();
          }
        });
      });

      // Drag to pan: horizontal movement maps to a 360° rotation.
      let dragging = false;
      let startX = 0;
      let startAngle = 0;

      stage.addEventListener('pointerdown', (e) => {
        ensureLoaded();
        dragging = true;
        startX = e.clientX;
        startAngle = angle;
        stage.style.cursor = 'grabbing';
      });
      window.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        angle = startAngle + (e.clientX - startX) / 3;
        draw();
      });
      window.addEventListener('pointerup', () => {
        dragging = false;
        stage.style.cursor = '';
      });

      // Keyboard support keeps the tour usable without a pointer.
      viewer.setAttribute('tabindex', '0');
      viewer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          ensureLoaded();
          angle += e.key === 'ArrowLeft' ? -45 : 45;
          draw();
        }
      });

      // Thumbnails swap the stage between tour, gallery and plan.
      const thumbRow = viewer.parentElement.querySelector('[data-thumbs]');
      const thumbs = thumbRow ? $$('[data-thumb]', thumbRow) : [];
      thumbs.forEach((thumb) => {
        thumb.addEventListener('click', () => {
          thumbs.forEach((t) => t.setAttribute('aria-pressed', String(t === thumb)));
          const inner = thumb.querySelector('.art');
          if (inner) stage.innerHTML = inner.outerHTML;
          if (label) label.textContent = thumb.getAttribute('aria-label') || '';
        });
      });

      $$('[data-media]', viewer).forEach((tab) => {
        tab.addEventListener('click', () => {
          $$('[data-media]', viewer).forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
          const controls = $('[data-tour-controls]', viewer);
          if (controls) controls.hidden = tab.dataset.media !== 'tour';
          if (tab.dataset.media === 'tour') {
            ensureLoaded();
            draw();
          }
          if (tab.dataset.media === 'plan' && thumbs.length > 3) thumbs[3].click();
          if (tab.dataset.media === 'gallery' && thumbs.length) thumbs[0].click();
        });
      });

      draw();
    });
  }

  /* ---------- configurator ---------- */

  function initConfigurator() {
    const root = $('[data-configurator]');
    if (!root) return;

    const state = {
      style: 'swahili-coastal',
      styleName: 'Swahili Coastal',
      base: 18500000,
      weeks: 34,
      tier: 'comfort',
      tierPrice: 1250000,
      power: 26,
      water: 24,
      monthly: 11500,
      beds: 4,
      bedPrice: 3200000,
      addons: [],
    };

    const FEE = 285000;
    const VAT = 0.16;

    const priceEl = $('[data-cfg-price]', root);
    const summaryLine = $('[data-cfg-summary-line]', root);
    const lines = $('[data-cfg-lines]', root);
    const badgeStyle = $('[data-cfg-badge-style]', root);
    const badgeTier = $('[data-cfg-badge-tier]', root);
    const badgeBeds = $('[data-cfg-badge-beds]', root);
    const preview = $('[data-cfg-preview]', root);

    const addonTotal = () => state.addons.reduce((sum, slug) => {
      const el = root.querySelector(`[data-addon="${slug}"]`);
      return sum + (el ? Number(el.dataset.price) : 0);
    }, 0);

    const subtotal = () => state.base + state.tierPrice + state.bedPrice + addonTotal();

    const render = () => {
      const sub = subtotal();
      const vat = Math.round(sub * VAT);
      const total = sub + vat + FEE;

      if (priceEl) {
        priceEl.textContent = money(total);
        priceEl.classList.add('flash');
        window.setTimeout(() => priceEl.classList.remove('flash'), 400);
      }
      if (summaryLine) {
        summaryLine.textContent = `${state.styleName} · ${state.tier[0].toUpperCase() + state.tier.slice(1)} · ${state.beds} bedrooms`;
      }
      if (badgeStyle) badgeStyle.textContent = state.styleName;
      if (badgeTier) badgeTier.textContent = state.tier[0].toUpperCase() + state.tier.slice(1);
      if (badgeBeds) badgeBeds.textContent = `${state.beds} bedrooms`;

      const rows = [
        [`Base build — ${state.styleName}`, money(state.base)],
        [`${state.tier[0].toUpperCase() + state.tier.slice(1)} tier`, money(state.tierPrice)],
        [`${state.beds} bedrooms`, state.bedPrice ? money(state.bedPrice) : 'Included'],
      ];
      state.addons.forEach((slug) => {
        const el = root.querySelector(`[data-addon="${slug}"]`);
        if (!el) return;
        const name = el.querySelector('.addon__name').textContent;
        rows.push([name, money(Number(el.dataset.price))]);
      });

      if (lines) {
        lines.innerHTML = rows.map(([label, value]) => `<div class="cfg__line"><span>${label}</span><strong>${value}</strong></div>`).join('');
      }

      const set = (sel, value) => {
        const el = $(sel, root);
        if (el) el.textContent = value;
      };
      set('[data-cfg-power]', `${state.power}%`);
      set('[data-cfg-water]', `${state.water}%`);
      set('[data-cfg-monthly]', money(state.monthly));
      set('[data-cfg-weeks]', `${state.weeks} weeks`);
      set('[data-cfg-vat]', money(vat));
      set('[data-cfg-fees]', money(FEE));
      set('[data-cfg-total]', money(total));

      if (preview && preview.dataset.style !== state.style) {
        if (window.TRIXX_RENDERS && window.TRIXX_RENDERS[state.style]) {
          preview.innerHTML = window.TRIXX_RENDERS[state.style];
          preview.dataset.style = state.style;
        } else if (!window.TRIXX_RENDERS_LOADING) {
          // The render bundle is one shared file; fetch it once and re-render.
          window.TRIXX_RENDERS_LOADING = true;
          const script = document.createElement('script');
          script.src = '/assets/data/renders.js';
          script.onload = () => { window.TRIXX_RENDERS_LOADING = false; render(); };
          document.head.appendChild(script);
        }
      }
    };

    /* Add-ons already covered by the chosen tier are disabled, since the tier
       price already includes them. */
    const syncAddonAvailability = () => {
      $$('[data-addon]', root).forEach((label) => {
        const tiers = label.dataset.tiers.split(',');
        const available = tiers.includes(state.tier);
        const input = label.querySelector('input');
        label.style.opacity = available ? '1' : '0.5';
        if (input) {
          input.disabled = !available;
          if (!available) {
            input.checked = false;
            label.dataset.on = 'false';
            state.addons = state.addons.filter((s) => s !== label.dataset.addon);
          }
        }
        const note = label.querySelector('.addon__note');
        if (note) {
          const base = note.textContent.replace(/ Included in .*$/, '').replace(/ Already included.*$/, '');
          note.textContent = available ? base : `${base} Already included in this tier.`;
        }
      });
    };

    $$('[data-cfg-style]', root).forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('[data-cfg-style]', root).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        state.style = btn.dataset.cfgStyle;
        state.styleName = btn.querySelector('.opt__name').textContent;
        state.base = Number(btn.dataset.base);
        state.weeks = Number((btn.querySelector('.opt__meta').textContent.match(/(\d+) wks/) || [])[1] || 34);
        render();
      });
    });

    $$('[data-cfg-tier]', root).forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('[data-cfg-tier]', root).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        state.tier = btn.dataset.cfgTier;
        state.tierPrice = Number(btn.dataset.price);
        state.power = Number(btn.dataset.power);
        state.water = Number(btn.dataset.water);
        state.monthly = Number(btn.dataset.price) > 0
          ? Number((PACKAGE_MONTHLY[state.tier] || 0))
          : 0;
        syncAddonAvailability();
        render();
      });
    });

    $$('[data-cfg-beds]', root).forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('[data-cfg-beds]', root).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        state.beds = Number(btn.dataset.cfgBeds);
        state.bedPrice = Number(btn.dataset.price);
        render();
      });
    });

    $$('[data-addon-input]', root).forEach((input) => {
      input.addEventListener('change', () => {
        const label = input.closest('[data-addon]');
        const slug = label.dataset.addon;
        if (input.checked) {
          if (!state.addons.includes(slug)) state.addons.push(slug);
          label.dataset.on = 'true';
        } else {
          state.addons = state.addons.filter((s) => s !== slug);
          label.dataset.on = 'false';
        }
        render();
      });
    });

    const resetBtn = $('[data-cfg-reset]', root);
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        $$('[data-addon-input]', root).forEach((i) => { i.checked = false; });
        $$('[data-addon]', root).forEach((l) => { l.dataset.on = 'false'; });
        state.addons = [];
        syncAddonAvailability();
        render();
      });
    }

    // Deep links: ?style=...&tier=...
    const params = new URLSearchParams(window.location.search);
    const wantedStyle = params.get('style');
    const wantedTier = params.get('tier');
    if (wantedStyle) {
      const btn = root.querySelector(`[data-cfg-style="${wantedStyle}"]`);
      if (btn) btn.click();
    }
    if (wantedTier) {
      const btn = root.querySelector(`[data-cfg-tier="${wantedTier}"]`);
      if (btn) btn.click();
    }

    syncAddonAvailability();
    render();
  }

  const PACKAGE_MONTHLY = { basic: 4200, comfort: 11500, premium: 24800 };

  /* ---------- live demo dashboard ---------- */

  function initDemo() {
    const root = $('[data-demo]');
    if (!root) return;

    const ROOMS = [
      { name: 'Living room', devices: [['Lights', true], ['Ceiling fan', true], ['Blinds', false]] },
      { name: 'Kitchen', devices: [['Lights', true], ['Appliance circuit', false], ['Leak sensor', true]] },
      { name: 'Primary bedroom', devices: [['Lights', true], ['Climate zone', true], ['Blackout blind', false]] },
      { name: 'Front door', devices: [['Door lock', true], ['Doorbell camera', true], ['Porch light', false]] },
      { name: 'Garden', devices: [['Irrigation zone 1', false], ['Irrigation zone 2', false], ['Soil moisture', true]] },
      { name: 'Plant room', devices: [['Solar inverter', true], ['Battery', true], ['Water tank level', true]] },
    ];

    const devicesEl = $('[data-demo-devices]', root);
    const logEl = $('[data-demo-log]', root);
    const roomName = $('[data-demo-room-name]', root);
    const bars = $$('[data-demo-bars] i', root);
    const gaugeFill = $('[data-demo-gauge-fill]', root);
    const solarEl = $('[data-demo-solar]', root);
    const batteryEl = $('[data-demo-battery]', root);
    const energyEl = $('[data-demo-energy]', root);
    const awayBtn = $('[data-demo-away]', root);

    let currentRoom = 0;
    const state = ROOMS.map((r) => r.devices.map((d) => d[1]));
    let solar = 4.2;
    let battery = 78;
    let energy = 2140;

    const stamp = () => {
      const now = new Date();
      return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    };

    const log = (text) => {
      if (!logEl) return;
      const line = document.createElement('span');
      line.innerHTML = `<b>${stamp()}</b> ${text}`;
      logEl.prepend(line);
      while (logEl.children.length > 8) logEl.lastElementChild.remove();
    };

    const activeCount = () => state.flat().filter(Boolean).length;

    /* Load follows the number of live devices, which is what makes the chart
       feel connected to the switches rather than decorative. */
    const updateEnergy = () => {
      const load = activeCount() / 18;
      const monthNow = Math.round(150 + load * 120);
      if (bars.length) {
        bars[bars.length - 1].style.height = `${Math.min(100, monthNow)}%`;
      }
      energy = 1900 + Math.round(load * 620);
      if (energyEl) energyEl.textContent = energy.toLocaleString('en-KE');
      solar = Math.max(0.4, 5.6 - load * 3.4);
      if (solarEl) solarEl.textContent = solar.toFixed(1);
      if (gaugeFill) {
        const circumference = 264;
        gaugeFill.setAttribute('stroke-dashoffset', String(circumference * (1 - solar / 8)));
        gaugeFill.style.stroke = solar > 3 ? 'var(--teal-light)' : 'var(--brass-light)';
      }
      battery = Math.max(18, Math.min(100, battery - load * 2 + (solar > 3 ? 1 : 0)));
      if (batteryEl) batteryEl.textContent = String(Math.round(battery));
    };

    const renderDevices = () => {
      if (!devicesEl) return;
      const room = ROOMS[currentRoom];
      devicesEl.innerHTML = room.devices.map(([name], i) => {
        const on = state[currentRoom][i];
        const isSensor = name.includes('sensor') || name.includes('moisture') || name.includes('inverter') || name.includes('Battery') || name.includes('tank');
        if (isSensor) {
          return `<div class="tile">
            <div class="tile__top"><span class="tile__name">${name}</span><span class="tile__state">Reading</span></div>
            <span class="tile__value">${(40 + i * 12).toFixed(0)}</span>
            <span class="tile__unit">${name.includes('tank') ? '% full' : name.includes('Battery') ? '% charge' : 'normal'}</span>
          </div>`;
        }
        return `<div class="tile">
          <div class="tile__top"><span class="tile__name">${name}</span><span class="tile__state">${on ? 'On' : 'Off'}</span></div>
          <button class="switch" type="button" role="switch" aria-checked="${on}" data-demo-toggle="${i}" aria-label="${name}"></button>
        </div>`;
      }).join('');

      $$('[data-demo-toggle]', devicesEl).forEach((btn) => {
        btn.addEventListener('click', () => {
          const i = Number(btn.dataset.demoToggle);
          state[currentRoom][i] = !state[currentRoom][i];
          btn.setAttribute('aria-checked', String(state[currentRoom][i]));
          const tile = btn.closest('.tile');
          const stateEl = tile.querySelector('.tile__state');
          if (stateEl) stateEl.textContent = state[currentRoom][i] ? 'On' : 'Off';
          log(`${ROOMS[currentRoom].devices[i][0]} turned ${state[currentRoom][i] ? 'on' : 'off'} in the ${ROOMS[currentRoom].name.toLowerCase()}`);
          updateEnergy();
        });
      });
    };

    $$('[data-demo-room]', root).forEach((btn) => {
      btn.addEventListener('click', () => {
        currentRoom = Number(btn.dataset.demoRoom);
        $$('[data-demo-room]', root).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        if (roomName) roomName.textContent = ROOMS[currentRoom].name;
        renderDevices();
      });
    });

    if (awayBtn) {
      awayBtn.addEventListener('click', () => {
        const on = awayBtn.getAttribute('aria-checked') !== 'true';
        awayBtn.setAttribute('aria-checked', String(on));
        state.forEach((room, ri) => {
          room.forEach((_, di) => {
            const name = ROOMS[ri].devices[di][0];
            if (on) {
              if (name.includes('Lights') || name.includes('Blinds') || name.includes('Porch') || name.includes('Irrigation') || name.includes('fan')) state[ri][di] = false;
              if (name.includes('lock') || name.includes('camera') || name.includes('Climate')) state[ri][di] = true;
            }
          });
        });
        log(on ? 'Away mode armed — lights off, doors locked, cameras on' : 'Away mode disarmed');
        renderDevices();
        updateEnergy();
      });
    }

    renderDevices();
    updateEnergy();

    // The demo keeps ticking so the numbers feel alive.
    window.setInterval(() => {
      battery = Math.max(18, Math.min(100, battery + (Math.random() - 0.45) * 2));
      if (batteryEl) batteryEl.textContent = String(Math.round(battery));
    }, 4000);
  }

  /* ---------- mortgage calculator on listing pages ---------- */

  function initMortgage() {
    const deposit = $('[data-calc-deposit]');
    if (!deposit) return;
    const term = $('[data-calc-term]');
    const rate = $('[data-calc-rate]');
    const price = Number(deposit.dataset.price);
    const service = Number(deposit.dataset.service || 0);
    const insurance = Number(deposit.dataset.insurance || 0);
    const rates = Number(deposit.dataset.rates || 0);

    const out = {
      depositOut: $('[data-calc-deposit-out]'),
      termOut: $('[data-calc-term-out]'),
      rateOut: $('[data-calc-rate-out]'),
      deposit: $('strong[data-calc-deposit]'),
      loan: $('[data-calc-loan]'),
      monthly: $('[data-calc-monthly]'),
      total: $('[data-calc-total]'),
    };

    const calc = () => {
      const dep = Number(deposit.value);
      const years = Number(term ? term.value : 20);
      const annual = Number(rate ? rate.value : 11.5) / 100;
      const loan = Math.max(0, price - dep);
      const monthlyRate = annual / 12;
      const n = years * 12;
      const repay = loan > 0 && monthlyRate > 0
        ? (loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n))
        : 0;
      const total = repay + service + insurance + rates;

      if (out.depositOut) out.depositOut.textContent = money(dep);
      if (out.termOut) out.termOut.textContent = String(years);
      if (out.rateOut) out.rateOut.textContent = (annual * 100).toFixed(1);
      if (out.deposit) out.deposit.textContent = money(dep);
      if (out.loan) out.loan.textContent = money(loan);
      if (out.monthly) out.monthly.textContent = money(repay);
      if (out.total) out.total.textContent = money(total);
    };

    [deposit, term, rate].filter(Boolean).forEach((el) => {
      el.addEventListener('input', calc);
      el.addEventListener('change', calc);
    });
    calc();
  }

  /* ---------- savings calculators ---------- */

  function initSavings() {
    const root = $('[data-savings]');
    if (root) {
      const powerBill = $('[data-power-bill]', root);
      const waterBill = $('[data-water-bill]', root);
      const pumpCost = $('[data-pump-cost]', root);
      const out = {
        power: $('[data-out-power]', root),
        water: $('[data-out-water]', root),
        pump: $('[data-out-pump]', root),
      };
      const result = {
        tier: $('[data-s-tier]', root),
        power: $('[data-s-power]', root),
        water: $('[data-s-water]', root),
        powerMoney: $('[data-s-power-money]', root),
        waterMoney: $('[data-s-water-money]', root),
        total: $('[data-s-total]', root),
        year: $('[data-s-year]', root),
        payback: $('[data-s-payback]', root),
      };
      let tier = { name: 'Comfort', price: 1250000, power: 26, water: 24 };

      const calc = () => {
        const p = Number(powerBill.value);
        const w = Number(waterBill.value);
        const pump = Number(pumpCost.value);
        if (out.power) out.power.textContent = p.toLocaleString('en-KE');
        if (out.water) out.water.textContent = w.toLocaleString('en-KE');
        if (out.pump) out.pump.textContent = pump.toLocaleString('en-KE');

        const powerSaved = (p + pump) * (tier.power / 100);
        const waterSaved = w * (tier.water / 100);
        const total = powerSaved + waterSaved;
        const months = total > 0 ? tier.price / total : 0;

        if (result.tier) result.tier.textContent = tier.name;
        if (result.power) result.power.textContent = `${tier.power}%`;
        if (result.water) result.water.textContent = `${tier.water}%`;
        if (result.powerMoney) result.powerMoney.textContent = money(powerSaved);
        if (result.waterMoney) result.waterMoney.textContent = money(waterSaved);
        if (result.total) result.total.textContent = money(total);
        if (result.year) result.year.textContent = money(total * 12);
        if (result.payback) {
          result.payback.textContent = months > 0 ? `${months.toFixed(1)} months` : '—';
        }
      };

      [powerBill, waterBill, pumpCost].filter(Boolean).forEach((el) => el.addEventListener('input', calc));

      $$('[data-tier]', root).forEach((btn) => {
        btn.addEventListener('click', () => {
          $$('[data-tier]', root).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
          tier = {
            name: btn.querySelector('.opt__name').textContent,
            price: Number(btn.dataset.price),
            power: Number(btn.dataset.power),
            water: Number(btn.dataset.water),
          };
          calc();
        });
      });

      calc();
    }

    const farm = $('[data-farm-calc]');
    if (farm) {
      const area = $('[data-farm-area]', farm);
      const water = $('[data-farm-water]', farm);
      const labour = $('[data-farm-labour]', farm);
      const out = {
        area: $('[data-out-area]', farm),
        water: $('[data-out-fwater]', farm),
        labour: $('[data-out-flabour]', farm),
      };
      const result = {
        tier: $('[data-f-tier]', farm),
        waterMoney: $('[data-f-water-money]', farm),
        labourMoney: $('[data-f-labour-money]', farm),
        total: $('[data-f-total]', farm),
        year: $('[data-f-year]', farm),
        payback: $('[data-f-payback]', farm),
      };
      let pkg = { name: 'Family Plot', price: 520000, water: 36, labour: 65 };

      const calc = () => {
        const a = Number(area.value);
        const w = Number(water.value);
        const l = Number(labour.value);
        if (out.area) out.area.textContent = String(a);
        if (out.water) out.water.textContent = w.toLocaleString('en-KE');
        if (out.labour) out.labour.textContent = l.toLocaleString('en-KE');

        const waterSaved = w * (pkg.water / 100);
        const labourSaved = l * (pkg.labour / 100);
        const total = waterSaved + labourSaved;
        // Package price scales with area above the package's design area.
        const designArea = pkg.name === 'Starter Plot' ? 0.25 : pkg.name === 'Family Plot' ? 1 : 5;
        const scale = Math.max(1, a / designArea);
        const cost = pkg.price * scale;
        const months = total > 0 ? cost / total : 0;

        if (result.tier) result.tier.textContent = `${pkg.name} (×${scale.toFixed(2)} for ${a} acres)`;
        if (result.waterMoney) result.waterMoney.textContent = money(waterSaved);
        if (result.labourMoney) result.labourMoney.textContent = money(labourSaved);
        if (result.total) result.total.textContent = money(total);
        if (result.year) result.year.textContent = money(total * 12);
        if (result.payback) result.payback.textContent = months > 0 ? `${months.toFixed(1)} months` : '—';
      };

      [area, water, labour].filter(Boolean).forEach((el) => el.addEventListener('input', calc));

      $$('[data-farm-tier]', farm).forEach((btn) => {
        btn.addEventListener('click', () => {
          $$('[data-farm-tier]', farm).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
          pkg = {
            name: btn.querySelector('.opt__name').textContent,
            price: Number(btn.dataset.price),
            water: Number(btn.dataset.water),
            labour: Number(btn.dataset.labour),
          };
          calc();
        });
      });

      calc();
    }
  }

  /* ---------- booking calendar ---------- */

  function initBooking() {
    const cal = $('[data-calendar]');
    if (!cal) return;

    const grid = $('[data-calendar-grid]', cal);
    const title = $('[data-calendar-title]', cal);
    const slotsEl = $('[data-slot-row]', cal);
    const summary = $('[data-booking-summary]', cal);
    const hidden = $('[data-booking-value]', cal);

    const SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
    const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Bookable from tomorrow, for the next 60 days; Sundays closed.
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() + 1);
    let viewMonth = new Date(start.getFullYear(), start.getMonth(), 1);
    let selectedDate = null;
    let selectedSlot = null;

    const isAvailable = (date) => {
      if (date < start) return false;
      const limit = new Date(start);
      limit.setDate(limit.getDate() + 60);
      if (date > limit) return false;
      return date.getDay() !== 0;
    };

    const render = () => {
      if (title) title.textContent = `${MONTHS[viewMonth.getMonth()]} ${viewMonth.getFullYear()}`;
      const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
      const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
      // Monday-first grid.
      const lead = (first.getDay() + 6) % 7;

      const cells = DOW.map((d) => `<div class="calendar__dow">${d}</div>`).join('');
      let days = '';
      for (let i = 0; i < lead; i += 1) days += '<span class="calendar__day is-empty"></span>';
      for (let d = 1; d <= daysInMonth; d += 1) {
        const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d);
        const available = isAvailable(date);
        const iso = date.toISOString().slice(0, 10);
        const selected = selectedDate === iso;
        days += `<button class="calendar__day" type="button" data-day="${iso}" ${available ? '' : 'disabled'} aria-pressed="${selected}">
          ${d}${available ? '<span class="cd__dot"></span>' : ''}
        </button>`;
      }
      grid.innerHTML = cells + days;

      $$('[data-day]', grid).forEach((btn) => {
        btn.addEventListener('click', () => {
          selectedDate = btn.dataset.day;
          selectedSlot = null;
          render();
          renderSlots();
        });
      });
    };

    const renderSlots = () => {
      if (!slotsEl) return;
      if (!selectedDate) {
        slotsEl.innerHTML = '<p class="tiny muted" style="margin:0">Choose a date to see available times.</p>';
        return;
      }
      slotsEl.innerHTML = SLOTS.map((s) => {
        // Deterministic "booked" slots so the demo behaves consistently.
        const seed = (selectedDate.charCodeAt(9) + s.charCodeAt(1)) % 4;
        const taken = seed === 0;
        return `<button class="slot" type="button" data-slot="${s}" ${taken ? 'disabled' : ''} aria-pressed="${selectedSlot === s}">${s}${taken ? ' booked' : ''}</button>`;
      }).join('');
      $$('[data-slot]', slotsEl).forEach((btn) => {
        btn.addEventListener('click', () => {
          selectedSlot = btn.dataset.slot;
          renderSlots();
          if (summary) summary.textContent = `Selected: ${selectedDate} at ${selectedSlot}`;
          if (hidden) hidden.value = `${selectedDate} ${selectedSlot}`;
        });
      });
    };

    const prev = $('[data-calendar-prev]', cal);
    const next = $('[data-calendar-next]', cal);
    if (prev) prev.addEventListener('click', () => {
      viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1);
      render();
    });
    if (next) next.addEventListener('click', () => {
      viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1);
      render();
    });

    render();
    renderSlots();
  }

  /* ---------- admin CMS preview ---------- */

  function initAdmin() {
    const editor = $('[data-cms-editor]');
    if (!editor) return;
    const preview = $('[data-cms-preview]', editor);
    const fields = $$('[data-cms-field]', editor);

    const render = () => {
      if (!preview) return;
      const values = {};
      fields.forEach((f) => { values[f.dataset.cmsField] = f.value; });
      const render = (window.TRIXX_RENDERS && window.TRIXX_RENDERS[values.style]) || '';
      preview.innerHTML = `<article class="card" style="max-width:26rem">
        <div class="card__media">${render}</div>
        <div class="card__body">
          <div class="card__meta"><span>${values.location || 'Location'}</span><span>${(values.style || '').replace(/-/g, ' ')}</span></div>
          <h3 class="card__title">${values.title || 'Listing title'}</h3>
          <div class="card__price">KES ${Number(values.price || 0).toLocaleString('en-KE')}</div>
          <div class="card__meta"><span>${values.bedrooms || 0} bd</span><span>${values.tier || 'basic'} tier</span></div>
        </div>
      </article>`;
    };

    fields.forEach((f) => {
      f.addEventListener('input', render);
      f.addEventListener('change', render);
    });
    render();
  }

  /* ---------- boot ---------- */

  function boot() {
    initReveal();
    initSlideshows();
    initHeroSlides();
    initCountUp();
    initFloorPlanDialog();
    initProgress();
    initDrawer();
    initForms();
    initSearch();
    initTourViewer();
    initConfigurator();
    initDemo();
    initMortgage();
    initSavings();
    initBooking();
    initAdmin();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}());
