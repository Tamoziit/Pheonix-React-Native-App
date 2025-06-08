import { View, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface SearchBarProps {
	onPress?: () => void;
	placeholder: string;
}

const SearchBar = ({ onPress, placeholder }: SearchBarProps) => {
	return (
		<View className='flex-row items-center bg-dark-200 rounded-full px-5 py-1'>
			<Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8ff" />

			<TextInput
				onPress={onPress}
				placeholder={placeholder}
				value=""
				onChangeText={() => { }}
				placeholderTextColor="#a8bfdb"
				className='flex-1 ml-2 text-white'
			/>
		</View>
	)
}

export default SearchBar