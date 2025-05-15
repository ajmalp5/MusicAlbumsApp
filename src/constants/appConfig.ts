// constants/appConfig.ts
export interface AppConfig {
    appName: string;
    primaryColor: string;
    secondaryColor: string;
    apiBaseUrl: string;
  }
  
  export const defaultConfig: AppConfig = {
    appName: 'Music Albums',
    primaryColor: '#6200ee',
    secondaryColor: '#03dac6',
    apiBaseUrl: 'https://itunes.apple.com',
  };