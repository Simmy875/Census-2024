import React, { useEffect, useState } from "react";
import {
View,
TextInput,
Text,
Button,
StyleSheet,
Platform,
ScrollView,
Image,
Alert,
TouchableOpacity
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  addPerson,
  getPersons,
  updatePerson,
  deletePerson,
  initializeDB,
  Person,
} from "@/database"; // Import initializeDB

const Dashboard = () => {
// States for inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Select Gender"); // Default dropdownvalue
  const [role, setRole] = useState("Role in Household"); // Default dropdownvalue
  const [marital, setMarital] = useState("Marital Status"); // Default dropdownvalue
  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [llg, setLLG] = useState("");
  const [ward, setWard] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // Handlevisibility of Date Picker
  const [persons, setPersons] = useState<Person[]>([]);  
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null); // Track if updating a person
  const onChangeDate = (
  event: { nativeEvent: { timestamp: number } },
selectedDate?: Date
) => {
const currentDate = selectedDate || date;
setShowDatePicker(Platform.OS === "ios");
setDate(currentDate);
};

const fetchPersons = async () => {
  const allPersons = await getPersons();
  setPersons(allPersons);
};

useEffect(() => {
  const setupDatabase = async () => {
    await initializeDB();
    fetchPersons();
  };

  setupDatabase();
}, []);
const handleSubmit = async () => {
  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !region ||
    !province ||
    !district ||
    !llg ||
    !ward ||
    gender === "Select Gender"
    
    ) {
    Alert.alert("Error", "Please fill in all fields correctly.");
    return;
  }

  try {
    if (editingPersonId) {
      // Update existing person
      await updatePerson(
        editingPersonId,
        firstName,
        lastName,
        phone,
        region,
        province,
        district,
        llg,
        ward,
        email,
        date.toISOString(),
        gender
      );
      console.log("Person updated successfully");
    } else {
      // Add new person
      const id = await addPerson(
        firstName,
        lastName,
        region,
        province,
        district,
        llg,
        ward,
        phone,
        email,
        date.toISOString(),
        gender
      );
      console.log("Person created successfully with ID:", id);
    }
    resetForm();
    fetchPersons(); // Refresh the list
  } catch (error) {
    console.error("Error submitting person:", error);
  }
};

const handleDelete = async (id: number) => {
  try {
    await deletePerson(id);
    console.log("Person deleted successfully");
    fetchPersons(); // Refresh the list after deleting
  } catch (error) {
    console.error("Error deleting person:", error);
  }
};

const handleUpdateClick = (person: Person) => {
  // Populate the form with the selected person's data
  setFirstName(person.firstName);
  setLastName(person.lastName);
  setRegion(person.region);
  setProvince(person.province);
  setDistrict(person.district);
  setLLG(person.llg);
  setWard(person.ward);
  setPhone(person.phone);
  setEmail(person.email);
  setGender(person.gender);
  setDate(new Date(person.date)); // Assuming dateOfBirth is a string
  setEditingPersonId(person.id); // Set the ID for updating
};

const resetForm = () => {
  // Clear the form after submission or update
  setFirstName("");
  setLastName("");
  setPhone("");
  setRegion("");
  setProvince("");
  setDistrict("");
  setLLG("");
  setWard("");
  setEmail("");
  setGender("Select Gender");
  setDate(new Date());
  setEditingPersonId(null); // Reset ID for creating new entries
};

