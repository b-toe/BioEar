export const bioear = {
  name: "BioEar",
  tagline: "Sound, reimagined.",
  mission:
    "BioEar is a student engineering project exploring whether inexpensive, widely available components can capture, process, and transmit sound through non-surgical bone conduction.",
  shortDescription:
    "BioEar turns sound into vibration, creating another pathway to hearing.",
  problem:
    "Some hearing pathways are blocked or reduced. What if sound could take another route through the body?",
  question:
    "Can a low-cost wearable system capture, process, and transmit useful sound through bone conduction?",
  disclaimer:
    "BioEar is an engineering research prototype, not a clinically approved medical device. Hearing technology should be selected with guidance from a qualified hearing professional.",
  positioning:
    "BioEar is being developed as a prototype for people with hearing loss for whom bone conduction may be appropriate — not as a universal solution for all forms of hearing loss.",
};

export const signalPath = [
  { id: "voice", label: "Voice", description: "Sound begins as vibrations in the air, produced by a voice or environmental source." },
  { id: "microphone", label: "Microphone", description: "A microphone captures environmental sound and converts it into an electrical signal." },
  { id: "processing", label: "Digital Processing", description: "The signal is digitized and shaped — filtered, balanced, and adjusted for clarity." },
  { id: "amplifier", label: "Amplifier", description: "The processed signal is amplified to drive the bone-conduction actuator." },
  { id: "actuator", label: "Bone-Conduction Actuator", description: "The actuator converts the electrical signal into mechanical vibration." },
  { id: "skull", label: "Skull", description: "Vibration travels through bone rather than through the ear canal." },
  { id: "innerEar", label: "Inner Ear", description: "The vibration reaches the cochlea, where it is interpreted as sound, the same destination as conventional hearing." },
];

export const whyBioEar = [
  {
    title: "Non-Surgical",
    description: "BioEar is designed as a wearable device, exploring bone conduction without requiring implantation.",
  },
  {
    title: "Low-Cost Focus",
    description: "Designed around inexpensive, widely available components rather than specialized proprietary hardware.",
  },
  {
    title: "Software-Assisted",
    description: "Digital signal processing does the work of shaping sound, allowing the hardware to stay simple.",
  },
];

export const ideaCards = [
  { title: "Capture", description: "Microphone captures environmental sound." },
  { title: "Process", description: "Digital processing modifies the audio signal." },
  { title: "Transmit", description: "Bone-conduction actuator converts the signal into vibration." },
];
