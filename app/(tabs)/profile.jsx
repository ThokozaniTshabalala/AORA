import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserProfile } from '../../lib/appwrite';
import { images } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';

const ProfileDetails = ({ label, value }) => (
  <View style={styles.detailsItem}>
    <Text style={styles.label}>{label}: </Text>
    <Text style={styles.value}>{value || 'N/A'}</Text>
  </View>
);

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useGlobalContext();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!user?.$id) {
          throw new Error('User ID not found');
        }
        
        const profile = await getUserProfile(user.$id);
        setUserProfile(profile);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user?.$id]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <Image
            source={userProfile?.avatar ? { uri: userProfile.avatar } : images.defaultAvatar}
            style={styles.avatar}
            resizeMode="cover"
          />
          <Text style={[styles.username, styles.fontFamily]}>
            {userProfile?.username || 'User'}
          </Text>
          <Text style={[styles.email, styles.fontFamily]}>
            {userProfile?.email || 'No email provided'}
          </Text>
        </View>

        <View style={styles.profileDetails}>
          <Text style={[styles.detailsHeader, styles.fontFamily]}>Profile Details</Text>
          <ProfileDetails label="Email" value={userProfile?.email} />
          <ProfileDetails label="Account ID" value={userProfile?.accountId} />
          <ProfileDetails 
            label="Joined At" 
            value={userProfile?.createdAt ? 
              new Date(userProfile.createdAt).toLocaleDateString() : 
              null
            } 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    padding: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  email: {
    color: '#bbb',
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
  profileDetails: {
    marginTop: 20,
  },
  detailsHeader: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
  },
  detailsItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    color: '#bbb',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  value: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    flex: 1,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});

export default Profile;