#!/usr/bin/sudo /bin/bash
modprobe iwlwifi connector_log=0x1
# Setup monitor mode, loop until it works
iwconfig wlp1s0 mode monitor 2>/dev/null 1>/dev/null
while [ $? -ne 0 ]
do
	iwconfig wlp1s0 mode monitor 2>/dev/null 1>/dev/null
done
iw wlp1s0 set channel $1 $2
ifconfig wlp1s0 up
