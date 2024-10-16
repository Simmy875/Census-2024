import { Image, StyleSheet, Platform, TextInput, Button, Alert, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleSignIn = () => {
    (navigation as any).navigate("Dashboard");
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '', dark: '' }}
      headerImage={
        <Image
          source={require('@/assets/images/Census.jpeg')
            
          
          
          }
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Get Started</ThemedText>
        <ThemedText type='subtitle'>By signing into this a free account</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Username</ThemedText>
      <TextInput
        style={{
          height:40,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
        }}
        placeholder="Enter Username"
        />
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Password</ThemedText>
        <TextInput
        style={{
          height:40,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
        }}
        placeholder="Enter Password "
        />
       </ThemedView>

       <ThemedView>
       
       <View style={{
           paddingHorizontal: 20,
           paddingVertical: 10,
           backgroundColor: '#FCAA27',
           borderRadius: 10,
      }}>
       <Button
          title="Sign In"
          color="#000000"
          onPress={handleSignIn}
          />
      </View>
      
       </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    gap: 8,
    
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 260,
    width: 390,
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 4,
  },
  
});