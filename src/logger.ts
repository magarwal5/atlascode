'use strict';
import { ConfigurationChangeEvent, ExtensionContext, OutputChannel, window } from 'vscode';
import { configuration, OutputLevel } from './config/configuration';
import { extensionOutputChannelName } from './constants';
import { Container } from './container';

const ConsolePrefix = `[${extensionOutputChannelName}]`;

export class Logger {
    static level: OutputLevel = OutputLevel.Info;
    static output: OutputChannel | undefined;

    static configure(context: ExtensionContext) {
        context.subscriptions.push(configuration.onDidChange(this.onConfigurationChanged, this));
        this.onConfigurationChanged(configuration.initializingChangeEvent);
    }

    private static onConfigurationChanged(e: ConfigurationChangeEvent) {
        const initializing = configuration.initializing(e);

        const section = 'outputLevel';
        if (initializing && Container.isDebugging) {
            this.level = OutputLevel.Debug;
        } else if (initializing || configuration.changed(e, section)) {
            this.level = configuration.get<OutputLevel>(section);
        }

        if (this.level === OutputLevel.Silent) {
            if (this.output !== undefined) {
                this.output.dispose();
                this.output = undefined;
            }
        } else {
            this.output = this.output || window.createOutputChannel(extensionOutputChannelName);
        }
    }

    static info(message?: any, ...params: any[]): void {
        if (this.level !== OutputLevel.Info && this.level !== OutputLevel.Debug) { return; }

        if (this.output !== undefined) {
            this.output.appendLine(
                ([this.timestamp, message, ...params]).join(' ')
            );
        }
    }

    static debug(message?: any, ...params: any[]): void {
        if (this.level !== OutputLevel.Debug) { return; }

        if (Container.isDebugging) {
            console.log(this.timestamp, ConsolePrefix, message, ...params);
        }

        if (this.output !== undefined) {
            this.output.appendLine(
                ([this.timestamp, message, ...params]).join(' ')
            );
        }
    }

    static error(ex: Error, classOrMethod?: string, ...params: any[]): void {
        if (this.level === OutputLevel.Silent) { return; }

        if (Container.isDebugging) {
            console.error(this.timestamp, ConsolePrefix, classOrMethod, ...params, ex);
        }

        if (this.output !== undefined) {
            this.output.appendLine(
                ([this.timestamp, classOrMethod, ...params, ex]).join(' ')
            );
        }
    }

    static show(): void {
        if (this.output !== undefined) {
            this.output.show();
        }
    }

    private static get timestamp(): string {
        const now = new Date();
        const time = now
            .toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '');
        return `[${time}:${('00' + now.getUTCMilliseconds()).slice(-3)}]`;
    }
}
