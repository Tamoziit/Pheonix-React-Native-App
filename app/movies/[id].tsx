import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFetch from '@/services/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { icons } from '@/constants/icons';

interface MovieInfoProps {
	label: string;
	value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
	<View className='flex-col items-start justify-center mt-5'>
		<Text className='text-light-200 font-normal text-base'>
			{label}
		</Text>

		<Text className='text-light-100 font-bold text-sm mt-2'>
			{value || 'N/A'}
		</Text>
	</View>
)

const MovieDetails = () => {
	const router = useRouter();
	const { id } = useLocalSearchParams();
	const {
		data: movie,
		loading,
		error
	} = useFetch(() => fetchMovieDetails(id as string));

	return (
		<View className='bg-primary flex-1'>
			{loading ? (
				<ActivityIndicator
					size="large"
					color="#0000ff"
					className="mt-10 self-center"
				/>
			) : error ? (
				<Text className='text-center font-semibold text-red-500'>Error: {error?.message}</Text>
			) : (
				<>
					<ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
						<View>
							<Image
								source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
								className='w-full h-[550px]'
								resizeMode='stretch'
							/>
						</View>

						<View className='flex-col items-start justify-center mt-5 px-5'>
							<Text className='text-white font-bold text-xl'>{movie?.title}</Text>
							{movie?.tagline && (
								<Text className='text-light-200 font-normal text-base -mt-1'>
									{movie?.tagline}
								</Text>
							)}
							<View className='flex-row items-center gap-x-1 mt-2'>
								<Text className='text-light-200 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
								<Text className='text-light-200 text-sm'>{movie?.runtime}m</Text>
							</View>

							<View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
								<Image
									source={icons.star}
									className='size-4'
								/>
								<Text className='text-white font-bold text-sm'>
									{movie?.vote_average?.toFixed(1) || 0.0} / 10
								</Text>
								<Text className='text-light-200 text-sm'>({movie?.vote_count} votes)</Text>
							</View>

							<MovieInfo label="Overview" value={movie?.overview} />
							<MovieInfo label="Genres" value={movie?.genres?.map((g) => g.name).join(' - ') || "N/A"} />

							<View className='flex flex-row justify-between w-3/4'>
								<MovieInfo
									label="Budget"
									value={
										movie?.budget
											? `$${(movie.budget / 1_000_000).toFixed(1)} million`
											: "N/A"
									}
								/>
								<MovieInfo
									label="Revenue"
									value={
										movie?.revenue
											? `$${(movie.revenue / 1_000_000).toFixed(1)} million`
											: "N/A"
									}
								/>
							</View>

							<MovieInfo label="Production Companies" value={movie?.production_companies?.map((c) => c.name).join(' - ') || "N/A"} />

							<View className='flex flex-row justify-between w-3/4'>
								<MovieInfo
									label="Original Language"
									value={movie?.original_language.toUpperCase() || "N/A"}
								/>
								<MovieInfo
									label="Country"
									value={movie?.origin_country?.map((c) => c.toUpperCase()).join(' - ') || "N/A"}
								/>
							</View>
						</View>
					</ScrollView>

					<TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50' onPress={() => router.back()}>
						<Image
							source={icons.arrow}
							className='size-5 mr-1 mt-0.5 rotate-180'
							tintColor="#fff"
						/>
						<Text className='text-white font-bold text-base'>Go Back</Text>
					</TouchableOpacity>
				</>
			)}
		</View>
	)
}

export default MovieDetails;