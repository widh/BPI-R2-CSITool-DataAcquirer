# Intel CSITool Data Collector

This repository contains modified csitool for data acquisition.  
This tool only supports IWL5300-based CSI collection.

These tools are tested with BPI-R2 device.

## Preparation

#### Kernel & Driver

If you are using BPI-R2, please refer [this README](https://github.com/wldh-g/iwlwifi-csitool-r2#readme).
If not, please look [here](https://github.com/dhalperi/linux-80211n-csitool).

#### Install `lorcon`

- Git clone `https://github.com/dhalperi/lorcon-old`
- `make` and `sudo make install` on `./lorcon-old/`

#### Download this repository

- Git clone `https://github.com/wldh-g/iwlwifi-csitool-apps`
- `cd iwlwifi-csitool-apps`

#### Install firmware

- `sudo cp firmware/iwlwifi-5000-2.ucode.sigcomm2010 /lib/firmware/iwlwifi-5000-2.ucode`
- Append `.disabled` on all `iwlwifi-5000-*.ucode` on `/lib/firmware`. (e.g. `iwlwifi-5000-5.ucode` to `iwlwifi-5000-5.ucode.disabled`)

## On transmitter

```bash
./prepare_tx.sh
cd ./injection; make
./random_packets [packet_count] [packet_size] 1
```

## On receiver

```bash
./prepare_rx.sh
cd ./capture; make
./log_to_file [filename].dat
```

## How to use recorded `.dat` file

Here is the tools that I used to process dat file: [15na-tools](https://github.com/wldh-g/15na-tools#readme)  
And here is the tool provided by the author of Intel CSITool, D. Halperin: [linux-80211n-csitool-supplementary](https://github.com/dhalperi/linux-80211n-csitool-supplementary)

## About channels, MIMO, MCS

Initially the scripts are configured to use channel 64 in HT40- mode, and to use 1 Tx antenna.

#### Changing Antennas (MIMO) & MCS

You have to change `prepare_tx.sh`.
In `# Set transaction rate` part of `prepare_tx.sh`, there is a strange hex integer: `0x4d01`. That may the only part you're going to modify.

Using `get_flags.js`, you can get proper flag code by giving the data rate and the number of antenna you use.

The detail for the flag is described at [here](https://github.com/wldh-g/iwlwifi-csitool-r2/blob/master/drivers/net/wireless/iwlwifi/dvm/commands.h#L245-L334).

## License

This repository is based on [linux-80211n-csitool-supplementary](http://github.com/dhalperi/linux-80211n-csitool-supplementary).
If you want to **study**, look that repository rather than this.
See the [based project FAQ](http://dhalperi.github.io/linux-80211n-csitool/faq.html) for licensing information.
