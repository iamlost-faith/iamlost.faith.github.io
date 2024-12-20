import React, { useRef, useEffect } from 'react';

interface SvgRendererProps {
    svgElement: SVGSVGElement | SVGElement; // Allow for both types
}

const SvgRenderer: React.FC<SvgRendererProps> = ({ svgElement }) => {
    const svgContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (svgContainerRef.current && svgElement) {
            svgContainerRef.current.appendChild(svgElement);
        }

        return () => {
            // Clean up: Remove the SVG element when the component unmounts
            if (svgContainerRef.current && svgElement) {
                svgContainerRef.current.removeChild(svgElement);
            }
        };
    }, [svgElement]);

    return (
        <div ref={svgContainerRef} className="w-full h-full" />
    );
};

export default SvgRenderer;
