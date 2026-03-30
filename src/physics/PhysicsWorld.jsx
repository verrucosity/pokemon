import React, { createContext, useRef, useEffect, useCallback, useState } from 'react';
import Matter from 'matter-js';

export const PhysicsContext = createContext(null);

const { Engine, World, Bodies, Body, Mouse, MouseConstraint, Composite } = Matter;

export default function PhysicsWorld({ children, enabled = true }) {
  const engineRef = useRef(null);
  const bodiesMapRef = useRef(new Map()); // id → { body, element }
  const rafRef = useRef(null);
  const containerRef = useRef(null);
  const mouseConstraintRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Initialize engine
  useEffect(() => {
    const engine = Engine.create({
      gravity: { x: 0, y: enabled ? 1 : 0, scale: 0.001 },
    });
    engineRef.current = engine;

    const updateWalls = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const thickness = 100;

      const oldWalls = Composite.allBodies(engine.world).filter(b => b.label === 'wall');
      Composite.remove(engine.world, oldWalls);

      const walls = [
        Bodies.rectangle(w / 2, h + thickness / 2 - 5, w + 400, thickness, { 
          isStatic: true, label: 'wall', restitution: 0.4, friction: 0.8 
        }),
        Bodies.rectangle(w / 2, -thickness / 2 + 5, w + 400, thickness, { 
          isStatic: true, label: 'wall', restitution: 0.4 
        }),
        Bodies.rectangle(-thickness / 2 + 5, h / 2, thickness, h + 400, { 
          isStatic: true, label: 'wall', restitution: 0.4 
        }),
        Bodies.rectangle(w + thickness / 2 - 5, h / 2, thickness, h + 400, { 
          isStatic: true, label: 'wall', restitution: 0.4 
        }),
      ];

      Composite.add(engine.world, walls);
    };

    updateWalls();
    window.addEventListener('resize', updateWalls);

    if (containerRef.current) {
      const mouse = Mouse.create(containerRef.current);
      mouse.pixelRatio = window.devicePixelRatio || 1;
      
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.15,
          damping: 0.1,
          render: { visible: false },
        },
      });
      mouseConstraintRef.current = mouseConstraint;
      Composite.add(engine.world, mouseConstraint);

      const handleWheel = (e) => {
        if (mouseConstraint.body) e.preventDefault();
      };
      containerRef.current.addEventListener('wheel', handleWheel, { passive: false });
    }

    setReady(true);

    let lastTime = performance.now();
    const loop = (time) => {
      if (!engineRef.current) return;
      const delta = Math.min(time - lastTime, 40); 
      lastTime = time;
      
      Engine.update(engine, delta);

      bodiesMapRef.current.forEach(({ body, element }) => {
        if (!enabled) {
          element.style.transform = '';
          return;
        }
        if (body.isStatic) return;
        
        const x = body.position.x - element.offsetWidth / 2;
        const y = body.position.y - element.offsetHeight / 2;
        const angle = body.angle * (180 / Math.PI);
        element.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
      });

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', updateWalls);
      if (engineRef.current) {
        World.clear(engine.world);
        Engine.clear(engine);
      }
    };
  }, [enabled]); 

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.gravity.y = enabled ? 1 : 0;
      if (!enabled) {
        Composite.allBodies(engineRef.current.world).forEach(body => {
          if (body.label !== 'wall') {
            Body.setVelocity(body, { x: 0, y: 0 });
            Body.setAngularVelocity(body, 0);
            Body.setAngle(body, 0);
          }
        });
      }
    }
    
    if (enabled) {
      document.body.classList.add('gravity-active');
    } else {
      document.body.classList.remove('gravity-active');
    }
  }, [enabled]);

  const addBody = useCallback((id, element, options = {}) => {
    if (!engineRef.current) return;
    if (bodiesMapRef.current.has(id)) {
      const existing = bodiesMapRef.current.get(id);
      Composite.remove(engineRef.current.world, existing.body);
    }
    
    const rect = element.getBoundingClientRect();
    const x = options.x ?? (rect.left + window.scrollX + rect.width / 2);
    const y = options.y ?? (rect.top + window.scrollY + rect.height / 2);

    const body = Bodies.rectangle(x, y, rect.width, rect.height, {
      restitution: options.restitution ?? 0.4,
      friction: options.friction ?? 0.1,
      frictionAir: options.frictionAir ?? 0.01,
      density: options.density ?? 0.001,
      angle: options.angle ?? 0,
      label: id,
    });

    if (options.initialVelocity) {
      Body.setVelocity(body, options.initialVelocity);
    }

    Composite.add(engineRef.current.world, body);
    bodiesMapRef.current.set(id, { body, element });
  }, []);

  const removeBody = useCallback((id) => {
    if (!engineRef.current) return;
    const entry = bodiesMapRef.current.get(id);
    if (entry) {
      Composite.remove(engineRef.current.world, entry.body);
      bodiesMapRef.current.delete(id);
    }
  }, []);

  const stabilize = useCallback(() => {
    bodiesMapRef.current.forEach(({ body }) => {
      Body.setVelocity(body, { x: 0, y: 0 });
      Body.setAngularVelocity(body, 0);
      Body.setAngle(body, 0);
    });
  }, []);

  const applyForce = useCallback((id, force) => {
    const entry = bodiesMapRef.current.get(id);
    if (entry) {
      Body.applyForce(entry.body, entry.body.position, force);
    }
  }, []);

  return (
    <PhysicsContext.Provider value={{ addBody, removeBody, stabilize, applyForce, engine: engineRef }}>
      <div ref={containerRef} className={`physics-container ${enabled ? 'active' : 'dormant'}`} style={{ 
        position: 'fixed', 
        inset: 0, 
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 5,
        touchAction: 'none',
      }}>
        {ready && children}
      </div>
    </PhysicsContext.Provider>
  );
}