return (
  <ScrollView>
    <View style={styles.container}>
    
    <View>
        <Image
          source={require('@/assets/images/Census.jpeg')}
          style={styles.reactLogo}
        />
        <Text style={styles.header}>Data Entry Form</Text>
        {/* Text Input 1 */}
        <TextInput
          style={styles.input}
          placeholder="Enter First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#888" // Modern touch: lighter placeholder color
        />


        {/* Text Input 2 */}
        <TextInput
          style={styles.input}
          placeholder="Enter Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#888"
        />


        {/* Number Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter Phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none" // Emails are typically lowercase
          placeholderTextColor="#888"
        />

        {/* Dropdown Picker */}
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label={"Select Gender"} />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>

          {/* Date Picker */}
          <View>
            <Button
              title="Select Date of Birth"
              onPress={() => setShowDatePicker(true)}
            ></Button>

            {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
            )}
            <Text style={styles.dateText}>
              Date of Birth: {date.toDateString()}
            </Text>

            {/* Dropdown Picker */}
            <Picker
              selectedValue={role}
              onValueChange={(itemValue) => setRole(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label={"Role in Household"} />
              <Picker.Item label="Father" value="Father" />
              <Picker.Item label="Mother" value="Mother" />
              <Picker.Item label="Child" value="Child" />
            </Picker>

            {/* Dropdown Picker */}
            <Picker
              selectedValue={marital}
              onValueChange={(itemValue) => setMarital(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label={"Marital Status"} />
              <Picker.Item label="Single" value="Single" />
              <Picker.Item label="Married" value="Married" />
              <Picker.Item label="Divorced" value="Divorced" />
            </Picker>

         {/* Text Input 2 */}
          <TextInput
            style={styles.input}
            placeholder="Enter Region"
            value={region}
            onChangeText={setRegion}
            placeholderTextColor="#888"
          />

          {/* Text Input 2 */}
            <TextInput
            style={styles.input}
            placeholder="Enter Province"
            value={province}
            onChangeText={setProvince}
            placeholderTextColor="#888"
            />

            {/* Text Input 2 */}
            <TextInput
            style={styles.input}
            placeholder="Enter District"
            value={district}
            onChangeText={setDistrict}
            placeholderTextColor="#888"
            />

            {/* Text Input 2 */}
            <TextInput
            style={styles.input}
            placeholder="Enter LLG"
            value={llg}
            onChangeText={setLLG}
            placeholderTextColor="#888"
            />

            {/* Text Input 2 */}
            <TextInput
            style={styles.input}
            placeholder="Enter Ward"
            value={ward}
            onChangeText={setWard}
            placeholderTextColor="#888"
            />

          </View>

            <View style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: '#FCAA27',
                borderRadius: 10,
            }}>
            <Button 
              title="Count" 
              color="#000000"
              onPress={() => handleSubmit()} 
            />

            {/* Table to display records */}
            {persons.map((person) => (
  <View key={person.id} style={styles.tableRow}>
    <View style={styles.labelColumn}>
      <Text style={styles.labelText}>First Name</Text>
      <Text style={styles.labelText}>Last Name</Text>
      <Text style={styles.labelText}>Phone</Text>
      <Text style={styles.labelText}>Email</Text>
      <Text style={styles.labelText}>Gender</Text>
      <Text style={styles.labelText}>Region</Text>
      <Text style={styles.labelText}>Province</Text>
      <Text style={styles.labelText}>District</Text>
      <Text style={styles.labelText}>LLG</Text>
      <Text style={styles.labelText}>Ward</Text>
      <Text style={styles.labelText}>Date of Birth</Text>
    </View>
    <View style={styles.valueColumn}>
      <Text style={styles.valueText}>{person.firstName}</Text>
      <Text style={styles.valueText}>{person.lastName}</Text>
      <Text style={styles.valueText}>{person.phone}</Text>
      <Text style={styles.valueText}>{person.email}</Text>
      <Text style={styles.valueText}>{person.gender}</Text>
      <Text style={styles.valueText}>{person.region}</Text>
      <Text style={styles.valueText}>{person.province}</Text>
      <Text style={styles.valueText}>{person.district}</Text>
      <Text style={styles.valueText}>{person.llg}</Text>
      <Text style={styles.valueText}>{person.ward}</Text>
      <Text style={styles.valueText}>{new Date(person.date).toDateString()}</Text>
    </View>
    <View style={[styles.actionButtons, { alignSelf: 'flex-end' }]}>
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => handleUpdateClick(person)}
      >
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(person.id)}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
))}
</View>
        </View>
    </View>
  </ScrollView>
  );
};

// Styling for a modern look
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#2A7489", // Slightly off-white for a modern cleanbackground
    justifyContent: "center",
  },
  columnHeaderText: {

  },
  columnHeader: {
    flexDirection: "column",
    alignItems: "center",
  },
  reactLogo: {
    height: 230,
    width: 380,
    bottom: 0,
    left: -20,
    position: 'relative',
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Darker text color for contrast
    textAlign: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12, // Rounded corners for a modern feel
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff", // White background for input fields
    shadowColor: "#000", // Shadow for subtle elevation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Elevation on Android
  },
  picker: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 20,
  },

  dateText: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 12,
    fontSize: 16,
    color: "#666", // Subtle gray for date display
  },
  buttonProps: {
    backgroundColor: "#0a7ea4",
  },
  tableContainer: {
    flexDirection: 'column',
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableRowText: {
    flex: 1,
  
  },
  labelColumn: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 20,
  },
  labelText: {
    fontSize: 16,
    color: '#666',
  },
  valueColumn: {
    flex: 1,
    width: 500,
    justifyContent: 'space-around',
    
  },
  valueText: {
    fontSize: 16,
    color: '#333',
    overflow: 'hidden',
  },
  actionButtons: {
    flexDirection: "row",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: { backgroundColor: "#F44336", padding: 5, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
export default Dashboard;