#!/usr/bin/sudo /bin/bash

# Turn off all network-related services
systemctl stop network-manager 2>/dev/null 1>/dev/null
systemctl stop wicd 2>/dev/null 1>/dev/null

# Reload driver with IWL_BFEE_NOTIF_MSK flag
modprobe -r iwldvm
modprobe iwlwifi connector_log=0x1

# Loop until driver loaded
ifconfig wlp1s0 2>/dev/null 1>/dev/null
while [ $? -ne 0 ]; do
	ifconfig wlp1s0 2>/dev/null 1>/dev/null
done

# Set monitor mode
ifconfig wlp1s0 down
iwconfig wlp1s0 mode monitor 2>/dev/null 1>/dev/null
while [ $? -ne 0 ]; do
	iwconfig wlp1s0 mode monitor 2>/dev/null 1>/dev/null
done
ifconfig wlp1s0 up

# Set channel
iw wlp1s0 set channel 64 HT40-

