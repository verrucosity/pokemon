import { useContext } from 'react';
import { PhysicsContext } from './PhysicsWorld';

export function usePhysics() {
  const ctx = useContext(PhysicsContext);
  if (!ctx) {
    return {
      addBody: () => {},
      removeBody: () => {},
      stabilize: () => {},
      applyForce: () => {},
      engine: { current: null },
    };
  }
  return ctx;
}
