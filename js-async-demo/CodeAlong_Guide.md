# Code-Along: Asynchronous JavaScript & Promises

**Web Systems and Technologies · Week 12**

You'll type along with your teacher to make JavaScript *wait* without freezing the page. You'll start with timers, write one coffee order four ways (callbacks → Promises → `.then()` → `async`/`await`), and then load real data with `fetch()`.

Name: ________________________  Section: ____________  Date: ____________

---

## Before we start

- Open the `starter` folder in VS Code. Right-click `index.html` → **Open with Live Server**. That page links to all four projects.
- **Live Server is required today.** `fetch()` will not load files from a page opened by double-clicking (`file://`).
- Open DevTools (F12). Keep the **Console** open the whole time. In Part B, open the **Network** tab too.
- The HTML and CSS are done. You only write JavaScript in the TODO sections of each `script.js`. The page elements are already selected for you at the top of each file (that was Week 11).
- **Fell behind?** Copy the matching file from `checkpoints/` (e.g. `kape-orders/step3-script.js`) over your `script.js` and keep going.

| Step | You'll learn | Time |
|---|---|---|
| Warm-up · Sync vs. Async | one thread, `setTimeout`, blocking vs. non-blocking, `setInterval` | 15 min |
| A1 · Callbacks | passing a function to be called later | 8 min |
| A2 · Callback hell | nesting, error-first callbacks, why it hurts | 10 min |
| A3 · Make a Promise | `new Promise`, `resolve`, `reject`, pending/fulfilled/rejected | 12 min |
| A4 · `.then()` chain | `.then`, `.catch`, `.finally`, returning the next Promise | 10 min |
| A5 · `async` / `await` | `async function`, `await`, `try`/`catch`/`finally` | 10 min |
| A6 · `Promise.all` | running jobs at the same time | 10 min |
| B1–B4 · Fetch a JSON file | `fetch`, `response.json()`, `response.ok`, loading & error states | 30 min |
| B5 · A real web API | query strings, form submit, "not found" vs. "no internet" | 10 min |

## The big idea: JavaScript has one thread

JavaScript runs **one line at a time**, on one thread. If one job takes 3 seconds, everything else waits, including clicks and repainting the page.

So slow jobs (timers, downloading data, reading files) are **handed off to the browser**. JavaScript keeps going, and when the slow job is done, its callback gets back in line (the *event loop*) and runs.

> **Synchronous** = wait in line until it's done. **Asynchronous** = "start it, I'll get back to you."

A **Promise** is an object that stands for a value that isn't ready *yet*. It is in one of three states:

| State | Meaning | Kape example |
|---|---|---|
| `pending` | still working | the barista is brewing |
| `fulfilled` | done, here is the value → `resolve(value)` | "Pili Latte ☕" |
| `rejected` | failed, here is the error → `reject(error)` | "Sorry, Ube Latte is sold out" |

---

## Warm-up · Sync vs. Async

Open `async-warmup/`. Each part has a card on the page.

### Part 1 · Predict the order

**Before you save, write your guess:** in what order will 1, 2, 3 appear? ________

```js
// PART 1 — Predict the order ===========================================
runOrder.addEventListener("click", () => {
  orderLog.innerHTML = ""; // clear the old run

  show("1 · Order taken");

  // setTimeout hands the job to the browser. Even with 0 ms, the callback
  // must wait until the current code is finished.
  setTimeout(() => {
    show("2 · Coffee ready (after 0 ms!)");
  }, 0);

  show("3 · Next customer, please");
});
// Result: 1, 3, 2
```

**Look for it:** Even with `0` ms, "2" comes last. `setTimeout` never cuts in line. Its callback waits until the code that is running now is finished.

### Part 2 · Freeze vs. wait

```js
// PART 2 — Freeze vs. wait =============================================
let count = 0;
counterBtn.addEventListener("click", () => {
  count++;
  counterBtn.textContent = `Click me (${count})`;
});

// BLOCKING: the while loop keeps the one and only thread busy for 3 s.
// The page cannot repaint or react to clicks until it ends.
freezeBtn.addEventListener("click", () => {
  statusText.textContent = "Freezing…"; // you never see this text!
  const end = Date.now() + 3000;
  while (Date.now() < end) {
    // doing nothing, very busily
  }
  statusText.textContent = "Done freezing. Did your clicks count?";
});

// NON-BLOCKING: setTimeout lets the browser do the waiting.
// The thread is free, so the counter keeps working.
waitBtn.addEventListener("click", () => {
  statusText.textContent = "Waiting 3 s… keep clicking the counter!";
  setTimeout(() => {
    statusText.textContent = "Done waiting. The page never froze.";
  }, 3000);
});
```

