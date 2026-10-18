import { spawn, spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const projectDirectory = resolve(fileURLToPath(new URL("..", import.meta.url)));
const nextExecutable = resolve(projectDirectory, "node_modules/next/dist/bin/next");
const nextArguments = process.argv.slice(2);
const port = getPort(nextArguments);

function getPort(argumentsList) {
  const portIndex = argumentsList.findIndex(
    (argument) => argument === "--port" || argument === "-p",
  );
  if (portIndex >= 0 && argumentsList[portIndex + 1]) {
    return Number(argumentsList[portIndex + 1]);
  }

  const portArgument = argumentsList.find((argument) => argument.startsWith("--port="));
  return portArgument ? Number(portArgument.split("=", 2)[1]) : 3000;
}

function runLsof(argumentsList) {
  const result = spawnSync("lsof", argumentsList, { encoding: "utf8" });
  if (result.error?.code === "ENOENT") {
    throw new Error("lsof is required to check for an existing development server.");
  }
  return result.status === 0 ? result.stdout.trim() : "";
}

function getListeningProcesses() {
  const output = runLsof(["-nP", `-iTCP:${port}`, "-sTCP:LISTEN", "-t"]);
  return output.split(/\s+/).filter(Boolean).map(Number).filter(Number.isInteger);
}

function getProcessDirectory(pid) {
  const output = runLsof(["-a", "-p", String(pid), "-d", "cwd", "-Fn"]);
  return (
    output
      .split("\n")
      .find((line) => line.startsWith("n"))
      ?.slice(1) ?? ""
  );
}

function isProjectProcess(pid) {
  const directory = getProcessDirectory(pid);
  return directory === projectDirectory;
}

async function stopProjectServers() {
  const processIds = getListeningProcesses().filter(isProjectProcess);
  if (processIds.length === 0) return;

  console.log(`Stopping the existing development server on port ${port}...`);
  for (const pid of processIds) {
    try {
      process.kill(pid, "SIGTERM");
    } catch (error) {
      if (error.code !== "ESRCH") throw error;
    }
  }

  const deadline = Date.now() + 8000;
  while (Date.now() < deadline) {
    const remaining = getListeningProcesses().filter(isProjectProcess);
    if (remaining.length === 0) return;
    await delay(200);
  }

  for (const pid of getListeningProcesses().filter(isProjectProcess)) {
    try {
      process.kill(pid, "SIGKILL");
    } catch (error) {
      if (error.code !== "ESRCH") throw error;
    }
  }
}

function startNext() {
  const server = spawn(process.execPath, [nextExecutable, "dev", ...nextArguments], {
    cwd: projectDirectory,
    stdio: "inherit",
  });

  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () => server.kill(signal));
  }

  server.on("error", (error) => {
    console.error("Could not start the Next.js development server:", error.message);
    process.exitCode = 1;
  });

  server.on("close", (code, signal) => {
    process.exitCode = code ?? (signal ? 1 : 0);
  });
}

try {
  await stopProjectServers();
  startNext();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
