import { useRef, useEffect } from 'react';
import { usePhysics } from './usePhysics';
import useGameStore from '../store/gameStore';

export default function PhysicsBody({
  children,
  id,
  restitution = 0.4,
  friction = 0.1,
  frictionAir = 0.01,
  density = 0.001,
  initialVelocity = null,
  className = '',
  style = {},
}) {
  const ref = useRef(null);
  const { addBody, removeBody } = usePhysics();
  const physicsEnabled = useGameStore(state => state.physicsEnabled);
  const registeredRef = useRef(false);

  useEffect(() => {
    // If physics is turned on, register the body
    if (physicsEnabled && ref.current && !registeredRef.current) {
      // Measure and add
      const randomVx = (Math.random() - 0.5) * 6;
      const vy = initialVelocity?.y ?? (Math.random() * 2);
      
      addBody(id, ref.current, {
        restitution,
        friction,
        frictionAir,
        density,
        initialVelocity: initialVelocity ?? { x: randomVx, y: vy },
      });
      registeredRef.current = true;
    } 
    
    // If physics is turned off, the engine reset in PhysicsWorld handles the sync
    if (!physicsEnabled && registeredRef.current) {
      // We don't removeBody here because we want to keep it in the engine but static
      // or we can remove it to fully reset. 
      // For Google Antigravity, removing and re-adding on toggle is cleanest.
      removeBody(id);
      registeredRef.current = false;
    }

    return () => {
      if (registeredRef.current) {
        removeBody(id);
        registeredRef.current = false;
      }
    };
  }, [physicsEnabled, id, addBody, removeBody]);

  return (
    <div
      ref={ref}
      className={`${className} ${physicsEnabled ? 'physics-element active' : 'physics-element dormant'}`}
      style={{
        display: 'inline-block',
        willChange: 'transform',
        pointerEvents: 'auto', // Allow clicks
        ...style,
        ...(physicsEnabled ? { position: 'absolute', zIndex: 10 } : {}),
      }}
    >
      {children}
    </div>
  );
}
