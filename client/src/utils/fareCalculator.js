import { westernLineStations } from "./stations";

// Calculate fare based on distance and class
export const calculateFare = (
  source,
  destination,
  ticketClass,
  ticketType,
  passengers = 1,
) => {
  const sourceIndex = westernLineStations.indexOf(source);
  const destIndex = westernLineStations.indexOf(destination);

  if (sourceIndex === -1 || destIndex === -1) {
    throw new Error("Invalid station names");
  }

  // Calculate number of stations
  const distance = Math.abs(destIndex - sourceIndex);

  // Base fare calculation (Second Class)
  let baseFare = 0;
  if (distance <= 2) {
    baseFare = 5;
  } else if (distance <= 6) {
    baseFare = 10;
  } else {
    baseFare = 20;
  }

  // Class multipliers
  let classMultiplier = 1;
  if (ticketClass.includes("First")) {
    classMultiplier = 2;
  } else if (ticketClass.includes("AC")) {
    classMultiplier = 4;
  }

  // Journey type multiplier
  const journeyMultiplier = ticketType.includes("Return") ? 2 : 1;

  // Calculate total fare
  const totalFare = baseFare * classMultiplier * journeyMultiplier * passengers;

  return totalFare;
};
