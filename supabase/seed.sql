-- Demo data for local development. Not real experiment results.
insert into research_experiments (name, description, status) values
  ('Sound Transmission (demo)', 'Placeholder record confirming demo seeding works.', 'complete'),
  ('Frequency Response (demo)', 'Placeholder record for the frequency-response experiment.', 'in-progress'),
  ('Battery Testing (demo)', 'Placeholder record for planned battery testing.', 'planned');

insert into prototype_versions (version, summary) values
  ('0.1', 'First breadboard circuit.'),
  ('0.2', 'First wearable headband form factor.'),
  ('0.3', 'Current prototype with digital signal processing.');
