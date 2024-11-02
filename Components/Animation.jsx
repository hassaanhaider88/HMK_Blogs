"use client";
import { useEffect } from "react";

const Animation = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ["#ff005c", "#00ffd5", "#ffff00", "#ff00ff", "#00ffff"];

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.life = 100;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.95; // Shrink over time
        this.life -= 1; // Reduce life
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function handleParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.draw();

        if (particle.size <= 0.3 || particle.life <= 0) {
          particles.splice(i, 1); // Remove particle when it’s too small or life ends
        }
      }
    }

    window.addEventListener("mousemove", (e) => {
      for (let i = 0; i < 5; i++) {
        // Create multiple particles per move
        particles.push(new Particle(e.clientX, e.clientY));
      }
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <canvas
      id="canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    ></canvas>
  );
};

export default Animation;
