# pages/ — Pantallas

Cada archivo es una pantalla completa que **compone** componentes y consume hooks/contextos.
Es el único lugar donde se conectan datos (hooks) con presentación (components).

✅ Permitido: `components/`, `hooks/`, `context/`.
❌ Prohibido: llamar a `services/` directamente.
