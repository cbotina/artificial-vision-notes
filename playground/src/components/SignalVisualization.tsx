import { Stage, Layer, Line, Circle, Text, Group } from 'react-konva';
import type { SignalPoint } from '../utils/entropyCalculator';

interface SignalVisualizationProps {
  signal: SignalPoint[];
  width: number;
  height: number;
  padding?: number;
}

export function SignalVisualization({
  signal,
  width,
  height,
  padding = 40
}: SignalVisualizationProps) {
  const plotWidth = width - 2 * padding;
  const plotHeight = height - 2 * padding;
  
  const maxIndex = Math.max(...signal.map(p => p.index), 1);
  const minValue = -2;
  const maxValue = 2;
  
  // Scale functions
  const scaleX = (index: number) => padding + (index / maxIndex) * plotWidth;
  const scaleY = (value: number) => padding + plotHeight - ((value - minValue) / (maxValue - minValue)) * plotHeight;
  
  // Create line path
  const linePoints: number[] = [];
  signal.forEach(point => {
    linePoints.push(scaleX(point.index));
    linePoints.push(scaleY(point.value));
  });
  
  // Grid lines
  const gridLines: React.ReactElement[] = [];
  
  // Vertical grid lines (x-axis)
  for (let i = 0; i <= 5; i++) {
    const x = padding + (i / 5) * plotWidth;
    gridLines.push(
      <Line
        key={`v-${i}`}
        points={[x, padding, x, padding + plotHeight]}
        stroke="#e5e7eb"
        strokeWidth={1}
        dash={[5, 5]}
      />
    );
  }
  
  // Horizontal grid lines (y-axis)
  for (let i = 0; i <= 4; i++) {
    const y = padding + (i / 4) * plotHeight;
    gridLines.push(
      <Line
        key={`h-${i}`}
        points={[padding, y, padding + plotWidth, y]}
        stroke="#e5e7eb"
        strokeWidth={1}
        dash={[5, 5]}
      />
    );
  }
  
  // Axis labels
  const xLabels: React.ReactElement[] = [];
  const xTickValues = [0, Math.floor(maxIndex / 4), Math.floor(maxIndex / 2), Math.floor(3 * maxIndex / 4), maxIndex];
  xTickValues.forEach((val, i) => {
    const x = scaleX(val);
    const label = i === xTickValues.length - 1 ? 'N' : val.toString();
    xLabels.push(
      <Text
        key={`x-label-${i}`}
        x={x - 10}
        y={padding + plotHeight + 10}
        text={label}
        fontSize={12}
        fill="#374151"
      />
    );
  });
  
  const yLabels: React.ReactElement[] = [];
  const yTickValues = [-2, -1, 0, 1, 2];
  yTickValues.forEach((val, i) => {
    const y = scaleY(val);
    yLabels.push(
      <Text
        key={`y-label-${i}`}
        x={padding - 25}
        y={y - 6}
        text={val.toString()}
        fontSize={12}
        fill="#374151"
        align="right"
      />
    );
  });
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <Stage width={width} height={height}>
        <Layer>
          {/* Grid */}
          {gridLines}
          
          {/* Axes */}
          <Line
            points={[padding, padding + plotHeight, padding + plotWidth, padding + plotHeight]}
            stroke="#374151"
            strokeWidth={2}
          />
          <Line
            points={[padding, padding, padding, padding + plotHeight]}
            stroke="#374151"
            strokeWidth={2}
          />
          
          {/* Axis labels */}
          {xLabels}
          {yLabels}
          
          {/* Axis titles */}
          <Text
            x={padding + plotWidth / 2 - 60}
            y={height - 20}
            text="Sample index i"
            fontSize={14}
            fill="#374151"
            fontStyle="bold"
          />
          <Text
            x={10}
            y={padding + plotHeight / 2 - 40}
            text="Signal value x_i"
            fontSize={14}
            fill="#374151"
            fontStyle="bold"
            rotation={-90}
          />
          
          {/* Signal line */}
          {signal.length > 1 && (
            <Line
              points={linePoints}
              stroke="#3b82f6"
              strokeWidth={2}
              dash={[5, 5]}
              opacity={0.5}
            />
          )}
          
          {/* Signal points */}
          {signal.map((point, index) => (
            <Circle
              key={`point-${index}`}
              x={scaleX(point.index)}
              y={scaleY(point.value)}
              radius={4}
              fill="#3b82f6"
              stroke="#1e40af"
              strokeWidth={1}
            />
          ))}
          
          {/* N annotation */}
          {signal.length > 0 && (
            <Group>
              <Text
                x={scaleX(maxIndex) - 20}
                y={padding - 25}
                text={`N = ${signal.length}`}
                fontSize={14}
                fill="#dc2626"
                fontStyle="bold"
              />
              <Line
                points={[scaleX(maxIndex), padding - 10, scaleX(maxIndex), scaleY(signal[signal.length - 1].value)]}
                stroke="#dc2626"
                strokeWidth={2}
              />
            </Group>
          )}
        </Layer>
      </Stage>
    </div>
  );
}

