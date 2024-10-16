import { Image, StyleSheet, Platform, TextInput, Button, Alert, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleSignIn = () => {
    (navigation as any).navigate("index");
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
        <ThemedText type="title">LOG OUT</ThemedText>
        <ThemedText type='subtitle'>Thank You for your praticipation</ThemedText>
      </ThemedView>

       <ThemedView>
       
       <View style={{
           paddingHorizontal: 20,
           paddingVertical: 10,
           backgroundColor: '#FCAA27',
           borderRadius: 10,
      }}>
       <Button
          title="Log Out"
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