**Break it on purpose:** Click **Freeze 3 s**, then click the counter 5 times. Nothing happens. The text "Freezing…" never even shows. When the loop ends, your clicks suddenly all count at once: they were waiting in line. Now try **Wait 3 s**: the counter keeps working the whole time.

### Part 3 · A clock with setInterval

```js
// PART 3 — A clock with setInterval ====================================
let timerId = null; // remembers which interval to stop

function tick() {
  clock.textContent = new Date().toLocaleTimeString();
}

startBtn.addEventListener("click", () => {
  if (timerId !== null) return; // already running: don't start a second one
  tick(); // show the time right away
  timerId = setInterval(tick, 1000); // then every 1000 ms
});

stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
});
```

**Try it:** Remove the `if (timerId !== null) return;` line, click Start 3 times, then Stop. The clock keeps going! You started 3 intervals but only stopped the last one.

**Checkpoint** ☐ I can explain why the order is 1, 3, 2  ☐ I saw the page freeze  ☐ Clock starts and stops

---

## Part A · Kape Orders ☕

Open `kape-orders/`. Taking an order takes 1 s, brewing takes 2 s, serving takes 1 s. The helpers `logStep()`, `clearLog()` and `setBusy()` are already written at the top of `script.js`.

### Step A1 · Callbacks

```js
// STEP A1 — Callbacks: "call me back when you're done" =================
// A callback is a function we pass in, to be called LATER.
function brewWithCallback(drink, done) {
  logStep(`Brewing ${drink}…`);
  setTimeout(() => {
    done(`${drink} ☕`); // 2 s later: call the function we were given
  }, 2000);
}

// Try it in the Console first:
// brewWithCallback("Kapeng Barako", (cup) => logStep(`Ready: ${cup}`, "success"));
```

**Try it:** Paste the commented line into the Console. Two seconds later, "Ready" appears in the Order log.

### Step A2 · Callback hell

```js
// STEP A2 — Callback hell: three steps, one inside the other ===========
// "Error-first" callback: done(error, result). If error is not null, stop.
function takeOrderCb(drink, done) {
  logStep(`Taking order: ${drink}`);
  setTimeout(() => {
    if (SOLD_OUT.includes(drink)) {
      done(`Sorry, ${drink} is sold out`, null);
    } else {
      done(null, drink);
    }
  }, 1000);
}

function serveCb(cup, done) {
  setTimeout(() => {
    logStep(`Served: ${cup}`, "success");
    done();
  }, 1000);
}

callbackBtn.addEventListener("click", () => {
  clearLog();
  setBusy(true);
  takeOrderCb(drinkSelect.value, (error, drink) => {
    if (error) {
      logStep(error, "error");
      setBusy(false);
      return;
    }
    brewWithCallback(drink, (cup) => {
      serveCb(cup, () => {
        logStep("Order complete!", "success");
        setBusy(false);
      }); // ← see the pyramid
    }); //    growing to the
  }); //      right? That's "callback hell".
});
```

**Look for it:** Select **Ube Latte** and order. The error path works, but look at the shape of the code: every new step goes one level deeper, and *every* level needs its own error check. Imagine 6 steps. This is "callback hell" (the pyramid of doom).

**Checkpoint** ☐ An order logs 4 lines  ☐ Ube Latte shows the sold-out message

### Step A3 · Make a Promise

```js
// STEP A3 — Make a Promise ============================================
// A Promise is an object for a value that is not ready YET.
// It starts "pending", then becomes "fulfilled" (resolve) or "rejected" (reject).
function takeOrder(drink) {
  return new Promise((resolve, reject) => {
    logStep(`Taking order: ${drink}`);
    setTimeout(() => {
      if (SOLD_OUT.includes(drink)) {
        reject(new Error(`Sorry, ${drink} is sold out`));
      } else {
        resolve(drink);
      }
    }, 1000);
  });
}

function brew(drink) {
  return new Promise((resolve) => {
    logStep(`Brewing ${drink}…`);
    setTimeout(() => resolve(`${drink} ☕`), 2000);
  });
}

function serve(cup) {
  return new Promise((resolve) => {
    setTimeout(() => {
      logStep(`Served: ${cup}`, "success");
      resolve(cup);
    }, 1000);
  });
}

// Try these in the Console:
// const p = takeOrder("Pili Latte"); p          → Promise {<pending>}
// ...wait 1 s, then type p again                → Promise {<fulfilled>: 'Pili Latte'}
// takeOrder("Ube Latte")                        → Uncaught (in promise) Error
```

