# POSCA CSI tool

This repository contains modified csitool for BPI-R2 for data acquiring.  

## Preparation
#### Install libraries
+ Install `libpcap-dev`  
+ Git clone `https://github.com/dhalperi/lorcon-old.git`  
+ `make` and `sudo make install` on `./lorcon-old/`  
+ Git clone `https://github.com/widh/posca-csi`  

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

## License
See the [based project FAQ](http://dhalperi.github.com/linux-80211n-csitool/faq.html) for licensing information.
