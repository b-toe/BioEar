export type ExperimentStatus = "planned" | "in-progress" | "complete";

export interface Experiment {
  id: string;
  title: string;
  status: ExperimentStatus;
  objective: string;
  metric: string;
}

export const experiments: Experiment[] = [
  { id: "sound-transmission", title: "Sound Transmission", status: "complete", objective: "Confirm the actuator reliably transmits vibration through bone.", metric: "Transmission detected" },
  { id: "actuator-placement", title: "Actuator Placement", status: "complete", objective: "Compare mastoid vs. temporal placement for comfort and clarity.", metric: "Comparative positioning" },
  { id: "frequency-response", title: "Frequency Response", status: "in-progress", objective: "Measure output across the speech frequency range.", metric: "Output amplitude" },
  { id: "speech-intelligibility", title: "Speech Intelligibility", status: "in-progress", objective: "Assess whether processed speech remains understandable through bone conduction.", metric: "Recognition accuracy" },
  { id: "battery-testing", title: "Battery Testing", status: "planned", objective: "Measure runtime under continuous use.", metric: "Battery life" },
  { id: "comfort-testing", title: "Comfort Testing", status: "planned", objective: "Evaluate wearability over extended sessions.", metric: "Wear duration" },
];