**Break it on purpose:** In `brew`, comment out `resolve(...)`. Run `const p = brew("Barako")` in the Console, wait, then type `p`. It stays `Promise {<pending>}` **forever**. A Promise only settles when you call `resolve` or `reject`. Put it back.

### Step A4 · .then() / .catch() / .finally()

```js
// STEP A4 — .then() / .catch() / .finally() ==========================
thenBtn.addEventListener("click", () => {
  clearLog();
  setBusy(true);

  takeOrder(drinkSelect.value)
    .then((drink) => brew(drink)) // return the next Promise...
    .then((cup) => serve(cup)) // ...so the chain waits for it
    .then(() => logStep("Order complete!", "success"))
    .catch((error) => logStep(error.message, "error")) // ANY step that fails lands here
    .finally(() => setBusy(false)); // runs on success AND on failure
});
// Flat, top to bottom: no pyramid. One .catch() handles every step.
```

**Break it on purpose:** Change the first `.then` to use curly braces without `return`:
`.then((drink) => { brew(drink); })`
Order again. "Served: undefined" appears *before* brewing is done. Without `return`, the chain doesn't wait. **Rule: always return the next Promise.**

**Checkpoint** ☐ Order works  ☐ Ube Latte lands in `.catch()`  ☐ Buttons come back after an error (that's `.finally()`)

### Step A5 · async / await

```js
// STEP A5 — async / await ============================================
// await pauses THIS function (not the page!) until the Promise settles.
async function placeOrder(drink) {
  setBusy(true);
  try {
    const confirmed = await takeOrder(drink);
    const cup = await brew(confirmed);
    await serve(cup);
    logStep("Order complete!", "success");
  } catch (error) {
    logStep(error.message, "error"); // a rejected Promise becomes a thrown error
  } finally {
    setBusy(false);
  }
}

asyncBtn.addEventListener("click", () => {
  clearLog();
  placeOrder(drinkSelect.value);
});
```

**Break it on purpose:** Remove `await` before `takeOrder(drink)`. The log says "Brewing [object Promise]…", because `confirmed` is now the Promise itself, not the drink. Also, Ube Latte is no longer caught. Put `await` back.

> `await` only works inside an `async` function. `async` functions always return a Promise.

### Step A6 · Promise.all: rush hour

```js
// STEP A6 — Promise.all: three baristas instead of one =================
const rushOrders = ["Kapeng Barako", "Pili Latte", "Iced Mocha"];

function secondsSince(start) {
  return ((performance.now() - start) / 1000).toFixed(1);
}

rushBtn.addEventListener("click", async () => {
  clearLog();
  setBusy(true);

  // One at a time: each await waits for the one before it
  let start = performance.now();
  for (const drink of rushOrders) {
    await brew(drink);
  }
  logStep(`One at a time: ${secondsSince(start)} s`, "time");

  // All at once: start all three, then wait for ALL of them
  start = performance.now();
  const cups = await Promise.all(rushOrders.map((drink) => brew(drink)));
  logStep(`All at once: ${secondsSince(start)} s → ${cups.join(", ")}`, "time");

  setBusy(false);
});

// CHALLENGE — Promise.allSettled: add "Ube Latte" to a list of takeOrder()
// calls. Promise.all fails the whole batch; allSettled tells you which failed.
// const results = await Promise.allSettled(["Pili Latte", "Ube Latte"].map(takeOrder));
// results.forEach((r) => logStep(r.status === "fulfilled" ? r.value : r.reason.message));
```

**Look for it:** One at a time ≈ **6.0 s**. All at once ≈ **2.0 s**. `Promise.all` waits for the *slowest* one, not the total.

**Challenge:** Uncomment the `Promise.allSettled` lines inside a new `async` click handler. Which order failed?

**Checkpoint** ☐ I can write the same order with `.then()` and with `await`  ☐ Rush hour shows ~6 s vs ~2 s

---

## Part B · Fetch Explorer

Open `fetch-explorer/` **with Live Server**. Open the **Network** tab too. `data/events.json` is just a text file of JavaScript-like data (JSON).

### Step B1 · fetch() returns a Promise

```js
// STEP B1 — fetch() returns a Promise ================================
const request = fetch(EVENTS_URL);
console.log(request); // Promise {<pending>}

request
  .then((response) => {
    console.log(response); // Response {status: 200, ok: true, ...}
    return response.json(); // reading the body ALSO returns a Promise
  })
  .then((data) => {
    console.log(data); // (5) [{…}, {…}, …]: a normal JavaScript array!
    console.log(data[0].title);
  });
```

**Break it on purpose:** Open `fetch-explorer/index.html` by **double-clicking** it in your file explorer (address bar starts with `file://`). The Console shows a **CORS** error. Browsers block `fetch` from `file://`. Go back to Live Server.

**Look for it:** In the Network tab, click `events.json`. You can see the status (200) and the raw data in **Response**.

### Step B2 · Turn the data into cards

```js
// STEP B2 — Turn the data into cards (Week 11 DOM skills) =============
function renderEvents(events) {
  eventsBox.innerHTML = ""; // clear old cards first
  events.forEach((event) => {
    const card = document.createElement("article");
    card.className = "event";

    const title = document.createElement("h3");
    title.textContent = event.title;

    const when = document.createElement("p");
    when.textContent = "📅 " + niceDate(event.date);

    const where = document.createElement("p");
    where.textContent = "📍 " + event.venue;

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = event.category;

    card.append(title, when, where, tag);
    eventsBox.appendChild(card);
  });
}

loadBtn.addEventListener("click", () => {
  fetch(EVENTS_URL)
    .then((response) => response.json())
    .then((events) => renderEvents(events));
});
```

**Checkpoint** ☐ Clicking **Load events** shows 5 cards

### Step B3 · Loading and error messages

Replace the B2 click handler (keep `renderEvents`) with this:

```js
// STEP B3 — Loading and error messages ================================
// (this replaces the B2 click handler)
loadBtn.addEventListener("click", () => {
  statusText.className = "";
  statusText.textContent = "Loading events…";
  eventsBox.innerHTML = "";

  fetch(EVENTS_URL)
    .then((response) => {
      // fetch only rejects when there is NO response at all (offline, CORS).
      // A 404 or 500 is still a "response", so WE must check it.
      if (!response.ok) {
        throw new Error(`Could not load ${EVENTS_URL} (HTTP ${response.status})`);
      }
      return response.json();
    })
    .then((events) => {
      renderEvents(events);
      statusText.textContent = `${events.length} events loaded.`;
    })
    .catch((error) => {
      statusText.className = "error";
      statusText.textContent = "⚠ " + error.message;
    });
});
```

**Break it on purpose:** Change `EVENTS_URL` to `"data/event.json"` (no "s"). Without the `if (!response.ok)` check, you'd get a confusing JSON error. With it, the message says **HTTP 404**. Remember: **`fetch` does not reject on 404.** You must check `response.ok` yourself. Fix the URL.

### Step B4 · The same thing with async / await

Replace the B3 click handler with this:

```js
// STEP B4 — The same thing with async / await =========================
// (this replaces the B3 click handler)
async function loadEvents() {
  loadBtn.disabled = true;
  statusText.className = "";
  statusText.textContent = "Loading events…";
  eventsBox.innerHTML = "";

  try {
    await wait(800); // fake slow network: remove this line when you are done
    const response = await fetch(EVENTS_URL);
    if (!response.ok) {
      throw new Error(`Could not load ${EVENTS_URL} (HTTP ${response.status})`);
    }
    const events = await response.json();
    renderEvents(events);
    statusText.textContent = `${events.length} events loaded.`;
  } catch (error) {
    statusText.className = "error";
    statusText.textContent = "⚠ " + error.message;
  } finally {
    loadBtn.disabled = false;
  }
}

loadBtn.addEventListener("click", loadEvents);
```

**Try it:** `await wait(800)` fakes a slow network so you can see "Loading events…". You can also use the real thing: Network tab → **No throttling** → **Slow 3G**.

**Checkpoint** ☐ Loading message appears  ☐ Wrong URL shows a friendly error  ☐ Button is disabled while loading

### Step B5 · Ask a real web API

```js
// STEP B5 — Ask a real web API ========================================
pokeForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // stop the form from reloading the page

  const query = pokeName.value.trim().toLowerCase();
  if (query === "") return;

  pokeResult.textContent = "Searching…";

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`No Pokémon called "${query}". Check the spelling.`);
    }
    const pokemon = await response.json();
    console.log(pokemon); // explore it: there is a LOT of data in here

    const types = pokemon.types.map((t) => t.type.name).join(", ");
    pokeResult.innerHTML = "";

    const box = document.createElement("div");
    box.className = "poke";

    const img = document.createElement("img");
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;

    const info = document.createElement("div");
    const name = document.createElement("h3");
    name.textContent = `#${pokemon.id} ${pokemon.name}`;
    const typeLine = document.createElement("p");
    typeLine.textContent = "Type: " + types;
    const size = document.createElement("p");
    size.textContent = `Height: ${pokemon.height / 10} m · Weight: ${pokemon.weight / 10} kg`;

    info.append(name, typeLine, size);
    box.append(img, info);
    pokeResult.appendChild(box);
  } catch (error) {
    // No internet? fetch itself rejects with "Failed to fetch" and lands here too.
    pokeResult.innerHTML = "";
    const msg = document.createElement("p");
    msg.className = "error";
    msg.textContent = "⚠ " + error.message;
    pokeResult.appendChild(msg);
  }
});
```

**Try it:** `pikachu`, `eevee`, `25`, then `pikachoo`. Then turn off Wi-Fi and search again: you get "Failed to fetch". A 404 and "no internet" are different problems, and your `catch` handles both.

**Checkpoint** ☐ A Pokémon card appears  ☐ A wrong name shows a friendly message

---

## Week 12 Lab · Portfolio: load your projects from JSON (40 pts)

Use your own portfolio. If yours is missing or broken, use `portfolio-lab/` (sample "Juan Dela Cruz" site with Weeks 8 and 11 done).

| Task | What to do | Pts |
|---|---|---|
| 1 · `loadJSON(url)` | Write a reusable `async function loadJSON(url)` that fetches, checks `response.ok` (throws an `Error` if not), and returns the parsed JSON. | 10 |
| 2 · Projects from JSON | Move your Week 11 `projects` array into `data/projects.json`. On `projects.html`, show "Loading projects…", load the file with `loadJSON`, build the cards, and show a friendly error (class `status error`) if loading fails. Your filter buttons must still work. | 15 |
| 3 · Featured project | Add `"featured": true` to one project. On `index.html`, reuse `loadJSON` and `.find()` to show that project's title and description in `#featured`. | 10 |
| 4 · Evidence | Screenshot (a) the loading message (Network → Slow 3G), (b) the error message (rename the JSON file for a moment), (c) the working page. Commit and push to your GitHub repo with the message `Week 12: load projects from JSON`. | 5 |

