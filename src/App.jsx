import { useState } from "react";

const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    green: "bg-green-100 text-green-800",
    purple: "bg-purple-100 text-purple-800",
    gray: "bg-gray-100 text-gray-700",
    orange: "bg-orange-100 text-orange-800",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[color]}`}>
      {children}
    </span>
  );
};

const RiskBar = ({ level }) => {
  const w = level === "Alto" ? "w-full" : level === "Medio" ? "w-2/3" : "w-1/3";
  const c = level === "Alto" ? "bg-red-500" : level === "Medio" ? "bg-yellow-500" : "bg-green-500";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${c} ${w}`} />
      </div>
      <span className="text-xs text-gray-500">{level}</span>
    </div>
  );
};

const ProgressRing = ({ pct, size = 56, stroke = 5, color = "#3b82f6" }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="block">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fontSize="13" fontWeight="700" fill="#1f2937">
        {pct}%
      </text>
    </svg>
  );
};

function ArchDiagram() {
  const boxStyle = (color) => {
    const map = {
      blue: { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af" },
      green: { bg: "#f0fdf4", border: "#86efac", text: "#166534" },
      orange: { bg: "#fff7ed", border: "#fdba74", text: "#9a3412" },
      purple: { bg: "#faf5ff", border: "#c4b5fd", text: "#5b21b6" },
      gray: { bg: "#f9fafb", border: "#d1d5db", text: "#374151" },
      red: { bg: "#fef2f2", border: "#fca5a5", text: "#991b1b" },
      teal: { bg: "#f0fdfa", border: "#5eead4", text: "#115e59" },
    };
    return map[color] || map.gray;
  };

  const Box = ({ x, y, w, h, label, sub, color = "gray", icon }) => {
    const s = boxStyle(color);
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={8} fill={s.bg} stroke={s.border} strokeWidth={1.5} />
        {icon && <text x={x + 12} y={y + (sub ? 22 : h/2 + 2)} fontSize="13" fill={s.text}>{icon}</text>}
        <text x={x + (icon ? 28 : w/2)} y={y + (sub ? 22 : h/2 + 2)} fontSize="11.5" fontWeight="600" fill={s.text} textAnchor={icon ? "start" : "middle"}>{label}</text>
        {sub && <text x={x + (icon ? 28 : w/2)} y={y + 38} fontSize="9.5" fill="#6b7280" textAnchor={icon ? "start" : "middle"}>{sub}</text>}
      </g>
    );
  };

  const ElbowArrow = ({ x1, y1, x2, y2, label, dashed, midY }) => {
    const my = midY || (y1 + y2) / 2;
    const path = `M${x1},${y1} L${x1},${my} L${x2},${my} L${x2},${y2}`;
    return (
      <g>
        <path d={path} fill="none" stroke="#b0b8c4" strokeWidth={1.2}
          markerEnd="url(#ah)" strokeDasharray={dashed ? "5,3" : "none"} />
        {label && (
          <g>
            <rect x={(x1+x2)/2 - 22} y={my - 9} width={44} height={14} rx={3} fill="white" />
            <text x={(x1+x2)/2} y={my + 1} fontSize="8" fill="#9ca3af" textAnchor="middle" fontWeight="500">{label}</text>
          </g>
        )}
      </g>
    );
  };

  const StraightArrow = ({ x1, y1, x2, y2, label, dashed }) => (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b0b8c4" strokeWidth={1.2}
        markerEnd="url(#ah)" strokeDasharray={dashed ? "5,3" : "none"} />
      {label && (
        <g>
          <rect x={(x1+x2)/2 - 24} y={(y1+y2)/2 - 14} width={48} height={14} rx={3} fill="white" />
          <text x={(x1+x2)/2} y={(y1+y2)/2 - 5} fontSize="8" fill="#9ca3af" textAnchor="middle" fontWeight="500">{label}</text>
        </g>
      )}
    </g>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 overflow-x-auto">
      <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Arquitectura de Integración</h2>
      <svg viewBox="0 0 780 560" className="w-full" style={{ minWidth: 700 }}>
        <defs>
          <marker id="ah" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#b0b8c4" />
          </marker>
        </defs>

        <rect x={0} y={0} width={780} height={105} fill="#fafafa" />
        <text x={20} y={18} fontSize="9" fill="#b0b0b0" fontWeight="600" letterSpacing="1">ENTRADA</text>
        <line x1={0} y1={105} x2={780} y2={105} stroke="#e5e7eb" strokeWidth={0.5} />

        <rect x={0} y={105} width={780} height={195} fill="#ffffff" />
        <text x={20} y={123} fontSize="9" fill="#b0b0b0" fontWeight="600" letterSpacing="1">PROCESAMIENTO</text>

        <rect x={0} y={300} width={780} height={120} fill="#fafafa" />
        <text x={20} y={318} fontSize="9" fill="#b0b0b0" fontWeight="600" letterSpacing="1">SISTEMAS REPSOL</text>
        <line x1={0} y1={300} x2={780} y2={300} stroke="#e5e7eb" strokeWidth={0.5} />

        <rect x={0} y={420} width={780} height={50} fill="#ffffff" />
        <line x1={0} y1={420} x2={780} y2={420} stroke="#e5e7eb" strokeWidth={0.5} />

        <rect x={0} y={470} width={780} height={90} fill="#fafafa" />
        <text x={20} y={488} fontSize="9" fill="#b0b0b0" fontWeight="600" letterSpacing="1">POST-LLAMADA</text>
        <line x1={0} y1={470} x2={780} y2={470} stroke="#e5e7eb" strokeWidth={0.5} />

        <Box x={30} y={35} w={120} h={50} label="Cliente" sub="Llamada entrante" color="gray" icon="📞" />
        <StraightArrow x1={150} y1={60} x2={200} y2={60} />
        <Box x={205} y={35} w={140} h={50} label="Genesys CTI" sub="IVR + Seguridad básica" color="blue" icon="🔀" />
        <StraightArrow x1={345} y1={60} x2={395} y2={60} label="SIP Trunk" />
        <Box x={400} y={30} w={160} h={60} label="HappyRobot Agent" sub="Recibe la llamada" color="green" icon="🤖" />
        <StraightArrow x1={560} y1={60} x2={610} y2={60} />
        <Box x={615} y={35} w={145} h={50} label="Validación OTP" sub="Determinista · Email" color="orange" icon="🔐" />

        <rect x={140} y={135} width={500} height={155} rx={12} fill="#f0fdf4" stroke="#86efac" strokeWidth={1.8} />
        <text x={165} y={156} fontSize="10" fontWeight="700" fill="#166534" letterSpacing="0.5">PLATAFORMA HAPPYROBOT</text>

        <Box x={160} y={168} w={140} h={42} label="Voice Engine" sub="STT / TTS" color="green" />
        <Box x={320} y={168} w={150} h={42} label="LLM Orchestrator" sub="Lógica de negocio" color="green" />
        <Box x={490} y={168} w={130} h={42} label="PDF Engine" sub="OCR / Texto" color="green" />

        <Box x={160} y={228} w={140} h={42} label="Knowledge Base" sub="FAQs · Argumentarios" color="green" />
        <Box x={320} y={228} w={150} h={42} label="Run Storage" sub="Transcript · Audit" color="green" />
        <Box x={490} y={228} w={130} h={42} label="Dashboard" sub="Métricas ops" color="green" />

        <ElbowArrow x1={230} y1={290} x2={125} y2={335} label="APIs REST" midY={312} />
        <ElbowArrow x1={395} y1={290} x2={335} y2={335} label="PDF / API" midY={312} />
        <ElbowArrow x1={500} y1={290} x2={535} y2={335} label="API / RFC" midY={312} />
        <ElbowArrow x1={570} y1={290} x2={705} y2={335} label="API / RFC" midY={312} dashed />

        <Box x={40} y={335} w={170} h={55} label="Salesforce" sub="Service + Experience Cloud" color="blue" icon="☁️" />
        <Box x={250} y={335} w={170} h={55} label="Sist. Facturador" sub="PDFs facturas" color="orange" icon="📄" />
        <Box x={460} y={335} w={150} h={55} label="SAP ISU" sub="Cambio titular · XML distrib." color="purple" icon="⚡" />
        <Box x={650} y={335} w={110} h={55} label="SAP BP5/UP2" sub="GLP · Fase 2" color="gray" icon="🛢️" />

        <rect x={475} y={395} width={120} height={16} rx={5} fill="#faf5ff" stroke="#c4b5fd" strokeWidth={0.8} />
        <text x={535} y={406} fontSize="8" fill="#5b21b6" textAnchor="middle" fontWeight="500">→ Robin Home (XML)</text>

        <text x={390} y={440} fontSize="9" fill="#9ca3af" textAnchor="middle" fontWeight="600" letterSpacing="0.5">▼  WRAP-UP AUTOMÁTICO  ▼</text>

        <Box x={40} y={495} w={200} h={48} label="Caso en Salesforce" sub="Cerrado · Tipificado · Origen voz" color="blue" icon="✅" />
        <Box x={290} y={495} w={200} h={48} label="HR Platform" sub="Grabación · Transcript · Detalle" color="green" icon="📊" />
        <Box x={540} y={495} w={200} h={48} label="Dashboard Repsol" sub="Link SF → HR para auditoría" color="purple" icon="🔗" />
      </svg>
    </div>
  );
}

