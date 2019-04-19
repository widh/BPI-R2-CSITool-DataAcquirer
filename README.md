# BPI-R2 CSITool Data Collector

This repository contains modified csitool for BPI-R2 for data acquisition.  

## Preparation
#### Kernel & Driver
Please refer [this README](https://github.com/widh/BPI-R2-CSITool-Kernel#readme).  

#### Install lorcon
+ Git clone `https://github.com/dhalperi/lorcon-old`  
+ `make` and `sudo make install` on `./lorcon-old/`  

#### Download this repository
+ Git clone `https://github.com/widh/BPI-R2-CSITool-DataCollector`  
+ `cd BPI-R2-CSITool-DataCollector`

#### Install firmware
+ `sudo cp firmware/iwlwifi-5000-2.ucode.sigcomm2010 /lib/firmware/iwlwifi-5000-2.ucode`  
+ Append `.disabled` on all `iwlwifi-5000-*.ucode` on `/lib/firmware`. (e.g. `iwlwifi-5000-5.ucode` to `iwlwifi-5000-5.ucode.disabled`)  

## On transmitter
```
./prepare_tx.sh
cd ./injection; make
./log_to_file [packet_count] [packet_size] 1
```

## On receiver
```
./prepare_rx.sh
cd ./capture; make
./log_to_file [filename].dat
```

## How to use recorded `.dat` file
Please refer to [this README](https://github.com/widh/syaa-tools#readme).  

## About channels, HT mode, MIMO, MCS
I configured the script to use channel 64 in HT40- mode, and to use 3x3 MIMO.  

#### Changing channel
You have to change `prepare_tx.sh` and `prepare_rx.sh`.  
By simply change `# Set Channel` part, you can easily change channel.  

#### Changing MIMO, MCS, and HT mode
You have to change `prepare_tx.sh` and `prepare_rx.sh`.  
In `# Set transaction rate` part of `prepare_tx.sh`, there is a strange hex integer: `0x1C913`.  
This is a summation below.  

+ `0x1c000` : Use all antennas → Related to MIMO  
+ `0x00900` : HT40 mode → Related to HT mode  
+ `0x00013` : The number of streams and MCS → Related to MIMO and MCS  

With referring [here](https://github.com/widh/BPI-R2-CSITool-Kernel/blob/master/drivers/net/wireless/iwlwifi/dvm/commands.h#L245-L333), you can change this flag parameter as your intention.  
If you changed HT mode, you should change `# Set channel` part of `prepare_tx.sh` and `prepare_rx.sh`.  

## License
This repository is based on [linux-80211n-csitool-supplementary](http://github.com/dhalperi/linux-80211n-csitool-supplementary).  
See the [based project FAQ](http://dhalperi.github.io/linux-80211n-csitool/faq.html) for licensing information.  

