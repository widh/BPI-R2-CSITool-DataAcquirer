#!/usr/bin/sudo /bin/bash
systemctl stop network-manager 2>/dev/null 1>/dev/null
systemctl stop wicd 2>/dev/null 1>/dev/null
modprobe -r iwldvm
modprobe iwlwifi connector_log=0x1
# Setup monitor mode, loop until it works
ifconfig wlp1s0 down
iwconfig wlp1s0 mode monitor 2>/dev/null 1>/dev/null
while [ $? -ne 0 ]
do
	iwconfig wlp1s0 mode monitor 2>/dev/null 1>/dev/null
done
ifconfig wlp1s0 up
iw wlp1s0 set channel $1 $2
