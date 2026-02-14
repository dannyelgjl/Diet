export type FastingProtocol = {
  id: string;
  name: string;
  fastingHours: number;
  eatingHours: number;
  isCustom: boolean;
};

export type ProtocolState = {
  protocols: FastingProtocol[];
  selectedProtocolId: string;

  seedDefaults(): void;
  selectProtocol(id: string): void;
  createCustomProtocol(fastingHours: number, eatingHours: number): void;
  deleteCustomProtocol(id: string): void;
};
