import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const NotasResumen = () => {
  const [notaspre] = useState([
    {
      "id": 2,
      "course_id": 2,
      "user_id": 3,
      "progress": 0,
      "is_approved": null,
      "created_at": "2024-01-12T15:00:46.367Z",
      "updated_at": "2024-01-12T15:00:46.367Z",
      "Course": {
        "name": "La Comunicación",
        "preQuizzResultModels": [
          {
            "pre_result_id": 1,
            "puntaje": "0",
            "efectividad": "0",
            "user_id": 3,
            "course_id": 2
          }
        ],
        "CampaignCourses": [
          {
            "campaign_course_id": 3,
            "campaign_id": 2,
            "course_id": 2
          }
        ]
      }
    },
    {
      "id": 7,
      "course_id": 4,
      "user_id": 3,
      "progress": 0,
      "is_approved": null,
      "created_at": "2024-02-26T19:14:13.046Z",
      "updated_at": "2024-02-26T19:14:13.046Z",
      "Course": {
        "name": "Retenciones",
        "preQuizzResultModels": [
          {
            "pre_result_id": 7,
            "puntaje": "2",
            "efectividad": "40",
            "user_id": 3,
            "course_id": 4
          }
        ],
        "CampaignCourses": [
          {
            "campaign_course_id": 2,
            "campaign_id": 2,
            "course_id": 4
          }
        ]
      }
    },
    {
      "id": 1,
      "course_id": 1,
      "user_id": 3,
      "progress": 0,
      "is_approved": null,
      "created_at": "2024-01-12T15:00:46.367Z",
      "updated_at": "2024-01-12T15:00:46.367Z",
      "Course": {
        "name": "Workforce Management- Best Practice",
        "preQuizzResultModels": [],
        "CampaignCourses": [
          {
            "campaign_course_id": 4,
            "campaign_id": 2,
            "course_id": 1
          }
        ]
      }
    }
    // Your other course objects here...
  ]);



    const [notaspre2] = useState([
      {
        "id": 2,
        "course_id": 2,
        "user_id": 3,
        "progress": 0,
        "is_approved": null,
        "created_at": "2024-01-12T15:00:46.367Z",
        "updated_at": "2024-01-12T15:00:46.367Z",
        "Course": {
          "name": "La Comunicación",
          "preQuizzResultModels": [
            {
              "pre_result_id": 1,
              "puntaje": "12",
              "efectividad": "0",
              "user_id": 3,
              "course_id": 2
            }
          ],
          "CampaignCourses": [
            {
              "campaign_course_id": 3,
              "campaign_id": 2,
              "course_id": 2
            }
          ]
        }
      },
      {
        "id": 7,
        "course_id": 4,
        "user_id": 3,
        "progress": 0,
        "is_approved": null,
        "created_at": "2024-02-26T19:14:13.046Z",
        "updated_at": "2024-02-26T19:14:13.046Z",
        "Course": {
          "name": "Retenciones",
          "preQuizzResultModels": [
            {
              "pre_result_id": 7,
              "puntaje": "15",
              "efectividad": "40",
              "user_id": 3,
              "course_id": 4
            }
          ],
          "CampaignCourses": [
            {
              "campaign_course_id": 2,
              "campaign_id": 2,
              "course_id": 4
            }
          ]
        }
      },
      {
        "id": 1,
        "course_id": 1,
        "user_id": 3,
        "progress": 0,
        "is_approved": null,
        "created_at": "2024-01-12T15:00:46.367Z",
        "updated_at": "2024-01-12T15:00:46.367Z",
        "Course": {
          "name": "Workforce Management- Best Practice",
          "preQuizzResultModels": [ {
            "pre_result_id": 7,
            "puntaje": "13",
            "efectividad": "40",
            "user_id": 3,
            "course_id": 4
          }],
          "CampaignCourses": [
            {
              "campaign_course_id": 4,
              "campaign_id": 2,
              "course_id": 1
            }
          ]
        }
      }
      // Your other course objects here...
    ]);

    
  const [selectedCourses, setSelectedCourses] = useState([notaspre[0].course_id]);
  const toggleCourseSelection = (courseId: number) => { // Specify 'courseId' type as number
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  //
  const [selectedCourses2, setSelectedCourses2] = useState([notaspre2[0].course_id]);
  const toggleCourseSelection2 = (courseId: number) => { // Specify 'courseId' type as number
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };
  //
  const isSelected = (courseId: number) => selectedCourses.includes(courseId);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(128, 0, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    fromZero: true, // Asegura que el eje Y comienza en 0
    yAxisInterval: 5, // Coloca una etiqueta en cada 5 unidades
  };

  const data = {
    labels: notaspre
      .filter((nota) => selectedCourses.includes(nota.course_id))
      .map((nota) => nota.Course.name),
    datasets: [
      {
        data: notaspre
          .filter((nota) => selectedCourses.includes(nota.course_id))
          .map((nota) => parseFloat(nota.Course.preQuizzResultModels[0]?.puntaje ?? '0')),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['NOTA PREQUIZZ'],
  };

  const data2 = {
    labels: notaspre2
      .filter((nota) => selectedCourses.includes(nota.course_id))
      .map((nota) => nota.Course.name),
    datasets: [
      {
        data: notaspre2
          .filter((nota) => selectedCourses.includes(nota.course_id))
          .map((nota) => parseFloat(nota.Course.preQuizzResultModels[0]?.puntaje ?? '0')),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['NOTA EVALUACION'],
  };


  const renderCourses = () => {
    const coursesGroups = [];
    const chunkSize = 2; 

    for (let i = 0; i < notaspre.length; i += chunkSize) {
      coursesGroups.push(notaspre.slice(i, i + chunkSize));
    }

    return coursesGroups.map((group, index) => (
      <View key={index} style={styles.courseRow}>
        {group.map((nota) => (
          <TouchableOpacity
            key={nota.course_id}
            style={styles.checkbox}
            onPress={() => toggleCourseSelection(nota.course_id)}
          >
            <Text>{nota.Course.name}</Text>
            <Text>{isSelected(nota.course_id) ? '✓' : ''}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };
  const renderCourses2 = () => {
    const coursesGroups = [];
    const chunkSize = 2; // Number of columns

    for (let i = 0; i < notaspre2.length; i += chunkSize) {
      coursesGroups.push(notaspre2.slice(i, i + chunkSize));
    }

    return coursesGroups.map((group, index) => (
      <View key={index} style={styles.courseRow}>
        {group.map((nota) => (
          <TouchableOpacity
            key={nota.course_id}
            style={styles.checkbox}
            onPress={() => toggleCourseSelection(nota.course_id)}
          >
            <Text>{nota.Course.name}</Text>
            <Text>{isSelected(nota.course_id) ? '✓' : ''}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {renderCourses()}
      <LineChart data={data} width={screenWidth} height={220} chartConfig={chartConfig} />

      {renderCourses2()}
      <LineChart data={data2} width={screenWidth} height={220} chartConfig={chartConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop:20,
backgroundColor : '#fff'
  },
  courseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#8000FF',
    borderWidth: 2,
    borderStyle: 'solid',
    marginHorizontal:10,
    padding:7
},
});

export default NotasResumen;