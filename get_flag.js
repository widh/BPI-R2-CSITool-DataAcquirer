#!/usr/bin/env node
// Tx flag generator!
// Only for IWLWIFI 5300 card!

// ? Configuration Part
// ? Modify below to generate a flag that meets to you

/* High-throughput (HT) rate format
 * 0)   6 Mbps
 * 1)  12 Mbps
 * 2)  18 Mbps
 * 3)  24 Mbps
 * 4)  36 Mbps
 * 5)  48 Mbps
 * 6)  54 Mbps
 * 7)  60 Mbps
 */
let DataRateCode = process.argv[2];

/* The number of Antennas [1-3] */
let AntennaCount = process.argv[3];

// ! Assertion & Generation Part
// ! DO NOT MODIFY BELOW

/* Check inputs */
let AntennaSelection = Number(AntennaCount);
let DataRate = Number(DataRateCode);
if (process.argv.length !== 4) {
  const sep = process.argv[1].indexOf('\\') >= 0 ? '\\' : '/';
  const file = process.argv[1].substring(process.argv[1].lastIndexOf(sep) + 1);
  console.info(`Usage: ${file} DATA_RATE ANTENNA_COUNT\n`);
  console.info('  DATA_RATE     = [0-7]');
  console.info('  ANTENNA_COUNT = [1-3]\n');
  return;
} else if (
  Number.isNaN(AntennaSelection)
  || AntennaSelection < 1
  || AntennaSelection > 3
) {
  console.error(`Check antenna. It must be [1-3] : ${AntennaSelection}`);
  return;
} else if (
  Number.isNaN(DataRate)
  || DataRate > 7
  || DataRate < 0
) {
  console.error(`Check data rate. It must be [0-7] : ${DataRateCode}`);
  return;
}

/* Streams
 * 0)  Single (SISO)
 * 1)  Dual   (MIMO)
 * 2)  Triple (MIMO)
 */
let StreamCount = AntennaSelection;

/* 6 Mbps HT40 Duplicate Data
 * 0)  Off
 * 1)  On
 */
let HT40Duplicate = 0;

/* Use High Throughput
 * 0)  Legacy Mode
 * 1)  HT Mode
 */
let UseHT = 1;

/* CCK or OFDM
 * 0)  OFDM
 * 1)  CCK
 */
let UseCCKSelect = 0;
let UseCCK = UseHT === 1 ? 0 : UseCCKSelect;

/* Use Greenfield Preamble
 * 0)  No
 * 1)  Use
 */
let UseGFP = 0;

/* HT Channel
 * 0)  20 MHz
 * 1)  40 MHz
 */
let HTChannel = 1;

/* Duplicate HT40 to HT20
 * 0)  No
 * 1)  Yes
 */
let HT20DuplicateSelection = 0;
let HT20Duplicate = HTChannel === 1 ? HT20DuplicateSelection : 0;

/* Use Short Guard Interval
 * 0)  Normal Guard Interval (0.8 us)
 * 1)  Short Guard Interval (0.4 us)
 */
let ShortGuardInterval = 0;

/* Antenna */
let UseAntenna1 = AntennaSelection >= 1;
let UseAntenna2 = AntennaSelection >= 2;
let UseAntenna3 = AntennaSelection >= 3;

// NOTE : shift has higher priority than bitwise OR operation.
let RateFlags = (0b00000000000000000
  | DataRate
  | StreamCount << 3
  | HT40Duplicate << 5
  | UseHT << 8
  | UseCCK << 9
  | UseGFP << 10
  | HTChannel << 11
  | HT20Duplicate << 12
  | ShortGuardInterval << 13
  | UseAntenna1 << 14
  | UseAntenna2 << 15
  | UseAntenna3 << 16
);
console.log(`iwlagn rate flags     :  0x${RateFlags.toString(16)}`);
console.log(`wanna bitwise detail? :  0b${RateFlags.toString(2)}`);
