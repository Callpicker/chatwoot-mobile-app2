import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, Text, Platform, View, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions, useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import DeviceInfo from 'react-native-device-info';
import * as WebBrowser from 'expo-web-browser';
import ChatWootWidget from '@chatwoot/react-native-widget';
import { useSelector } from 'react-redux';
import * as Application from 'expo-application';
import { Account, AvailabilityStatus } from '@/types';
import { clearAllConversations } from '@/store/conversation/conversationSlice';
import { resetNotifications } from '@/store/notification/notificationSlice';
import { clearAllContacts } from '@/store/contact/contactSlice';
import i18n from 'i18n';
import { HELP_URL } from '@/constants/url';
import { tailwind } from '@/theme';

import {
  BottomSheetBackdrop,
  BottomSheetHeader,
  BottomSheetWrapper,
  Button,
  LanguageList,
  AvailabilityStatusList,
  NotificationPreferences,
  SwitchAccount,
  SettingsList,
} from '@/components-next';
// import { SettingsList } from '@/components-next/list-components/SettingsList';
import { UserAvatar } from './components/UserAvatar';

import { LANGUAGES, TAB_BAR_HEIGHT } from '@/constants';
import { useRefsContext } from '@/context';
import { ChatwootIcon, NotificationIcon, SwitchIcon, TranslateIcon } from '@/svg-icons';
import { GenericListType } from '@/types';

import { useHaptic } from '@/utils';
import { SettingsHeader } from './SettingsHeader';
import { DebugActions } from './components/DebugActions';
import {
  selectCurrentUserAvailability,
  selectUser,
  selectAccounts,
} from '@/store/auth/authSelectors';
import { logout, setAccount, setCurrentUserAvailability } from '@/store/auth/authSlice';
import { authActions } from '@/store/auth/authActions';
import { setUpdateAuth } from '@/store/auth/authSlice';
import { AuthService } from '@/store/auth/authService';
import { SettingsService } from '@/store/settings/settingsService';
import { selectLocale, selectIsChatwootCloud,selectPushToken } from '@/store/settings/settingsSelectors';
import { settingsActions } from '@/store/settings/settingsActions';
import { setLocale } from '@/store/settings/settingsSlice';
import { resetFilters } from '@/store/conversation/conversationFilterSlice';

import AnalyticsHelper from '@/helpers/AnalyticsHelper';
import { PROFILE_EVENTS } from '@/constants/analyticsEvents';
import { getUserPermissions } from '@/helpers/permissionHelper';
import { CONVERSATION_PERMISSIONS } from '@/constants/permissions';
import { useAppDispatch, useAppSelector } from '@/hooks';

const appName = Application.applicationName;
const appVersion = Application.nativeApplicationVersion;

