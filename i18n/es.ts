
import { TreeNode, NodeType } from '../types';

export const INITIAL_NODE_ID_ES = 'Q1';

export const DIAGNOSTIC_TREE_DATA_ES: Record<string, TreeNode> = {
  // ==========================================
  // PHASE 1: Initial Diagnosis & Invasion Drivers
  // ==========================================
  Q1: {
    id: 'Q1',
    type: NodeType.QUESTION,
    text: "¿Existe evidencia de dispersión de pinos y/o impactos ecológicos (ej. pérdida de biodiversidad, alteración de ecosistemas)?",
    details: "Este es el punto de entrada del diagnóstico. Antes de evaluar la gobernanza, se debe confirmar si existe un problema tangible.",
    position: { x: 500, y: 50 },
    yesNodeId: 'Q2',
    noNodeId: 'I1'
  },
  I1: {
    id: 'I1',
    type: NodeType.INTERVENTION,
    text: "Implementar programas de monitoreo y detección temprana.",
    details: "Establecer protocolos de monitoreo sistemáticos para detectar y documentar la dispersión de pinos de manera temprana, incluso si los impactos aún no son visibles.",
    position: { x: 200, y: 150 },
    nextNodeId: 'Q1',
    checkList: ["Se han identificado zonas prioritarias para el monitoreo.", "Existen protocolos de registro sistemático de datos en terreno.", "El personal cuenta con capacitación técnica específica.", "Existe un canal para reportar detecciones de manera inmediata."]
  },
  Q2: {
    id: 'Q2',
    type: NodeType.QUESTION,
    text: "¿Existen impulsores identificables de la dispersión de pinos y/o impacto ecológico (ej. expansión de plantaciones, cambios de uso de suelo, perturbaciones)?",
    details: "Una vez confirmada la evidencia de dispersión, el siguiente paso es comprender qué está impulsando esa propagación.",
    position: { x: 500, y: 150 },
    yesNodeId: 'Q3',
    noNodeId: 'I2'
  },
  I2: {
    id: 'I2',
    type: NodeType.INTERVENTION,
    text: "Realizar evaluación ecológica dirigida para identificar impulsores y dinámicas de invasión.",
    details: "Cuando los impulsores no están claramente identificados, se requiere investigación dirigida antes de diseñar intervenciones.",
    position: { x: 800, y: 250 },
    nextNodeId: 'Q3',
    checkList: ["Se han identificado los principales vectores de dispersión.", "Existe un análisis de la dinámica temporal de la invasión.", "Se conocen los factores de perturbación que facilitan el establecimiento.", "Los datos ecológicos están actualizados y validados."]
  },
  Q3: {
    id: 'Q3',
    type: NodeType.QUESTION,
    text: "¿Existen medidas de prevención, control, restauración o monitoreo implementadas?",
    details: "Este nodo evalúa si existe alguna respuesta de gestión activa, independientemente de su efectividad.",
    position: { x: 500, y: 350 },
    yesNodeId: 'Q4',
    noNodeId: 'SP1'
  },
  SP1: {
    id: 'SP1',
    type: NodeType.INTERVENTION,
    text: "Vía Socioeconómica: 1. Educación, 2. Cambio de percepción, 3. Fomento del apoyo al manejo.",
    details: "Cuando no existen medidas de gestión a pesar de la evidencia documentada, la barrera suele ser social o educativa.",
    position: { x: 200, y: 450 },
    nextNodeId: 'Q4',
    checkList: ["Se realizan campañas de educación ambiental periódicas.", "Existe una percepción pública clara sobre el impacto de las pináceas.", "Los actores locales apoyan activamente las medidas de control.", "Se han mitigado los conflictos de interés con la comunidad."]
  },

  // ==========================================
  // PHASE 2: Governance Assessment & Critical Barriers
  // ==========================================
  Q4: {
    id: 'Q4',
    type: NodeType.QUESTION,
    text: "¿Existen estructuras de gobernanza efectivas y estrategias operacionales de manejo implementadas?",
    details: "Esta es la evaluación central de gobernanza. Evalúa si existen herramientas operativas para ejecutar el manejo.",
    position: { x: 500, y: 550 },
    yesNodeId: 'O_partial',
    noNodeId: 'I3'
  },
  I3: {
    id: 'I3',
    type: NodeType.INTERVENTION,
    text: "Reforzar la concientización y el monitoreo. Involucrar actores mediante difusión dirigida.",
    details: "Cuando las estructuras de gobernanza son débiles o inexistentes, el primer paso es generar conciencia e involucrar a los actores clave.",
    position: { x: 250, y: 650 },
    nextNodeId: 'Q5',
    checkList: ["Los actores clave reconocen el riesgo de la invasión.", "Existen redes de monitoreo ciudadano o participativo.", "Se han distribuido materiales de difusión técnica y social.", "La problemática está integrada en la agenda de discusión local."]
  },
  O_partial: {
    id: 'O_partial',
    type: NodeType.OUTCOME,
    text: "Resultado parcial: Reducción en la densidad de pinos y/o impactos de la invasión.",
    details: "Este resultado intermedio indica que la gobernanza está funcionando y logrando algún nivel de éxito ecológico.",
    position: { x: 650, y: 650 },
    nextNodeId: 'Q5'
  },

  // Barrier Cascade
  Q5: {
    id: 'Q5',
    type: NodeType.QUESTION,
    text: "¿Existe una barrera económica/financiera que restringe el manejo?",
    details: "Las limitaciones financieras a menudo restringen la implementación de planes de gestión de especies invasoras.",
    position: { x: 400, y: 800 },
    yesNodeId: 'A_financial',
    noNodeId: 'Q6'
  },
  A_financial: {
    id: 'A_financial',
    type: NodeType.ALERT,
    text: "Alerta: Deficiencia Financiera identificada.",
    details: "Se ha identificado una barrera económica crítica. Esto puede manifestarse como falta de presupuesto o financiamiento poco confiable.",
    position: { x: 150, y: 900 },
    nextNodeId: 'I4',
    checkList: ["El presupuesto actual no cubre las necesidades operativas.", "No existe financiamiento asegurado para el próximo ciclo.", "La falta de recursos económicos es el principal cuello de botella.", "Se han cancelado intervenciones por motivos financieros."]
  },
  I4: {
    id: 'I4',
    type: NodeType.INTERVENTION,
    text: "Identificar oportunidades de financiamiento, integrar el manejo en programas de conservación y explorar la generación de valor.",
    details: "La generación de valor a partir de acciones de manejo (biomasa, etc.) e integración en programas existentes puede ayudar a cerrar brechas financieras.",
    position: { x: 150, y: 1000 },
    nextNodeId: 'Q9',
    checkList: ["Se han mapeado fuentes de financiamiento alternativas.", "Existen propuestas para valorizar la biomasa extraída.", "El manejo está integrado en programas de desarrollo rural.", "Se han establecido alianzas para el co-financiamiento."]
  },
  Q6: {
    id: 'Q6',
    type: NodeType.QUESTION,
    text: "¿Existe una barrera legal o administrativa?",
    details: "Las barreras legales pueden derivar de la interpretación de regulaciones o la implementación de leyes existentes.",
    position: { x: 550, y: 900 },
    yesNodeId: 'A_legal',
    noNodeId: 'Q7'
  },
  A_legal: {
    id: 'A_legal',
    type: NodeType.ALERT,
    text: "Alerta: Deficiencia Legal/Administrativa identificada.",
    details: "Se ha identificado una barrera legal o administrativa crítica. Esto podría implicar regulaciones contradictorias.",
    position: { x: 350, y: 1000 },
    nextNodeId: 'I5',
    checkList: ["Existen vacíos legales sobre la propiedad y la intervención.", "La normativa actual dificulta el control en predios privados.", "Hay contradicciones entre leyes ambientales y productivas.", "Los procesos administrativos de permisos son excesivamente lentos."]
  },
  I5: {
    id: 'I5',
    type: NodeType.INTERVENTION,
    text: "Interactuar con autoridades para clarificar opciones regulatorias, explorar vías de manejo alternativas.",
    details: "Abordar las barreras legales puede ser más factible que buscar cambios legales formales a corto plazo.",
    position: { x: 350, y: 1100 },
    nextNodeId: 'Q9',
    checkList: ["Se ha establecido una mesa técnica con autoridades legales.", "Existen vías administrativas simplificadas para el control.", "Se han clarificado las responsabilidades de los propietarios.", "Hay consenso sobre la aplicación de las normativas vigentes."]
  },
  Q7: {
    id: 'Q7',
    type: NodeType.QUESTION,
    text: "¿Existe una barrera de coordinación/conflicto entre instituciones o actores?",
    details: "El manejo de invasiones biológicas a menudo involucra múltiples instituciones con responsabilidades fragmentadas.",
    position: { x: 700, y: 1050 },
    yesNodeId: 'A_coordination',
    noNodeId: 'Q8'
  },
  A_coordination: {
    id: 'A_coordination',
    type: NodeType.ALERT,
    text: "Alerta: Conflicto / Falta de Coordinación identificada.",
    details: "Se ha identificado una falla de coordinación crítica. Esto puede involucrar conflictos entre partes interesadas.",
    position: { x: 350, y: 1150 },
    nextNodeId: 'I6',
    checkList: ["Las instituciones actúan de forma fragmentada.", "Existen conflictos de competencia entre organismos públicos.", "Falta un plan de acción conjunto y coordinado.", "Los actores clave no coinciden en las prioridades de manejo."]
  },
  I6: {
    id: 'I6',
    type: NodeType.INTERVENTION,
    text: "Establecer plataformas de coordinación, promover colaboración interinstitucional y desarrollar estrategias de manejo compartidas.",
    details: "Convenios, planes conjuntos y plataformas como el Programa Wilding Conifer de NZ son ejemplos de coordinación efectiva.",
    position: { x: 350, y: 1250 },
    nextNodeId: 'Q9',
    checkList: ["Existe una plataforma formal de coordinación multisectorial.", "Se han firmado convenios de colaboración interinstitucional.", "Contamos con un sistema compartido de información y metas.", "Las responsabilidades de cada actor están claramente definidas."]
  },
  Q8: {
    id: 'Q8',
    type: NodeType.QUESTION,
    text: "¿Existe conciencia social limitada y/o bajo apoyo para el manejo?",
    details: "En algunos contextos, el manejo de invasiones de pinos puede enfrentar una comprensión pública limitada o incluso resistencia.",
    position: { x: 700, y: 1200 },
    yesNodeId: 'A_perception',
    noNodeId: 'Q8b'
  },
  A_perception: {
    id: 'A_perception',
    type: NodeType.ALERT,
    text: "Alerta: Conciencia social limitada y bajo apoyo.",
    details: "Se ha identificado una barrera de percepción social crítica. El público puede valorar estas especies invasoras.",
    position: { x: 350, y: 1300 },
    nextNodeId: 'I7',
    checkList: ["La población local valora estéticamente la especie invasora.", "Existe resistencia social a las técnicas de control.", "Se percibe el control como una amenaza a la economía local.", "Falta información pública sobre los impactos negativos."]
  },
  I7: {
    id: 'I7',
    type: NodeType.INTERVENTION,
    text: "Mejorar la comunicación, fomentar la participación de actores y vincular comunidades locales en el monitoreo o la restauración.",
    details: "El compromiso bidireccional y la demostración de impactos ecológicos ayudan a alinear la percepción social con los objetivos de manejo.",
    position: { x: 350, y: 1400 },
    nextNodeId: 'Q9',
    checkList: ["Contamos con una estrategia de comunicación a medida.", "Se incluyen espacios de participación social en el diseño.", "Los beneficios de la restauración son claros para la comunidad.", "Existe un programa de ciencia ciudadana activo."]
  },
  Q8b: {
    id: 'Q8b',
    type: NodeType.QUESTION,
    text: "¿Existen mecanismos de monitoreo y evaluación para el manejo adaptativo?",
    details: "Este nodo se agregó en base a los comentarios de los revisores que reconocen que el monitoreo es esencial para la gobernanza adaptativa.",
    position: { x: 700, y: 1350 },
    yesNodeId: 'I8',
    noNodeId: 'I8'
  },
  I8: {
    id: 'I8',
    type: NodeType.INTERVENTION,
    text: "Fortalecer el monitoreo para barreras no consideradas. Establecer protocolos de evaluación.",
    details: "Si no se identificó una barrera específica pero la gobernanza no es plenamente funcional, es necesario fortalecer el monitoreo.",
    position: { x: 700, y: 1450 },
    nextNodeId: 'Q9',
    checkList: ["Los protocolos de monitoreo son revisados periódicamente.", "Los resultados del monitoreo ajustan las acciones de manejo.", "Existe una base de datos centralizada y accesible.", "Se evalúa la efectividad de cada intervención realizada."]
  },

  // ==========================================
  // PHASE 3: Improvement Opportunities & Final Outcomes
  // ==========================================
  Q9: {
    id: 'Q9',
    type: NodeType.QUESTION,
    text: "¿Existen mecanismos de financiamiento sostenible a largo plazo?",
    details: "El manejo falla si depende de subvenciones únicas o presupuestos de proyectos a corto plazo.",
    position: { x: 500, y: 1600 },
    yesNodeId: 'Q10',
    noNodeId: 'I9'
  },
  I9: {
    id: 'I9',
    type: NodeType.INTERVENTION,
    text: "Lanzar estrategias políticas con actores territoriales para desarrollar financiamiento sostenible.",
    details: "Proponer legislación o alianzas público-privadas para financiar esfuerzos permanentes de control y restauración.",
    position: { x: 200, y: 1700 },
    nextNodeId: 'O_review',
    checkList: ["Existe una propuesta de ley para financiamiento permanente.", "Se han creado fondos fiduciarios o tasas específicas.", "El sector privado aporta recursos mediante compensaciones.", "La estrategia política cuenta con respaldo legislativo."]
  },
  Q10: {
    id: 'Q10',
    type: NodeType.QUESTION,
    text: "¿Se incluyen incentivos económicos en las estrategias?",
    details: "Más allá del financiamiento, esto evalúa si el sistema de gobernanza utiliza incentivos como exenciones fiscales o subsidios de restauración.",
    position: { x: 700, y: 1700 },
    yesNodeId: 'O_effective',
    noNodeId: 'O_review'
  },
  O_effective: {
    id: 'O_effective',
    type: NodeType.OUTCOME,
    text: "Resultado: Modelo de Gobernanza Efectiva alcanzado.",
    details: "El sistema de gobernanza demuestra una fuerte integración entre los objetivos ecológicos y las herramientas administrativas.",
    position: { x: 550, y: 1800 },
    nextNodeId: 'I_continuous'
  },
  I_continuous: {
    id: 'I_continuous',
    type: NodeType.INTERVENTION,
    text: "Acción Continua: Fortalecer estrategias y realizar evaluación continua.",
    details: "Incluso con una gobernanza efectiva, el monitoreo y la evaluación continuos son necesarios para manejar condiciones cambiantes.",
    position: { x: 550, y: 1900 },
    nextNodeId: 'Q4',
    checkList: ["La evaluación del sistema se realiza de forma anual.", "Se han integrado nuevas tecnologías de monitoreo remoto.", "Las lecciones aprendidas se documentan sistemáticamente.", "El modelo de gobernanza se adapta a nuevos desafíos."]
  },
  O_review: {
    id: 'O_review',
    type: NodeType.OUTCOME,
    text: "Resultado: Necesidad de Revisión y Reajuste.",
    details: "Persisten barreras críticas o no existe financiamiento sostenible. El sistema necesita reconsideración.",
    position: { x: 250, y: 1800 },
    nextNodeId: 'I10'
  },
  I10: {
    id: 'I10',
    type: NodeType.INTERVENTION,
    text: "Reevaluar recursos o ajustar las estrategias implementadas.",
    details: "Basado en el resultado de la revisión, el sistema vuelve a la evaluación de la gobernanza para realizar ajustes.",
    position: { x: 250, y: 1900 },
    nextNodeId: 'Q4',
    checkList: ["Se realiza una auditoría técnica de los recursos humanos.", "Se han ajustado las metas según la disponibilidad real.", "Existen mecanismos para reasignar fondos eficientemente.", "Se han identificado prioridades críticas ante escasez."]
  }
};

