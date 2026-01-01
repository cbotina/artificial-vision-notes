# Instructions for Working on Lectures

## Structure

- Each lecture has its own folder: `lectures/lecture_XXX/`
- Lectures can be split into multiple `.tex` files (e.g., `perception_systems.tex`, `visual_system.tex`)
- Files are included in `index.tex` using `\input{lectures/lecture_XXX/filename}`

## Creating New Lectures

1. **Create folder**: `lectures/lecture_XXX/` (e.g., `lecture_002`)
2. **Create `.tex` file(s)**: Use descriptive names (e.g., `perception_system_elements.tex`)
3. **Add to `index.tex`**: Add section entry:
   ```latex
   \section*{Lecture XXX}
   \input{lectures/lecture_XXX/filename}
   ```

## Style Guidelines

### Content
- **Language**: All content in English (translate from Spanish course material)
- **Tone**: Concise, accessible, easy to understand
- **Theory sections**: Very summarized, keep only important concepts
- **Examples**: Include real-life examples when helpful

### Structure
- Use `\section{}` for main sections
- Use `\subsection{}` for major topics
- Use `\subsubsection{}` sparingly (prefer paragraphs or bullet points)
- Use `\paragraph{}` for subsections within subsubsections

### Formatting
- **Bold** for key terms: `\textbf{Term}`
- **Italics** for examples: `\textit{Example:}`
- Spanish terms in parentheses: `\textbf{Term} (\textit{Spanish term})`
- Use `tcolorbox` for notes and important facts
- Use `\begin{enumerate}` or `\begin{itemize}` for lists

### Equations
- Always label equations: `\label{eq:name}`
- Reference equations: `Equation~\ref{eq:name}`
- Use `align*` for multi-line equations

### Figures
- Use `[H]` placement for figures
- Include descriptive captions
- Reference figures: `Figure~\ref{fig:name}`

## Exercises

- Create yellow boxes: `\begin{tcolorbox}[colback=yellow!5!white, colframe=yellow!75!black, title=\textbf{Exercises}]`
- Box title: "Exercises"
- Each exercise title on its own line: `\textbf{Exercise X:}`
- Include topics list in the yellow box
- Exercises go outside the yellow box (box only contains title and topics)

## Common Patterns

### Spanish Terms
When introducing terms, include Spanish in parentheses:
```latex
\textbf{Term} (\textit{Spanish term})
```

### Examples
Format examples consistently:
```latex
\textbf{Example:} Description of the example.
```

### Notes
Use tcolorbox for important notes:
```latex
\begin{tcolorbox}[colback=blue!5!white, colframe=blue!75!black, title=\textbf{Note}]
Content here.
\end{tcolorbox}
```

## Workflow

1. Read existing lecture files to understand style
2. Translate/summarize Spanish content to English
3. Create new files following the structure
4. Add to `index.tex` in correct order
5. Check for linting errors: `read_lints`
6. Keep content concise and accessible

## Current Status

- ✅ Lecture 001: Perception Systems (Auditive & Visual)
- ✅ Lecture 002: Elements of a Perception System
- ✅ Lecture 003: Introduction & Sampling
- ✅ Lecture 004: Entropy
- ✅ Lecture 005: Anomaly Detection
- ✅ Lecture 006: Image Processing - Elementary Operations