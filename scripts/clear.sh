#!/bin/bash

# Script to clean LaTeX auxiliary files
# Usage: ./scripts/clear.sh

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Change to project directory
cd "$PROJECT_DIR" || exit 1

echo "Cleaning LaTeX auxiliary files..."

# Remove LaTeX auxiliary files
rm -f *.aux *.log *.out *.toc *.synctex.gz *.fls *.fdb_latexmk
rm -f *.idx *.ilg *.ind
rm -f *.bbl *.blg
rm -f *.pdf # Output PDF file
rm -f *.nav *.snm *.vrb  # Beamer files
rm -f *.bcf *.run.xml     # Biber files
rm -f *.lof *.lot *.lol   # List of figures/tables/listings

echo "✓ LaTeX auxiliary files removed."

