
import { TreeNode, NodeType } from '../types';

export const INITIAL_NODE_ID_ES = 'Q1';

export const DIAGNOSTIC_TREE_DATA_ES: Record<string, TreeNode> = {
  Q1: { 
    id: 'Q1', 
    type: NodeType.QUESTION, 
    text: "¿La gestión actual refleja las etapas críticas de la invasión biológica?", 
    details: "Esta evaluación verifica si la estrategia local reconoce las fases desde la llegada y el establecimiento hasta la propagación rápida. Una gobernanza efectiva debe adaptar sus herramientas según la invasión sea inicial o masiva.",
    position: { x: 500, y: 50 }, 
    yesNodeId: 'Q2', 
    noNodeId: 'I1' 
  },
  Q2: { 
    id: 'Q2', 
    type: NodeType.QUESTION, 
    text: "¿Se priorizan indicadores de diagnóstico (densidad, expansión, riesgo de incendio)?", 
    details: "El uso de indicadores específicos permite establecer una línea base medible. Si estos no se priorizan, la gestión se vuelve reactiva en lugar de basarse en evidencia.",
    position: { x: 300, y: 150 }, 
    yesNodeId: 'Q5', 
    noNodeId: 'I2' 
  },
  I1: { 
    id: 'I1', 
    type: NodeType.INTERVENTION, 
    text: "Alinear estrategia con etapas ecológicas de invasión.", 
    details: "Reestructurar el plan de gestión para incluir protocolos específicos de detección temprana frente a control de largo plazo.",
    position: { x: 700, y: 150 }, 
    nextNodeId: 'Q2' 
  },
  I2: { 
    id: 'I2', 
    type: NodeType.INTERVENTION, 
    text: "Implementar monitoreo ecológico estandarizado.", 
    details: "Definir un conjunto de indicadores clave (KPI) como la tasa de expansión anual y la carga de combustible cerca de interfaces urbanas.",
    position: { x: 200, y: 250 }, 
    nextNodeId: 'Q5' 
  },
  Q5: { 
    id: 'Q5', 
    type: NodeType.QUESTION, 
    text: "¿Existe una jerarquía funcional para abordar barreras (económicas, legales, sociales)?", 
    details: "La gobernanza efectiva requiere identificar qué barrera es el 'cuello de botella'. Por ejemplo, tener fondos (económico) es inútil si la ley (legal) impide intervenir en terrenos privados.",
    position: { x: 500, y: 350 }, 
    yesNodeId: 'O1', 
    noNodeId: 'I4' 
  },
  O1: { 
    id: 'O1', 
    type: NodeType.OUTCOME, 
    text: "Alineación Estratégica Alcanzada.", 
    details: "El sistema muestra una integración sólida entre las necesidades ecológicas y la capacidad administrativa.",
    position: { x: 300, y: 450 }, 
    nextNodeId: 'Q10' 
  },
  I4: { 
    id: 'I4', 
    type: NodeType.INTERVENTION, 
    text: "Establecer una Mesa de Coordinación Multisectorial.", 
    details: "Crear una plataforma donde expertos legales, financieros y ecológicos puedan resolver barreras transversales.",
    position: { x: 700, y: 450 }, 
    nextNodeId: 'Q10' 
  },
  Q10: { 
    id: 'Q10', 
    type: NodeType.QUESTION, 
    text: "¿Se utilizan financiamiento sostenible e incentivos económicos?", 
    details: "La gestión falla si depende de subvenciones únicas. La gobernanza sostenible usa incentivos (exenciones fiscales, subsidios de restauración) para asegurar participación a largo plazo.",
    position: { x: 500, y: 600 }, 
    yesNodeId: 'O2', 
    noNodeId: 'I10' 
  },
  I10: { 
    id: 'I10', 
    type: NodeType.INTERVENTION, 
    text: "Desarrollar mecanismos financieros de largo plazo.", 
    details: "Proponer legislación o alianzas público-privadas para financiar esfuerzos permanentes de control y restauración.",
    position: { x: 700, y: 750 }, 
    nextNodeId: 'O2' 
  },
  O2: { 
    id: 'O2', 
    type: NodeType.OUTCOME, 
    text: "Modelo de Gobernanza Integrado.", 
    details: "Conclusión alcanzada. Use el Resumen de Ruta para auditar sus decisiones y consulte a la IA para refinamientos estratégicos finales.",
    position: { x: 500, y: 900 } 
  },
};

