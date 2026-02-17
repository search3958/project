// Simple 2D Physics Engine
import { Stroke, Point, WALL_THICKNESS } from './types';

export interface PhysicsBody {
  id: string;
  strokeId: string;
  points: Point[];
  velocity: { x: number; y: number };
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  layerMode: 'wall' | 'object';
  elasticity: number;
  brushType: string;
}

export interface CollisionResult {
  body1: PhysicsBody;
  body2: PhysicsBody;
  normal: { x: number; y: number };
  overlap: number;
}

const GRAVITY_STRENGTH = 500; // pixels per second squared
const DAMPING = 0.99;
const DEFAULT_WALL_RESTITUTION = 0.7;

export function createPhysicsBody(stroke: Stroke): PhysicsBody | null {
  if (stroke.layerMode === 'background' || stroke.points.length < 2) {
    return null;
  }
  
  const bounds = calculateBounds(stroke.points);
  
  // Use stroke's elasticity if it's a slime, otherwise use default
  let elasticity = stroke.elasticity || 0.8;
  
  // Slime brush has custom elasticity
  if (stroke.brushType === 'slime') {
    elasticity = stroke.elasticity || 0.9; // High bounce for slime
  }
  
  return {
    id: stroke.id,
    strokeId: stroke.id,
    points: stroke.points,
    velocity: stroke.velocity || { x: 0, y: 0 },
    bounds,
    layerMode: stroke.layerMode,
    elasticity,
    brushType: stroke.brushType,
  };
}

export function calculateBounds(points: Point[]): { minX: number; maxX: number; minY: number; maxY: number } {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  
  for (const point of points) {
    minX = Math.min(minX, point.x);
    maxX = Math.max(maxX, point.x);
    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
  }
  
  return { minX, maxX, minY, maxY };
}

export function getCenter(bounds: { minX: number; maxX: number; minY: number; maxY: number }): { x: number; y: number } {
  return {
    x: (bounds.minX + bounds.maxX) / 2,
    y: (bounds.minY + bounds.maxY) / 2,
  };
}

export function updatePhysics(
  bodies: PhysicsBody[],
  gravity: { x: number; y: number },
  canvasWidth: number,
  canvasHeight: number,
  deltaTime: number
): PhysicsBody[] {
  const dt = deltaTime / 1000; // Convert to seconds
  
  // Update velocities and positions for objects
  const updatedBodies = bodies.map(body => {
    if (body.layerMode === 'wall') {
      return body; // Walls don't move
    }
    
    // Apply gravity
    const newVelocity = {
      x: body.velocity.x + gravity.x * GRAVITY_STRENGTH * dt,
      y: body.velocity.y + gravity.y * GRAVITY_STRENGTH * dt,
    };
    
    // Apply damping (less damping for slime = more bouncy)
    let dampingFactor = DAMPING;
    if (body.brushType === 'slime') {
      dampingFactor = 0.995; // Slime loses less energy
    }
    
    newVelocity.x *= dampingFactor;
    newVelocity.y *= dampingFactor;
    
    // Calculate position offset
    const offset = {
      x: newVelocity.x * dt,
      y: newVelocity.y * dt,
    };
    
    // Update points
    const newPoints = body.points.map(p => ({
      x: p.x + offset.x,
      y: p.y + offset.y,
    }));
    
    // Update bounds
    const newBounds = calculateBounds(newPoints);
    
    return {
      ...body,
      points: newPoints,
      velocity: newVelocity,
      bounds: newBounds,
    };
  });
  
  // Check collisions with walls (border)
  const collisionHandled = updatedBodies.map(body => {
    if (body.layerMode === 'wall') return body;
    
    let { points, velocity, bounds, elasticity, brushType } = body;
    
    // Use custom wall restitution for slime
    let wallRestitution = DEFAULT_WALL_RESTITUTION;
    if (brushType === 'slime') {
      wallRestitution = elasticity; // Slime uses its own elasticity
    }
    
    // Left wall
    if (bounds.minX < WALL_THICKNESS) {
      const overlap = WALL_THICKNESS - bounds.minX;
      points = points.map(p => ({ ...p, x: p.x + overlap }));
      velocity.x = Math.abs(velocity.x) * wallRestitution;
      bounds = calculateBounds(points);
    }
    
    // Right wall
    if (bounds.maxX > canvasWidth - WALL_THICKNESS) {
      const overlap = bounds.maxX - (canvasWidth - WALL_THICKNESS);
      points = points.map(p => ({ ...p, x: p.x - overlap }));
      velocity.x = -Math.abs(velocity.x) * wallRestitution;
      bounds = calculateBounds(points);
    }
    
    // Top wall
    if (bounds.minY < WALL_THICKNESS) {
      const overlap = WALL_THICKNESS - bounds.minY;
      points = points.map(p => ({ ...p, y: p.y + overlap }));
      velocity.y = Math.abs(velocity.y) * wallRestitution;
      bounds = calculateBounds(points);
    }
    
    // Bottom wall
    if (bounds.maxY > canvasHeight - WALL_THICKNESS) {
      const overlap = bounds.maxY - (canvasHeight - WALL_THICKNESS);
      points = points.map(p => ({ ...p, y: p.y - overlap }));
      velocity.y = -Math.abs(velocity.y) * wallRestitution;
      bounds = calculateBounds(points);
    }
    
    return {
      ...body,
      points,
      velocity,
      bounds,
    };
  });
  
  // Check collisions between bodies
  return handleBodyCollisions(collisionHandled);
}

