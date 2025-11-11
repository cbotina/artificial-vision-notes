#!/bin/bash

# Script to build the LaTeX document
# Usage: ./scripts/build.sh

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Change to project directory
cd "$PROJECT_DIR" || exit 1

echo "Building LaTeX document..."

# Check if latexmk is available (preferred method)
if command -v latexmk &> /dev/null; then
    echo "Using latexmk..."
    latexmk -pdf -interaction=nonstopmode -file-line-error index.tex
    EXIT_CODE=$?
    
    if [ $EXIT_CODE -eq 0 ]; then
        echo "✓ Build successful!"
    else
        echo "✗ Build failed. Check index.log for details."
        exit $EXIT_CODE
    fi
else
    echo "latexmk not found. Using pdflatex..."
    echo "Running pdflatex (first pass)..."
    pdflatex -interaction=nonstopmode -file-line-error index.tex > /dev/null
    
    echo "Running pdflatex (second pass for references)..."
    pdflatex -interaction=nonstopmode -file-line-error index.tex > /dev/null
    
    if [ -f "index.pdf" ]; then
        echo "✓ Build successful!"
    else
        echo "✗ Build failed. Check index.log for details."
        exit 1
    fi
fi

