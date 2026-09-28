export const technologySections = [
  {
    id: "capture",
    title: "Sound capture",
    body: "A small microphone captures environmental sound — speech, ambient noise, music — and converts acoustic pressure waves into a continuous electrical signal.",
  },
  {
    id: "conversion",
    title: "Analog-to-digital conversion",
    body: "The analog electrical signal is sampled and converted into a digital stream, making it possible to manipulate the sound mathematically rather than only electrically.",
  },
  {
    id: "processing",
    title: "Digital signal processing",
    body: "The digital signal passes through filters that adjust frequency balance, emphasize speech-relevant ranges, and reduce steady background noise.",
  },
  {
    id: "amplification",
    title: "Amplification",
    body: "The processed signal is amplified to a level sufficient to drive a bone-conduction actuator, calibrated to avoid unnecessary power draw.",
  },
  {
    id: "actuator",
    title: "Bone-conduction actuator",
    body: "The actuator converts the amplified electrical signal into mechanical vibration, transmitted through contact with the skull rather than through the ear canal.",
  },
  {
    id: "power",
    title: "Power",
    body: "A small rechargeable battery powers the capture, processing, and actuation stages, sized to balance wearability against runtime.",
  },
  {
    id: "housing",
    title: "Physical housing",
    body: "A lightweight housing holds the electronics against the skull in a stable, comfortable position, designed for extended wear.",
  },
];

export const componentData = [
  { id: "microphone", name: "Microphone", category: "input", description: "Captures environmental sound.", output: "Electrical audio signal.", icon: "Mic" },
  { id: "processor", name: "Digital Processor", category: "processing", description: "Manipulates sound data.", output: "Processed audio signal.", icon: "Cpu" },
  { id: "amplifier", name: "Amplifier", category: "processing", description: "Increases signal strength.", output: "Amplified audio signal.", icon: "Zap" },
  { id: "actuator", name: "Bone-Conduction Actuator", category: "output", description: "Converts signal into vibration.", output: "Mechanical vibration.", icon: "Radio" },
  { id: "battery", name: "Battery", category: "power", description: "Powers the whole system.", output: "Electrical power.", icon: "BatteryMedium" },
  { id: "housing", name: "Housing", category: "structure", description: "Holds components against the skull.", output: "Structural support.", icon: "Square" },
];

export const references = [
  {
    title: "FDA — Types of Hearing Devices",
    note: "Describes bone-anchored hearing systems, transmission of vibration through the skull to the inner ear, and non-invasive adapters such as headbands.",
  },
  {
    title: "Web Audio API — MDN Web Docs",
    note: "Documents GainNode, BiquadFilterNode, and AnalyserNode primitives used in the BioEar Sound Lab.",
  },
  {
    title: "Supabase Documentation",
    note: "Reference for Postgres, authentication, and storage patterns used in the optional research dashboard.",
  },
  {
    title: "Next.js Documentation — App Router",
    note: "Reference for the routing and rendering model used to build this site.",
  },
];
