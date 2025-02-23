import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Camera, Color, Layer, LayerType, PathLayer, Point, Side, XYWH } from "@/types/canvas"

const COLORS = [
  "#D97706",
  "#059669",
  "#7C3AED",
  "#DB2777",
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length]
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX - camera.x),
    y: Math.round(e.clientY - camera.y),
  }
}

export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  }

  // Adjust the x position and width when resizing from the left
  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  // Adjust the x position and width when resizing from the right
  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  // Adjust the y position and height when resizing from the top
  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  // Adjust the y position and height when resizing from the bottom
  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result
}

export function findIntersectingLayersWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point
) {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y)
  }

  const ids = []

  for (const layerId of layerIds) {
    const layer = layers.get(layerId)

    if (!layer) continue

    const { x, y, width, height } = layer

    if (
      x < rect.x + rect.width &&
      x + width > rect.x &&
      y < rect.y + rect.height &&
      y + height > rect.y
    ) {
      ids.push(layerId)
    }
  }

  return ids
}

/**
 * Given a color, returns the most contrasting text color. The contrast is
 * calculated using the relative luminance of the color, which is a measure of
 * how bright the color is to the human eye. The formula is specified in the
 * W3C Web Content Accessibility Guidelines 2.0. If the luminance is greater
 * than 128, the function returns "black", otherwise it returns "white". This
 * means that for a color with a high luminance (i.e. a light color), the
 * function will return "black", and for a color with a low luminance (i.e. a
 * dark color), the function will return "white".
 */
export function getContrastingTextColor(color: Color) {
  const luminance = (color.r * 299 + color.g * 587 + color.b * 114) / 1000
  return luminance > 128 ? "black" : "white"
}

export function penPointsToPathLayer(
  points: number[][],
  color: Color
): PathLayer {
  if (points.length < 2) {
    throw new Error("At least two points are required")
  }

  let top = Number.POSITIVE_INFINITY
  let left = Number.POSITIVE_INFINITY
  let bottom = Number.NEGATIVE_INFINITY
  let right = Number.NEGATIVE_INFINITY

  for (const point of points) {
    const [x, y] = point

    if (top > y) {
      top = y
    }

    if (left > x) {
      left = x
    }

    if (bottom < y) {
      bottom = y
    }

    if (right < x) {
      right = x
    }

  }

  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points.map(([x, y, pressure]) => [x - left, y - top, pressure])
  }
}

export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return ""
  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length]
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      return acc
    },
    ["M", ...stroke[0], "Q"]

  )
  d.push("Z")
  return d.join(" ")
}