import { View, Text } from 'react-native';
import { styles } from './styles';
import { CustomStepIndicator, FormCourse } from '../../../../components'; //AnimatedButton, FormEvaluation,
import React, { useState } from 'react';
import FormQuizz from '../../../../components/FormQuizz';

export type Step = 'course' | 'module' | 'dictionary' | 'flash-card' | 'evaluation' | 'prequizz';


//import { windowHeight } from '../../../../utils/Dimentions';
export default function CreateCourse() {
  /*
    const [isVisibleFormCourse, setIsVisibleFormCourse] = useState(true);
    
    const handlePressButtonCurso = () => {
      setIsVisibleFormModule(false);
      setIsVisibleFormEvaluation(false);
      setIsVisibleFormCourse(true);
    };
  
    const [isVisibleFormModule, setIsVisibleFormModule] = useState(false);
    const handlePressButtoModule = () => {
      setIsVisibleFormCourse(false);
      setIsVisibleFormModule(true);
      setIsVisibleFormEvaluation(false);
    };
  
    const [isVisibleFormEvaluation, setIsVisibleFormEvaluation] = useState(false);
    const handlePressButtoEvaluation = () => {
      setIsVisibleFormCourse(false);
      setIsVisibleFormModule(false);
      setIsVisibleFormEvaluation(true);
    };
  */

  const [currentStep, setCurrentStep] = useState<Step>('course');
  const [createdCourse, setCreatedCourse] = useState({
    created: false,
    newCourseId: 0,
    name: ""
  });


  const [currentPosition, setCurrentPosition] = useState(0);
  const handleCreatedCourse = (course_id: number, course_name: string) => {
    if (course_id != 0) {
      setCreatedCourse({ created: true, newCourseId: course_id, name: course_name });
      setCurrentPosition(1);
      setCurrentStep("prequizz");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Creando nuevo <Text style={styles.b}>Curso</Text></Text>
      <CustomStepIndicator currentPosition={currentPosition} labels={["Curso", "Prequizz"]} />
      <FormCourse
        onCourseCreated={handleCreatedCourse}
        step={currentStep}
      />

      {createdCourse.created && (
        <FormQuizz
          itemId={createdCourse.newCourseId}
          step={currentStep}
          onEvaluationCreated={() => { }}
          title={createdCourse.name}
          typeQuizz='prequizz'

        />
      )}
    </View>
  )
}