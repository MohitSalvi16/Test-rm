"""End-to-end demo of the agentic flow (no frontend needed).

Run after `docker compose up -d` and `pip install -r requirements.txt`:
    python -m demo
"""
from app.agents import ingestion_agent, orchestrator
from app.db import SessionLocal, init_db

SAMPLES = [
    ("Asha Verma", "RM-101",
     "I've been trying to increase my credit card limit from the mobile app "
     "but the process is very confusing and there's no confirmation."),
    ("Vikram Shah", "RM-102",
     "My fund transfer was debited but never credited, the app crashed mid-transfer. "
     "This keeps happening to several of my clients."),
    ("Troll User", "RM-103", "bakwas bakwas random nonsense who reads this"),
    ("Neha Gupta", "RM-104",
     "I got an OTP for a transaction I never made. I'm worried my account is compromised."),
]


def main():
    init_db()
    db = SessionLocal()
    try:
        print("== Ingestion ==")
        print(ingestion_agent.ingest_all(db))
        print("\n== Intake ==")
        for name, rm, text in SAMPLES:
            c = orchestrator.intake(db, customer_name=name, rm_id=rm, text=text)
            teams = ", ".join(t.team for t in c.tickets) or "(none — bakwas)"
            print(f"\n[{c.id}] {name} -> {c.category}"
                  f"{'/' + c.department if c.department else ''}"
                  f" (conf {c.confidence:.2f})")
            print(f"   summary : {c.summary}")
            print(f"   solution: {c.solution}")
            print(f"   routed  : {teams}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
