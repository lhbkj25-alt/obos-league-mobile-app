enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: unknown;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 100;
  private isDevelopment = __DEV__;

  private log(level: LogLevel, message: string, context?: string, data?: unknown): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      data,
    };

    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    if (this.isDevelopment) {
      const prefix = `[${entry.level}] ${entry.context || 'App'}`;
      switch (level) {
        case LogLevel.DEBUG:
          console.log(prefix, message, data);
          break;
        case LogLevel.INFO:
          console.info(prefix, message, data);
          break;
        case LogLevel.WARN:
          console.warn(prefix, message, data);
          break;
        case LogLevel.ERROR:
          console.error(prefix, message, data);
          break;
      }
    }
  }

  debug(message: string, context?: string, data?: unknown): void {
    this.log(LogLevel.DEBUG, message, context, data);
  }

  info(message: string, context?: string, data?: unknown): void {
    this.log(LogLevel.INFO, message, context, data);
  }

  warn(message: string, context?: string, data?: unknown): void {
    this.log(LogLevel.WARN, message, context, data);
  }

  error(message: string, context?: string, data?: unknown): void {
    this.log(LogLevel.ERROR, message, context, data);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export const logger = new Logger();
export default logger;