const buildNumber = Application.nativeBuildVersion;
const appVersionDetails = buildNumber ? `${appVersion} (${buildNumber})` : appVersion;
const SettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const availabilityStatus =
    (useSelector(selectCurrentUserAvailability) as AvailabilityStatus) || 'offline';

  // const { bottom } = useSafeAreaInsets();

  const [showWidget, toggleWidget] = useState(false);
  const user = useSelector(selectUser);
  const {
    name,
    email,
    avatar_url: avatarUrl,
    identifier_hash: identifierHash,
    account_id: activeAccountId,
  } = user || {};

  useEffect(() => {
    dispatch(settingsActions.getNotificationSettings());
  }, [dispatch]);

  const pushToken = useAppSelector(selectPushToken);

  const userPermissions = getUserPermissions(user, activeAccountId);

  const hasConversationPermission = CONVERSATION_PERMISSIONS.some(permission =>
    userPermissions.includes(permission),
  );

  const userDetails = {
    identifier: email,
    name,
    avatar_url: avatarUrl,
    email,
    identifier_hash: identifierHash,
  };

  const customAttributes = {
    originatedFrom: 'mobile-app',
    appName,
    appVersion: appVersionDetails,
    deviceId: DeviceInfo.getDeviceId(),
    packageName: appName,
    operatingSystem: Platform.OS, // android/ios
  };

  const isChatwootCloud = useAppSelector(selectIsChatwootCloud);

  const chatwootInstance = isChatwootCloud ? `${appName} cloud` : `${appName} self-hosted`;

  let accounts = useSelector(selectAccounts) || [];

  const activeAccountName = accounts.length
    ? accounts.find((account: Account) => account.id === activeAccountId)?.name || ''
    : '';

  const enableAccountSwitch = accounts.length > 1;

  const activeLocale = useSelector(selectLocale);
  const {
    userAvailabilityStatusSheetRef,
    languagesModalSheetRef,
    notificationPreferencesSheetRef,
    switchAccountSheetRef,
    debugActionsSheetRef,
  } = useRefsContext();


  useEffect(() => {
    dispatch(authActions.getProfile());
  }, [dispatch]);



  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        let profile_response = await AuthService.getProfile();
        if(profile_response){
          profile_response.account_id = user.account_id;
          dispatch(setUpdateAuth(profile_response))

        
          accounts = profile_response?.accounts;
          let profile_status = accounts.length ? accounts.find((account: Account) => account.id === activeAccountId)?.availability || '': '';
          changeAvailabilityStatus(profile_status);
        }
      }
      fetchData();

      return () => {

      };
    }, [])
  );
  const hapticSelection = useHaptic();

  const animationConfigs = useBottomSheetSpringConfigs({
    mass: 1,
    stiffness: 420,
    damping: 30,
  });

  const openSheet = () => {
    hapticSelection?.();
    userAvailabilityStatusSheetRef.current?.present();
  };

  const openPreferences = async () => {
    let data = await dispatch(settingsActions.getNotificationSettings());
    if(!data?.error){
      notificationPreferencesSheetRef.current?.present()
    }
  }

  const changeAvailabilityStatus = async (updatedStatus: string) => {
    AnalyticsHelper.track(PROFILE_EVENTS.TOGGLE_AVAILABILITY_STATUS, {
      from: availabilityStatus,
      to: updatedStatus,
    });
    const payload = { profile: { availability: updatedStatus, account_id: activeAccountId } };
    const usersPayload = { users: {[Number(user?.id)] : updatedStatus}};
    dispatch(setCurrentUserAvailability(usersPayload));
    
    let response = await dispatch(authActions.updateAvailability(payload));
    if(response?.error){
      AnalyticsHelper.track(PROFILE_EVENTS.TOGGLE_AVAILABILITY_STATUS, {
        from: updatedStatus,
        to: availabilityStatus,
      });
      const usersPayload_restore = { users: {[Number(user?.id)] : availabilityStatus}};
      dispatch(setCurrentUserAvailability(usersPayload_restore));
    }
  };

  const onChangeLanguage = (locale: string) => {
    dispatch(setLocale(locale));
  };

  const changeAccount = (accountId: number) => {
    dispatch(clearAllContacts());
    dispatch(clearAllConversations());
    dispatch(resetNotifications());
    dispatch(resetFilters());
    dispatch(setAccount(accountId));
    dispatch(authActions.setActiveAccount({ profile: { account_id: accountId } }));
    navigation.dispatch(StackActions.replace('Tab'));
  };

  // useEffect(() => {
  //   userAvailabilityStatusSheetRef.current?.dismiss({
  //     overshootClamping: true,
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [availabilityStatus]);

  useEffect(() => {
    languagesModalSheetRef.current?.dismiss({
      overshootClamping: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLocale]);

  const openURL = async () => {
    await WebBrowser.openBrowserAsync(HELP_URL);
  };

  // const openSystemSettings = () => {
  //   if (Platform.OS === 'ios') {
  //     Linking.openURL('app-settings:');
  //   } else {
  //     Linking.openSettings();
  //   }
  // };

  const onClickLogout = useCallback(async () => {
    await AsyncStorage.removeItem('cwCookie');
    await dispatch(settingsActions.removeDevice({ pushToken }));
    dispatch(logout());
  }, [dispatch]);

  const preferencesList: GenericListType[] = [
    {
      hasChevron: true,
      title: i18n.t('SETTINGS.CHANGE_AVAILABILITY'),
      icon: <SwitchIcon />,
      subtitle: '',
      subtitleType: 'light',
      onPressListItem: () => openSheet(),
    },
    {
      hasChevron: true,
      title: i18n.t('SETTINGS.NOTIFICATIONS'),
      icon: <NotificationIcon />,
      subtitle: '',
      subtitleType: 'light',
      disabled: !hasConversationPermission,
      onPressListItem: () => openPreferences()
      // onPressListItem: openSystemSettings,
    },
    {
      hasChevron: true,
      title: i18n.t('SETTINGS.CHANGE_LANGUAGE'),
      icon: <TranslateIcon />,
      subtitle: LANGUAGES[activeLocale as keyof typeof LANGUAGES],
      subtitleType: 'light',
      onPressListItem: () => languagesModalSheetRef.current?.present(),
    },
    {
      hasChevron: enableAccountSwitch,
      title: i18n.t('SETTINGS.SWITCH_ACCOUNT'),
      icon: <SwitchIcon />,
      subtitle: activeAccountName,
      subtitleType: 'light',
      onPressListItem: () => {
        if (enableAccountSwitch) {
          switchAccountSheetRef.current?.present();
        }
      },
    },
  ];

  const supportList: GenericListType[] = [
    {
      hasChevron: true,
      title: i18n.t('SETTINGS.READ_DOCS'),
      icon: <SwitchIcon />,
      subtitle: '',
      subtitleType: 'light',
      onPressListItem: openURL,
    },
    {
      hasChevron: true,
      title: i18n.t('SETTINGS.CHAT_WITH_US'),
      icon: <ChatwootIcon />,
      subtitle: '',
      subtitleType: 'light',
      onPressListItem: () => toggleWidget(true),
    },
  ];

  return (
    <SafeAreaView style={tailwind.style('flex-1 bg-white font-inter-normal-20')}>
      <StatusBar
        translucent
        backgroundColor={tailwind.color('bg-white')}
        barStyle={'dark-content'}
      />
      <SettingsHeader />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tailwind.style(`pb-[${TAB_BAR_HEIGHT - 1}px]`)}>
        <Animated.View style={tailwind.style('flex justify-center items-center pt-4 gap-4')}>
          <Animated.View>
            <UserAvatar src={avatarUrl} name={name} status={availabilityStatus} />
            <Animated.View
              style={tailwind.style(
                'absolute border-[2px] border-white rounded-full -bottom-[2px] right-[10px]',
              )}></Animated.View>
          </Animated.View>
          <Animated.View style={tailwind.style('flex flex-col items-center gap-1')}>
            <Animated.Text
              style={tailwind.style('text-[22px] font-inter-580-24 leading-[22px] text-gray-950')}>
              {name}
            </Animated.Text>
            <Animated.Text
              style={tailwind.style(
                'text-[15px] font-inter-420-20 leading-[17.25px] text-gray-900',
              )}>
              {email}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
        <Animated.View style={tailwind.style('pt-6')}>
          <SettingsList sectionTitle={i18n.t('SETTINGS.PREFERENCES')} list={preferencesList} />
        </Animated.View>
        {/* <Animated.View style={tailwind.style('pt-6')}>
          <SettingsList sectionTitle={i18n.t('SETTINGS.SUPPORT')} list={supportList} />
        </Animated.View> */}
        <Animated.View style={tailwind.style('pt-6 mx-4')}>
          <Button
            variant="secondary"
            text={i18n.t('SETTINGS.LOGOUT')}
            isDestructive
            handlePress={onClickLogout}
          />
        </Animated.View>
        <Pressable
          style={tailwind.style('p-4 items-center')}
          onLongPress={() => debugActionsSheetRef.current?.present()}>
          <Text style={tailwind.style('text-sm text-gray-700 ')}>
            {`${chatwootInstance} ${appVersionDetails}`}
          </Text>
        </Pressable>
      </Animated.ScrollView>
      <BottomSheetModal
        ref={userAvailabilityStatusSheetRef}
        backdropComponent={BottomSheetBackdrop}
        handleIndicatorStyle={tailwind.style('overflow-hidden bg-blackA-A6 w-8 h-1 rounded-[11px]')}
        enablePanDownToClose
        animationConfigs={animationConfigs}
        // TODO: Fix this later
        // bottomInset={bottom === 0 ? 12 : bottom}
        handleStyle={tailwind.style('p-0 h-4 pt-[5px]')}
        style={tailwind.style('rounded-[26px] overflow-hidden')}
        snapPoints={[190]}>
        <BottomSheetWrapper>
          <BottomSheetHeader headerText={i18n.t('SETTINGS.SET_AVAILABILITY')} />
          <AvailabilityStatusList
            changeAvailabilityStatus={changeAvailabilityStatus}
            availabilityStatus={availabilityStatus}
          />
        </BottomSheetWrapper>
      </BottomSheetModal>
      <BottomSheetModal
        ref={languagesModalSheetRef}
        backdropComponent={BottomSheetBackdrop}
        handleIndicatorStyle={tailwind.style('overflow-hidden bg-blackA-A6 w-8 h-1 rounded-[11px]')}
        // TODO: Fix this later
        // bottomInset={bottom === 0 ? 12 : bottom}
        enablePanDownToClose
        enableContentPanningGesture
        animationConfigs={animationConfigs}
        handleStyle={tailwind.style('p-0 h-4 pt-[5px]')}
        style={tailwind.style('rounded-[26px] overflow-hidden')}
        snapPoints={['70%']}>
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          <BottomSheetHeader headerText={i18n.t('SETTINGS.SET_LANGUAGE')} />
          <LanguageList onChangeLanguage={onChangeLanguage} currentLanguage={activeLocale} />
        </BottomSheetScrollView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={notificationPreferencesSheetRef}
        backdropComponent={BottomSheetBackdrop}
        handleIndicatorStyle={tailwind.style('overflow-hidden bg-blackA-A6 w-8 h-1 rounded-[11px]')}
        // TODO: Fix this later
        // bottomInset={bottom === 0 ? 12 : bottom}
        enablePanDownToClose
        enableContentPanningGesture
        animationConfigs={animationConfigs}
        handleStyle={tailwind.style('p-0 h-4 pt-[5px]')}
        style={tailwind.style('rounded-[26px] overflow-hidden')}
        snapPoints={['52%']}>
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          <BottomSheetHeader headerText={i18n.t('SETTINGS.NOTIFICATION_PREFERENCES')} />
          <NotificationPreferences />
        </BottomSheetScrollView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={switchAccountSheetRef}
        backdropComponent={BottomSheetBackdrop}
        handleIndicatorStyle={tailwind.style('overflow-hidden bg-blackA-A6 w-8 h-1 rounded-[11px]')}
        // TODO: Fix this later
        // bottomInset={bottom === 0 ? 12 : bottom}
        enablePanDownToClose
        enableContentPanningGesture
        animationConfigs={animationConfigs}
        handleStyle={tailwind.style('p-0 h-4 pt-[5px]')}
        style={tailwind.style('rounded-[26px] overflow-hidden')}
        snapPoints={['50%']}>
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          <BottomSheetHeader headerText={i18n.t('SETTINGS.SWITCH_ACCOUNT')} />
          <SwitchAccount
            currentAccountId={activeAccountId}
            changeAccount={changeAccount}
            accounts={accounts}
          />
        </BottomSheetScrollView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={debugActionsSheetRef}
        backdropComponent={BottomSheetBackdrop}
        handleIndicatorStyle={tailwind.style('overflow-hidden bg-blackA-A6 w-8 h-1 rounded-[11px]')}
        enablePanDownToClose
        enableContentPanningGesture
        animationConfigs={animationConfigs}
        handleStyle={tailwind.style('p-0 h-4 pt-[5px]')}
        style={tailwind.style('rounded-[26px] overflow-hidden')}
        snapPoints={['36%']}>
        <BottomSheetWrapper>
          <BottomSheetHeader headerText={i18n.t('SETTINGS.DEBUG_ACTIONS')} />
          <DebugActions />
        </BottomSheetWrapper>
      </BottomSheetModal>
      {!!process.env.EXPO_PUBLIC_CHATWOOT_WEBSITE_TOKEN &&
        !!process.env.EXPO_PUBLIC_CHATWOOT_BASE_URL &&
        !!showWidget && (
          <ChatWootWidget
            websiteToken={process.env.EXPO_PUBLIC_CHATWOOT_WEBSITE_TOKEN}
            locale="en"
            baseUrl={process.env.EXPO_PUBLIC_CHATWOOT_BASE_URL}
            closeModal={() => toggleWidget(false)}
            isModalVisible={showWidget}
            user={userDetails}
            customAttributes={customAttributes}
          />
        )}
    </SafeAreaView>
  );
};

export default SettingsScreen;
