import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import AppRoutes from "./Routes.jsx";

import "./styles/tailwind.css";
import "./styles/index.css";

function RootApp() {
  const [sampleOpen, setSampleOpen] = useState(false);

  return (
    <>
      <Navbar onOpenSample={() => setSampleOpen(true)} />
      {/* page content */}
      <div style={{ paddingTop: "64px" }}>
        <AppRoutes />
      </div>

      {/* Right-side drawer for “Request Sample” */}
      {sampleOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSampleOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="panel absolute right-0 top-0 h-full max-w-md w-full p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Request Sample"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Request a Sample</h3>
              <button className="link" onClick={() => setSampleOpen(false)}>
                Close
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const email = data.get("email");
                alert(`Sample request submitted${email ? ` for ${email}` : ""}!`);
                setSampleOpen(false);
              }}
              className="grid gap-3"
            >
              <input className="input" placeholder="Full name" name="name" required />
              <input className="input" placeholder="Company" name="company" />
              <input className="input" type="email" placeholder="Email" name="email" required />
              <input className="input" type="number" min="1" placeholder="Yards needed" name="yards" />
              <button className="btn" type="submit">Submit</button>
            </form>
          </aside>
        </div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RootApp />
  </BrowserRouter>
);
