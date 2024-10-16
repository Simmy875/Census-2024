import { Image, StyleSheet, Platform, Button, Alert, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    (navigation as any).navigate("Auth");
  };

  return (
    <ThemedView style={styles.container}>
      <Image
          source={require('@/assets/images/Census_2024.png')

          }
          style={[styles.reactLogo, {borderRadius: 600,}]}
        />
      <ThemedText type="title">Welcome to our app!</ThemedText>
      <ThemedText type="subtitle">Get started with our app today!</ThemedText>
      
      <View style={{
           paddingHorizontal: 20,
           paddingVertical: 10,
           backgroundColor: '#FCAA27',
           borderRadius: 10,
      }}>
          <Button
        title="Get Started"
        color="#000000"
        onPress={handleGetStarted}
      /> 
      </View>
   
      <Image
      source={require('@/assets/images/people.jpg')}
      style={styles.bottomImage}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A7489',
  },
  buttonstyle:{
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor:  '#f194ff',
  },
  reactLogo: {
    height: 260,
    width: 260,
    borderRadius: 130,
    bottom: 0,
    left: 65,
    position: 'absolute',
    top: 100,
  },
  bottomImage: {
    height: 300,
    width: 400,
    marginBottom: -450,
    borderRadius: 30,
  },
});

