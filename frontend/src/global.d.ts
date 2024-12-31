declare module '*.glb' {
    const value: string;
    export default value;
}

declare namespace JSX {
    interface IntrinsicElements {
        ambientLight: React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
        directionalLight: React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
        primitive: React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
    }
}