export const translationsES = {
  langCode: 'es-ES',
  appTitle: "Sistema de Gobernanza de Invasiones",
  appSubtitle: "Diagnóstico experto interactivo para la gestión de pináceas.",
  footer: "Gobernanza SIS. IA de Consultoría Senior.",
  context: {
    title: "Caracterización del Sitio",
    expand: "Definir Contexto",
    collapse: "Ocultar Contexto",
    countryLabel: "País",
    selectCountry: "Seleccione un país...",
    countries: ["Argentina", "Chile", "Uruguay", "Brasil", "EE.UU.", "Canadá", "España", "Francia", "Nueva Zelanda", "Australia", "Sudáfrica"],
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
    speciesHeader: "Especies de Pináceas Prioritarias",
    speciesLabel: "especies seleccionadas",
    landUseLabel: "Uso de Suelo / Zonificación",
    landUseOptions: {
      protectedArea: "Área Protegida",
      forestry: "Uso Forestal Comercial",
      urbanInterface: "Interfaz Urbana",
      agriculture: "Agricultura/Pastoreo"
    },
    notesLabel: "Contexto Adicional",
    notesPlaceholder: "Ej. Barreras legales en Patagonia, tensiones con la industria forestal local o falta de presupuesto asignado..."
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
      { title: "Diagnóstico de Gobernanza", content: "Bienvenido al Sistema SIS.\n\nEsta aplicación le permite auditar estrategias de gestión de pináceas usando un árbol de decisión estructurado y asistencia de IA experta." },
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
  node: { showDetails: "Ver más información", hideDetails: "Ocultar info", yes: "Sí / Alto", no: "No / Bajo", continue: "Enviar Evaluación", back: "Deshacer", restart: "Nuevo Diagnóstico", export: "Descargar Informe", endNodeMessage: "Diagnóstico completado. Revise el resumen de su ruta a continuación.", notesLabel: "Notas Locales / Observaciones", notesPlaceholder: "Agregue información para que la IA la considere...", checklistLabel: "Verifique las afirmaciones que aplican a su región:" },
  path: { 
    summary: "Resumen de Auditoría:", 
    questionHeader: "Factor", 
    answerHeader: "Acuerdo", 
    viewSummaryButton: "Generar Reporte de Estrategia Integral (IA)",
    phaseLabels: {
      phase1: "Fase 1: Diagnóstico Inicial",
      phase2: "Fase 2: Evaluación de Gobernanza",
      phase3: "Fase 3: Oportunidades de Mejora"
    }
  },
  legend: { 
    title: "Leyenda:", 
    question: "Decisión / Evaluación", 
    alert: "Barrera Crítica", 
    intervention: "Estrategia Propuesta", 
    outcome: "Hito / Resultado", 
    graphView: "Árbol de Decisión (Zoom/Arrastre)", 
    exportPDF: "Guardar Mapa (PNG)" 
  },
  nodeTypes: { 
    question: "Evaluación", 
    reassessment: "Reevaluación", 
    alert: "Advertencia", 
    intervention: "Estrategia", 
    outcome: "Resultado" 
  }
};
