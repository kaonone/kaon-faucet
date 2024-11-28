#!/bin/bash

# Ethereum address to check balance
echo "Selected Ethereum address: $ETH_ADDRESS"
echo "Selected Kaon address: $KAON_ADDRESS"
echo "Selected EVM API URL: $RPC_URL"

KAON_RPC_PROTOCOL=$(echo "$KAON_RPC" | grep '://' | sed -e's,^\(.*://\).*,\1,g')
KAON_RPC_NO_PROTOCOL=$(echo "$KAON_RPC" | sed -e's,^\(.*://\),,g')
KAON_RPC_AUTH=$(echo "$KAON_RPC_NO_PROTOCOL" | cut -d@ -f1)
KAON_RPC_HOST_PORT=$(echo "$KAON_RPC_NO_PROTOCOL" | cut -d@ -f2)
KAON_RPC_URL="$KAON_RPC_PROTOCOL$KAON_RPC_HOST_PORT"

if [ -z "$KAON_RPC_AUTH" ] || [ -z "$KAON_RPC_URL" ]; then
  echo "Error: Unable to parse KAON_RPC."
  exit 1
fi

# Threshold in tokens (as a decimal number)
THRESHOLD=10000

# Amount to send in tokens
AMOUNT_TO_SEND=10000

# Function to convert hex to decimal
hex_to_decimal() {
  echo "ibase=16; ${1^^}" | bc
  # bc supports large values and won't be overflown
  # however it needs the input hex to be uppercased
}

# Function to convert wei to tokens (divide by 1e18)
wei_to_tokens() {
  printf "%.0f" "$(echo "scale=18; $1 / (10^18)" | bc -l)"
}

# Ensure jq and bc are installed
if ! command -v jq &>/dev/null || ! command -v bc &>/dev/null; then
  echo "Error: 'jq' and 'bc' are required but not installed. Install them and try again."
  exit 1
fi

# Prepare JSON-RPC data for eth_getBalance
DATA=$(cat <<EOF
{
  "jsonrpc":"2.0",
  "method":"eth_getBalance",
  "params":["$ETH_ADDRESS", "latest"],
  "id":1
}
EOF
)

echo "eth_getBalance request DATA: $DATA"

# Get the balance (response is in wei, as a hex string)
RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" --data "$DATA" "$RPC_URL")

echo "eth_getBalance response RESPONSE: $RESPONSE"

# Extract the result field
BALANCE_HEX=$(echo "$RESPONSE" | jq -r '.result')

echo "eth_getBalance response BALANCE_HEX: $BALANCE_HEX"

# Check if BALANCE_HEX is valid
if [ -z "$BALANCE_HEX" ] || [ "$BALANCE_HEX" == "null" ]; then
  echo "Error: Unable to retrieve balance for address $ETH_ADDRESS."
  exit 1
fi

# Remove '0x' prefix if present
BALANCE_HEX=${BALANCE_HEX#0x}

echo "eth_getBalance response BALANCE_HEX w/o 0x: $BALANCE_HEX"

# Handle zero balance
if [ -z "$BALANCE_HEX" ]; then
  BALANCE_WEI=0
else
  # Convert hex balance to decimal wei
  BALANCE_WEI=$(hex_to_decimal "$BALANCE_HEX")
fi

echo "eth_getBalance response BALANCE_WEI: $BALANCE_WEI"

# Convert wei to tokens
BALANCE_TOKENS=$(wei_to_tokens "$BALANCE_WEI")
echo "Current balance for $ETH_ADDRESS: $BALANCE_TOKENS tokens"

# Compare balance with threshold
if (( BALANCE_TOKENS < THRESHOLD )); then
  echo "Balance is below threshold. Initiating transfer..."

  echo "Sending $AMOUNT_TO_SEND tokens (which is $AMOUNT_TO_SEND KAON units) to $KAON_ADDRESS"

    # Prepare JSON-RPC data for send transaction
  TX_DATA=$(cat <<EOF
{
  "jsonrpc": "1.0",
  "method": "sendtoaddress",
  "id": "100",
  "params": [
    "$KAON_ADDRESS", $AMOUNT_TO_SEND
  ]
}
EOF
)

  echo "sendtoaddress request TX_DATA: $TX_DATA"

  # Send the transaction using curl RPC call
  TX_RESPONSE=$(curl -s --user "$KAON_RPC_AUTH" -H "content-type:text/plain;" -d "$TX_DATA" "$KAON_RPC_URL")

  echo "sendtoaddress response TX_RESPONSE: $TX_RESPONSE"

  # Extract transaction ID
  TXID=$(echo "$TX_RESPONSE" | jq -r '.result')

  echo "sendtoaddress response TXID: $TXID"

  # Check if the transaction was successful
  if [ -z "$TXID" ] || [ "$TXID" == "null" ]; then
    echo "Error: Transaction failed."
    echo "Response: $TX_RESPONSE"
    exit 1
  else
    echo "Successfully sent $AMOUNT_TO_SEND tokens to $KAON_ADDRESS."
    echo "Transaction ID: $TXID"
  fi
else
  echo "Balance is above threshold. No action required."
fi
