'use client';

import React, { useState, useEffect } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export default function Background() {
    const [error, setError] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // CSS fallback if WebGL crashes
    if (error) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                pointerEvents: 'none',
                background: 'linear-gradient(135deg, #0a0015 0%, #1a0030 25%, #0d001a 50%, #15002e 75%, #0a0015 100%)',
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 30% 40%, rgba(139, 0, 255, 0.25) 0%, transparent 55%)',
                    animation: 'pulse1 8s ease-in-out infinite alternate',
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 70% 60%, rgba(255, 100, 200, 0.18) 0%, transparent 55%)',
                    animation: 'pulse2 10s ease-in-out infinite alternate',
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 50% 80%, rgba(175, 63, 247, 0.15) 0%, transparent 50%)',
                    animation: 'pulse3 12s ease-in-out infinite alternate',
                }} />
                <style>{`
                    @keyframes pulse1 { 0% { opacity:0.5; transform:scale(1); } 100% { opacity:1; transform:scale(1.15); } }
                    @keyframes pulse2 { 0% { opacity:0.3; transform:scale(1.1); } 100% { opacity:0.8; transform:scale(0.95); } }
                    @keyframes pulse3 { 0% { opacity:0.4; transform:scale(0.9); } 100% { opacity:0.7; transform:scale(1.1); } }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none',
        }}>
            <ErrorBoundary onError={() => setError(true)}>
                <ShaderGradientCanvas
                    style={{ position: 'absolute', inset: 0 }}
                    pixelDensity={1}
                    fov={45}
                    pointerEvents="none"
                >
                    <ShaderGradient
                        control='query'
                        urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=115&cameraZoom=1&color1=%235606ff&color2=%23fe8989&color3=%23000000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&grain=off&lightType=3d&pixelDensity=1&positionX=-0.5&positionY=0.1&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=235&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.1&uFrequency=5.5&uSpeed=0.1&uStrength=2.4&uTime=0.2&wireframe=false'
                    />
                </ShaderGradientCanvas>
            </ErrorBoundary>
        </div>
    );
}

// Simple error boundary component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch() {
        if (this.props.onError) {
            this.props.onError();
        }
    }

    render() {
        if (this.state.hasError) return null;
        return this.props.children;
    }
}
