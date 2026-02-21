import logoLight from "./logo-light.svg";

export function Welcome() {
  return (
    <main style={{ padding: "4rem 1rem", textAlign: "center" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <header style={{ marginBottom: "2rem" }}>
          <img src={logoLight} alt="FleetFlow" style={{ maxWidth: "100%", height: "auto" }} />
        </header>
        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <p style={{ marginBottom: "1rem", color: "#666" }}>Welcome to FleetFlow!</p>
        </div>
      </div>
    </main>
  );
}
