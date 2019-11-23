# BPI-R2 CSITool Data Collector

This repository contains modified csitool for BPI-R2 for data acquisition.  

## Preparation
#### Kernel & Driver
Please refer [this README](https://github.com/wldh-g/BPI-R2-CSITool-Kernel#readme).  

#### Install lorcon
+ Git clone `https://github.com/dhalperi/lorcon-old`  
+ `make` and `sudo make install` on `./lorcon-old/`  

#### Download this repository
+ Git clone `https://github.com/wldh-g/BPI-R2-CSITool-DataCollector`  
+ `cd BPI-R2-CSITool-DataCollector`

#### Install firmware
+ `sudo cp firmware/iwlwifi-5000-2.ucode.sigcomm2010 /lib/firmware/iwlwifi-5000-2.ucode`  
+ Append `.disabled` on all `iwlwifi-5000-*.ucode` on `/lib/firmware`. (e.g. `iwlwifi-5000-5.ucode` to `iwlwifi-5000-5.ucode.disabled`)  

## On transmitter
```
./prepare_tx.sh
cd ./injection; make
./random_packets [packet_count] [packet_size] 1
```

## On receiver
```
./prepare_rx.sh
cd ./capture; make
./log_to_file [filename].dat
```

## How to use recorded `.dat` file
Please refer to [this README](https://github.com/wldh-g/15na-tools#readme).  

## About channels, MIMO, MCS
Initially the scripts are configured to use channel 64 in HT40- mode, and to use 2x3 MIMO.  

#### Changing Antennas (MIMO) & MCS
You have to change `prepare_tx.sh`.  
In `# Set transaction rate` part of `prepare_tx.sh`, there is a strange hex integer: `0xcd09`. That may the only part you're going to modify.  

Using `get_flags.js`, you can get proper flag code by giving the data rate and the number of antenna you use.

The detail for the flag is described at [here](https://github.com/wldh-g/BPI-R2-CSITool-Kernel/blob/master/drivers/net/wireless/iwlwifi/dvm/commands.h#L245-L333).

## License
This repository is based on [linux-80211n-csitool-supplementary](http://github.com/dhalperi/linux-80211n-csitool-supplementary).  
See the [based project FAQ](http://dhalperi.github.io/linux-80211n-csitool/faq.html) for licensing information.  

