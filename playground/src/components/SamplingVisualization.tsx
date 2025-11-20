import { Stage, Layer, Line, Circle, Text, Group } from 'react-konva';
import { useMemo } from 'react';
import {
  originalSignal,
  sampleSignal,
  sincReconstruct,
  generateContinuousTimePoints,
  generateSampleTimePoints,
  getSamplingStatus,
  SIGNAL_CONFIG,
} from '../utils/samplingCalculator';

interface SamplingVisualizationProps {
  samplingRate: number;
  timeWindow: [number, number];
  width: number;
  height: number;
  showReconstruction?: boolean;
}

export function SamplingVisualization({
  samplingRate,
  timeWindow: [tStart, tEnd],
  width,
  height,
  showReconstruction = true,
}: SamplingVisualizationProps) {
  const padding = { top: 30, right: 20, bottom: 50, left: 60 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Generate data
  const { originalData, sampledData, reconstructedData, sampleStatus } = useMemo(() => {
    // Continuous signal
    const continuousTimes = generateContinuousTimePoints(tStart, tEnd, 500);
    const originalValues = continuousTimes.map(t => originalSignal(t));

    // Sampled signal
    const sampleTimes = generateSampleTimePoints(tStart, tEnd, samplingRate);
    const sampleValues = sampleSignal(sampleTimes);

    // Reconstructed signal (if enabled)
    let reconstructedValues: number[] = [];
    if (showReconstruction) {
      reconstructedValues = continuousTimes.map(t =>
        sincReconstruct(t, sampleTimes, sampleValues, 1 / samplingRate)
      );
    }

    const status = getSamplingStatus(samplingRate);

    return {
      originalData: { times: continuousTimes, values: originalValues },
      sampledData: { times: sampleTimes, values: sampleValues },
      reconstructedData: { times: continuousTimes, values: reconstructedValues },
      sampleStatus: status,
    };
  }, [samplingRate, tStart, tEnd, showReconstruction]);

  // Find value range for scaling
  const allValues = [
    ...originalData.values,
    ...sampledData.values,
    ...(showReconstruction ? reconstructedData.values : []),
  ];
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const valueRange = maxValue - minValue || 1;
  const valuePadding = valueRange * 0.1;

  // Scale functions
  const scaleX = (t: number) =>
    padding.left + ((t - tStart) / (tEnd - tStart)) * plotWidth;
  const scaleY = (value: number) =>
    padding.top +
    plotHeight -
    ((value - minValue + valuePadding) / (valueRange + 2 * valuePadding)) *
      plotHeight;

  // Create line paths
  const originalPath: number[] = [];
  originalData.times.forEach((t, i) => {
    originalPath.push(scaleX(t));
    originalPath.push(scaleY(originalData.values[i]));
  });

  const reconstructedPath: number[] = [];
  if (showReconstruction) {
    reconstructedData.times.forEach((t, i) => {
      reconstructedPath.push(scaleX(t));
      reconstructedPath.push(scaleY(reconstructedData.values[i]));
    });
  }

  // Grid lines
  const gridLines: React.ReactElement[] = [];
  const numGridLinesX = 5;
  const numGridLinesY = 5;

  for (let i = 0; i <= numGridLinesX; i++) {
    const x = padding.left + (i / numGridLinesX) * plotWidth;
    gridLines.push(
      <Line
        key={`v-${i}`}
        points={[x, padding.top, x, padding.top + plotHeight]}
        stroke="#e5e7eb"
        strokeWidth={1}
        dash={[5, 5]}
      />
    );
  }

  for (let i = 0; i <= numGridLinesY; i++) {
    const y = padding.top + (i / numGridLinesY) * plotHeight;
    gridLines.push(
      <Line
        key={`h-${i}`}
        points={[padding.left, y, padding.left + plotWidth, y]}
        stroke="#e5e7eb"
        strokeWidth={1}
        dash={[5, 5]}
      />
    );
  }

  // Axis labels
  const xLabels: React.ReactElement[] = [];
  for (let i = 0; i <= numGridLinesX; i++) {
    const t = tStart + (i / numGridLinesX) * (tEnd - tStart);
    const x = scaleX(t);
    xLabels.push(
      <Text
        key={`x-label-${i}`}
        x={x - 15}
        y={padding.top + plotHeight + 10}
        text={t.toFixed(3)}
        fontSize={10}
        fill="#374151"
      />
    );
  }

  const yLabels: React.ReactElement[] = [];
  for (let i = 0; i <= numGridLinesY; i++) {
    const value =
      minValue - valuePadding +
      (i / numGridLinesY) * (valueRange + 2 * valuePadding);
    const y = scaleY(value);
    yLabels.push(
      <Text
        key={`y-label-${i}`}
        x={padding.left - 50}
        y={y - 6}
        text={value.toFixed(1)}
        fontSize={10}
        fill="#374151"
        align="right"
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <Stage width={width} height={height}>
        <Layer>
          {/* Grid */}
          {gridLines}

          {/* Axes */}
          <Line
            points={[
              padding.left,
              padding.top + plotHeight,
              padding.left + plotWidth,
              padding.top + plotHeight,
            ]}
            stroke="#374151"
            strokeWidth={2}
          />
          <Line
            points={[
              padding.left,
              padding.top,
              padding.left,
              padding.top + plotHeight,
            ]}
            stroke="#374151"
            strokeWidth={2}
          />

          {/* Axis labels */}
          {xLabels}
          {yLabels}

          {/* Axis titles */}
          <Text
            x={padding.left + plotWidth / 2 - 40}
            y={height - 20}
            text="Time (s)"
            fontSize={12}
            fill="#374151"
            fontStyle="bold"
          />
          <Text
            x={10}
            y={padding.top + plotHeight / 2 - 30}
            text="Amplitude"
            fontSize={12}
            fill="#374151"
            fontStyle="bold"
            rotation={-90}
          />

          {/* Original signal */}
          <Line
            points={originalPath}
            stroke="#3b82f6"
            strokeWidth={2}
            opacity={0.7}
          />

          {/* Reconstructed signal */}
          {showReconstruction && reconstructedPath.length > 0 && (
            <Line
              points={reconstructedPath}
              stroke={sampleStatus.color}
              strokeWidth={2}
              dash={[10, 5]}
            />
          )}

          {/* Sample points */}
          {sampledData.times.map((t, i) => {
            const x = scaleX(t);
            const y = scaleY(sampledData.values[i]);
            return (
              <Circle
                key={`sample-${i}`}
                x={x}
                y={y}
                radius={4}
                fill={sampleStatus.color}
                stroke="#1f2937"
                strokeWidth={1}
              />
            );
          })}

          {/* Status indicator */}
          <Group>
            <Text
              x={padding.left + 10}
              y={10}
              text={`${sampleStatus.message}`}
              fontSize={12}
              fill={sampleStatus.color}
              fontStyle="bold"
            />
            <Text
              x={padding.left + 10}
              y={25}
              text={`f_s = ${samplingRate} Hz | f_max = ${SIGNAL_CONFIG.fMax} Hz | Nyquist = ${SIGNAL_CONFIG.nyquistRate} Hz`}
              fontSize={10}
              fill="#6b7280"
            />
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}

