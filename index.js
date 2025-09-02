// script.js

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
