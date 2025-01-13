import { View, Text, FlatList, Image, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import { getAllPosts, searchPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { query } = useLocalSearchParams();
  
  // Use searchPosts when there's a query, otherwise use getAllPosts
  const { 
    data: posts, 
    isLoading, 
    fetchData 
  } = useAppwrite(query ? () => searchPosts(query) : getAllPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };


  console.log(query, posts)
  return (
    <SafeAreaView className="bg-black-blackish flex-1 h-full">
      <FlatList
        data={posts}
        keyExtractor={(item, index) => item.$id || item.id?.toString() || index.toString()}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  {query ? 'Search Results' : 'Home'}
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {query ? `Results for "${query}"` : 'Welcome Back'}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput initialQuery={query}/>
          </View>
        )}
        ListEmptyComponent={() =>
          isLoading ? (
            <Text className="text-white text-center mt-4">Loading...</Text>
          ) : (
            <EmptyState
              title={query ? "No matching videos found" : "No videos available"}
              subtitle={query ? `We couldn't find any videos matching "${query}"` : "Be the first to upload a video"}
            />
          )
        }
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#ffffff" // for iOS
            colors={["#ffffff"]} // for Android
          />
        }
      />
    </SafeAreaView>
  );
};

export default Search;