**JSON rules that trip people up:** keys need **double quotes**, no trailing comma after the last item, no comments. Paste your file into the Console with `JSON.parse(...)` or open it in the Network tab if it won't load.

---

## Cheat sheet

| I want to… | Code |
|---|---|
| run something later, once | `setTimeout(fn, ms)` |
| run something every few ms | `const id = setInterval(fn, ms)` → `clearInterval(id)` |
| make my own Promise | `new Promise((resolve, reject) => { ... })` |
| use the result | `promise.then(value => ...)` |
| handle any error in the chain | `.catch(error => ...)` |
| clean up either way | `.finally(() => ...)` |
| wait inside a function | `async function f() { const v = await promise; }` |
| handle errors with await | `try { ... } catch (error) { ... } finally { ... }` |
| run many at once | `await Promise.all([p1, p2, p3])` |
| …and keep going if some fail | `await Promise.allSettled([p1, p2])` |
| get data | `const res = await fetch(url);` |
| check it worked | `if (!res.ok) throw new Error("HTTP " + res.status);` |
| read JSON | `const data = await res.json();` |

**Common errors**

| You see | It usually means |
|---|---|
| `Promise {<pending>}` where you expected data | you forgot `await` (or `.then`) |
| `[object Promise]` on the page | same: you used the Promise, not its value |
| `await is only valid in async functions` | add `async` to the function that contains the `await` |
| `Uncaught (in promise) Error` | a Promise rejected and nothing caught it: add `.catch` or `try/catch` |
| `Access ... from origin 'null' has been blocked by CORS` | page opened with `file://`: use Live Server |
| `Unexpected token '<' ... is not valid JSON` | the URL is wrong and you got an HTML 404 page back: check `res.ok` and the path |
| `Failed to fetch` | no internet, or the server is down |
