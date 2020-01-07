#!/usr/bin/sudo /bin/bash

# Turn off all network-related services
systemctl stop network-manager 2>/dev/null 1>/dev/null
systemctl stop wicd 2>/dev/null 1>/dev/null

# Reload driver with debugging flag
modprobe -r iwldvm
modprobe iwlwifi debug=0x40000

# Loop until driver loaded
ifconfig wlp1s0 2>/dev/null 1>/dev/null
while [ $? -ne 0 ]; do
  ifconfig wlp1s0 2>/dev/null 1>/dev/null
done
ifconfig wlp1s0 down

# Add interface with monitor mode
iw dev wlp1s0 interface add mon0 type monitor
ifconfig mon0 up

# Set channel
iw dev mon0 set channel 64 HT40-

# Set transaction rate
# Use 1 antenna, send with 1 stream
# Run ./get_flag.js to get flags
echo 0x4d01 | sudo tee `sudo find /sys -name monitor_tx_rate` 1>/dev/null

