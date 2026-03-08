class ConfigManager {

    private config: Record<string, string> = {};

    public setConfig(key: string, value: string) {
        this.config[key] = value;
    }

    public getConfig(key: string): string | null {
        return this.config[key]
    }

}

export const configManager = new ConfigManager();
