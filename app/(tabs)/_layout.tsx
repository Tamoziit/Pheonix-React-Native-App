import { ImageBackground, Image, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

interface TabIconProps {
	focused: boolean;
	icon: any;
	title: string;
};

const TabIcon = ({ focused, icon, title }: TabIconProps) => {
	if (focused) {
		return (
			<ImageBackground
				source={images.highlight}
				className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'
			>
				<Image source={icon} tintColor="#151312" className='size-5' />
				<Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
			</ImageBackground>
		)
	} else {
		return (
			<View className='size-full justify-center items-center mt-4 rounded-full'>
				<Image source={icon} tintColor="#A8B5DB" className='size-5' />
			</View>
		)
	}
}

const _layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					width: '100%',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center'
				},
				tabBarStyle: {
					backgroundColor: "#0f0D23",
					borderRadius: 50,
					marginHorizontal: 20,
					marginBottom: 36,
					height: 52,
					position: 'absolute',
					overflow: 'hidden',
					borderWidth: 0.5,
					borderColor: '#0f0D23'
				}
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.home}
							title="Home"
						/>
					),
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="search"
				options={{
					title: 'Search',
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.search}
							title="Search"
						/>
					),
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="saved"
				options={{
					title: 'Saved',
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.save}
							title="Saved"
						/>
					),
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.person}
							title="Profile"
						/>
					),
					headerShown: false,
				}}
			/>
		</Tabs>
	)
}

export default _layout