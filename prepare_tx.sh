#!/usr/bin/sudo /bin/bash
systemctl stop network-manager 2>/dev/null 1>/dev/null
systemctl stop wicd 2>/dev/null 1>/dev/null
modprobe -r iwldvm
modprobe iwlwifi debug=0x40000
echo 0x4D01 | sudo tee `sudo find /sys -name monitor_tx_rate`
ifconfig wlp1s0 2>/dev/null 1>/dev/null
while [ $? -ne 0 ]
do
	ifconfig wlp1s0 2>/dev/null 1>/dev/null
done
iw dev wlp1s0 interface add mon0 type monitor
ifconfig mon0 up
ifconfig wlp1s0 down
iw mon0 set channel $1 $2
