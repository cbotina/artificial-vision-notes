# Entropy of Stochastic Process - Interactive Playground

An interactive web application for visualizing and understanding the entropy formula for stochastic processes.

## Features

- **Interactive Signal Visualization**: See how a signal is built sample by sample
- **Real-time Entropy Calculation**: Watch entropy H_N change as you adjust the signal length N
- **Step-by-Step Formula Breakdown**: Understand each step of the entropy calculation
- **Educational Tool**: Perfect for students learning about stochastic processes and entropy

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## How to Use

1. **Adjust Signal Length**: Use the slider to change N (the number of samples in the signal)
2. **Watch the Visualization**: See the signal plot update in real-time
3. **Explore the Formula**: Click through the step-by-step breakdown to understand how entropy is calculated
4. **Learn**: Read the explanation section to understand the theoretical background

## Technical Details

- **Framework**: React 19 with TypeScript
- **Visualization**: React-Konva for canvas rendering
- **Animations**: Framer Motion for smooth transitions
- **Math Rendering**: KaTeX for LaTeX formula display
- **Styling**: Tailwind CSS

## Note on Calculation

The actual entropy formula requires computing an N-dimensional joint PDF and N-dimensional integral, which is computationally expensive. This visualization uses a simplified discrete approximation (histogram-based) to demonstrate the concept in real-time while showing the theoretical formula.
