<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Food Compensation Sheet</title>
    <style>
        /* --- 1. Variables and Basic Setup --- */
        :root {
            /* Colors */
            --fuchsia-800: #86198f;
            --pink-700: #be185d;

            /* Light Theme */
            --background: #ffffff;
            --foreground: #020817;
            --muted: #f1f5f9;
            --muted-foreground: #64748b;
            --card: #ffffff;
            --card-foreground: #020817;
            --border: #e2e8f0;
            --input: #e2e8f0;
            --primary: #0a0a0a;
            --secondary: #f1f5f9;
            --secondary-foreground: #0f172a;
        }

        .dark {
            /* Dark Theme */
            --background: #020817;
            --foreground: #fafafa;
            --muted: #1e293b;
            --muted-foreground: #94a3b8;
            --card: #020817;
            --card-foreground: #fafafa;
            --border: #1e293b;
            --input: #1e293b;
            --primary: #fafafa;
            --secondary: #1e293b;
            --secondary-foreground: #fafafa;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
                "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            background-color: var(--background);
            color: var(--foreground);
            transition: background-color 0.3s, color 0.3s;
        }

        #app-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 2rem;
        }

        /* --- 2. Header and Dark Mode Toggle --- */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .header-text h1 {
            font-size: 1.875rem;
            font-weight: 700;
        }

        .header-text p {
            color: var(--muted-foreground);
            margin-top: 0.25rem;
        }

        .dark-mode-toggle {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .dark-mode-toggle input[type="checkbox"] {
            display: none;
        }

        .dark-mode-toggle label {
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1.25rem;
        }

        #moon-icon { display: none; }
        .dark #sun-icon { display: none; }
        .dark #moon-icon { display: block; }


        /* --- 3. Filters Card --- */
        .filters-card {
            background-color: var(--card);
            border-radius: 0.75rem;
            border: 1px solid var(--border);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            padding: 1.5rem;
            margin-bottom: 1.5rem;
        }

        .filters-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            align-items: end;
        }

        .filter-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .search-group {
            grid-column: span 1;
        }

        label {
            font-size: 0.875rem;
            font-weight: 500;
        }

        input[type="text"],
        select {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--input);
            border-radius: 0.5rem;
            background-color: var(--background);
            color: var(--foreground);
            font-size: 0.875rem;
        }

        /* --- 4. Table --- */
        .table-container {
            border: 1px solid var(--border);
            border-radius: 1rem;
            overflow: auto;
            margin-bottom: 1rem;
        }

        table {
            width: 100%;
            text-align: left;
            font-size: 0.875rem;
            border-collapse: collapse;
        }

        thead {
            position: sticky;
            top: 0;
            z-index: 10;
        }

        th {
            background-color: var(--fuchsia-800);
            color: white;
            padding: 0.75rem;
            font-weight: 600;
            white-space: nowrap;
            vertical-align: middle;
        }

        tbody tr {
            border-bottom: 1px solid var(--border);
        }

        tbody tr:last-child {
            border-bottom: none;
        }

        tbody tr:nth-child(odd) {
            background-color: var(--muted-foreground);
            background-color: color-mix(in srgb, var(--muted) 30%, transparent);
        }

        td {
            padding: 0.75rem;
            vertical-align: top;
        }

        td:nth-child(2) { /* Description column */
            line-height: 1.6;
        }

        /* --- 5. Badges and In-Cell Elements --- */
        .badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-weight: 600;
            font-size: 0.75rem;
            background-color: var(--secondary);
            color: var(--secondary-foreground);
        }

        .compensation-cell {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            align-items: flex-start;
        }

        .picture-needed {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            color: var(--pink-700);
            font-weight: 500;
        }

        /* --- 6. Footer --- */
        .footer-note {
            display: flex;
            align-items: flex-start;
            gap: 0.25rem;
            font-size: 0.75rem;
            color: var(--muted-foreground);
        }

        /* --- 7. Media Queries for Responsive Design --- */
        @media (min-width: 1024px) {
            .filters-grid {
                grid-template-columns: repeat(4, 1fr);
            }
            .search-group {
                grid-column: span 2;
            }
        }
    </style>
