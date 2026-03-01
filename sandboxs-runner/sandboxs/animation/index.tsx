import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

// 动画实践

// 1.1 translation
const TranslationDemo = () => {
    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>1.1 CSS Translation</h3>
            <div
                className="translation-box"
                style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#3498db',
                    transition: 'transform 1s ease-in-out',
                    cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(200px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                }}
            >
                Hover me
            </div>
        </div>
    );
};

// 1.2 animation + @keyframes
const KeyframesDemo = () => {
    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>1.2 CSS Animation + @keyframes</h3>
            <div
                className="keyframes-box"
                style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#e74c3c',
                    animation: 'bounce 2s infinite'
                }}
            >
                Bouncing
            </div>
            <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-50px); }
        }
      `}</style>
        </div>
    );
};

// 2.1 requestAnimationFrame
const RequestAnimationFrameDemo = () => {
    const boxRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const animationRef = useRef<number>();

    const animate = () => {
        if (boxRef.current) {
            const currentX = parseFloat(boxRef.current.style.left || '0');
            if (currentX < 300) {
                boxRef.current.style.left = `${currentX + 2}px`;
                animationRef.current = requestAnimationFrame(animate);
            } else {
                boxRef.current.style.left = '0px';
                setIsAnimating(false);
            }
        }
    };

    const startAnimation = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            animate();
        }
    };

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>2.1 requestAnimationFrame</h3>
            <div style={{ position: 'relative', height: '120px' }}>
                <div
                    ref={boxRef}
                    style={{
                        position: 'absolute',
                        left: '0px',
                        width: '100px',
                        height: '100px',
                        backgroundColor: '#2ecc71'
                    }}
                >
                    RAF
                </div>
            </div>
            <button onClick={startAnimation} disabled={isAnimating}>
                Start Animation
            </button>
        </div>
    );
};

// 3.1 Canvas + requestAnimationFrame
const CanvasDemo = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const xRef = useRef(0);
    const [isRunning, setIsRunning] = useState(false);

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 绘制圆形
        ctx.fillStyle = '#9b59b6';
        ctx.beginPath();
        ctx.arc(xRef.current, 50, 20, 0, Math.PI * 2);
        ctx.fill();

        // 更新位置
        xRef.current += 2;
        if (xRef.current > canvas.width) {
            xRef.current = 0;
        }

        animationRef.current = requestAnimationFrame(draw);
    };

    const toggleAnimation = () => {
        if (isRunning) {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            setIsRunning(false);
        } else {
            draw();
            setIsRunning(true);
        }
    };

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>3.1 Canvas + requestAnimationFrame</h3>
            <canvas
                ref={canvasRef}
                width={400}
                height={100}
                style={{ border: '1px solid #000' }}
            />
            <div>
                <button onClick={toggleAnimation}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
            </div>
        </div>
    );
};

// 4.1 SVG + CSS / SMIL / JS
const SVGDemo = () => {
    const [rotate, setRotate] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotate(prev => (prev + 5) % 360);
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>4.1 SVG Animation</h3>
            <svg width="200" height="200">
                {/* CSS Animation */}
                <circle cx="50" cy="50" r="20" fill="#e67e22">
                    <animate
                        attributeName="r"
                        values="20;30;20"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </circle>

                {/* JS Animation */}
                <rect
                    x="100"
                    y="30"
                    width="40"
                    height="40"
                    fill="#1abc9c"
                    transform={`rotate(${rotate} 120 50)`}
                />
            </svg>
        </div>
    );
};

// 5.1 GSAP
const GSAPDemo = () => {
    const gsapRef = useRef<HTMLDivElement>(null);

    const animateWithGSAP = () => {
        // 注意: 需要安装 gsap 库: npm install gsap
        // import gsap from 'gsap';
        // gsap.to(gsapRef.current, { x: 200, duration: 1, ease: 'power2.inOut' });

        // 简化版演示 (不依赖GSAP库)
        if (gsapRef.current) {
            gsapRef.current.style.transition = 'transform 1s ease-in-out';
            gsapRef.current.style.transform = 'translateX(200px)';
            setTimeout(() => {
                if (gsapRef.current) {
                    gsapRef.current.style.transform = 'translateX(0)';
                }
            }, 1000);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>5.1 GSAP (简化演示)</h3>
            <div
                ref={gsapRef}
                style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#f39c12'
                }}
            >
                GSAP
            </div>
            <button onClick={animateWithGSAP}>Animate</button>
        </div>
    );
};

// 5.2 Framer Motion
const FramerMotionDemo = () => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>5.2 Framer Motion (简化演示)</h3>
            {/* 注意: 需要安装 framer-motion: npm install framer-motion */}
            {/* import { motion } from 'framer-motion'; */}
            <div
                style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#c0392b',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.5)',
                    transition: 'all 0.5s ease-in-out'
                }}
            >
                Framer
            </div>
            <button onClick={() => setIsVisible(!isVisible)}>
                Toggle
            </button>
        </div>
    );
};

// 6.1 Web Animations API
const WebAnimationsAPIDemo = () => {
    const wapiRef = useRef<HTMLDivElement>(null);

    const animateWithWAPI = () => {
        if (wapiRef.current) {
            wapiRef.current.animate([
                { transform: 'translateX(0) rotate(0deg)', backgroundColor: '#16a085' },
                { transform: 'translateX(200px) rotate(360deg)', backgroundColor: '#27ae60' }
            ], {
                duration: 1000,
                easing: 'ease-in-out',
                iterations: 1,
                fill: 'forwards'
            });

            setTimeout(() => {
                if (wapiRef.current) {
                    wapiRef.current.animate([
                        { transform: 'translateX(200px) rotate(360deg)', backgroundColor: '#27ae60' },
                        { transform: 'translateX(0) rotate(0deg)', backgroundColor: '#16a085' }
                    ], {
                        duration: 1000,
                        easing: 'ease-in-out',
                        fill: 'forwards'
                    });
                }
            }, 1000);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>6.1 Web Animations API</h3>
            <div
                ref={wapiRef}
                style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#16a085'
                }}
            >
                WAAPI
            </div>
            <button onClick={animateWithWAPI}>Animate</button>
        </div>
    );
};

// 主组件
const AnimationPractice = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>动画实践合集</h1>
            <TranslationDemo />
            <KeyframesDemo />
            <RequestAnimationFrameDemo />
            <CanvasDemo />
            <SVGDemo />
            <GSAPDemo />
            <FramerMotionDemo />
            <WebAnimationsAPIDemo />
        </div>
    );
};

export default AnimationPractice;

/* rAF 时机
1. 同步代码
1.5 同步代码结束
2. 微任务 Promise
3. 微任务 queueMicrotask
4. rAF
5. 宏任务 setTimeout
*/
console.log('1. 同步代码');

setTimeout(() => console.log('5. 宏任务 setTimeout'), 0);

Promise.resolve().then(() => console.log('2. 微任务 Promise'));

queueMicrotask(() => console.log('3. 微任务 queueMicrotask'));

requestAnimationFrame(() => console.log('4. rAF'));

console.log('1.5 同步代码结束');