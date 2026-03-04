declare module 'saml-idp' {
    export function runServer(options: {
        acsUrl: string;
        audience: string;
        cert: string;
        key: string;
        issuer: string;
    }): void;
}