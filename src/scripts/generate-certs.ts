import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const certsDir = path.resolve(__dirname, "../../certs");

if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir, { recursive: true });
}

function generate(name: string): void {
  const keyFile = path.join(certsDir, `${name}.key`);
  const certFile = path.join(certsDir, `${name}.crt`);

  if (fs.existsSync(keyFile) && fs.existsSync(certFile)) {
    console.log(`Certificates for '${name}' already exist, skipping.`);
    return;
  }

  execSync(
    `openssl req -x509 -newkey rsa:2048 -keyout ${keyFile} -out ${certFile}` +
      ` -days 365 -nodes -subj "/C=US/ST=California/L=San Francisco/O=JankyCo/OU=IT/CN=${name}"`,
    { stdio: "inherit" }
  );

  console.log(`Generated: ${keyFile}`);
  console.log(`Generated: ${certFile}`);
}

generate("sp");
generate("idp");

console.log("\nCertificates generated successfully in ./certs/");
