import { Routes, Route } from "react-router-dom";

function Page({ title, children }) {
  return (
    <div className="panel mx-auto max-w-6xl p-6 mt-6">
      <h1 className="text-xl font-semibold mb-3">{title}</h1>
      {children ?? <p className="text-[var(--muted)]">Content coming soon.</p>}
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Page title="Home" />} />
      <Route path="/collections" element={<Page title="Collections" />} />
      <Route path="/about" element={<Page title="About" />} />
      <Route path="/partnerships" element={<Page title="Partnerships" />} />
      <Route path="/contact" element={
        <Page title="Contact">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const email = new FormData(e.currentTarget).get("email");
              alert(`Subscribed: ${email}`);
              e.currentTarget.reset();
            }}
            className="mt-4 flex gap-2 max-w-md"
          >
            <input className="input flex-1" name="email" type="email" placeholder="Enter your email" required />
            <button className="btn" type="submit">Subscribe</button>
          </form>
        </Page>
      } />
    </Routes>
  );
}
