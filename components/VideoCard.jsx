import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';
import { getAvatar } from '../lib/appwrite';

const VideoCard = ({ video: { title, thumbnail, video, creator: { username } } }) => {
  const avatarUrl = getAvatar(username);
  const [play, setPlay] = useState(false);

  return (
    <View style={[styles.card, styles.marginBottom]}>
      <View style={[styles.row, styles.marginTop]}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Image 
              source={{ uri: avatarUrl }}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.username} numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View style={styles.menuIcon}>
          <Image 
            source={icons.menu}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      </View>

      {play ? (
        <Text style={styles.playingText}>Playing</Text>
      ) : (
        <TouchableOpacity 
          style={styles.thumbnailContainer} 
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image 
            source={{ uri: thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            style={styles.playIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16, // px-4 equivalent
  },
  marginBottom: {
    marginBottom: 56, // mb-14 equivalent
  },
  marginTop: {
    marginTop: 16, // mt-4 equivalent
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12, // gap-3 equivalent
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23, // Fully rounded avatar
    borderWidth: 1,
    borderColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5, // Reduced from 20 to 12
    padding: 4, // p-1 equivalent
  },
  avatarImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    gap: 3, // gap-y-3 equivalent
  },
  title: {
    color: '#FFFFFF', // text-white
    fontWeight: '600',
    fontSize: 14, // text-sm equivalent
  },
  username: {
    color: '#CCCCCC', // text-gray-100
    fontWeight: '400',
    fontSize: 12, // text-xs equivalent
  },
  menuIcon: {
    paddingTop: 8, // pt-2 equivalent
  },
  icon: {
    width: 20, // w-5 equivalent
    height: 20, // h-5 equivalent
  },
  thumbnailContainer: {
    width: '100%', // Full width
    height: 240, // h-60 equivalent
    borderRadius: 12, // rounded-xl equivalent
    marginTop: 12, // mt-3 equivalent
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Ensures rounded corners are respected
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 12, // Matches container's borderRadius
  },
  playIcon: {
    width: 40, // w-6 equivalent
    height: 40, // h-6 equivalent
    position: 'absolute',
  },
  playingText: {
    color: '#FFFFFF', // White text
    fontSize: 16, // Slightly larger text
    fontWeight: 'bold',
    marginTop: 12, // Adds spacing below the row
  },
});

export default VideoCard;
