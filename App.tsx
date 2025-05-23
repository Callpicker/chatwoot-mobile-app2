import * as Sentry from '@sentry/react-native';

import Constants from 'expo-constants';
import App from './src/app';
import analytics from '@react-native-firebase/analytics';

const isStorybookEnabled = Constants.expoConfig?.extra?.eas?.storybookEnabled;

if (!__DEV__) {
  analytics().setAnalyticsCollectionEnabled(true);
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
    attachScreenshot: true,
  });
}else{
  analytics().setAnalyticsCollectionEnabled(true);
}

if (__DEV__) {
  require('./ReactotronConfig');
}
// Ref: https://dev.to/dannyhw/how-to-swap-between-react-native-storybook-and-your-app-p3o
export default (() => {
  if (isStorybookEnabled === 'true') {
    // eslint-disable-next-line
    return require('./.storybook').default;
  }

  if (!__DEV__) {
    analytics().setAnalyticsCollectionEnabled(true);
    return Sentry.wrap(App);
  }

  console.log('Loading Development App');
  return App;
})();