export default function RepsolScoping() {
  const [view, setView] = useState("commercial");
  const [expandedCase, setExpandedCase] = useState(null);
  const toggleCase = (id) => setExpandedCase(expandedCase === id ? null : id);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-bold text-gray-900">Repsol × HappyRobot</h1>
                <Badge color="purple">Scoping Interno</Badge>
              </div>
              <p className="text-sm text-gray-500">Primer agente de voz IA en Repsol · Evaluación de proyecto</p>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              <button onClick={() => setView("commercial")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${view === "commercial" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                Comercial
              </button>
              <button onClick={() => setView("technical")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${view === "technical" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                Técnica
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-6">
        {view === "commercial" ? <CommercialView expandedCase={expandedCase} toggleCase={toggleCase} /> : <TechnicalView expandedCase={expandedCase} toggleCase={toggleCase} />}
      </div>
    </div>
  );
}

function CommercialView({ expandedCase, toggleCase }) {
  const cases = [
    {
      id: "billing", name: "Consulta Facturación + Duplicado", vol: "400K llamadas/año",
      priority: "P0", pColor: "red", timeline: "4 semanas", fde: "1 FDE", confidence: 85,
      detail: {
        description: "El 95% de las llamadas es 'mi factura es distinta al mes anterior'. Flujo bien definido con árbol de decisión documentado por Repsol.",
        metrics: [{ label: "Consulta", value: "~9 min" }, { label: "Duplicado", value: "~10 min" }],
        integrations: ["Sistema Facturador (PDFs)", "Salesforce (APIs chatbot)"],
        advantages: ["Duplicado ya agentificado en chatbot → APIs reutilizables", "Árbol de decisión documentado", "Flujo más predecible de los 4 casos"],
        blockers: [{ text: "Acceso a PDFs del facturador en semana 1", owner: "Repsol" }],
        flowSteps: ["Cliente llama", "Cotejar 2 facturas (actual vs anterior)", "Check lectura real vs estimada", "Árbol: consumo → precios → cambios tarifarios", "Argumentario"],
      },
    },
    {
      id: "titular", name: "Cambio de Titular", vol: "150K contactos/año · 50K cambios",
      priority: "P1", pColor: "orange", timeline: "4 semanas", fde: "1 FDE", confidence: 60,
      detail: {
        description: "Dos subflujos: consulta informativa (solo KB, trivial) y ejecución del cambio (complejo, recopilación intensiva de datos).",
        metrics: [{ label: "TMO actual", value: "~22 min" }, { label: "Cambios/año", value: "~50K" }],
        integrations: ["Salesforce (Lightning custom multipaso)", "SAP ISU", "Robin Home (XML distribuidora)"],
        advantages: ["Subflujo informativo no requiere integración", "Proceso ya existe en SF → posible reutilización"],
        blockers: [
          { text: "Sesión técnica días 1-5 para definir integración SF + SAP ISU", owner: "HR + Repsol" },
          { text: "Si custom SF no es reutilizable → posible extensión", owner: "Evaluar" },
        ],
        flowSteps: ["Validar titular saliente (seguridad)", "¿Cliente existente o nuevo?", "Recopilar datos entrante (banco, email, dirección...)", "Lanzar solicitud en SF → XML a distribuidora", "Confirmación 24-48h"],
        flag: "TMO de 22 min con asterisco: proceso recién cambiado, agentes en curva de aprendizaje",
      },
    },
    {
      id: "orders", name: "Pedidos – Negocios Principales (VVDD + GLP)", vol: "Volumen menor, alto valor B2B",
      priority: "P1", pColor: "orange", timeline: "4 semanas", fde: "1 FDE", confidence: 70,
      detail: {
        description: "Clientes B2B críticos: dueños de gasolineras (VVDD) y GLP envasado/granel. Tiempos de respuesta son clave — dejar esperando a un dueño de estación de servicio hace más daño que a un cliente residencial.",
        metrics: [{ label: "VVDD", value: "~4.5 min" }, { label: "GLP", value: "~7 min" }],
        integrations: ["Salesforce (VVDD directo)", "SAP (GLP)"],
        advantages: ["Flujo conceptualmente simple", "VVDD reutiliza integración SF de casos anteriores", "Demuestra escalabilidad a distintos negocios"],
        blockers: [{ text: "GLP requiere integración SAP adicional", owner: "Repsol" }],
        flowSteps: ["Validar cliente", "Seleccionar unidad", "Seleccionar producto (catálogo por negocio)", "Grabar pedido", "Confirmar"],
      },
    },
    {
      id: "others", name: "Otros Negocios (Variable)", vol: "Variable",
      priority: "P2", pColor: "gray", timeline: "Por definir *", fde: "—", confidence: 50,
      detail: {
        description: "Cada negocio adicional fuera de VVDD y GLP requiere integraciones específicas con catálogos de producto diferentes. No bloquea el proyecto.",
        metrics: [],
        integrations: ["SAP BP5", "SAP UP2", "Nace"],
        advantages: ["Crecimiento a medio plazo", "Reutiliza lógica core del agente de pedidos"],
        blockers: [{ text: "Acceso a cada sistema SAP depende de Repsol", owner: "Repsol" }],
        flowSteps: ["Mismo flujo base que VVDD/GLP", "Catálogo de productos diferente por negocio", "Integración SAP específica por sistema"],
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Llamadas/año objetivo", value: "~550K+", sub: "400K facturación + 150K titular" },
          { label: "Coste llamada humana", value: "3,5–4,5€", sub: "Mix tipologías · Sin CTI" },
          { label: "Target resolución", value: "30%", sub: "\"Les soluciona la vida\" — Repsol" },
          { label: "Timeline (1 FDE)", value: "~3 meses", sub: "Secuencial · 3 casos core" },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{k.label}</p>
            <p className="text-2xl font-bold text-gray-900">{k.value}</p>
            <p className="text-xs text-gray-400 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Casos de Uso – Scoping</h2>
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Caso de uso</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">FDE</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Semanas</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Volumen/año</th>
                <th className="text-center px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Prioridad</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Consulta Facturación + Duplicado", fde: "1", weeks: "4", vol: "400K", p: "P0", pColor: "red" },
                { name: "Cambio de Titular", fde: "1", weeks: "4", vol: "150K", p: "P1", pColor: "orange" },
                { name: "Pedidos Negocios Principales (VVDD + GLP)", fde: "1", weeks: "4", vol: "—", p: "P1", pColor: "orange" },
                { name: "Otros Negocios (variable)", fde: "—", weeks: "*", vol: "Variable", p: "P2", pColor: "gray" },
              ].map((r, i) => (
                <tr key={i} className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                  <td className="px-4 py-3 font-medium text-gray-800">{r.name}</td>
                  <td className="text-center px-3 py-3"><span className="bg-blue-50 text-blue-700 font-bold text-xs px-2 py-0.5 rounded">{r.fde}</span></td>
                  <td className="text-center px-3 py-3 font-semibold text-gray-700">{r.weeks}</td>
                  <td className="text-center px-3 py-3 text-gray-500">{r.vol}</td>
                  <td className="text-center px-3 py-3"><Badge color={r.pColor}>{r.p}</Badge></td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-semibold">
                <td className="px-4 py-3 text-gray-900">Total (3 casos core)</td>
                <td className="text-center px-3 py-3"><span className="bg-blue-100 text-blue-800 font-bold text-xs px-2 py-0.5 rounded">1 FDE</span></td>
                <td className="text-center px-3 py-3 text-gray-900">~12</td>
                <td className="text-center px-3 py-3 text-gray-600">550K+</td>
                <td className="text-center px-3 py-3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Detalle por Caso de Uso</h2>
        <div className="space-y-3">
          {cases.map((c) => (
            <div key={c.id} className="border border-gray-100 rounded-lg overflow-hidden">
              <button onClick={() => toggleCase(c.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Badge color={c.pColor}>{c.priority}</Badge>
                  <span className="font-semibold text-sm text-gray-900">{c.name}</span>
                  <span className="text-xs text-gray-400">{c.vol}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">{c.timeline} · {c.fde}</span>
                  <ProgressRing pct={c.confidence} size={40} stroke={4}
                    color={c.confidence >= 75 ? "#22c55e" : c.confidence >= 60 ? "#f59e0b" : "#9ca3af"} />
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedCase === c.id ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {expandedCase === c.id && (
                <div className="px-4 pb-4 border-t border-gray-100 mt-0">
                  <p className="text-sm text-gray-600 mt-3 mb-4">{c.detail.description}</p>
                  {c.detail.flag && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 mb-4 text-xs text-orange-800">
                      ⚠ {c.detail.flag}
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {c.detail.metrics.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Duración</p>
                        <div className="space-y-1.5">
                          {c.detail.metrics.map((m, i) => (
                            <div key={i} className="flex items-center justify-between bg-gray-50 rounded-md px-3 py-1.5">
                              <span className="text-xs text-gray-600">{m.label}</span>
                              <span className="text-sm font-bold text-gray-800">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Integraciones</p>
                      <div className="space-y-1.5">
                        {c.detail.integrations.map((intg, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                            {intg}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">A favor</p>
                      <div className="space-y-1.5">
                        {c.detail.advantages.map((adv, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                            <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                            {adv}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Flujo</p>
                    <div className="flex items-center gap-1 flex-wrap">
                      {c.detail.flowSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">{step}</span>
                          {i < c.detail.flowSteps.length - 1 && <span className="text-gray-300 text-xs">→</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Dependencias</p>
                    {c.detail.blockers.map((b, i) => (
                      <div key={i} className="flex items-center justify-between bg-red-50 rounded-md px-3 py-2 mb-1.5">
                        <span className="text-xs text-red-800">{b.text}</span>
                        <Badge color="red">{b.owner}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">% = confianza de cumplir timeline estimado sin bloqueos · * Depende de integraciones y casuísticas por negocio</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Duración Media por Caso de Uso</h2>
        <div className="space-y-3">
          {[
            { name: "Cambio de titular (EyG)", secs: 1322, min: "~22 min", flag: true },
            { name: "Duplicado de factura (EyG)", secs: 592, min: "~10 min" },
            { name: "Consulta facturación (EyG)", secs: 532, min: "~9 min" },
            { name: "Pedidos GLP (Envasado + Granel)", secs: 407, min: "~7 min" },
            { name: "Pedidos VVDD", secs: 273, min: "~4.5 min" },
          ].map((d, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-52 shrink-0">
                <p className="text-sm font-medium text-gray-800">{d.name}</p>
              </div>
              <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden relative">
                <div className={`h-full rounded-full ${d.flag ? "bg-orange-400" : "bg-blue-500"}`}
                  style={{ width: `${Math.min((d.secs / 1400) * 100, 100)}%` }} />
              </div>
              <div className="w-20 text-right">
                <span className="text-sm font-semibold text-gray-700">{d.min}</span>
              </div>
              <div className="w-16 text-right">
                <span className="text-xs text-gray-400">{d.secs}s</span>
              </div>
            </div>
          ))}
          <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
            <span>⚠</span> Cambio de titular: Loreto indica que el proceso acaba de cambiar completamente y los agentes están en curva de aprendizaje. Duración real probablemente menor.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Valoración de la Oportunidad</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-semibold text-green-700 mb-2">A FAVOR</h3>
            <ul className="space-y-2">
              {[
                "Volumen alto (550K+ llamadas/año) → revenue recurrente significativo",
                "Equipo técnico dedicado en Repsol (Marta, Ana, Luis) → célula de trabajo ya formada",
                "APIs parcialmente existentes del chatbot → reutilizables para facturación y duplicado",
                "Proceso de duplicado de factura ya agentificado → integración validada",
                "Target de éxito bajo (30% resolución) → alta probabilidad de 'win'",
                "Coste por llamada humana conocido (3,5-4,5€) → fácil demostrar ROI",
                "Caso P0 (facturación) tiene flujo bien definido con árbol de decisión documentado",
                "Validación de identidad (OTP) ya existente y reutilizable → no hay que construirla",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-red-700 mb-2">EN CONTRA / RIESGOS</h3>
            <ul className="space-y-2">
              {[
                "Compliance de gran empresa → puede retrasar go-live semanas/meses",
                "Dependencia fuerte de que Repsol abra accesos a tiempo",
                "Ecosistema Salesforce custom desde 2018 → posibles sorpresas técnicas",
                "Llamadas largas (9-22 min) → coste por llamada elevado si modelo por minuto",
                "SAP ISU + BP5 + UP2 + Nace → complejidad de integraciones alta en fases 2+",
                "Primer proyecto en energy/utilities → curva de aprendizaje de dominio",
                "Cambio de titular: proceso recién modificado, datos de TMO no estabilizados",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-red-400 mt-0.5 shrink-0">✗</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechnicalView({ expandedCase, toggleCase }) {
  return (
    <div className="space-y-6">
      <ArchDiagram />

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Mapa de Integraciones</h2>
        <div className="space-y-3">
          {[
            { sys: "Genesys (CTI)", method: "SIP Trunk", complexity: "Bajo", status: "Por configurar",
              detail: "Nos traemos la llamada tras el IVR. No tocamos el IVR existente. Configuración estándar de SIP trunk." },
            { sys: "Salesforce (Service Console + Experience Cloud)", method: "APIs REST/SOAP", complexity: "Medio-Alto", status: "Parcialmente existente",
              detail: "Custom desde 2018. Dos entornos (Service Console y Partner Portal) con misma BBDD por detrás. APIs del chatbot parcialmente reutilizables. Componente Lightning custom para cambio titular → evaluar si podemos invocarlo vía API. Wrap-up automático: crear caso con tipificación." },
            { sys: "Sistema Facturador Externo", method: "API / Descarga PDF", complexity: "Medio", status: "Bloqueante – sin acceso",
              detail: "Los PDFs de factura NO están en Salesforce. Dato crítico (lectura real vs. estimada) solo está en el PDF o el sistema origen, no en las APIs actuales. Decisión pendiente: ¿leer PDF directamente o ir al sistema origen? HR tiene capacidad de OCR/texto directo resuelta." },
            { sys: "SAP ISU", method: "API/RFC", complexity: "Alto", status: "Necesario para cambio titular",
              detail: "Leer y escribir en múltiples pasos del proceso guiado de cambio de titular. Interacción con Robin Home para XML a distribuidora. Salesforce debe ser SSOT: nosotros NO mandamos XML, hacemos que SF lance el proceso." },
            { sys: "SAP BP5 / UP2 / Nace", method: "API/RFC", complexity: "Alto", status: "Solo Fase 2 (Otros negocios)",
              detail: "Cada negocio adicional fuera de VVDD y GLP requiere integración con un SAP distinto y catálogo de productos diferente. No bloquea el proyecto." },
            { sys: "OTP / Validación Identidad", method: "Sistema determinista", complexity: "Bajo", status: "Existente",
              detail: "No agéntico. OTP por email al cliente registrado. Agente no avanza hasta confirmación. Doble capa: sistema valida + agente cambia de estado interno (no validado → validado)." },
          ].map((intg, i) => (
            <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
              <button onClick={() => toggleCase(`int-${i}`)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm text-gray-900">{intg.sys}</span>
                  <Badge color="blue">{intg.method}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <RiskBar level={intg.complexity} />
                  <Badge color={intg.status.includes("Bloqueante") ? "red" : intg.status.includes("existente") || intg.status.includes("Existente") ? "green" : "yellow"}>
                    {intg.status}
                  </Badge>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedCase === `int-${i}` ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {expandedCase === `int-${i}` && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{intg.detail}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Blockers y Riesgos Técnicos</h2>
        <div className="space-y-3">
          {[
            { blocker: "Acceso al sistema facturador / PDFs", impact: "Alto", owner: "Repsol", deadline: "Semana 1",
              mitigation: "Sin esto no arranca el caso P0. Procesamiento PDF resuelto por HR. La dependencia es 100% de acceso." },
            { blocker: "Acceso API al proceso guiado de cambio de titular", impact: "Alto", owner: "Repsol", deadline: "Días 1-5",
              mitigation: "Sesión técnica con Marta/Ana/Luis para definir arquitectura de integración SF + SAP ISU." },
            { blocker: "Compliance y ciberseguridad (primer agente voz)", impact: "Alto", owner: "Repsol", deadline: "Pre go-live",
              mitigation: "Ya pasaron por esto con el chatbot. Propuesta: que no bloquee desarrollo, solo despliegue. Separar build de release." },
            { blocker: "Customización SF no reutilizable (cambio titular)", impact: "Medio", owner: "HappyRobot + Repsol", deadline: "Sesión técnica inicial",
              mitigation: "Si el componente Lightning custom no es invocable vía API, hay que reconstruir lógica → posible extensión." },
            { blocker: "Acceso a sistemas SAP (BP5, UP2, Nace)", impact: "Medio", owner: "Repsol", deadline: "Fase 2",
              mitigation: "No bloquea el proyecto. VVDD solo usa SF. Cada SAP adicional suma tiempo." },
            { blocker: "Velocidad de respuesta equipo técnico Repsol", impact: "Medio", owner: "Repsol", deadline: "Transversal",
              mitigation: "Equipo ya establecido (Marta, Ana, Luis). Riesgo de bottleneck si tienen otras prioridades." },
          ].map((b, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="shrink-0 mt-0.5">
                <div className={`w-3 h-3 rounded-full ${b.impact === "Alto" ? "bg-red-500" : "bg-yellow-500"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-gray-900">{b.blocker}</p>
                  <Badge color={b.impact === "Alto" ? "red" : "yellow"}>{b.impact}</Badge>
                </div>
                <p className="text-xs text-gray-600">{b.mitigation}</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-xs text-gray-400">Owner: <span className="text-gray-600">{b.owner}</span></span>
                  <span className="text-xs text-gray-400">Deadline: <span className="text-gray-600">{b.deadline}</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Plan de Ejecución – 1 FDE Secuencial</h2>
        <div className="space-y-4">
          <div className="relative">
            <div className="flex items-center gap-1 mb-2">
              {["Mes 1", "Mes 2", "Mes 3", "Mes 4"].map((w, i) => (
                <div key={i} className="flex-1 text-center text-xs text-gray-400 font-medium">{w}</div>
              ))}
            </div>
            {[
              { name: "Facturación + Duplicado", start: 0, end: 1, color: "bg-blue-500", tag: "P0 · Quick win" },
              { name: "Cambio de Titular", start: 1, end: 2, color: "bg-orange-500", tag: "P1" },
              { name: "Pedidos VVDD + GLP", start: 2, end: 3, color: "bg-green-500", tag: "P1 · Negocios principales" },
              { name: "Otros negocios", start: 3, end: 4, color: "bg-gray-300", tag: "P2 *" },
            ].map((bar, i) => (
              <div key={i} className="flex items-center gap-2 mb-2.5">
                <div className="w-44 text-xs text-gray-600 text-right shrink-0 font-medium">{bar.name}</div>
                <div className="flex-1 h-8 bg-gray-100 rounded relative">
                  <div className={`absolute h-full ${bar.color} rounded flex items-center px-3`}
                    style={{ left: `${(bar.start / 4) * 100}%`, width: `${((bar.end - bar.start) / 4) * 100}%` }}>
                    <span className="text-xs text-white font-medium whitespace-nowrap">{bar.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4 grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs font-bold text-blue-800">MES 1</p>
              <p className="text-xs text-blue-700 mt-1">Facturación como quick win. Dependencia: acceso PDFs semana 1. Alta confianza (85%).</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-xs font-bold text-orange-800">MES 2</p>
              <p className="text-xs text-orange-700 mt-1">Cambio titular. Riesgo de extensión si SF custom no reutilizable. Sesión técnica crítica en día 1.</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs font-bold text-green-800">MES 3</p>
              <p className="text-xs text-green-700 mt-1">VVDD (SF directo) + GLP (SAP). Reutiliza integración SF de casos anteriores.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
        <h2 className="text-sm font-bold text-red-800 mb-3">DECISIONES TÉCNICAS PENDIENTES</h2>
        <div className="space-y-2">
          {[
            "¿PDF directo vs. sistema facturador origen para dato de lectura real/estimada?",
            "Arquitectura de integraciones con Salesforce",
            "¿Componente Lightning custom de cambio titular es invocable vía API?",
            "Definición de SIP trunk con Genesys → configuración y testing",
          ].map((d, i) => (
            <div key={i} className="flex gap-2 text-sm text-red-900 bg-white rounded-lg p-3 border border-red-100">
              <span className="shrink-0 font-bold text-red-500">?</span>{d}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
