# LaTeX Project - Artificial Vision

This project is used to study, summarize, and explain concepts for subjects of the Master's Degree in Artificial Intelligence. It serves as a comprehensive reference material that complements course sessions with detailed explanations, visualizations, and additional resources. It contains a LaTeX document project with Python notebooks for generating figures and visualizations.


## Requirements

### LaTeX Distribution

You need a LaTeX distribution installed on your system. This project uses **BasicTeX** (recommended for macOS).

#### macOS - BasicTeX (Recommended)

1. Install [BasicTeX](https://www.tug.org/mactex/mactex-basictex.html)

2. Install required packages:
   ```bash
   sudo tlmgr update --self
   sudo tlmgr install latexmk
   sudo tlmgr install collection-fontsrecommended
   # Install other packages as needed when compiling
   ```

#### Other Options

- **macOS**: [MacTeX](https://www.tug.org/mactex/) (full distribution, larger download)
- **Linux**: `texlive-full` or `texlive-most` packages
- **Windows**: [MiKTeX](https://miktex.org/) or [TeX Live](https://www.tug.org/texlive/)

### Python Environment

Python 3.x with the following packages:
- `numpy`
- `matplotlib`
- `jupyter` or `jupyterlab` (for running notebooks)

Install dependencies:
```bash
pip install numpy matplotlib jupyter
```

## Project Structure

```
.
├── index.tex              # Main LaTeX document
├── sections/              # LaTeX section files
├── notebooks/             # Jupyter notebooks for generating figures
├── img/                   # Generated images (created by notebooks)
├── scripts/               # Build scripts
│   ├── clear.sh          # Clean auxiliary files
│   ├── build.sh          # Build LaTeX document
│   └── rebuild.sh        # Clean and build
└── References.bib        # Bibliography file (if used)
```

## Building the Document

### Important: Execute Notebooks First

**Before compiling the LaTeX document, you must execute all Python notebooks** in the `notebooks/` directory. These notebooks generate the images that are included in the LaTeX document.

1. **Run the notebooks**:
   
   Execute all cells in each notebook. The notebooks will save generated images to the `img/` directory.

2. **Build the LaTeX document**:
   
   **Option A: Using the build scripts** (recommended)
   ```bash
   # Clean auxiliary files
   ./scripts/clear.sh
   
   # Build the document
   ./scripts/build.sh
   
   # Or clean and build in one step
   ./scripts/rebuild.sh
   ```
   
   **Option B: Using latexmk directly**
   ```bash
   latexmk -pdf -interaction=nonstopmode index.tex
   ```
   
   **Option C: Using pdflatex directly**
   ```bash
   pdflatex -interaction=nonstopmode index.tex
   pdflatex -interaction=nonstopmode index.tex  # Run twice for references
   ```

## Workflow

1. **Edit content**: Modify LaTeX files in `sections/` or `index.tex`
2. **Update figures** (if needed): Edit and re-run notebooks in `notebooks/`
3. **Build**: Run `./scripts/rebuild.sh` or use your preferred build method
4. **View**: Open `index.pdf` to see the compiled document

## Troubleshooting

### Missing LaTeX packages

If you get errors about missing packages, install them using `tlmgr`:
```bash
sudo tlmgr install <package-name>
```

### Images not found

If LaTeX complains about missing images:
- Make sure you've executed all notebooks in `notebooks/`
- Check that images are saved in the `img/` directory
- Verify image filenames in LaTeX match the actual filenames

### Build errors

- Check `index.log` for detailed error messages
- Ensure all required LaTeX packages are installed
- Verify that notebooks have been executed and images are generated


