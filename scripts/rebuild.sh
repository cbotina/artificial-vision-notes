#!/bin/bash

# Script to clean LaTeX output files and rebuild the document
# Usage: ./scripts/rebuild.sh
# This script calls clear.sh and then build.sh

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Run clear.sh
"$SCRIPT_DIR/clear.sh"

# Run build.sh
"$SCRIPT_DIR/build.sh"

echo "Done!"