</head>
<body>
    <div id="app-container">
        <div class="header">
            <div class="header-text">
                <h1>Food Compensation Sheet</h1>
                <p>A quick reference for agents to decide the correct compensation before creating a ticket.</p>
            </div>
            <div class="dark-mode-toggle">
                <input type="checkbox" id="darkModeSwitch" />
                <label for="darkModeSwitch">
                    <span id="sun-icon">☀️</span>
                    <span id="moon-icon">🌙</span>
                </label>
            </div>
        </div>

        <div class="filters-card">
            <div class="filters-grid">
                <div class="filter-group search-group">
                    <label for="search-input">Search</label>
                    <input type="text" id="search-input" placeholder="Search issue, description, resolution…">
                </div>
                <div class="filter-group">
                    <label for="category-select">Category</label>
                    <select id="category-select"></select>
                </div>
                <div class="filter-group">
                    <label for="type-select">Compensation Type</label>
                    <select id="type-select">
                        <option value="all">all</option>
                        <option value="Refund">Refund</option>
                        <option value="Replacement">Replacement</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="table-container">
            <table id="compensation-table">
                <thead>
                    <tr>
                        <th>Complaint Type</th>
                        <th>Description</th>
                        <th>Needed Action / Information</th>
                        <th>Recommended Compensation</th>
                        <th>Notes</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    </tbody>
            </table>
        </div>
        
        <div class="footer-note">
            <span>↓</span>
            <p>End of rules. Always validate compensation with the latest policy updates.</p>
        </div>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            // --- 1. DATA and STATE ---
            const RAW_ROWS = [
                { id: 1, issue: "Bad Quality Food", description: "Not fresh food, undercooked, overcooked, spoiled.", resolution: "100% refund of the item + Delivery Fees", notes: "Request photo evidence when possible.", category: "Food Quality", needsPicture: true },
                { id: 2, issue: "Wrong Temperature (Cold/Hot) Food", description: "Cold food when it should be hot; melted/damaged cold items.", resolution: "Replacement order for item if the customer accepted OR 100% refund of the item + Delivery Fees", notes: "", category: "Food Quality", needsPicture: false },
                { id: 3, issue: "Wrong Order Delivered", description: "Completely different dishes/items.", resolution: "Replacement order for item if the customer accepted OR 100% refund of the item + Delivery Fees", notes: "", category: "Order Issue", needsPicture: false },
                { id: 4, issue: "Missing Items", description: "Main item missing.", resolution: "Replacement order for item if the customer accepted OR 100% refund of the item + Delivery Fees", notes: "", category: "Order Issue", needsPicture: false },
                { id: 5, issue: "Side Item Missing", description: "Side item that should come with the main item (e.g., sauce).", resolution: "For side items, refund 30% of the item amount + the delivery fees", notes: "", category: "Order Issue", needsPicture: false },
                { id: 6, issue: "Add-on Missing", description: "Paid add-on not provided.", resolution: "Full Refund + Delivery Fees", notes: "", category: "Order Issue", needsPicture: false },
                { id: 7, issue: "Orders Cancelled Due to DA or Restaurant Issues", description: "Order cancelled for reasons caused by Delivery Agent or Restaurant.", resolution: "Full Refund + 100–200 EGP (fixed value) for inconvenience.", notes: "", category: "Operational", needsPicture: false },
                { id: 8, issue: "Late Orders", description: "Late order above 15 minutes of the ETA.", resolution: "Full Refund of the total order including the delivery fees", notes: "", category: "Operational", needsPicture: false },
                { id: 9, issue: "Delivery Agent Misconduct", description: "Inappropriate attitude / mishandling food.", resolution: "50% of the order amount; for theft/harassment refund 100% + urgent escalation + follow up", notes: "", category: "Operational", needsPicture: false },
                { id: 10, issue: "Smashed / Spilled", description: "Food smashed or spilled during handling/delivery.", resolution: "Replacement order for item if the customer accepted OR 100% refund of the item + Delivery Fees", notes: "", category: "Food Quality", needsPicture: false },
                { id: 11, issue: "Portion Size Issues", description: "Smaller quantity than advertised/paid for.", resolution: "50% Refund of the item + Delivery Fees", notes: "", category: "Food Quality", needsPicture: false },
                { id: 12, issue: "Out-of-Stock after accepting order", description: "Restaurant accepts order and later notifies an item is out-of-stock.", resolution: "Full Refund of the item + Delivery Fees", notes: "", category: "Operational", needsPicture: false },
                { id: 13, issue: "Technical / System Errors", description: "Duplicate charge, payment deducted but no order received.", resolution: "Full Refund + 100 EGP (fixed value) for inconvenience if customer is frustrated", notes: "", category: "System", needsPicture: false },
                { id: 14, issue: "Goodwill Compensation (CSAT Recovery)", description: "Customer dissatisfaction not tied to major issue (minor delay, minor packaging issue, repetitive complaints).", resolution: "50% of order value OR 100–200 EGP (fixed value) for inconvenience.", notes: "", category: "Goodwill", needsPicture: false },
                { id: 15, issue: "NPS Recovery – Mild", description: "Mild dissatisfaction (first-time NPS drop, minor complaint such as packaging issue or slightly late order)", resolution: "100 EGP (fixed value) for inconvenience.", notes: "", category: "Goodwill", needsPicture: false },
                { id: 16, issue: "NPS Recovery – Moderate", description: "Moderate dissatisfaction (clear service failure — late order with missing items, incorrect meal, or repeated inconvenience).", resolution: "200 EGP (fixed value) for inconvenience.", notes: "", category: "Goodwill", needsPicture: false },
                { id: 17, issue: "NPS Recovery – Severe", description: "Severe dissatisfaction (high-risk churn: food safety complaints, multiple NPS drops within 3 months, or unresolved escalations).", resolution: "300 EGP (fixed value) for inconvenience.", notes: "", category: "Goodwill", needsPicture: false },
                { id: 18, issue: "Food Safety – Moderate", description: "Confirmed foreign object, repeated illness complaints, or medical note/proof provided.", resolution: "Full Refund + 300 EGP (fixed value) for inconvenience.", notes: "Request photo evidence when possible.", category: "Food Safety", needsPicture: true }
            ];

            const state = {
                query: "",
                category: "all",
                typeFilter: "all",
                dark: true,
            };

            // --- 2. DOM ELEMENTS ---
            const searchInput = document.getElementById("search-input");
            const categorySelect = document.getElementById("category-select");
            const typeSelect = document.getElementById("type-select");
            const darkModeSwitch = document.getElementById("darkModeSwitch");
            const tableBody = document.querySelector("#compensation-table tbody");
            const root = document.documentElement;

            // --- 3. HELPER FUNCTIONS ---
            const compType = (text) => {
                const t = (text || "").toLowerCase();
                if (t.includes("replacement")) return "Replacement";
                if (t.includes("refund")) return "Refund";
                if (t.includes("egp") || /\b\d{2,3}\b/.test(t)) return "Fixed";
                return "Other";
            };

            // --- 4. RENDER and FILTER LOGIC ---
            const renderTable = () => {
                // Filter logic
                let rows = RAW_ROWS.slice();
                if (state.category !== "all") rows = rows.filter((r) => r.category === state.category);
                if (state.typeFilter !== "all") rows = rows.filter((r) => compType(r.resolution) === state.typeFilter);
                if (state.query.trim()) {
                    const q = state.query.toLowerCase();
                    rows = rows.filter((r) => [r.issue, r.description, r.resolution, r.notes, r.category].join("\n").toLowerCase().includes(q));
                }

                // Render rows
                tableBody.innerHTML = rows.map(r => `
                    <tr>
                        <td class="font-medium">${r.issue}</td>
                        <td>${r.description}</td>
                        <td>${r.needsPicture ? `<span class="picture-needed">📷 Picture</span>` : '—'}</td>
                        <td>
                            <div class="compensation-cell">
                                <span class="badge">${compType(r.resolution)}</span>
                                <span>${r.resolution}</span>
                            </div>
                        </td>
                        <td>${r.notes || '—'}</td>
                        <td><span class="badge">${r.category}</span></td>
                    </tr>
                `).join("");
            };
            
            // --- 5. DARK MODE LOGIC ---
            const applyTheme = () => {
                if (state.dark) root.classList.add('dark');
                else root.classList.remove('dark');
                darkModeSwitch.checked = state.dark;
            };

            // --- 6. INITIALIZATION ---
            const init = () => {
                // Populate category dropdown
                const categories = ["all", ...new Set(RAW_ROWS.map(r => r.category))];
                categorySelect.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join("");
                
                // Setup event listeners
                searchInput.addEventListener("input", (e) => {
                    state.query = e.target.value;
                    renderTable();
                });
                categorySelect.addEventListener("change", (e) => {
                    state.category = e.target.value;
                    renderTable();
                });
                typeSelect.addEventListener("change", (e) => {
                    state.typeFilter = e.target.value;
                    renderTable();
                });
                darkModeSwitch.addEventListener("change", (e) => {
                    state.dark = e.target.checked;
                    applyTheme();
                });

                // Initial render
                applyTheme();
                renderTable();
            };

            // --- 7. START THE APP ---
            init();
        });
    </script>
</body>
</html>
