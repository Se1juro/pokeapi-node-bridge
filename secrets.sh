NAME=${1:-blank}

# Key size (default 4096)
SIZE=${2:-4096}

# Key pair destination. Change this to your own home directory
DEST=${3:-./secrets/}

# Public/Private key files
PRIK=$DEST$NAME.pem
PUBK=$DEST$NAME.pub

# If either exists, avoid overwrite
if [ -f "$PRIK" ] || [ -f "$PUBK" ]; then
	echo "A key by that name already exists"
	exit 0
fi

# Generate password encrypted private key and plain public key

# This will prompt for a password which will be used to encrypt the 
# private key
openssl genrsa -aes256 -out $PRIK $SIZE &&
openssl rsa -in $PRIK -out $PUBK -pubout

exit