function handleBodyCollisions(bodies: PhysicsBody[]): PhysicsBody[] {
  const result = [...bodies];
  
  for (let i = 0; i < result.length; i++) {
    for (let j = i + 1; j < result.length; j++) {
      const body1 = result[i];
      const body2 = result[j];
      
      // Skip if both are walls
      if (body1.layerMode === 'wall' && body2.layerMode === 'wall') continue;
      
      // Check AABB collision
      if (checkAABBCollision(body1.bounds, body2.bounds)) {
        const collision = resolveCollision(body1, body2);
        
        if (collision) {
          // Update bodies based on collision
          if (body1.layerMode === 'object') {
            result[i] = applyCollisionResponse(result[i], body2, collision);
          }
          if (body2.layerMode === 'object') {
            result[j] = applyCollisionResponse(result[j], body1, { ...collision, normal: { x: -collision.normal.x, y: -collision.normal.y } });
          }
        }
      }
    }
  }
  
  return result;
}

function checkAABBCollision(
  bounds1: { minX: number; maxX: number; minY: number; maxY: number },
  bounds2: { minX: number; maxX: number; minY: number; maxY: number }
): boolean {
  return (
    bounds1.minX < bounds2.maxX &&
    bounds1.maxX > bounds2.minX &&
    bounds1.minY < bounds2.maxY &&
    bounds1.maxY > bounds2.minY
  );
}

function resolveCollision(body1: PhysicsBody, body2: PhysicsBody): CollisionResult | null {
  const center1 = getCenter(body1.bounds);
  const center2 = getCenter(body2.bounds);
  
  const dx = center2.x - center1.x;
  const dy = center2.y - center1.y;
  
  const overlapX = (body1.bounds.maxX - body1.bounds.minX) / 2 + (body2.bounds.maxX - body2.bounds.minX) / 2 - Math.abs(dx);
  const overlapY = (body1.bounds.maxY - body1.bounds.minY) / 2 + (body2.bounds.maxY - body2.bounds.minY) / 2 - Math.abs(dy);
  
  if (overlapX <= 0 || overlapY <= 0) return null;
  
  let normal: { x: number; y: number };
  let overlap: number;
  
  if (overlapX < overlapY) {
    normal = { x: dx > 0 ? 1 : -1, y: 0 };
    overlap = overlapX;
  } else {
    normal = { x: 0, y: dy > 0 ? 1 : -1 };
    overlap = overlapY;
  }
  
  return { body1, body2, normal, overlap };
}

function applyCollisionResponse(
  body: PhysicsBody,
  other: PhysicsBody,
  collision: CollisionResult
): PhysicsBody {
  // Use the minimum elasticity of the two bodies
  let elasticity = Math.min(body.elasticity, other.elasticity);
  
  // Slime collisions are more bouncy
  if (body.brushType === 'slime' || other.brushType === 'slime') {
    elasticity = Math.max(elasticity, 0.7);
  }
  
  // Move body out of collision
  const separation = collision.overlap + 1;
  const newPoints = body.points.map(p => ({
    x: p.x - collision.normal.x * separation,
    y: p.y - collision.normal.y * separation,
  }));
  
  // Reflect velocity
  const dotProduct = body.velocity.x * collision.normal.x + body.velocity.y * collision.normal.y;
  const newVelocity = {
    x: (body.velocity.x - 2 * dotProduct * collision.normal.x) * elasticity,
    y: (body.velocity.y - 2 * dotProduct * collision.normal.y) * elasticity,
  };
  
  return {
    ...body,
    points: newPoints,
    velocity: newVelocity,
    bounds: calculateBounds(newPoints),
  };
}

export function moveStroke(stroke: Stroke, dx: number, dy: number): Stroke {
  const newPoints = stroke.points.map(p => ({
    ...p,
    x: p.x + dx,
    y: p.y + dy,
  }));
  
  return {
    ...stroke,
    points: newPoints,
    bounds: calculateBounds(newPoints),
  };
}
