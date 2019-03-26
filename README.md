# BPI-R2 CSITool Data Acquirer

This repository contains modified csitool for BPI-R2 for data acquiring.  

## Preparation
#### Kernel & Driver
Please refer [this README](https://github.com/widh/BPI-R2-CSITool-Kernel#readme).  

#### Install lorcon
+ Git clone `https://github.com/dhalperi/lorcon-old`  
+ `make` and `sudo make install` on `./lorcon-old/`  

#### Download this repository
+ Git clone `https://github.com/widh/BPI-R2-CSITool-DataAcquirer`  
+ `cd BPI-R2-CSITool-DataAcquirer`

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
Please refer to [this README](https://github.com/widh/POSCA-tools#readme).  

## License
This repository is based on [linux-80211n-csitool-supplementary](http://dhalperi.github.com/linux-80211n-csitool-supplementary).  
See the [based project FAQ](http://dhalperi.github.com/linux-80211n-csitool/faq.html) for licensing information.  