export const translationsES = {
  langCode: 'es-ES',
  appTitle: "Sistema de Gobernanza de Invasiones",
  appSubtitle: "Diagnóstico experto interactivo para la gestión de coníferas.",
  footer: "Gobernanza SIS. IA de Consultoría Senior.",
  context: {
    title: "Caracterización del Sitio",
    expand: "Definir Contexto",
    collapse: "Ocultar Contexto",
    countryLabel: "País",
    selectCountry: "Seleccione un país...",
    countries: ["Argentina", "Chile", "Uruguay", "Brasil", "EE.UU.", "Canadá", "España", "Francia", "Nueva Zelanda", "Australia"],
    placeLabel: "Lugar Específico",
    placePlaceholder: "ej. Parque Nahuel Huapi, Sector X",
    regionLabel: "Zona de Gestión",
    selectRegion: "Seleccione una región...",
    regions: ["Patagonia", "Región Andina", "Cordillera de la Costa", "Valle Central", "Transición Norte", "Sierra Nevada", "Montañas Rocosas"],
    stageLabel: "Etapa de Invasión",
    stageStart: "Introducción",
    stageEnd: "Masiva",
    impactLabel: "Impacto Percibido",
    impactLevels: { low: "Bajo", medium: "Moderado", high: "Crítico" },
    speciesHeader: "Especies de Coníferas Prioritarias",
    speciesLabel: "especies seleccionadas",
    landUseLabel: "Uso de Suelo / Zonificación",
    landUseOptions: {
      protectedArea: "Área Protegida",
      forestry: "Uso Forestal Comercial",
      urbanInterface: "Interfaz Urbana",
      agriculture: "Agricultura/Pastoreo"
    },
    notesLabel: "Contexto Adicional",
    notesPlaceholder: "Desafíos específicos del sitio, regulaciones locales..."
  },
  ranking: {
    noStrong: { label: "Totalmente en Desacuerdo", desc: "No existe evidencia o el factor está completamente ausente en el contexto actual." },
    noWeak: { label: "En Desacuerdo", desc: "Es probable que el factor no sea relevante o tenga un impacto muy bajo en la situación actual." },
    neutral: { label: "Incierto / Neutral", desc: "Evidencia mixta o falta de datos. Esta opción señala una necesidad de mayor monitoreo." },
    yesWeak: { label: "De Acuerdo", desc: "La evidencia preliminar indica que este factor está presente e influye en el sistema." },
    yesStrong: { label: "Totalmente de Acuerdo", desc: "Evidencia verificada confirma que este es un motor central o una etapa implementada con éxito." },
  },
  tutorial: {
    skip: "Omitir", back: "Ant", next: "Sig", finish: "Explorar", close: "Cerrar",
    steps: [
      { title: "Diagnóstico de Gobernanza", content: "Bienvenido al Sistema SIS.\n\nEsta aplicación le permite auditar estrategias de gestión de coníferas usando un árbol de decisión estructurado y asistencia de IA experta." },
      { title: "Defina su Contexto", content: "Use el panel superior de 'Caracterización' para situar el análisis. Esto permite que la IA le brinde consejos localizados en lugar de datos genéricos." },
      { title: "Grafo Interactivo", content: "El grafo central es su espacio de trabajo. Los nodos que parpadean (Q1) indican por dónde empezar. Haga clic en cualquier nodo para evaluarlo." },
      { title: "Incertidumbre y Deslizadores", content: "La gobernanza rara vez es un Sí/No simple. Use el deslizador Likert para representar su grado de acuerdo o certeza científica sobre cada factor." },
      { title: "Consultoría con IA", content: "En cualquier momento, use el Chat para preguntar: '¿Qué implicaciones legales hay en esta región?' o 'Dame ejemplos de restauración exitosa'." }
    ]
  },
  chat: {
    title: "Consultor IA Senior", toggle: "Chat Experto", contextLabel: "Evaluando:", placeholder: "Pida matices técnicos o consejos localizados...", listening: "Escuchando...",
    user: "Usuario", ai: "IA Experta", typing: "Sintetizando...", error: "Servicio de IA temporalmente no disponible.", micPermission: "Acceso al micrófono denegado.",
    startRecording: "Consulta por Voz", stopRecording: "Parar", export: "Exportar Chat",
  },
  node: { showDetails: "Ver más información", hideDetails: "Ocultar info", yes: "Sí / Alto", no: "No / Bajo", continue: "Enviar Evaluación", back: "Deshacer", restart: "Nuevo Diagnóstico", export: "Descargar Informe", endNodeMessage: "Diagnóstico completado. Revise el resumen de su ruta a continuación." },
  path: { summary: "Resumen de Auditoría:", questionHeader: "Factor", answerHeader: "Acuerdo", viewSummaryButton: "Generar Reporte de Estrategia Integral (IA)" },
  legend: { title: "Leyenda:", question: "Factor de Gestión", alert: "Barrera Crítica", intervention: "Estrategia Propuesta", outcome: "Hito Alcanzado", graphView: "Árbol de Decisión (Zoom/Arrastre)", exportPDF: "Guardar Mapa (PNG)" },
  nodeTypes: { question: "Evaluación", reassessment: "Reevaluación", alert: "Advertencia", intervention: "Estrategia", outcome: "Resultado" }
};
