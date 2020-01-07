#!/usr/bin/env node
// Tx flag generator!
// Only for IWLWIFI 5300 card!

// ? Configuration Part

/* High-throughput (HT) mode [20|40] */
let HTMode = process.argv[2];

/* HT rate format
 * 0)   6 Mbps
 * 1)  12 Mbps
 * 2)  18 Mbps
 * 3)  24 Mbps
 * 4)  36 Mbps
 * 5)  48 Mbps
 * 6)  54 Mbps
 * 7)  60 Mbps
 */
let DataRateCode = process.argv[3];

/* The number of Antennas [1-3] */
let AntennaCount = process.argv[4];

// ! Assertion & Generation Part

/* Check inputs */
let AntennaSelection = Number(AntennaCount);
let DataRate = Number(DataRateCode);
if (process.argv.length !== 5) {
  const sep = process.argv[1].indexOf('\\') >= 0 ? '\\' : '/';
  const file = process.argv[1].substring(process.argv[1].lastIndexOf(sep) + 1);
  console.info(`Usage: ${file} HT_MODE DATA_RATE ANTENNA_COUNT\n`);
  console.info('  HT_MODE       = [20|40]');
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
} else if (
  Number.isNaN(HTMode)
  || (HTMode !== '20' && HTMode !== '40')
) {
  console.error(`Check ht mode. It must be [20|40] : ${HTMode}`);
  return;
}

/* Streams
 * 0)  Single (SISO)
 * 1)  Dual   (MIMO)
 * 2)  Triple (MIMO)
 */
let StreamCount = AntennaSelection - 1;

/* HT Duplicate Data
 * 0)  Off
 * 1)  On
 */
let HTDuplicateSelection = 0;
let HTDuplicate = HTMode === '40' ? HTDuplicateSelection : 0;

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
let UseGFP = 1;

/* HT Channel
 * 0) 20 MHz (legacy)
 * 1) 40 MHz
 */
let HTChannel = HTMode === '20' ? 0 : 1;

/* Duplicate 20MHz channels in HT40
 * 0)  No
 * 1)  Yes
 */
let DuplicateSelection = 0;
let Duplicate = HTMode === 1 ? DuplicateSelection : 0;

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
  | HTDuplicate << 5
  | UseHT << 8
  | UseCCK << 9
  | UseGFP << 10
  | HTChannel << 11
  | Duplicate << 12
  | ShortGuardInterval << 13
  | UseAntenna1 << 14
  | UseAntenna2 << 15
  | UseAntenna3 << 16
);
console.log(`monitor_tx_rate: 0x${RateFlags.toString(16)} (0b${RateFlags.toString(2)})`);
