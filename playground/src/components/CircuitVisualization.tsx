import { Stage, Layer, Line, Circle, Rect, Text, Group } from 'react-konva';
import { useEffect, useState } from 'react';

interface CircuitVisualizationProps {
  voltage: number;
  current: number;
  resistance: number;
  width: number;
  height: number;
}

interface Electron {
  id: number;
  x: number;
  y: number;
  progress: number; // 0 to 1 along the circuit path
}

export function CircuitVisualization({
  voltage,
  current,
  resistance,
  width,
  height,
}: CircuitVisualizationProps) {
  const [electrons, setElectrons] = useState<Electron[]>([]);
  const [animationFrame, setAnimationFrame] = useState(0);

  // Calculate number of electrons based on current
  // More current = more electrons visible
  const numElectrons = Math.max(3, Math.min(15, Math.floor(current * 2)));

  // Calculate electron speed based on current
  const electronSpeed = current * 0.02; // Speed multiplier

  // Calculate brightness/intensity based on power (V × I)
  const power = voltage * current;
  const maxPower = 24 * 10; // Max possible power
  const brightness = Math.min(1, power / maxPower);
  const bulbIntensity = 0.3 + brightness * 0.7; // 0.3 to 1.0

  // Circuit path coordinates
  const padding = 60;
  const circuitWidth = width - 2 * padding;
  const circuitHeight = height - 2 * padding;
  const centerY = height / 2;

  // Define circuit path points
  const pathPoints = [
    { x: padding, y: centerY }, // Start (battery negative)
    { x: padding + circuitWidth * 0.3, y: centerY }, // Before resistor
    { x: padding + circuitWidth * 0.3, y: centerY - 40 }, // Up to resistor
    { x: padding + circuitWidth * 0.7, y: centerY - 40 }, // Across resistor
    { x: padding + circuitWidth * 0.7, y: centerY }, // Down from resistor
    { x: padding + circuitWidth * 0.85, y: centerY }, // Before bulb
    { x: padding + circuitWidth * 0.85, y: centerY + 40 }, // Down to bulb
    { x: padding + circuitWidth * 0.95, y: centerY + 40 }, // Across bulb
    { x: padding + circuitWidth * 0.95, y: centerY }, // Up from bulb
    { x: padding + circuitWidth, y: centerY }, // End (battery positive)
  ];

  // Initialize electrons
  useEffect(() => {
    const newElectrons: Electron[] = [];
    for (let i = 0; i < numElectrons; i++) {
      newElectrons.push({
        id: i,
        x: 0,
        y: 0,
        progress: (i / numElectrons) % 1, // Distribute along path
      });
    }
    setElectrons(newElectrons);
  }, [numElectrons]);

  // Animate electrons
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame((prev) => prev + 1);
      setElectrons((prev) =>
        prev.map((electron) => ({
          ...electron,
          progress: (electron.progress + electronSpeed) % 1,
        }))
      );
    }, 50); // Update every 50ms

    return () => clearInterval(interval);
  }, [electronSpeed]);

  // Calculate position along path
  const getPositionAlongPath = (progress: number) => {
    const totalLength = pathPoints.length - 1;
    const segmentIndex = Math.floor(progress * totalLength);
    const segmentProgress = (progress * totalLength) % 1;
    const segmentIndexClamped = Math.min(segmentIndex, pathPoints.length - 2);

    const p1 = pathPoints[segmentIndexClamped];
    const p2 = pathPoints[segmentIndexClamped + 1];

    return {
      x: p1.x + (p2.x - p1.x) * segmentProgress,
      y: p1.y + (p2.y - p1.y) * segmentProgress,
    };
  };

  // Calculate resistance visual (width of resistor)
  const resistorWidth = 20 + (resistance / 20) * 30; // Visual representation

  return (
    <div className="flex justify-center">
      <Stage width={width} height={height}>
        <Layer>
          {/* Background */}
          <Rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="#f9fafb"
          />

          {/* Circuit wires */}
          <Group>
            {pathPoints.slice(0, -1).map((point, index) => {
              const nextPoint = pathPoints[index + 1];
              return (
                <Line
                  key={`wire-${index}`}
                  points={[point.x, point.y, nextPoint.x, nextPoint.y]}
                  stroke="#374151"
                  strokeWidth={4}
                  lineCap="round"
                  lineJoin="round"
                />
              );
            })}
          </Group>

          {/* Battery */}
          <Group x={padding - 20} y={centerY - 25}>
            <Rect
              x={0}
              y={0}
              width={15}
              height={20}
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth={2}
            />
            <Rect
              x={0}
              y={20}
              width={15}
              height={20}
              fill="#3b82f6"
              stroke="#2563eb"
              strokeWidth={2}
            />
            <Text
              x={20}
              y={15}
              text={`${voltage.toFixed(1)}V`}
              fontSize={14}
              fill="#374151"
              fontStyle="bold"
            />
          </Group>

          {/* Resistor */}
          <Group
            x={padding + circuitWidth * 0.3 - resistorWidth / 2}
            y={centerY - 40 - 15}
          >
            <Rect
              x={0}
              y={0}
              width={resistorWidth}
              height={30}
              fill="#ef4444"
              stroke="#dc2626"
              strokeWidth={2}
              cornerRadius={4}
            />
            <Text
              x={resistorWidth / 2}
              y={35}
              text={`${resistance.toFixed(1)}Ω`}
              fontSize={12}
              fill="#374151"
              fontStyle="bold"
              align="center"
              offsetX={20}
            />
          </Group>

          {/* Light Bulb */}
          <Group
            x={padding + circuitWidth * 0.85}
            y={centerY + 40 - 15}
          >
            {/* Bulb glow (intensity based on power) */}
            <Circle
              x={15}
              y={15}
              radius={20 * bulbIntensity}
              fill={`rgba(255, 255, 0, ${0.3 * bulbIntensity})`}
            />
            <Circle
              x={15}
              y={15}
              radius={15}
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth={2}
              opacity={bulbIntensity}
            />
            {/* Bulb base */}
            <Rect
              x={10}
              y={25}
              width={10}
              height={8}
              fill="#6b7280"
            />
            <Text
              x={15}
              y={40}
              text={`${current.toFixed(2)}A`}
              fontSize={12}
              fill="#374151"
              fontStyle="bold"
              align="center"
              offsetX={15}
            />
          </Group>

          {/* Electrons */}
          {electrons.map((electron) => {
            const pos = getPositionAlongPath(electron.progress);
            return (
              <Circle
                key={electron.id}
                x={pos.x}
                y={pos.y}
                radius={4}
                fill="#3b82f6"
                stroke="#1e40af"
                strokeWidth={1}
              />
            );
          })}

          {/* Current direction indicator */}
          <Group>
            {pathPoints.slice(0, -1).map((point, index) => {
              const nextPoint = pathPoints[index + 1];
              const midX = (point.x + nextPoint.x) / 2;
              const midY = (point.y + nextPoint.y) / 2;
              const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x);

              // Only show arrows on horizontal/vertical segments
              if (Math.abs(angle) < 0.1 || Math.abs(angle - Math.PI) < 0.1 || 
                  Math.abs(angle - Math.PI/2) < 0.1 || Math.abs(angle + Math.PI/2) < 0.1) {
                return (
                  <Group
                    key={`arrow-${index}`}
                    x={midX}
                    y={midY}
                    rotation={(angle * 180) / Math.PI}
                  >
                    <Line
                      points={[-8, 0, 0, 0]}
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                    <Line
                      points={[0, 0, -6, -4]}
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                    <Line
                      points={[0, 0, -6, 4]}
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </Group>
                );
              }
              return null;
            })}
          </Group>

          {/* Labels */}
          <Text
            x={padding + circuitWidth * 0.5}
            y={centerY - 80}
            text="Resistor"
            fontSize={14}
            fill="#374151"
            fontStyle="bold"
            align="center"
            offsetX={30}
          />
          <Text
            x={padding + circuitWidth * 0.9}
            y={centerY + 80}
            text="Light Bulb"
            fontSize={14}
            fill="#374151"
            fontStyle="bold"
            align="center"
            offsetX={40}
          />
        </Layer>
      </Stage>
    </div>
  );
}

