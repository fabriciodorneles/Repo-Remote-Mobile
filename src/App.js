import React, {useEffect, useState} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api'

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        console.log(response.data);
        setProjects(response.data);
    });
}, []);

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);

    const newProjs = projects.map(function(item,index){ 
    if(item.id === id) item.likes++;
      return item;
    })

    setProjects(newProjs);

    // api.get('repositories').then(response => {
    //   console.log(response.data);
    //   setProjects(response.data);
    // });
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{project.title}</Text>

              <View style={styles.techsContainer}>
                {project.techs.map(tech => (
                <Text style={styles.tech} key={tech} >
                  {tech}
                </Text>
                ))}            
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${project.id}`}
                >
                  {project.likes} curtidas
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(project.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${project.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>          
            </View>
          )}
          ></FlatList>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
