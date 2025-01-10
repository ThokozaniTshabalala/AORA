import { StatusBar } from "expo-status-bar";    
import { Text, View, ActivityIndicator } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Image } from 'react-native';
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
    const { isLoading, isLoggedIn } = useGlobalContext();

    // Show loading indicator while checking authentication
    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-[#09091f]">
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    // Redirect to home if user is logged in
    if (isLoggedIn) {
        return <Redirect href="/home" />;
    }

    return (
        <SafeAreaView className="bg-[#09091f] h-full">
            <ScrollView contentContainerStyle={{height: '100%'}}>
                <View className="w-full justify-center items-center h-[85vh] px-4">
                    <Image
                        source={images.logo}
                        className="w-[130px] h-[84px] mt-7"
                        resizeMode="contain"
                    />

                    <Image
                        source={images.cards}
                        className="max-w-[380px] w-full h-[300px]"
                        resizeMode="contain"
                    />

                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">
                            Discover Endless Possibilities with {' '}
                            <Text className="text-secondary-200">
                                Aora
                            </Text>
                        </Text>

                        <Image
                            source={images.path}
                            className="w-[136px] h-[15px] absolute -bottom-2 -right-9"
                            resizeMode="contain"
                        />
                    </View>

                    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center" 
                          style={{ paddingBottom: 10 }}>
                        Where creativity meets innovation:
                        embark on a journey of limitless exploration
                        with Aora
                    </Text>

                    <CustomButton 
                        title="Continue with Email" 
                        handlePress={() => router.push('/sign-in')}
                        containerStyles="w-full"  
                    />
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#161622" style='light'/>
        </SafeAreaView>
    );
}